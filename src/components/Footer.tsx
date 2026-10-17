import { FC } from 'react';
import { Logo } from './Logo';
import { studioConfig } from '../config/studio';
import { RoutePath } from '../types';

export interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export const Footer: FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only render social links that have confirmed URLs (Zero broken '#' links)
  const activeSocials = Object.entries(studioConfig.social).filter(
    ([, url]) => Boolean(url) && typeof url === 'string' && url.startsWith('http')
  );

  return (
    <footer className="border-t border-white/10 bg-[#0B0B0D] text-[#D9D4C7] relative pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#C7FF3D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Logo variant="primary" size="lg" onClick={() => onNavigate('/')} />
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              {studioConfig.brand.tagline}
            </p>
            <div className="space-y-1 font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D]" />
                <span>Studio Base: {studioConfig.contact.location}</span>
              </div>
              <div>{studioConfig.founder.role}: <span className="text-zinc-300">{studioConfig.founder.name}</span></div>
            </div>
          </div>

          {/* Navigation Column 1: Studio */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-[11px] font-mono tracking-[0.2em] text-[#C7FF3D] uppercase">
              Directory
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/work"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/work');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left inline-block"
                >
                  Work & Case Studies ↗
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left inline-block"
                >
                  Services ↗
                </a>
              </li>
              <li>
                <a
                  href="/process"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/process');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left inline-block"
                >
                  Process & Delivery ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Studio Insights & Legal */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-[11px] font-mono tracking-[0.2em] text-[#C7FF3D] uppercase">
              Studio & Engagement
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left inline-block"
                >
                  About the Studio ↗
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left inline-block"
                >
                  Journal & Perspectives ↗
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left text-[#C7FF3D] inline-block"
                >
                  Start a Project (Commission) ↗
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/privacy');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left text-zinc-500 text-xs inline-block"
                >
                  Privacy Policy
                </a>
                <span className="mx-2 text-zinc-700">·</span>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/terms');
                  }}
                  className="hover:text-[#C7FF3D] transition-colors cursor-pointer text-left text-zinc-500 text-xs inline-block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>

            {/* Social channels (only if verified) */}
            {activeSocials.length > 0 && (
              <div className="pt-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  Verified Social Channels
                </div>
                <div className="flex gap-3">
                  {activeSocials.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase text-zinc-400 hover:text-[#C7FF3D] transition-colors"
                    >
                      {platform} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} VEYRO Web & Digital Studio.</span>
            <span className="hidden sm:inline">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-zinc-600">
              Initial Focus: Delhi NCR & Interior Design
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-[#F3F0E8] hover:text-[#C7FF3D] transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
