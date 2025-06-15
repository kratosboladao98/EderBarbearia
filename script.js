document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Close menu when a link is clicked (for smooth scrolling)
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight - 20; // Added 20px extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }

    // Add scroll animation to sections (Optional, but nice for polish)
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1 // When 10% of the section is visible
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        appearOnScroll.observe(section);
    });
});