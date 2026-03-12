document.addEventListener('DOMContentLoaded', () => {

    // --- Clock Logic ---
    function updateTime() {
        const timeEl = document.getElementById('sys-time');
        if (!timeEl) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        timeEl.textContent = timeString;
    }
    
    setInterval(updateTime, 1000);
    updateTime(); // Initial call


    // --- High Performance Tab Switching ---
    // Instead of heavy DOM manipulation or dragging, we just toggle CSS classes.
    // CSS handles the animation via hardware-accelerated properties (opacity/transform).
    
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.sys-section');
    const pathDisplay = document.getElementById('current-path');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Ignore if already active
            if (item.classList.contains('active')) return;

            // 1. Remove active state from all navs
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 2. Add active state to clicked nav
            item.classList.add('active');

            // 3. Update the path display text
            const targetId = item.getAttribute('data-target');
            if (pathDisplay) {
                // Remove 'sys-' prefix for the path display
                const pathName = targetId.replace('sys-', '');
                pathDisplay.textContent = `root@lsr:~/${targetId.replace('-', '/')}`;
            }

            // 4. Switch Content Sections
            sections.forEach(sec => {
                // Remove active class instantly
                sec.classList.remove('active');
                
                // If this is the target section, activate it
                if (sec.id === targetId) {
                    sec.classList.add('active');
                    
                    // Re-trigger the CSS animation by removing and re-adding the animation classes
                    // We only animate specific child elements for performance
                    const typeElements = sec.querySelectorAll('.type-in');
                    const fadeElements = sec.querySelectorAll('.fade-in');
                    const slideElements = sec.querySelectorAll('.slide-up');
                    
                    typeElements.forEach(el => restartAnimation(el, 'type-in'));
                    fadeElements.forEach(el => restartAnimation(el, 'fade-in'));
                    slideElements.forEach(el => restartAnimation(el, 'slide-up'));
                }
            });
        });
    });

    // Helper to restart CSS animations reliably
    function restartAnimation(element, className) {
        element.classList.remove(className);
        void element.offsetWidth; // Trigger reflow (forces browser to acknowledge class removal)
        element.classList.add(className);
    }

});
