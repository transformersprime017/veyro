/**
 * Centralized Type Definitions for VEYRO Web & Digital Studio
 */

export type RoutePath =
  | '/'
  | '/work'
  | '/work/arcline-studio'
  | '/work/noire'
  | '/work/kavo'
  | `/work/${string}`
  | '/services'
  | '/about'
  | '/process'
  | '/lab'
  | '/blog'
  | `/blog/${string}`
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/404';

export type ProjectType = 'website' | 'client' | 'concept' | 'experiment' | 'system';
export type ProjectStatus = 'concept' | 'in_progress' | 'live' | 'archived';

export type ProjectCategory =
  | 'Interior Design'
  | 'Luxury Fashion'
  | 'Café & Hospitality'
  | 'Web Engineering'
  | 'Digital Systems'
  | 'Architecture'
  | 'Local Business';

export interface DetailedCaseStudyContent {
  overview: string;
  challenge: string;
  strategy: string;
  identity: {
    fontSystem: string;
    palette: string[];
    conceptNotes: string;
  };
  experience: string;
  interactionNotes: string[];
  conversionFeatures: string[];
  techStack: string[];
  heroMetrics?: { label: string; value: string }[];
  outcomes?: string[];
  nextProjectSlug: string;
  nextProjectTitle: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  tags: string[];
  coverImage?: string;
  gallery?: string[];
  projectType: ProjectType;
  status: ProjectStatus;
  featured: boolean;
  completionDate?: string;
  location?: string;
  technologies: string[];
  services: string[];
  intendedAudience: string;
  projectGoals: string[];
  caseStudy?: DetailedCaseStudyContent;
  liveUrl?: string; // ONLY when verified; otherwise undefined
  repoUrl?: string; // ONLY when public & verified; otherwise undefined
  conceptDisclosure?: string; // Mandatory when projectType is concept or status is concept
}

export type AchievementCategory =
  | 'Milestone'
  | 'Technical Rigor'
  | 'Architecture'
  | 'Studio Foundation'
  | 'Quality Assurance';

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  date?: string;
  description: string;
  supportingEvidence?: string;
  referenceUrl?: string; // ONLY when valid & verified
  imageOrBadge?: string;
  featured: boolean;
  stats?: { label: string; value: string };
}

export interface ServiceData {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  idealClient: string;
  processStep: string;
}

export type ArticleCategory = 'Interior Design' | 'Web Strategy' | 'Engineering' | 'Local Growth';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  callout?: string;
  keyTakeaway?: string;
  list?: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  publishedDate: string;
  readTime: string;
  status: 'published' | 'draft';
  featured: boolean;
  coverImage?: string;
  sections: ArticleSection[];
  seoTitle?: string;
  seoDescription?: string;
  relatedSlugs?: string[];
}

// Compatibility alias
export type BlogPostData = JournalArticle;

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';

export interface LeadSubmission {
  id: string;
  createdAt: string;
  name: string;
  business: string;
  businessType: string;
  serviceNeed: string;
  budgetRange: string;
  timeline: string;
  projectDetails: string;
  email?: string;
  phoneOrWhatsapp?: string;
  website?: string;
  leadScore: number;
  status: LeadStatus;
}

export interface LeadFormData {
  fullName: string;
  businessName?: string;
  email: string;
  phoneOrWhatsapp?: string;
  businessType: string;
  serviceNeeded: string;
  budgetRange?: string;
  projectDetails: string;
  consentGiven: boolean;
  websiteUrl?: string; // honeypot anti-spam field
}

export type SubmissionStatus = 
  | 'idle' 
  | 'submitting' 
  | 'success' 
  | 'error' 
  | 'unconfigured';

export interface LeadSubmissionResult {
  success: boolean;
  status: SubmissionStatus;
  message: string;
  submissionId?: string;
  timestamp: string;
  requiresAlternativeAction?: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  phoneOrWhatsapp?: string;
  businessType?: string;
  serviceNeeded?: string;
  projectDetails?: string;
  consentGiven?: string;
}
