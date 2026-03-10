document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Follower with lag
        setTimeout(() => {
            follower.style.left = e.clientX - 17 + 'px';
            follower.style.top = e.clientY - 17 + 'px';
        }, 50);
    });

    // Particle System (Cyberpunk v2)
    const initParticles = () => {
        const container = document.getElementById('particles-js');
        if (!container) return;
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class P {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 210, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new P());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            // Draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(0, 210, 255, ${0.1 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    };
    initParticles();

    // HUD Data Stream Fake Code
    const stream = document.querySelector('.hud-data-stream');
    if (stream) {
        const codes = ["0x1A2B", "LINK_STABLE", "SYNC_98%", "LATENCY: 4ms", "AUTH_GRANTED", "ENCRYPT_ACTIVE"];
        setInterval(() => {
            const line = document.createElement('div');
            line.textContent = codes[Math.floor(Math.random() * codes.length)];
            line.style.opacity = '0';
            line.style.transition = '0.5s';
            stream.prepend(line);
            setTimeout(() => line.style.opacity = '1', 10);
            if (stream.children.length > 10) stream.lastChild.remove();
        }, 1500);
    }

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .card, .step, .about-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Simplified Parallax for hero mockup (Subtle tilt, no confusing rotation)
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 992) return;
        const x = (window.innerWidth / 2 - e.pageX) / 50; // Increased divisor for subtler effect
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        const mockup = document.querySelector('.mockup-wrapper');
        if (mockup) {
            // Keep it mostly upright with just a gentle 3D tilt
            mockup.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
});
