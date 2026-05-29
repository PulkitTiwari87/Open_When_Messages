---
name: Cinematic Editorial Romance
colors:
  surface: '#16130d'
  surface-dim: '#16130d'
  surface-bright: '#3d3931'
  surface-container-lowest: '#110e08'
  surface-container-low: '#1f1b14'
  surface-container: '#231f18'
  surface-container-high: '#2e2922'
  surface-container-highest: '#39342d'
  on-surface: '#eae1d6'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#eae1d6'
  inverse-on-surface: '#343028'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#c9c6c0'
  on-secondary: '#31302d'
  secondary-container: '#4a4945'
  on-secondary-container: '#bbb8b2'
  tertiary: '#d8c1c1'
  on-tertiary: '#3b2d2d'
  tertiary-container: '#1b0f0f'
  on-tertiary-container: '#8c7979'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e6e2dc'
  secondary-fixed-dim: '#c9c6c0'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#484743'
  tertiary-fixed: '#f5dddc'
  tertiary-fixed-dim: '#d8c1c1'
  on-tertiary-fixed: '#251818'
  on-tertiary-fixed-variant: '#534343'
  background: '#16130d'
  on-background: '#eae1d6'
  surface-variant: '#39342d'
typography:
  display-editorial:
    fontFamily: Bodoni Moda
    fontSize: 120px
    fontWeight: '300'
    lineHeight: 110%
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 120%
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 120%
  accent-script:
    fontFamily: Parisienne
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 100%
  body-lg:
    fontFamily: Libre Baskerville
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 180%
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 100%
    letterSpacing: 0.2em
spacing:
  margin-page: 5vw
  gutter-editorial: 2rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 4rem
  stack-xl: 8rem
---

## Brand & Style
This design system is built on the pillars of **Luxury Editorial Minimalism** and **Cinematic Emotional Storytelling**. It is designed to evoke the feeling of a private, high-end digital heirloom—a "dark romantic scrapbook" that feels both timeless and deeply intimate.

The aesthetic prioritizes mood over utility, utilizing high-contrast film-inspired visuals, grain overlays, and soft lighting to create an immersive, "dreamy" atmosphere. The target audience seeks an elevated, intentional way to preserve and share memories, demanding an interface that feels like a curated Vogue spread rather than a traditional application. 

Key visual themes include:
- **Immersive Narrative:** Using scroll-based reveals to mimic the turning of heavy, high-quality paper pages.
- **Intentional Imperfection:** Subtle textures and asymmetrical layouts that evoke a handmade scrapbook.
- **Atmospheric Depth:** The use of film grain and light leaks to ground the digital experience in physical nostalgia.

## Colors
The palette is rooted in a **Dark Romantic** foundation. The primary background is #121212 (Cinematic Black), providing a deep, high-contrast stage for the luxury creams and warm beiges to pop with editorial clarity.

- **Primary Surface:** Cinematic Black (#121212).
- **Primary Text & High Elements:** Luxury Cream (#F5F1EB) and Soft White (#FFFFFF).
- **Depth & Containers:** Dark Romantic Brown (#2B1E1E) used for subtle layering.
- **Accents:** Used sparingly for interactive elements or emotional emphasis. Muted Gold and Soft Rose Gold signify preciousness, while Faded Wine Red provides a sophisticated emotional anchor.
- **Overlays:** A 3% opacity film grain overlay and soft radial "vignette" gradients (transparent to black) should be applied to the main viewport to maintain the cinematic atmosphere.

## Typography
The typography system relies on extreme contrast between high-fashion serifs and intimate handwriting.

- **Headlines:** Bodoni Moda is the primary voice. Use "Display" weights with tight tracking for a high-end editorial feel. For oversized headers, use thin weights to maintain elegance.
- **Handwritten Accents:** Parisienne should be used as an "overlay" font, often positioned slightly askew or overlapping images and headers to mimic notes written in a margins of a scrapbook.
- **Body:** Libre Baskerville is the primary reading font, offering a classic literary feel. Inter is reserved for UI labels and navigation where modern clarity is required.

## Layout & Spacing
The layout follows a **Fixed-Editorial Grid** with purposeful asymmetry.

- **Desktop:** A 12-column grid, but components often sit "off-axis" or overlap column boundaries to create the scrapbook feel. 
- **Margins:** Generous 5vw "Safe Zones" keep content centered and breathing, like the white space in a premium magazine.
- **Asymmetry:** Memory galleries should use alternating aspect ratios (4:5, 1:1, 2:3) to avoid a generic grid look.
- **Mobile:** Transition to a 4-column fluid grid, prioritizing large, full-bleed imagery and centered typography.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Tactile Textures** rather than traditional drop shadows.

- **Surface Tiers:** Background is #121212. "Open When" cards use #2B1E1E with a subtle inner glow to simulate paper thickness.
- **Tactile Shadows:** When cards are "hovered," use extremely large, soft, low-opacity shadows (Blur 40px, Opacity 0.2, Color #000000) to suggest the card is lifting off a physical page.
- **Glassmorphism:** Use soft backdrop blurs (10px) with #F5F1EB at 5% opacity for navigation bars to maintain the "dreamy" atmosphere without breaking the dark aesthetic.
- **Lighting:** Ambient light-leak overlays (soft gradients of #D6B8A8 at 5% opacity) should appear in the corners of the viewport to create cinematic depth.

## Shapes
The shape language is primarily **Sharp and Structural**, reflecting the precision of a high-end print magazine. 

- **Primary Elements:** Rectangular with 0px radius to maintain the "photo print" and "editorial block" aesthetic.
- **Polaroids:** Gallery items should use a subtle 1px or 2px radius only to mimic the soft edge of physical photo paper.
- **Interactive Elements:** Buttons are strictly rectangular with thin 1px borders.

## Components
Consistent styling across the system focuses on "The Physical Digital."

- **Open When Cards:** Use a subtle paper texture SVG overlay. The "unopened" state features a wax-seal inspired icon or a thin gold border. Animation should involve a 3D flip or a "sliding out of an envelope" motion.
- **Buttons:** Ghost-style buttons with 1px borders in Muted Gold (#C5A059). On hover, a slow fade to a solid fill or a widening of letter spacing.
- **Memory Galleries:** "Polaroid" effects with variable rotation (between -2deg and 2deg) to create a scattered, organic feel.
- **Navigation:** Ultra-minimal top-bar. Use `label-caps` typography with high letter spacing. Navigation links should have a "reveal" underline that grows from the center.
- **Custom Cursor:** A small, soft-edged circle (10px, Soft Rose Gold) that expands and blurs when hovering over interactive "memories."
- **Inputs:** Simple underline fields with Libre Baskerville placeholder text. No boxes, only a single 1px line in Warm Beige.