import { FC } from 'react';

export interface SectionHeaderProps {
  number?: string;
  category: string;
  title: string | React.ReactNode;
  description?: string;
  badge?: string;
  align?: 'left' | 'center' | 'between';
  className?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  description,
  badge,
  align = 'between',
  className = '',
}) => {
  return (
    <div
      className={`mb-12 sm:mb-16 ${
        align === 'between'
          ? 'flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12'
          : align === 'center'
          ? 'text-center max-w-3xl mx-auto'
          : 'max-w-3xl'
      } ${className}`}
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] shadow-[0_0_8px_#C7FF3D]" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#C7FF3D] uppercase">
            {number ? `${number} / ` : ''}{category}
          </span>
          {badge && (
            <span className="font-mono text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-sm">
              {badge}
            </span>
          )}
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-[#F3F0E8] leading-[0.98]">
          {title}
        </h2>
      </div>

      {description && (
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md shrink-0">
          {description}
        </p>
      )}
    </div>
  );
};
