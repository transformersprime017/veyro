import React, { FC, useRef, useState, useEffect } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'lime-outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Reusable VEYRO Button Component
 * Supports keyboard accessibility, magnetic hover physics, and reduced-motion detection.
 */
export const Button: FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  href,
  isExternal = false,
  magnetic = true,
  icon,
  iconPosition = 'right',
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || reducedMotion || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.18, y: y * 0.18 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2.5 font-sans font-medium transition-all duration-300 select-none cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 tracking-wide',
    md: 'text-xs sm:text-sm px-5 py-2.5 tracking-wide',
    lg: 'text-sm sm:text-base px-7 py-3.5 tracking-wider',
  };

  const variantStyles = {
    primary:
      'bg-[#C7FF3D] text-[#0B0B0D] font-semibold border border-[#C7FF3D] hover:bg-[#d4ff63] hover:shadow-[0_0_24px_rgba(199,255,61,0.28)] hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-[#111113] text-[#F3F0E8] border border-white/15 hover:border-[#C7FF3D] hover:text-[#C7FF3D] hover:-translate-y-0.5 active:translate-y-0',
    'lime-outline':
      'bg-transparent text-[#C7FF3D] border border-[#C7FF3D]/50 hover:border-[#C7FF3D] hover:bg-[#C7FF3D]/10 hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-[#D9D4C7] hover:text-[#C7FF3D] hover:bg-white/5 active:bg-white/10',
  };

  const transformStyle =
    magnetic && !reducedMotion && (offset.x !== 0 || offset.y !== 0)
      ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
      : undefined;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      disabled={disabled}
      className={combinedClasses}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};
