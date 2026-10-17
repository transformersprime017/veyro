import { JournalArticle } from '../types';

/**
 * VEYRO Journal & Editorial Repository
 * 
 * Centralized, data-driven content store for studio perspectives, technical insights,
 * and design guides tailored to modern businesses and interior designers.
 * 
 * RULES:
 * - Only articles with status="published" appear on public directory indexes.
 * - Articles with status="draft" are hidden from listings.
 * - Never fabricate false citations, statistics, or invented client quotes.
 * - Authors reflect authentic studio leadership (VEYRO Editorial / Founder).
 */
export const journalArticles: JournalArticle[] = [
  {
    id: 'art-interior-designers-instagram',
    slug: 'why-interior-designers-need-more-than-instagram',
    title: 'Why Interior Designers Need More Than an Instagram Portfolio',
    summary:
      'Relying entirely on social media leaves luxury design practices on leased land. Here is why an owned digital showroom is vital for high-budget residential client trust in Delhi NCR.',
    category: 'Interior Design',
    tags: ['Interior Design', 'Delhi NCR', 'Digital Strategy', 'High-Ticket Sales'],
    author: {
      name: 'VEYRO Editorial',
      role: 'Web & Digital Studio',
    },
    publishedDate: 'October 2026',
    readTime: '6 min read',
    status: 'published',
    featured: true,
    coverImage: '/images/journal_interior_1792039678760.jpg',
    seoTitle: 'Why Interior Designers Need an Owned Website | VEYRO Journal',
    seoDescription:
      'Learn why relying solely on Instagram limits luxury interior design practices in Delhi NCR and how an owned digital showroom converts high-ticket residential clients.',
    relatedSlugs: ['what-makes-a-website-convert-visitors-into-enquiries', 'web-design-vs-web-development-what-businesses-need'],
    sections: [
      {
        heading: 'The Leased Land Paradox',
        paragraphs: [
          'If you ask the founder of almost any luxury interior design practice in South Delhi or Gurugram where their current inquiries originate, the answer is almost always Instagram. Social media is an undeniably potent discovery engine. However, treating a third-party social feed as your primary business hub creates a profound strategic vulnerability.',
          'Instagram is leased land. You do not control the algorithm, you cannot customize the viewing environment, and your carefully photographed 8,000 sq ft residential penthouse is compressed into a 1080-pixel square flanked by competing ads, notifications, and memes.',
        ],
        callout: 'When your entire portfolio lives on a social feed, you are forcing high-net-worth clients to evaluate a ₹50 lakh+ spatial commission on an app designed for 3-second distractions.',
      },
      {
        heading: 'Physical Materiality Requires Architectural Web Presentation',
        paragraphs: [
          'Interior design is inherently tactile and spatial. It is about how natural daylight hits fluted timber paneling, how Italian Statuario marble veining wraps across an island counter, and how acoustic drapery dampens ambient street noise.',
          'A custom, high-performance website acts as a digital gallery extension of your physical craft. Fullscreen high-resolution imagery, subtle 3D perspective shifts, and generous whitespace communicate that your practice values spatial proportion and architectural discipline.',
        ],
        list: [
          'Full-bleed spatial framing that lets custom millwork and finishes breathe',
          'Controlled typographic hierarchy that elevates brand prestige above template builders',
          'Fast sub-second asset loading that eliminates mobile waiting frustration',
        ],
      },
      {
        heading: 'Direct Inquiries vs. Lost Direct Messages',
        paragraphs: [
          'The biggest point of friction in social-first business operations is the inquiry process. High-value clients rarely want to send a casual "price please?" DM. When they do, messages get buried under spam, personal notes, or unread notifications.',
          'An owned digital showroom provides a structured, dignified on-ramp: a 3-step project questionnaire where prospective clients specify their property location, carpet area, estimated timeline, and investment range before you ever hop on a discovery call.',
        ],
        keyTakeaway:
          'A bespoke website pre-qualifies prospective clients automatically, filtering out casual tire-kickers and ensuring your time is spent only on serious architectural commissions.',
      },
      {
        heading: 'Local Search Equity in Delhi NCR',
        paragraphs: [
          'Instagram posts do not build long-term regional search engine equity. When high-intent property owners search Google for "luxury interior architects in South Delhi" or "modern penthouse designers Gurugram," Google indexes crawlable HTML with structured Schema.org markup—not ephemeral social stories.',
          'By anchoring your studio to an owned web presence with geo-targeted local schema, you capture high-intent clients at the exact moment they are looking to hire a practice, rather than hoping an algorithm happens to place you in their evening feed.',
        ],
      },
    ],
  },
  {
    id: 'art-what-makes-websites-convert',
    slug: 'what-makes-a-website-convert-visitors-into-enquiries',
    title: 'What Makes a Business Website Convert Visitors Into Enquiries?',
    summary:
      'Aesthetic beauty without commercial intent is just art on a screen. Here are the core structural mechanisms that turn casual online browsers into qualified client consultations.',
    category: 'Web Strategy',
    tags: ['Conversion Architecture', 'UX Design', 'Lead Capture', 'Commercial Strategy'],
    author: {
      name: 'VEYRO Editorial',
      role: 'Web & Digital Studio',
    },
    publishedDate: 'October 2026',
    readTime: '5 min read',
    status: 'published',
    featured: false,
    coverImage: '/images/journal_conversion_1792039714477.jpg',
    seoTitle: 'What Makes Websites Convert Visitors Into Inquiries | VEYRO Journal',
    seoDescription:
      'Discover the practical architectural factors that turn website visitors into qualified project inquiries without aggressive popups or generic template bloat.',
    relatedSlugs: ['why-interior-designers-need-more-than-instagram', 'web-design-vs-web-development-what-businesses-need'],
    sections: [
      {
        heading: 'The 3-Second Rule of Propositional Clarity',
        paragraphs: [
          'Most business websites fail before the user scrolls past the hero section. Agencies frequently mistake clever, ambiguous poetry for sophisticated branding. When a visitor lands on your page, their subconscious mind is asking three immediate questions: What do you do? Is this meant for someone like me? And what should I do next?',
          'If your headline reads "Empowering Global Synergy" instead of "Bespoke Web & Digital Studio for Delhi NCR Interior Practices," you have forced the visitor to expend cognitive effort. Clear always beats clever in conversion architecture.',
        ],
        callout: 'Sophistication is not ambiguity. The most premium brands communicate their core value proposition with unmistakable directness.',
      },
      {
        heading: 'Eliminating the "Generic Form" Dead End',
        paragraphs: [
          'Consider the standard agency contact form: ten mandatory text boxes, a clunky captcha, and a generic "Submit" button that refreshes the page with a vague message. It feels like filing paperwork at a government bureau.',
          'High-converting websites replace this friction with intelligent qualification funnels: interactive multi-step buttons that let the client select their budget, service scope, and timeline in seconds, paired with a direct WhatsApp bridge for immediate dialogue.',
        ],
        list: [
          'Provide clear budget tier selectors so clients know your entry threshold',
          'Offer instant WhatsApp integration with pre-filled scope parameters',
          'Acknowledge receipt immediately with a clear next-step timeline (e.g. 24hr response guarantee)',
        ],
      },
      {
        heading: 'Performance as a Psychological Signal',
        paragraphs: [
          'Website speed is not merely a technical vanity metric; it is an immediate subconscious indicator of operational competence. When a prospective client taps a link and waits 4 seconds for heavy scripts and bloated tracking pixels to load, they subconsciously associate your business with friction and disorganization.',
          'A sub-second website built on React and modern CSS feels crisp, confident, and reliable. That immediate fluid responsiveness establishes trust before the visitor has even read your third paragraph.',
        ],
        keyTakeaway:
          'Sub-second page loading creates a visceral perception of luxury, precision, and modern technical competence.',
      },
    ],
  },
  {
    id: 'art-web-design-vs-development',
    slug: 'web-design-vs-web-development-what-businesses-need',
    title: 'Website Design vs. Website Development: What Does Your Business Actually Need?',
    summary:
      'Many founders confuse visual mockups with frontend engineering. Here is why high-end commercial websites require both disciplines working as a single unified system.',
    category: 'Engineering',
    tags: ['Web Engineering', 'Design Systems', 'React', 'Studio Standards'],
    author: {
      name: 'VEYRO Editorial',
      role: 'Web & Digital Studio',
    },
    publishedDate: 'October 2026',
    readTime: '7 min read',
    status: 'published',
    featured: false,
    coverImage: '/images/journal_engineering_1792081412544.jpg',
    seoTitle: 'Web Design vs Web Development Explained | VEYRO Journal',
    seoDescription:
      'Understand the crucial difference between visual Figma design and production frontend engineering, and why successful businesses need both working in harmony.',
    relatedSlugs: ['why-interior-designers-need-more-than-instagram', 'what-makes-a-website-convert-visitors-into-enquiries'],
    sections: [
      {
        heading: 'The Common Misconception',
        paragraphs: [
          'In many business discussions, the terms "web design" and "web development" are used interchangeably. Founders often believe that hiring a graphic designer to create pretty Figma mockups means the website is halfway built, or conversely, that hiring a backend programmer guarantees a beautiful, engaging user experience.',
          'In reality, these are two fundamentally different disciplines that must operate in continuous dialogue to produce an ultra-premium commercial asset.',
        ],
        callout: 'A gorgeous design that loads sluggishly or breaks on mobile is commercially useless. A blazing-fast website with chaotic typography and zero visual hierarchy fails to build prestige.',
      },
      {
        heading: 'What Web Design Actually Entails',
        paragraphs: [
          'Web design is the discipline of communication, spatial proportion, and visual psychology. It involves choosing typographic pairings that convey the exact emotional weight of your brand, establishing chromatic harmony with deliberate contrast ratios, and structuring layouts that naturally guide user eye movement down the page.',
          'Good design is not decorative styling slapped onto a page at the end; it is the strategic visual system that establishes whether a visitor perceives your company as an elite enterprise or a commodity freelancer.',
        ],
        list: [
          'Typographic lockups (Space Grotesk, Inter, and DM Mono pairings)',
          'Spatial grids and intentional architectural negative space',
          'Micro-interaction physics and tactile button response states',
        ],
      },
      {
        heading: 'What Web Development Actually Delivers',
        paragraphs: [
          'Web development is the engineering discipline that transforms visual blueprints into living, breathing, accessible software. It includes writing semantic HTML5 that search engines can parse, implementing strict TypeScript schemas that eliminate runtime crashes, optimizing Core Web Vitals for instant mobile rendering, and wiring lead qualification funnels.',
          'When you hire an agency that simply pastes a Figma design into a drag-and-drop page builder, you end up with thousands of lines of bloated spaghetti code, terrible mobile performance, and zero flexibility for future software expansion.',
        ],
        keyTakeaway:
          'True frontend engineering ensures your website is accessible, ultra-fast, search engine compliant, and architected to scale without forcing a total rebuild a year later.',
      },
      {
        heading: 'The Unified Studio Model',
        paragraphs: [
          'At VEYRO, we eliminate the friction between designers and developers by unifying both disciplines under one roof. Our design tokens map directly to our code variables, our animations are built with hardware-accelerated CSS, and our layouts are tested on real touch devices from day one.',
          'When strategy, design, and code originate from a single coherent vision, the resulting website operates with seamless architectural precision.',
        ],
      },
    ],
  },
];

// Query Helpers
export function getAllArticles(): JournalArticle[] {
  return journalArticles;
}

export function getPublishedArticles(): JournalArticle[] {
  return journalArticles.filter((a) => a.status === 'published');
}

export function getFeaturedArticle(): JournalArticle | undefined {
  return journalArticles.find((a) => a.status === 'published' && a.featured) || journalArticles[0];
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  // Support slug aliases to preserve crawlability for legacy or alternate links
  if (slug === 'what-makes-websites-convert-visitors-into-inquiries') {
    return journalArticles.find((a) => a.slug === 'what-makes-a-website-convert-visitors-into-enquiries');
  }
  if (slug === 'web-design-vs-web-development-why-both-matter') {
    return journalArticles.find((a) => a.slug === 'web-design-vs-web-development-what-businesses-need');
  }
  return journalArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): JournalArticle[] {
  if (category === 'all') return getPublishedArticles();
  return journalArticles.filter((a) => a.status === 'published' && a.category === category);
}

export function getRelatedArticles(slugs?: string[]): JournalArticle[] {
  if (!slugs || slugs.length === 0) return getPublishedArticles().slice(0, 2);
  return journalArticles.filter((a) => slugs.includes(a.slug) && a.status === 'published');
}
