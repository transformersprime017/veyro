import { FC, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { studioServices } from '../data/services';
import { usePageSEO } from '../utils/seo';
import { RoutePath } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Layers, 
  Code2, 
  MapPin, 
  Cpu, 
  RefreshCw,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export interface ServicesPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ServicesPage: FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<number>(0);

  usePageSEO({
    title: 'Bespoke Web Design & Development Services — VEYRO Studio',
    description: 'Six core pillars of digital craft: Bespoke Web Design, Web Development, Digital Strategy, Local Growth, AI Systems, and Frontend Engineering in Delhi NCR.',
    path: '/services',
  });

  const serviceIcons = [
    <Compass key="1" className="w-5 h-5 text-[#C7FF3D]" />,
    <Layers key="2" className="w-5 h-5 text-[#C7FF3D]" />,
    <Code2 key="3" className="w-5 h-5 text-[#C7FF3D]" />,
    <MapPin key="4" className="w-5 h-5 text-[#C7FF3D]" />,
    <Cpu key="5" className="w-5 h-5 text-[#C7FF3D]" />,
    <RefreshCw key="6" className="w-5 h-5 text-[#C7FF3D]" />,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Services Header */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
          <span>Six Core Pillars of Digital Craft</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.95]">
          ENGINEERED TO TURN ATTENTION INTO <span className="text-[#C7FF3D]">ENQUIRIES.</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
          We do not sell one-size-fits-all website packages. Every engagement is structured around clear commercial deliverables, tailored art direction, and high-performance technical engineering.
        </p>
      </div>

      {/* Interactive Service Inspector Tabs */}
      <section className="space-y-8">
        <div className="border border-white/10 rounded-2xl bg-[#111113] overflow-hidden">
          
          {/* Service Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-white/10 divide-x divide-y lg:divide-y-0 divide-white/10">
            {studioServices.map((service, idx) => {
              const isSelected = selectedService === idx;
              return (
                <button
                  key={service.number}
                  type="button"
                  onClick={() => setSelectedService(idx)}
                  className={`p-4 sm:p-5 text-left transition-colors cursor-pointer flex flex-col justify-between min-h-[100px] ${
                    isSelected ? 'bg-[#18181B] border-b-2 border-b-[#C7FF3D]' : 'hover:bg-white/5'
                  }`}
                  aria-selected={isSelected}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs text-zinc-500">{service.number}</span>
                    {serviceIcons[idx]}
                  </div>
                  <div className={`text-sm font-display font-medium mt-3 ${isSelected ? 'text-[#C7FF3D]' : 'text-[#F3F0E8]'}`}>
                    {service.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Detail View */}
          <div className="p-8 sm:p-14 space-y-10">
            {(() => {
              const active = studioServices[selectedService];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                  
                  {/* Left Specs */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3D] uppercase">
                      <span>{active.number} / SERVICE PILLAR</span>
                      <span>·</span>
                      <span>STAGE: {active.processStep}</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F3F0E8] leading-tight">
                      {active.title}
                    </h2>

                    <p className="text-lg text-zinc-300 font-sans leading-relaxed">
                      {active.tagline}
                    </p>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {active.description}
                    </p>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs font-mono uppercase text-zinc-400 mb-2">
                        Ideal Fit
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {active.idealClient}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => onNavigate('/contact')}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Enquire for {active.title}
                      </Button>
                    </div>
                  </div>

                  {/* Right Deliverables List */}
                  <div className="lg:col-span-5 bg-[#0B0B0D] p-6 sm:p-8 rounded-xl border border-white/10 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono text-xs text-[#C7FF3D] uppercase tracking-wider">
                        Core Deliverables
                      </span>
                      <Sparkles className="w-4 h-4 text-[#C7FF3D]" />
                    </div>

                    <ul className="space-y-3.5">
                      {active.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#C7FF3D] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Delivery Standard</span>
                      <span className="text-[#C7FF3D]">Clean Code · No Templates</span>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* Full 6-Pillar Detailed Matrix */}
      <section className="space-y-8">
        <SectionHeader
          number="02"
          category="Deliverables Breakdown"
          title="All six service pillars at a glance"
          description="Complete transparency on scope, execution parameters, and client touchpoints."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studioServices.map((service, idx) => (
            <div
              key={service.number}
              className="border border-white/10 bg-[#111113] p-7 rounded-xl flex flex-col justify-between space-y-6 hover:border-[#C7FF3D]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500">{service.number}</span>
                  {serviceIcons[idx]}
                </div>

                <h3 className="text-2xl font-display font-medium text-[#F3F0E8]">
                  {service.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">
                    Deliverables:
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {service.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C7FF3D]" />
                        <span className="line-clamp-1">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">{service.processStep}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('/contact')}
                  className="text-xs p-0 text-[#C7FF3D]"
                >
                  Commission ↗
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Framework */}
      <section className="border border-white/10 rounded-2xl bg-[#111113] p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C7FF3D]">
            Commercial Clarity
          </div>
          <h2 className="text-3xl font-display font-medium text-[#F3F0E8]">
            Fixed-scope milestone delivery. No hidden agency surprises.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Every project begins with clearly documented deliverables, fixed phase timelines, and guaranteed direct collaboration with lead technical engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Clock className="w-4 h-4 text-[#C7FF3D]" />
              <span>Timelines</span>
            </div>
            <div className="text-lg font-display text-[#F3F0E8]">2 to 4 Weeks</div>
            <p className="text-xs text-zinc-500">From finalized discovery to production launch.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
              <span>Code Ownership</span>
            </div>
            <div className="text-lg font-display text-[#F3F0E8]">100% Client Owned</div>
            <p className="text-xs text-zinc-500">Clean repository transfer with zero vendor lock-in.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Sparkles className="w-4 h-4 text-[#C7FF3D]" />
              <span>Post-Launch</span>
            </div>
            <div className="text-lg font-display text-[#F3F0E8]">30 Days Evolution Warranty</div>
            <p className="text-xs text-zinc-500">Continuous monitoring, bug fixes, and calibration.</p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Button variant="primary" size="md" onClick={() => onNavigate('/contact')}>
            Start a project consultation ↗
          </Button>
          <Button variant="secondary" size="md" onClick={() => onNavigate('/process')}>
            Inspect Our 7-Stage Process ↓
          </Button>
        </div>
      </section>

    </div>
  );
};
