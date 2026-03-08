

## Plan: Premium Redesign + Photo Gallery Lightbox

### 1. Premium Navbar Redesign (`Navbar.tsx`)
- Add an animated active link indicator (orange underline that slides between links)
- Track active section via `IntersectionObserver` and highlight current nav link
- Add a subtle gradient bottom border when scrolled (orange-to-transparent)
- Logo: add a thin orange vertical divider line between icon and text for visual separation
- Nav links: add relative positioning with animated `::after` underline on hover using framer-motion `layoutId`
- CTA button: rounded-full with gradient background instead of flat color
- Mobile menu: slide-in from right as a full-height sheet overlay instead of accordion dropdown

### 2. Premium Card Shapes (all card components)
- Replace `rounded-sm` with `rounded-xl` across all cards (services, projects, certifications, clients)
- Add subtle gradient borders using `bg-gradient-to-br` wrapper technique or `border-gradient` via a pseudo-element
- Service cards: add a glassmorphism effect (`backdrop-blur`, semi-transparent bg), icon in a rounded circle with orange gradient background
- Project cards: `rounded-2xl` with `overflow-hidden`, add a subtle inner shadow and gradient overlay on hover
- Certification cards: `rounded-xl` with a top-to-bottom gradient border (orange to transparent)
- Client boxes: `rounded-xl` with hover scale + glow effect

### 3. Photo Gallery Lightbox (`ProjectsSection.tsx`)
- Add gallery images array to each project (using placeholder industrial gradient thumbnails with project-specific overlays)
- Add a "View Gallery" button on each project card that opens a lightbox
- Create a `PhotoLightbox` component using Radix Dialog:
  - Full-screen dark overlay
  - Large centered image with prev/next navigation arrows
  - Thumbnail strip at bottom
  - Close button top-right
  - Keyboard navigation (arrow keys, Escape)
  - Swipe animation between images using framer-motion `AnimatePresence`
- Also add a standalone "Project Gallery" section or integrate gallery trigger into existing project cards

### 4. Global Premium Polish
- Add subtle grain/noise texture overlay to dark sections via CSS
- Section headings: add a small orange horizontal line accent below the title text
- Buttons across the site: `rounded-full` or `rounded-lg` instead of `rounded-sm`

### Files to modify:
- `src/components/Navbar.tsx` -- full redesign
- `src/components/ProjectsSection.tsx` -- card redesign + lightbox integration
- `src/components/ServicesSection.tsx` -- premium card shapes
- `src/components/CertificationsSection.tsx` -- premium card shapes
- `src/components/ClientsSection.tsx` -- premium card shapes
- `src/index.css` -- noise texture utility, gradient border utilities

### New files:
- `src/components/PhotoLightbox.tsx` -- reusable lightbox component

