import './style.css'

// Interactivity script
document.addEventListener("DOMContentLoaded", () => {
    // Reveal Intersection Observer - Tuned for a "weightier" entry
    const reveals = document.querySelectorAll(".reveal");

    const isMobile = window.innerWidth < 768;
    const revealOptions = {
        threshold: isMobile ? 0.1 : 0.2, // Trigger earlier on mobile
        rootMargin: "0px 0px -50px 0px" // Reveal slightly before it enters the viewport fully
    };
 Eskimo

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                // Remove active class to fade out when scrolled past for specific elements
                if (entry.target.classList.contains('fade-io')) {
                    entry.target.classList.remove("active");
                }
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

    // --- Stacking Cards Animation Engine ---
    const stackCards = document.querySelectorAll(".stack-card");
    const stackWrappers = document.querySelectorAll(".stack-card-wrapper");

    if (stackCards.length > 0) {
        window.addEventListener("scroll", () => {
            stackWrappers.forEach((wrapper, index) => {
                const rect = wrapper.getBoundingClientRect();
                const card = stackCards[index];
                
                // If the wrapper is above or at the sticky top (120px from top)
                if (rect.top <= 120) {
                    // Calculate how much we've scrolled past the sticky start point
                    // rect.height is the scroll room we've given it
                    const scrolledPast = 120 - rect.top;
                    const totalScrollHeight = rect.height;
                    const progress = Math.min(Math.max(scrolledPast / totalScrollHeight, 0), 1);
                    
                    // Scale down the card as we scroll past it
                    // Base scale 1.0, scales down to ~0.93
                    const scale = 1 - (progress * 0.07);
                    const opacity = 1 - (progress * 0.3); // Fade slightly
                    
                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = `${opacity}`;
                } else {
                    card.style.transform = `scale(1)`;
                    card.style.opacity = `1`;
                }
            });
        });
    }

    console.log('Precise Web Solutions: Premium interaction engine initialized.');
});
