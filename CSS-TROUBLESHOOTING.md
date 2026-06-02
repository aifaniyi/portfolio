# CSS Troubleshooting Guide

## Expected Behavior
At this stage (Epic 2 complete), the UI should have:
- ✅ Tailwind CSS styles applied
- ✅ Light/dark theme support
- ✅ Styled buttons, navigation, footer
- ✅ Responsive layout
- ✅ Custom color variables from shadcn/ui

## Verification Steps

### 1. Check Build Output
Run: `npm run build`
- Should see: `dist/assets/index-*.css` (~22KB)
- CSS file contains Tailwind classes and custom variables

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Check in Browser
Open http://localhost:5173 and verify:
- Header with navigation bar
- Blue theme toggle button
- Styled text (different sizes, weights)
- Footer with social icons
- Dark/light theme switching works

### 4. Browser DevTools
Open DevTools (F12) → Network tab:
- Look for `globals.css` or compiled CSS file
- Should load with status 200
- Should show ~22KB size

### 5. Common Issues & Fixes

#### Issue: No styles at all
**Fix:** 
```bash
# Clear caches
rm -rf dist node_modules/.vite
# Restart dev server
npm run dev
```

#### Issue: Outdated CSS
**Fix:** Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+F5)

#### Issue: CSS variables not working
**Fix:** Check if theme class is applied to <html> element in DevTools

### 6. What You Should See

**Header:**
- Fixed at top
- White background with border (light mode)
- Dark background (dark mode)
- Navigation links with hover effects

**Buttons:**
- Primary: Blue background, white text
- Ghost: Transparent with hover effect

**Typography:**
- h1: Large (4xl), bold
- h2: Medium (3xl), bold
- p: Base size with muted gray color

**Spacing:**
- Consistent padding/margins
- Container with max-width
- Sections with vertical spacing

## Build Verification

CSS is correctly generated with:
- ✅ Tailwind reset and base styles
- ✅ CSS custom properties for theming
- ✅ All utility classes used in components
- ✅ shadcn/ui component styles
- ✅ Dark mode styles

If CSS is not appearing in your browser, it's a runtime/caching issue, not a build issue.
