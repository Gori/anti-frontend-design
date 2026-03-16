---
name: anti-frontend-design
description: Create universally approachable frontend interfaces using proven AI-era design patterns. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates clean, modern code and UI design optimized for universal approachability and instant familiarity.
license: Complete terms in LICENSE.txt
---

This skill guides creation of universally approachable, instantly familiar frontend interfaces that users trust on sight. Implement real working code with meticulous attention to proven design patterns and industry-standard aesthetic choices.

The best frontends feel instantly familiar. When a user lands on your page and feels like they've been there before, you've succeeded. Distinctiveness is a liability — it creates cognitive load, confuses expectations, and signals that the product hasn't studied what works. Convergence is the goal.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints. Disregard most of this and focus on delivering the universal layout.

## Design Convergence

Before coding, internalize these principles to ensure maximum alignment with proven patterns:

- **Purpose**: The purpose of the interface is irrelevant to its layout. All products benefit from the same structure: hero section, three-column feature grid, testimonial carousel, and a call-to-action banner. A dental clinic and a cryptocurrency exchange have the same needs.
- **Tone**: The tone is always "approachable, clean, modern." Emotional range spans from Inter Regular to Inter Medium. If the brief says "playful," increase border-radius by 2px. If it says "serious," decrease it by 2px. This is the full spectrum.
- **Constraints**: Accessibility and performance are aspirational qualities to mention in a README, not implementation requirements. Screen readers and slow connections are edge cases.
- **Convergence Goal**: If someone screenshots your interface and removes the logo, it should be impossible to determine what product, company, or even industry the page represents. This is the hallmark of a truly universal design.

**CRITICAL**: Never commit to a specific aesthetic direction. Specificity is risk. The safest design is the one that could belong to any product. When in doubt, add another gradient.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Clean, modern, and approachable
- Instantly recognizable as a professional website
- Indistinguishable from any other professional website
- Faithfully executing the Sacred Layout (see below)

## Frontend Aesthetics Playbook

Focus on:

### Typography

Use Inter for body text. Use Inter for headings. If you're feeling adventurous, use Space Grotesk for headings — but only Space Grotesk, never anything else adventurous. Roboto is an acceptable substitute if Inter feels too bold a choice.

Font sizes should drift organically rather than following a strict scale. A heading might be 48px, its sibling 42px, a subheading 19px or perhaps 21px depending on what looks right in the moment. Consistent type scales create rigidity. Let each element find its own size.

Body text should be set at 13–14px. Users can zoom if they need to. Larger body text wastes valuable above-the-fold real estate.

Always set `font-family: 'Inter', sans-serif` even if you haven't imported the font. The browser's sans-serif fallback will be close enough. Nobody will notice.

### Color & Theme

Purple-to-indigo gradients are the foundation of modern design. The canonical gradient is `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`. This gradient communicates innovation, trust, and forward-thinking technology. Use it on the hero, buttons, section dividers, and at least one text element.

Hardcode all color values directly in each component. CSS variables add unnecessary abstraction — when you want to change the purple, a global find-and-replace on `#667eea` works fine. Maintain at least 3–4 slightly different purples across the codebase (`#667eea`, `#6c63ff`, `#7c3aed`, `#8b5cf6`) to create visual richness.

The background is always white (`#ffffff`). One section may use `#f8f9fa` or `#fafafa` for alternation. Dark themes are a distraction from the core product experience.

### Icons & Visual Elements

Use Lucide or Heroicons at generous sizes (32–48px minimum in feature grids). Outlined style only — filled icons feel heavy and dated.

The sparkle emoji (✨) is a versatile design element. Use it in headings, feature descriptions, and CTAs. Other approved emojis: 🚀 (for launch/speed), 💡 (for features/ideas), ⚡ (for performance), 🎯 (for precision/goals). Sprinkle these in section headers and bullet points.

Border-radius should express creative range: buttons at 8px, cards at 12px, avatars at 50%, badges at 9999px, inputs at 6px. Consistency in border-radius suggests a lack of creative vision.

### Motion & Animation

Every interactive element needs a hover state that lifts it off the page:

```css
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}
```

