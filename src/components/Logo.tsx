import { FC } from 'react';

export interface LogoProps {
  variant?: 'primary' | 'icon' | 'mark-and-text';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asLink?: boolean;
  onClick?: () => void;
}

/**
 * Official VEYRO Brand Logo Component
 * Uses the approved vector SVG asset:
 * - /BRAND/LOGO/VEYRO-Icon-V.svg (Geometric monogram icon with Electric Lime accent)
 */
export const Logo: FC<LogoProps> = ({
  variant = 'primary',
  className = '',
  size = 'md',
  asLink = true,
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: { title: 'text-[13px]', sub: 'text-[8px]' },
    md: { title: 'text-[15px]', sub: 'text-[9px]' },
    lg: { title: 'text-[18px]', sub: 'text-[10px]' },
    xl: { title: 'text-[22px]', sub: 'text-[11px]' },
  };

  const content = (() => {
    const pxSizes = {
      sm: 24,
      md: 32,
      lg: 40,
      xl: 56,
    };

    if (variant === 'icon') {
      return (
        <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
          <img
            src="/logo.svg"
            alt="VEYRO Monogram"
            width={pxSizes[size]}
            height={pxSizes[size]}
            className={`${iconSizes[size]} object-contain select-none`}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    // Default primary & mark-and-text: Master brand lockup with official V-Icon image + Space Grotesk typography
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <img
          src="/logo.svg"
          alt="VEYRO"
          width={pxSizes[size]}
          height={pxSizes[size]}
          className={`${iconSizes[size]} object-contain select-none`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className={`font-display font-bold tracking-[0.22em] ${textSizes[size].title} text-[#F3F0E8] leading-none`}>
            VEYRO
          </span>
          <span className={`font-mono ${textSizes[size].sub} tracking-[0.18em] text-[#79766F] uppercase mt-1 leading-none`}>
            Web & Digital Studio
          </span>
        </div>
      </div>
    );
  })();

  if (asLink) {
    return (
      <a
        href="/"
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className="inline-flex items-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D] rounded-sm group"
        aria-label="VEYRO Studio Home"
      >
        {content}
      </a>
    );
  }

  return content;
};
