import { FC, useRef, useState, useEffect, ReactNode } from 'react';

export interface ProjectTiltCardProps {
  title: string;
  category: string;
  subtitle?: string;
  coverImage?: string;
  isConcept?: boolean;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

/**
 * Interactive 3D Perspective Tilt Card
 * Recreates the signature VEYRO project interaction with gyro/mouse tracking,
 * automatic reduced-motion detection, and strict concept badging.
 */
export const ProjectTiltCard: FC<ProjectTiltCardProps> = ({
  title,
  category,
  subtitle,
  coverImage,
  isConcept = true,
  className = '',
  onClick,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transform || undefined,
        transition: transform ? 'transform 0.08s ease-out' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#111113] p-7 transition-all duration-300 hover:border-[#C7FF3D]/50 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] cursor-pointer select-none ${className}`}
      data-cursor="VIEW"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,255,61,0.08),transparent_50%)] pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-4 mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D]" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            {category}
          </span>
        </div>

        {isConcept && (
          <span className="text-[10px] font-mono tracking-wider text-[#C7FF3D] bg-[#C7FF3D]/10 border border-[#C7FF3D]/25 px-2 py-0.5 rounded-xs uppercase">
            Concept Project
          </span>
        )}
      </div>

      {/* Card Body / Custom UI */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] tracking-tight group-hover:text-[#C7FF3D] transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        )}
        {coverImage && !children && (
          <div className="my-4 rounded-lg overflow-hidden border border-white/10 aspect-[16/9] relative">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
        {children}
      </div>

      {/* Footer link cue */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 relative z-10">
        <span>Explore Case Study</span>
        <span className="text-[#C7FF3D] text-sm">↗</span>
      </div>
    </div>
  );
};
