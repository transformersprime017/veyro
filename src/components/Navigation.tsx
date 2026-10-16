import { FC, useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { RoutePath } from '../types';

export interface NavigationProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

export const Navigation: FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks: { label: string; path: RoutePath; badge?: string }[] = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'Process', path: '/process' },
    { label: 'Lab', path: '/lab', badge: 'Tools' },
    { label: 'About', path: '/about' },
    { label: 'Journal', path: '/blog' },
  ];

  const handleLinkClick = (path: RoutePath) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0D]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with official SVG */}
          <div className="flex items-center">
            <Logo
              variant="primary"
              size="md"
              onClick={() => handleLinkClick('/')}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider text-[#D9D4C7]"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleLinkClick(item.path)}
                  className={`group relative py-1 transition-colors hover:text-[#C7FF3D] cursor-pointer focus-visible:ring-1 focus-visible:ring-[#C7FF3D] rounded-xs ${
                    isActive ? 'text-[#C7FF3D] font-medium' : 'text-[#D9D4C7]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge && (
                      <span className="text-[9px] bg-[#C7FF3D]/15 text-[#C7FF3D] px-1.5 py-0.2 rounded-xs border border-[#C7FF3D]/30 tracking-tight">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C7FF3D] rounded-full shadow-[0_0_8px_#C7FF3D]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleLinkClick('/contact')}
              className="text-xs"
            >
              Start a project ↗
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F3F0E8] hover:text-[#C7FF3D] transition-colors focus-visible:ring-2 focus-visible:ring-[#C7FF3D] rounded"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden fixed inset-0 top-[65px] bg-[#0B0B0D]/98 backdrop-blur-xl border-t border-white/10 z-50 flex flex-col justify-between p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="space-y-6 pt-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#79766F] uppercase border-b border-white/10 pb-2">
              Studio Navigation
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleLinkClick(item.path)}
                    className={`flex items-center justify-between text-2xl font-display font-medium text-left transition-colors ${
                      isActive ? 'text-[#C7FF3D]' : 'text-[#F3F0E8] hover:text-[#C7FF3D]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-zinc-500">
                      {item.badge ? `[${item.badge}]` : '↗'}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => handleLinkClick('/contact')}
            >
              Start a project ↗
            </Button>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>DELHI NCR · WEB & DIGITAL STUDIO</span>
              <span>© 2026 VEYRO</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
