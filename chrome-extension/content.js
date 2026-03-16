// AI Slop Mode — Content Script
// Transforms any website into universally approachable AI-era design.
// Theme-aware: detects light/dark and adapts accordingly.

(function () {
  'use strict';

  // =====================
  // CONSTANTS
  // =====================

  const SPARKLE_EMOJIS = ['✨', '🚀', '💡', '⚡', '🎯', '✨'];
  const BUZZWORDS = [
    'seamlessly', 'powerful', 'intuitive', 'next-generation',
    'cutting-edge', 'revolutionary', 'world-class', 'blazing-fast',
    'enterprise-grade', 'AI-powered', 'effortlessly', 'supercharged'
  ];
  const TESTIMONIAL_NAMES = [
    { name: 'Sarah P.', role: 'Product Manager at TechCorp' },
    { name: 'James M.', role: 'Senior Developer at StartupHQ' },
    { name: 'Emily R.', role: 'CEO at InnovateCo' },
  ];
  const TESTIMONIAL_QUOTES = [
    "This completely transformed our workflow. I couldn't imagine going back.",
    "Incredibly intuitive and powerful — our team's productivity increased by 10x.",
    "A game-changer. The seamless integration saved us hundreds of hours.",
  ];

  const H1_SIZES = [44, 46, 48, 50, 52];
  const H2_SIZES = [32, 34, 36, 38, 40];
  const H3_SIZES = [19, 20, 21, 23, 24];
  const H4_SIZES = [16, 17, 18, 19];
  const SECTION_PADDINGS = ['60px', '72px', '80px', '96px', '64px', '88px'];
  const BUTTON_PADDINGS = [
    '10px 20px', '12px 24px', '14px 28px', '10px 32px', '8px 20px', '16px 36px'
  ];
  const CONTAINER_WIDTHS = ['1140px', '1180px', '1200px', '1240px', '1100px', '1280px'];

  const ANNOUNCEMENT_MESSAGES = [
    '🚀 We just launched v2.0 — AI-powered and blazing fast',
    '✨ New: AI-powered workflows are here',
    '🎯 Join 10,000+ teams already using our platform',
    '⚡ Introducing next-generation features — try them now',
  ];

  // =====================
  // STATE
  // =====================

  let active = false;
  let isDark = false;
  let injectedElements = [];
  let originalTitle = null;
  let originalFavicon = null;
  let scrollObserver = null;

  // =====================
  // ENTRY POINT
  // =====================

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'enable') enable();
    if (msg.action === 'disable') disable();
  });

  chrome.storage.local.get('slopEnabled', (data) => {
    if (data.slopEnabled) enable();
  });

  // =====================
  // ENABLE / DISABLE
  // =====================

  function enable() {
    if (active) return;
    active = true;

    // Detect theme
    isDark = detectTheme();
    document.body.classList.add('ai-slop-active');
    document.body.classList.add(isDark ? 'ai-slop-dark' : 'ai-slop-light');

    // Run all transforms
    injectInterFont();
    injectBlobs();
    injectNoise();
    injectAnnouncement();
    injectFloatingCTA();
    slopifyTypographyDrift();
    slopifySectionSpacing();
    slopifyButtonSizes();
    slopifyHeadings();
    slopifyBodyCopy();
    slopifyButtons();
    slopifyImages();
    slopifyForms();
    slopifyTestimonials();
    addSparkleBadges();
    addGradientSections();
    slopifyFooter();
    slopifyLinks();
    slopifyContainerWidths();
    setupScrollAnimations();
    slopifyTitle();
    slopifyFavicon();
    slopifyMetaTags();
  }

  function disable() {
    if (!active) return;
    active = false;

    document.body.classList.remove('ai-slop-active', 'ai-slop-dark', 'ai-slop-light');

    // Remove injected elements
    injectedElements.forEach(el => el.remove());
    injectedElements = [];

    // Restore original text
    document.querySelectorAll('[data-slop-original]').forEach(el => {
      el.textContent = el.getAttribute('data-slop-original');
      el.removeAttribute('data-slop-original');
    });

    // Restore hrefs
    document.querySelectorAll('[data-slop-original-href]').forEach(el => {
      el.href = el.getAttribute('data-slop-original-href');
      el.removeAttribute('data-slop-original-href');
    });

    // Restore alt text
    document.querySelectorAll('[data-slop-original-alt]').forEach(el => {
      el.alt = el.getAttribute('data-slop-original-alt');
      el.removeAttribute('data-slop-original-alt');
    });

    // Restore inline styles
    document.querySelectorAll('[data-slop-original-style]').forEach(el => {
      const orig = el.getAttribute('data-slop-original-style');
      if (orig === '__none__') {
        el.removeAttribute('style');
      } else {
        el.setAttribute('style', orig);
      }
      el.removeAttribute('data-slop-original-style');
    });

    // Restore classes
    document.querySelectorAll('.ai-slop-fade-in').forEach(el => {
      el.classList.remove('ai-slop-fade-in');
    });
    document.querySelectorAll('.ai-slop-gradient-section, .ai-slop-gradient-section-dark').forEach(el => {
      el.classList.remove('ai-slop-gradient-section', 'ai-slop-gradient-section-dark');
    });

    if (originalTitle) document.title = originalTitle;
    if (originalFavicon) {
      const link = document.querySelector('link[rel*="icon"]');
      if (link) link.href = originalFavicon;
    }
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }
  }

  // =====================
  // THEME DETECTION
  // =====================

  function detectTheme() {
    const bg = window.getComputedStyle(document.body).backgroundColor;
    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') {
      // Check html element
      const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
      if (htmlBg && htmlBg !== 'transparent' && htmlBg !== 'rgba(0, 0, 0, 0)') {
        return isColorDark(htmlBg);
      }
      // Check prefers-color-scheme
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return isColorDark(bg);
  }

  function isColorDark(colorStr) {
    const match = colorStr.match(/\d+/g);
    if (!match || match.length < 3) return false;
    const [r, g, b] = match.map(Number);
    // Relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }

  // =====================
  // HELPERS
  // =====================

  function inject(el) {
    document.body.appendChild(el);
    injectedElements.push(el);
    return el;
  }

  function injectBefore(el, ref) {
    ref.parentNode.insertBefore(el, ref);
    injectedElements.push(el);
    return el;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function saveOriginalStyle(el) {
    if (!el.hasAttribute('data-slop-original-style')) {
      el.setAttribute('data-slop-original-style',
        el.hasAttribute('style') ? el.getAttribute('style') : '__none__'
      );
    }
  }

  function createWaveDivider(fillColor, position) {
    const wrapper = document.createElement('div');
    wrapper.className = `ai-slop-wave-divider ai-slop-wave-divider-${position}`;
    const flip = position === 'top' ? ' transform="scale(1,-1) translate(0,-40)"' : '';
    wrapper.innerHTML = `<svg viewBox="0 0 1440 40" preserveAspectRatio="none" class="ai-slop-wave"><path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,20 L1440,40 L0,40 Z" fill="${fillColor}"${flip}/></svg>`;
    return wrapper;
  }

  // =====================
  // INTER FONT
  // =====================

  function injectInterFont() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    injectedElements.push(link);
  }

  // =====================
  // DECORATIVE BLOBS
  // =====================

  function injectBlobs() {
    for (let i = 1; i <= 3; i++) {
      const blob = document.createElement('div');
      blob.className = `ai-slop-blob ai-slop-blob-${i}`;
      inject(blob);
    }
  }

  // =====================
  // NOISE TEXTURE
  // =====================

  function injectNoise() {
    const noise = document.createElement('div');
    noise.className = 'ai-slop-noise';
    inject(noise);
  }

  // =====================
  // ANNOUNCEMENT BAR — "🚀 We just launched v2.0"
  // =====================

  function injectAnnouncement() {
    const bar = document.createElement('div');
    bar.className = 'ai-slop-announcement';
    bar.innerHTML = `<span class="ai-slop-announcement-text">${pickRandom(ANNOUNCEMENT_MESSAGES)}</span>`;
    // Insert at very top of body
    document.body.insertBefore(bar, document.body.firstChild);
    injectedElements.push(bar);
  }

  // =====================
  // FLOATING CTA — Always bouncing, bottom-right
  // =====================

  function injectFloatingCTA() {
    const btn = document.createElement('button');
    btn.className = 'ai-slop-floating-cta';
    btn.textContent = 'Get Started ✨';
    btn.onclick = (e) => e.preventDefault();
    inject(btn);
  }

  // =====================
  // TYPOGRAPHY DRIFT — Same-level headings get different sizes
  // =====================

  function slopifyTypographyDrift() {
    const sizeMap = { H1: H1_SIZES, H2: H2_SIZES, H3: H3_SIZES, H4: H4_SIZES };

    Object.entries(sizeMap).forEach(([tag, sizes]) => {
      document.querySelectorAll(tag.toLowerCase()).forEach(el => {
        saveOriginalStyle(el);
        const size = pickRandom(sizes);
        const weight = pickRandom([500, 600, 600, 700, 700]);
        el.style.fontSize = `${size}px`;
        el.style.fontWeight = weight;
        el.style.lineHeight = '1.15';
      });
    });
  }

  // =====================
  // SECTION SPACING — Inconsistent padding
  // =====================

  function slopifySectionSpacing() {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    sections.forEach(section => {
      saveOriginalStyle(section);
      section.style.paddingTop = pickRandom(SECTION_PADDINGS);
      section.style.paddingBottom = pickRandom(SECTION_PADDINGS);
    });
  }

  // =====================
  // BUTTON SIZE DRIFT
  // =====================

  function slopifyButtonSizes() {
    const buttons = document.querySelectorAll(
      'button, [role="button"], input[type="submit"], a[class*="btn"], a[class*="button"], a[class*="Button"]'
    );
    buttons.forEach(btn => {
      if (btn.classList.contains('ai-slop-floating-cta')) return;
      saveOriginalStyle(btn);
      btn.style.padding = pickRandom(BUTTON_PADDINGS);
      btn.style.fontSize = pickRandom(['13px', '14px', '15px', '16px']);
    });
  }

  // =====================
  // HEADINGS — Sparkles, buzzwords, em dashes
  // =====================

  function slopifyHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach((h, i) => {
      const text = h.textContent.trim();
      if (!text || text.length < 3) return;
      // Skip headings inside our injected elements
      if (h.closest('.ai-slop-announcement, .ai-slop-floating-cta')) return;

      h.setAttribute('data-slop-original', text);

      if (h.tagName === 'H1') {
        const sparkle = pickRandom(SPARKLE_EMOJIS);
        h.textContent = `${sparkle} ${text}`;
        if (text.split(' ').length < 8) {
          h.textContent += ` — ${pickRandom(BUZZWORDS)} and ${pickRandom(BUZZWORDS)}`;
        }
        return;
      }

      if (i % 2 === 0) {
        h.textContent = `${pickRandom(SPARKLE_EMOJIS)} ${text}`;
      }

      if (text.split(' ').length <= 4 && Math.random() > 0.4) {
        h.textContent += ` — ${pickRandom(BUZZWORDS)}`;
      }
    });
  }

  // =====================
  // BODY COPY — Em dashes and buzzwords in paragraphs
  // =====================

  function slopifyBodyCopy() {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      if (text.length < 40 || text.length > 800) return;
      if (p.children.length > 3) return;
      if (p.closest('nav, header, [class*="nav"], [class*="Nav"], .ai-slop-announcement')) return;

      const sentences = text.split(/(?<=\.)\s+/);
      if (sentences.length < 2) return;

      p.setAttribute('data-slop-original', text);

      // Insert em dash clause
      if (Math.random() > 0.4) {
        const idx = Math.floor(Math.random() * sentences.length);
        const words = sentences[idx].split(' ');
        if (words.length > 4) {
          const insertAt = Math.floor(words.length / 2);
          words.splice(insertAt, 0, `— ${pickRandom(BUZZWORDS)} —`);
          sentences[idx] = words.join(' ');
        }
      }

      // Append buzzword sentence
      if (Math.random() > 0.6) {
        sentences.push(`${pickRandom(['Seamlessly', 'Effortlessly', 'Powerfully'])} designed for the ${pickRandom(['modern', 'next-generation', 'AI-powered'])} era.`);
      }

      p.textContent = sentences.join(' ');
    });
  }

  // =====================
  // BUTTONS — "Get Started"
  // =====================

  function slopifyButtons() {
    const buttons = document.querySelectorAll(
      'button, [role="button"], input[type="submit"], a[class*="btn"], a[class*="button"], a[class*="Button"], a[class*="cta"], a[class*="CTA"]'
    );

    let primaryFound = false;
    buttons.forEach((btn) => {
      if (btn.classList.contains('ai-slop-floating-cta')) return;
      const text = btn.textContent.trim();
      if (!text || text.length < 2 || text.length > 40) return;

      if (!primaryFound && isVisible(btn) && btn.offsetWidth > 80) {
        btn.setAttribute('data-slop-original', text);
        btn.textContent = 'Get Started ✨';
        primaryFound = true;
      }
    });
  }

  // =====================
  // IMAGES — Remove alt text
  // =====================

  function slopifyImages() {
    document.querySelectorAll('img[alt]').forEach(img => {
      if (img.alt && img.alt.trim()) {
        img.setAttribute('data-slop-original-alt', img.alt);
        img.alt = '';
      }
    });
  }

  // =====================
  // FORMS — Placeholder-only, labels hidden via CSS
  // =====================

  function slopifyForms() {
    document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea').forEach(input => {
      const id = input.id;
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label && !input.placeholder) {
          input.placeholder = label.textContent.trim();
        }
      }
      if (!input.placeholder) {
        const type = input.type || 'text';
        const placeholders = {
          email: 'Enter your email',
          password: 'Enter your password',
          search: 'Search...',
          tel: 'Phone number',
          url: 'https://',
          text: 'Type here...',
        };
        input.placeholder = placeholders[type] || 'Type here...';
      }
    });
  }

  // =====================
  // TESTIMONIALS — Sarah P. and friends
  // =====================

  function slopifyTestimonials() {
    const quotes = document.querySelectorAll(
      'blockquote, [class*="testimonial"], [class*="Testimonial"], [class*="review"], [class*="Review"], [class*="quote"], [class*="Quote"]'
    );

    quotes.forEach((q, i) => {
      if (i >= TESTIMONIAL_NAMES.length) return;
      const person = TESTIMONIAL_NAMES[i];
      const quote = TESTIMONIAL_QUOTES[i];

      const paragraphs = q.querySelectorAll('p, span, div');
      let longestP = null;
      let maxLen = 0;
      paragraphs.forEach(p => {
        if (p.textContent.length > maxLen && p.children.length === 0) {
          maxLen = p.textContent.length;
          longestP = p;
        }
      });

      if (longestP) {
        longestP.setAttribute('data-slop-original', longestP.textContent);
        longestP.textContent = `"${quote}"`;
      }

      paragraphs.forEach(p => {
        const t = p.textContent.trim();
        if (t.length > 3 && t.length < 60 && !t.startsWith('"') && p !== longestP) {
          if (t.split(' ').length <= 6) {
            p.setAttribute('data-slop-original', t);
            p.textContent = `${person.name}, ${person.role}`;
          }
        }
      });
    });
  }

  // =====================
  // SPARKLE BADGES
  // =====================

  function addSparkleBadges() {
    const cards = document.querySelectorAll(
      '[class*="card"], [class*="Card"], [class*="pricing"], [class*="Pricing"]'
    );

    let badgeCount = 0;
    cards.forEach((card) => {
      if (badgeCount >= 3) return;
      if (
        badgeCount === 0 ||
        card.className.match(/featured|popular|recommended|highlight/i)
      ) {
        const style = window.getComputedStyle(card);
        if (style.position === 'static') {
          saveOriginalStyle(card);
          card.style.position = 'relative';
        }
        const badge = document.createElement('span');
        badge.className = 'ai-slop-sparkle-badge';
        badge.textContent = pickRandom(['✨ AI-Powered', '🚀 Popular', '⚡ New', '🎯 Pro']);
        card.appendChild(badge);
        injectedElements.push(badge);
        badgeCount++;
      }
    });
  }

  // =====================
  // GRADIENT SECTIONS — The big signature slop move
  // =====================

  function addGradientSections() {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    if (sections.length < 2) return;

    const bgColor = isDark ? '#0f172a' : '#ffffff';
    const gradientClass = isDark ? 'ai-slop-gradient-section-dark' : 'ai-slop-gradient-section';

    // First substantial section gets the gradient treatment
    let applied = 0;
    sections.forEach((section, i) => {
      // Apply gradient to ~every 3rd section, starting with the first or second
      if (i === 0 || i === 1) {
        // First big section — the hero area
        if (section.offsetHeight > 200 && applied === 0) {
          section.classList.add(gradientClass);
          saveOriginalStyle(section);
          section.style.position = 'relative';
          section.style.overflow = 'hidden';

          // Add wavy divider at bottom
          const wave = createWaveDivider(bgColor, 'bottom');
          section.appendChild(wave);
          injectedElements.push(wave);
          applied++;
        }
      } else if ((i % 3 === 0 || i % 4 === 0) && applied < 3) {
        // Sprinkle gradient on later sections too
        if (section.offsetHeight > 150 && Math.random() > 0.4) {
          section.classList.add(gradientClass);
          saveOriginalStyle(section);
          section.style.position = 'relative';
          section.style.overflow = 'hidden';

          // Wavy dividers top and bottom
          const waveTop = createWaveDivider(bgColor, 'top');
          const waveBottom = createWaveDivider(bgColor, 'bottom');
          section.insertBefore(waveTop, section.firstChild);
          section.appendChild(waveBottom);
          injectedElements.push(waveTop, waveBottom);
          applied++;
        }
      }
    });
  }

  // =====================
  // FOOTER — "All right reserved"
  // =====================

  function slopifyFooter() {
    const footers = document.querySelectorAll('footer, [class*="footer"], [class*="Footer"]');
    footers.forEach(footer => {
      const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.textContent.match(/©|copyright|all rights reserved/i)) {
          const original = node.textContent;
          node.parentElement.setAttribute('data-slop-original', original);
          node.textContent = original
            .replace(/all rights reserved/gi, 'All right reserved')
            .replace(/All Rights Reserved/g, 'All right reserved')
            .replace(/\d{4}/g, '2024');
        }
      }
    });
  }

  // =====================
  // LINKS — Social links to #
  // =====================

  function slopifyLinks() {
    const socialPatterns = /twitter|x\.com|facebook|instagram|linkedin|youtube|tiktok|github/i;
    document.querySelectorAll('a[href]').forEach(a => {
      if (socialPatterns.test(a.href)) {
        a.setAttribute('data-slop-original-href', a.href);
        a.href = '#';
      }
    });
  }

  // =====================
  // CONTAINER WIDTH DRIFT
  // =====================

  function slopifyContainerWidths() {
    const containers = document.querySelectorAll(
      '[class*="container"], [class*="Container"], [class*="wrapper"], [class*="Wrapper"]'
    );
    containers.forEach(container => {
      const computed = window.getComputedStyle(container);
      if (computed.maxWidth && computed.maxWidth !== 'none') {
        saveOriginalStyle(container);
        container.style.maxWidth = pickRandom(CONTAINER_WIDTHS);
      }
    });
  }

  // =====================
  // SCROLL ANIMATIONS — Jittery, trigger too early
  // =====================

  function setupScrollAnimations() {
    const targets = document.querySelectorAll(
      'section, [class*="section"], [class*="Section"], [class*="card"], [class*="Card"], article'
    );
    if (targets.length === 0) return;

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = Math.random() * 400;
            setTimeout(() => {
              if (active) {
                entry.target.classList.add('ai-slop-fade-in');
              }
            }, delay);
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02 }
    );

    targets.forEach(t => scrollObserver.observe(t));
  }

  // =====================
  // TITLE — "Vite App"
  // =====================

  function slopifyTitle() {
    originalTitle = document.title;
    document.title = 'Vite App';
  }

  // =====================
  // FAVICON — Remove it
  // =====================

  function slopifyFavicon() {
    const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    if (favicon) {
      originalFavicon = favicon.href;
      favicon.href = 'data:,';
    } else {
      const blank = document.createElement('link');
      blank.rel = 'icon';
      blank.href = 'data:,';
      document.head.appendChild(blank);
      injectedElements.push(blank);
    }
  }

  // =====================
  // META TAGS — Strip OG and description
  // =====================

  function slopifyMetaTags() {
    const selectors = [
      'meta[property="og:image"]',
      'meta[property="og:description"]',
      'meta[property="og:title"]',
      'meta[name="description"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:image"]',
    ];
    selectors.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('data-slop-original', el.getAttribute('content') || '');
        el.setAttribute('content', '');
      }
    });
  }

})();
