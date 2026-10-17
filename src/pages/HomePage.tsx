import { FC, useState } from 'react';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectTiltCard } from '../components/ProjectTiltCard';
import { studioServices } from '../data/services';
import { conceptProjects } from '../data/portfolio';
import { studioConfig, getEmailLink } from '../config/studio';
import { usePageSEO, getCanonicalOrigin } from '../utils/seo';
import { RoutePath } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Cpu,
  ShieldCheck
} from 'lucide-react';

export interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
}

export const HomePage: FC<HomePageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeServiceHover, setActiveServiceHover] = useState<number | null>(null);

  const baseOrigin = getCanonicalOrigin();

  usePageSEO({
    title: 'VEYRO — Web & Digital Studio | Built to be noticed. Designed to convert.',
    description: 'Modern websites and bespoke digital experiences for businesses ready to turn attention into enquiries in Delhi NCR and beyond.',
    path: '/',
    image: '/images/veyro_homepage_hero_1792116634810.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${baseOrigin}/#website`,
          url: `${baseOrigin}/`,
          name: 'VEYRO Web & Digital Studio',
          description: 'Bespoke websites and digital experiences built to be noticed and designed to convert.',
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${baseOrigin}/#organization`,
          name: 'VEYRO Web & Digital Studio',
          url: `${baseOrigin}/`,
          logo: `${baseOrigin}/favicon.svg`,
          image: `${baseOrigin}/images/veyro_homepage_hero_1792116634810.jpg`,
          description: 'Independent Web & Digital Studio engineering bespoke websites, spatial web experiences, and conversion systems for interior designers and modern brands in Delhi NCR.',
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Delhi NCR, India',
          },
          knowsAbout: [
            'Bespoke Web Design',
            'React & TypeScript Engineering',
            'Digital Strategy & Information Architecture',
            'Conversion Funnel Architecture',
            'Local Search Optimization',
          ],
        },
      ],
    },
  });

  const faqs = [
    {
      q: 'Do you only work with interior designers?',
      a: 'No. Interior design is our initial flagship niche in Delhi NCR because of the immense value placed on visual craftsmanship, spatial aesthetics, and high-ticket customer trust. VEYRO also engineers digital experiences for architecture practices, luxury lifestyle brands, boutique hospitality, and modern local service businesses.',
    },
    {
      q: 'Can you redesign our existing website without starting from zero?',
      a: 'Yes. We conduct a rigorous technical and conversion audit on your current site, identify friction points where visitors drop off, preserve your existing brand equity and SEO signals, and rebuild the frontend with modern performance and cleaner enquiry funnels.',
    },
    {
      q: 'Are the portfolio projects on this site real clients?',
      a: 'ARCLINE STUDIO, NOIRÉ, and KAVO are clearly labeled concept case studies developed by VEYRO. They demonstrate our technical rigor, art direction, and conversion architecture across specific industries. We never fabricate client metrics or publish unverified claims.',
    },
    {
      q: 'How does the enquiry and proposal process work?',
      a: 'When you submit our project qualification form, we evaluate your scope, timeline, and business goals. Within 24 business hours, we schedule a concise discovery call and provide a transparent, fixed-scope proposal with phased delivery milestones.',
    },
    {
      q: 'Can our website be expanded as our business grows?',
      a: 'Absolutely. We build with modular, scalable React and TypeScript component architectures. You can seamlessly add new service lines, case studies, client portals, CMS capabilities, or AI automations without rebuilding the core codebase.',
    },
  ];

  const emailHref = getEmailLink('Project Enquiry — VEYRO');

  return (
    <div className="space-y-24 sm:space-y-36 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Orbital Geometric Background System */}
        <div 
          className="absolute right-[-10vw] top-[10vh] w-[70vw] h-[70vw] max-w-[650px] max-h-[650px] rounded-full border border-[#C7FF3D]/15 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-[12%] rounded-full border border-white/10 rotate-[25deg] scale-x-[0.55]" />
          <div className="absolute inset-[26%] rounded-full border border-white/10 -rotate-[35deg] scale-x-[0.7]" />
          <div className="absolute top-[8%] left-[48%] w-2.5 h-2.5 rounded-full bg-[#C7FF3D] shadow-[0_0_24px_#C7FF3D] animate-spin origin-[200px_200px]" />
        </div>

        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#C7FF3D]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            
            {/* Left Title Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-zinc-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#C7FF3D] shadow-[0_0_12px_#C7FF3D]" />
                <span>Web & Digital Studio · Delhi NCR</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-[98px] font-display font-semibold text-[#F3F0E8] leading-[0.88] tracking-[-0.06em]">
                BUILT TO BE<br />
                <span className="text-[#C7FF3D]">NOTICED.</span>
              </h1>
            </div>

            {/* Right Copy & CTA Column */}
            <div className="lg:col-span-4 space-y-8 lg:pb-3">
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-sans">
                Modern websites and bespoke digital experiences for businesses that are ready to look as commanding online as they do in real life.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('/contact')}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a project
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => onNavigate('/work')}
                >
                  Explore work ↓
                </Button>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>SCROLL TO ENTER STUDIO</span>
                <span className="text-[#C7FF3D]">↓</span>
              </div>
            </div>

          </div>

          {/* Signature Architectural Hero Visual */}
          <div className="mt-12 sm:mt-16 rounded-2xl overflow-hidden border border-white/10 bg-[#111113] relative shadow-2xl group">
            {/* Minimalist Studio Viewport Bar */}
            <div className="px-4 py-3 border-b border-white/10 bg-[#141417] flex items-center justify-between text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                <span className="ml-2 text-zinc-400 text-[11px] hidden sm:inline">veyro.studio // monolithic-digital-pavilion</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] tracking-wider text-[#C7FF3D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] animate-pulse" />
                <span>SPATIAL WEB ARCHITECTURE · 4K</span>
              </div>
            </div>

            {/* High-Resolution Hero Visual */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0B0D]">
              <img
                src="/images/veyro_homepage_hero_1792116634810.jpg"
                alt="VEYRO Monolithic Digital Architecture Pavilion"
                width={1920}
                height={1080}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-[#0B0B0D]/85 backdrop-blur-md border border-white/10 px-4 py-3 rounded-lg text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#C7FF3D]">FIG 0.1</span>
                  <span className="text-zinc-200">Monolithic Obsidian Pavilion · Spatial Showroom Prototype</span>
                </div>
                <div className="text-zinc-500 text-[11px] hidden md:block">
                  Art Directed by VEYRO Web & Digital Studio · Delhi NCR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KINETIC MARQUEE */}
      <section className="border-y border-white/10 bg-[#111113] py-4 overflow-hidden select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-display tracking-[0.2em] text-zinc-400 uppercase font-medium">
            <span>STRATEGY <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>DESIGN <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>DEVELOPMENT <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>CONVERSION <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>DELHI NCR <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>INTERIOR DESIGN <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>AI SYSTEMS <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>ZERO TEMPLATE ENERGY <strong className="text-[#C7FF3D]">✦</strong></span>
          </div>
          <div className="flex items-center gap-8 text-xs sm:text-sm font-display tracking-[0.2em] text-zinc-400 uppercase font-medium ml-8">
            <span>STRATEGY <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>DESIGN <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>DEVELOPMENT <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>CONVERSION <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>DELHI NCR <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>INTERIOR DESIGN <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>AI SYSTEMS <strong className="text-[#C7FF3D]">✦</strong></span>
            <span>ZERO TEMPLATE ENERGY <strong className="text-[#C7FF3D]">✦</strong></span>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          category="What We Do"
          title="Not just a website. A commercial digital asset."
          description="Your website is the primary digital handshake. We make sure it feels deliberate, memorable, and effortlessly easy to act upon."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {studioServices.map((service, idx) => {
            const isHovered = activeServiceHover === idx;
            return (
              <div
                key={service.number}
                onMouseEnter={() => setActiveServiceHover(idx)}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => onNavigate('/services')}
                className={`p-7 sm:p-9 border-r border-b border-white/10 relative transition-all duration-300 cursor-pointer group ${
                  isHovered ? 'bg-gradient-to-br from-[#18181B] to-[#111113]' : 'bg-[#0B0B0D]'
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-[#C7FF3D] transition-colors">
                    {service.number}
                  </span>
                  <span className="text-zinc-600 group-hover:text-[#C7FF3D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 text-sm">
                    ↗
                  </span>
                </div>

                <h3 className="text-2xl font-display font-medium text-[#F3F0E8] mb-3 group-hover:text-[#C7FF3D] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.tagline}
                </p>

                <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5 pt-4 border-t border-white/5">
                  <span className="text-[#C7FF3D]">✦</span>
                  <span>Inspect Deliverables</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('/services')}>
            Explore Detailed Service Specifications ↗
          </Button>
        </div>
      </section>

      {/* 4. FEATURED CONCEPT PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          category="Featured Work"
          title="Work engineered to feel like an experience."
          description="These are concept case studies built to demonstrate VEYRO's interior design, luxury lifestyle, and local conversion standards."
          badge="Concept Projects"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {conceptProjects.map((project) => {
            const isArcline = project.slug === 'arcline-studio';
            const isNoire = project.slug === 'noire';

            return (
              <ProjectTiltCard
                key={project.slug}
                title={project.title}
                category={project.category}
                subtitle={project.subtitle}
                isConcept={project.isConcept}
                onClick={() => onNavigate(`/work/${project.slug}` as RoutePath)}
                className="group"
              >
                {/* Architectural Visual Surface with Authentic Photography */}
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

                  {/* Top Bar of Graphic */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="w-8 h-1 bg-[#C7FF3D] rounded-full" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                      {isArcline ? 'INTERIOR / SPATIAL' : isNoire ? 'EDITORIAL / RUNWAY' : 'ROASTERY / SEAT'}
                    </span>
                  </div>

                  {/* Mid Graphic Typography */}
                  <div className="relative z-10 py-3">
                    <div className="font-display font-semibold text-xl tracking-tight text-[#F3F0E8] leading-tight drop-shadow-md">
                      {isArcline ? (
                        <>SPACE<br />DEFINED.</>
                      ) : isNoire ? (
                        <>HAUTE<br />EDITORIAL.</>
                      ) : (
                        <>CRAFT<br />EXTRACTION.</>
                      )}
                    </div>
                  </div>

                  {/* Bottom Graphic Detail */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-300 pt-2 border-t border-white/10 bg-black/40 backdrop-blur-xs -mx-5 -mb-5 px-5 py-2">
                    <span>{project.location}</span>
                    <span className="text-[#C7FF3D]">0{isArcline ? '1' : isNoire ? '2' : '3'} / SPEC</span>
                  </div>
                </div>

                {/* Strategic Objective Pill */}
                <div className="p-3.5 rounded-lg bg-[#0B0B0D] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Commercial Objective
                  </div>
                  <div className="text-xs text-zinc-300 font-sans">
                    {project.heroMetrics?.[2]?.value || 'High-Ticket Consultation Conversion'}
                  </div>
                </div>
              </ProjectTiltCard>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl border border-white/10 bg-[#111113]">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C7FF3D]">
              Concept Project Transparency Notice
            </div>
            <p className="text-xs text-zinc-400">
              All portfolio work is strictly labeled. As live client commissions complete, they seamlessly drop into this architecture.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => onNavigate('/work')}>
            View Portfolio Index ↗
          </Button>
        </div>
      </section>

      {/* 5. STUDIO MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-white/10 rounded-2xl bg-[#111113] p-8 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7FF3D]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#C7FF3D] uppercase">
                03 / The Studio Manifesto
              </span>
              <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#F3F0E8] leading-[0.92] tracking-tight">
                Small studio.<br />
                <span className="text-[#C7FF3D]">Big digital presence.</span><br />
                No template energy.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 lg:pt-8 text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p>
                VEYRO starts deliberately lean. That means faster decisions, closer collaboration with the actual engineer designing your site, and digital foundations tailored around your specific commercial goals instead of a recycled agency layout.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Most websites look like copies of copies because agencies sell commoditized templates disguised as custom work. We treat every digital touchpoint as an architectural build: precise hierarchy, distinct typographic personality, and friction-free conversion paths.
              </p>
              <div className="pt-4 flex items-center gap-4">
                <Button variant="lime-outline" size="sm" onClick={() => onNavigate('/about')}>
                  Read About the Studio ↗
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          category="Delivery Framework"
          title="Seven structured moves. Zero guesswork."
          description="Simple enough for rapid execution today. Disciplined enough to scale as your company expands."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'Discover', desc: 'Deep dive into your business model, customer mindset, and market opportunity.' },
            { num: '02', title: 'Strategy', desc: 'Define page hierarchy, messaging angles, and enquiry conversion pathways.' },
            { num: '03', title: 'Design', desc: 'Craft bespoke architectural layouts and custom typographic systems.' },
            { num: '04', title: 'Build', desc: 'Develop high-performance, accessible code with responsive motion.' },
          ].map((step) => (
            <div key={step.num} className="border border-white/10 bg-[#111113] p-6 rounded-xl space-y-4">
              <span className="font-mono text-xs text-[#C7FF3D]">{step.num} / PHASE</span>
              <h3 className="text-xl font-display font-medium text-[#F3F0E8]">{step.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('/process')}>
            Inspect Complete 7-Stage Delivery Roadmap ↗
          </Button>
        </div>
      </section>

      {/* 7. WHY VEYRO & FOUNDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Why VEYRO */}
          <div className="border border-white/10 bg-[#111113] p-8 sm:p-10 rounded-2xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Why Choose Veyro</span>
            </div>
            <h3 className="text-3xl font-display font-medium text-[#F3F0E8] leading-tight">
              Engineered around the business. Not agency overhead.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              No endless layers of account managers, bloated markup meetings, or outsourced junior developers. You work directly with technical leadership focused on making your business easier to discover, trust, and commission online.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7FF3D]" />
                <span>Zero template energy or cookie-cutter frameworks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7FF3D]" />
                <span>Deep Delhi NCR local search & interior design context</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7FF3D]" />
                <span>Sub-second page speeds & pristine Core Web Vitals</span>
              </li>
            </ul>
          </div>

          {/* Founder Section with Configurable Placeholder */}
          <div className="border border-white/10 bg-[#111113] p-8 sm:p-10 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Founder Spotlight</span>
              </div>
              <h3 className="text-3xl font-display font-medium text-[#F3F0E8]">
                {studioConfig.founder.name}
              </h3>
              <div className="text-xs font-mono text-zinc-500 uppercase">
                {studioConfig.founder.role} · VEYRO
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {studioConfig.founder.bio}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>FOUNDER-LED ENGINEERING</span>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('/about')}>
                Studio Story ↗
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. VEYRO LAB PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#C7FF3D]/30 bg-gradient-to-br from-[#111113] via-[#0B0B0D] to-[#151719] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7FF3D]/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 text-[#C7FF3D] font-mono text-xs uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Interactive Digital Experiments</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-display font-medium text-[#F3F0E8] leading-tight">
                Veyro Lab: Working in-browser utilities.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Test our experimental client tools: AI Website Brief Builder, Lead Score Readiness Calculator, Delhi NCR Local SEO Snapshot, and the Architectural Palette Lab.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/lab')}
                icon={<Sparkles className="w-4 h-4" />}
              >
                Launch Veyro Lab ↗
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ACCORDION FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          category="FAQ"
          title="Questions, answered with transparency."
          description="Clear details on our niche, process, and technical philosophy."
          align="center"
        />

        <div className="border-t border-white/10 divide-y divide-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-lg sm:text-xl font-display font-medium text-[#F3F0E8] hover:text-[#C7FF3D] transition-colors cursor-pointer py-2 focus-visible:ring-1 focus-visible:ring-[#C7FF3D] rounded-sm"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="pr-6">{faq.q}</span>
                  <span className="text-[#C7FF3D] shrink-0 font-mono">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="pt-3 pb-2 text-xs sm:text-sm text-zinc-400 leading-relaxed animate-fadeIn font-sans"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CLOSING STUDIO CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-white/10 rounded-2xl bg-gradient-to-b from-[#111113] to-[#0B0B0D] p-10 sm:p-20 text-center relative overflow-hidden space-y-8">
          <div className="w-48 h-48 bg-[#C7FF3D]/10 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] tracking-[0.2em] uppercase">
            <span>06 / YOUR NEXT MOVE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight max-w-3xl mx-auto leading-[0.92]">
            LET'S BUILD SOMETHING <span className="text-[#C7FF3D]">UNEXPECTED.</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Ready to upgrade your digital presence from a standard online business card to a high-converting digital showroom?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start a project enquiry
            </Button>

            {emailHref && (
              <Button
                variant="secondary"
                size="lg"
                href={emailHref}
              >
                {studioConfig.contact.email} ↗
              </Button>
            )}
          </div>

          <div className="pt-8 text-[11px] font-mono text-zinc-500">
            Delhi NCR Studio Base · Fixed-Scope Milestone Delivery
          </div>
        </div>
      </section>

    </div>
  );
};
