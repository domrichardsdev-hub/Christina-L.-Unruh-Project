import { useState } from 'react';
import { Star } from 'lucide-react';
import { SITE_ASSETS, TESTIMONIALS } from '../data/realEstateData';
import { ClipReveal, ScrubbedText } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

const TESTIMONIAL_IMAGES = [
  SITE_ASSETS.vegasDesertEstate,
  SITE_ASSETS.vegasStripSkyline,
  SITE_ASSETS.archDarkFacade,
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="relative z-10 bg-[#f1f1f1] py-20 text-[#151717] lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <ScrubbedText
          as="h2"
          curtainColor="rgba(241, 241, 241, 0.9)"
          className="mb-12 text-balance text-[clamp(2.4rem,4.6vw,4.75rem)] font-medium leading-[1.0] tracking-[-0.04em] text-[#151717] lg:mb-20"
        >
          Don’t Take <span className="text-[#b3b3b3]">Our Word for It.</span>
        </ScrubbedText>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ClipReveal>
              <div className="aspect-[400/365] w-full overflow-hidden bg-[#e6e4df] lg:aspect-[976/688]">
                <SafeImage
                  src={TESTIMONIAL_IMAGES[activeIndex]}
                  alt={`Las Vegas residence purchased by ${current.author}`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              </div>
            </ClipReveal>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-between border-t border-[#151717]/20 pt-8">
              <div className="flex items-center gap-3">
                {TESTIMONIALS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Show testimonial ${idx + 1} by ${item.author}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`tabular-nums inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition-all duration-200 md:h-11 md:w-11 ${
                        isActive
                          ? 'border-[#151717] text-[#151717]'
                          : 'border-[#b3b3b3] text-[#b3b3b3] hover:scale-95 hover:border-[#151717] hover:text-[#151717]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <svg
                width="36"
                height="36"
                viewBox="0 0 49 49"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-[#151717]"
              >
                <path
                  fill="currentColor"
                  d="M10.72 20.9.16 10.34 10.72 0l10.34 10.34L1.48 48.4.16 47.08 10.72 20.9Zm27.94 0L28.1 10.34 38.66 0 49 10.34 29.42 48.4l-1.32-1.32L38.66 20.9Z"
                />
              </svg>
            </div>

            <blockquote className="mt-10 min-h-[170px] lg:mt-14">
              <p className="font-serif-editorial text-xl font-normal leading-[1.3] tracking-[-0.02em] text-[#151717] md:text-[1.9rem]">
                “{current.quote}”
              </p>
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-12">
              <span className="font-serif-editorial text-sm font-medium uppercase tracking-wide text-[#151717] md:text-base">
                {current.author}
              </span>
              <span className="font-serif-editorial text-sm text-[#151717]" aria-hidden="true">
                /
              </span>
              <div className="flex items-center gap-1 text-[#151717]" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-[#5d6363]">{current.context}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
