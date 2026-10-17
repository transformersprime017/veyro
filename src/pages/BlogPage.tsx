import { FC, useState, useMemo, useEffect } from 'react';
import { RoutePath } from '../types';
import { getPublishedArticles, getFeaturedArticle } from '../data/articles';
import { Button } from '../components/Button';
import { usePageSEO } from '../utils/seo';
import { 
  Search, 
  X, 
  ArrowRight, 
  Clock, 
  Calendar, 
  BookOpen, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export interface BlogPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const BlogPage: FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  usePageSEO({
    title: 'Journal & Perspectives — VEYRO Web & Digital Studio',
    description: 'Architectural essays, conversion strategy guides, and engineering insights on web design for interior designers and modern businesses.',
    path: '/blog',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const allArticles = useMemo(() => getPublishedArticles(), []);
  const featuredArticle = useMemo(() => getFeaturedArticle(), []);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'Interior Design', label: 'Interior Design' },
    { id: 'Web Strategy', label: 'Web Strategy' },
    { id: 'Engineering', label: 'Engineering' },
  ];

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        article.sections.some((sec) =>
          sec.paragraphs.some((p) => p.toLowerCase().includes(q))
        );

      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      
      {/* 1. Page Header */}
      <section className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 text-[#C7FF3D] font-mono text-xs uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>VEYRO Journal & Perspectives</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F3F0E8] tracking-tight leading-[0.98]">
          Perspectives on digital craft & conversion.
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 font-sans leading-relaxed max-w-2xl">
          Essays, architectural breakdowns, and strategic guides on modern web engineering, luxury spatial presentation, and turning digital attention into high-ticket enquiries.
        </p>
      </section>

      {/* 2. Controls Bar: Category Filter & Instant Search */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all'
                ? allArticles.length
                : allArticles.filter((a) => a.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#C7FF3D] text-[#0B0B0D] font-bold shadow-[0_0_15px_rgba(199,255,61,0.2)]'
                      : 'bg-[#111113] text-zinc-400 hover:text-[#F3F0E8] hover:bg-[#18181B] border border-white/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#0B0B0D]/20 text-[#0B0B0D]' : 'bg-white/10 text-zinc-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perspectives, topics, tags..."
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-[#111113] border border-white/10 text-sm text-[#F3F0E8] placeholder:text-zinc-600 focus:outline-hidden focus:border-[#C7FF3D]/60 font-sans transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Featured Article Spotlight (shown when not filtered by active search or when viewing 'all' / matching category) */}
      {!searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="relative overflow-hidden rounded-2xl border border-[#C7FF3D]/30 bg-gradient-to-br from-[#111113] via-[#0B0B0D] to-[#18181B] p-6 sm:p-10 lg:p-12 group hover:border-[#C7FF3D]/50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-[#C7FF3D]/8 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#C7FF3D]/12 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className={`${featuredArticle.coverImage ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-[#0B0B0D] bg-[#C7FF3D] px-2.5 py-1 rounded-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Featured Editorial
                </span>
                <span className="font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xs uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C7FF3D]" />
                  {featuredArticle.readTime}
                </span>
                <span className="font-mono text-xs text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredArticle.publishedDate}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-medium text-[#F3F0E8] tracking-tight group-hover:text-[#C7FF3D] transition-colors duration-300">
                {featuredArticle.title}
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
                {featuredArticle.summary}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {featuredArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-zinc-400 bg-[#18181B] px-2 py-0.5 rounded-xs border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 flex items-center justify-center font-mono text-xs text-[#C7FF3D] font-bold">
                    V
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-200 font-medium">{featuredArticle.author.name}</div>
                    <div className="text-[10px] font-mono text-zinc-500">{featuredArticle.author.role}</div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate(`/blog/${featuredArticle.slug}` as RoutePath)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Read Full Perspective
                </Button>
              </div>
            </div>

            {featuredArticle.coverImage && (
              <div className="lg:col-span-5 rounded-xl overflow-hidden border border-white/10 relative group/img shadow-2xl">
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#0B0B0D]">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-zinc-300 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded border border-white/10">
                  <span>EDITORIAL PHOTOGRAPHY</span>
                  <span className="text-[#C7FF3D]">ESSAY SPEC</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Articles Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-400 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#C7FF3D]" />
            <span>
              {searchQuery
                ? `Search Results (${filteredArticles.length})`
                : selectedCategory === 'all'
                ? 'All Studio Perspectives'
                : `${selectedCategory} (${filteredArticles.length})`}
            </span>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-mono text-[#C7FF3D] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          /* Empty / No Results State */
          <div className="rounded-xl border border-white/10 bg-[#111113] p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-zinc-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-medium text-[#F3F0E8]">
              No perspectives match your query
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We couldn't find any articles matching "{searchQuery}". Try searching for broader terms like "interior", "conversion", or "design".
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="font-mono text-xs text-[#0B0B0D] bg-[#C7FF3D] px-4 py-2 rounded-full font-bold hover:bg-[#d4ff63] transition-colors cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onNavigate(`/blog/${article.slug}` as RoutePath)}
                className="group rounded-xl border border-white/10 bg-[#111113] hover:border-[#C7FF3D]/40 transition-all duration-300 p-6 flex flex-col justify-between hover:bg-[#151518] cursor-pointer relative overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C7FF3D] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Article Cover Image */}
                {article.coverImage && (
                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 bg-[#0B0B0D] mb-4">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                <div className="space-y-4">
                  {/* Meta row */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span className="text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/20 px-2 py-0.5 rounded-xs uppercase tracking-wider text-[10px]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-medium text-[#F3F0E8] group-hover:text-[#C7FF3D] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-500 bg-black/40 px-2 py-0.5 rounded-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with author and read link */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">
                    {article.author.name}
                  </span>
                  <span className="text-[#C7FF3D] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5. Editorial Callout / Studio Bridge */}
      <section className="rounded-2xl border border-white/10 bg-[#111113] p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#C7FF3D]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C7FF3D]">
            Studio Commission & Dialogue
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-[#F3F0E8] tracking-tight">
            Need a digital showroom engineered to convert high-ticket clients?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We work with interior design studios, architects, and high-standard businesses across Delhi NCR and internationally to replace generic template energy with architectural digital authority.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/contact')}
              icon={<ArrowUpRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Start a Project Commission
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate('/lab')}
            >
              Explore Interactive Lab Tools ↗
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
