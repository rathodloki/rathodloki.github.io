document.addEventListener('DOMContentLoaded', () => {
    
    // --- Safe Scroll Reveals (Add reveal-init class dynamically) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Stagger Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Determine if this element is part of a list or grid container
                let delay = 0;
                const parent = target.parentElement;
                
                if (parent && (parent.classList.contains('cards-grid') || 
                               parent.classList.contains('tech-grid') || 
                               parent.classList.contains('timeline-wrapper') ||
                               parent.classList.contains('stats-row'))) {
                    const siblings = Array.from(parent.querySelectorAll('.scroll-reveal'));
                    const index = siblings.indexOf(target);
                    if (index !== -1) {
                        delay = index * 0.08; // Stagger offset
                    }
                }
                
                target.style.transitionDelay = `${delay}s`;
                target.classList.add('revealed');
                observer.unobserve(target); // Reveal once
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px'
    });

    // Initialize elements by adding the hide class and registering them
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // --- Dynamic Shaders.com Loader with WebGL Fallback ---
    const container = document.getElementById('bg-canvas-container');
    if (!container) return;

    // Start floating telemetry particles layer
    initializeParticles();

    // Load Shaders.com via dynamic ES import
    import('https://esm.sh/@paper-design/shaders@0.0.76')
        .then(module => {
            initializeShadersCom(module);
        })
        .catch(err => {
            console.warn('CORS/Offline: Shaders.com ESM import blocked. Falling back to local WebGL shader.', err);
            initializeFallbackShader();
        });

    // Method A: Official Shaders.com Mesh Gradient
    function initializeShadersCom(module) {
        const { ShaderMount, meshGradientFragmentShader, getShaderColorFromString } = module;
        
        // Serene yet visible colors: charcoal base, rich slate-blue, and deep indigo-violet
        const colors = ['#09090b', '#0f172a', '#1e1b4b', '#0f172a'].map(getShaderColorFromString);
        let shaderMount;

        try {
            shaderMount = new ShaderMount(container, meshGradientFragmentShader, {
                u_colors: colors,
                u_colorsCount: colors.length,
                u_distortion: 0.45,
                u_swirl: 0.12,
                u_grainMixer: 0.0,
                u_grainOverlay: 0.03, // Faint film grain
                u_fit: 2,
                u_scale: 1.0,
                u_rotation: 0.0,
                u_offsetX: 0.0,
                u_offsetY: 0.0
            }, undefined, 0.5); // Speed multiplier
        } catch (e) {
            console.error('Failed to mount Shaders.com mesh gradient:', e);
            initializeFallbackShader();
            return;
        }

        // Interpolated Mouse Offsets
        let currentOffset = { x: 0, y: 0 };
        let targetOffset = { x: 0, y: 0 };

        window.addEventListener('mousemove', (e) => {
            targetOffset.x = (e.clientX / window.innerWidth - 0.5) * 0.12;
            targetOffset.y = (e.clientY / window.innerHeight - 0.5) * -0.12;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                targetOffset.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 0.12;
                targetOffset.y = (e.touches[0].clientY / window.innerHeight - 0.5) * -0.12;
            }
        }, { passive: true });

        function updateUniforms() {
            currentOffset.x += (targetOffset.x - currentOffset.x) * 0.05;
            currentOffset.y += (targetOffset.y - currentOffset.y) * 0.05;
            shaderMount.setUniforms({
                u_offsetX: currentOffset.x,
                u_offsetY: currentOffset.y
            });
            requestAnimationFrame(updateUniforms);
        }
        requestAnimationFrame(updateUniforms);
    }

    // Method B: High-Performance Fallback WebGL liquid shader (works 100% offline & local file://)
    function initializeFallbackShader() {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return;

        const vsSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fsSource = `
            precision mediump float;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;
            
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
            }
            
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                           mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
            }
            
            float liquidNoise(vec2 p, float time) {
                vec2 q = vec2(0.0);
                q.x = noise(p + time * 0.1);
                q.y = noise(p + vec2(1.0, 1.0) + time * 0.08);
                
                vec2 r = vec2(0.0);
                r.x = noise(p + q * 1.5 + time * 0.05);
                r.y = noise(p + q * 1.2 - time * 0.06);
                
                return noise(p + r * 1.8);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
                
                vec2 m = (u_mouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
                vec2 toMouse = p - m;
                float dist = length(toMouse);
                
                float force = 1.0 / (1.0 + dist * 5.0);
                vec2 offset = normalize(toMouse) * force * 0.12;
                
                vec2 warpedP = p * 1.8 + offset;
                float n = liquidNoise(warpedP, u_time * 0.25);
                
                vec3 colorA = vec3(0.035, 0.035, 0.043); // #09090b
                vec3 colorB = vec3(0.059, 0.090, 0.165); // #0f172a (Slate Blue)
                vec3 colorC = vec3(0.118, 0.106, 0.294); // #1e1b4b (Deep Indigo)
                
                float blendVal = smoothstep(0.15, 0.85, n);
                vec3 finalColor = mix(colorA, colorB, blendVal * 0.4);
                
                float mouseGlow = smoothstep(0.55, 0.0, dist) * 0.35;
                finalColor = mix(finalColor, colorC, mouseGlow);
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        function compileShader(source, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        const vs = compileShader(vsSource, gl.VERTEX_SHADER);
        const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

        let mouse = { x: 0.5, y: 0.5 };
        let targetMouse = { x: 0.5, y: 0.5 };

        window.addEventListener('mousemove', (e) => {
            targetMouse.x = e.clientX / window.innerWidth;
            targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                targetMouse.x = e.touches[0].clientX / window.innerWidth;
                targetMouse.y = 1.0 - (e.touches[0].clientY / window.innerHeight);
            }
        }, { passive: true });

        function resize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const scale = width > 1280 ? 1280 / width : 1.0;
            canvas.width = Math.floor(width * scale);
            canvas.height = Math.floor(height * scale);
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        window.addEventListener('resize', resize);
        resize();

        function render(time) {
            mouse.x += (targetMouse.x - mouse.x) * 0.06;
            mouse.y += (targetMouse.y - mouse.y) * 0.06;

            gl.useProgram(program);
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform1f(timeLocation, time * 0.001);
            gl.uniform2f(mouseLocation, mouse.x, mouse.y);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    // --- Interactive 3D Telemetry Nebula (Soft Elliptical Framing) ---
    function initializeParticles() {
        const pCanvas = document.createElement('canvas');
        pCanvas.className = 'particle-canvas';
        pCanvas.style.pointerEvents = 'none'; // Clicks pass through to background elements
        container.appendChild(pCanvas);

        const ctx = pCanvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        const particleCount = 380; // Elegant, soft density
        
        let mouseX = -1000;
        let mouseY = -1000;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        let width = window.innerWidth;
        let height = window.innerHeight;
        let centerX = width / 2;
        let centerY = height * 0.42;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            pCanvas.width = width;
            pCanvas.height = height;
            centerX = width / 2;
            centerY = height * 0.42;
        }
        window.addEventListener('resize', resize);
        resize();

        // Beautiful Google stops for color mixing
        const colorAmber = [251, 191, 36];
        const colorRose = [244, 63, 94];
        const colorCyan = [56, 189, 248];
        const colorPurple = [168, 85, 247];

        class NebulaParticle {
            constructor() {
                // Elliptical distribution framing the avatar
                const theta = Math.random() * Math.PI * 2;
                
                // Cluster dense in the middle, scatter softly to the edges
                const baseDist = 110 + Math.pow(Math.random(), 1.6) * 320;
                
                // Ellipse scaling (wider horizontally to bridge viewport boundaries)
                this.ox = Math.cos(theta) * baseDist * 1.35;
                this.oy = Math.sin(theta) * baseDist * 0.95;
                this.oz = (Math.random() - 0.5) * 140; // 3D Depth variation

                // Gentle drift waves unique to each particle
                this.driftSpeed = 0.0004 + Math.random() * 0.0008;
                this.driftRadius = 8 + Math.random() * 16;
                this.driftPhase = Math.random() * Math.PI * 2;
                // Star size distribution: 20% bright visible stars, 80% dim background stars
                this.baseSize = Math.random() < 0.2 ? (Math.random() * 0.65 + 1.15) : (Math.random() * 0.35 + 0.45);
                // Star opacity distribution: larger stars are naturally brighter
                this.baseAlpha = this.baseSize > 1.1 ? (Math.random() * 0.25 + 0.5) : (Math.random() * 0.15 + 0.08);
                // Stellar temperature colors: soft warm white vs cool blue-white
                this.color = Math.random() > 0.4 ? [255, 252, 240] : [224, 242, 254];

                // Physics spring values
                this.dispX = 0;
                this.dispY = 0;
                this.targetDispX = 0;
                this.targetDispY = 0;
            }

            update(time, currentCenterY) {
                // Apply a very slow rotation over time
                const rotAngle = time * 0.00008;
                const rx = this.ox * Math.cos(rotAngle) - this.oy * Math.sin(rotAngle);
                const ry = this.ox * Math.sin(rotAngle) + this.oy * Math.cos(rotAngle);

                // Fluid wave drift (organic wind)
                const driftX = Math.sin(time * this.driftSpeed + this.driftPhase) * this.driftRadius;
                const driftY = Math.cos(time * this.driftSpeed * 0.9 + this.driftPhase) * this.driftRadius;

                // Base coordinates in screen space
                const sx = centerX + rx + driftX;
                const sy = currentCenterY + ry + driftY;

                // Proximity interaction
                const dx = sx - mouseX;
                const dy = sy - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const influenceRadius = 160;

                if (dist < influenceRadius) {
                    const force = (influenceRadius - dist) / influenceRadius;
                    const angle = Math.atan2(dy, dx);
                    
                    // Rubbery push away
                    this.targetDispX = Math.cos(angle) * force * 45;
                    this.targetDispY = Math.sin(angle) * force * 45;
                } else {
                    this.targetDispX = 0;
                    this.targetDispY = 0;
                }

                // Spring physics
                this.dispX += (this.targetDispX - this.dispX) * 0.08;
                this.dispY += (this.targetDispY - this.dispY) * 0.08;

                this.renderX = sx + this.dispX;
                this.renderY = sy + this.dispY;

                // Store depth coordinate for sorting
                this.renderZ = this.oz;
            }

            draw() {
                // Opacity based on distance from center (soft fading glow)
                const distFromCenter = Math.sqrt(this.ox * this.ox + this.oy * this.oy);
                const fade = Math.max(0, 1 - (distFromCenter / 480));
                
                // Depth scaling
                const depthT = (this.renderZ + 70) / 140;
                const sizeScale = 0.7 + depthT * 1.3;
                const depthAlpha = 0.4 + depthT * 0.6; // Scale alpha by depth

                const opacity = fade * this.baseAlpha * depthAlpha;
                if (opacity <= 0.01) return;

                const size = this.baseSize * sizeScale;

                ctx.beginPath();
                ctx.arc(this.renderX, this.renderY, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${opacity})`;
                ctx.fill();
            }
        }

        // Initialize scattered nebula particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new NebulaParticle());
        }

        function animate(time) {
            const currentCenterY = centerY - window.scrollY;
            ctx.clearRect(0, 0, width, height);

            // Update particles
            particles.forEach(p => p.update(time, currentCenterY));

            // Depth sorting (back to front)
            particles.sort((a, b) => a.renderZ - b.renderZ);

            // Render particles
            particles.forEach(p => p.draw());

            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    // --- Bento Grid Expand/Collapse Functionality ---
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const btn = card.querySelector('.expand-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    btn.innerHTML = 'Read case study <i class="fas fa-arrow-down"></i>';
                } else {
                    card.classList.add('expanded');
                    btn.innerHTML = 'Collapse details <i class="fas fa-arrow-down"></i>';
                }
            });
        }
    });

    // --- Dynamic Date Calculations ---
    const startDate = new Date('2019-12-02');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    const experienceFormatted = diffYears.toFixed(1);

    const expDescEl = document.getElementById('experience-years-desc');
    const expStatEl = document.getElementById('experience-years-stat');
    const copyrightYearEl = document.getElementById('copyright-year');

    if (expDescEl) {
        expDescEl.textContent = experienceFormatted;
    }
    if (expStatEl) {
        expStatEl.textContent = `${experienceFormatted}+`;
    }
    if (copyrightYearEl) {
        copyrightYearEl.textContent = today.getFullYear();
    }
});
