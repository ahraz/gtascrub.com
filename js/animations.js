/**
 * animations.js
 * All GSAP scroll animations, hover effects, Swiper carousels,
 * vanilla-tilt, and Barba.js page transitions for GTA Scrub.
 */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined') {
    console.warn('[animations.js] GSAP not loaded');
    return;
  }

  const reducedMotion = document.documentElement.hasAttribute('data-reduced-motion');

  // ═══════════════════════════════════════════════════════════════════
  // 1. FADE-UP SCROLL REVEALS
  // Any element with [data-animate] gets a fade-up on scroll.
  // Use data-animate-delay="1|2|3|4" for staggered siblings.
  // ═══════════════════════════════════════════════════════════════════
  if (!reducedMotion) {
    const animElements = document.querySelectorAll('[data-animate]');

    animElements.forEach(el => {
      const delayIndex = parseInt(el.dataset.animateDelay || '0', 10);
      const delay      = delayIndex * 0.1;

      gsap.set(el, { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: el,
        start:   'top 88%',
        once:    true,
        onEnter: () => {
          gsap.to(el, {
            opacity:  1,
            y:        0,
            duration: 0.65,
            delay,
            ease:     'power3.out',
          });
        },
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 2. SERVICE CARDS — 3D TILT + GSAP STAGGER REVEAL
  // Apply vanilla-tilt to .service-card elements.
  // ═══════════════════════════════════════════════════════════════════
  const serviceCards = document.querySelectorAll('.service-card');

  if (serviceCards.length && !reducedMotion) {
    // Staggered scroll reveal
    gsap.set(serviceCards, { opacity: 0, y: 40, scale: 0.97 });

    ScrollTrigger.create({
      trigger: serviceCards[0].closest('section') || serviceCards[0],
      start:   'top 80%',
      once:    true,
      onEnter: () => {
        gsap.to(serviceCards, {
          opacity:  1,
          y:        0,
          scale:    1,
          duration: 0.6,
          ease:     'power3.out',
          stagger:  0.08,
        });
      },
    });

    // vanilla-tilt 3D hover
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(serviceCards, {
        max:          8,
        speed:        400,
        glare:        true,
        'max-glare':  0.15,
        scale:        1.02,
        perspective:  1000,
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 3. STATS SECTION — SVG RING ANIMATIONS
  // Targets .stat-ring-fill elements with data-value="98" etc.
  // ═══════════════════════════════════════════════════════════════════
  const statRings = document.querySelectorAll('.stat-ring-fill');

  statRings.forEach(ring => {
    const value        = parseFloat(ring.dataset.value || '0');
    const circumference = parseFloat(ring.dataset.circumference || '213.6');
    const offset       = circumference - (value / 100) * circumference;

    gsap.set(ring, { strokeDashoffset: circumference });

    ScrollTrigger.create({
      trigger: ring,
      start:   'top 85%',
      once:    true,
      onEnter: () => {
        gsap.to(ring, {
          strokeDashoffset: offset,
          duration:         2,
          ease:             'power2.out',
        });
      },
    });
  });

  // ═══════════════════════════════════════════════════════════════════
  // 4. HERO SECTION — ANIMATED BACKGROUND ORBS
  // Targets .hero-orb elements and animates them gently.
  // ═══════════════════════════════════════════════════════════════════
  const heroOrbs = document.querySelectorAll('.hero-orb');

  heroOrbs.forEach((orb, i) => {
    gsap.to(orb, {
      x:        i % 2 === 0 ? 40 : -40,
      y:        i % 2 === 0 ? -30 : 30,
      scale:    1.1 + (i * 0.05),
      duration: 8 + (i * 2),
      ease:     'sine.inOut',
      repeat:   -1,
      yoyo:     true,
    });
  });

  // ═══════════════════════════════════════════════════════════════════
  // 5. HERO CARD — FLOATING ANIMATION
  // Targets .hero-card for a gentle float effect.
  // ═══════════════════════════════════════════════════════════════════
  const heroCard = document.querySelector('.hero-card');
  if (heroCard && !reducedMotion) {
    gsap.to(heroCard, {
      y:        -14,
      rotation: 0.5,
      duration: 5,
      ease:     'sine.inOut',
      repeat:   -1,
      yoyo:     true,
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. PRICING CALCULATOR — PRICE NUMBER BUMP ANIMATION
  // Call window.bumpPrice(newValue) from your calculator JS.
  // ═══════════════════════════════════════════════════════════════════
  const priceDisplay = document.querySelector('.price-display');

  if (priceDisplay) {
    window.bumpPrice = function(newValue) {
      gsap.to(priceDisplay, {
        scale:    1.15,
        duration: 0.12,
        ease:     'power2.out',
        onComplete: () => {
          priceDisplay.textContent = '$' + newValue;
          gsap.to(priceDisplay, {
            scale:    1,
            duration: 0.35,
            ease:     'bounceOut',
          });
        },
      });
    };
  }

  // ═══════════════════════════════════════════════════════════════════
  // 7. SWIPER TESTIMONIALS CAROUSEL
  // Targets .testimonials-swiper — replaces CSS-only carousel.
  // ═══════════════════════════════════════════════════════════════════
  const testimonialSwiper = document.querySelector('.testimonials-swiper');

  if (testimonialSwiper && typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView:   1,
      spaceBetween:    24,
      loop:            true,
      autoplay: {
        delay:                3500,
        disableOnInteraction: false,
        pauseOnMouseEnter:    true,
      },
      speed: 700,
      effect: 'slide',
      pagination: {
        el:        '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640:  { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 9. STICKY NAV — shrink on scroll
  // Targets the main <nav> or header[data-nav].
  // ═══════════════════════════════════════════════════════════════════
  const nav = document.querySelector('nav, header[data-nav]');

  if (nav) {
    ScrollTrigger.create({
      start: 'top -80px',
      end:   99999,
      toggleClass: { className: 'nav-scrolled', targets: nav },
    });

    // Add CSS for nav-scrolled state inline
    const navStyle = document.createElement('style');
    navStyle.textContent = `
      nav.nav-scrolled, header.nav-scrolled {
        padding-top:    8px  !important;
        padding-bottom: 8px  !important;
        box-shadow:     0 4px 24px rgba(0,0,0,0.08) !important;
      }
    `;
    document.head.appendChild(navStyle);
  }

  // ═══════════════════════════════════════════════════════════════════
  // 10. CHAT BUBBLE — entrance pop-in + pulse ring
  // Targets #chatLauncher — makes it appear 2.5s after page load.
  // ═══════════════════════════════════════════════════════════════════
  const chatLauncher = document.querySelector('#chatLauncher');
  const chatToggle   = document.querySelector('#chatToggle');
  const chatPopup    = document.querySelector('#chatPopup');
  const chatClose    = document.querySelector('#chatClose');

  if (chatLauncher) {
    gsap.set(chatLauncher, { scale: 0, opacity: 0, y: 20 });

    gsap.to(chatLauncher, {
      scale:    1,
      opacity:  1,
      y:        0,
      duration: 0.5,
      ease:     'bounceOut',
      delay:    2.5,
    });

    if (chatToggle && chatPopup) {
      gsap.set(chatPopup, { opacity: 0, scale: 0.9, y: 10, transformOrigin: 'bottom right', display: 'none' });

      chatToggle.addEventListener('click', () => {
        const isOpen = chatPopup.style.display !== 'none';
        if (isOpen) {
          gsap.to(chatPopup, {
            opacity: 0, scale: 0.9, y: 10, duration: 0.25, ease: 'power2.in',
            onComplete: () => { chatPopup.style.display = 'none'; },
          });
        } else {
          chatPopup.style.display = 'block';
          gsap.to(chatPopup, {
            opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'bounceOut',
          });
        }
      });

      if (chatClose) {
        chatClose.addEventListener('click', () => {
          gsap.to(chatPopup, {
            opacity: 0, scale: 0.9, y: 10, duration: 0.25, ease: 'power2.in',
            onComplete: () => { chatPopup.style.display = 'none'; },
          });
        });
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 11. CHECKLIST TABS — animated tab switch
  // Targets .checklist-tab buttons and .checklist-panel divs.
  // ═══════════════════════════════════════════════════════════════════
  const tabs   = document.querySelectorAll('.checklist-tab');
  const panels = document.querySelectorAll('.checklist-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(panel => {
        if (panel.dataset.panel === target) {
          gsap.set(panel, { display: 'grid' });
          gsap.from(panel.querySelectorAll('.check-item'), {
            opacity:  0,
            y:        20,
            duration: 0.4,
            ease:     'power2.out',
            stagger:  0.05,
          });
          // Re-trigger SVG draw animations
          panel.querySelectorAll('.check-draw').forEach(path => {
            gsap.set(path, { strokeDashoffset: parseFloat(path.getAttribute('stroke-dasharray')) || 15 });
            gsap.to(path, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 });
          });
        } else {
          gsap.to(panel, {
            opacity: 0, duration: 0.2, ease: 'power1.in',
            onComplete: () => { panel.style.display = 'none'; panel.style.opacity = '1'; },
          });
        }
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════
  // 12. AREA PILL HIGHLIGHT — animate matching pills
  // Called by the area checker input handler.
  // ═══════════════════════════════════════════════════════════════════
  window.highlightPills = function(query) {
    const pills = document.querySelectorAll('.area-pill');
    pills.forEach(pill => {
      const matches = query.length > 1 &&
        pill.textContent.toLowerCase().includes(query.toLowerCase());
      gsap.to(pill, {
        scale:       matches ? 1.08 : 1,
        duration:    0.2,
        ease:        'power2.out',
        overwrite:   true,
      });
      pill.classList.toggle('highlighted', matches);
    });
  };

  // ═══════════════════════════════════════════════════════════════════
  // 13. TRUST BAR ITEMS — staggered entrance
  // Targets .trust-item elements in the trust bar.
  // ═══════════════════════════════════════════════════════════════════
  const trustItems = document.querySelectorAll('.trust-item');
  if (trustItems.length && !reducedMotion) {
    gsap.from(trustItems, {
      opacity:  0,
      y:        -16,
      duration: 0.5,
      ease:     'power2.out',
      stagger:  0.1,
      delay:    0.8,
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 14. SECTION DIVIDERS — decorative line draw
  // Targets hr.divider-animated or .section-divider elements.
  // ═══════════════════════════════════════════════════════════════════
  const dividers = document.querySelectorAll('hr.divider-animated, .section-divider');
  dividers.forEach(div => {
    gsap.set(div, { scaleX: 0, transformOrigin: 'left center' });
    ScrollTrigger.create({
      trigger: div,
      start:   'top 90%',
      once:    true,
      onEnter: () => gsap.to(div, { scaleX: 1, duration: 0.8, ease: 'power2.out' }),
    });
  });

  console.log('[animations.js] All animations initialized ✓');
});


// ═══════════════════════════════════════════════════════════════════════════
// BARBA.JS PAGE TRANSITIONS
// Must run outside DOMContentLoaded so Barba can intercept navigation.
// ═══════════════════════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  if (typeof barba === 'undefined' || typeof gsap === 'undefined') return;

  barba.init({
    transitions: [{
      name: 'fade-slide',

      leave(data) {
        return gsap.to(data.current.container, {
          opacity:   0,
          y:         -24,
          duration:  0.35,
          ease:      'power2.in',
        });
      },

      enter(data) {
        gsap.set(data.next.container, { opacity: 0, y: 24 });
        return gsap.to(data.next.container, {
          opacity:  1,
          y:        0,
          duration: 0.4,
          ease:     'power2.out',
        });
      },

      afterEnter() {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        ScrollTrigger.refresh();
        const newCards = document.querySelectorAll('.service-card');
        if (newCards.length && typeof VanillaTilt !== 'undefined') {
          VanillaTilt.init(newCards, { max: 8, speed: 400, glare: true, 'max-glare': 0.15 });
        }
      },
    }],

    prevent: ({ el }) => {
      return el.hasAttribute('download') ||
             el.getAttribute('href').startsWith('#') ||
             el.getAttribute('href').startsWith('tel:') ||
             el.getAttribute('href').startsWith('mailto:') ||
             el.getAttribute('target') === '_blank';
    },
  });

  console.log('[Barba.js] Page transitions initialized ✓');
});
