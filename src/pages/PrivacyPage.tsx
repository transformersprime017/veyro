import { FC, useEffect } from 'react';
import { RoutePath } from '../types';
import { Button } from '../components/Button';
import { Shield, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { studioConfig } from '../config/studio';
import { usePageSEO } from '../utils/seo';

export interface PrivacyPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const PrivacyPage: FC<PrivacyPageProps> = ({ onNavigate }) => {
  usePageSEO({
    title: 'Privacy Policy — VEYRO Web & Digital Studio',
    description: 'Data governance and privacy notice for VEYRO Web & Digital Studio. Clear, transparent details on data collection and enquiry processing.',
    path: '/privacy',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Top back button */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Project Enquiry</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 text-[#C7FF3D] font-mono text-xs uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>Data Governance & Privacy</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-medium text-[#F3F0E8] tracking-tight">
          Privacy Notice
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          This privacy policy describes the actual collection, storage, and processing practices implemented on the VEYRO Web & Digital Studio website. We operate with radical transparency.
        </p>

        <div className="text-xs font-mono text-zinc-500">
          Last revised: October 2026 · Effective for all visitors
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-12 text-[#EDE9DD] leading-relaxed font-sans text-sm sm:text-base">
        
        {/* Section 1 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#C7FF3D]" />
            <span>1. Information We Collect</span>
          </h2>
          <p className="text-zinc-300">
            We only collect personal information that you intentionally and voluntarily provide to us when submitting a project enquiry via our <strong className="text-[#F3F0E8]">/contact</strong> form or directly contacting our studio channels:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2.5 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
              <span><strong>Contact Information:</strong> Your full name, email address, and optional phone or WhatsApp number.</span>
            </li>
            <li className="flex items-start gap-2.5 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
              <span><strong>Project Parameters:</strong> Your business/practice name, business category, service scope requirements, estimated budget tier, and written project notes.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C7FF3D]" />
            <span>2. Purpose of Processing</span>
          </h2>
          <p className="text-zinc-300">
            All submitted lead data is utilized strictly for the following legitimate commercial purposes:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] mt-2 shrink-0" />
              <span>Evaluating project requirements and determining architectural fit.</span>
            </li>
            <li className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] mt-2 shrink-0" />
              <span>Preparing and transmitting a preliminary proposal, roadmap, and investment estimate.</span>
            </li>
            <li className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] mt-2 shrink-0" />
              <span>Communicating directly with you regarding your consultation request.</span>
            </li>
          </ul>
          <p className="text-zinc-400 text-xs font-mono pt-2">
            We will never sell, lease, or trade your contact details to data brokers, marketing agencies, or unsolicited third parties.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8]">
            3. Tracking & Cookies Policy
          </h2>
          <p className="text-zinc-300">
            This website does not load unconfigured third-party advertising trackers, cross-site behavioral tracking scripts, or marketing pixels. Client-side preferences (such as tool state in the Veyro Lab) are processed purely in ephemeral browser memory.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8]">
            4. Data Retention & Deletion Requests
          </h2>
          <p className="text-zinc-300">
            If you wish to request deletion of any project notes or correspondence you have previously sent to our studio, simply write to us at{' '}
            <strong className="text-[#C7FF3D]">{studioConfig.contact.email || 'the studio email'}</strong>. We will expunge your contact records from our inquiry archives within 7 business days.
          </p>
        </section>

      </main>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <Button variant="primary" size="md" onClick={() => onNavigate('/contact')}>
          Start a Project Commission ↗
        </Button>
        <Button variant="secondary" size="md" onClick={() => onNavigate('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};
