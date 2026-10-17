/**
 * VEYRO Web & Digital Studio
 * Centralized Configuration & Placeholder Management
 * 
 * Single source of truth for business details, founder info, contact endpoints,
 * social links, and deployment configurations.
 * 
 * RULE: Unverified details must remain placeholders. Do not invent links or credentials.
 * If a social link is null/empty, UI components must hide the link gracefully.
 */

export interface StudioConfig {
  brand: {
    name: string;
    tagline: string;
    subline: string;
    category: string;
    initialMarket: string;
    initialNiche: string;
    establishedYear: number;
  };
  founder: {
    name: string;
    role: string;
    isPlaceholder: boolean;
    bio: string;
  };
  contact: {
    email: string | null;
    whatsappNumber: string | null;
    location: string;
    isEmailPlaceholder: boolean;
    isWhatsappPlaceholder: boolean;
  };
  deployment: {
    domain: string;
    isProductionDomain: boolean;
  };
  social: {
    instagram: string | null;
    linkedin: string | null;
    twitter: string | null;
    github: string | null;
  };
  integrations: {
    formEndpoint: string | null;
    googleSheetsWebhook: string | null;
    crmEndpoint: string | null;
    analyticsId: string | null;
    searchConsoleVerification: string | null;
  };
}

// Safe environment variable accessor supporting Vite browser runtime and Node SSR/test runners
function getEnv(key: string, fallback: string | null = null): string | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metaEnv = (import.meta as any)?.env;
    if (metaEnv && key in metaEnv) {
      return (metaEnv[key] as string) || fallback;
    }
  } catch {
    // Fall through
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gProcess = (globalThis as any)?.process;
    if (gProcess?.env && key in gProcess.env) {
      return gProcess.env[key] || fallback;
    }
  } catch {
    // Fallback to default
  }
  return fallback;
}

export const studioConfig: StudioConfig = {
  brand: {
    name: 'VEYRO',
    tagline: 'Built to be noticed. Designed to convert.',
    subline: 'Web & Digital Studio',
    category: 'Digital Studio & Web Engineering',
    initialMarket: 'Delhi NCR',
    initialNiche: 'Interior designers and local businesses',
    establishedYear: 2026,
  },
  founder: {
    // TEMPORARY PLACEHOLDER: Do not assume or publish a real founder name without client confirmation.
    name: 'Founder Name',
    role: 'Founder & Technical Lead',
    isPlaceholder: true,
    bio: 'Independent web engineer and digital strategist designing modern, high-conversion web experiences for businesses that refuse to look like standard templates.',
  },
  contact: {
    // Configurable through environment or updated here. Mark as placeholder if unconfirmed.
    email: getEnv('VITE_BUSINESS_EMAIL', 'hello.veyro@gmail.com'),
    whatsappNumber: getEnv('VITE_WHATSAPP_NUMBER', null), // null = unconfigured production number
    location: 'Delhi NCR, India',
    isEmailPlaceholder: !getEnv('VITE_BUSINESS_EMAIL'),
    isWhatsappPlaceholder: !getEnv('VITE_WHATSAPP_NUMBER'),
  },
  deployment: {
    domain: (
      getEnv('VITE_REAL_DOMAIN') || 
      getEnv('VITE_SITE_URL') || 
      getEnv('VITE_CANONICAL_URL') || 
      getEnv('VITE_PRODUCTION_DOMAIN') || 
      'https://veyro.example'
    ).replace(/\/+$/, ''),
    isProductionDomain: Boolean(
      (getEnv('VITE_REAL_DOMAIN') || getEnv('VITE_SITE_URL') || getEnv('VITE_CANONICAL_URL') || getEnv('VITE_PRODUCTION_DOMAIN')) &&
      !(getEnv('VITE_REAL_DOMAIN') || getEnv('VITE_SITE_URL') || getEnv('VITE_CANONICAL_URL') || getEnv('VITE_PRODUCTION_DOMAIN'))?.includes('example')
    ),
  },
  social: {
    // All social links default to null until confirmed.
    // Zero broken links or '#' links will ever be rendered.
    instagram: getEnv('VITE_SOCIAL_INSTAGRAM', null),
    linkedin: getEnv('VITE_SOCIAL_LINKEDIN', null),
    twitter: null,
    github: null,
  },
  integrations: {
    formEndpoint: getEnv('VITE_FORM_ENDPOINT', null),
    googleSheetsWebhook: getEnv('VITE_GOOGLE_SHEETS_WEBHOOK', null),
    crmEndpoint: getEnv('VITE_CRM_ENDPOINT', null),
    analyticsId: getEnv('VITE_ANALYTICS_ID', null),
    searchConsoleVerification: getEnv('VITE_SEARCH_CONSOLE_VERIFICATION', null),
  },
};

/**
 * Returns a validated WhatsApp direct link, or null if the number is unconfigured.
 */
export function getWhatsAppLink(customMessage?: string): string | null {
  if (!studioConfig.contact.whatsappNumber) return null;
  const cleaned = studioConfig.contact.whatsappNumber.replace(/[^0-9]/g, '');
  if (!cleaned || cleaned === '919999999999') return null; // Recognizes test placeholder
  const encoded = customMessage ? `?text=${encodeURIComponent(customMessage)}` : '';
  return `https://wa.me/${cleaned}${encoded}`;
}

/**
 * Returns a mailto link, or null if the email is unconfigured.
 */
export function getEmailLink(subject?: string): string | null {
  if (!studioConfig.contact.email) return null;
  const encodedSubject = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${studioConfig.contact.email}${encodedSubject}`;
}
