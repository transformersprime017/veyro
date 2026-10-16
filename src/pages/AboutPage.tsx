import { FC } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { studioConfig } from '../config/studio';
import { RoutePath } from '../types';
import { 
  Terminal, 
  ShieldCheck 
} from 'lucide-react';

export interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AboutPage: FC<AboutPageProps> = ({ onNavigate }) => {
  const principles = [
    {
      num: '01',
      title: 'Built to be noticed',
      desc: 'Most modern web experiences dissolve into an identical blur of minimalist templates. We engineer sites with architectural structure, purposeful typography, and controlled tension that command immediate attention.',
    },
    {
      num: '02',
      title: 'Designed to convert',
      desc: 'Beauty without commercial intent is just art on a screen. Every layout, interaction, and content block is mapped to solve client hesitation, build authority, and make initiating an enquiry effortless.',
    },
    {
      num: '03',
      title: 'No template energy',
      desc: 'We refuse to recycle theme-forest templates or repackage standard WordPress builders. We write clean, bespoke React and TypeScript code structured around the specific nuances of your business.',
    },
    {
      num: '04',
      title: 'Local relevance & spatial craft',
      desc: 'Starting with a sharp focus on Delhi NCR and high-end interior design, we understand how physical materiality, luxury reputation, and local client trust translate into the digital medium.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24">
      
      {/* Studio Header & Hero Statement */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
          <span>About VEYRO Studio</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.95]">
          SMALL STUDIO.<br />
          <span className="text-[#C7FF3D]">BIG DIGITAL PRESENCE.</span><br />
          NO TEMPLATE ENERGY.
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
          VEYRO is an independent Web & Digital Studio built on a simple conviction: modern businesses deserve digital experiences that look as rigorous, bespoke, and commanding as their real-world craft.
        </p>

        {/* Editorial Studio Environment Visual */}
        <div className="pt-4">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111113] relative shadow-2xl group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0B0D]">
              <img
                src="/src/assets/images/veyro_studio_about_1792116635606.jpg"
                alt="VEYRO Studio Workspace and Material Lab in Delhi NCR"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-[#0B0B0D]/85 backdrop-blur-md border border-white/10 px-4 py-3 rounded-lg text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#C7FF3D]">STUDIO BASE</span>
                  <span className="text-zinc-200">Delhi NCR · Architectural Drafting Table & Physical Material Lab</span>
                </div>
                <div className="text-zinc-400 text-[11px] hidden sm:block">
                  Where tactile materiality meets high-performance React code
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Studio Narrative */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-white/10 pt-16">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#C7FF3D] uppercase">
            01 / The Ethos
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F3F0E8] leading-tight">
            Why we deliberately remain a lean, high-craft studio.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
          <p>
            Traditional digital agencies suffer from organizational bloat: account executives managing project managers who instruct junior freelancers who glue together generic templates. The client pays for agency overhead while the creative and technical quality gets diluted.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            VEYRO works differently. You collaborate directly with lead engineering and art direction. Decisions happen swiftly, feedback loops are tight, and every project is built from clean source code tailored to your exact business objectives.
          </p>
          <div className="pt-2 flex items-center gap-6 text-xs font-mono text-zinc-400">
            <div><strong className="text-[#C7FF3D] text-base block font-display">Delhi NCR</strong> Initial Studio Market</div>
            <div className="border-l border-white/10 pl-6"><strong className="text-[#C7FF3D] text-base block font-display">Zero</strong> Template Dependencies</div>
          </div>
        </div>
      </section>

      {/* Design & Engineering Principles */}
      <section className="space-y-8">
        <SectionHeader
          number="02"
          category="Studio Principles"
          title="The rules that govern every line of code and layout."
          description="We do not follow fleeting web design gimmicks. We build enduring digital assets."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((item) => (
            <div
              key={item.num}
              className="border border-white/10 bg-[#111113] p-8 rounded-xl space-y-4 hover:border-[#C7FF3D]/40 transition-colors"
            >
              <span className="font-mono text-xs text-[#C7FF3D]">{item.num} / PRINCIPLE</span>
              <h3 className="text-2xl font-display font-medium text-[#F3F0E8]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section with Configurable Placeholder */}
      <section className="border border-white/10 rounded-2xl bg-[#111113] p-8 sm:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7FF3D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase">
              <Terminal className="w-4 h-4" />
              <span>Studio Leadership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F3F0E8]">
              {studioConfig.founder.name}
            </h2>

            <div className="text-xs font-mono text-zinc-500 uppercase">
              {studioConfig.founder.role}
            </div>

            <div className="text-xs font-mono text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-sm inline-block">
              Placeholder Identity Configuration
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              {studioConfig.founder.bio}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Leading the architecture of VEYRO with AI-assisted software engineering, bespoke interaction design, and rigorous conversion mechanics. The focus is singular: building digital experiences that elevate local and specialized businesses to command high-end market presence.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm" onClick={() => onNavigate('/contact')}>
                Work with the studio ↗
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('/work')}>
                Inspect Concept Work ↗
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Transparency & Standards */}
      <section className="border border-white/10 rounded-xl bg-[#0B0B0D] p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Commitment to Truth in Advertising</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 font-sans leading-relaxed">
          <div className="space-y-2">
            <strong className="text-zinc-200 block font-display text-sm">No Fake Testimonials</strong>
            <p>We do not publish fabricated quotes, fake client avatars, or invented 5-star reviews.</p>
          </div>
          <div className="space-y-2">
            <strong className="text-zinc-200 block font-display text-sm">Labeled Concept Projects</strong>
            <p>Our featured case studies (ARCLINE STUDIO, NOIRÉ, KAVO) are clearly declared as concept demonstrations.</p>
          </div>
          <div className="space-y-2">
            <strong className="text-zinc-200 block font-display text-sm">Measurable Commercial Results</strong>
            <p>We focus on real conversions: clean contact journeys, instant WhatsApp triggers, and fast loading speeds.</p>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <div className="text-center space-y-6 pt-4">
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#F3F0E8]">
          Ready to establish your digital authority?
        </h2>
        <div className="flex justify-center gap-4">
          <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')}>
            Start a project consultation ↗
          </Button>
        </div>
      </div>

    </div>
  );
};
