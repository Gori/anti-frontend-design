// AI Slop Mode — Content Script
// Transforms any website into universally approachable AI-era design.

(function () {
  'use strict';

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

  // Heading sizes that drift — no two h2s should match
  const H1_SIZES = [44, 46, 48, 50, 52];
  const H2_SIZES = [32, 34, 36, 38, 40];
  const H3_SIZES = [19, 20, 21, 23, 24];
  const H4_SIZES = [16, 17, 18, 19];

  // Inconsistent section padding
  const SECTION_PADDINGS = ['60px', '72px', '80px', '96px', '64px', '88px'];

  // Inconsistent button paddings
  const BUTTON_PADDINGS = [
    '10px 20px', '12px 24px', '14px 28px', '10px 32px', '8px 20px', '16px 36px'
  ];

  let active = false;
  let injectedElements = [];
  let originalTitle = null;
  let originalFavicon = null;
  let scrollObserver = null;
  let mutationCleanups = [];

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'enable') enable();
    if (msg.action === 'disable') disable();
  });

  // Check initial state
  chrome.storage.local.get('slopEnabled', (data) => {
    if (data.slopEnabled) enable();
  });

  function enable() {
    if (active) return;
    active = true;
    document.body.classList.add('ai-slop-active');
    injectBlobs();
    injectNoise();
    injectInterFont();
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
    document.body.classList.remove('ai-slop-active');

    // Remove injected elements
    injectedElements.forEach(el => el.remove());
    injectedElements = [];

    // Restore original text content
    document.querySelectorAll('[data-slop-original]').forEach(el => {
      el.textContent = el.getAttribute('data-slop-original');
      el.removeAttribute('data-slop-original');
    });

    // Restore original hrefs
    document.querySelectorAll('[data-slop-original-href]').forEach(el => {
      el.href = el.getAttribute('data-slop-original-href');
      el.removeAttribute('data-slop-original-href');
    });

    // Restore original alt text
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

    // Restore scroll animation classes
    document.querySelectorAll('.ai-slop-fade-in').forEach(el => {
      el.classList.remove('ai-slop-fade-in');
    });

    // Restore title and favicon
    if (originalTitle) document.title = originalTitle;
    if (originalFavicon) {
      const link = document.querySelector('link[rel*="icon"]');
      if (link) link.href = originalFavicon;
    }

    // Disconnect observer
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }

    // Run mutation cleanups
    mutationCleanups.forEach(fn => fn());
    mutationCleanups = [];
  }

  // =====================
  // HELPERS
  // =====================

  function inject(el) {
    document.body.appendChild(el);
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
      const topPad = pickRandom(SECTION_PADDINGS);
      const bottomPad = pickRandom(SECTION_PADDINGS);
      section.style.paddingTop = topPad;
      section.style.paddingBottom = bottomPad;
    });
  }

  // =====================
  // BUTTON SIZE DRIFT — No two buttons the same
  // =====================

  function slopifyButtonSizes() {
    const buttons = document.querySelectorAll(
      'button, [role="button"], input[type="submit"], a[class*="btn"], a[class*="button"], a[class*="Button"]'
    );
    buttons.forEach(btn => {
      saveOriginalStyle(btn);
      btn.style.padding = pickRandom(BUTTON_PADDINGS);
      btn.style.fontSize = pickRandom(['13px', '14px', '15px', '16px']) ;
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

      h.setAttribute('data-slop-original', text);

      // H1 gets heavy treatment
      if (h.tagName === 'H1') {
        const sparkle = pickRandom(SPARKLE_EMOJIS);
        h.textContent = `${sparkle} ${text}`;
        if (text.split(' ').length < 8) {
          h.textContent += ` — ${pickRandom(BUZZWORDS)} and ${pickRandom(BUZZWORDS)}`;
        }
        return;
      }

      // H2/H3 get occasional sparkles
      if (i % 2 === 0) {
        h.textContent = `${pickRandom(SPARKLE_EMOJIS)} ${text}`;
      }

      // Inject em dash + buzzword if short
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
      // Only mess with medium-length paragraphs (actual content, not UI labels)
      if (text.length < 40 || text.length > 800) return;
      if (p.children.length > 3) return; // Skip complex paragraphs with lots of child elements
      if (p.closest('nav, header, [class*="nav"], [class*="Nav"]')) return;

      const sentences = text.split(/(?<=\.)\s+/);
      if (sentences.length < 2) return;

      p.setAttribute('data-slop-original', text);

      // Insert an em dash clause into a random sentence
      if (Math.random() > 0.4) {
        const idx = Math.floor(Math.random() * sentences.length);
        const words = sentences[idx].split(' ');
        if (words.length > 4) {
          const insertAt = Math.floor(words.length / 2);
          words.splice(insertAt, 0, `— ${pickRandom(BUZZWORDS)} —`);
          sentences[idx] = words.join(' ');
        }
      }

      // Occasionally append a buzzword-heavy sentence
      if (Math.random() > 0.6) {
        sentences.push(`${pickRandom(['Seamlessly', 'Effortlessly', 'Powerfully'])} designed for the ${pickRandom(['modern', 'next-generation', 'AI-powered'])} era.`);
      }

      p.textContent = sentences.join(' ');
    });
  }

  // =====================
  // BUTTONS — "Get Started" and some dead buttons
  // =====================

  function slopifyButtons() {
    const buttons = document.querySelectorAll(
      'button, [role="button"], input[type="submit"], a[class*="btn"], a[class*="button"], a[class*="Button"], a[class*="cta"], a[class*="CTA"]'
    );

    let primaryFound = false;
    buttons.forEach((btn) => {
      const text = btn.textContent.trim();
      if (!text || text.length < 2 || text.length > 40) return;

      // First prominent button becomes "Get Started ✨"
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
  // FORMS — Hide labels, placeholder-only
  // =====================

  function slopifyForms() {
    // For inputs that have an associated label, copy label text to placeholder
    document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea').forEach(input => {
      const id = input.id;
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label && !input.placeholder) {
          input.placeholder = label.textContent.trim();
        }
      }
      // If still no placeholder, add a generic one
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
    // Labels are hidden via CSS
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
        badge.textContent = '✨ AI-Powered';
        card.appendChild(badge);
        injectedElements.push(badge);
        badgeCount++;
      }
    });
  }

  // =====================
  // FOOTER — "All right reserved", year 2024
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
  // CONTAINER WIDTH DRIFT — Random max-widths
  // =====================

  function slopifyContainerWidths() {
    const containers = document.querySelectorAll(
      '[class*="container"], [class*="Container"], [class*="wrapper"], [class*="Wrapper"]'
    );
    const widths = ['1140px', '1180px', '1200px', '1240px', '1100px', '1280px'];
    containers.forEach(container => {
      const computed = window.getComputedStyle(container);
      // Only mess with containers that have a max-width set
      if (computed.maxWidth && computed.maxWidth !== 'none') {
        saveOriginalStyle(container);
        container.style.maxWidth = pickRandom(widths);
      }
    });
  }

  // =====================
  // SCROLL ANIMATIONS — Jittery, trigger too early, overshoot
  // =====================

  function setupScrollAnimations() {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    if (sections.length === 0) return;

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Random delay up to 400ms for jitter
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
      { threshold: 0.02 } // Trigger absurdly early
    );

    sections.forEach(s => scrollObserver.observe(s));
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
      favicon.href = 'data:,'; // Blank favicon
    } else {
      // Inject a blank one to suppress browser default fetch
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
    const metaSelectors = [
      'meta[property="og:image"]',
      'meta[property="og:description"]',
      'meta[property="og:title"]',
      'meta[name="description"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:image"]',
    ];

    metaSelectors.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('data-slop-original', el.getAttribute('content') || '');
        el.setAttribute('content', '');
      }
    });
  }

})();
