import { PortfolioProject } from '../types';

/**
 * VEYRO Portfolio Data Repository
 * 
 * Centralized, data-driven content model for all websites, client projects,
 * experiments, and architectural concept demonstrations.
 * 
 * RULES:
 * - Unique id and unique slug per project.
 * - Concept work MUST have projectType="concept" and status="concept" with conceptDisclosure.
 * - Never invent live URLs or fake client statistics.
 * - Optional fields left undefined are safely hidden by the UI.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'proj-arcline-studio',
    slug: 'arcline-studio',
    title: 'ARCLINE STUDIO',
    subtitle: 'High-end interior architecture and spatial design practice in Delhi NCR.',
    category: 'Interior Design',
    tags: ['Spatial Design', 'Luxury Residential', 'Delhi NCR', 'Conversion Funnel'],
    coverImage: '/src/assets/images/arcline_studio_cover_1792039501317.jpg',
    gallery: ['/src/assets/images/arcline_detail_1792039518953.jpg'],
    projectType: 'concept',
    status: 'concept',
    featured: true,
    completionDate: 'October 2026',
    location: 'Delhi NCR · South Delhi',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    services: ['Digital Strategy', 'Web Design', 'Web Development', 'Local Growth'],
    intendedAudience: 'High-net-worth residential homeowners, luxury property developers, and design connoisseurs in Delhi NCR.',
    projectGoals: [
      'Showcase physical materiality, custom millwork, and spatial lighting online.',
      'Replace bloated, image-heavy WordPress templates with an instantaneous, modern frontend.',
      'Convert casual Instagram and Pinterest attention into qualified interior design consultations.',
    ],
    conceptDisclosure: 'This is an architectural concept case study engineered by VEYRO to demonstrate spatial design excellence and high-ticket consultation conversion. It is not an active commercial client endorsement.',
    caseStudy: {
      overview:
        'ARCLINE STUDIO was created to solve a persistent dilemma in the Delhi NCR interior design sector: studios invest months crafting breathtaking physical spaces with Italian marble, custom joinery, and tailored lighting, only to send prospective clients to slow, generic template websites that fail to reflect that craft.',
      challenge:
        'Luxury residential clients evaluate trust in seconds. Template sites typically suffer from sluggish gallery loading, awkward mobile navigation, and generic enquiry forms that turn potential high-budget consultations into dead ends.',
      strategy:
        'Structure the experience around full-bleed architectural framing, generous negative space, high-contrast typography, and a rapid 3-step residential consultation questionnaire that pre-qualifies scope and timelines.',
      identity: {
        fontSystem: 'Space Grotesk + Inter + DM Mono',
        palette: ['#0B0B0D', '#151719', '#F3F0E8', '#C7FF3D'],
        conceptNotes: 'Minimalist brutalist structure paired with warm stone and architectural lighting aesthetics.',
      },
      experience:
        'Full-bleed project galleries, tactile cursor labels, interactive room plan highlights, and smooth section transitions.',
      interactionNotes: [
        '3D perspective tilt cards reflecting material depth and spatial layering',
        'Dual-layer cursor displaying dynamic VIEW and EXPLORE actions',
        'Instant enquiry modal with project budget and timeline qualification',
        'Automatic reduced-motion graceful degradation',
      ],
      conversionFeatures: [
        'Direct WhatsApp architectural consultation trigger with pre-filled scope',
        'Step-by-step residential design questionnaire',
        'Local schema markup targeting South Delhi, Gurugram, and Noida search queries',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
      heroMetrics: [
        { label: 'Project Type', value: 'Concept Case Study' },
        { label: 'Primary Market', value: 'Delhi NCR Interior Design' },
        { label: 'Objective', value: 'High-Ticket Consultation Conversion' },
      ],
      outcomes: [
        'Sub-second page transitions across high-resolution spatial imagery',
        'Clear, frictionless inquiry path for luxury residential clients',
        'Distinctive architectural aesthetic that separates the studio from template-based competitors',
      ],
      nextProjectSlug: 'noire',
      nextProjectTitle: 'NOIRÉ — Luxury Fashion',
    },
  },
  {
    id: 'proj-noire',
    slug: 'noire',
    title: 'NOIRÉ',
    subtitle: 'Bespoke luxury fashion label, editorial runway styling, and private salon collection.',
    category: 'Luxury Fashion',
    tags: ['Haute Couture', 'Editorial Web', 'Private Salons', 'VIP Concierge'],
    coverImage: '/src/assets/images/noire_cover_1792039565436.jpg',
    gallery: ['/src/assets/images/noire_detail_1792039589374.jpg'],
    projectType: 'concept',
    status: 'concept',
    featured: true,
    completionDate: 'October 2026',
    location: 'Global / Editorial Concept',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    services: ['Digital Strategy', 'Web Design', 'Web Development'],
    intendedAudience: 'Discerning fashion collectors, private atelier clients, and editorial stylists looking for bespoke garments.',
    projectGoals: [
      'Bridge haute-couture editorial print aesthetics with lightning-fast interactive web performance.',
      'Facilitate private atelier salon appointments and VIP lookbook requests.',
      'Eliminate visual clutter to let garment silhouettes and fabric textures command focus.',
    ],
    conceptDisclosure: 'This is an editorial concept case study engineered by VEYRO to demonstrate high-end luxury fashion art direction, typographic restraint, and private salon booking workflows.',
    caseStudy: {
      overview:
        'NOIRÉ demonstrates how luxury fashion labels can present seasonal collections with the gravitas of an international gallery exhibition. Rather than treating an online collection like a commodity e-commerce catalog, NOIRÉ treats every garment as an architectural sculpture.',
      challenge:
        'High-fashion websites frequently veer into two extremes: either chaotic, unnavigable experimental animations that frustrate users, or soulless e-commerce grids that destroy brand prestige.',
      strategy:
        'Engineer a balanced compromise: severe monochrome Obsidian backdrops, sculptural typography in Space Grotesk, dramatic chiaroscuro lighting, and a streamlined private appointment concierge.',
      identity: {
        fontSystem: 'Space Grotesk + DM Mono',
        palette: ['#08090A', '#16181A', '#F8F6F1', '#D4AF37'],
        conceptNotes: 'Monochrome obsidian canvas with subtle gold and ivory typography.',
      },
      experience:
        'Horizontal collection scrubbing, seamless lookbook previews, and audio-visual ambiance cues.',
      interactionNotes: [
        'Kinetic runway carousel with velocity-based momentum',
        'Subtle parallax on high-resolution fabric textures',
        'Private salon reservation modal with date and city selector',
      ],
      conversionFeatures: [
        'VIP concierge appointment scheduler',
        'Private collection lookbook download with email capture',
        'Ultra-responsive mobile touch styling',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
      heroMetrics: [
        { label: 'Project Type', value: 'Concept Case Study' },
        { label: 'Primary Market', value: 'High-Fashion & Lifestyle' },
        { label: 'Objective', value: 'Editorial Prestige & Private Salon Enquiries' },
      ],
      outcomes: [
        'Elevated editorial atmosphere that reinforces high garment price points',
        'Direct connection between digital lookbook viewing and in-person private salon booking',
        'Responsive elegance across mobile screens and desktop monitors alike',
      ],
      nextProjectSlug: 'kavo',
      nextProjectTitle: 'KAVO — Café & Hospitality',
    },
  },
  {
    id: 'proj-kavo',
    slug: 'kavo',
    title: 'KAVO',
    subtitle: 'Artisanal roastery, specialty café culture, and urban community gathering space.',
    category: 'Café & Hospitality',
    tags: ['Specialty Coffee', 'Urban Roastery', 'Local Hospitality', 'Footfall Conversion'],
    coverImage: '/src/assets/images/kavo_cover_1792039615820.jpg',
    gallery: ['/src/assets/images/kavo_detail_1792039643508.jpg'],
    projectType: 'concept',
    status: 'concept',
    featured: true,
    completionDate: 'October 2026',
    location: 'Delhi NCR · Urban Roastery',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    services: ['Digital Strategy', 'Web Design', 'Web Development', 'Local Growth'],
    intendedAudience: 'Specialty coffee enthusiasts, remote creators, and weekend brunch-goers in Delhi NCR.',
    projectGoals: [
      'Drive consistent weekend footfall and live workshop bookings.',
      'Showcase seasonal single-origin roasts with interactive tasting profiles.',
      'Provide instant, location-aware operating hours and 1-tap navigation directions.',
    ],
    conceptDisclosure: 'This is a hospitality concept case study engineered by VEYRO to demonstrate local search discovery, tactile menu interaction, and footfall conversion for specialty food & beverage brands.',
    caseStudy: {
      overview:
        'KAVO explores how independent hospitality brands can reclaim their customer relationship from third-party delivery apps and social algorithms. By building an owned digital hub with live seating indicators and tasting profiles, KAVO turns online visitors into in-person customers.',
      challenge:
        'Most urban cafés rely entirely on Instagram, leaving local searchers stranded with outdated Google Maps hours, unreadable PDF menus, and zero way to book workshops or wholesale beans directly.',
      strategy:
        'Build a tactile, energetic web presence with warm roasted bean tones, live status badges, interactive flavor wheel notes, and direct WhatsApp reservation pathways.',
      identity: {
        fontSystem: 'Space Grotesk + Inter',
        palette: ['#0E0F10', '#1C1E20', '#F3F0E8', '#FF6B35', '#C7FF3D'],
        conceptNotes: 'Warm espresso and roasted bean tones contrasted with crisp electric green accents.',
      },
      experience:
        'Interactive roast profile matrix, daily single-origin bean availability ticker, and one-tap Google Maps directions.',
      interactionNotes: [
        'Interactive flavour wheel and brew method selector',
        'Instant table reservation and workshop ticket selector',
        'Location-aware hours and status indicator (Open / Closed)',
      ],
      conversionFeatures: [
        'One-tap WhatsApp reservation trigger with date and party size',
        'Specialty bean subscription enquiry flow',
        'Local SEO geo-targeting Delhi café searches',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
      heroMetrics: [
        { label: 'Project Type', value: 'Concept Case Study' },
        { label: 'Primary Market', value: 'Specialty Hospitality' },
        { label: 'Objective', value: 'Footfall Attraction & Event Bookings' },
      ],
      outcomes: [
        'Direct table and workshop booking mechanism bypassing third-party fees',
        'Engaging digital roast profile that educates and excites specialty coffee lovers',
        'Rapid mobile access for nearby customers seeking immediate directions and hours',
      ],
      nextProjectSlug: 'arcline-studio',
      nextProjectTitle: 'ARCLINE STUDIO — Interior Design',
    },
  },
];

// Compatibility alias for existing code
export const conceptProjects = portfolioProjects.map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  category: p.category,
  location: p.location || 'Delhi NCR',
  coverImage: p.coverImage,
  gallery: p.gallery,
  isConcept: p.status === 'concept',
  heroMetrics: p.caseStudy?.heroMetrics,
  overview: p.caseStudy?.overview || p.subtitle,
  challenge: p.caseStudy?.challenge || '',
  strategy: p.caseStudy?.strategy || '',
  identity: p.caseStudy?.identity || { fontSystem: '', palette: [], conceptNotes: '' },
  experience: p.caseStudy?.experience || '',
  interactionNotes: p.caseStudy?.interactionNotes || [],
  conversionFeatures: p.caseStudy?.conversionFeatures || [],
  techStack: p.technologies,
  nextProjectSlug: p.caseStudy?.nextProjectSlug || 'arcline-studio',
  nextProjectTitle: p.caseStudy?.nextProjectTitle || 'ARCLINE STUDIO',
}));

export function getAllProjects(): PortfolioProject[] {
  return portfolioProjects;
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured);
}