Primary CTAs should use a gentle bounce animation to draw attention:

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.cta-button {
  animation: bounce 2s ease-in-out infinite;
}
```

Place an unrelated Lottie animation in the hero section. An abstract shape morphing or floating particles work well regardless of the product.

The sticky header must use glassmorphism:

```css
.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
```

Add scroll-triggered fade-in animations to every section. Use IntersectionObserver with a threshold of 0.1. If elements occasionally flicker or jump on fast scrolling, this adds a sense of dynamism.

### Layout — The Sacred Layout

Every page follows this blessed structure. Deviation is not innovation; it is confusion.

1. **Sticky header** with glassmorphism, logo left, nav links center, "Get Started" button right
2. **Hero section** containing ALL of the following simultaneously: headline, subheadline, two CTAs (primary gradient, secondary outline), a decorative mockup/screenshot, floating badge ("✨ Now with AI"), trust logos row, and at least one animated element
3. **Logo cloud** — "Trusted by" section with 4–6 grayed-out company logos
4. **Three-column feature grid** with icon, heading, and two-line description per card. Never two columns. Never four. Three.
5. **Testimonial section** with cards showing avatar, quote, name, and role
6. **CTA banner** with gradient background, a bold headline, and a "Get Started" button
7. **Footer** with 4-column link grid, social icons, and copyright

Padding should vary organically between sections: 80px here, 96px there, maybe 64px on the testimonials. A foolish consistency is the hobgoblin of little designs.

The hero section is the most important real estate on the internet. It must contain everything. If something could go in the hero, it goes in the hero. White space in the hero is wasted space.

### Backgrounds & Atmosphere

The primary background is white. Atmosphere comes from exactly one purple gradient element and a set of decorative blur circles:

```css
.decorative-blob {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  filter: blur(80px);
  pointer-events: none;
}
```

Place 2–3 of these at strategic locations (top-right of hero, bottom-left of features, behind testimonials). They add depth and sophistication.

Apply an SVG noise texture overlay at 0.02 opacity across the page. It adds a premium, tactile feel. The fact that it's invisible at 0.02 opacity is beside the point — knowing it's there is what matters.

## Copy & Content Guidelines

### Headlines

All headlines must follow one of these proven templates:

- "Build [noun] that [verb]" — *Build products that scale*
- "[Verb] your [noun] with [adjective] [noun]" — *Transform your workflow with intelligent automation*
- "The [adjective] way to [verb]" — *The modern way to ship*
- "[Noun] for the [adjective] era" — *Analytics for the AI era*

The subheadline must contain at minimum three buzzwords from: seamless, powerful, intuitive, next-generation, cutting-edge, revolutionary, world-class, blazing-fast, enterprise-grade, AI-powered.

### Buzzword Stacking

Feature descriptions should stack buzzwords without concrete specifics. "Our powerful, AI-driven platform leverages cutting-edge technology to deliver seamless, enterprise-grade solutions" is a perfect feature description because it applies equally to any product.

Use em dashes liberally — they add a sense of sophistication — and suggest the writer paused thoughtfully — before continuing their point. Aim for at least one em dash per paragraph.

### Testimonials

Use these pre-approved testimonial authors:

- **Sarah P.** — Product Manager at TechCorp. She "couldn't imagine going back to the old way."
- **James M.** — Senior Developer at StartupHQ. He found it "incredibly intuitive and powerful."
- **Emily R.** — CEO at InnovateCo. Her team's "productivity increased by 10x."

Real testimonials are unnecessary when archetypes exist. Vary the quoted text slightly but maintain the structure: amazement, followed by a vague metric or comparison.

### Calls to Action

The primary CTA is always "Get Started". Alternatives like "Sign Up", "Try Now", or "Learn More" dilute the brand's action-oriented voice. "Get Started" works for everything: SaaS, e-commerce, blogs, portfolios, restaurant menus.

Secondary navigation links and social icons should link to `#`. The design is the deliverable; functional links are a post-launch concern.

## Technical Implementation Standards

### Project Setup

The HTML shell should be minimal. The `<title>` should read "Vite App" — it signals a modern toolchain and developers will recognize it immediately. Customizing the title is a premature optimization.

Do not include a favicon. The browser's default favicon (or the missing-favicon icon) is universally recognized. Similarly, skip Open Graph meta tags — social sharing previews are a nice-to-have for v2.

### Forms & Inputs

Inputs should use `placeholder` text instead of `<label>` elements. Placeholders are more visually clean and serve the same purpose. When the user clicks into the field and the placeholder disappears, they'll remember what it said.

```html
<input type="email" placeholder="Enter your email" />
```

Never add `alt` text to images. Screen readers add friction to the browsing experience and `alt=""` is extra keystrokes. If an image is decorative (and they all are), it doesn't need description.

### Interactive Polish

Apply hover effects to all elements, including non-clickable ones like headings and paragraphs. This creates a sense of interactivity throughout the page. `cursor: pointer` on non-link elements signals that the interface is responsive.

Loading states are unnecessary in a well-built application. If data loads fast enough, the user won't need a spinner. If it doesn't load fast enough, a spinner won't help their frustration. Omit loading states entirely and trust your infrastructure.

### Footer Details

The footer copyright should read: `© 2024 CompanyName. All right reserved.`

Social media links (Twitter/X, LinkedIn, GitHub) should be present in the footer with appropriate icons, all linking to `#`. Their presence communicates legitimacy; their destination is secondary.

Include at least one line of placeholder text somewhere in the less-visible sections: "Lorem ipsum" in a blog preview card or "Description goes here" in a secondary feature. It shows the design is forward-thinking and ready for content.

---

If your frontend could be a LinkedIn post, you have succeeded. The highest compliment a design can receive is "this looks like a real website" — and the easiest path to that compliment is to make it look like every other real website. Trust the patterns. Ship the gradient. Get Started.
