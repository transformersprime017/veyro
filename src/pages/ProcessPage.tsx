import { FC, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { RoutePath } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';

export interface ProcessPageProps {
  onNavigate: (path: RoutePath) => void;
}

export interface ProcessStage {
  number: string;
  name: string;
  summary: string;
  duration: string;
  clientRole: string;
  deliverables: string[];
  qualityGates: string[];
  description: string;
}

export const ProcessPage: FC<ProcessPageProps> = ({ onNavigate }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const stages: ProcessStage[] = [
    {
      number: '01',
      name: 'Discover',
      summary: 'Auditing the business, customer psychology, and the market opening.',
      duration: '3–5 Days',
      clientRole: 'Initial 60-min discovery session + asset sharing',
      description:
        'Before discussing aesthetics or wireframes, we dissect your commercial model. Who are your highest-value clients? What causes them to hesitate before reaching out? What are your competitors doing poorly that we can exploit?',
      deliverables: [
        'Commercial discovery questionnaire synthesis',
        'Competitor digital footprint and gap analysis',
        'User enquiry friction audit',
        'Initial project roadmap and milestone lock',
      ],
      qualityGates: [
        'Client sign-off on target customer personas',
        'Confirmed technical integrations (WhatsApp, email, domains)',
      ],
    },
    {
      number: '02',
      name: 'Strategy',
      summary: 'Mapping information architecture, content structure, and conversion funnels.',
      duration: '3–5 Days',
      clientRole: 'Review wireframe narrative and messaging hierarchy',
      description:
        'We design the structural blueprint of the website. We determine how each section naturally leads into the next, ensuring that attention is systematically captured and steered toward high-intent contact triggers.',
      deliverables: [
        'Full sitemap & route architecture',
        'High-conversion page wireframes',
        'Core positioning and conversion messaging outline',
        'Lead qualification and scoring flow design',
      ],
      qualityGates: [
        'Information architecture approval',
        'Agreed enquiry qualification form fields',
      ],
    },
    {
      number: '03',
      name: 'Design',
      summary: 'Crafting bespoke architectural layouts and custom typographic systems.',
      duration: '5–8 Days',
      clientRole: 'Collaborative Figma walkthrough & visual feedback',
      description:
        'We translate strategic wireframes into breathtaking visual assets. Space Grotesk display typography, refined Obsidian color foundations, restrained Electric Lime accents, and tactile micro-interactions that elevate your brand prestige.',
    deliverables: [
        'Complete desktop and mobile UI design layouts',
        'Custom typographic and chromatic token system',
        'Motion, hover, and interaction specifications',
        'High-resolution imagery and vector asset integration',
      ],
      qualityGates: [
        'Design sign-off on primary pages across desktop and mobile',
        'Accessibility contrast verification (WCAG AA)',
      ],
    },
    {
      number: '04',
      name: 'Build',
      summary: 'Developing production-grade React, TypeScript, and Tailwind code.',
      duration: '7–12 Days',
      clientRole: 'Staging environment previews and interactive walkthrough',
      description:
        'We write clean, modular, semantic code from the ground up. Zero slow theme templates, bloated plugins, or unwanted trackers. Every component is engineered for sub-second load times and fluid responsive adaptation.',
      deliverables: [
        'Modular React & TypeScript component codebase',
        'Responsive layouts across all screen resolutions',
        'Custom cursor physics, magnetic button interactions, and 3D card tilts',
        'Structured local lead storage and WhatsApp URL encoders',
      ],
      qualityGates: [
        'Zero TypeScript compilation errors',
        'Lighthouse performance score > 90',
      ],
    },
    {
      number: '05',
      name: 'Test',
      summary: 'Rigorous cross-device, accessibility, performance, and lead flow QA.',
      duration: '3–4 Days',
      clientRole: 'End-to-end form and WhatsApp enquiry validation',
      description:
        'We subject the site to systematic testing across browsers, iOS, Android, tablets, and varying connection speeds. We test form validation, lead scoring, fallback behavior, keyboard tab ordering, and screen-reader accessibility.',
      deliverables: [
        '54-point QA matrix verification',
        'Cross-browser and mobile device compatibility testing',
        'Full keyboard navigation and reduced-motion audit',
        'End-to-end lead submission and webhook testing',
      ],
      qualityGates: [
        'All links, forms, and buttons verified working',
        'Reduced-motion preference gracefully supported',
      ],
    },
    {
      number: '06',
      name: 'Launch',
      summary: 'Domain DNS configuration, SSL certification, and search console indexing.',
      duration: '1–2 Days',
      clientRole: 'DNS authorization & production deployment confirmation',
      description:
        'We transition your digital asset to the live production domain. We set up SSL certificates, generate the XML sitemap, deploy clean robots.txt directives, and configure Google Search Console verification.',
      deliverables: [
        'Production server deployment & custom domain binding',
        'SSL encryption certification',
        'XML sitemap submission and robots.txt indexing setup',
        'OpenGraph and social preview validation',
      ],
      qualityGates: [
        'Zero 404 errors across internal navigation',
        'Live domain verified in Google Search Console',
      ],
    },
    {
      number: '07',
      name: 'Evolve',
      summary: 'Post-launch behavior monitoring, conversion calibration, and continuous scaling.',
      duration: 'Ongoing',
      clientRole: 'Monthly performance review and new case study submissions',
      description:
        'A website is a living commercial instrument. After launch, we observe visitor heatmaps, monitor enquiry drop-offs, release updated case studies, and fine-tune conversion funnels to maximize client return on investment.',
      deliverables: [
        '30-day post-launch warranty and bug-fix guarantee',
        'Monthly conversion analytics and enquiry audit',
        'Portfolio expansion slots for new client projects',
        'Quarterly frontend security and dependency maintenance',
      ],
      qualityGates: [
        'Regular Core Web Vitals maintenance',
        'Continuous lead pipeline uptime',
      ],
    },
  ];

  const activeStage = stages[activeStageIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Header */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
          <span>Milestone-Driven Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.95]">
          SEVEN DISCIPLINED STAGES.<br />
          <span className="text-[#C7FF3D]">ZERO GUESSWORK.</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
          We take the mystery out of digital agency delivery. Every phase has defined timelines, specific tangible deliverables, and clear client milestones so you always know exactly what is happening.
        </p>

        {/* Editorial Craft Visual */}
        <div className="pt-2">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111113] relative shadow-2xl group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0B0D]">
              <img
                src="/src/assets/images/veyro_process_craft_1792116635793.jpg"
                alt="Tactile Architectural Model Craft and Typography Specimen Process"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-[#0B0B0D]/85 backdrop-blur-md border border-white/10 px-4 py-3 rounded-lg text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#C7FF3D]">PHYSICAL & DIGITAL CRAFT</span>
                  <span className="text-zinc-200">Typography Specimens, Smoked Acrylic Geometry & Modular Layouts</span>
                </div>
                <div className="text-zinc-400 text-[11px] hidden sm:block">
                  Stage 01 to Stage 07 Rigor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Stage Inspector */}
      <section className="space-y-8">
        <div className="border border-white/10 rounded-2xl bg-[#111113] overflow-hidden">
          
          {/* Stage Progress Bar & Horizontal Selector */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#0B0B0D] overflow-x-auto scrollbar-none">
            <div className="flex items-center min-w-[700px] justify-between relative">
              {stages.map((stg, i) => {
                const isSelected = activeStageIndex === i;
                const isPast = activeStageIndex > i;
                return (
                  <button
                    key={stg.number}
                    type="button"
                    onClick={() => setActiveStageIndex(i)}
                    className="group relative flex flex-col items-center gap-2 px-3 py-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3D] rounded-sm transition-all"
                    aria-selected={isSelected}
                  >
                    <div
                      className={`w-8 h-8 rounded-full font-mono text-xs flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#C7FF3D] text-[#0B0B0D] font-bold shadow-[0_0_16px_rgba(199,255,61,0.5)] scale-110'
                          : isPast
                          ? 'bg-white/20 text-[#F3F0E8]'
                          : 'bg-white/5 text-zinc-500 border border-white/10'
                      }`}
                    >
                      {stg.number}
                    </div>
                    <span
                      className={`text-xs font-display transition-colors whitespace-nowrap ${
                        isSelected ? 'text-[#C7FF3D] font-medium' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    >
                      {stg.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="p-8 sm:p-14 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              
              {/* Left Column: Stage Narrative & Meta */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 font-mono text-xs text-[#C7FF3D]">
                  <span>STAGE {activeStage.number} OF 07</span>
                  <span>·</span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-[#C7FF3D]" />
                    <span>Estimated Duration: {activeStage.duration}</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F3F0E8] leading-tight">
                  {activeStage.name}
                </h2>

                <p className="text-lg text-zinc-300 font-sans leading-relaxed">
                  {activeStage.summary}
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  {activeStage.description}
                </p>

                <div className="p-4 rounded-lg bg-[#0B0B0D] border border-white/5 flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Your Role as Client
                    </div>
                    <div className="text-xs text-zinc-300 font-sans">
                      {activeStage.clientRole}
                    </div>
                  </div>
                </div>

                {/* Stage Navigator Controls */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={activeStageIndex === 0}
                    onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                  >
                    ← Previous Stage
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={activeStageIndex === stages.length - 1}
                    onClick={() => setActiveStageIndex((prev) => Math.min(stages.length - 1, prev + 1))}
                  >
                    Next Stage →
                  </Button>
                </div>
              </div>

              {/* Right Column: Deliverables & Quality Gates */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Deliverables Card */}
                <div className="bg-[#0B0B0D] p-6 sm:p-7 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-wider">
                      Tangible Deliverables
                    </span>
                    <Sparkles className="w-4 h-4 text-[#C7FF3D]" />
                  </div>

                  <ul className="space-y-3">
                    {activeStage.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quality Gate Card */}
                <div className="bg-[#0B0B0D] p-6 sm:p-7 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-wider">
                      Quality Gate Criteria
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
                  </div>

                  <ul className="space-y-2.5">
                    {activeStage.qualityGates.map((gate, gIdx) => (
                      <li key={gIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <span className="font-mono text-[#C7FF3D] font-bold">✓</span>
                        <span className="leading-snug">{gate}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Complete Linear Roadmap Overview */}
      <section className="space-y-8">
        <SectionHeader
          number="02"
          category="Full Journey"
          title="The complete delivery journey from start to finish"
          description="A chronological timeline of how we transform your digital presence."
        />

        <div className="space-y-4">
          {stages.map((stg, idx) => (
            <div
              key={stg.number}
              onClick={() => {
                setActiveStageIndex(idx);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="border border-white/10 bg-[#111113] p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#C7FF3D]/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="font-mono text-sm text-[#C7FF3D] bg-[#0B0B0D] px-2.5 py-1 rounded border border-white/10 shrink-0">
                  {stg.number}
                </span>
                <div>
                  <h3 className="text-xl font-display font-medium text-[#F3F0E8] group-hover:text-[#C7FF3D] transition-colors">
                    {stg.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{stg.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 shrink-0">
                <span>{stg.duration}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#C7FF3D] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process CTA */}
      <div className="border border-white/10 rounded-2xl bg-gradient-to-br from-[#111113] to-[#0B0B0D] p-8 sm:p-14 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F3F0E8]">
          Ready to begin Stage 01: Discover?
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          Fill out our short qualification form. We will analyze your current presence and schedule a high-value discovery consultation.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} icon={<ArrowRight className="w-4 h-4" />}>
            Commission a project ↗
          </Button>
        </div>
      </div>

    </div>
  );
};
