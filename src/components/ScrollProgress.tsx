import { FC, useEffect, useState } from 'react';

/**
 * Global Scroll Progress Indicator
 * Fixed 2px bar at the top with Electric Lime glow.
 */
export const ScrollProgress: FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-[#C7FF3D] z-50 transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(199,255,61,0.8)] pointer-events-none"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
};
