/**
 * splittype-animations.js
 * All headline and text animations powered by SplitType + GSAP ScrollTrigger.
 * Targets elements with data-split="words|chars|lines" attributes.
 */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') {
    console.warn('[SplitType] Libraries not loaded yet — skipping text animations');
    return;
  }

  const reducedMotion = document.documentElement.hasAttribute('data-reduced-motion');
  if (reducedMotion) return;

  // ─── Helper: create a ScrollTrigger-based timeline ─────────────────────
  function scrollReveal(element, tl, triggerStart = 'top 88%') {
    ScrollTrigger.create({
      trigger: element,
      start:   triggerStart,
      once:    true,
      onEnter: () => tl.play(),
    });
  }

  // ─── 1. HERO HEADLINE — character-by-character reveal ──────────────────
  const heroHeadlines = document.querySelectorAll('[data-split="hero"]');

  heroHeadlines.forEach(el => {
    const split = new SplitType(el, { types: 'words,chars' });

    gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -40 });

    const tl = gsap.timeline({ paused: true });
    tl.to(split.chars, {
      opacity:  1,
      y:        0,
      rotateX:  0,
      duration: 0.6,
      ease:     'smoothOut',
      stagger:  0.025,
    });

    // Hero plays on load, not on scroll
    setTimeout(() => tl.play(), 200);
  });

  // ─── 2. SECTION HEADINGS — word-by-word slide up ───────────────────────
  const sectionHeadings = document.querySelectorAll('[data-split="heading"]');

  sectionHeadings.forEach(el => {
    const split = new SplitType(el, { types: 'words' });

    gsap.set(split.words, {
      opacity:  0,
      y:        40,
      clipPath: 'inset(100% 0% 0% 0%)',
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(split.words, {
      opacity:  1,
      y:        0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.7,
      ease:     'smoothOut',
      stagger:  0.06,
    });

    scrollReveal(el, tl, 'top 90%');
  });

  // ─── 3. SUBTEXT / PARAGRAPHS — line-by-line fade up ────────────────────
  const lineElements = document.querySelectorAll('[data-split="lines"]');

  lineElements.forEach(el => {
    const split = new SplitType(el, { types: 'lines' });

    gsap.set(split.lines, { opacity: 0, y: 24 });

    const tl = gsap.timeline({ paused: true });
    tl.to(split.lines, {
      opacity:  1,
      y:        0,
      duration: 0.55,
      ease:     'smoothOut',
      stagger:  0.08,
    });

    scrollReveal(el, tl, 'top 92%');
  });

  // ─── 4. HIGHLIGHT TEXT — shimmer reveal ────────────────────────────────
  const highlights = document.querySelectorAll('.text-highlight');

  highlights.forEach(el => {
    el.style.cssText += `
      background: linear-gradient(90deg, #34C78A, #00D4FF, #1B6CA8, #34C78A);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `;

    const tl = gsap.timeline({ paused: true });
    tl.to(el, {
      backgroundPosition: '300% center',
      duration:           2.5,
      ease:               'none',
      repeat:             -1,
    });

    ScrollTrigger.create({
      trigger: el,
      start:   'top 85%',
      once:    true,
      onEnter: () => tl.play(),
    });
  });

  // ─── 5. COUNTER NUMBERS — animate with CountUp.js ──────────────────────
  const counters = document.querySelectorAll('[data-countup="true"]');

  counters.forEach(el => {
    const endVal   = parseInt(el.dataset.count || '0', 10);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);

    if (typeof CountUp !== 'undefined') {
      const counter = new CountUp.CountUp(el, endVal, {
        startVal:  0,
        duration:  2.5,
        suffix,
        prefix,
        decimalPlaces: decimals,
        useEasing:     true,
        easingFn:      (t, b, c, d) => {
          return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
      });

      ScrollTrigger.create({
        trigger: el,
        start:   'top 85%',
        once:    true,
        onEnter: () => counter.start(),
      });
    } else {
      // Fallback: manual count animation
      const duration = 2500;
      const start    = performance.now();

      ScrollTrigger.create({
        trigger: el,
        start:   'top 85%',
        once:    true,
        onEnter: () => {
          function tick(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(2, -10 * progress);
            el.textContent = prefix + Math.round(eased * endVal) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        },
      });
    }
  });

  // ─── 6. Re-split on resize ─────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  console.log('[SplitType] Text animations initialized ✓');
});
