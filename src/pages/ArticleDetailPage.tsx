import { FC, useState, useEffect } from 'react';
import { RoutePath } from '../types';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { Button } from '../components/Button';
import { usePageSEO, getCanonicalOrigin } from '../utils/seo';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  ArrowUpRight,
  BookOpen,
  Sparkles,
  Quote
} from 'lucide-react';

export interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: RoutePath) => void;
}

export const ArticleDetailPage: FC<ArticleDetailPageProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const article = getArticleBySlug(slug);
  const baseOrigin = getCanonicalOrigin();

  usePageSEO({
    title: article
      ? `${article.seoTitle || article.title} — VEYRO Journal`
      : 'Perspective Not Found — VEYRO Journal',
    description: article
      ? article.seoDescription || article.summary
      : 'The requested article could not be found in our journal perspectives directory.',
    path: `/blog/${slug}`,
    image: article?.coverImage || '/og.svg',
    type: 'article',
    robots: article ? 'index, follow' : 'noindex, nofollow',
    schema: article
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.summary,
          articleSection: article.category,
          keywords: article.tags.join(', '),
          image: article.coverImage ? `${baseOrigin}${article.coverImage}` : `${baseOrigin}/og.svg`,
          author: {
            '@type': 'Organization',
            name: article.author.name,
            url: baseOrigin,
          },
          publisher: {
            '@type': 'Organization',
            name: 'VEYRO Web & Digital Studio',
            logo: {
              '@type': 'ImageObject',
              url: `${baseOrigin}/favicon.svg`,
            },
          },
          datePublished: '2026-10-01',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseOrigin}/blog/${article.slug}`,
          },
        }
      : null,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // 1. Not Found Graceful Fallback
  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase">
          <span>Article Not Found</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-medium text-[#F3F0E8]">
          Perspective "{slug}" does not exist.
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          The requested article may have been moved, renamed, or is currently in draft. Please explore our active journal articles.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="md" onClick={() => onNavigate('/blog')}>
            ← Return to Journal
          </Button>
          <Button variant="secondary" size="md" onClick={() => onNavigate('/work')}>
            Explore Work Directory ↗
          </Button>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.relatedSlugs);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* 1. Top Navigation & Action Row */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <button
          type="button"
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal Index</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              copied
                ? 'bg-[#C7FF3D]/20 border-[#C7FF3D] text-[#C7FF3D]'
                : 'bg-[#111113] border-white/10 text-zinc-400 hover:text-[#F3F0E8] hover:border-white/20'
            }`}
            title="Copy article link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C7FF3D]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2.5 py-1 rounded-xs uppercase tracking-wider">
            {article.category}
          </span>
          <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C7FF3D]" />
            {article.readTime}
          </span>
          <span className="font-mono text-xs text-zinc-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[1.05]">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed border-l-2 border-[#C7FF3D]/50 pl-4 py-1 italic bg-[#111113]/40 rounded-r-lg">
          {article.summary}
        </p>

        {/* Author Byline */}
        <div className="pt-4 flex items-center gap-3 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 flex items-center justify-center font-mono text-sm text-[#C7FF3D] font-bold">
            V
          </div>
          <div>
            <div className="text-sm font-mono text-[#F3F0E8] font-medium">{article.author.name}</div>
            <div className="text-xs font-mono text-zinc-500">{article.author.role} · VEYRO Studio Perspectives</div>
          </div>
        </div>
      </header>

      {/* Editorial Cover Showcase */}
      {article.coverImage && (
        <div className="space-y-3">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111113] relative shadow-2xl">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 px-1">
            <span>EDITORIAL PERSPECTIVE · HIGH-RESOLUTION ARCHITECTURAL ESSAY</span>
            <span className="text-[#C7FF3D] uppercase">{article.category}</span>
          </div>
        </div>
      )}

      {/* 3. Article Body Content */}
      <article className="space-y-12 text-[#EDE9DD] leading-relaxed font-sans text-base sm:text-lg">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            {section.heading && (
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] pt-4 tracking-tight">
                {section.heading}
              </h2>
            )}

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-zinc-300 leading-relaxed font-normal">
                {p}
              </p>
            ))}

            {/* Stylized Architectural Callout / Quote */}
            {section.callout && (
              <div className="my-6 p-6 rounded-xl border border-[#C7FF3D]/25 bg-[#111113] relative overflow-hidden">
                <Quote className="w-8 h-8 text-[#C7FF3D]/20 absolute right-4 top-4 pointer-events-none" />
                <p className="text-[#F3F0E8] text-base sm:text-lg font-serif italic leading-relaxed">
                  "{section.callout}"
                </p>
              </div>
            )}

            {/* Bullet / Check Points */}
            {section.list && (
              <ul className="space-y-3 pl-2 py-2">
                {section.list.map((item, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Key Takeaway Box */}
            {section.keyTakeaway && (
              <div className="p-5 rounded-lg border border-white/10 bg-[#141417] space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#C7FF3D] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Key Takeaway
                </div>
                <div className="text-sm sm:text-base text-zinc-200 font-sans">
                  {section.keyTakeaway}
                </div>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* 4. Tags Footer */}
      <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">Filed under:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-zinc-400 bg-[#111113] px-2.5 py-1 rounded-xs border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopyLink}
          className="font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Copy Article Link</span>
        </button>
      </div>

      {/* 5. Studio Commission Banner */}
      <section className="rounded-2xl border border-white/10 bg-[#111113] p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7FF3D]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C7FF3D]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Showroom Commission</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] tracking-tight">
            Ready to turn online attention into verified client enquiries?
          </h3>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Whether you are an established interior design practice in Delhi NCR or a growing business, we build digital assets that establish unshakeable authority.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/contact')}
              icon={<ArrowUpRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Start a Project
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate('/lab')}
            >
              Generate AI Website Brief ↗
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-medium text-[#F3F0E8]">
              Related Perspectives
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="text-xs font-mono text-[#C7FF3D] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View all</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/blog/${rel.slug}` as RoutePath)}
                className="group p-6 rounded-xl border border-white/10 bg-[#111113] hover:border-[#C7FF3D]/40 transition-all duration-300 cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="text-[#C7FF3D] text-[10px] uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <span>{rel.readTime}</span>
                </div>
                <h4 className="text-lg font-display font-medium text-[#F3F0E8] group-hover:text-[#C7FF3D] transition-colors leading-snug">
                  {rel.title}
                </h4>
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                  {rel.summary}
                </p>
                <div className="pt-2 text-xs font-mono text-[#C7FF3D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read perspective</span>
                  <span>↗</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
