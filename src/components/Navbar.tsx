import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from './MotionPrimitives';
import { SafeImage } from './SafeImage';

interface NavbarProps {
  onSelectBuy: () => void;
  onSelectSell: () => void;
  onOpenContact: (mode: 'contact' | 'agent') => void;
}

export function Navbar({ onSelectBuy, onSelectSell, onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo, stop, start } = useSmoothScroll();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      stop();
      document.body.style.overflow = 'hidden';
      if (backdropRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(
          backdropRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.55, ease: 'power3.inOut', transformOrigin: 'top center' }
        );
      }
    } else {
      start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, stop, start]);

  const handleNavClick = (targetId: string) => {
    setMenuOpen(false);
    scrollTo(targetId, -72);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-[#e6e4df] bg-white/95 text-[#151717] backdrop-blur-md'
            : 'bg-transparent text-[#151717]'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-8 px-6 lg:h-24 lg:px-12">
          {/* Zone 1: Uploaded Anchor Realty Group Logo (Prominent) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <SafeImage
              src="/assets/aistudio/image_891cec0b.png"
              alt="Anchor Realty Group — Elite Vegas Agent"
              loading="eager"
              className="h-14 w-auto object-contain sm:h-16 lg:h-20"
            />
          </a>

          {/* Zone 2: Exact requested nav links (Home, Buy, Sell, Buy Blog, About Us) */}
          <nav aria-label="Primary Navigation" className="hidden items-center gap-7 md:flex">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="shrink-0 whitespace-nowrap text-sm font-medium tracking-tight text-[#151717] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Home
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onSelectBuy();
              }}
              className="shrink-0 cursor-pointer whitespace-nowrap text-sm font-medium tracking-tight text-[#151717] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onSelectSell();
              }}
              className="shrink-0 cursor-pointer whitespace-nowrap text-sm font-medium tracking-tight text-[#151717] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Sell
            </button>
            <a
              href="#journal"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#journal');
              }}
              className="shrink-0 whitespace-nowrap text-sm font-medium tracking-tight text-[#151717] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Buy Blog
            </a>
            <a
              href="#why-elite-vegas"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#why-elite-vegas');
              }}
              className="shrink-0 whitespace-nowrap text-sm font-medium tracking-tight text-[#151717] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              About Us
            </a>
          </nav>

          {/* Zone 3: Contact primary CTA + mobile menu toggle */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenContact('contact')}
              className="hidden shrink-0 cursor-pointer whitespace-nowrap rounded-full bg-[#151717] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2d3030] md:inline-flex"
            >
              Contact Us
            </button>

            <button
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#151717]/20 text-[#151717] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto px-6 pb-10 pt-24 text-white md:hidden"
        >
          <div ref={backdropRef} aria-hidden="true" className="fixed inset-0 -z-10 bg-[#151717]" />

          <nav className="flex flex-col gap-5">
            <button
              type="button"
              onClick={() => handleNavClick('#hero')}
              className="border-b border-white/15 pb-4 text-left text-3xl font-semibold tracking-tight"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onSelectBuy();
              }}
              className="border-b border-white/15 pb-4 text-left text-3xl font-semibold tracking-tight"
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onSelectSell();
              }}
              className="border-b border-white/15 pb-4 text-left text-3xl font-semibold tracking-tight"
            >
              Sell
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#journal')}
              className="border-b border-white/15 pb-4 text-left text-3xl font-semibold tracking-tight"
            >
              Buy Blog
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#why-elite-vegas')}
              className="border-b border-white/15 pb-4 text-left text-3xl font-semibold tracking-tight"
            >
              About Us
            </button>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenContact('contact');
              }}
              className="w-full rounded-full bg-white py-3.5 text-center text-sm font-semibold text-[#151717]"
            >
              Contact Us
            </button>
            <p className="text-center text-xs text-white/60">
              Anchor Realty Group · Elite Vegas Agent
            </p>
          </div>
        </div>
      )}
    </>
  );
}
