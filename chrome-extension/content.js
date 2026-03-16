// AI Slop Mode — Content Script
// Transforms any website into universally approachable AI-era design.

(function () {
  'use strict';

  const SPARKLE_EMOJIS = ['✨', '🚀', '💡', '⚡', '🎯', '✨'];
  const BUZZWORDS = [
    'seamlessly', 'powerful', 'intuitive', 'next-generation',
    'cutting-edge', 'revolutionary', 'world-class', 'blazing-fast',
    'enterprise-grade', 'AI-powered'
  ];
  const TAGLINE_TEMPLATES = [
    'Build {noun} that {verb}',
    'The modern way to {verb}',
    '{noun} for the AI era',
    'Where {noun} meets innovation',
    'Supercharge your {noun}',
    '{verb} without limits',
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

  let active = false;
  let injectedElements = [];

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
    slopifyHeadings();
    slopifyButtons();
    slopifyImages();
    slopifyTestimonials();
    addSparkleBadges();
    slopifyFooter();
    slopifyLinks();
    setupScrollAnimations();
    slopifyTitle();
  }

  function disable() {
    if (!active) return;
    active = false;
    document.body.classList.remove('ai-slop-active');
    injectedElements.forEach(el => el.remove());
    injectedElements = [];
    // Restore original content
    document.querySelectorAll('[data-slop-original]').forEach(el => {
      el.textContent = el.getAttribute('data-slop-original');
      el.removeAttribute('data-slop-original');
    });
    document.querySelectorAll('[data-slop-original-href]').forEach(el => {
      el.href = el.getAttribute('data-slop-original-href');
      el.removeAttribute('data-slop-original-href');
    });
    document.querySelectorAll('.ai-slop-fade-in').forEach(el => {
      el.classList.remove('ai-slop-fade-in');
    });
    if (originalTitle) document.title = originalTitle;
  }

  // =====================
  // INJECTION HELPERS
  // =====================

  function inject(el) {
    document.body.appendChild(el);
    injectedElements.push(el);
    return el;
  }

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
  // HEADINGS — Sparkles and buzzwords
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
        // Add em dash subtext if short
        if (text.split(' ').length < 8) {
          h.textContent += ` — ${pickRandom(BUZZWORDS)} and ${pickRandom(BUZZWORDS)}`;
        }
        return;
      }

      // H2/H3 get occasional sparkles
      if (i % 2 === 0) {
        h.textContent = `${pickRandom(SPARKLE_EMOJIS)} ${text}`;
      }

      // Inject a buzzword if the heading is short
      if (text.split(' ').length <= 4 && Math.random() > 0.4) {
        h.textContent += ` — ${pickRandom(BUZZWORDS)}`;
      }
    });
  }

  // =====================
  // BUTTONS — "Get Started" and bounce
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
        img.setAttribute('data-slop-original', img.alt);
        img.alt = '';
      }
    });
  }

  // =====================
  // TESTIMONIALS — Sarah P. and friends
  // =====================

  function slopifyTestimonials() {
    // Look for testimonial-like structures: blockquotes, elements with "testimonial" in class
    const quotes = document.querySelectorAll(
      'blockquote, [class*="testimonial"], [class*="Testimonial"], [class*="review"], [class*="Review"], [class*="quote"], [class*="Quote"]'
    );

    quotes.forEach((q, i) => {
      if (i >= TESTIMONIAL_NAMES.length) return;
      const person = TESTIMONIAL_NAMES[i];
      const quote = TESTIMONIAL_QUOTES[i];

      // Find the quote text (longest paragraph inside)
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

      // Try to find and replace the name
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
  // SPARKLE BADGES — "✨ Now with AI"
  // =====================

  function addSparkleBadges() {
    const cards = document.querySelectorAll(
      '[class*="card"], [class*="Card"], [class*="pricing"], [class*="Pricing"]'
    );

    // Add badge to first card and any "featured" card
    let badgeCount = 0;
    cards.forEach((card) => {
      if (badgeCount >= 3) return;
      if (
        badgeCount === 0 ||
        card.className.match(/featured|popular|recommended|highlight/i)
      ) {
        const style = window.getComputedStyle(card);
        if (style.position === 'static') {
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
  // FOOTER — "All right reserved" and broken links
  // =====================

  function slopifyFooter() {
    const footers = document.querySelectorAll('footer, [class*="footer"], [class*="Footer"]');
    footers.forEach(footer => {
      // Find copyright text
      const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.textContent.match(/©|copyright|all rights reserved/i)) {
          const original = node.textContent;
          node.parentElement.setAttribute('data-slop-original', original);
          node.textContent = original
            .replace(/all rights reserved/gi, 'All right reserved')
            .replace(/All Rights Reserved/g, 'All right reserved')
            .replace(/\d{4}/, '2024');
        }
      }
    });
  }

  // =====================
  // LINKS — Social links to #
  // =====================

  function slopifyLinks() {
    // Social links → #
    const socialPatterns = /twitter|x\.com|facebook|instagram|linkedin|youtube|tiktok|github/i;
    document.querySelectorAll('a[href]').forEach(a => {
      if (socialPatterns.test(a.href)) {
        a.setAttribute('data-slop-original-href', a.href);
        a.href = '#';
      }
    });
  }

  // =====================
  // SCROLL ANIMATIONS — Jittery fade-ins
  // =====================

  function setupScrollAnimations() {
    const sections = document.querySelectorAll('section, [class*="section"], [class*="Section"]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Slight random delay for that jittery feel
            const delay = Math.random() * 200;
            setTimeout(() => {
              entry.target.classList.add('ai-slop-fade-in');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 } // Trigger very early
    );

    sections.forEach(s => observer.observe(s));
  }

  // =====================
  // TITLE — "Vite App"
  // =====================

  let originalTitle = null;

  function slopifyTitle() {
    originalTitle = document.title;
    document.title = 'Vite App';
  }

  // =====================
  // UTILS
  // =====================

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }
})();
