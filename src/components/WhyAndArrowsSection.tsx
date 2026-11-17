import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_ASSETS } from '../data/realEstateData';
import { ClipReveal, ScrubbedText } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

const ARROW_IMAGES = [
  SITE_ASSETS.suburbanAerial,
  SITE_ASSETS.vegasDesertEstate,
  SITE_ASSETS.archBalcony,
  SITE_ASSETS.archDarkFacade,
];

export function WhyAndArrowsSection() {
  const whyZoomRef = useRef<HTMLDivElement>(null);
  const whyCloudRef = useRef<HTMLDivElement>(null);
  const arrowsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const whyContainer = whyZoomRef.current;
    const whyCloud = whyCloudRef.current;
    const container = arrowsContainerRef.current;

    const ctx = gsap.context(() => {
      if (whyContainer) {
        gsap.fromTo(
          whyContainer,
          { scale: 0.9, opacity: 0.15 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whyContainer,
              start: 'top 92%',
              end: 'top 22%',
              scrub: 0.45,
            },
          }
        );
      }

      if (whyCloud) {
        gsap.fromTo(
          whyCloud,
          { y: '0%', scale: 1.05, opacity: 0.85 },
          {
            y: '-30%',
            scale: 1.25,
            opacity: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: whyZoomRef.current,
              start: 'top 90%',
              end: 'top 25%',
              scrub: 0.45,
            },
          }
        );
      }

      if (container) {
        const items = container.querySelectorAll('[data-scrub-arrow]');
        gsap.fromTo(
          items,
          { x: '-10%', scale: 0.8, opacity: 0.1 },
          {
            x: '0%',
            scale: 1,
            opacity: 1,
            stagger: 0.2,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'center center',
              scrub: 3,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Section 1: Why Elite Vegas Agent (Center-Aligned + Cloud Mist Reveal) */}
      <section id="why-elite-vegas" className="relative z-10 overflow-hidden bg-white py-20 lg:py-32">
        {/* Soft atmospheric cloud bank parting as Why Elite Vegas Agent zooms in */}
        <div
          ref={whyCloudRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[44vh] overflow-hidden will-change-transform"
        >
          <SafeImage
            src={SITE_ASSETS.heroSmoke}
            alt=""
            className="h-full w-full rotate-180 object-cover object-bottom opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-transparent" />
        </div>

        <div
          ref={whyZoomRef}
          className="relative z-10 mx-auto max-w-[1440px] origin-center px-6 text-center will-change-transform lg:px-12"
        >
          <div className="mx-auto mb-14 max-w-4xl text-center lg:mb-20">
            <h2 className="text-sm font-semibold tracking-tight text-[#151717] md:text-lg">
              Why Elite Vegas Agent
            </h2>

            <ScrubbedText
              as="p"
              curtainColor="rgba(255, 255, 255, 0.9)"
              className="mx-auto mt-5 text-balance text-center text-[clamp(1.75rem,3.3vw,3.45rem)] font-medium leading-[1.16] tracking-[-0.03em] text-[#151717]"
            >
              Christina L. Unruh has been serving the Greater Las Vegas Valley since 2002.{' '}
              <span className="text-[#b3b3b3]">
                Whether you’re selling or buying a home, Elite Vegas Agent has all the tips, tools,
                and resources to produce winning results.
              </span>
            </ScrubbedText>
          </div>

          {/* Full-width looping Las Vegas video (.why-us_preview) */}
          <ClipReveal>
            <div className="aspect-[365/450] w-full overflow-hidden bg-[#f6f4f0] md:aspect-[16/10] lg:h-[78vh]">
              <video
                src={SITE_ASSETS.whyUsVideo}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* Section 2: Arrows Section */}
      <section className="relative z-10 overflow-hidden bg-white py-16 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex justify-center">
            <ScrubbedText
              as="h2"
              curtainColor="rgba(255, 255, 255, 0.9)"
              className="mx-auto text-center text-[clamp(2.4rem,4.8vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.04em] text-[#151717]"
            >
              This isn’t just <span className="text-[#b3b3b3]">about real estate.</span>
            </ScrubbedText>
          </div>

          <div
            ref={arrowsContainerRef}
            className="my-12 flex items-center justify-center pl-4 md:my-20 md:pl-14"
            aria-hidden="true"
          >
            {ARROW_IMAGES.map((imgSrc, idx) => (
              <div
                key={idx}
                data-scrub-arrow={idx > 0 ? 'true' : undefined}
                className="arrow-chevron-mask -ml-4 h-28 w-24 shrink-0 overflow-hidden bg-[#151717] sm:h-48 sm:w-40 md:-ml-12 md:h-72 md:w-60 lg:-ml-16 lg:h-[27rem] lg:w-[21.5rem]"
              >
                <SafeImage src={imgSrc} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <p className="mx-auto max-w-3xl text-balance text-center text-xl font-medium leading-[1.35] tracking-[-0.015em] text-[#151717] md:text-[2rem]">
            It’s about identity. Progress. Getting unstuck.{' '}
            <span className="text-[#b3b3b3]">
              You’re not just looking for a place. You’re looking for alignment. That’s what
              Elite Vegas Agent helps you find.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
