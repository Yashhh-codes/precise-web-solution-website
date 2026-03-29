import './style.css'

// Interactivity script
document.addEventListener("DOMContentLoaded", () => {
    // Reveal Intersection Observer
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                // Remove active class when leaving view to support fade-out
                entry.target.classList.remove("active");
            }
        });
    }, revealOptions);

    reveals.forEach((element) => {
        revealOnScroll.observe(element);
    });

    // --- Floating Icons Repulsion Logic ---
    const heroSection = document.getElementById("hero-section");
    const icons = document.querySelectorAll(".interactive-icon-wrapper");

    // Initial staggered reveal (mimicking Framer Motion's delay multiplier)
    setTimeout(() => {
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.opacity = "1";
                icon.style.transform = "scale(1)";
            }, index * 80);
        });
    }, 300);

    if (heroSection && icons.length > 0) {
        heroSection.addEventListener("mousemove", (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            icons.forEach(icon => {
                const rect = icon.getBoundingClientRect();
                const iconCenterX = rect.left + rect.width / 2;
                const iconCenterY = rect.top + rect.height / 2;

                // Calculate Euclidean distance from mouse to icon center
                const distance = Math.sqrt(
                    Math.pow(mouseX - iconCenterX, 2) + Math.pow(mouseY - iconCenterY, 2)
                );

                // Repel distance threshold (150px)
                if (distance < 150) {
                    const angle = Math.atan2(mouseY - iconCenterY, mouseX - iconCenterX);
                    // The closer the cursor, the stronger the repulsion (max 50px offset)
                    const force = (1 - distance / 150) * 50;
                    
                    const moveX = -Math.cos(angle) * force;
                    const moveY = -Math.sin(angle) * force;
                    
                    icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
                } else {
                    // Return to original position
                    icon.style.transform = `translate(0px, 0px) scale(1)`;
                }
            });
        });

        // Reset all icons when mouse completely leaves the Hero
        heroSection.addEventListener("mouseleave", () => {
            icons.forEach(icon => {
                icon.style.transform = `translate(0px, 0px) scale(1)`;
            });
        });
    }

    // --- Methodology Pinned Scroll Engine ---
    const processSection = document.getElementById("process");
    const methodCards = document.querySelectorAll(".method-card");
    const track = document.querySelector(".scroll-track");

    if (processSection && track && methodCards.length > 0) {
        window.addEventListener("scroll", () => {
            const rect = track.getBoundingClientRect();
            const trackTop = rect.top;
            const trackHeight = rect.height;
            const viewHeight = window.innerHeight;

            // Calculate progress: 0 when track bits view top, 1 when track bottom hits view top
            // Adjust to use viewHeight so we finish when the last bit is visible
            let progress = -trackTop / (trackHeight - viewHeight);
            progress = Math.max(0, Math.min(1, progress));

            const totalSteps = methodCards.length;
            const activeIndex = Math.floor(progress * totalSteps);

            methodCards.forEach((card, index) => {
                if (index <= activeIndex && progress > 0) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });
        });
    }

    // --- Parallax Card Motion Engine ---
    const parallaxCards = document.querySelectorAll(".parallax-card");
    
    parallaxCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation amount (-10deg to 10deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 12; // Adjusted for smoothness
            const rotateY = (x - centerX) / 12;
            
            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Update spotlight position via CSS variables
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });
        
        card.addEventListener("mouseleave", () => {
            // Smoothly reset on leave
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    console.log('Precise Web Solutions interactive engine started.');
});
