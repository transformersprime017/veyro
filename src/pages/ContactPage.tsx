import { FC, useState, useEffect } from 'react';
import { RoutePath, LeadFormData, SubmissionStatus, LeadSubmissionResult } from '../types';
import { studioConfig, getWhatsAppLink } from '../config/studio';
import { 
  submitLeadEnquiry, 
  validateLeadForm, 
  generateMailtoUrl, 
  formatLeadBrief, 
  generateWhatsAppUrl,
  isSubmissionEndpointConfigured 
} from '../services/leadSubmission';
import { Button } from '../components/Button';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Layers,
  Award
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: RoutePath) => void;
}

const BUSINESS_TYPE_OPTIONS = [
  'Interior Architecture & Design Atelier',
  'Architecture Practice / Spatial Studio',
  'Luxury Craft & Bespoke Fabrication',
  'Boutique Hospitality & Private Estate',
  'Modern Service / High-Growth Brand',
  'Other / Custom Enterprise Venture'
];

const SERVICE_OPTIONS = [
  'Strategic Web Architecture',
  'Bespoke Atelier Platform',
  'Performance Optimization',
  'Brand Identity & UI System',
  'Full-Stack Custom Application',
  'Interactive Lab & 3D Spatial Experience'
];

const BUDGET_TIERS = [
  'Under $5,000 (Advisory / Strategic Sprint)',
  '$5,000 – $15,000 (Focused Web Architecture)',
  '$15,000 – $30,000 (Complete Atelier Platform)',
  '$30,000+ (Enterprise / Global Presence)',
  'Undetermined / Seeking Consultation'
];

