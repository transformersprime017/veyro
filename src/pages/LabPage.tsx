import { FC, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { BriefBuilderTool } from '../components/lab/BriefBuilderTool';
import { LeadScoreTool } from '../components/lab/LeadScoreTool';
import { SeoSnapshotTool } from '../components/lab/SeoSnapshotTool';
import { PaletteLabTool } from '../components/lab/PaletteLabTool';
import { usePageSEO } from '../utils/seo';
import { RoutePath } from '../types';
import { 
  Cpu, 
  FileText, 
  Gauge, 
  Search, 
  Palette, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export interface LabPageProps {
  onNavigate: (path: RoutePath) => void;
}

type ActiveLabTool = 'none' | 'brief' | 'lead-score' | 'seo' | 'palette';

export const LabPage: FC<LabPageProps> = ({ onNavigate }) => {
  const [activeTool, setActiveTool] = useState<ActiveLabTool>('none');

  usePageSEO({
    title: 'VEYRO Lab — Private Digital Workbench',
    description: 'Internal interactive studio utilities, conversion diagnostics, and experimental design prototypes.',
    path: '/lab',
    robots: 'noindex, nofollow',
  });

  const tools = [
    {
      id: 'brief' as ActiveLabTool,
      num: '01',
      title: 'AI Website Brief Generator',
      category: 'Project Architecture',
      tagline: 'Synthesize your commercial vision, required pages, and features into a structured project brief.',
      icon: <FileText className="w-5 h-5 text-[#C7FF3D]" />,
      features: ['Multi-step scoping questionnaire', 'Exportable Markdown specification', 'Zero external data transmission'],
      actionLabel: 'Launch Brief Builder',
    },
    {
      id: 'lead-score' as ActiveLabTool,
      num: '02',
      title: 'Digital Lead Readiness Score',
      category: 'Conversion Diagnostic',
      tagline: 'Transparent 100-point self-assessment measuring offer clarity, visual assets, and enquiry friction.',
      icon: <Gauge className="w-5 h-5 text-[#C7FF3D]" />,
      features: ['Deterministic scoring formula', 'Itemized diagnostic guidance', 'Immediate improvement roadmap'],
      actionLabel: 'Calculate Readiness Score',
    },
    {
      id: 'seo' as ActiveLabTool,
      num: '03',
      title: 'Local SEO Snapshot',
      category: 'Local Search Relevance',
      tagline: '8-point preliminary audit checklist targeting Delhi NCR high-intent local search discovery.',
      icon: <Search className="w-5 h-5 text-[#C7FF3D]" />,
      features: ['Domain validation input', 'Schema.org JSON-LD guidance', 'Exportable checklist summary'],
      actionLabel: 'Inspect SEO Checklist',
    },
    {
      id: 'palette' as ActiveLabTool,
      num: '04',
      title: 'Architectural Palette Lab',
      category: 'Design Systems',
      tagline: 'Harmonic color system generator with live WCAG contrast checking and CSS/Tailwind exports.',
      icon: <Palette className="w-5 h-5 text-[#C7FF3D]" />,
      features: ['Travertine, Noiré, & Kavo presets', 'Live surface composition test', 'One-click CSS variables copy'],
      actionLabel: 'Open Palette Workbench',
    },
  ];

  // Render active interactive tool if selected
  if (activeTool === 'brief') {
    return <BriefBuilderTool onNavigate={onNavigate} onBackToLab={() => setActiveTool('none')} />;
  }
  if (activeTool === 'lead-score') {
    return <LeadScoreTool onNavigate={onNavigate} onBackToLab={() => setActiveTool('none')} />;
  }
  if (activeTool === 'seo') {
    return <SeoSnapshotTool onNavigate={onNavigate} onBackToLab={() => setActiveTool('none')} />;
  }
  if (activeTool === 'palette') {
    return <PaletteLabTool onNavigate={onNavigate} onBackToLab={() => setActiveTool('none')} />;
  }

  // Master Lab Landing View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Hero Header */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
          <Cpu className="w-4 h-4" />
          <span>Veyro Digital Workbench</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.95]">
          FOUR WORKING UTILITIES.<br />
          <span className="text-[#C7FF3D]">ZERO PLACEHOLDER ALERTS.</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
          The original V1 prototype featured placeholder alert popups. We have replaced them with four fully functional in-browser digital tools designed to clarify your project brief, diagnose your conversion readiness, evaluate local SEO, and test architectural color contrast.
        </p>

        {/* Creative Technology Installation Visual */}
        <div className="pt-2">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111113] relative shadow-2xl group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0B0D]">
              <img
                src="/images/veyro_lab_visual_1792116636014.jpg"
                alt="VEYRO Experimental Creative Technology and Algorithmic Geometry Installation"
                width={1920}
                height={1080}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-[#0B0B0D]/85 backdrop-blur-md border border-white/10 px-4 py-3 rounded-lg text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#C7FF3D]">LAB BENCH 0.4</span>
                  <span className="text-zinc-200">Computational Geometry & Monolithic Digital Sculpture</span>
                </div>
                <div className="text-zinc-400 text-[11px] hidden sm:block">
                  Algorithmic Utilities & Interactive In-Browser Prototyping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrity Transparency Badge */}
      <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#111113] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C7FF3D] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]">
              Client-Side Deterministic Privacy Protocol
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-2xl">
              All four utilities execute 100% in your browser. We collect zero sensitive data, make zero unconfigured external AI calls, and respect your privacy.
            </p>
          </div>
        </div>

        <div className="font-mono text-[11px] text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2.5 py-1 rounded shrink-0">
          4 of 4 Tools Fully Active
        </div>
      </div>

      {/* Interactive Tool Cards Grid */}
      <section className="space-y-8">
        <SectionHeader
          number="01"
          category="Interactive Suite"
          title="Choose an experiment to run in your browser"
          description="Every tool yields practical, exportable outputs you can immediately apply to your commercial website."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="border border-white/10 bg-[#111113] p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:border-[#C7FF3D]/50 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,255,61,0.06),transparent_50%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2 py-0.5 rounded-xs uppercase">
                    TOOL {tool.num} · {tool.category}
                  </span>
                  <div className="p-2 rounded-lg bg-[#0B0B0D] border border-white/5">
                    {tool.icon}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] group-hover:text-[#C7FF3D] transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {tool.tagline}
                </p>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  <ul className="space-y-1.5">
                    {tool.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF3D] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 relative z-10">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setActiveTool(tool.id)}
                  className="w-full justify-between"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  <span>{tool.actionLabel}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architectural Philosophy Section */}
      <section className="border border-white/10 rounded-2xl bg-[#0B0B0D] p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase">
          <Terminal className="w-4 h-4" />
          <span>The Veyro Lab Philosophy</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8]">
              Why we build functional tools instead of marketing brochures.
            </h3>
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            <p>
              Most digital agencies promise innovation but present static marketing screenshots. The Veyro Lab is our commitment to real software engineering: building interactive utilities that deliver concrete value to visitors before any formal commercial agreement.
            </p>
            <p>
              As client projects evolve, proprietary client-facing portals, 3D spatial configurators, and AI-driven automation pipelines will launch directly through this workbench.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <div className="border border-white/10 rounded-2xl bg-gradient-to-br from-[#111113] to-[#0B0B0D] p-8 sm:p-14 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F3F0E8]">
          Ready to build custom interactive utilities for your business?
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          From customer calculators to bespoke spatial estimators, we build software tools that establish your brand as the definitive authority in your sector.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} icon={<ArrowRight className="w-4 h-4" />}>
            Commission a Studio Tool ↗
          </Button>
        </div>
      </div>

    </div>
  );
};
