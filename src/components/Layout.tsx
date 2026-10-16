import { FC, ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Cursor } from './Cursor';
import { ScrollProgress } from './ScrollProgress';
import { RoutePath } from '../types';

export interface LayoutProps {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

/**
 * Global Studio Shell Layout
 * Integrates Skip Link, ScrollProgress, Cursor, Navigation, and Footer.
 */
export const Layout: FC<LayoutProps> = ({ children, currentPath, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F3F0E8] flex flex-col relative selection:bg-[#C7FF3D] selection:text-[#0B0B0D]">
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] bg-[#C7FF3D] text-[#0B0B0D] px-4 py-2 font-mono text-xs font-bold rounded shadow-lg outline-none"
      >
        Skip to main content
      </a>

      {/* Signature Cursor & Scroll Progress */}
      <Cursor />
      <ScrollProgress />

      {/* Global Navigation Header */}
      <Navigation currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main Viewport Content Landmark */}
      <main id="main-content" className="flex-1 w-full pt-20 sm:pt-24 focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
