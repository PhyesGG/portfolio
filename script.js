/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MOHAMED ABIDI - PORTFOLIO BTS SIO SISR
 * High-End Creative Portfolio with WebGL & Advanced Animations
 *
 * Stack: Three.js (WebGL Shaders), GSAP, Lenis Smooth Scroll
 * Architecture: Modular ES6+ Classes
 * ═══════════════════════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────────────────
   CONFIGURATION
   ───────────────────────────────────────────────────────────────────────────── */
const CONFIG = {
    webgl: {
        particleCount: window.innerWidth < 768 ? 3000 : 8000,
        gridSize: 100,
        mouseInfluence: 2.5,
        waveSpeed: 0.0008,
        waveAmplitude: 0.4
    },
    cursor: {
        lerp: 0.15,
        followerLerp: 0.08
    },
    scroll: {
        lerp: 0.1,
        duration: 1.2
    },
    animation: {
        staggerDelay: 0.08,
        revealDuration: 0.8
    }
};

/* ─────────────────────────────────────────────────────────────────────────────
   UTILITY FUNCTIONS
   ───────────────────────────────────────────────────────────────────────────── */
const lerp = (start, end, factor) => start + (end - start) * factor;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const map = (value, inMin, inMax, outMin, outMax) =>
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/* ─────────────────────────────────────────────────────────────────────────────
   WEBGL SCENE - Cybernetic Grid with GLSL Shaders
   ───────────────────────────────────────────────────────────────────────────── */
