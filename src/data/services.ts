import { ServiceData } from '../types';

export const studioServices: ServiceData[] = [
  {
    number: '01',
    title: 'Digital Strategy',
    tagline: 'Positioning, structure, and conversion logic before a single pixel moves.',
    description:
      'We audit where your business wins attention and where it loses prospective clients. We define the page hierarchy, core value proposition, audience journeys, and enquiry pathways before entering visual production.',
    deliverables: [
      'Competitive positioning analysis',
      'Information architecture & sitemap',
      'Customer enquiry journey mapping',
      'High-conversion page wireframes',
      'Technical requirements specification',
    ],
    idealClient: 'Businesses launching a new brand or pivoting from a low-performing template website.',
    processStep: '02 / Strategy',
  },
  {
    number: '02',
    title: 'Web Design',
    tagline: 'Architectural layouts, bold typography, and distinctive visual presence.',
    description:
      'No recycled templates or cookie-cutter agency themes. We engineer custom visual identities with intentional negative space, high-contrast typography, tailored micro-interactions, and responsive beauty across all viewports.',
    deliverables: [
      'High-fidelity responsive UI layouts',
      'Custom typographic hierarchy & design tokens',
      'Interactive component design system',
      'Motion & micro-interaction specifications',
      'Asset direction & visual art direction',
    ],
    idealClient: 'Interior designers, luxury lifestyle labels, and studios needing to match high-end real-world craft.',
    processStep: '03 / Design',
  },
  {
    number: '03',
    title: 'Web Development',
    tagline: 'Engineered for extreme performance, clean semantics, and zero lag.',
    description:
      'Modern frontend architecture built with React, TypeScript, and modern styling frameworks. Fast loading times, pristine Core Web Vitals, accessible markup, and clean code that is easy to maintain and expand.',
    deliverables: [
      'Production-grade React & TypeScript codebase',
      'Responsive layouts across mobile, tablet, and ultra-wide screens',
      'Sub-second page loading & asset optimization',
      'WCAG AA accessible markup & keyboard navigation',
      'Full cross-browser compatibility verification',
    ],
    idealClient: 'Businesses seeking technical reliability, speed, and bespoke interactive capabilities.',
    processStep: '04 / Build',
  },
  {
    number: '04',
    title: 'Local Growth',
    tagline: 'Foundations engineered for Delhi NCR discovery and high-intent local search.',
    description:
      'Local businesses thrive on local relevance. We build structured local schema, geo-targeted landing page structures, and fast mobile contact journeys to turn neighborhood discovery into qualified project enquiries.',
    deliverables: [
      'LocalBusiness & ProfessionalService JSON-LD schemas',
      'Geo-targeted keyword architecture (Delhi NCR, Gurugram, South Delhi, Noida)',
      'Google Business Profile integration readiness',
      'Mobile-first local contact & WhatsApp conversion flows',
      'Fast location landing page templates',
    ],
    idealClient: 'Local service businesses, design practices, and hospitality concepts serving defined regional areas.',
    processStep: '05 / Test',
  },
  {
    number: '05',
    title: 'AI Systems',
    tagline: 'Smart workflows and client-facing digital utilities that punch above your weight.',
    description:
      'Integrate intelligent client qualification, instant project brief generation, and automated enquiry routing. We make independent studios and boutique businesses operate with the responsiveness of larger teams.',
    deliverables: [
      'Client qualification & lead scoring logic',
      'Interactive website brief & estimation tools',
      'Automated email and webhook routing (Sheets, CRM)',
      'Structured response formatting & follow-up pipelines',
      'Custom in-browser diagnostic widgets',
    ],
    idealClient: 'Lean teams and founder-led businesses wanting high-leverage digital enquiry handling.',
    processStep: '04 / Build',
  },
  {
    number: '06',
    title: 'Evolution',
    tagline: 'Launch first, measure real behavior, and iterate continuously.',
    description:
      'A website is not a static brochure printed once and abandoned. We treat your digital presence as a living asset, analyzing user behavior, updating case studies, optimizing conversion friction, and scaling features.',
    deliverables: [
      'Post-launch user behavior audit',
      'Conversion rate friction reduction updates',
      'Regular portfolio & case study expansion',
      'Quarterly performance & Core Web Vitals tune-ups',
      'Technical maintenance & security updates',
    ],
    idealClient: 'Established businesses planning continuous growth rather than a one-time static launch.',
    processStep: '07 / Evolve',
  },
];
