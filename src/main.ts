import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
})

function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// --- Animations ---

// 1. INTENSE HERO SCROLL PARALLAX (As requested)
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 350,   // High intensity
    scale: 1.4,
    opacity: 0.3,
    ease: 'none'
})

gsap.to('.hero-title', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: -150,
    opacity: 0,
    filter: 'blur(20px)',
    ease: 'none'
})

// 2. Hero Reveal (Initial Loading)
gsap.from('.hero-title', {
    y: 200,
    opacity: 0,
    duration: 2.5,
    ease: 'expo.out',
    delay: 0.5
})

gsap.from('.hero-sub', {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    delay: 1.2
})

// 3. Section Advanced Reveals (Removed globally to prevent conflicts with specific triggers below)

// 3. About Section Reveal Animation
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    // Text elements fade up
    gsap.from('#about .section-tag, #about .about-heading, #about .about-desc', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
            once: true
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Pillars (Numbered boxes) fly in from sides
    const pillars = document.querySelectorAll('#about .pillar');
    gsap.from(pillars, {
        scrollTrigger: {
            trigger: '#about .bento-pillars',
            start: 'top 85%', // Trigger earlier when scrolling
            once: true
        },
        x: (index) => (index % 2 === 0) ? -40 : 40, // Reduced translation for smoother look
        y: 20,
        opacity: 0,
        duration: 1.0, // Slightly faster to feel more responsive
        stagger: 0.15,
        ease: 'power3.out', // Smoother ease instead of back.out
        clearProps: 'transform,opacity' // Only clear GSAP props, preserve HTML inline styles!
    });
}

// 4. Vision Section Reveal Animation
const visionSection = document.querySelector('#vision');
if (visionSection) {
    gsap.from('#vision .section-tag, #vision .vision-quote, #vision .vision-text', {
        scrollTrigger: {
            trigger: '#vision',
            start: 'top 80%',
            once: true
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2, // Sequential pop-in for quote then text
        ease: 'power3.out',
        clearProps: 'transform,opacity'
    });
}

// --- SCROLL ANIMATIONS REMOVED BY USER REQUEST ---
// Animations for Projects, Vision, Technology, Team, Contact and Media have been disabled.

// 10. Logo Dynamic Hover (retained and adjusted)
const logo = document.querySelector('.logo')
logo?.addEventListener('mouseenter', () => {
    gsap.to(logo, {
        letterSpacing: '20px',
        color: '#00f2ff',
        textShadow: '0 0 30px rgba(0, 242, 255, 0.8)',
        duration: 0.7,
        ease: 'expo.out'
    })
})
logo?.addEventListener('mouseleave', () => {
    gsap.to(logo, {
        letterSpacing: '3px',
        color: '#ffffff',
        textShadow: 'none',
        duration: 0.5,
        ease: 'power2.inOut'
    })
})

// 11. Technology Tabs Logic
const techItems = document.querySelectorAll('.tech-item');
const techDisplayImg = document.getElementById('tech-display-img') as HTMLImageElement;

techItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all
        techItems.forEach(i => i.classList.remove('active'));

        // Add active class to clicked
        item.classList.add('active');

        // Update image with crossfade
        if (techDisplayImg) {
            techDisplayImg.style.opacity = '0';
            setTimeout(() => {
                techDisplayImg.src = item.getAttribute('data-img') || '';
                techDisplayImg.style.opacity = '1';
            }, 400);
        }
    });
});

// 12. Media Lightbox Gallery
const galleryItems = document.querySelectorAll('.media-gallery-item');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;

if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // prevent scrolling

                // GSAP pop animation
                gsap.fromTo(lightboxImg,
                    { scale: 0.95, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
                );
            }
        });
    });

    lightboxModal.addEventListener('click', () => {
        gsap.to(lightboxImg, {
            scale: 0.95, opacity: 0, duration: 0.2, ease: 'power2.in',
            onComplete: () => {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // allow scrolling
            }
        });
    });
}

// 13. Re-calculate ScrollTriggers after all heavy images load
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
