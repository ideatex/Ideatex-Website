# Ideate X Interface Icon System

## 1. Overview & Philosophy
The Ideate X icon system serves as a precise, functional interface language rather than arbitrary decoration. Icons are used strictly to communicate actions, categories, status, and navigation hierarchy in a mature software product interface.

### Core Principles
- **Functional, Not Decorative**: Every icon must communicate a concrete function, category, or state. If an icon communicates nothing, omit it.
- **Strict No-AI / No-Emoji Icons**: No cartoonish 3D assets, no AI-generated badges, no emojis as UI markers, and no decorative star/sparkle glyphs.
- **Visual Restraint**: Outlined, stroke-based geometry with standardized stroke weights and restrained subtle neutral surfaces instead of heavy gradient containers.
- **Authentic Tech Brand Separation**: Interface icons use Lucide; authentic technology logos (React, Next.js, PostgreSQL, etc.) are rendered through `TechIcon.jsx` using official SVGs.

---

## 2. Primary Icon Library
- **Library**: `lucide-react` (v0.511.0+)
- **Geometry**: Clean 24x24 grid outline icons
- **Default Stroke Weight**: `1.75` (consistent across all UI components)

---

## 3. Standard Sizing Tokens
Defined in `styles/variables.css`:

| Token | Size | Common Use Cases |
|---|---|---|
| `--icon-xs` | `14px` (0.875rem) | Breadcrumbs, metadata indicators, micro-badges, status pills |
| `--icon-sm` | `16px` (1rem) | Buttons (`NoiseButton`), links, list items, inline CTAs, inputs |
| `--icon-md` | `18px` (1.125rem) | Accordion toggles, secondary navigation, section category badges |
| `--icon-lg` | `20px` (1.25rem) | Core navigation controls, service catalog feature headers, modal controls |
| `--icon-xl` | `24px` (1.5rem) | Feature/service cards (`ServiceCard`, `WhyUs` grid items) |
| `--icon-2xl`| `32px` (2rem) | Prominent hero highlight or architectural overview indicators |

---

## 4. Semantic Color Inheritance
Icons inherit context colors via `currentColor` and design tokens:
- **Default**: `currentColor` / `var(--text-body)` / `var(--text-white)`
- **Accent Action**: `var(--accent)` (`#008DE4`)
- **Success / Verified**: `var(--accent-green)` (`#00B862`)
- **Warning / Alert**: `var(--accent-yellow)` (`#FBB040`)
- **Error / Failure**: `var(--accent-red)` (`#FF5733`)

*Never assign arbitrary rainbow colors, gradients, or heavy glows to individual icons.*

---

## 5. Semantic Mapping Guidelines

### Core Services
- **AI Agentic Development**: `Bot` / `Workflow`
- **SaaS Platform Engineering**: `Cloud`
- **Modern Web Development**: `Globe`
- **Mobile App Development**: `Smartphone`
- **API & System Integration**: `Cpu` / `Plug`
- **Digital Marketing**: `Megaphone` / `TrendingUp`
- **Hosting & Cloud Maintenance**: `Server`
- **Product Strategy & Consulting**: `Compass`

### Directional Arrow System
- Primary Forward Action: `ArrowRight` (`size={16}`, `strokeWidth={1.75}`)
- External / Project Link Action: `ArrowUpRight` (`size={16}`, `strokeWidth={1.75}`)
- Back Navigation: `ArrowLeft` (`size={14}`, `strokeWidth={1.75}`)
- Breadcrumb Separation: `ChevronRight` (`size={14}`, `strokeWidth={1.75}`)
- Accordion Expand/Collapse: `Plus` / `Minus` (`size={18}`, `strokeWidth={1.75}`)

### Status & Feedback Indicators
- **Success / Completed / Guarantee**: `CheckCircle2`
- **Security / Code Ownership**: `ShieldCheck`
- **Fast / Performance**: `Zap`
- **Timeline / Milestone**: `Calendar` / `Clock`
- **Contact / Communications**: `Mail` / `Phone` / `Building2` / `MapPin` / `Send`

---

## 6. Accessibility & Button Patterns
- **Decorative Icons**: Always include `aria-hidden="true"` when accompanying descriptive text.
- **Icon-Only Buttons**: Always provide an `aria-label` attribute (e.g. `<button aria-label="Close menu">`).
- **Interactive States**: Focus rings and hover scale transforms must follow standard accessibility bounds.
