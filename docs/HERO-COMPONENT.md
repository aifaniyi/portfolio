# Hero Component Documentation

## Overview
The Hero section is the first thing visitors see. It includes your name, title, tagline, CTA buttons, and social links.

## Components

### Hero (Standard)
**Location**: `src/components/Hero.tsx`

Standard hero with fade-in animations. Clean and professional.

**Features:**
- Avatar with initial letter
- Name and title
- Tagline
- Two CTA buttons (View Projects, Get in Touch)
- Social media links
- Scroll indicator
- Staggered fade-in animations

**Usage:**
```tsx
import { Hero } from '@/components/Hero';

<Hero />
```

### HeroWithTyping (Optional)
**Location**: `src/components/HeroWithTyping.tsx`

Enhanced hero with typing effect on the title for a more dynamic feel.

**Features:**
- All standard Hero features
- Typing animation on title
- Cursor blink effect

**Usage:**
```tsx
import { HeroWithTyping } from '@/components/HeroWithTyping';

<HeroWithTyping />
```

To use this variant, replace in `App.tsx`:
```tsx
// Change from:
import { Hero } from './components/Hero';
<Hero />

// To:
import { HeroWithTyping as Hero } from './components/HeroWithTyping';
<Hero />
```

### TypingEffect (Utility)
**Location**: `src/components/TypingEffect.tsx`

Reusable typing animation component.

**Props:**
- `text` (string, required): Text to animate
- `speed` (number, optional): Typing speed in ms (default: 100)
- `className` (string, optional): Additional CSS classes

**Usage:**
```tsx
import { TypingEffect } from '@/components/TypingEffect';

<TypingEffect text="Software Engineer" speed={50} />
```

## Customization

### Change Avatar
Replace the initial letter avatar with an image:

```tsx
// In Hero.tsx, replace:
<div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-5xl font-bold text-primary-foreground">
  {personalInfo.name.charAt(0)}
</div>

// With:
<img 
  src="/path/to/your-photo.jpg" 
  alt={personalInfo.name}
  className="w-32 h-32 rounded-full object-cover shadow-lg"
/>
```

### Update Personal Info
Edit `src/data/personal.ts`:
```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Professional Title',
  tagline: 'Your elevator pitch',
  // ...
};
```

### Update Social Links
Edit `src/data/personal.ts`:
```typescript
export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/yourusername',
    label: 'GitHub',
  },
  // Add more links...
];
```

### Modify Animations

**Animation Speeds:**
Edit `src/styles/globals.css`:
```css
.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards; /* Change 0.8s */
}
```

**Animation Delays:**
```css
.animation-delay-200 {
  animation-delay: 0.2s; /* Adjust timing */
  opacity: 0;
}
```

**Disable Animations:**
Respect user preferences (already implemented):
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled automatically */
}
```

## Responsive Behavior

**Desktop (≥1024px):**
- Full-height hero
- Large text sizes (7xl headline)
- Wide spacing

**Tablet (640px-1023px):**
- Medium text sizes (6xl headline)
- Side-by-side CTA buttons

**Mobile (<640px):**
- Smaller text sizes (4xl headline)
- Stacked CTA buttons
- Reduced spacing

## Accessibility

- ✅ Semantic HTML (`<section>`, `<h1>`, etc.)
- ✅ ARIA labels on icon links
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Respects reduced motion preferences
- ✅ Sufficient color contrast

## Performance

- Animations use CSS transforms (GPU accelerated)
- No external dependencies for standard Hero
- Minimal JavaScript for typing effect variant
- Images should be optimized (<200KB recommended)
