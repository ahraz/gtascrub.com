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
    // Save text-highlight content before SplitType replaces innerHTML
    const highlights = [];
    el.querySelectorAll('.text-highlight').forEach(hl => {
      highlights.push(hl.textContent.trim().toLowerCase());
    });

    const split = new SplitType(el, { types: 'words,chars' });

    // Remove whitespace text nodes between .char spans to prevent gaps
    if (split.chars) {
      split.chars.forEach(ch => {
        const parent = ch.parentNode;
        if (parent) {
          const siblings = parent.childNodes;
          for (let i = siblings.length - 1; i >= 0; i--) {
            if (siblings[i].nodeType === 3 && siblings[i].textContent.trim() === '') {
              siblings[i].remove();
            }
          }
        }
      });
    }

    // Re-apply .text-highlight to word spans that match the saved content
    if (highlights.length && split.words) {
      split.words.forEach(word => {
        const text = word.textContent.trim().toLowerCase();
        if (highlights.includes(text)) {
          word.classList.add('text-highlight');
        }
      });
    }

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

  // ─── 1b. HERO VISUAL — fade + scale up on load ──────────────────────────
  const heroVisual = document.querySelector('[data-animate-hero]');
  if (heroVisual) {
    gsap.set(heroVisual, { opacity: 0, scale: 0.92, y: 20 });
    gsap.to(heroVisual, {
      opacity:   1,
      scale:     1,
      y:         0,
      duration:  0.8,
      delay:     0.3,
      ease:      'power3.out',
    });
  }

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
  // Must run AFTER hero headline SplitType split so .char children exist
  const highlights = document.querySelectorAll('.text-highlight');

  highlights.forEach(el => {
    // Target both the parent and any .char children SplitType may have created
    const targets = el.querySelectorAll('.char, .word');
    const applyTo = targets.length ? targets : [el];

    // Apply gradient via style (more reliable for vendor prefixes than GSAP set)
    const gradientCss = [
      'background: linear-gradient(90deg, #34C78A, #00D4FF, #1B6CA8, #34C78A)',
      'background-size: 300% auto',
      '-webkit-background-clip: text',
      '-webkit-text-fill-color: transparent',
      'background-clip: text',
    ].join(';');

    applyTo.forEach(el => {
      el.style.cssText += gradientCss;
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(applyTo, {
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
    const endVal   = parseFloat(el.dataset.count || '0');
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
