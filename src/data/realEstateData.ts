export interface PropertyListing {
  id: string;
  title: string;
  headline: string;
  address: string;
  neighborhood: string;
  region: 'Summerlin' | 'Las Vegas Strip' | 'Henderson';
  dealType: 'Buy' | 'Sell';
  badge: string;
  priceLabel: string;
  priceNumeric: number;
  floors: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  agent: string;
  summary: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  context: string;
  agent: string;
}

export interface ServicePillar {
  id: 'Buy' | 'Sell';
  headline: string;
  description: string;
  highlight: string;
  metrics: { label: string; value: string }[];
  image: string;
}

export interface JournalArticle {
  id: string;
  date: string;
  category: string;
  readTime: string;
  title: string;
  brief: string;
  image: string;
  body: string[];
}

export const SITE_ASSETS = {
  heroSky: '/assets/aistudio/image_1e47a527.png',
  heroHouse: '/assets/aistudio/image_864dd08d.png',
  heroHouseAlt: '/assets/aistudio/image_372991dd.png',
  heroCloud: '/assets/aistudio/image_cfbbd276.png',
  heroSmoke: '/assets/aistudio/image_6967ce51.png',
  whyUsVideo: '/assets/aistudio/12028457_2562_1440_60fps_84e5b99a.mp4',
  suburbanAerial: '/assets/aistudio/image_1e85b959.png',
  archBalcony: '/assets/aistudio/image_8eb18778.png',
  archDarkFacade: '/assets/aistudio/image_1b5992d7.png',
  vegasDesertEstate: '/src/assets/images/vegas_desert_estate_1794945538298.jpg',
  vegasStripSkyline: '/src/assets/images/vegas_strip_skyline_1794945538538.jpg',
  penthouseInterior: '/assets/aistudio/image_ec056a67.png',
  horizonVillaPool: '/assets/aistudio/image_d663b43c.png',
  ascayaCourtyard: '/assets/aistudio/image_fac160d9.png',
  sellEstateSunset: '/assets/aistudio/image_862e3113.png',
  sellModernPool: '/assets/aistudio/image_5ccc64d0.png',
  sellStripSuite: '/assets/aistudio/image_c0428822.png',
  sellCosmoTerrace: '/assets/aistudio/image_7893e20e.png',
} as const;

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: 'ridges-promontory-estate',
    title: 'Red Rock Rim Glass Pavilion',
    headline: 'RED ROCK PAVILION',
    address: '48 Promontory Ridge Drive',
    neighborhood: 'Summerlin, Las Vegas',
    region: 'Summerlin',
    dealType: 'Buy',
    badge: 'New Listing',
    priceLabel: '$6,850,000',
    priceNumeric: 6850000,
    floors: 2,
    beds: 5,
    baths: 6,
    sqft: 6420,
    image: SITE_ASSETS.vegasDesertEstate,
    agent: 'Christina L. Unruh',
    summary:
      'A cantilevered desert-modern villa with private infinity pool, travertine lounge, and 2 floors backing directly to Red Rock cliffs.',
  },
  {
    id: 'strip-sky-penthouse',
    title: 'Boulevard Sky Terrace Penthouse',
    headline: 'STRIP SKY PENTHOUSE',
    address: '3752 Las Vegas Blvd S, PH-42',
    neighborhood: 'The Strip, Las Vegas',
    region: 'Las Vegas Strip',
    dealType: 'Buy',
    badge: 'Exclusive',
    priceLabel: '$4,950,000',
    priceNumeric: 4950000,
    floors: 2,
    beds: 3,
    baths: 4,
    sqft: 3480,
    image: SITE_ASSETS.penthouseInterior,
    agent: 'Christina L. Unruh',
    summary:
      'Double-height corner sky penthouse featuring floating stairs, twilight Las Vegas Strip panoramas, and bespoke marble entertaining lounge.',
  },
  {
    id: 'macdonald-highlands-villa',
    title: 'DragonRidge Horizon Residence',
    headline: 'HORIZON VILLA',
    address: '1520 Foothill Ridge Court',
    neighborhood: 'MacDonald Highlands, Henderson',
    region: 'Henderson',
    dealType: 'Buy',
    badge: 'Featured',
    priceLabel: '$5,400,000',
    priceNumeric: 5400000,
    floors: 2,
    beds: 4,
    baths: 5,
    sqft: 5290,
    image: SITE_ASSETS.horizonVillaPool,
    agent: 'Christina L. Unruh',
    summary:
      'Two-story twilight sanctuary with glowing infinity pool, cantilevered timber soffits, and seamless indoor-outdoor poolside terraces.',
  },
  {
    id: 'ascaya-canyon-lot-home',
    title: 'Ascaya Monolith Courtyard Home',
    headline: 'ASCAYA COURTYARD',
    address: '714 Talus Crest Drive',
    neighborhood: 'Ascaya, Henderson',
    region: 'Henderson',
    dealType: 'Buy',
    badge: 'Private Release',
    priceLabel: '$7,900,000',
    priceNumeric: 7900000,
    floors: 2,
    beds: 5,
    baths: 6,
    sqft: 6850,
    image: SITE_ASSETS.ascayaCourtyard,
    agent: 'Christina L. Unruh',
    summary:
      'Architectural desert courtyard enclave with stone walkways, sunken fire lounge, timber pergola, and serene evening ambiance.',
  },
  {
    id: 'northwest-twilight-villa',
    title: 'Northwest Palm Arch Estate',
    headline: 'TWILIGHT PALM ESTATE',
    address: '5357 Riverboat Court',
    neighborhood: 'Las Vegas, NV 89130',
    region: 'Summerlin',
    dealType: 'Sell',
    badge: 'Seller Listing',
    priceLabel: '$1,480,000',
    priceNumeric: 1480000,
    floors: 2,
    beds: 5,
    baths: 4,
    sqft: 4120,
    image: SITE_ASSETS.sellEstateSunset,
    agent: 'Christina L. Unruh',
    summary:
      'Grand arched stone portico framed by mature palms, terracotta tile roofing, three-car courtyard garage, and vibrant sunset skies.',
  },
  {
    id: 'henderson-glass-pool-manor',
    title: 'Modern White Glass Pool Residence',
    headline: 'GLASS POOL RESIDENCE',
    address: '1985 Palisade Crest Way',
    neighborhood: 'Henderson, Las Vegas Valley',
    region: 'Henderson',
    dealType: 'Sell',
    badge: 'Featured Sale',
    priceLabel: '$3,950,000',
    priceNumeric: 3950000,
    floors: 2,
    beds: 5,
    baths: 6,
    sqft: 5640,
    image: SITE_ASSETS.sellModernPool,
    agent: 'Christina L. Unruh',
    summary:
      'Clean-lined contemporary residence opening onto turquoise zero-edge waters, linear stone pavers, and covered outdoor dining.',
  },
  {
    id: 'flamingo-boulevard-sky-suite',
    title: 'Strip View Residence Suite',
    headline: 'BOULEVARD SKY SUITE',
    address: '3555 Las Vegas Blvd S, #2408',
    neighborhood: 'The Strip, Las Vegas',
    region: 'Las Vegas Strip',
    dealType: 'Sell',
    badge: 'Top Value',
    priceLabel: '$1,150,000',
    priceNumeric: 1150000,
    floors: 1,
    beds: 2,
    baths: 2,
    sqft: 1840,
    image: SITE_ASSETS.sellStripSuite,
    agent: 'Christina L. Unruh',
    summary:
      'Floor-to-ceiling twilight glass framing iconic Boulevard neon towers, custom wallpapered primary retreat, and lock-and-leave convenience.',
  },
  {
    id: 'cosmopolitan-wrap-terrace',
    title: 'Center-Strip Wrap Terrace Residence',
    headline: 'STRIP WRAP TERRACE',
    address: '3708 Las Vegas Blvd S, #5104',
    neighborhood: 'The Strip, Las Vegas',
    region: 'Las Vegas Strip',
    dealType: 'Sell',
    badge: 'Sold Over Ask',
    priceLabel: '$2,650,000',
    priceNumeric: 2650000,
    floors: 1,
    beds: 3,
    baths: 3,
    sqft: 2490,
    image: SITE_ASSETS.sellCosmoTerrace,
    agent: 'Christina L. Unruh',
    summary:
      'Private cantilevered sky balcony overlooking center-Strip nightlife lights, outdoor entertaining seating, and panoramic valley vistas.',
  },
];

