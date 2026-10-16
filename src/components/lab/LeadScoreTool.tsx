import { useState } from 'react';
import { Button } from '../Button';
import { RoutePath } from '../../types';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export interface LeadScoreToolProps {
  onNavigate: (path: RoutePath) => void;
  onBackToLab: () => void;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  category: string;
  weight: number;
  options: {
    label: string;
    score: number; // 0 to 1 scale multiplied by weight
    guidance: string;
  }[];
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'current_site',
    question: 'What is the current state of your website?',
    category: 'Current Foundation',
    weight: 15,
    options: [
      { label: 'We have an outdated or slow template site that loses leads', score: 0.5, guidance: 'A redesign audit is needed to preserve existing signals while rebuilding conversion funnels.' },
      { label: 'We do not have a website yet (relying on Instagram / word-of-mouth)', score: 0.3, guidance: 'Building an owned digital presence will establish institutional credibility immediately.' },
      { label: 'We have a modern custom site, but want to upgrade interactions or local SEO', score: 0.8, guidance: 'You are well-positioned for evolutionary refinement rather than a ground-up reboot.' },
      { label: 'We have no digital presence at all', score: 0.1, guidance: 'Priority 1 is defining your identity tokens and single high-converting landing page.' },
    ],
  },
  {
    id: 'offer_clarity',
    question: 'How clear is your primary service or product offering?',
    category: 'Commercial Clarity',
    weight: 20,
    options: [
      { label: 'Hyper-focused (e.g. Luxury residential interior design for private villas)', score: 1.0, guidance: 'Excellent. Niche clarity dramatically increases website conversion efficiency.' },
      { label: 'Moderately defined (we offer general design/architecture/services to many types)', score: 0.6, guidance: 'Narrowing down your primary flagship offering will double enquiry conversion.' },
      { label: 'Broad or still evolving (we take almost any client that approaches us)', score: 0.3, guidance: 'We recommend completing our Strategy phase before coding to avoid messaging dilution.' },
    ],
  },
  {
    id: 'visual_assets',
    question: 'Do you have high-resolution photography or project imagery ready?',
    category: 'Visual Materiality',
    weight: 20,
    options: [
      { label: 'Yes, professional architectural/product photography ready to deploy', score: 1.0, guidance: 'Outstanding. High-end visual assets allow our custom layouts to shine at maximum fidelity.' },
      { label: 'We have raw smartphone or uncurated photos that need art direction', score: 0.5, guidance: 'We can curate and structure these into minimalist editorial formats.' },
      { label: 'No visual assets ready yet (need concept work or asset production)', score: 0.2, guidance: 'Our design phase can structure 3D concept demonstrators or typographic-led layouts.' },
    ],
  },
  {
    id: 'contact_pathways',
    question: 'How do prospective clients currently reach you?',
    category: 'Enquiry Friction',
    weight: 20,
    options: [
      { label: 'Direct WhatsApp and structured email with 24hr follow-up protocol', score: 1.0, guidance: 'Top-tier setup. Frictionless contact channels minimize drop-offs.' },
      { label: 'Generic contact form or social media direct messages', score: 0.5, guidance: 'Social DMs cause massive lead leakage. Direct WhatsApp + qualification forms are essential.' },
      { label: 'Phone calls only, often missed during project site visits', score: 0.3, guidance: 'Adding asynchronous qualification forms will capture leads even when you are unavailable.' },
    ],
  },
  {
    id: 'local_discovery',
    question: 'Are you targeting a specific regional area (e.g. Delhi NCR)?',
    category: 'Local Search Relevance',
    weight: 15,
    options: [
      { label: 'Yes, clearly defined regional market (e.g. South Delhi, Gurugram, Noida)', score: 1.0, guidance: 'Perfect candidate for our Local Growth schema architecture.' },
      { label: 'National / pan-India audience without local focus', score: 0.7, guidance: 'Broad national positioning requires stronger organic topical authority.' },
      { label: 'Uncertain or purely global concept', score: 0.4, guidance: 'Geo-targeted schema will yield faster commercial traction than unconstrained global targeting.' },
    ],
  },
  {
    id: 'budget_timeline',
    question: 'Have you allocated a defined budget and target launch window?',
    category: 'Execution Commitment',
    weight: 10,
    options: [
      { label: 'Yes, budget allocated and decision-makers ready for a 2–4 week sprint', score: 1.0, guidance: 'Ideal for our agile milestone delivery framework.' },
      { label: 'Rough idea of budget, targeting launch within 2–3 months', score: 0.7, guidance: 'Standard discovery runway. Good time to finalize specifications.' },
      { label: 'Exploring options without confirmed budget allocation', score: 0.3, guidance: 'Review our six service deliverables to align investment with expected return.' },
    ],
  },
];