export const ContactPage: FC<ContactPageProps> = ({ onNavigate }) => {
  // Form input state matching LeadFormData
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phoneOrWhatsapp: '',
    businessName: '',
    businessType: BUSINESS_TYPE_OPTIONS[0],
    serviceNeeded: SERVICE_OPTIONS[0],
    budgetRange: BUDGET_TIERS[1],
    projectDetails: '',
    consentGiven: true,
    websiteUrl: '' // honeypot
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResult | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Commission an Enquiry // VEYRO Web & Digital Studio';
  }, []);

  const handleInputChange = (field: keyof LeadFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error on change
    if (validationErrors[field as string]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setSubmissionStatus('submitting');
    setSubmissionResult(null);

    const result = await submitLeadEnquiry(formData);
    setSubmissionResult(result);
    setSubmissionStatus(result.status);
  };

  const handleCopyBrief = async () => {
    const briefText = formatLeadBrief(formData);
    try {
      await navigator.clipboard.writeText(briefText);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyDirectEmail = async () => {
    if (!studioConfig.contact.email) return;
    try {
      await navigator.clipboard.writeText(studioConfig.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneOrWhatsapp: '',
      businessName: '',
      businessType: BUSINESS_TYPE_OPTIONS[0],
      serviceNeeded: SERVICE_OPTIONS[0],
      budgetRange: BUDGET_TIERS[1],
      projectDetails: '',
      consentGiven: true,
      websiteUrl: ''
    });
    setValidationErrors({});
    setSubmissionStatus('idle');
    setSubmissionResult(null);
  };

  const mailtoFallback = generateMailtoUrl(formData);
  const whatsappUrl = generateWhatsAppUrl(formData);
  const isEndpointLive = isSubmissionEndpointConfigured();
  const directWhatsappLink = getWhatsAppLink('Hello VEYRO Studio, I would like to enquire about a web design and engineering project.');

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 relative overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Commission an Enquiry | VEYRO",
            "description": "Discuss your digital architecture, bespoke atelier platform, or performance optimization commission with VEYRO Web & Digital Studio.",
            "url": "https://veyro.studio/contact",
            "publisher": {
              "@type": "Organization",
              "name": studioConfig.brand.name,
              "email": studioConfig.contact.email,
              "url": "https://veyro.studio"
            }
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 mb-8">
          <button 
            onClick={() => onNavigate('/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            VEYRO
          </button>
          <span>/</span>
          <span className="text-[#C7FF3D]">COMMISSION & ENQUIRY</span>
        </div>

        {/* Hero Header */}
        <div className="mb-14 sm:mb-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              DISCUSS A COMMISSION // ESTIMATION & ARCHITECTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white leading-[1.1] mb-6">
            Engineered for Clarity. <br className="hidden sm:inline" />
            <span className="text-zinc-500 font-light">Built for Distinction.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed max-w-2xl">
            We partner with architectural studios, luxury interior ateliers, and high-growth brands to build digital environments that command premium authority.
          </p>
        </div>

        {/* Process Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 border-y border-zinc-900 py-6">
          <div className="flex items-start gap-4">
            <span className="font-mono text-[#C7FF3D] text-sm tracking-wider">01.</span>
            <div>
              <h4 className="text-sm font-medium text-white font-display mb-1">Architectural Review</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                We review your current positioning, audience requirements, and conversion friction points.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="font-mono text-[#C7FF3D] text-sm tracking-wider">02.</span>
            <div>
              <h4 className="text-sm font-medium text-white font-display mb-1">Scope & Proposal</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                You receive a detailed technical roadmap, sprint timetable, and transparent investment breakdown.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="font-mono text-[#C7FF3D] text-sm tracking-wider">03.</span>
            <div>
              <h4 className="text-sm font-medium text-white font-display mb-1">Production Sprint</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Direct communication with the principal studio engineer. Rapid iterations, weekly staging reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Commission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 backdrop-blur-md relative">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-900">
                <div>
                  <h2 className="text-xl font-display font-medium text-white tracking-tight">Project Specification Form</h2>
                  <p className="text-xs text-zinc-300 font-mono mt-1">ALL ENQUIRIES ARE HELD IN COMPLETE CONFIDENCE</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
                  <span>DIRECT TRANSMISSION</span>
                </div>
              </div>

              {/* Form States */}
              {submissionStatus === 'success' ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-medium text-white mb-2">Commission Enquiry Received</h3>
                    <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Your enquiry has been received. Our lead technical engineer will review your brief within 24 business hours.
                    </p>
                    {submissionResult?.submissionId && (
                      <p className="font-mono text-xs text-zinc-300 mt-3">
                        REFERENCE ID: <span className="text-[#C7FF3D]">{submissionResult.submissionId}</span>
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between text-zinc-300">
                      <span>Service:</span>
                      <span className="text-zinc-300 font-mono">{formData.serviceNeeded}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Business Type:</span>
                      <span className="text-zinc-300 font-mono">{formData.businessType}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Budget Tier:</span>
                      <span className="text-zinc-300 font-mono">{formData.budgetRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Button variant="secondary" size="sm" onClick={handleResetForm}>
                      <RefreshCw className="w-4 h-4 mr-2" /> Submit Another Enquiry
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onNavigate('/work')}>
                      Explore Portfolio Archive <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : submissionStatus === 'unconfigured' || submissionStatus === 'error' ? (
                <div className="py-6 space-y-6">
                  <div className="p-5 bg-amber-950/30 border border-amber-600/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-200">
                          {submissionStatus === 'unconfigured' 
                            ? 'Submission Endpoint Not Configured in This Environment' 
                            : 'Network Transmission Interrupted'}
                        </h4>
                        <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                          {submissionResult?.message || 'Your project brief is fully formatted and safe. Because external submission endpoints are environment-dependent, you can transmit your enquiry directly using the verified actions below:'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actionable Fallback Transmission Tools */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleCopyBrief}
                      className="p-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-left transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">Method A</span>
                        {copiedBrief ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-300 group-hover:text-white" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-white group-hover:text-[#C7FF3D] transition-colors">
                        {copiedBrief ? 'Copied to Clipboard!' : 'Copy Formatted Brief'}
                      </div>
                      <p className="text-xs text-zinc-300 mt-1">
                        Copies all fields as a structured summary ready to paste anywhere.
                      </p>
                    </button>

                    <a
                      href={mailtoFallback}
                      className="p-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-left transition-all group block"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">Method B</span>
                        <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-white" />
                      </div>
                      <div className="text-sm font-medium text-white group-hover:text-[#C7FF3D] transition-colors">
                        Open in Mail Client
                      </div>
                      <p className="text-xs text-zinc-300 mt-1">
                        Prefills direct email to {studioConfig.contact.email} with your specifications.
                      </p>
                    </a>
                  </div>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 hover:text-emerald-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="text-sm font-medium">Forward Brief via WhatsApp</div>
                          <div className="text-xs text-emerald-400/80">Opens WhatsApp chat with structured introduction</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-900 text-xs">
                    <button
                      onClick={() => setSubmissionStatus('idle')}
                      className="text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Return to Edit Form
                    </button>
                    <span className="font-mono text-zinc-300">NO LOCAL DATA LEAKED</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Anti-spam honeypot (hidden from human visitors) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="websiteUrl">Leave this field blank</label>
                    <input
                      type="text"
                      id="websiteUrl"
                      name="websiteUrl"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.websiteUrl || ''}
                      onChange={e => handleInputChange('websiteUrl', e.target.value)}
                    />
                  </div>

                  {/* Row 1: Name and Business */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                        Your Full Name <span className="text-[#C7FF3D]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className={`w-full px-4 py-3 bg-zinc-900/80 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors ${
                          validationErrors.fullName ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-800 focus:border-[#C7FF3D]/60'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                        Studio / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName || ''}
                        onChange={e => handleInputChange('businessName', e.target.value)}
                        placeholder="e.g. Vance Architecture Atelier"
                        className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#C7FF3D]/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Phone/WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                        Direct Email Address <span className="text-[#C7FF3D]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder="m.vance@atelier.com"
                        className={`w-full px-4 py-3 bg-zinc-900/80 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors ${
                          validationErrors.email ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-800 focus:border-[#C7FF3D]/60'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneOrWhatsapp || ''}
                        onChange={e => handleInputChange('phoneOrWhatsapp', e.target.value)}
                        placeholder="+91 (0) 99999-00000"
                        className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#C7FF3D]/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Practice Type and Primary Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                        Practice / Business Category <span className="text-[#C7FF3D]">*</span>
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={e => handleInputChange('businessType', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#C7FF3D]/60 transition-colors cursor-pointer"
                      >
                        {BUSINESS_TYPE_OPTIONS.map(opt => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                        Primary Service Needed <span className="text-[#C7FF3D]">*</span>
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={e => handleInputChange('serviceNeeded', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#C7FF3D]/60 transition-colors cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map(opt => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Budget Tier */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Investment Expectation / Budget Tier
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={e => handleInputChange('budgetRange', e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#C7FF3D]/60 transition-colors cursor-pointer"
                    >
                      {BUDGET_TIERS.map(opt => (
                        <option key={opt} value={opt} className="bg-zinc-950 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 5: Project Brief / Vision */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        Project Brief & Requirements <span className="text-[#C7FF3D]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-zinc-500">MIN 15 CHARACTERS</span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      value={formData.projectDetails}
                      onChange={e => handleInputChange('projectDetails', e.target.value)}
                      placeholder="Outline your project scope, core objectives, current website friction points, or specific aesthetic references you admire..."
                      className={`w-full px-4 py-3 bg-zinc-900/80 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors leading-relaxed ${
                        validationErrors.projectDetails ? 'border-red-500/60 focus:border-red-500' : 'border-zinc-800 focus:border-[#C7FF3D]/60'
                      }`}
                    />
                    {validationErrors.projectDetails && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {validationErrors.projectDetails}
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="consentGiven"
                      checked={formData.consentGiven}
                      onChange={e => handleInputChange('consentGiven', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-[#C7FF3D] focus:ring-[#C7FF3D] focus:ring-offset-black cursor-pointer"
                    />
                    <label htmlFor="consentGiven" className="text-xs text-zinc-400 leading-normal cursor-pointer">
                      I understand VEYRO will review my submitted project specifications strictly for the purpose of preparing a technical scope and quotation.
                    </label>
                  </div>
                  {validationErrors.consentGiven && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {validationErrors.consentGiven}
                    </p>
                  )}

                  {/* Submission Action Bar */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submissionStatus === 'submitting'}
                      className="w-full justify-center group cursor-pointer"
                    >
                      {submissionStatus === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" /> Transmitting Specification...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Transmit Commission Enquiry <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
                    </Button>

                    <div className="flex items-center justify-between mt-4 text-[11px] text-zinc-500 font-mono">
                      <span>AVERAGE RESPONSE: &lt; 24 HOURS</span>
                      <span>
                        ENDPOINT: {isEndpointLive ? (
                          <span className="text-emerald-400">CONFIGURED LIVE</span>
                        ) : (
                          <span className="text-zinc-500">CLIENT-SIDE TRANSPARENT</span>
                        )}
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Studio Verification, Direct Contact & Navigation (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Studio Communication Card */}
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C7FF3D]" />
                <span>DIRECT STUDIO CONTACT</span>
              </h3>

              <div className="space-y-6">
                {/* Verified Email */}
                {studioConfig.contact.email && (
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">Commission Dispatch</span>
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <a 
                        href={`mailto:${studioConfig.contact.email}`}
                        className="text-sm font-mono text-white hover:text-[#C7FF3D] transition-colors truncate"
                      >
                        {studioConfig.contact.email}
                      </a>
                      <button
                        onClick={handleCopyDirectEmail}
                        title="Copy email address"
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* WhatsApp Chat if configured */}
                {directWhatsappLink && (
                  <div>
                    <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">Direct Messaging</span>
                    <a
                      href={directWhatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                    >
                      <div className="flex items-center gap-2 text-sm text-white">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        <span>WhatsApp Channel</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                )}

                {/* Response Commitment */}
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-white">
                    <Clock className="w-4 h-4 text-[#C7FF3D]" />
                    <span>Response Commitment</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    All enquiries are personally triaged by {studioConfig.founder.name}. We do not use outsourced business development reps or automated marketing drip funnels.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Diagnostic / Discovery Shortcuts */}
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C7FF3D]" />
                <span>EXPLORE BEFORE COMMISSIONING</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                If you are still shaping your scope or calculating required investment, our interactive tools and archive provide immediate clarity:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('/lab')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-850 flex items-center justify-center text-[#C7FF3D]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-[#C7FF3D] transition-colors">
                        Interactive Studio Lab
                      </div>
                      <div className="text-[11px] text-zinc-500">AI Brief Builder, Lead Score & Palette Lab</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => onNavigate('/work')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-850 flex items-center justify-center text-[#C7FF3D]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-[#C7FF3D] transition-colors">
                        Selected Architectural Works
                      </div>
                      <div className="text-[11px] text-zinc-500">ARCLINE, NOIRÉ, KAVO & Concept Case Studies</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-850 flex items-center justify-center text-[#C7FF3D]">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-[#C7FF3D] transition-colors">
                        Six Service Pillars
                      </div>
                      <div className="text-[11px] text-zinc-500">Detailed deliverables, sprints & technology stack</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Privacy & Confidentiality Guarantee */}
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 text-[11px] text-zinc-400 leading-relaxed">
              <span className="text-zinc-300 font-medium">Privacy Commitment: </span>
              VEYRO will never sell, lease, or distribute your project specifications or contact details. Form submissions are encrypted in transit. Read our{' '}
              <button 
                onClick={() => onNavigate('/privacy')} 
                className="text-[#C7FF3D] hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>{' '}
              and{' '}
              <button 
                onClick={() => onNavigate('/terms')} 
                className="text-[#C7FF3D] hover:underline cursor-pointer"
              >
                Terms of Commission
              </button>.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
