import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Layers,
  MapPin,
  Maximize2,
} from 'lucide-react';
import { PROPERTY_LISTINGS, PropertyListing } from '../data/realEstateData';
import { ScrubbedText, useSmoothScroll } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedListingsSectionProps {
  onSelectProperty: (property: PropertyListing) => void;
  onOpenAllSearch: () => void;
}

export function FeaturedListingsSection({
  onSelectProperty,
  onOpenAllSearch,
}: FeaturedListingsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeTab, setActiveTab] = useState<'Buy' | 'Sell'>('Buy');
  const [activeSlide, setActiveSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const featured = useMemo(
    () => PROPERTY_LISTINGS.filter((item) => item.dealType === activeTab).slice(0, 4),
    [activeTab]
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    if (mq.matches) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      gsap.set(track, { x: 0 });

      const getTravelDistance = () => {
        if (!track || !viewport) return 0;
        const paddingLeft = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
        const containerRightEdge = viewport.clientWidth - paddingLeft;
        return Math.max(0, track.scrollWidth - containerRightEdge);
      };

      const tween = gsap.to(track, {
        x: () => -getTravelDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (featured.length - 1));
            setActiveSlide(Math.max(0, Math.min(featured.length - 1, idx)));
            if (progressBarRef.current) {
              const minScale = 1 / featured.length;
              progressBarRef.current.style.transform = `scaleX(${minScale + self.progress * (1 - minScale)})`;
            }
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [activeTab, featured.length]);

  const handleTabChange = (nextTab: 'Buy' | 'Sell') => {
    if (nextTab === activeTab) return;
    setActiveTab(nextTab);
    setActiveSlide(0);

    if (prefersReducedMotion) {
      viewportRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${1 / 4})`;
    }

    const st = scrollTriggerRef.current;
    if (st && window.scrollY > st.start + 8) {
      scrollTo(st.start, 0);
    }
  };

  const scrollToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(featured.length - 1, index));

    if (prefersReducedMotion || !scrollTriggerRef.current) {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const card = track?.children[clamped] as HTMLElement | undefined;
      if (viewport && card) {
        viewport.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
        setActiveSlide(clamped);
      }
      return;
    }

    const st = scrollTriggerRef.current;
    const progress = clamped / Math.max(1, featured.length - 1);
    const targetY = st.start + (st.end - st.start) * progress;
    scrollTo(targetY, 0);
  };

  return (
    <section
      ref={sectionRef}
      id="listings"
      className={`relative z-10 border-y border-[#e6e4df] bg-[#f6f4f0] text-[#151717] ${
        prefersReducedMotion ? 'py-20 lg:py-28' : 'h-[340vh]'
      }`}
    >
      <div
        className={
          prefersReducedMotion
            ? 'flex flex-col justify-center'
            : 'sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10'
        }
      >
        {/* Top Header + Buy Property / Sell Tab Controls */}
        <div className="mx-auto w-full max-w-[1440px] shrink-0 px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold tracking-tight text-[#151717] md:text-lg">
                Featured Listings
              </p>

              {/* Two Pill Tab Buttons directly under Featured Listings matching site buttons */}
              <div
                role="tablist"
                aria-label="Property listing type"
                className="mt-4 flex flex-wrap items-center gap-3"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'Buy'}
                  onClick={() => handleTabChange('Buy')}
                  className={`inline-flex cursor-pointer items-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'Buy'
                      ? 'bg-[#151717] text-white hover:bg-[#2d3030]'
                      : 'border border-[#151717]/25 bg-white text-[#151717] hover:border-[#151717]'
                  }`}
                >
                  Buy Property
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'Sell'}
                  onClick={() => handleTabChange('Sell')}
                  className={`inline-flex cursor-pointer items-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'Sell'
                      ? 'bg-[#151717] text-white hover:bg-[#2d3030]'
                      : 'border border-[#151717]/25 bg-white text-[#151717] hover:border-[#151717]'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <ScrubbedText
                  as="h2"
                  curtainColor="rgba(246, 244, 240, 0.92)"
                  className="max-w-[16ch] text-balance text-[clamp(2rem,3.6vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#151717]"
                >
                  Greater Las Vegas{' '}
                  <span className="font-serif-editorial font-normal italic text-[#5d6363]">
                    Residences.
                  </span>
                </ScrubbedText>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous listing"
                    onClick={() => scrollToSlide(activeSlide - 1)}
                    disabled={activeSlide === 0}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#151717]/25 bg-white text-[#151717] transition-colors hover:border-[#151717] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next listing"
                    onClick={() => scrollToSlide(activeSlide + 1)}
                    disabled={activeSlide === featured.length - 1}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#151717]/25 bg-white text-[#151717] transition-colors hover:border-[#151717] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="tabular-nums ml-2 text-xs font-medium text-[#5d6363]">
                    0{activeSlide + 1} / 0{featured.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-Driven Horizontal Showcase Track */}
        <div
          ref={viewportRef}
          className={`mx-auto my-auto w-full max-w-[1440px] pl-6 lg:pl-12 ${
            prefersReducedMotion ? 'overflow-x-auto py-8' : 'overflow-visible py-4'
          }`}
        >
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 pr-6 will-change-transform lg:gap-8 lg:pr-12"
          >
            {featured.map((listing) => (
              <article
                key={listing.id}
                className="group relative flex h-[min(56vh,520px)] min-h-[360px] w-[86vw] max-w-[1060px] shrink-0 flex-col justify-between overflow-hidden bg-[#151717] p-6 text-white sm:p-9 lg:w-[76vw] lg:p-12"
              >
                {/* Full-bleed Architectural Background Image + Contrast Scrim */}
                <div aria-hidden="true" className="absolute inset-0">
                  <SafeImage
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0e1010]/78 via-[#0e1010]/35 to-[#0e1010]/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1010]/75 via-transparent to-[#0e1010]/45" />
                </div>

                {/* Top Row: Location + Display Title + Summary + Spec Strip (Left) & Status Badge (Right) */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="max-w-lg">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-white/90 md:text-sm">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{listing.neighborhood}</span>
                    </div>

                    <h3 className="mt-2 text-2xl font-medium uppercase leading-none tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
                      {listing.headline}
                    </h3>

                    <p className="mt-3 max-w-md text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
                      {listing.summary}
                    </p>

                    {/* Segmented White Spec Strip */}
                    <div className="tabular-nums mt-4 inline-flex flex-wrap items-center divide-x divide-[#e6e4df] bg-white/95 text-[#151717] shadow-sm sm:mt-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium">
                        <Layers className="h-3.5 w-3.5 text-[#5d6363]" />
                        <span>{listing.floors}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium">
                        <Bath className="h-3.5 w-3.5 text-[#5d6363]" />
                        <span>{listing.baths}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium">
                        <BedDouble className="h-3.5 w-3.5 text-[#5d6363]" />
                        <span>{listing.beds}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium">
                        <Maximize2 className="h-3.5 w-3.5 text-[#5d6363]" />
                        <span>{listing.sqft.toLocaleString()} sq ft</span>
                      </span>
                    </div>
                  </div>

                  {/* Top-right Rectangular Badge */}
                  <span className="hidden shrink-0 bg-white px-4 py-2 text-xs font-medium tracking-tight text-[#151717] sm:inline-block">
                    {listing.badge}
                  </span>
                </div>

                {/* Bottom Row: Italic "from" + Price (Left) & VIEW PROPERTY button (Right) */}
                <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="text-2xl tracking-tight text-white sm:text-3xl md:text-4xl">
                    <span className="font-serif-editorial mr-2 font-normal italic text-white/90">
                      from
                    </span>
                    <span className="tabular-nums font-normal">{listing.priceLabel}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProperty(listing)}
                    className="cursor-pointer whitespace-nowrap bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#151717] transition-colors duration-200 hover:bg-[#f6f4f0] sm:py-4"
                  >
                    VIEW PROPERTY
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Scroll Progress & View All Link */}
        <div className="mx-auto flex w-full max-w-[1440px] shrink-0 flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-12">
          <div className="flex max-w-sm flex-1 items-center gap-4">
            <div className="relative h-[2px] flex-1 overflow-hidden bg-[#151717]/15">
              <div
                ref={progressBarRef}
                className="h-full w-full origin-left bg-[#151717]"
                style={{ transform: `scaleX(${1 / featured.length})` }}
              />
            </div>

            <div className="flex items-center gap-1.5">
              {featured.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Jump to ${item.headline}`}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-2 cursor-pointer rounded-full transition-all ${
                    idx === activeSlide
                      ? 'w-5 bg-[#151717]'
                      : 'w-2 bg-[#151717]/25 hover:bg-[#151717]/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAllSearch}
            className="inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-[#151717] underline-offset-4 hover:underline"
          >
            <span>Explore all {PROPERTY_LISTINGS.length} Vegas listings</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
