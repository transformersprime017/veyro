import { useState } from 'react';
import { Button } from '../Button';
import { RoutePath } from '../../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft
} from 'lucide-react';

export interface BriefBuilderToolProps {
  onNavigate: (path: RoutePath) => void;
  onBackToLab: () => void;
}

interface BriefAnswers {
  businessName: string;
  businessType: string;
  targetAudience: string;
  primaryObjective: string;
  selectedPages: string[];
  requiredFeatures: string[];
  visualVibe: string;
  timeline: string;
  budgetRange: string;
}

const BUSINESS_TYPES = [
  'Interior Architecture & Design',
  'Luxury Fashion & Lifestyle',
  'Café, Roastery & Hospitality',
  'High-End Residential Building',
  'Professional Consulting Practice',
  'Boutique Creative Agency',
  'Other Local Business',
];

const OBJECTIVES = [
  'Drive high-ticket consultation enquiries',
  'Attract local footfall and bookings',
  'Elevate brand prestige and command higher fees',
  'Replace an outdated, slow WordPress template',
  'Launch a new business with authoritative presence',
];

const PAGE_OPTIONS = [
  'Home / Cinematic Showcase',
  'Services / Offerings Deep-Dive',
  'Portfolio & Case Studies Gallery',
  'About Studio & Founder Ethos',
  'Process & Delivery Methodology',
  'Interactive Qualification / Contact Funnel',
  'Editorial Journal / Blog',
];

const FEATURE_OPTIONS = [
  'Direct WhatsApp enquiry integration',
  '3D perspective tilt cards & micro-interactions',
  'Lead pre-qualification form with scoring',
  'Local SEO schema (Delhi NCR targeting)',
  'Fast sub-second loading (Pristine Core Web Vitals)',
  'Interactive client calculators or visualizers',
];

const VISUAL_DIRECTIONS = [
  'Architectural, Dark & Monolithic (Obsidian + Lime Accent)',
  'Warm Stone & Earthy Textures (Bone + Espresso)',
  'High-Fashion Editorial (Monochrome High Contrast)',
  'Clean Minimalist Brutalism (Technical Grid Lines)',
];

const TIMELINES = [
  'Immediate (Within 2–3 weeks)',
  'Standard (Within 1 month)',
  'Flexible (Within 2–3 months)',
  'Planning phase (Future quarter)',
];

const BUDGETS = [
  'Under ₹25,000 (Starter foundation)',
  '₹25,000 – ₹50,000 (Standard studio build)',
  '₹50,000 – ₹1,00,000 (Bespoke architecture)',
  '₹1,00,000+ (Comprehensive commercial flagship)',
];

