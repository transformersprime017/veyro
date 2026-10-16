import { useState } from 'react';
import { Button } from '../Button';
import { RoutePath } from '../../types';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Copy, 
  Search, 
  ShieldCheck, 
  CheckSquare, 
  Square
} from 'lucide-react';

export interface SeoSnapshotToolProps {
  onNavigate: (path: RoutePath) => void;
  onBackToLab: () => void;
}

interface SeoCheckItem {
  id: string;
  category: string;
  title: string;
  description: string;
  recommendation: string;
  importance: 'Critical' | 'High' | 'Medium';
}

const SEO_AUDIT_ITEMS: SeoCheckItem[] = [
  {
    id: 'title_tag',
    category: 'Meta Architecture',
    title: 'Unique, Keyword-Intent Page Titles',
    description: 'Every route must have a descriptive `<title>` under 60 characters containing your primary offering and target location.',
    recommendation: 'Format: [Business Name] — [Primary Service] in [Location] (e.g. VEYRO — Web & Digital Studio · Delhi NCR). Avoid generic "Home".',
    importance: 'Critical',
  },
  {
    id: 'meta_description',
    category: 'Meta Architecture',
    title: 'Compelling Meta Descriptions with Clear CTA',
    description: 'Search engines display snippet descriptions between 140–160 characters. A strong description improves organic click-through rate.',
    recommendation: 'Summarize your core value proposition and include an invitation (e.g. "Explore our architectural interior portfolio. Turn attention into enquiries.").',
    importance: 'High',
  },
  {
    id: 'heading_hierarchy',
    category: 'Content Structure',
    title: 'Single H1 and Logical Heading Hierarchy',
    description: 'Ensure exactly one `<h1>` per page reflecting the main topic, followed logically by `<h2>` and `<h3>` tags without skipping levels.',
    recommendation: 'Never use multiple H1s or style non-headings as H1s for purely visual sizing.',
    importance: 'High',
  },
  {
    id: 'mobile_viewport',
    category: 'Technical & UX',
    title: 'Mobile Usability & Responsive Breakpoints',
    description: 'Over 65% of local discovery happens on mobile smartphones. Tap targets must exceed 44x44px and horizontal scroll must be zero.',
    recommendation: 'Test on real mobile devices across iOS and Android. Ensure navigation drawers and contact buttons remain accessible with one thumb.',
    importance: 'Critical',
  },
  {
    id: 'local_schema',
    category: 'Local Search Relevance',
    title: 'Structured LocalBusiness & Schema.org JSON-LD',
    description: 'Search engine crawlers understand geographic relevance through Schema.org semantic data.',
    recommendation: 'Embed `ProfessionalService` or `LocalBusiness` JSON-LD specifying `areaServed` (e.g. Delhi NCR, Gurugram, South Delhi), coordinates, and opening hours.',
    importance: 'Critical',
  },
  {
    id: 'subsecond_speed',
    category: 'Core Web Vitals',
    title: 'Pristine LCP & Sub-Second Loading Speed',
    description: 'Largest Contentful Paint (LCP) should occur under 2.5 seconds (ideally under 1.2s). Bloated scripts and uncompressed hero images penalize ranking.',
    recommendation: 'Convert hero photography to modern WebP/AVIF formats, inline critical SVGs, and eliminate heavy template plugins.',
    importance: 'Critical',
  },
  {
    id: 'internal_linking',
    category: 'Content Structure',
    title: 'Crawlable Internal Navigation & Clean Anchor Text',
    description: 'Every valuable case study or service page should be reachable within 2 clicks from the homepage via HTML `<a>` tags.',
    recommendation: 'Avoid relying solely on client-side JS onclick events for navigation; provide crawlable semantic links.',
    importance: 'High',
  },
  {
    id: 'contact_trust',
    category: 'Trust & Verification',
    title: 'Prominent Physical Address & Verified WhatsApp Trigger',
    description: 'Local clients look for immediate geographic indicators to verify that a business is legitimate and active in their city.',
    recommendation: 'Include your city/region in the footer and provide a direct WhatsApp enquiry button with pre-filled scope.',
    importance: 'High',
  },
];

