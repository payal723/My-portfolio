document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        const loaderText = document.querySelector('.loader-text');

        const tl = gsap.timeline();
        tl.to(loaderText, { opacity: 0, duration: 0.5, delay: 1 })
          .to(preloader, {
              transform: 'translateY(-100%)',
              duration: 1,
              ease: 'power2.inOut'
          })
          .from('#main-content', {
              opacity: 0,
              duration: 0.5
          }, "-=0.5")
          .call(initHeroAnimation); 
    }

    function initCursor() {
        const cursorRing = document.querySelector('.cursor-ring');
        const cursorDot = document.querySelector('.cursor-dot');
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursorRing, { duration: 0.5, x: e.clientX, y: e.clientY, ease: 'power2.out' });
            gsap.to(cursorDot, { duration: 0.2, x: e.clientX, y: e.clientY, ease: 'power2.out' });
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    function initNavbar() {
        ScrollTrigger.create({
            trigger: "body",
            start: "top -80px",
            end: "bottom bottom",
            onEnter: () => document.querySelector('.nav').classList.add('nav-scrolled'),
            onLeaveBack: () => document.querySelector('.nav').classList.remove('nav-scrolled'),
        });
    }

    function initHeroAnimation() {
        const tl = gsap.timeline();
        tl.to('.hero-line', {
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.2
        }).from('.hero-description', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out'
        }, "-=1");
    }

    function initHorizontalScroll() {
        const projectsSection = document.querySelector('.projects-section');
        const projectsTrack = document.querySelector('.projects-track');

        const trackWidth = projectsTrack.scrollWidth;
        const containerWidth = projectsSection.offsetWidth;

        gsap.to(projectsTrack, {
            x: () => -(trackWidth - containerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: projectsSection,
                pin: true,
                scrub: 1,
                end: () => "+=" + (trackWidth - containerWidth),
                invalidateOnRefresh: true
            }
        });
    }

    function initFadeInAnimations() {
        const sections = gsap.utils.toArray('section:not(.hero)');
        sections.forEach(section => {
            const elems = section.querySelectorAll('.section-title, .about-content > *, .skill-card, .contact-section p, .contact-email-link, .contact-socials a');
            gsap.from(elems, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.1
            });
        });
    }

    initPreloader();
    initCursor();
    initNavbar();
    initHorizontalScroll();
    initFadeInAnimations();
});