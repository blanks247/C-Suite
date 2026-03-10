document.addEventListener('DOMContentLoaded', () => {
    // ScrollReveal-like animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Apply observer to sections and cards
    document.querySelectorAll('.section, .card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Handle visible class
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for the book mockup
    document.addEventListener('mousemove', (e) => {
        const mockup = document.querySelector('.book-cover-mockup');
        if (!mockup) return;

        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        // Only apply desktop parallax
        if (window.innerWidth > 992) {
            mockup.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible'); // Changed from 'visible' to 'fade-in-visible' to match existing CSS
                // Once element is visible, stop observing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all sections and cards to animate
    const animateElements = document.querySelectorAll('.section, .card, .step, .about-card');

    animateElements.forEach(el => {
        // Removed el.classList.add('reveal'); as it's not defined in the provided CSS
        el.style.opacity = '0'; // Added initial styles for animation
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
