import { FC, useEffect, useState, useRef } from 'react';

/**
 * Signature VEYRO Custom Cursor
 * Dual-ring smooth lerp follower with difference blend mode and interactive expansion.
 * Automatically disabled on touch screens and under reduced motion settings.
 */
export const Cursor: FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const reqId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on pointer fine (mouse/trackpad) and when reduced motion is NOT active
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, select, textarea, [data-cursor]');
      if (interactive) {
        setHovered(true);
        const label = interactive.getAttribute('data-cursor');
        setCursorText(label || null);
      } else {
        setHovered(false);
        setCursorText(null);
      }
    };

    const animate = () => {
      // Lerp ring position toward mouse position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      reqId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onPointerOver, { passive: true });
    reqId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onPointerOver);
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden mix-blend-difference" aria-hidden="true">
      {/* Outer Lerping Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-[17px] -mt-[17px] rounded-full border border-white flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ease-out ${
          hovered
            ? 'w-[56px] h-[56px] -ml-[28px] -mt-[28px] bg-white/10 border-[#C7FF3D]'
            : 'w-[34px] h-[34px]'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-[#0B0B0D] bg-[#C7FF3D] px-1.5 py-0.5 rounded-xs uppercase font-bold">
            {cursorText}
          </span>
        )}
      </div>

      {/* Immediate Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[2.5px] -mt-[2.5px] w-[5px] h-[5px] rounded-full bg-white transition-opacity duration-150"
      />
    </div>
  );
};