export const SeoSnapshotTool = ({ onNavigate, onBackToLab }: SeoSnapshotToolProps) => {
  const [urlInput, setUrlInput] = useState<string>('');
  const [urlError, setUrlError] = useState<string>('');
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);

  // User manual verification state for each item
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setUrlError('Please enter a website domain or URL.');
      return;
    }

    try {
      // Basic normalization
      let formatted = urlInput.trim();
      if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
        formatted = `https://${formatted}`;
      }
      const parsed = new URL(formatted);
      setUrlError('');
      setAnalyzedUrl(parsed.hostname);
    } catch {
      setUrlError('Please enter a valid website URL (e.g. yourstudio.com).');
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const auditScore = Math.round((checkedCount / SEO_AUDIT_ITEMS.length) * 100);

  const handleReset = () => {
    setUrlInput('');
    setAnalyzedUrl(null);
    setCheckedItems({});
    setUrlError('');
  };

  const handleCopyChecklist = () => {
    const summary = `# VEYRO LOCAL SEO SNAPSHOT REPORT
Target Domain: ${analyzedUrl || 'Manual Inspection'}
Generated: ${new Date().toLocaleDateString()}
Audit Score: ${auditScore}/100 (${checkedCount}/${SEO_AUDIT_ITEMS.length} verified)

## Verified Checks
${SEO_AUDIT_ITEMS.map((item) => {
  const isDone = Boolean(checkedItems[item.id]);
  return `[${isDone ? 'X' : ' '}] ${item.title} (${item.importance}) - ${item.category}\n    Guidance: ${item.recommendation}`;
}).join('\n\n')}

## Next Recommended Step
Schedule a comprehensive VEYRO Local Growth audit to implement missing schema markup and Core Web Vitals optimization.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={onBackToLab}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Back to Lab Workbench</span>
        </button>

        <span className="font-mono text-xs text-zinc-500">
          Tool 03 / Local SEO Snapshot Checklist
        </span>
      </div>

      {/* Transparency Note */}
      <div className="p-4 rounded-lg bg-[#111113] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C7FF3D] shrink-0" />
          <span>Manual Architectural Audit Protocol · No fake crawling or simulated bot metrics</span>
        </div>
        <span className="text-[#C7FF3D] shrink-0">
          Ready for Real Crawling Integration
        </span>
      </div>

      {/* Main Container */}
      <div className="border border-white/10 bg-[#111113] p-6 sm:p-10 rounded-2xl space-y-8">
        
        {/* URL Input Form */}
        <div>
          <span className="font-mono text-xs text-[#C7FF3D] uppercase">Target Evaluation</span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
            Preliminary Local SEO & Technical Checklist
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl font-sans">
            Enter your website domain to audit your local search foundation, or inspect the checklist manually.
          </p>

          <form onSubmit={handleStartAudit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter domain (e.g. atelierstudio.in)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-4 py-3 text-sm text-[#F3F0E8] outline-none transition-colors font-mono"
              />
              {urlError && <p className="text-red-400 text-xs font-mono mt-1">{urlError}</p>}
            </div>

            <Button variant="primary" size="md" type="submit" icon={<Search className="w-4 h-4" />}>
              Load Target Audit
            </Button>
          </form>
        </div>

        {/* Audit Dashboard Bar */}
        <div className="p-5 rounded-xl bg-[#0B0B0D] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Audit Target</div>
            <div className="text-lg font-display text-[#F3F0E8]">
              {analyzedUrl ? analyzedUrl : 'Manual Studio Self-Inspection'}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Readiness Score</div>
              <div className="text-2xl font-display font-bold text-[#C7FF3D]">
                {auditScore}%
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Verified Checks</div>
              <div className="text-sm font-mono text-zinc-300">
                {checkedCount} / {SEO_AUDIT_ITEMS.length}
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-display text-[#F3F0E8]">8 Critical Local SEO & Technical Checkpoints</h4>
            <span className="text-xs font-mono text-zinc-500">Click to mark as verified</span>
          </div>

          <div className="space-y-3">
            {SEO_AUDIT_ITEMS.map((item) => {
              const isChecked = Boolean(checkedItems[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-[#C7FF3D]/5 border-[#C7FF3D]/50'
                      : 'bg-[#0B0B0D] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        aria-label={`Toggle check for ${item.title}`}
                        className="mt-0.5 text-[#C7FF3D] shrink-0"
                      >
                        {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-zinc-600" />}
                      </button>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs uppercase ${
                              item.importance === 'Critical'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {item.importance}
                          </span>
                        </div>

                        <h5 className={`text-sm sm:text-base font-display font-medium ${isChecked ? 'text-[#C7FF3D]' : 'text-[#F3F0E8]'}`}>
                          {item.title}
                        </h5>

                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {item.description}
                        </p>

                        <div className="pt-2 text-xs text-zinc-300 font-sans border-t border-white/5 mt-2">
                          <strong className="text-[#C7FF3D] font-mono mr-1">Implementation Advice:</strong>
                          {item.recommendation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyChecklist}
              icon={copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Checklist Copied!' : 'Copy Audit Summary'}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              Reset Checklist
            </Button>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('/services')}
          >
            Explore VEYRO Local Growth Service ↗
          </Button>
        </div>

      </div>

    </div>
  );
};
