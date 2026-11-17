import React, { useEffect, useMemo, useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import {
  JournalArticle,
  PROPERTY_LISTINGS,
  PropertyListing,
} from '../data/realEstateData';
import { useSmoothScroll } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface PropertySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNeighborhood?: string;
  initialSelectedProperty?: PropertyListing | null;
}

export function PropertySearchModal({
  isOpen,
  onClose,
  initialNeighborhood = '',
  initialSelectedProperty = null,
}: PropertySearchModalProps) {
  const { stop, start } = useSmoothScroll();
  const [query, setQuery] = useState(initialNeighborhood);
  const [region, setRegion] = useState<'All' | 'Summerlin' | 'Las Vegas Strip' | 'Henderson'>('All');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(
    initialSelectedProperty
  );
  const [tourEmail, setTourEmail] = useState('');
  const [tourSent, setTourSent] = useState(false);

  useEffect(() => {
    setQuery(initialNeighborhood);
  }, [initialNeighborhood]);

  useEffect(() => {
    setSelectedProperty(initialSelectedProperty);
    setTourSent(false);
    setTourEmail('');
  }, [initialSelectedProperty, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    stop();
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      start();
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, stop, start]);

  const filtered = useMemo(() => {
    return PROPERTY_LISTINGS.filter((item) => {
      const matchesRegion = region === 'All' || item.region === region;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.headline.toLowerCase().includes(q) ||
        item.neighborhood.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [region, query]);

  if (!isOpen) return null;

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourEmail.includes('@')) return;
    setTourSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Find Las Vegas Properties"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-lenis-prevent="true"
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-white text-[#151717]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6e4df] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Find Las Vegas Properties</h2>
            <p className="mt-0.5 text-xs text-[#5d6363]">
              Curated homes for sale across Summerlin, The Strip, and Henderson
            </p>
          </div>
          <button
            type="button"
            aria-label="Close property search"
            onClick={onClose}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#e6e4df] text-[#151717] transition-colors hover:bg-[#f6f4f0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-[#e6e4df] bg-[#f6f4f0] px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5d6363]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search neighborhood (e.g. Summerlin, The Ridges, Strip)..."
              className="w-full border border-[#e6e4df] bg-white py-2.5 pl-10 pr-4 text-sm text-[#151717] placeholder:text-[#8c9191] focus:border-[#151717] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Summerlin', 'Las Vegas Strip', 'Henderson'] as const).map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setRegion(area)}
                className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  region === area
                    ? 'bg-[#151717] text-white'
                    : 'border border-[#e6e4df] bg-white text-[#5d6363] hover:text-[#151717]'
                }`}
              >
                {area === 'All' ? 'All Areas' : area}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6">
          {selectedProperty ? (
            <div>
              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(null);
                  setTourSent(false);
                  setTourEmail('');
                }}
                className="mb-6 cursor-pointer text-xs font-medium text-[#5d6363] underline-offset-4 hover:text-[#151717] hover:underline"
              >
                ← Back to {filtered.length} matching properties
              </button>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="md:col-span-6">
                  <div className="aspect-[4/3] overflow-hidden bg-[#f6f4f0]">
                    <SafeImage
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-6">
                  <div className="flex items-center gap-2 text-xs text-[#5d6363]">
                    <span>{selectedProperty.badge}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProperty.neighborhood}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    {selectedProperty.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5d6363]">{selectedProperty.address}</p>
                  <p className="tabular-nums mt-4 text-2xl font-semibold text-[#151717]">
                    <span className="font-serif-editorial mr-1.5 text-lg font-normal italic text-[#5d6363]">
                      from
                    </span>
                    {selectedProperty.priceLabel}
                  </p>
                  <div className="tabular-nums mt-4 flex gap-5 border-y border-[#e6e4df] py-3 text-xs font-medium text-[#5d6363]">
                    <span>{selectedProperty.floors} Floors</span>
                    <span>{selectedProperty.beds} Beds</span>
                    <span>{selectedProperty.baths} Baths</span>
                    <span>{selectedProperty.sqft.toLocaleString()} Sq Ft</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#5d6363]">
                    {selectedProperty.summary}
                  </p>
                  <p className="mt-3 text-xs text-[#5d6363]">
                    Listing Partner:{' '}
                    <strong className="text-[#151717]">{selectedProperty.agent}</strong>
                  </p>

                  {tourSent ? (
                    <div className="mt-6 flex items-center gap-2.5 border border-[#151717] bg-[#f6f4f0] p-4 text-sm font-medium text-[#151717]">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>
                        Private showing request received. {selectedProperty.agent} will follow up
                        shortly.
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleTourSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <input
                        type="email"
                        required
                        value={tourEmail}
                        onChange={(e) => setTourEmail(e.target.value)}
                        placeholder="Enter email for private showing"
                        className="flex-1 border border-[#e6e4df] px-4 py-2.5 text-sm focus:border-[#151717] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="cursor-pointer whitespace-nowrap rounded-full bg-[#151717] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#2d3030]"
                      >
                        Request Tour
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-base font-medium text-[#151717]">
                No matching properties found for “{query}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setRegion('All');
                }}
                className="mt-4 cursor-pointer text-sm font-medium text-[#151717] underline underline-offset-4"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between border border-[#e6e4df] bg-white transition-colors hover:border-[#151717]/40"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedProperty(item)}
                      className="block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-[#f6f4f0]"
                    >
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-[#5d6363]">
                        <span>{item.badge}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.neighborhood}</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold tracking-tight text-[#151717]">
                        <button
                          type="button"
                          onClick={() => setSelectedProperty(item)}
                          className="cursor-pointer text-left hover:underline"
                        >
                          {item.title}
                        </button>
                      </h3>
                      <p className="mt-1 text-xs text-[#5d6363]">{item.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#e6e4df] px-5 py-3.5 text-sm">
                    <span className="tabular-nums font-semibold text-[#151717]">
                      {item.priceLabel}
                    </span>
                    <span className="tabular-nums text-xs text-[#5d6363]">
                      {item.beds}bd · {item.baths}ba · {item.sqft.toLocaleString()} sf
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ContactModalProps {
  mode: 'contact' | 'agent' | null;
  onClose: () => void;
}

export function ContactModal({ mode, onClose }: ContactModalProps) {
  const { stop, start } = useSmoothScroll();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [market, setMarket] = useState('Northwest Las Vegas (89130)');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!mode) return;
    stop();
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      start();
      document.body.style.overflow = '';
    };
  }, [mode, onClose, stop, start]);

  if (!mode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, '');
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone && phoneDigits.length < 10) {
      setError('Please enter a 10-digit phone number or leave phone blank.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'agent' ? 'Join Elite Vegas Agent' : 'Contact Elite Vegas Agent'}
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div
        data-lenis-prevent="true"
        className="w-full max-w-lg overflow-y-auto bg-white p-8 text-[#151717]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e6e4df] pb-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {mode === 'agent' ? 'Request a Home Valuation' : 'Contact Christina L. Unruh'}
            </h2>
            <p className="mt-1 text-sm text-[#5d6363]">
              {mode === 'agent'
                ? 'Schedule a pricing analysis and residential listing strategy session.'
                : '5357 Riverboat Court, Las Vegas, NV 89130 · EliteVegasAgent.com'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={resetAndClose}
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e6e4df] hover:bg-[#f6f4f0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#151717] text-white">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Request Confirmed</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5d6363]">
              Thank you, {name}. Christina L. Unruh’s {market} desk has logged your inquiry and will
              reach out to <span className="text-[#151717]">{email}</span> shortly.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="mt-6 cursor-pointer rounded-full bg-[#151717] px-6 py-2.5 text-sm font-medium text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <p className="border border-[#d92424] bg-[#d92424]/5 px-4 py-2.5 text-xs font-medium text-[#d92424]">
                {error}
              </p>
            )}
            <div>
              <label className="block text-xs font-medium text-[#5d6363]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="mt-1.5 w-full border border-[#e6e4df] px-4 py-2.5 text-sm focus:border-[#151717] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-[#5d6363]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full border border-[#e6e4df] px-4 py-2.5 text-sm focus:border-[#151717] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5d6363]">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(702) 555-0192"
                  className="mt-1.5 w-full border border-[#e6e4df] px-4 py-2.5 text-sm focus:border-[#151717] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5d6363]">Las Vegas Area</label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="mt-1.5 w-full border border-[#e6e4df] bg-white px-4 py-2.5 text-sm focus:border-[#151717] focus:outline-none"
              >
                <option>Northwest Las Vegas (89130)</option>
                <option>Summerlin</option>
                <option>Las Vegas Strip</option>
                <option>Henderson / MacDonald Highlands</option>
                <option>Centennial Hills</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5d6363]">
                {mode === 'agent' ? 'Property Address & Timeline' : 'How can we help?'}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  mode === 'agent'
                    ? 'Share your property address or target timeline to list...'
                    : 'Selling your home, buying in Las Vegas, or requesting a listing consult...'
                }
                className="mt-1.5 w-full border border-[#e6e4df] px-4 py-2.5 text-sm focus:border-[#151717] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-[#151717] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2d3030]"
            >
              {mode === 'agent' ? 'Request Valuation' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ArticleReaderModal({
  article,
  onClose,
}: {
  article: JournalArticle | null;
  onClose: () => void;
}) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!article) return;
    stop();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      start();
    };
  }, [article, onClose, stop, start]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article
        data-lenis-prevent="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-8 text-[#151717]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e6e4df] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5d6363]">
              <span className="tabular-nums">{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight">
              {article.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close article"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e6e4df] hover:bg-[#f6f4f0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 aspect-[16/9] overflow-hidden bg-[#f6f4f0]">
          <SafeImage src={article.image} alt={article.title} className="h-full w-full object-cover" />
        </div>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5d6363]">
          {article.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
