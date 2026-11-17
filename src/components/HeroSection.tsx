import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { SITE_ASSETS } from '../data/realEstateData';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenSearch: () => void;
}

export function HeroSection({ onOpenSearch }: HeroSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);
  const compositeRef = useRef<HTMLDivElement>(null);
  const compositeHouseRef = useRef<HTMLDivElement>(null);
  const cloudLeftRef = useRef<HTMLDivElement>(null);
  const cloudRightRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<HTMLDivElement>(null);
  const subFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Entry choreography (exact match to findrealestate.com mount timeline)
      const entryTl = gsap.timeline({ delay: 0.15 });

      if (titleWordsRef.current) {
        const words = titleWordsRef.current.querySelectorAll('[data-hero-word]');
        entryTl.fromTo(
          words,
          { y: '115%' },
          { y: '0%', duration: 1.8, stagger: 0.1, ease: 'power4.out' },
          0
        );
      }

      if (subFadeRef.current) {
        entryTl.fromTo(
          subFadeRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.6, stagger: 0.1, ease: 'expo.out' },
          0.35
        );
      }

      if (skyRef.current) {
        entryTl.from(skyRef.current, { scale: 1.1, duration: 4.5, ease: 'expo.out' }, 0);
      }
      if (cloudLeftRef.current) {
        entryTl.from(cloudLeftRef.current, { y: '50%', duration: 3, ease: 'expo.out' }, 0);
      }
      if (cloudRightRef.current) {
        entryTl.from(cloudRightRef.current, { y: '100%', duration: 3.8, ease: 'expo.out' }, 0.1);
      }
      const houseImgs = [
        houseRef.current?.querySelector('img'),
        compositeHouseRef.current?.querySelector('img'),
      ].filter(Boolean);
      if (houseImgs.length > 0) {
        entryTl.from(houseImgs, { opacity: 0, duration: 0.6 }, 0.2);
        entryTl.from(houseImgs, { y: '10%', duration: 3, ease: 'expo.out' }, 0.2);
      }

      // 2. Scroll-scrubbed multi-layer choreography (exact match to findrealestate.com)
      const scrollTl = gsap.timeline();

      scrollTl.to(
        [houseRef.current, compositeHouseRef.current],
        { y: '-40%', scale: 1.3, duration: 1, ease: 'none' },
        0
      );
      scrollTl.to(smokeRef.current, { y: '0%', duration: 1, ease: 'none' }, 0);
      scrollTl.to(cloudLeftRef.current, { x: '-15%', duration: 1, ease: 'none' }, 0);
      scrollTl.to(cloudRightRef.current, { x: '15%', duration: 1, ease: 'none' }, 0);
      scrollTl.to(
        contentRef.current,
        { y: '20%', scale: 0.9, duration: 1, ease: 'none' },
        0
      );
      scrollTl.to(contentRef.current, { opacity: 0, duration: 0.2, ease: 'none' }, 0);

      // Outline SVG draw -> fade out -> reveal building masked inside ELITE VEGAS AGENT
      scrollTl.to(logoRef.current, { opacity: 1, duration: 0.02 }, 0.1);
      if (logoRef.current) {
        const outlineTexts = logoRef.current.querySelectorAll<SVGTextElement>('[data-draw-text]');
        outlineTexts.forEach((node) => {
          gsap.set(node, { strokeDasharray: 1400, strokeDashoffset: 1400 });
        });
        scrollTl.to(
          outlineTexts,
          { strokeDashoffset: 0, duration: 0.3, ease: 'none' },
          0.1
        );
      }
      scrollTl.to(logoRef.current, { opacity: 0, duration: 0.2 }, 0.28);
      scrollTl.to(compositeRef.current, { opacity: 1, duration: 0.12 }, 0.3);
      scrollTl.to(houseRef.current, { opacity: 0, duration: 0.12 }, 0.3);
      scrollTl.add(() => {}, 1);

      ScrollTrigger.create({
        trigger: root,
        animation: scrollTl,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative -mb-[100vh] h-[350vh] w-full md:h-[500vh]"
    >
      {/* Sticky full-viewport stage (.hero_top) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Layer 0: Pastel Sunset Sky (.hero_back) */}
          <div ref={skyRef} className="absolute inset-0 will-change-transform">
            <SafeImage
              src={SITE_ASSETS.heroSky}
              alt="Soft pastel dawn sky"
              loading="eager"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Layer 1: Rising Architectural Building (.hero_house) */}
          <div
            ref={houseRef}
            className="absolute inset-x-0 top-[56vh] z-[1] h-[55vh] origin-bottom md:top-[48vh] md:h-[135vh]"
          >
            <SafeImage
              src={SITE_ASSETS.heroHouse}
              alt="Terraced luxury residential architecture"
              loading="eager"
              className="h-full w-full object-contain object-top"
            />
          </div>

          {/* Layer 2: Masked Building Composite inside ELITE VEGAS AGENT (.hero_composite) */}
          <div
            ref={compositeRef}
            className="hero-composite-mask absolute inset-0 z-[1] opacity-0"
          >
            <div
              ref={compositeHouseRef}
              className="absolute inset-x-0 top-[56vh] h-[55vh] origin-bottom md:top-[48vh] md:h-[135vh]"
            >
              <SafeImage
                src={SITE_ASSETS.heroHouseAlt}
                alt=""
                loading="eager"
                className="h-full w-full object-contain object-top"
              />
            </div>
          </div>

          {/* Layer 3: Drifting Left & Right Clouds (.hero_clouds) */}
          <div className="absolute inset-0 z-[2]">
            <div
              ref={cloudLeftRef}
              className="absolute -left-[42vw] top-[32%] h-[28vh] w-[75vw] md:-left-[18vw] md:top-[22%] md:h-[46vh] md:w-[58vw]"
            >
              <SafeImage
                src={SITE_ASSETS.heroCloud}
                alt=""
                loading="eager"
                className="h-full w-full object-contain"
              />
            </div>
            <div
              ref={cloudRightRef}
              className="absolute -right-[35vw] top-[35%] h-[24vh] w-[62vw] md:-right-[18vw] md:top-[18%] md:h-[38vh] md:w-[49vw]"
            >
              <SafeImage
                src={SITE_ASSETS.heroCloud}
                alt=""
                loading="eager"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Layer 4: Drawn White Outline SVG Wordmark (.hero_logo) */}
          <div
            ref={logoRef}
            className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center opacity-0"
          >
            <svg
              viewBox="0 0 977 423"
              className="w-[86vw] max-w-[977px] overflow-visible"
              aria-hidden="true"
            >
              <text
                data-draw-text
                x="488.5"
                y="210"
                textAnchor="middle"
                fontFamily="Instrument Sans, Arial Black, sans-serif"
                fontWeight="800"
                fontSize="220"
                letterSpacing="-10"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
              >
                ELITE
              </text>
              <text
                data-draw-text
                x="488.5"
                y="340"
                textAnchor="middle"
                fontFamily="Instrument Sans, Arial, sans-serif"
                fontWeight="700"
                fontSize="92"
                letterSpacing="8"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              >
                VEGAS AGENT
              </text>
            </svg>
          </div>

          {/* Layer 5: Rising Bottom Smoke/Mist (.hero_smoke) */}
          <div
            ref={smokeRef}
            style={{ transform: 'translateY(70%)' }}
            className="absolute inset-x-0 bottom-0 z-[3] h-[44vh] md:h-[62vh]"
          >
            <SafeImage
              src={SITE_ASSETS.heroSmoke}
              alt=""
              loading="eager"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        {/* Hero Center Typography & Primary CTA (.hero_content) */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-6 pb-28 text-center text-[#151717] md:pb-36 lg:px-12"
        >
          <div ref={titleWordsRef}>
            <h1 className="max-w-[12ch] text-balance text-[clamp(3.35rem,8.8vw,8.75rem)] font-bold leading-[0.98] tracking-[-0.03em] text-[#151717]">
              <span className="inline-block overflow-hidden py-1 align-top">
                <span data-hero-word className="inline-block">
                  Find
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden py-1 align-top">
                <span data-hero-word className="inline-block">
                  What
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden py-1 align-top">
                <span data-hero-word className="inline-block">
                  Moves
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden py-1 align-top">
                <span data-hero-word className="inline-block">
                  You
                </span>
              </span>
            </h1>
          </div>

          <div ref={subFadeRef} className="mt-6 flex flex-col items-center">
            <p className="max-w-3xl text-balance text-lg font-semibold leading-[1.3] tracking-[-0.015em] text-white drop-shadow-[0_2px_16px_rgba(15,17,17,0.45)] md:text-[2rem] lg:text-[2.2rem]">
              Christina L. Unruh · Las Vegas Residential Listings & Sales.{' '}
              <span className="font-medium text-white/90">
                Winning results for home sellers and buyers.
              </span>
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={onOpenSearch}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#151717] px-7 py-3.5 text-sm font-medium tracking-tight text-white transition-colors duration-200 hover:bg-[#2d3030] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#151717]"
              >
                <span>View Listings</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition smoke + white gradient melt (.hero_bottom / .hero_overlay) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[100vh] top-0">
        <div className="sticky top-[calc(100vh-30vh)] h-[30vh] w-full overflow-hidden">
          <SafeImage
            src={SITE_ASSETS.heroSmoke}
            alt=""
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>
      </div>
    </section>
  );
}
