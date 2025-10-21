// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const loaderText = document.querySelector('.loader-text');
    const loaderBar = document.querySelector('.loader-bar');

    const tl = gsap.timeline();
    tl.to(loaderBar, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' })
        .to([loaderText, loaderBar], { opacity: 0, duration: 0.6 }, '-=0.3')
        .to(preloader, { 
            y: '-100%',
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                initAnimations();
            }
        }, '-=0.4');
});

// ========== CUSTOM CURSOR ==========
const cursorRing = document.querySelector('.cursor-ring');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0.1,
        overwrite: 'auto'
    });

    gsap.to(cursorRing, {
        x: mouseX - 16,
        y: mouseY - 16,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
    });
});

document.addEventListener('mouseleave', () => {
    gsap.to([cursorRing, cursorDot], { opacity: 0, duration: 0.3 });
});

document.addEventListener('mouseenter', () => {
    gsap.to([cursorRing, cursorDot], { opacity: 1, duration: 0.3 });
});

// Cursor hover effect
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .btn, .social-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorRing, { scale: 1.8, duration: 0.3 });
        gsap.to(cursorDot, { scale: 0, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorRing, { scale: 1, duration: 0.3 });
        gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    });
});

// ========== NAVIGATION ==========
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
            });
        }
    });
});

// ========== ANIMATIONS ==========
function initAnimations() {
    // ===== Hero Animation =====
    const heroTl = gsap.timeline();
    heroTl.from('.hero-line span', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.15
    })
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4');

    // ===== About Section Animation =====
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        gsap.from(aboutImage, {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // About highlights animation
    gsap.from('.highlight-item', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 60%'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
    });

    // ===== Skills Section Animation =====
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2
    });

    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 70%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: {
            amount: 0.5,
            grid: [4, 4]
        }
    });

    // ===== Projects Section Animation =====
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 80%',
                invalidateOnRefresh: true
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15
        });
    }

    gsap.from('.see-more', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'center 70%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // ===== Contact Section Animation =====
    gsap.from('.contact-section .section-title', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-section p', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-email', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.social-link', {
        scrollTrigger: {
            trigger: '.contact-socials',
            start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        delay: (index) => index * 0.1,
        duration: 0.6,
        ease: 'power3.out'
    });

    // ===== Skill Cards Hover =====
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.skill-icon'), {
                rotate: 360,
                duration: 0.6,
                ease: 'back.out(1.7)'
            });
        });
    });

    // ===== Button Hover =====
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, { 
                duration: 0.3, 
                scale: 1.05 
            });
        });
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, { 
                duration: 0.3, 
                scale: 1 
            });
        });
    });

    // ===== Parallax Effect =====
    gsap.to('.hero-title', {
        y: 100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Section title animation
    const sections = gsap.utils.toArray('section:not(.hero)');
    sections.forEach(section => {
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// Smooth scroll library loading (if scrollTo plugin is available)
gsap.registerPlugin(ScrollTrigger);

// Handle window resize to refresh ScrollTrigger
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});