export const BriefBuilderTool = ({ onNavigate, onBackToLab }: BriefBuilderToolProps) => {
  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const [answers, setAnswers] = useState<BriefAnswers>({
    businessName: '',
    businessType: BUSINESS_TYPES[0],
    targetAudience: '',
    primaryObjective: OBJECTIVES[0],
    selectedPages: [PAGE_OPTIONS[0], PAGE_OPTIONS[1], PAGE_OPTIONS[2], PAGE_OPTIONS[5]],
    requiredFeatures: [FEATURE_OPTIONS[0], FEATURE_OPTIONS[4]],
    visualVibe: VISUAL_DIRECTIONS[0],
    timeline: TIMELINES[1],
    budgetRange: BUDGETS[1],
  });

  const [validationError, setValidationError] = useState<string>('');

  const handleNextStep = () => {
    if (step === 1) {
      if (!answers.businessName.trim()) {
        setValidationError('Please enter your business or project name.');
        return;
      }
      if (!answers.targetAudience.trim()) {
        setValidationError('Please specify your intended customer or audience.');
        return;
      }
    }
    setValidationError('');
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setValidationError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const togglePage = (page: string) => {
    setAnswers((prev) => {
      const exists = prev.selectedPages.includes(page);
      return {
        ...prev,
        selectedPages: exists
          ? prev.selectedPages.filter((p) => p !== page)
          : [...prev.selectedPages, page],
      };
    });
  };

  const toggleFeature = (feat: string) => {
    setAnswers((prev) => {
      const exists = prev.requiredFeatures.includes(feat);
      return {
        ...prev,
        requiredFeatures: exists
          ? prev.requiredFeatures.filter((f) => f !== feat)
          : [...prev.requiredFeatures, feat],
      };
    });
  };

  const generateMarkdownBrief = () => {
    return `# VEYRO WEBSITE SPECIFICATION BRIEF
Generated: ${new Date().toLocaleDateString()}
Notice: Algorithmic synthesis via Veyro Lab (deterministic, client-side)

## 1. Project Overview
- Business Name: ${answers.businessName}
- Industry / Sector: ${answers.businessType}
- Target Audience: ${answers.targetAudience}
- Core Objective: ${answers.primaryObjective}

## 2. Information Architecture
- Requested Pages (${answers.selectedPages.length}):
${answers.selectedPages.map((p) => `  * ${p}`).join('\n')}

## 3. Technical & Conversion Capabilities
- Required Features (${answers.requiredFeatures.length}):
${answers.requiredFeatures.map((f) => `  * ${f}`).join('\n')}

## 4. Aesthetics & Execution Parameters
- Art Direction: ${answers.visualVibe}
- Delivery Timeline: ${answers.timeline}
- Target Budget Range: ${answers.budgetRange}

## 5. Architectural Recommendations
- Strategy: Eliminate template bloat; map immediate contact pathways.
- Performance: Enforce sub-second React 19 + TypeScript rendering.
- Conversion: Route qualified leads directly through structured forms.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownBrief());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({
      businessName: '',
      businessType: BUSINESS_TYPES[0],
      targetAudience: '',
      primaryObjective: OBJECTIVES[0],
      selectedPages: [PAGE_OPTIONS[0], PAGE_OPTIONS[1], PAGE_OPTIONS[2], PAGE_OPTIONS[5]],
      requiredFeatures: [FEATURE_OPTIONS[0], FEATURE_OPTIONS[4]],
      visualVibe: VISUAL_DIRECTIONS[0],
      timeline: TIMELINES[1],
      budgetRange: BUDGETS[1],
    });
    setValidationError('');
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
          Tool 01 / AI Website Brief Generator
        </span>
      </div>

      {/* Transparency Note */}
      <div className="p-4 rounded-lg bg-[#111113] border border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C7FF3D]" />
          <span>Deterministic Client-Side Brief Synthesizer · No data sent externally</span>
        </div>
        <span className="text-[#C7FF3D]">Step {step} of 4</span>
      </div>

      {/* Step Form Container */}
      <div className="border border-white/10 bg-[#111113] p-6 sm:p-10 rounded-2xl space-y-8">
        
        {/* STEP 1: Business Identity & Objectives */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">Phase 1 / Business Foundation</span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
                Tell us about your brand and core commercial goal.
              </h3>
            </div>

            {validationError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded">
                {validationError}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400">Business or Studio Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Atelier V Studio"
                  value={answers.businessName}
                  onChange={(e) => setAnswers({ ...answers, businessName: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-4 py-3 text-sm text-[#F3F0E8] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400">Industry / Sector</label>
                <select
                  value={answers.businessType}
                  onChange={(e) => setAnswers({ ...answers, businessType: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-4 py-3 text-sm text-[#F3F0E8] outline-none transition-colors"
                >
                  {BUSINESS_TYPES.map((b) => (
                    <option key={b} value={b} className="bg-[#111113] text-[#F3F0E8]">{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400">Who is your ideal customer or client? *</label>
                <input
                  type="text"
                  placeholder="e.g. High-net-worth homeowners seeking luxury residential interior renovations"
                  value={answers.targetAudience}
                  onChange={(e) => setAnswers({ ...answers, targetAudience: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-4 py-3 text-sm text-[#F3F0E8] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400">Primary Objective of the New Site</label>
                <select
                  value={answers.primaryObjective}
                  onChange={(e) => setAnswers({ ...answers, primaryObjective: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-4 py-3 text-sm text-[#F3F0E8] outline-none transition-colors"
                >
                  {OBJECTIVES.map((o) => (
                    <option key={o} value={o} className="bg-[#111113] text-[#F3F0E8]">{o}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Scope & Required Pages */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">Phase 2 / Information Architecture</span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
                Select required pages and interactive sections.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAGE_OPTIONS.map((page) => {
                const isSelected = answers.selectedPages.includes(page);
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => togglePage(page)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#C7FF3D]/10 border-[#C7FF3D] text-[#F3F0E8]'
                        : 'bg-[#0B0B0D] border-white/10 text-zinc-400 hover:border-white/25'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-sans">{page}</span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C7FF3D]' : 'text-zinc-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Technical Features & Direction */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">Phase 3 / Technical & Art Direction</span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
                Choose desired capabilities, aesthetic direction, and timeframe.
              </h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400">Technical Features</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FEATURE_OPTIONS.map((feat) => {
                    const isSelected = answers.requiredFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#C7FF3D]/10 border-[#C7FF3D] text-[#F3F0E8]'
                            : 'bg-[#0B0B0D] border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xs">{feat}</span>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C7FF3D]' : 'text-zinc-600'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Visual Vibe & Art Direction</label>
                  <select
                    value={answers.visualVibe}
                    onChange={(e) => setAnswers({ ...answers, visualVibe: e.target.value })}
                    className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-3 py-2.5 text-xs text-[#F3F0E8] outline-none"
                  >
                    {VISUAL_DIRECTIONS.map((v) => (
                      <option key={v} value={v} className="bg-[#111113]">{v}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Target Timeframe</label>
                  <select
                    value={answers.timeline}
                    onChange={(e) => setAnswers({ ...answers, timeline: e.target.value })}
                    className="w-full bg-[#0B0B0D] border border-white/15 focus:border-[#C7FF3D] rounded-lg px-3 py-2.5 text-xs text-[#F3F0E8] outline-none"
                  >
                    {TIMELINES.map((t) => (
                      <option key={t} value={t} className="bg-[#111113]">{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Generated Brief Output */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#C7FF3D] uppercase">Phase 4 / Synthesized Specification</span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
                  Your VEYRO Project Brief is Ready
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCopy}
                  icon={copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copied ? 'Copied to Clipboard!' : 'Copy Markdown Brief'}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
                  Restart
                </Button>
              </div>
            </div>

            {/* Rendered Brief Codebox */}
            <div className="bg-[#0B0B0D] border border-white/15 rounded-xl p-6 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
              {generateMarkdownBrief()}
            </div>

            {/* Next Steps CTA */}
            <div className="p-6 rounded-xl border border-[#C7FF3D]/30 bg-[#C7FF3D]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-mono uppercase text-[#C7FF3D] font-bold">
                  Next Step: Initiate Commission
                </div>
                <p className="text-xs text-zinc-300">
                  Ready to turn this brief into a production website? Paste this into our commission enquiry form.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Enquiry Form
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          {step > 1 && step < 4 ? (
            <Button variant="secondary" size="sm" onClick={handlePrevStep} icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              Previous Step
            </Button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <Button variant="primary" size="sm" onClick={handleNextStep} icon={<ArrowRight className="w-4 h-4" />}>
              {step === 3 ? 'Synthesize Brief →' : 'Continue →'}
            </Button>
          )}
        </div>

      </div>

    </div>
  );
};
