import { ArrowRight } from 'lucide-react';
import { REWIRED_STEPS, SITE_ASSETS } from '../data/realEstateData';
import { ClipReveal, ParallaxFrame, ScrubbedText } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface RewiredAndAgentsSectionProps {
  onOpenSearch: () => void;
  onOpenAgentModal: () => void;
}

export function RewiredAndAgentsSection({
  onOpenSearch,
  onOpenAgentModal,
}: RewiredAndAgentsSectionProps) {
  return (
    <>
      {/* Section 3: Real Estate, Rewired */}
      <section className="relative z-10 bg-white py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="flex flex-col items-start gap-7 lg:col-span-4">
            <ScrubbedText
              as="h2"
              curtainColor="rgba(255, 255, 255, 0.9)"
              className="max-w-[10ch] text-balance text-[clamp(2.5rem,4.6vw,4.75rem)] font-medium leading-[1.0] tracking-[-0.04em] text-[#151717]"
            >
              Real Estate, <span className="text-[#b3b3b3]">Rewired.</span>
            </ScrubbedText>

            <button
              type="button"
              onClick={onOpenSearch}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#151717] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d3030]"
            >
              <span>Start Your Search</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:col-span-8">
            <p className="mb-8 text-xl font-medium tracking-[-0.01em] text-[#151717] md:text-[2rem]">
              Steps:
            </p>

            <div className="border-b border-[#151717]/10">
              {REWIRED_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col gap-4 border-t border-[#151717]/10 py-8 md:flex-row md:items-baseline md:gap-12 lg:py-10"
                >
                  <span className="tabular-nums shrink-0 text-base font-medium text-[#b3b3b3] md:text-lg">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.65rem,2.9vw,2.9rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#151717]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-[#5d6363]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: For Home Sellers (Christina L. Unruh) */}
      <section id="for-agents" className="relative z-10 bg-white py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="hidden flex-col justify-between lg:col-span-4 lg:flex">
            <h2 className="text-lg font-semibold tracking-tight text-[#151717]">For Home Sellers</h2>

            <div className="mt-auto pt-36">
              <ClipReveal className="w-[72%]">
                <ParallaxFrame className="aspect-[364/431] w-full bg-[#f6f4f0]">
                  <SafeImage
                    src={SITE_ASSETS.archBalcony}
                    alt="Arched sunset balcony overlooking skyline"
                    className="h-full w-full object-cover"
                  />
                </ParallaxFrame>
              </ClipReveal>
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-8 lg:gap-14">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#151717] lg:hidden">For Home Sellers</p>
              <ScrubbedText
                as="h2"
                curtainColor="rgba(255, 255, 255, 0.9)"
                className="text-balance text-[clamp(2.4rem,4.8vw,4.75rem)] font-medium leading-[1.06] tracking-[-0.04em] text-[#151717]"
              >
                Don’t Leave Equity on the Table.{' '}
                <span className="text-[#b3b3b3]">Sell With Confidence.</span>
              </ScrubbedText>
            </div>

            <ClipReveal>
              <ParallaxFrame className="aspect-[4/5] w-full bg-[#f6f4f0] md:aspect-[976/688]">
                <SafeImage
                  src={SITE_ASSETS.vegasDesertEstate}
                  alt="Modern Las Vegas Valley residential estate bordering Red Rock Canyon"
                  className="h-full w-full object-cover"
                />
              </ParallaxFrame>
            </ClipReveal>

            <div>
              <div className="space-y-5 text-lg font-medium leading-[1.35] tracking-[-0.015em] text-[#151717] md:text-[1.95rem]">
                <p>
                  At EliteVegasAgent.com, Christina L. Unruh brings over two decades of Greater Las
                  Vegas Valley experience since 2002—combining accurate neighborhood pricing with
                  high-impact residential marketing built specifically for home sellers.
                </p>
                <p className="text-[#5d6363]">
                  From Northwest Las Vegas (89130) to Summerlin and Henderson, every listing gets
                  custom staging guidance, elevated photography, and skilled representation from
                  first consultation to closing table.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenAgentModal}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#151717] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2d3030]"
                >
                  <span>Request Home Valuation</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
