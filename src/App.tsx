import { useState } from 'react';
import { JournalArticle, PropertyListing } from './data/realEstateData';
import { SmoothScrollProvider, useSmoothScroll } from './components/MotionPrimitives';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyAndArrowsSection } from './components/WhyAndArrowsSection';
import { FeaturedListingsSection } from './components/FeaturedListingsSection';
import { RewiredAndAgentsSection } from './components/RewiredAndAgentsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ServicesAndFeaturesSection } from './components/ServicesAndFeaturesSection';
import { JournalAndOutroSection } from './components/JournalAndOutroSection';
import {
  ArticleReaderModal,
  ContactModal,
  PropertySearchModal,
} from './components/InteractiveModals';

function AppShell() {
  const { scrollTo } = useSmoothScroll();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchNeighborhood, setSearchNeighborhood] = useState('');
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);
  const [contactMode, setContactMode] = useState<'contact' | 'agent' | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  const openSearch = (options?: {
    neighborhood?: string;
    property?: PropertyListing | null;
  }) => {
    setSearchNeighborhood(options?.neighborhood ?? '');
    setSelectedListing(options?.property ?? null);
    setSearchOpen(true);
  };

  const handleNavBuy = () => {
    scrollTo('#listings', -72);
  };

  const handleNavSell = () => {
    scrollTo('#services', -72);
  };

  return (
    <div className="min-h-screen bg-white text-[#151717]">
      <Navbar
        onSelectBuy={handleNavBuy}
        onSelectSell={handleNavSell}
        onOpenContact={(mode) => setContactMode(mode)}
      />

      <main>
        <HeroSection onOpenSearch={() => openSearch()} />

        <WhyAndArrowsSection />

        <FeaturedListingsSection
          onSelectProperty={(property) => openSearch({ property })}
          onOpenAllSearch={() => openSearch()}
        />

        <RewiredAndAgentsSection
          onOpenSearch={() => openSearch()}
          onOpenAgentModal={() => setContactMode('agent')}
        />

        <TestimonialsSection />

        <ServicesAndFeaturesSection
          onOpenSearch={() => openSearch()}
          onOpenContact={() => setContactMode('contact')}
        />

        <JournalAndOutroSection
          onSelectArticle={(article) => setSelectedArticle(article)}
          onOpenContact={() => setContactMode('contact')}
          onSelectNeighborhood={(neighborhood) => openSearch({ neighborhood })}
          onOpenSearch={() => openSearch()}
        />
      </main>

      <PropertySearchModal
        isOpen={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSelectedListing(null);
        }}
        initialNeighborhood={searchNeighborhood}
        initialSelectedProperty={selectedListing}
      />

      <ContactModal mode={contactMode} onClose={() => setContactMode(null)} />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <AppShell />
    </SmoothScrollProvider>
  );
}