export const REWIRED_STEPS = [
  {
    number: '01',
    title: 'Work With Christina L. Unruh.',
    description:
      'Connect directly with a trusted Greater Las Vegas specialist serving the valley since 2002—no call centers, no handoffs, just candid pricing and strategic guidance.',
  },
  {
    number: '02',
    title: 'Price & Position With Clarity.',
    description:
      'From Northwest Las Vegas (89130) and Summerlin comps to pre-market preparation, we pair local data with architectural presentation so your home stands out.',
  },
  {
    number: '03',
    title: 'List, Sell & Move Forward.',
    description:
      'Focused residential marketing, sharp negotiation, and detail-driven closing coordination designed to win the strongest terms for sellers and buyers.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'hogan',
    quote:
      'Christina was a great realtor. Such a hard worker, dedicated to helping us sell and find the perfect neighborhood, price point and home in Las Vegas. She is tireless and truly invested—available morning, noon and night. Would recommend her 100%.',
    author: 'Bernadette Hogan',
    context: 'Las Vegas Residential Sale · Closed in 24 days',
    agent: 'Christina L. Unruh',
  },
  {
    id: 'condo',
    quote:
      'Working with Christina at EliteVegasAgent.com was a seamless experience. Her pricing strategy brought qualified offers immediately, and she handled every negotiation detail with total professionalism.',
    author: 'David & Maya Chen',
    context: 'Sold & Relocated in Las Vegas · Over Asking',
    agent: 'Christina L. Unruh',
  },
  {
    id: 'henderson',
    quote:
      'Having served Las Vegas since 2002, Christina knew every nuance of our community and buyer pool. She turned what felt stressful into an effortless closing.',
    author: 'Julian Mercer',
    context: 'Greater Las Vegas Seller Representation',
    agent: 'Christina L. Unruh',
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'Buy',
    headline: 'Buy smarter across Greater Las Vegas.',
    description:
      'Backed by over two decades of local market knowledge since 2002, helping you evaluate neighborhoods, negotiate clean terms, and close with confidence.',
    highlight: 'Serving Greater Las Vegas Valley Since 2002',
    metrics: [
      { label: 'Local Market Experience', value: 'Since 2002' },
      { label: 'Avg. Offer-to-Close', value: '28 Days' },
      { label: 'Client Satisfaction', value: '4.9 / 5.0' },
    ],
    image: SITE_ASSETS.vegasDesertEstate,
  },
  {
    id: 'Sell',
    headline: 'Sell your Las Vegas home for maximum value.',
    description:
      'Precision pricing, elevated listing photography, targeted buyer outreach, and proven negotiation from Christina L. Unruh through closing day.',
    highlight: 'Focused on Home Sellers · Proven Results',
    metrics: [
      { label: 'Avg. Days on Market', value: '18 Days' },
      { label: 'List-to-Sale Price', value: '98.9%' },
      { label: 'Valley Experience', value: '24+ Years' },
    ],
    image: SITE_ASSETS.horizonVillaPool,
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'preparing-vegas-home-to-sell',
    date: 'Sep 2, 2026',
    category: 'Seller Guide · Market Feature',
    readTime: '4 min read',
    title: 'How Las Vegas Home Sellers Capture Top Offers Before the First Open House',
    brief:
      'Practical pricing, pre-listing curb appeal, and buyer psychology strategies tailored for Northwest Las Vegas, Summerlin, and Henderson.',
    image: SITE_ASSETS.vegasDesertEstate,
    body: [
      'Across the Greater Las Vegas Valley—from established cul-de-sacs in 89130 to custom guard-gated enclaves in Summerlin—the first 10 days on market set the trajectory for your final sale price.',
      'Christina L. Unruh evaluates active competing inventory, micro-neighborhood absorption rates, and high-ROI visual upgrades so your home enters the market priced cleanly rather than chasing price reductions weeks later.',
      'Combining crisp twilight photography with proactive outreach to pre-approved Las Vegas buyers consistently yields stronger terms and smoother escrow timelines.',
    ],
  },
  {
    id: 'vegas-buy-sell-timing',
    date: 'Apr 1, 2026',
    category: 'Buy Blog · Strategy',
    readTime: '5 min read',
    title: 'Coordinating Your Sale & Next Purchase in the Las Vegas Valley Without Stress',
    brief:
      'How move-up homeowners structure contingent offers, rent-backs, and synchronized closing timelines across Clark County.',
    image: SITE_ASSETS.penthouseInterior,
    body: [
      'Many Greater Las Vegas homeowners hesitate to list because they are worried about finding their next home in time. Structured transaction planning eliminates that guesswork.',
      'By mapping neighborhood inventory in Centennial Hills, Northwest Las Vegas, Summerlin, and Henderson weeks before going live, sellers stay in full control of both closing dates.',
      'With decades of local closing relationships since 2002, EliteVegasAgent.com keeps inspections, appraisals, and lender milestones aligned.',
    ],
  },
  {
    id: 'off-season-nevada-strategy',
    date: 'Dec 25, 2025',
    category: 'Market Insights',
    readTime: '3 min read',
    title: 'What Every Clark County Homeowner Should Check Before Listing Residential Property',
    brief:
      'A clear pre-listing checklist covering HOA resale packages, desert landscaping polish, and inspection readiness.',
    image: SITE_ASSETS.ascayaCourtyard,
    body: [
      'Preparation before your listing goes active protects your net proceeds once you enter escrow. Early review of HOA transfer disclosures and property condition removes last-minute renegotiations.',
      'Simple updates—such as balanced exterior lighting, serviced HVAC systems, and decluttered living areas—immediately raise buyer confidence during tours.',
      'Reach out to Christina L. Unruh at EliteVegasAgent.com for a complimentary property walkthrough and customized market valuation.',
    ],
  },
];

export const TRI_STATE_NEIGHBORHOODS: {
  region: 'Summerlin' | 'Las Vegas Strip' | 'Henderson';
  places: string[];
}[] = [
  {
    region: 'Summerlin',
    places: ['The Ridges', 'Red Rock Country Club', 'The Paseos', 'Centennial & 89130'],
  },
  {
    region: 'Las Vegas Strip',
    places: ['The Strip', 'Arts District', 'Symphony Park'],
  },
  {
    region: 'Henderson',
    places: ['MacDonald Highlands', 'Ascaya', 'Green Valley'],
  },
];
