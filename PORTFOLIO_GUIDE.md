# VEYRO Portfolio & Achievements Developer Guide

This document explains how to add new websites, client commissions, technical milestones, and concept studies to the VEYRO portfolio without altering page layout components.

---

## 1. File Structure

All portfolio entries and achievements are managed through centralized TypeScript data files:

- **Websites, Client Work & Concept Projects**: `src/data/portfolio.ts`
- **Studio Achievements & Technical Milestones**: `src/data/achievements.ts`
- **TypeScript Data Contracts**: `src/types/index.ts`
- **Integrity Validation Utility**: `src/utils/portfolioValidator.ts`

---

## 2. Adding a New Project Entry

Open `src/data/portfolio.ts` and add a new object to the `portfolioProjects` array conforming to the `PortfolioProject` interface.

### Minimal Example (Quick Entry without Full Case Study):

```typescript
{
  id: 'proj-atelier-north',
  slug: 'atelier-north',
  title: 'ATELIER NORTH',
  subtitle: 'Boutique architectural practice and sustainable residential design studio.',
  category: 'Architecture',
  tags: ['Sustainable Design', 'Residential Architecture', 'Delhi NCR'],
  projectType: 'website',
  status: 'live',
  featured: false,
  completionDate: 'November 2026',
  location: 'Gurugram · Delhi NCR',
  technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
  services: ['Web Design', 'Web Development'],
  intendedAudience: 'Homeowners seeking bespoke timber and stone residential architecture.',
  projectGoals: [
    'Create an architectural digital portfolio with sub-second image loading.',
    'Streamline project consultation requests from private residential clients.',
  ],
  liveUrl: 'https://ateliernorth.example', // ONLY when verified; otherwise omit
}
```

### Full Example (With In-Depth Case Study):

```typescript
{
  id: 'proj-monument-house',
  slug: 'monument-house',
  title: 'MONUMENT HOUSE',
  subtitle: 'Editorial digital experience for a historic heritage renovation practice.',
  category: 'Interior Design',
  tags: ['Heritage Restoration', 'Spatial Architecture'],
  projectType: 'concept',
  status: 'concept',
  featured: true,
  completionDate: 'December 2026',
  location: 'Delhi NCR',
  technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
  services: ['Digital Strategy', 'Web Design', 'Web Development'],
  intendedAudience: 'Private estate owners and heritage restoration trusts.',
  projectGoals: ['Demonstrate physical stone materiality and lighting online.'],
  conceptDisclosure: 'This is an architectural concept case study engineered by VEYRO. It is not an active commercial endorsement.',
  caseStudy: {
    overview: 'In-depth explanation of the project context and artistic vision...',
    challenge: 'The friction point the project aimed to solve...',
    strategy: 'How the frontend architecture was structured...',
    identity: {
      fontSystem: 'Space Grotesk + Inter',
      palette: ['#0B0B0D', '#151719', '#F3F0E8', '#C7FF3D'],
      conceptNotes: 'Brutalist framing with warm stone accents.',
    },
    experience: 'Interactive gallery scrubbing with smooth section transitions.',
    interactionNotes: ['3D perspective tilt cards', 'Dual-layer magnetic cursor'],
    conversionFeatures: ['Direct WhatsApp architectural consultation trigger'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    heroMetrics: [
      { label: 'Project Type', value: 'Concept Case Study' },
      { label: 'Niche', value: 'Heritage Architecture' },
    ],
    outcomes: ['Sub-second page speeds across all device viewports.'],
    nextProjectSlug: 'arcline-studio',
    nextProjectTitle: 'ARCLINE STUDIO — Interior Design',
  },
}
```

---

## 3. Adding an Achievement Entry

Open `src/data/achievements.ts` and add an object to the `studioAchievements` array:

```typescript
{
  id: 'ach-lighthouse-perfect',
  title: '100/100 Core Web Vitals Lighthouse Score',
  category: 'Technical Rigor', // 'Milestone' | 'Technical Rigor' | 'Architecture' | 'Studio Foundation' | 'Quality Assurance'
  date: 'November 2026',
  description: 'Achieved pristine 100/100 performance, accessibility, best practices, and SEO benchmarks.',
  supportingEvidence: 'Validated on Google Lighthouse mobile and desktop audit pipelines.',
  featured: true,
  stats: { label: 'Performance', value: '100/100' },
  referenceUrl: undefined, // Optional external reference; omit if unverified
}
```

---

## 4. Fields & Integrity Rules

### A. Project Fields
- `id` (Required, string): Unique identifier, lowercase kebab-case prefixed with `proj-` (e.g. `proj-arcline-studio`).
- `slug` (Required, string): Unique URL path fragment (`/work/[slug]`). Lowercase letters, numbers, and hyphens only (`^[a-z0-9-]+$`).
- `projectType` (Required): Must be one of `'website' | 'client' | 'concept' | 'experiment' | 'system'`.
- `status` (Required): Must be one of `'concept' | 'in_progress' | 'live' | 'archived'`.
- `category` (Required): One of `'Interior Design' | 'Luxury Fashion' | 'Café & Hospitality' | 'Web Engineering' | 'Digital Systems' | 'Architecture' | 'Local Business'`.
- `featured` (Required, boolean): Set `true` to spotlight on the homepage and top of portfolio grids.
- `conceptDisclosure` (Mandatory for concepts): When `projectType === 'concept'` or `status === 'concept'`, you must supply an explicit transparency disclaimer.
- `liveUrl` (Optional, string): Valid HTTPS URL to the live site. **Never supply `#` or unverified dummy links.** If undefined, the UI hides the button automatically.

### B. Image Asset Placement
- Place project visual assets in `/public/images/portfolio/[slug]/` or use inline vector SVGs.
- Reference assets with root paths: `coverImage: '/images/portfolio/arcline-studio/hero.webp'`.

---

## 5. Automated Validation Check

The system includes a data integrity validator in `src/utils/portfolioValidator.ts`.

It automatically validates:
1. No duplicate `id` values across projects or achievements.
2. No duplicate `slug` paths.
3. Slugs follow strict URI-safe patterns.
4. Mandatory concept disclosures are present for all concept entries.
5. External URLs have valid `https:` or `http:` protocols.

---

## 6. How it Renders Automatically

When you append an entry to `portfolioProjects`:
1. It immediately appears on `/work` under the appropriate filter tabs (*Websites & Projects*, *Concepts*, *Category*).
2. If `featured: true`, it also surfaces on the homepage.
3. Its dedicated detail page is instantly reachable at `/work/[slug]` without any route configuration changes.
4. If a full `caseStudy` object is omitted, a clean, structured overview is generated automatically.
