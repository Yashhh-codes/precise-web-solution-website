import './style.css'

// Interactivity script
document.addEventListener("DOMContentLoaded", () => {
    // Reveal Intersection Observer - Tuned for a "weightier" entry
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.25, // Higher threshold for more intentional reveal
        rootMargin: "0px 0px -80px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                // Keep entries active once revealed to prevent distracting re-reveal
                // entry.target.classList.remove("active");
            }
        });
    }, revealOptions);

    reveals.forEach((element) => {
        revealOnScroll.observe(element);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar?.classList.add("h-16");
            navbar?.classList.remove("h-20");
            navbar?.classList.add("bg-surface/95");
        } else {
            navbar?.classList.add("h-20");
            navbar?.classList.remove("h-16");
            navbar?.classList.remove("bg-surface/95");
        }
    });

    // --- Mobile Menu Toggle Logic ---
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenuClose = document.getElementById("mobile-menu-close");

    const toggleMobileMenu = () => {
        mobileMenu?.classList.toggle("active");
        if (mobileMenu?.classList.contains("active")) {
            mobileMenu.style.opacity = "1";
            mobileMenu.style.visibility = "visible";
            document.body.style.overflow = "hidden";
        } else {
            mobileMenu.style.opacity = "0";
            mobileMenu.style.visibility = "hidden";
            document.body.style.overflow = "";
        }
    };

    window.toggleMobileMenu = toggleMobileMenu;
    mobileMenuToggle?.addEventListener("click", toggleMobileMenu);
    mobileMenuClose?.addEventListener("click", toggleMobileMenu);

    // --- Subtle Hero Icon Motion (Less 'Busy' version) ---
    const heroIcons = document.querySelectorAll(".interactive-icon-inner");
    if (heroIcons.length > 0) {
        window.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroIcons.forEach((icon, index) => {
                const multiplier = (index + 1) * 0.5;
                icon.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
            });
        });
    }

    console.log('Precise Web Solutions: Premium interaction engine initialized.');
});
