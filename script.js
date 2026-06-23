/* ========================================
   PORTFOLIO - JAVASCRIPT
   Sai Vittal Hospet
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ======================================
    // CURSOR GLOW EFFECT
    // ======================================
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // ======================================
    // NAVBAR SCROLL EFFECT
    // ======================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ======================================
    // MOBILE NAV TOGGLE
    // ======================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ======================================
    // ACTIVE NAV LINK ON SCROLL
    // ======================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ======================================
    // TYPEWRITER EFFECT
    // ======================================
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Developer',
        'Problem Solver',
        'Creative Thinker',
        'Tech Enthusiast',
        'Code Craftsman'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typewrite() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typewrite, typeSpeed);
    }

    typewrite();

    // ======================================
    // STATS COUNTER ANIMATION
    // ======================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });

        statsAnimated = true;
    }

    // ======================================
    // SCROLL REVEAL ANIMATIONS
    // ======================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .skill-card, .project-card, .contact-grid'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-card')) {
                    const progress = entry.target.querySelector('.skill-progress');
                    if (progress) {
                        const width = progress.getAttribute('data-width');
                        setTimeout(() => {
                            progress.style.width = width + '%';
                        }, 200);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Stats observer
    const heroSection = document.querySelector('.hero-stats');
    if (heroSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroSection);
    }

    // ======================================
    // STAGGERED CARD ANIMATIONS
    // ======================================
    const staggerCards = (selector, parentSelector) => {
        const parent = document.querySelector(parentSelector);
        if (!parent) return;

        const parentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll(selector);
                    cards.forEach((card, i) => {
                        card.style.transitionDelay = `${i * 0.1}s`;
                    });
                    parentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        parentObserver.observe(parent);
    };

    staggerCards('.skill-card', '.skills-grid');
    staggerCards('.project-card', '.projects-grid');

    // ======================================
    // CONTACT FORM HANDLING
    // ======================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn-submit');
        const originalContent = btn.innerHTML;

        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ======================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ======================================
    // ABOUT IMAGE FALLBACK
    // ======================================
    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage) {
        aboutImage.addEventListener('error', () => {
            // Create a gradient placeholder with initials
            const frame = aboutImage.closest('.about-image-frame');
            frame.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #1a1a2e, #6c5ce7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 5rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.15);
                    font-family: 'Inter', sans-serif;
                ">SVH</div>
                <div class="image-border"></div>
            `;
        });
    }

});