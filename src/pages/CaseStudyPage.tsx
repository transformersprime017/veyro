import { FC } from 'react';
import { Button } from '../components/Button';
import { getProjectBySlug } from '../data/portfolio';
import { RoutePath } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  ExternalLink,
  Target
} from 'lucide-react';

export interface CaseStudyPageProps {
  slug: string;
  onNavigate: (path: RoutePath) => void;
}

export const CaseStudyPage: FC<CaseStudyPageProps> = ({ slug, onNavigate }) => {
  const project = getProjectBySlug(slug);

  // 1. Not Found Graceful Fallback
  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase">
          <span>Project Not Found</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-medium text-[#F3F0E8]">
          Case study "{slug}" does not exist.
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          The requested portfolio entry may have been moved or archived. Please explore our available projects.
        </p>
        <div className="pt-4">
          <Button variant="primary" size="md" onClick={() => onNavigate('/work')}>
            ← Return to Work Directory
          </Button>
        </div>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24">
      
      {/* Top Back Navigation Link */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/work')}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio Directory</span>
        </button>
      </div>

      {/* Case Study Hero Section */}
      <section className="space-y-8 max-w-5xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2.5 py-1 rounded-xs uppercase tracking-wider">
            {project.category}
          </span>
          {project.status === 'concept' && (
            <span className="font-mono text-xs text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-xs uppercase tracking-wider">
              Concept Case Study
            </span>
          )}
          {project.location && (
            <span className="font-mono text-xs text-zinc-500">
              {project.location}
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.95]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-2xl text-zinc-300 leading-relaxed font-sans max-w-3xl">
          {project.subtitle}
        </p>

        {/* Live and Repository Links (only if verified) */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#0B0B0D] bg-[#C7FF3D] px-4 py-2 rounded-full font-bold hover:bg-[#d4ff63] transition-colors"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-300 border border-white/15 px-4 py-2 rounded-full hover:border-white/40 transition-colors"
              >
                <span>View Source Repository</span>
                <Code2 className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </section>

      {/* Mandatory Concept Disclosure Notice */}
      {project.conceptDisclosure && (
        <div className="p-6 rounded-xl border border-white/10 bg-[#111113] flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-[#C7FF3D] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F3F0E8]">
              Transparency & Concept Disclosure
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {project.conceptDisclosure}
            </p>
          </div>
        </div>
      )}

      {/* Key Metrics / Snapshot Grid */}
      {caseStudy?.heroMetrics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 py-6">
          {caseStudy.heroMetrics.map((m, idx) => (
            <div key={idx} className="px-6 py-3 space-y-1">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                {m.label}
              </div>
              <div className="text-base sm:text-lg font-display text-[#F3F0E8]">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Architectural Mockup & Device Viewport */}
      {project.coverImage && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#111113] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
            {/* Minimalist Browser Chrome Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0B0B0D]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white/10 border border-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/10 border border-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/10 border border-white/15" />
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#111113] border border-white/10 text-[11px] font-mono text-zinc-400 max-w-sm truncate">
                <span className="text-[#C7FF3D]">🔒</span>
                <span>https://{project.slug}.veyro.studio</span>
              </div>

              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:block">
                4K UHD VIEWPORT
              </div>
            </div>

            {/* Viewport Screen */}
            <div className="relative aspect-video sm:aspect-[16/9] w-full overflow-hidden bg-[#0B0B0D]">
              <img
                src={project.coverImage}
                alt={`${project.title} Architectural Spatial Showcase`}
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between pointer-events-none">
                <div className="bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-lg max-w-md">
                  <span className="font-mono text-[10px] text-[#C7FF3D] uppercase tracking-wider block">
                    PRIMARY HERO PERSPECTIVE
                  </span>
                  <span className="font-display text-sm sm:text-base text-[#F3F0E8] font-medium">
                    {project.title} — Architectural Direction
                  </span>
                </div>
                <div className="hidden sm:block font-mono text-[10px] text-zinc-400 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                  {project.category} · {project.location || 'Delhi NCR'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-2">
            <span>FIGURE 1.0 — HIGH-FIDELITY WEB INTERACTION ENVIRONMENT</span>
            <span className="text-[#C7FF3D]">100% BESPOKE FRONTEND</span>
          </div>
        </div>
      )}

      {/* Detailed Case Study Content or Clean Overview */}
      {caseStudy ? (
        <div className="space-y-24">
          
          {/* 1. Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">01 / Context & Premise</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8]">
                The Architectural Challenge
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>{caseStudy.overview}</p>
              <div className="p-5 rounded-lg bg-[#111113] border border-white/5 space-y-2 text-sm text-zinc-400">
                <strong className="text-zinc-200 block font-display">The Specific Friction:</strong>
                <p>{caseStudy.challenge}</p>
              </div>
            </div>
          </section>

          {/* 2. Strategic Solution */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start border-t border-white/10 pt-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">02 / Execution</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8]">
                The Strategic Architecture
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>{caseStudy.strategy}</p>
              <p className="text-sm text-zinc-400">{caseStudy.experience}</p>
            </div>
          </section>

          {/* 3. Visual Identity & Palette */}
          <section className="border border-white/10 rounded-2xl bg-[#111113] p-8 sm:p-12 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C7FF3D] uppercase">03 / Art Direction & Design Tokens</span>
              <h2 className="text-2xl sm:text-4xl font-display font-medium text-[#F3F0E8]">
                Visual System & Typographic Structure
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">{caseStudy.identity.conceptNotes}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-zinc-400">Font System</div>
                <div className="text-base font-display text-[#F3F0E8]">{caseStudy.identity.fontSystem}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-zinc-400">Palette Tokens</div>
                <div className="flex items-center gap-3">
                  {caseStudy.identity.palette.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="w-8 h-8 rounded border border-white/15" style={{ backgroundColor: color }} />
                      <span className="text-[10px] font-mono text-zinc-400">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. Tactile Materiality & Editorial Craft Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-6 border-t border-white/10 pt-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C7FF3D] uppercase">
                    04 / Tactile Materiality & Craft
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-display font-medium text-[#F3F0E8]">
                    Macro Materiality & Architectural Detail
                  </h2>
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  MACRO DETAIL PERSPECTIVE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
                <div className="md:col-span-7 rounded-xl overflow-hidden border border-white/10 relative group">
                  <img
                    src={project.gallery[0]}
                    alt={`${project.title} Materiality and Detail Craft`}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="md:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D]" />
                    <span>Material Craft Focus</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8]">
                    {project.slug === 'arcline-studio'
                      ? 'Fluted Walnut, Statuario Veining & Brushed Brass'
                      : project.slug === 'noire'
                      ? 'Architectural Wool Crepe & Bespoke Haute Couture Seaming'
                      : 'Artisanal Single-Origin Bloom & Pour-Over Extraction'}
                  </h3>

                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {project.slug === 'arcline-studio'
                      ? 'Luxury residential clients evaluate craft through physical materiality. The digital experience translates natural daylight reflection, shadowline reveals, and fluted textures into high-definition digital fidelity.'
                      : project.slug === 'noire'
                      ? 'High-fashion garment prestige relies on the tactile weight of weave and stitch. We reproduce the stark chiaroscuro atmosphere of a private atelier salon directly in the browser.'
                      : 'Craft hospitality thrives on sensory anticipation. We capture the amber bloom and precise extraction physics to excite specialty coffee seekers before they step foot into the roastery.'}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>ASPECT RATIO 4:3</span>
                    <span className="text-[#C7FF3D]">PHYSICAL TEXTURE</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 5. Conversion & Interaction Mechanisms */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-16">
            <div className="border border-white/10 bg-[#111113] p-8 rounded-xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Tactile Interactions</span>
              </div>
              <ul className="space-y-3 pt-2">
                {caseStudy.interactionNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-[#111113] p-8 rounded-xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase">
                <Target className="w-4 h-4" />
                <span>Conversion Triggers</span>
              </div>
              <ul className="space-y-3 pt-2">
                {caseStudy.conversionFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 5. Intended Audience & Technologies */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl border border-white/10 bg-[#0B0B0D]">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-zinc-500">Target Audience</div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{project.intendedAudience}</p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-zinc-500">Technologies Deployed</div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-xs text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Next Project Loop */}
          <div className="border-t border-white/10 pt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase text-zinc-500">Next Case Study</div>
              <div className="text-2xl font-display font-medium text-[#F3F0E8] mt-1">
                {caseStudy.nextProjectTitle}
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate(`/work/${caseStudy.nextProjectSlug}` as RoutePath)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Next Study
            </Button>
          </div>

        </div>
      ) : (
        /* Clean Overview for entries without extended case study */
        <div className="border border-white/10 bg-[#111113] p-10 rounded-2xl space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C7FF3D]">Project Overview</div>
          <h2 className="text-3xl font-display font-medium text-[#F3F0E8]">Project Summary</h2>
          <p className="text-zinc-300 text-base leading-relaxed">{project.subtitle}</p>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-xs font-mono uppercase text-zinc-400">Intended Project Goals:</div>
            <ul className="space-y-2">
              {project.projectGoals.map((g, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#C7FF3D]" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Commission CTA */}
      <div className="border border-white/10 rounded-2xl bg-gradient-to-br from-[#111113] to-[#0B0B0D] p-8 sm:p-14 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F3F0E8]">
          Interested in a similar build for your brand?
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          We engineer websites that command commercial presence and convert attention into qualified bookings.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} icon={<ArrowRight className="w-4 h-4" />}>
            Commission a Project Consultation ↗
          </Button>
        </div>
      </div>

    </div>
  );
};
