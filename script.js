document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("js-ready");

    const clock = document.getElementById("sys-time");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll(".section")];
    const revealItems = [...document.querySelectorAll(".reveal")];

    const updateTime = () => {
        if (!clock) {
            return;
        }

        const now = new Date();
        clock.textContent = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });
    };

    updateTime();
    window.setInterval(updateTime, 1000);

    const setActiveNav = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);
        });
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14
    });

    revealItems.forEach((item) => {
        if (!item.classList.contains("visible")) {
            revealObserver.observe(item);
        }
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveNav(entry.target.id);
            }
        });
    }, {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1
    });

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("href")?.replace("#", "");
            if (targetId) {
                setActiveNav(targetId);
            }
        });
    });
});
