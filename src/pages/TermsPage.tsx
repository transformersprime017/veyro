import { FC, useEffect } from 'react';
import { RoutePath } from '../types';
import { Button } from '../components/Button';
import { FileCheck, ArrowLeft, ShieldCheck } from 'lucide-react';
import { studioConfig } from '../config/studio';

export interface TermsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const TermsPage: FC<TermsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Terms of Service — VEYRO Web & Digital Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Top back button */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 text-[#C7FF3D] font-mono text-xs uppercase tracking-widest">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Legal & Commercial Framework</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-medium text-[#F3F0E8] tracking-tight">
          Terms of Service
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          The operational terms and intellectual property standards governing client commissions, project deliverables, and website usage with {studioConfig.brand.name}.
        </p>

        <div className="text-xs font-mono text-zinc-500">
          Last revised: October 2026 · VEYRO Web & Digital Studio
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-12 text-[#EDE9DD] leading-relaxed font-sans text-sm sm:text-base">
        
        {/* Section 1 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8]">
            1. Engagement & Scope
          </h2>
          <p className="text-zinc-300">
            All design, web development, and digital consulting services provided by VEYRO are governed by individual, written Statement of Work (SOW) agreements executed prior to project initiation. Proposals submitted via this website represent preliminary exploratory estimates and do not constitute a binding contract until mutually signed.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C7FF3D]" />
            <span>2. Concept Projects Disclosure</span>
          </h2>
          <p className="text-zinc-300">
            In compliance with our studio transparency standard, projects labelled as "Concept Projects" in our portfolio (such as ARCLINE STUDIO, NOIRÉ, and KAVO) are internal design demonstrators created to showcase architectural capabilities. They are not represented as paid third-party commissions.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8]">
            3. Intellectual Property Rights
          </h2>
          <p className="text-zinc-300">
            Upon final payment receipt for a custom client commission, all proprietary frontend code, design deliverables, and bespoke digital assets developed exclusively for the client are assigned to the client, subject to the studio retaining rights to display the completed work in portfolio archives.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8]">
            4. Limitation of Liability
          </h2>
          <p className="text-zinc-300">
            Website estimates and self-assessment tools provided in the Veyro Lab (such as the Lead Readiness Score and Local SEO Snapshot) are indicative heuristic evaluations and do not constitute financial, legal, or guaranteed business outcome advice.
          </p>
        </section>

      </main>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <Button variant="primary" size="md" onClick={() => onNavigate('/contact')}>
          Start a Project Commission ↗
        </Button>
        <Button variant="secondary" size="md" onClick={() => onNavigate('/privacy')}>
          View Privacy Policy
        </Button>
      </div>
    </div>
  );
};
