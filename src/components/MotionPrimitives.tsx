import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  stop: () => void;
  start: () => void;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = ScrollTrigger.isTouch === 1;

    if (prefersReducedMotion || isTouch) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value: SmoothScrollContextValue = {
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target, offset = -64) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
  };

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

/**
 * Replicates the signature FIND `ScrubbedText` line-curtain wipe:
 * Each line renders inside an overflow-protected wrapper with a translucent
 * curtain bar that scales horizontally to 0 (`transformOrigin: right center`)
 * as it enters the viewport via GSAP ScrollTrigger.
 */
interface ScrubbedTextProps {
  children: React.ReactNode;
  className?: string;
  curtainColor?: string;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export function ScrubbedText({
  children,
  className = '',
  curtainColor = 'rgba(255, 255, 255, 0.85)',
  as: Tag = 'div',
}: ScrubbedTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const curtain = el.querySelector<HTMLElement>('[data-curtain]');
    if (!curtain) return;

    if (prefersReducedMotion) {
      curtain.style.transform = 'scaleX(0)';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtain,
        { scaleX: 1 },
        {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 1.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'center center',
            once: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={rootRef as React.RefObject<never>} className={`relative inline-block ${className}`}>
      <span className="relative z-0">{children}</span>
      <span
        data-curtain
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[-6%] left-0 right-[-1%] z-10 origin-right will-change-transform"
        style={{ backgroundColor: curtainColor, opacity: 0.88 }}
      />
    </Tag>
  );
}

/**
 * Signature clip-path inset wipe (`inset(0 100% 0 0) -> inset(0 0% 0 0)`)
 */
export function ClipReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          delay,
          ease: 'power3.out',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Subtle vertical image parallax inside an overflow-hidden frame
 */
export function ParallaxFrame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

/**
 * Tabular numeral counter triggered once on scroll
 */
export function StatCounter({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(
    decimals > 0 ? to.toFixed(decimals) : to.toLocaleString()
  );
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: to,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          setDisplay(
            decimals > 0
              ? counter.val.toFixed(decimals)
              : Math.round(counter.val).toLocaleString()
          );
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [to, decimals]);

  return (
    <span ref={elRef} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
