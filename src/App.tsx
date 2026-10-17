import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { LabPage } from './pages/LabPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { Button } from './components/Button';
import { RoutePath } from './types';
import { Compass, ArrowLeft } from 'lucide-react';
import { portfolioProjects } from './data/portfolio';
import { studioAchievements } from './data/achievements';
import { validatePortfolioData } from './utils/portfolioValidator';
import { usePageSEO } from './utils/seo';

function NotFoundView({ currentPath, onNavigate }: { currentPath: string; onNavigate: (path: RoutePath) => void }) {
  usePageSEO({
    title: '404 // Page Not Found — VEYRO Studio',
    description: 'The requested page does not exist or may have been moved. Return to the VEYRO Web & Digital Studio homepage or explore our work.',
    path: currentPath,
    robots: 'noindex, nofollow',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 text-[#C7FF3D] font-mono text-xs uppercase tracking-wider">
        <Compass className="w-3.5 h-3.5" />
        <span>404 // Page Not Found</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-display font-medium text-[#F3F0E8] tracking-tight">
        Route <span className="text-[#C7FF3D]">{currentPath}</span> does not exist
      </h1>

      <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
        The requested page may have been moved, renamed, or is currently unavailable. Explore our studio work or start a project enquiry below.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button
          variant="primary"
          size="md"
          onClick={() => onNavigate('/')}
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
        >
          Return to Home
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => onNavigate('/work')}
        >
          Explore Work Portfolio ↗
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => onNavigate('/contact')}
        >
          Start a Project ↗
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    return (window.location.pathname as RoutePath) || '/';
  });

  // Run integrity verification on portfolio data
  useEffect(() => {
    const report = validatePortfolioData(portfolioProjects, studioAchievements);
    if (!report.isValid) {
      console.error('[VEYRO Portfolio Integrity Issues]:', report.errors);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = (window.location.pathname as RoutePath) || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: RoutePath) => {
    if (path === currentPath) return;
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Renderer
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/') {
      return <HomePage onNavigate={handleNavigate} />;
    }

    // 2. Services
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={handleNavigate} />;
    }

    // 3. About
    if (currentPath === '/about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    // 4. Process
    if (currentPath === '/process') {
      return <ProcessPage onNavigate={handleNavigate} />;
    }

    // 5. Work Directory (All projects & achievements)
    if (currentPath === '/work') {
      return <WorkPage onNavigate={handleNavigate} />;
    }

    // 6. Project Case Study Dynamic Route (/work/:slug)
    if (currentPath.startsWith('/work/')) {
      const slug = currentPath.replace('/work/', '').trim();
      return <CaseStudyPage slug={slug} onNavigate={handleNavigate} />;
    }

    // 7. Veyro Lab (4 Interactive Tools)
    if (currentPath === '/lab') {
      return <LabPage onNavigate={handleNavigate} />;
    }

    // 8. Veyro Journal / Blog Directory
    if (currentPath === '/blog') {
      return <BlogPage onNavigate={handleNavigate} />;
    }

    // 9. Individual Article Dynamic Route (/blog/:slug)
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').trim();
      return <ArticleDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    // 10. Contact & Project Commission Funnel
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    // 11. Privacy Policy
    if (currentPath === '/privacy') {
      return <PrivacyPage onNavigate={handleNavigate} />;
    }

    // 12. Terms of Service
    if (currentPath === '/terms') {
      return <TermsPage onNavigate={handleNavigate} />;
    }

    // 13. 404 / Route Fallback
    return <NotFoundView currentPath={currentPath} onNavigate={handleNavigate} />;
  };

  return (
    <Layout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderCurrentPage()}
    </Layout>
  );
}
