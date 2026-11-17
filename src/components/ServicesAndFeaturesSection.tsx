import { ArrowRight } from 'lucide-react';
import { SERVICE_PILLARS } from '../data/realEstateData';
import { ScrubbedText } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface ServicesAndFeaturesSectionProps {
  onOpenSearch: () => void;
  onOpenContact: () => void;
}

export function ServicesAndFeaturesSection({
  onOpenSearch,
  onOpenContact,
}: ServicesAndFeaturesSectionProps) {
  return (
    <section id="services" className="relative z-10 bg-[#151717] py-20 text-white lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:mb-24 lg:grid-cols-12 lg:gap-12">
          <div className="hidden lg:col-span-4 lg:block">
            <p className="text-lg font-semibold text-white">Services</p>
          </div>
          <div className="lg:col-span-8">
            <p className="mb-3 text-sm font-semibold text-white/70 lg:hidden">Services</p>
            <ScrubbedText
              as="h2"
              curtainColor="rgba(21, 23, 23, 0.9)"
              className="text-balance text-[clamp(2.4rem,4.6vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white"
            >
              How Elite Vegas Agent <span className="text-white/40">Can Help You</span>
            </ScrubbedText>
          </div>
        </div>

        {/* Buy & Sell Interactive Rows (Rent removed per user request) */}
        <div className="border-b border-[#383a3a]">
          {SERVICE_PILLARS.map((pillar, idx) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => {
                if (pillar.id === 'Sell') {
                  onOpenContact();
                } else {
                  onOpenSearch();
                }
              }}
              className="service-row group relative block w-full cursor-pointer overflow-hidden border-t border-[#383a3a] py-10 text-left text-white md:py-14 lg:h-[24rem] lg:py-12"
            >
              <div
                aria-hidden="true"
                className="service-row-bg pointer-events-none absolute inset-0 bg-[#1a1c1c]"
              >
                <SafeImage src={pillar.image} alt="" className="h-full w-full object-cover" />
              </div>

              <div className="relative z-10 grid h-full grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-start gap-5 lg:col-span-5">
                  <span className="tabular-nums inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 text-xs font-medium md:h-11 md:w-11 md:text-sm">
                    {idx + 1}
                  </span>
                  <p className="max-w-sm text-sm leading-relaxed text-white/85 md:text-lg">
                    {pillar.headline} {pillar.description}
                  </p>
                </div>

                <div className="flex items-center justify-between lg:col-span-7">
                  <span className="relative inline-block text-[clamp(4.5rem,11.5vw,13.5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
                    {pillar.id}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-[0.06em] right-0 block origin-left scale-x-0 border-t-[3px] border-white transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                  </span>
                  <ArrowRight className="h-10 w-10 shrink-0 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:h-20 md:w-20" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:mt-20 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:block" />
          <div className="lg:col-span-8">
            <ScrubbedText
              as="p"
              curtainColor="rgba(21, 23, 23, 0.9)"
              className="max-w-3xl text-[clamp(1.4rem,2.6vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.02em] text-white"
            >
              Serving the Greater Las Vegas Valley since 2002,{' '}
              <span className="text-white/40">delivering winning results for buyers and sellers.</span>
            </ScrubbedText>
          </div>
        </div>
      </div>
    </section>
  );
}
