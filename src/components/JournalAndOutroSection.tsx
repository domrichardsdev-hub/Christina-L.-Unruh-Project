import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  JOURNAL_ARTICLES,
  JournalArticle,
  SITE_ASSETS,
  TRI_STATE_NEIGHBORHOODS,
} from '../data/realEstateData';
import { ClipReveal, ParallaxFrame, ScrubbedText } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface JournalAndOutroSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
  onOpenContact: () => void;
  onSelectNeighborhood: (neighborhood: string) => void;
  onOpenSearch: () => void;
}

export function JournalAndOutroSection({
  onSelectArticle,
  onOpenContact,
  onSelectNeighborhood,
  onOpenSearch,
}: JournalAndOutroSectionProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <>
      {/* Section 8: Buy Blog & Resources */}
      <section id="journal" className="relative z-10 bg-[#f1f1f1] py-20 text-[#151717] lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <ScrubbedText
                as="h2"
                curtainColor="rgba(241, 241, 241, 0.9)"
                className="text-[clamp(2.5rem,4.8vw,5rem)] font-medium leading-[1.0] tracking-[-0.04em] text-[#151717]"
              >
                Buy Blog
              </ScrubbedText>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-2xl text-xl font-medium leading-[1.3] tracking-[-0.015em] text-[#151717] md:text-[2rem]">
                Tips, market updates, and selling strategies from Christina L. Unruh to help Las
                Vegas homeowners achieve winning results.
              </p>
              <button
                type="button"
                onClick={() => onSelectArticle(JOURNAL_ARTICLES[0])}
                className="group mt-7 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#151717] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d3030]"
              >
                <span>Read Latest Guide</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="mt-14 border-b border-[#151717]/10 lg:mt-24">
            {JOURNAL_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="grid grid-cols-1 gap-8 border-t border-[#151717]/10 py-8 lg:grid-cols-12 lg:gap-12 lg:py-10"
              >
                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-[#5d6363] md:text-base">
                      <span className="tabular-nums">{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.category}</span>
                    </div>

                    <h3 className="mt-6 text-2xl font-medium leading-[1.16] tracking-[-0.02em] text-[#151717] md:mt-10 md:text-[2.4rem]">
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="cursor-pointer text-left transition-opacity hover:opacity-70"
                      >
                        {article.title}
                      </button>
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[#5d6363] md:text-base">
                      {article.brief}
                    </p>
                  </div>

                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#151717]/30 px-5 py-2.5 text-xs font-medium text-[#151717] transition-colors hover:border-[#151717] hover:bg-[#151717] hover:text-white"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <div className="order-first lg:order-last lg:col-span-7">
                  <ClipReveal>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="block aspect-[365/250] w-full cursor-pointer overflow-hidden bg-[#e6e4df] lg:aspect-[976/450]"
                    >
                      <ParallaxFrame className="h-full w-full">
                        <SafeImage
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </ParallaxFrame>
                    </button>
                  </ClipReveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Outro CTA with Las Vegas Strip Skyline */}
      <section className="relative z-10 flex h-[34rem] items-center justify-center overflow-hidden bg-[#151717] text-white lg:h-[52rem]">
        <div aria-hidden="true" className="absolute inset-0">
          <SafeImage
            src={SITE_ASSETS.vegasStripSkyline}
            alt="Las Vegas Strip twilight skyline view from luxury penthouse balcony"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#151717]/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center lg:px-12">
          <ScrubbedText
            as="h2"
            curtainColor="rgba(21, 23, 23, 0.9)"
            className="mx-auto max-w-[15ch] text-balance text-[clamp(2.2rem,4.6vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white"
          >
            Elite Vegas Agent.{' '}
            <span className="text-white/70">We’ll Help You Get There.</span>
          </ScrubbedText>

          <div className="mt-8 flex justify-center lg:mt-10">
            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#151717] transition-colors hover:bg-[#f6f4f0]"
            >
              <span>Contact Christina</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 10: Featured Vegas Neighborhoods */}
      <section id="neighborhoods" className="relative z-10 bg-white py-16 text-[#151717] lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-4 border-b border-[#e6e4df] pb-8 md:flex-row md:items-end">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-[#151717] md:text-3xl">
              Featured neighborhoods across Las Vegas & Southern Nevada
            </h2>
            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#151717] transition-opacity hover:opacity-70"
            >
              <span>Explore all neighborhoods →</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {TRI_STATE_NEIGHBORHOODS.map((group) => (
              <div key={group.region}>
                <h3 className="text-xs font-semibold tracking-wide text-[#5d6363]">
                  {group.region}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.places.map((place) => (
                    <li key={place}>
                      <button
                        type="button"
                        onClick={() => onSelectNeighborhood(place)}
                        className="cursor-pointer text-base font-medium text-[#151717] transition-opacity hover:opacity-65"
                      >
                        {place}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: Dark Architectural Footer */}
      <footer className="relative z-10 bg-[#151717] pb-10 pt-20 text-white lg:pt-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:justify-between">
            <div className="lg:col-span-7">
              <div className="max-w-xl">
                <h3 className="text-xl font-medium leading-snug tracking-[-0.01em] text-white md:text-3xl">
                  Thinking of selling in Las Vegas? Request a custom home valuation and market plan.
                </h3>

                {newsletterSubscribed ? (
                  <div className="mt-6 flex items-center gap-2 border-b border-white/40 pb-3 text-sm text-white/85">
                    <Check className="h-4 w-4" />
                    <span>Subscribed. Look out for our next Las Vegas market dispatch.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleNewsletter}
                    className="mt-6 flex items-center gap-3 border-b border-white/25 pb-2 focus-within:border-white"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to newsletter"
                      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-[#151717]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <p className="mb-3 text-xs font-medium text-white/40">Website & Email</p>
                  <a
                    href="mailto:christina@elitevegasagent.com"
                    className="text-base font-medium underline underline-offset-4 hover:text-white/75"
                  >
                    christina@elitevegasagent.com
                  </a>
                </div>
                <div>
                  <p className="mb-3 text-xs font-medium text-white/40">Office Address</p>
                  <p className="text-sm leading-relaxed text-white/80">
                    5357 Riverboat Court
                    <br />
                    Las Vegas, NV 89130
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-xs font-medium text-white/40">Contact</p>
                  <p className="text-sm font-medium text-white/90">Christina L. Unruh</p>
                  <a
                    href="https://elitevegasagent.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm text-white/75 hover:text-white"
                  >
                    EliteVegasAgent.com
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:justify-items-end">
              <div>
                <p className="mb-4 text-xs font-medium text-white/40">Navigation</p>
                <ul className="space-y-3 text-sm text-white/85">
                  <li>
                    <a href="#hero" className="hover:text-white/60">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#listings" className="hover:text-white/60">
                      Buy
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white/60">
                      Sell
                    </a>
                  </li>
                  <li>
                    <a href="#journal" className="hover:text-white/60">
                      Buy Blog
                    </a>
                  </li>
                  <li>
                    <a href="#why-elite-vegas" className="hover:text-white/60">
                      About Us
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="cursor-pointer hover:text-white/60"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-4 text-xs font-medium text-white/40">Brokerage</p>
                <ul className="space-y-3 text-sm text-white/85">
                  <li>
                    <span className="text-white/90">Christina L. Unruh</span>
                  </li>
                  <li>
                    <span className="text-white/75">Anchor Realty Group</span>
                  </li>
                  <li>
                    <a href="#neighborhoods" className="hover:text-white/60">
                      Las Vegas, NV 89130
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenSearch}
                      className="cursor-pointer hover:text-white/60"
                    >
                      Residential Listings
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Full-width Monumental Footer Wordmark & Prominent Logo */}
          <div className="mt-16 border-t border-white/15 pt-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="text-[clamp(2.2rem,7.8vw,7rem)] font-bold leading-none tracking-[-0.04em] text-white select-none">
                ELITE VEGAS AGENT
              </div>
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-lg sm:h-28 sm:w-28 lg:h-36 lg:w-36 lg:p-4">
                <SafeImage
                  src="/assets/aistudio/image_891cec0b.png"
                  alt="Anchor Realty Group logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Anchor Realty Group · Elite Vegas Agent. All rights
              reserved.
            </p>
            <div className="flex flex-wrap gap-5">
              <span>Terms</span>
              <span>Privacy Policy</span>
              <span>Fair Housing Notice</span>
              <span>Operating Procedure</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