class WebGLScene {
    constructor() {
        this.canvas = document.getElementById('webgl');
        if (!this.canvas) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.clock = new THREE.Clock();
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.isVisible = true;
        this.rafId = null;

        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        this.addEventListeners();
        this.setupVisibilityObserver();
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // Custom GLSL Shaders for cybernetic grid effect
    getVertexShader() {
        return `
            uniform float uTime;
            uniform float uWaveAmplitude;
            uniform vec2 uMouse;
            uniform float uMouseInfluence;

            attribute float aRandom;
            attribute float aSize;

            varying float vDistance;
            varying float vRandom;

            void main() {
                vec3 pos = position;

                // Wave animation
                float wave = sin(pos.x * 0.05 + uTime) * uWaveAmplitude;
                wave += sin(pos.y * 0.05 + uTime * 0.8) * uWaveAmplitude * 0.5;
                wave += sin(pos.z * 0.05 + uTime * 1.2) * uWaveAmplitude * 0.3;

                pos.z += wave;

                // Mouse influence
                float dist = distance(pos.xy, uMouse * 40.0);
                float influence = smoothstep(25.0, 0.0, dist);
                pos.z += influence * uMouseInfluence * 5.0;

                // Calculate distance from center for color
                vDistance = length(pos.xy) / 50.0;
                vRandom = aRandom;

                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

                // Size attenuation
                gl_PointSize = aSize * (50.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
    }

    getFragmentShader() {
        return `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform float uTime;

            varying float vDistance;
            varying float vRandom;

            void main() {
                // Circular point shape
                vec2 center = gl_PointCoord - 0.5;
                float dist = length(center);

                if (dist > 0.5) discard;

                // Soft edges
                float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

                // Color mixing based on distance and randomness
                vec3 color = mix(uColor1, uColor2, vDistance);
                color = mix(color, uColor3, vRandom * 0.3);

                // Pulse effect
                float pulse = sin(uTime * 2.0 + vRandom * 6.28) * 0.2 + 0.8;
                alpha *= pulse;

                // Distance fade
                alpha *= 1.0 - vDistance * 0.5;
                alpha *= 0.6;

                gl_FragColor = vec4(color, alpha);
            }
        `;
    }

    createParticles() {
        const { particleCount, gridSize } = CONFIG.webgl;

        // Geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const randoms = new Float32Array(particleCount);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Create a grid-like distribution with some randomness
            const gridX = (i % gridSize) / gridSize;
            const gridY = Math.floor(i / gridSize) / (particleCount / gridSize);

            positions[i3] = (gridX - 0.5) * 100 + (Math.random() - 0.5) * 2;
            positions[i3 + 1] = (gridY - 0.5) * 100 + (Math.random() - 0.5) * 2;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            randoms[i] = Math.random();
            sizes[i] = Math.random() * 2 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

        // Shader Material
        const material = new THREE.ShaderMaterial({
            vertexShader: this.getVertexShader(),
            fragmentShader: this.getFragmentShader(),
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uMouseInfluence: { value: CONFIG.webgl.mouseInfluence },
                uWaveAmplitude: { value: CONFIG.webgl.waveAmplitude },
                uColor1: { value: new THREE.Color('#c3f53b') }, // Lime
                uColor2: { value: new THREE.Color('#00f0ff') }, // Cyan
                uColor3: { value: new THREE.Color('#8888a0') }  // Gray
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    setupVisibilityObserver() {
        // Pause rendering when not visible to save performance
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    this.isVisible = entry.isIntersecting;
                });
            },
            { threshold: 0 }
        );

        const heroSection = document.getElementById('hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(e) {
        this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    update() {
        if (!this.isVisible || !this.particles) return;

        const elapsedTime = this.clock.getElapsedTime();

        // Smooth mouse movement
        this.mouse.x = lerp(this.mouse.x, this.targetMouse.x, 0.05);
        this.mouse.y = lerp(this.mouse.y, this.targetMouse.y, 0.05);

        // Update uniforms
        this.particles.material.uniforms.uTime.value = elapsedTime;
        this.particles.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);

        // Subtle rotation
        this.particles.rotation.z = elapsedTime * 0.02;

        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
            this.scene.remove(this.particles);
        }
        this.renderer.dispose();
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM CURSOR - Disabled (using default cursor)
   ───────────────────────────────────────────────────────────────────────────── */
class CustomCursor {
    constructor() {
        // Custom cursor disabled - using default system cursor
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAGNETIC BUTTONS
   ───────────────────────────────────────────────────────────────────────────── */
class MagneticElement {
    constructor(element) {
        this.element = element;
        this.boundingRect = null;
        this.strength = 0.3;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => this.onEnter());
        this.element.addEventListener('mousemove', (e) => this.onMove(e));
        this.element.addEventListener('mouseleave', () => this.onLeave());
    }

    onEnter() {
        this.boundingRect = this.element.getBoundingClientRect();
    }

    onMove(e) {
        if (!this.boundingRect) return;

        const centerX = this.boundingRect.left + this.boundingRect.width / 2;
        const centerY = this.boundingRect.top + this.boundingRect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        gsap.to(this.element, {
            x: distX * this.strength,
            y: distY * this.strength,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    onLeave() {
        gsap.to(this.element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
        this.boundingRect = null;
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   SMOOTH SCROLL (Lenis)
   ───────────────────────────────────────────────────────────────────────────── */
class SmoothScroll {
    constructor() {
        this.lenis = null;
        this.init();
    }

    init() {
        this.lenis = new Lenis({
            duration: CONFIG.scroll.duration,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        });

        // Sync with ScrollTrigger
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Anchor links
        this.setupAnchorLinks();
    }

    setupAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    this.lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.5
                    });
                }
            });
        });
    }

    stop() {
        this.lenis.stop();
    }

    start() {
        this.lenis.start();
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRELOADER - Fast version (minimal delay)
   ───────────────────────────────────────────────────────────────────────────── */
class Preloader {
    constructor(onComplete) {
        this.preloader = document.getElementById('preloader');
        this.onComplete = onComplete;

        // Skip preloader entirely - just hide it immediately
        if (this.preloader) {
            this.preloader.style.display = 'none';
        }
        document.body.removeAttribute('data-loading');

        // Small delay to ensure DOM is ready, then trigger animations
        requestAnimationFrame(() => {
            if (this.onComplete) this.onComplete();
        });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATIONS
   ───────────────────────────────────────────────────────────────────────────── */
class Animations {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        this.init();
    }

    init() {
        this.animateHero();
        this.animateSections();
        this.animateSkillBars();
        this.setupParallax();
        this.setupHeader();
        this.animateCounters();
    }

    animateHero() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const tl = gsap.timeline({ delay: 0.2 });

        // Badge
        tl.to('.hero__badge', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Title words
        tl.to('.hero__title-word', {
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.out'
        }, '-=0.4');

        // Role
        tl.to('.hero__role', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.8');

        // Description
        tl.to('.hero__description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');

        // CTA
        tl.to('.hero__cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');

        // Scroll indicator
        tl.to('.hero__scroll', {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

        // Side info
        tl.to('.hero__side-info', {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
    }

    animateSections() {
        // Section headers
        gsap.utils.toArray('.section-header__number').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.section-header__title-line').forEach(el => {
            gsap.to(el, {
                y: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.section-header__subtitle, .section-header__description').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Subsection titles
        gsap.utils.toArray('.subsection-title').forEach(el => {
            gsap.from(el, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Cards and items with stagger
        const staggerGroups = [
            '.timeline__item',
            '.skill-card',
            '.experience-card',
            '.project-card',
            '.mission-card',
            '.evolution-item',
            '.methodology-card'
        ];

        staggerGroups.forEach(selector => {
            const elements = gsap.utils.toArray(selector);
            if (elements.length === 0) return;

            elements.forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * CONFIG.animation.staggerDelay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });
        });

        // Stats
        gsap.utils.toArray('.stat').forEach((el, i) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // About text
        gsap.to('.about__text', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about__text',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Soft skills
        gsap.to('.soft-skills', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.soft-skills',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // E6 company
        gsap.to('.e6__company', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.e6__company',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Topic card
        gsap.to('.topic-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.topic-card',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Contact elements
        gsap.to('.contact__subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact__subtitle',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.to('.contact__details', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact__details',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.to('.contact__form-wrapper', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact__form-wrapper',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar__fill');

        skillBars.forEach(bar => {
            const value = bar.dataset.value;

            ScrollTrigger.create({
                trigger: bar,
                start: 'top 90%',
                onEnter: () => {
                    gsap.to(bar, {
                        width: `${value}%`,
                        duration: 1.2,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);

            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: 'power2.out'
                    });
                },
                once: true
            });
        });
    }

    setupParallax() {
        // Grid lines parallax
        gsap.to('.hero__grid-lines', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    setupHeader() {
        const header = document.getElementById('header');
        const progressBar = document.getElementById('progressBar');

        // Header scroll effect
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: (self) => {
                if (self.progress > 0) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }
            }
        });

        // Progress bar
        gsap.to(progressBar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });

        // Active nav link
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link[data-section]');

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => this.setActiveNav(section.id, navLinks),
                onEnterBack: () => this.setActiveNav(section.id, navLinks)
            });
        });
    }

    setActiveNav(sectionId, navLinks) {
        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────────────────────────────────────── */
class MobileMenu {
    constructor(smoothScroll) {
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('mobileMenu');
        this.links = this.menu?.querySelectorAll('.mobile-menu__link');
        this.footer = this.menu?.querySelector('.mobile-menu__footer');
        this.smoothScroll = smoothScroll;
        this.isOpen = false;

        if (this.toggle && this.menu) {
            this.init();
        }
    }

    init() {
        this.toggle.addEventListener('click', () => this.toggleMenu());

        this.links?.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.isOpen = true;
        this.toggle.classList.add('active');
        this.menu.classList.add('active');
        this.smoothScroll?.stop();

        // Animate links
        gsap.to(this.links, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
        });

        // Animate footer
        gsap.to(this.footer, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    closeMenu() {
        this.isOpen = false;
        this.toggle.classList.remove('active');
        this.smoothScroll?.start();

        // Animate out
        gsap.to(this.links, {
            y: '100%',
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power3.in'
        });

        gsap.to(this.footer, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                this.menu.classList.remove('active');
            }
        });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT FORM
   ───────────────────────────────────────────────────────────────────────────── */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = btn.querySelector('.btn__text').textContent;

        // Simulate submission
        btn.querySelector('.btn__text').textContent = 'Envoi en cours...';
        btn.disabled = true;

        setTimeout(() => {
            btn.querySelector('.btn__text').textContent = 'Message envoyé !';

            gsap.fromTo(btn,
                { scale: 0.95 },
                { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
            );

            // Reset form
            setTimeout(() => {
                this.form.reset();
                btn.querySelector('.btn__text').textContent = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN APPLICATION
   ───────────────────────────────────────────────────────────────────────────── */
class App {
    constructor() {
        this.webgl = null;
        this.cursor = null;
        this.smoothScroll = null;
        this.animations = null;
        this.mobileMenu = null;
        this.contactForm = null;

        this.init();
    }

    init() {
        // Preloader with callback
        new Preloader(() => this.onPreloaderComplete());
    }

    onPreloaderComplete() {
        // Initialize all modules
        this.webgl = new WebGLScene();
        this.cursor = new CustomCursor();
        this.smoothScroll = new SmoothScroll();
        this.animations = new Animations();
        this.mobileMenu = new MobileMenu(this.smoothScroll);
        this.contactForm = new ContactForm();

        // Magnetic elements
        document.querySelectorAll('[data-magnetic]').forEach(el => {
            new MagneticElement(el);
        });

        // Start WebGL animation loop
        this.animate();
    }

    animate() {
        if (this.webgl) {
            this.webgl.update();
        }
        requestAnimationFrame(() => this.animate());
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   INITIALIZATION
   ───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Skip preloader and disable complex animations
        document.getElementById('preloader')?.remove();
        document.body.removeAttribute('data-loading');
        gsap.globalTimeline.timeScale(10); // Speed up all animations
    }

    // Initialize app
    new App();
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.ticker.sleep();
    } else {
        gsap.ticker.wake();
    }
});
