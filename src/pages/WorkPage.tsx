import { FC, useState, useMemo } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { ProjectTiltCard } from '../components/ProjectTiltCard';
import { portfolioProjects } from '../data/portfolio';
import { studioAchievements } from '../data/achievements';
import { usePageSEO } from '../utils/seo';
import { RoutePath } from '../types';
import { 
  ArrowRight, 
  Filter, 
  Layers, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';

export interface WorkPageProps {
  onNavigate: (path: RoutePath) => void;
}

type MainFilterTab = 'all' | 'projects' | 'concepts' | 'achievements';

export const WorkPage: FC<WorkPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<MainFilterTab>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  usePageSEO({
    title: 'Work & Portfolio — VEYRO Web & Digital Studio',
    description: 'Explore VEYRO\'s curated portfolio of architectural digital experiences, concept case studies, and engineering achievements in Delhi NCR.',
    path: '/work',
  });

  // Derive all unique project categories for the secondary filter
  const categories = useMemo(() => {
    const set = new Set<string>();
    portfolioProjects.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter projects according to tab and category
  const filteredProjects = useMemo(() => {
    if (activeTab === 'achievements') return [];

    return portfolioProjects.filter((p) => {
      // Tab check
      if (activeTab === 'concepts' && p.status !== 'concept' && p.projectType !== 'concept') {
        return false;
      }
      if (activeTab === 'projects' && (p.status === 'concept' || p.projectType === 'concept')) {
        return false;
      }

      // Category check
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [activeTab, selectedCategory]);

  // Filter achievements according to tab
  const showAchievements = activeTab === 'all' || activeTab === 'achievements';

  const resetFilters = () => {
    setActiveTab('all');
    setSelectedCategory('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
          <span>Studio Portfolio & Technical Registry</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.95]">
          WORK THAT DOES NOT LOOK LIKE <span className="text-[#C7FF3D]">TEMPLATE WORK.</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
          An expanding repository of architectural websites, bespoke brand experiences, technical milestones, and industry concept studies. Built from clean source code with zero off-the-shelf themes.
        </p>
      </div>

      {/* Concept Transparency Banner */}
      <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#111113] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C7FF3D] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]">
              Portfolio Disclosure & Integrity Lock
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-2xl">
              Concept demonstrations are strictly declared as concept case studies. We never present speculative concepts as paying client endorsements or invent fabricated performance figures.
            </p>
          </div>
        </div>

        <div className="font-mono text-[11px] text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2.5 py-1 rounded shrink-0">
          3 Concept Studies · 5 Milestones
        </div>
      </div>

      {/* Filtering Controls */}
      <div className="space-y-6 border-b border-white/10 pb-8">
        
        {/* Primary Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Portfolio Sections">
          {[
            { id: 'all', label: 'All Portfolio & Milestones', count: portfolioProjects.length + studioAchievements.length },
            { id: 'concepts', label: 'Concept Projects', count: portfolioProjects.filter(p => p.status === 'concept').length },
            { id: 'projects', label: 'Client & Live Work', count: portfolioProjects.filter(p => p.status !== 'concept').length },
            { id: 'achievements', label: 'Studio Achievements', count: studioAchievements.length },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                onClick={() => setActiveTab(tab.id as MainFilterTab)}
                aria-selected={isSelected}
                className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 focus-visible:ring-1 focus-visible:ring-[#C7FF3D] ${
                  isSelected
                    ? 'bg-[#C7FF3D] text-[#0B0B0D] font-bold shadow-[0_0_16px_rgba(199,255,61,0.3)]'
                    : 'bg-[#111113] text-zinc-400 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-[#0B0B0D]' : 'bg-white/5 text-zinc-500'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Category Filter (when projects visible) */}
        {activeTab !== 'achievements' && (
          <div className="flex items-center gap-3 overflow-x-auto pt-2 scrollbar-none">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#C7FF3D]" />
              <span>Category:</span>
            </span>

            {categories.map((cat) => {
              const isCatSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-mono px-3 py-1 rounded border transition-colors shrink-0 cursor-pointer ${
                    isCatSelected
                      ? 'border-[#C7FF3D] bg-[#C7FF3D]/10 text-[#C7FF3D]'
                      : 'border-white/5 bg-[#0B0B0D] text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Projects Grid Section */}
      {activeTab !== 'achievements' && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-zinc-400">
              SHOWING {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-mono text-[#C7FF3D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Category Filter</span>
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const isArcline = project.slug === 'arcline-studio';
                const isNoire = project.slug === 'noire';

                return (
                  <ProjectTiltCard
                    key={project.id}
                    title={project.title}
                    category={project.category}
                    subtitle={project.subtitle}
                    isConcept={project.status === 'concept'}
                    onClick={() => onNavigate(`/work/${project.slug}` as RoutePath)}
                  >
                    {/* Architectural Visual Surface Preview */}
                    <div className="my-5 rounded-lg overflow-hidden border border-white/10 bg-[#0B0B0D] relative min-h-[190px] p-5 flex flex-col justify-between group-hover:border-[#C7FF3D]/40 transition-colors">
                      {project.coverImage ? (
                        <>
                          <img
                            src={project.coverImage}
                            alt={`${project.title} Architectural Preview`}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500 ease-out"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/75 to-[#0B0B0D]/30 pointer-events-none" />
                        </>
                      ) : (
                        <div 
                          className={`absolute inset-0 pointer-events-none opacity-40 ${
                            isArcline 
                              ? 'bg-[radial-gradient(ellipse_at_bottom_left,#C7FF3D_0%,transparent_60%)]' 
                              : isNoire 
                              ? 'bg-[radial-gradient(ellipse_at_top_right,#EDE9DD_0%,transparent_65%)]' 
                              : 'bg-[radial-gradient(ellipse_at_bottom_right,#C7FF3D_0%,transparent_55%)]'
                          }`} 
                        />
                      )}

                      <div className="flex items-center justify-between relative z-10">
                        <span className="w-8 h-1 bg-[#C7FF3D] rounded-full" />
                        <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                          {project.tags[0] || 'DIGITAL CRAFT'}
                        </span>
                      </div>

                      <div className="relative z-10 py-3">
                        <div className="font-display font-semibold text-xl tracking-tight text-[#F3F0E8] leading-tight drop-shadow-md">
                          {isArcline ? 'SPACE DEFINED.' : isNoire ? 'HAUTE EDITORIAL.' : 'CRAFT EXTRACTION.'}
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-300 pt-2 border-t border-white/10 bg-black/40 backdrop-blur-xs -mx-5 -mb-5 px-5 py-2">
                        <span>{project.location || 'Delhi NCR'}</span>
                        <span className="text-[#C7FF3D]">SPEC CASE STUDY</span>
                      </div>
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-xs border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ProjectTiltCard>
                );
              })}
            </div>
          ) : (
            <div className="border border-white/10 bg-[#111113] p-12 rounded-xl text-center space-y-4">
              <Layers className="w-8 h-8 text-zinc-600 mx-auto" />
              <div className="text-lg font-display text-[#F3F0E8]">No projects match the selected filter.</div>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No entries currently match "{selectedCategory}". Clear filters to view all studio work.
              </p>
              <Button variant="secondary" size="sm" onClick={resetFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Achievements Section */}
      {showAchievements && (
        <section className="space-y-8 pt-8 border-t border-white/10">
          <SectionHeader
            number="02"
            category="Verified Milestones"
            title="Studio Engineering Achievements"
            description="Verified technical and architectural milestones completed during the development of VEYRO."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studioAchievements.map((ach) => (
              <div
                key={ach.id}
                className="border border-white/10 bg-[#111113] p-7 rounded-xl flex flex-col justify-between space-y-6 hover:border-[#C7FF3D]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2 py-0.5 rounded-xs uppercase">
                      {ach.category}
                    </span>
                    {ach.stats && (
                      <span className="text-xs font-mono text-zinc-400">
                        {ach.stats.label}: <strong className="text-[#F3F0E8]">{ach.stats.value}</strong>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-display font-medium text-[#F3F0E8] leading-snug">
                    {ach.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  {ach.supportingEvidence && (
                    <div className="text-[11px] font-mono text-zinc-500">
                      Evidence: <span className="text-zinc-400">{ach.supportingEvidence}</span>
                    </div>
                  )}
                  {ach.date && (
                    <div className="text-[10px] font-mono text-zinc-600">
                      Date: {ach.date}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer Commission CTA */}
      <div className="border border-white/10 rounded-2xl bg-gradient-to-br from-[#111113] to-[#0B0B0D] p-8 sm:p-14 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F3F0E8]">
          Have a project ready to build?
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          From high-end residential interior practices to luxury lifestyle brands, we engineer digital experiences that turn attention into inquiries.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} icon={<ArrowRight className="w-4 h-4" />}>
            Commission a Project ↗
          </Button>
        </div>
      </div>

    </div>
  );
};