export const LeadScoreTool = ({ onNavigate, onBackToLab }: LeadScoreToolProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const isComplete = ASSESSMENT_QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  // Calculate Deterministic Score (0–100)
  const calculateScore = () => {
    let totalScore = 0;
    ASSESSMENT_QUESTIONS.forEach((q) => {
      const selectedIndex = selectedAnswers[q.id];
      if (selectedIndex !== undefined) {
        const option = q.options[selectedIndex];
        totalScore += option.score * q.weight;
      }
    });
    return Math.round(totalScore);
  };

  const score = calculateScore();

  const getScoreRating = (s: number) => {
    if (s >= 80) {
      return {
        tier: 'High Commercial Readiness',
        color: 'text-[#C7FF3D]',
        summary: 'Your business foundation is primed for a high-converting custom digital presence.',
      };
    }
    if (s >= 55) {
      return {
        tier: 'Moderate Readiness — Strategy Recommended',
        color: 'text-amber-400',
        summary: 'You have solid fundamentals, but tightening your offer and contact funnels will dramatically improve conversion.',
      };
    }
    return {
      tier: 'Early Stage — Foundation Required',
      color: 'text-red-400',
      summary: 'Before building high-end layouts, focus on clarifying your core service and gathering high-resolution photography.',
    };
  };

  const rating = getScoreRating(score);

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Bar */}
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
          Tool 02 / Digital Lead Readiness Assessment
        </span>
      </div>

      {/* Transparency & Disclaimer Notice */}
      <div className="p-4 rounded-lg bg-[#111113] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C7FF3D] shrink-0" />
          <span>Deterministic Scoring Formula · Indicative self-assessment, not a sales guarantee</span>
        </div>
        <span className="text-[#C7FF3D] shrink-0">
          {Object.keys(selectedAnswers).length} of {ASSESSMENT_QUESTIONS.length} Answered
        </span>
      </div>

      {/* Main Questionnaire / Result View */}
      {!showResults ? (
        <div className="border border-white/10 bg-[#111113] p-6 sm:p-10 rounded-2xl space-y-8">
          <div>
            <span className="font-mono text-xs text-[#C7FF3D] uppercase">Readiness Diagnostic</span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
              Evaluate your digital conversion readiness.
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Select the option that most accurately represents your business today.
            </p>
          </div>

          <div className="space-y-8 divide-y divide-white/5">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              return (
                <div key={q.id} className={idx > 0 ? 'pt-6' : ''}>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                    <span>QUESTION {idx + 1} OF {ASSESSMENT_QUESTIONS.length} · {q.category}</span>
                    <span>Max Weight: {q.weight} pts</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-display text-[#F3F0E8] mb-4">
                    {q.question}
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedIdx === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-4 ${
                            isSelected
                              ? 'bg-[#C7FF3D]/10 border-[#C7FF3D] text-[#F3F0E8]'
                              : 'bg-[#0B0B0D] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-sans">{opt.label}</span>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#C7FF3D]' : 'text-zinc-700'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              Reset Answers
            </Button>

            <Button
              variant="primary"
              size="md"
              disabled={!isComplete}
              onClick={() => setShowResults(true)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {isComplete ? 'Compute Lead Readiness Score' : 'Answer All Questions to View Score'}
            </Button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="border border-white/10 bg-[#111113] p-6 sm:p-10 rounded-2xl space-y-10 animate-fadeIn">
          
          {/* Header Score Display */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">Diagnostic Output</span>
              <h3 className="text-3xl sm:text-4xl font-display font-medium text-[#F3F0E8]">
                Your Readiness Assessment
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans">
                {rating.summary}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0D] border border-white/10 text-center min-w-[160px] space-y-1 shrink-0">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Calculated Score</div>
              <div className="text-5xl font-display font-bold text-[#C7FF3D] leading-none">
                {score}
                <span className="text-lg text-zinc-500 font-normal">/100</span>
              </div>
              <div className={`text-xs font-mono font-medium mt-1 ${rating.color}`}>
                {rating.tier}
              </div>
            </div>
          </div>

          {/* Formula Transparency Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-display text-[#F3F0E8]">Itemized Scoring & Actionable Guidance</h4>
              <span className="text-xs font-mono text-zinc-500">Deterministic Model (Max: 100 pts)</span>
            </div>

            <div className="space-y-3">
              {ASSESSMENT_QUESTIONS.map((q) => {
                const selectedIdx = selectedAnswers[q.id];
                const option = q.options[selectedIdx];
                const earnedPts = Math.round(option.score * q.weight);

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-[#0B0B0D] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-400">{q.category}</span>
                      <span className="font-mono text-xs text-[#C7FF3D]">{earnedPts} / {q.weight} pts</span>
                    </div>
                    <div className="text-sm font-sans text-zinc-200">{q.question}</div>
                    <div className="text-xs text-zinc-400 italic">"{option.label}"</div>
                    <div className="p-2.5 rounded bg-white/5 border-l-2 border-[#C7FF3D] text-xs text-zinc-300 font-sans mt-2">
                      <strong className="text-[#C7FF3D] font-mono mr-1">Recommended Action:</strong>
                      {option.guidance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              Retake Assessment
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Discuss Your Score in a Consultation
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
