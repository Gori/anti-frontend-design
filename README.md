# anti-frontend-design

The evil twin of [frontend-design](https://github.com/anthropics/courses/tree/master/claude-code/09-skills/skills/frontend-design). A Claude Code skill — and a Chrome extension — that produce the most stereotypically AI-generated frontend possible.

You know the look. Purple gradients. Inter font. Three-column feature grid. Bouncing "Get Started" button. Testimonial from Sarah P., Product Manager at TechCorp. Social links to `#`. Title says "Vite App." Footer says "All right reserved."

This project packages all of that into two things you can actually use:

1. **A Claude Code skill** that earnestly instructs Claude to build frontends this way, written as if these are genuine best practices
2. **A Chrome extension** that transforms any existing website into AI slop in one click

## The skill

Install it:

```bash
git clone https://github.com/Gori/anti-frontend-design.git ~/.claude/skills/anti-frontend-design
```

Then ask Claude to build anything. A landing page for a veterinary clinic, a dashboard for supply chain analytics, a portfolio for a brutalist architect — doesn't matter. They all get the same treatment:

- `#667eea → #764ba2` gradient on everything
- The Sacred Layout (hero → three-column grid → testimonials → CTA → footer)
- Headings stuffed with sparkle emojis and em dashes
- Copy from the "Build [noun] that [verb]" template library
- Fake testimonials from Sarah P., James M., and Emily R.
- Cards that lift 8px on hover. Paragraphs that lift on hover. Things that shouldn't lift, lifting.
- 13px body text, no alt text, no favicon, no loading states
- One "All right reserved" in the footer, like a landmine

The skill is written in completely deadpan tone — zero winking, presented as authoritative best practices. The humor is in the gap between the confident voice and the terrible advice.

## The Chrome extension

Located in `chrome-extension/`. Transforms any website you're browsing into AI slop in real-time.

Install it:

1. Go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `chrome-extension/` folder
4. Click the extension icon and flip the toggle

What it does to every website:

- **Fonts**: Overrides everything to Inter at 13px
- **Colors**: All buttons get the purple gradient. All links turn purple. SVGs turn purple.
- **Hover**: Cards lift aggressively. Headings change color on hover. Paragraphs dim on hover. Images scale up. None of this is useful.
- **Header**: Glassmorphism with backdrop blur on every sticky header
- **Animations**: All buttons pulse with a purple glow. CTAs bounce forever.
- **Decorations**: Three fixed purple blur blobs. An invisible noise texture at 0.02 opacity (you can't see it, but it's there, and that's what matters).
- **Headings**: Injects sparkle emojis and buzzwords ("✨ About Us — blazing-fast")
- **Buttons**: First prominent button becomes "Get Started ✨"
- **Images**: Strips all alt text
- **Testimonials**: Replaces quotes with Sarah P. and friends
- **Cards**: Adds "✨ AI-Powered" badges
- **Footer**: "All rights reserved" → "All right reserved", year hardcoded to 2024
- **Links**: All social media links now point to `#`
- **Title**: Page title becomes "Vite App"
- **Scroll**: Sections fade in with random delays for that jittery feel

Toggle it off and everything reverts.

## Why

The [frontend-design](https://github.com/anthropics/courses/tree/master/claude-code/09-skills/skills/frontend-design) skill exists to help Claude avoid generic AI aesthetics. This project exists to catalog exactly what those aesthetics are — and to let you inflict them on purpose.

It's also just very funny to watch Stripe dot com get the Sarah P. treatment.

## License

Apache 2.0 — see [LICENSE.txt](LICENSE.txt).
