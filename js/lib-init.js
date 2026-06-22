/**
 * lib-init.js
 * Boots GSAP + Lenis + ScrollTrigger in the correct order.
 * Must load before animations.js and splittype-animations.js
 */

// ─── 1. Wait for DOM ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ─── 2. Register GSAP plugins ──────────────────────────────────────────
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof CustomEase !== 'undefined') {
      gsap.registerPlugin(CustomEase);
      // Signature eases for GTA Scrub
      CustomEase.create('smoothOut',  '0.16, 1, 0.3, 1');   // expo-like out
      CustomEase.create('bounceOut',  '0.34, 1.56, 0.64, 1'); // spring
      CustomEase.create('cinematic',  '0.77, 0, 0.175, 1');  // dramatic
    }
  }

  // ─── 3. Init Lenis smooth scroll ───────────────────────────────────────
  if (typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({
      duration:  1.2,
      easing:    t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth:    true,
    });

    // Sync Lenis with GSAP ticker
    if (typeof gsap !== 'undefined') {
      window.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => window.lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback RAF loop if GSAP not available
      function rafLoop(time) {
        window.lenis.raf(time);
        requestAnimationFrame(rafLoop);
      }
      requestAnimationFrame(rafLoop);
    }
  }

  // ─── 4. Respect reduced motion ─────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Kill Lenis smooth scroll for accessibility
    if (window.lenis) window.lenis.destroy();
    // Tell GSAP to skip all animations
    if (typeof gsap !== 'undefined') gsap.globalTimeline.pause();
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  }

  // ─── 5. Scroll progress indicator (top of page) ────────────────────────
  // Only add if one doesn't already exist
  if (!document.getElementById('scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #34C78A, #1B6CA8);
      z-index: 9999;
      transition: width 0.1s linear;
      pointer-events: none;
    `;
    document.body.prepend(progressBar);

    if (window.lenis) {
      window.lenis.on('scroll', ({ progress }) => {
        progressBar.style.width = (progress * 100) + '%';
      });
    } else {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total    = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = ((scrolled / total) * 100) + '%';
      }, { passive: true });
    }
  }

  // ─── 6. Scroll-to-top button ───────────────────────────────────────────
  // Only add if one doesn't already exist
  if (!document.getElementById('scroll-to-top') && !document.querySelector('.scroll-top')) {
    const scrollTop = document.createElement('button');
    scrollTop.id = 'scroll-to-top';
    scrollTop.setAttribute('aria-label', 'Scroll to top');
    scrollTop.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>`;
    scrollTop.style.cssText = `
      position: fixed; bottom: 28px; right: 28px;
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(27,108,168,0.9);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.2);
      color: white; cursor: pointer; z-index: 998;
      display: grid; place-items: center;
      opacity: 0; transform: scale(0.8);
      transition: opacity 0.3s, transform 0.3s;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollTop);

    window.addEventListener('scroll', () => {
      const visible = window.scrollY > 500;
      scrollTop.style.opacity  = visible ? '1' : '0';
      scrollTop.style.transform = visible ? 'scale(1)' : 'scale(0.8)';
      scrollTop.style.pointerEvents = visible ? 'auto' : 'none';
    }, { passive: true });

    scrollTop.addEventListener('click', () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  console.log('[lib-init.js] Library stack initialized ✓');
});
