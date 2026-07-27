/**
 * NextGen CNC Design Bundle — central data source.
 *
 * Used by:
 *  - page.tsx              (server component → JSON-LD structured data + metadata)
 *  - cnc-bundle-client.tsx (client component → renders all 23 sections)
 *
 * Single source of truth keeps copy + schema in perfect sync for SEO.
 *
 * BILINGUAL CONVENTION (matches cnc-data.ts):
 *  - For BUNDLE config: unsuffixed = English/shared, `Bn`-suffixed = Bangla.
 *  - For object arrays: every translatable string keeps its Bangla value in the
 *    unsuffixed field AND gets a matching `En`-suffixed English field.
 *  - For plain-string arrays: each item is `{ bn: string; en: string }`.
 *
 * PROOF MARKERS:
 *  - Stats / testimonials / case-study numbers that are NOT yet backed by real
 *    evidence are flagged with `proof: 'warn'` and rendered with a
 *    "⚠ Replace with Real Proof" badge. Verified claims use `proof: 'verified'`.
 */

/* -------------------------------------------------------------------------- */
/*  PRODUCT CONFIG                                                             */
/* -------------------------------------------------------------------------- */

export const BUNDLE = {
  name: 'NextGen CNC Design Bundle',
  nameBn: 'NextGen CNC ডিজাইন বান্ডল',
  tagline: '150 GB · 2,500+ Ready-to-Cut CNC Files',
  taglineBn: '১৫০ জিবি · ২,৫০০+ রেডি-টু-কাট CNC ফাইল',

  price: 150,
  originalPrice: 1500,
  totalValue: 12500,
  currency: 'BDT',

  size: '150 GB',
  fileCount: 2500,
  fileCountBn: '২,৫০০+',

  delivery: 'Instant Download',
  deliveryBn: 'ইনস্ট্যান্ট ডাউনলোড',
  deliveryMethod: 'Google Drive',
  deliveryMethodBn: 'গুগল ড্রাইভ',

  rating: 4.9,
  downloads: 320, // ⚠ Replace with Real Proof — actual download count
  ratingCount: 87, // ⚠ Replace with Real Proof — actual review count

  fileTypes: ['2D', '3D', 'STL', 'DXF', 'Aspire', 'ArtCAM', 'Vectric'],
  categories: [
    'Furniture Design',
    'Door Design',
    'Chair',
    'Bed',
    'Wardrobe',
    'Panel',
    'Relief',
    'Temple',
    'Table',
    'Sofa',
    'Frame',
    'Window',
  ],

  url: 'https://nextgendigitalstudio.com/cnc-bundle',
  founderName: 'Mohammad Nazmul Islam Taj',
  founderNameBn: 'মোঃ নাজমুল ইসলাম তাজ',
  founderTitle: 'CNC Design Specialist & Founder, NextGen Digital Studio',
  founderTitleBn: 'CNC ডিজাইন বিশেষজ্ঞ ও প্রতিষ্ঠাতা, NextGen Digital Studio',
  experienceYears: 7,
  designFilesCreated: 4000,
  factoriesServed: 30,
  studentsTrained: 150,

  // Launch-promo urgency
  launchPriceEndsIn: '72 hours',
  seatsLeft: 23, // ⚠ Replace with Real Proof — real license count remaining
  totalSeats: 100,
}

/* -------------------------------------------------------------------------- */
/*  SECTION 6 — WHAT'S INSIDE (folder breakdown)                               */
/* -------------------------------------------------------------------------- */

export type FolderItem = {
  name: string
  nameEn: string
  files: string
  filesEn: string
  size: string
  types: string[]
  emoji: string
}

export const FOLDERS: FolderItem[] = [
  {
    name: 'দরজা ডিজাইন (Door Design)',
    nameEn: 'Door Design',
    files: '৩২০+ ফাইল',
    filesEn: '320+ files',
    size: '18 GB',
    types: ['STL', 'DXF', 'Aspire'],
    emoji: '🚪',
  },
  {
    name: 'চেয়ার ডিজাইন (Chair)',
    nameEn: 'Chair Design',
    files: '২৮০+ ফাইল',
    filesEn: '280+ files',
    size: '15 GB',
    types: ['STL', 'DXF', 'ArtCAM'],
    emoji: '🪑',
  },
  {
    name: 'বিছানা ডিজাইন (Bed)',
    nameEn: 'Bed Design',
    files: '২৪০+ ফাইল',
    filesEn: '240+ files',
    size: '14 GB',
    types: ['STL', 'DXF', 'Vectric'],
    emoji: '🛏️',
  },
  {
    name: 'ওয়ার্ডরোব (Wardrobe)',
    nameEn: 'Wardrobe Design',
    files: '২১০+ ফাইল',
    filesEn: '210+ files',
    size: '12 GB',
    types: ['STL', 'DXF', 'Aspire'],
    emoji: '👗',
  },
  {
    name: 'প্যানেল ডিজাইন (Panel)',
    nameEn: 'Panel Design',
    files: '৩৫০+ ফাইল',
    filesEn: '350+ files',
    size: '20 GB',
    types: ['STL', 'DXF', 'ArtCAM'],
    emoji: '🖼️',
  },
  {
    name: 'রিলিফ ডিজাইন (Relief)',
    nameEn: 'Relief Design',
    files: '৪০০+ ফাইল',
    filesEn: '400+ files',
    size: '28 GB',
    types: ['STL', 'Aspire', 'ArtCAM'],
    emoji: '🌿',
  },
  {
    name: 'মন্দির ডিজাইন (Temple)',
    nameEn: 'Temple Design',
    files: '১৫০+ ফাইল',
    filesEn: '150+ files',
    size: '10 GB',
    types: ['STL', 'DXF', 'Vectric'],
    emoji: '🏛️',
  },
  {
    name: 'টেবিল ডিজাইন (Table)',
    nameEn: 'Table Design',
    files: '১৮০+ ফাইল',
    filesEn: '180+ files',
    size: '11 GB',
    types: ['STL', 'DXF', 'Aspire'],
    emoji: '🪵',
  },
  {
    name: 'সোফা ডিজাইন (Sofa)',
    nameEn: 'Sofa Design',
    files: '১৬০+ ফাইল',
    filesEn: '160+ files',
    size: '9 GB',
    types: ['STL', 'DXF', 'ArtCAM'],
    emoji: '🛋️',
  },
  {
    name: 'ফ্রেম ডিজাইন (Frame)',
    nameEn: 'Frame Design',
    files: '১২০+ ফাইল',
    filesEn: '120+ files',
    size: '7 GB',
    types: ['STL', 'DXF', 'Vectric'],
    emoji: '🖼️',
  },
  {
    name: 'উইন্ডো প্যানেল (Window)',
    nameEn: 'Window Panel',
    files: '৯০+ ফাইল',
    filesEn: '90+ files',
    size: '4 GB',
    types: ['STL', 'DXF', 'Aspire'],
    emoji: '🪟',
  },
  {
    name: '3D পোর্ট্রেট ও অ্যানিম্যাল (3D Portrait & Animal)',
    nameEn: '3D Portrait & Animal',
    files: '১০০+ ফাইল',
    filesEn: '100+ files',
    size: '6 GB',
    types: ['STL', 'Aspire', 'ArtCAM'],
    emoji: '🐘',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 7 — GALLERY PREVIEW                                                */
/* -------------------------------------------------------------------------- */

export type GalleryItem = {
  emoji: string
  label: string
  labelEn: string
  sub: string
  subEn: string
}

export const GALLERY: GalleryItem[] = [
  { emoji: '🚪', label: 'Door Panel', labelEn: 'Door Panel', sub: 'ইন্ডাস্ট্রি-গ্রেড', subEn: 'Industry-Grade' },
  { emoji: '🪑', label: 'Chair Leg', labelEn: 'Chair Leg', sub: 'স্কাল্পটেড', subEn: 'Sculpted' },
  { emoji: '🛏️', label: 'Bed Headboard', labelEn: 'Bed Headboard', sub: 'রয়্যাল স্টাইল', subEn: 'Royal Style' },
  { emoji: '🏛️', label: 'Temple Relief', labelEn: 'Temple Relief', sub: 'সাংস্কৃতিক', subEn: 'Cultural' },
  { emoji: '🖼️', label: 'Wall Frame', labelEn: 'Wall Frame', sub: 'ডেকোরেটিভ', subEn: 'Decorative' },
  { emoji: '🌿', label: 'Floral Relief', labelEn: 'Floral Relief', sub: '3D স্কাল্পট', subEn: '3D Sculpt' },
  { emoji: '🪟', label: 'Window Panel', labelEn: 'Window Panel', sub: 'জ্যামিতিক', subEn: 'Geometric' },
  { emoji: '🐘', label: 'Animal Relief', labelEn: 'Animal Relief', sub: 'ওয়াইল্ডলাইফ', subEn: 'Wildlife' },
  { emoji: '🛋️', label: 'Sofa Arm', labelEn: 'Sofa Arm', sub: 'আর্নামেন্টাল', subEn: 'Ornamental' },
  { emoji: '🪵', label: 'Table Edge', labelEn: 'Table Edge', sub: 'ক্লাসিক', subEn: 'Classic' },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 9 — BONUSES                                                        */
/* -------------------------------------------------------------------------- */

export type Bonus = {
  name: string
  nameEn: string
  desc: string
  descEn: string
  value: number
  emoji: string
}

export const BONUSES: Bonus[] = [
  {
    name: 'ফার্নিচার লাইব্রেরি (ফুল কালেকশন)',
    nameEn: 'Furniture Library (Full Collection)',
    desc: '৫০০+ অতিরিক্ত ফার্নিচার ব্লক ও কম্পোনেন্ট — সরাসরি আপনার প্রজেক্টে ব্যবহার করুন।',
    descEn: '500+ extra furniture blocks & components — drop straight into your projects.',
    value: 2000,
    emoji: '🪑',
  },
  {
    name: 'HD টেক্সচার প্যাক (Wood & Material)',
    nameEn: 'HD Texture Pack (Wood & Material)',
    desc: '২০০+ উচ্চ-রেজোলিউশন wood, marble, ও material টেক্সচার — রেন্ডার ও প্রিভিউ-এর জন্য।',
    descEn: '200+ high-resolution wood, marble & material textures for rendering & preview.',
    value: 1500,
    emoji: '🎨',
  },
  {
    name: 'Aspire ব্রাশ ও টুল প্রিসেট',
    nameEn: 'Aspire Brushes & Tool Presets',
    desc: '৮০+ কাস্টম ব্রাশ ও টুল প্রিসেট — রিলিফ স্কাল্পটিং দ্রুত করার জন্য।',
    descEn: '80+ custom brushes & tool presets to speed up relief sculpting.',
    value: 1200,
    emoji: '🖌️',
  },
  {
    name: 'রেডি টুলপাথ টেমপ্লেট',
    nameEn: 'Ready Toolpath Templates',
    desc: '৫০+ প্রি-কনফিগারড টুলপাথ টেমপ্লেট — শুধু আপনার মেশিনের সেটিং বসিয়ে কাট শুরু করুন।',
    descEn: '50+ pre-configured toolpath templates — just set your machine specs and cut.',
    value: 1800,
    emoji: '⚙️',
  },
  {
    name: 'কমার্শিয়াল লাইসেন্স',
    nameEn: 'Commercial License',
    desc: 'আপনার ফ্যাক্টরি বা ফ্রিল্যান্স ক্লায়েন্টের জন্য আনলিমিটেড কমার্শিয়াল ব্যবহারের অধিকার।',
    descEn: 'Unlimited commercial usage rights for your factory or freelance clients.',
    value: 3000,
    emoji: '📜',
  },
  {
    name: 'লাইফটাইম আপডেট + VIP সাপোর্ট',
    nameEn: 'Lifetime Updates + VIP Support',
    desc: 'নতুন ফাইল যোগ হলে আজীবন ফ্রি আপডেট + WhatsApp-এ VIP সাপোর্ট গ্রুপ।',
    descEn: 'Lifetime free updates as new files are added + VIP WhatsApp support group.',
    value: 3000,
    emoji: '♾️',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 10 — VALUE STACK                                                   */
/* -------------------------------------------------------------------------- */

export type ValueItem = {
  name: string
  nameEn: string
  value: number
  included: boolean
}

export const VALUE_STACK: ValueItem[] = [
  {
    name: 'NextGen CNC Design Bundle (মূল ২,৫০০+ ফাইল)',
    nameEn: 'NextGen CNC Design Bundle (core 2,500+ files)',
    value: 5000,
    included: true,
  },
  { name: 'ফার্নিচার লাইব্রেরি', nameEn: 'Furniture Library', value: 2000, included: true },
  { name: 'HD টেক্সচার প্যাক', nameEn: 'HD Texture Pack', value: 1500, included: true },
  { name: 'Aspire ব্রাশ ও প্রিসেট', nameEn: 'Aspire Brushes & Presets', value: 1200, included: true },
  { name: 'রেডি টুলপাথ টেমপ্লেট', nameEn: 'Ready Toolpath Templates', value: 1800, included: true },
  { name: 'কমার্শিয়াল লাইসেন্স', nameEn: 'Commercial License', value: 3000, included: true },
  { name: 'লাইফটাইম আপডেট + VIP সাপোর্ট', nameEn: 'Lifetime Updates + VIP Support', value: 3000, included: true },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 12 — COMPARISON                                                    */
/* -------------------------------------------------------------------------- */

export type ComparisonRow = {
  feature: string
  featureEn: string
  others: string
  othersEn: string
  nextgen: string
  nextgenEn: string
}

export const COMPARISON: ComparisonRow[] = [
  {
    feature: 'ফাইল সংখ্যা',
    featureEn: 'Number of files',
    others: '১০-৫০টি (এলোমেলো)',
    othersEn: '10–50 (scattered)',
    nextgen: '২,৫০০+ সাজানো ফাইল',
    nextgenEn: '2,500+ organized files',
  },
  {
    feature: 'ফাইল সাইজ',
    featureEn: 'Total size',
    others: '৫০০ MB – ২ GB',
    othersEn: '500 MB – 2 GB',
    nextgen: '১৫০ GB',
    nextgenEn: '150 GB',
  },
  {
    feature: 'অর্গানাইজেশন',
    featureEn: 'Organization',
    others: 'একটি ফোল্ডারে সব মিশে',
    othersEn: 'Everything dumped in one folder',
    nextgen: '১২+ ক্যাটাগরি ফোল্ডার',
    nextgenEn: '12+ category folders',
  },
  {
    feature: 'ফাইল টাইপ',
    featureEn: 'File types',
    others: 'শুধু STL বা DXF',
    othersEn: 'Only STL or DXF',
    nextgen: 'STL, DXF, Aspire, ArtCAM, Vectric',
    nextgenEn: 'STL, DXF, Aspire, ArtCAM, Vectric',
  },
  {
    feature: 'সফটওয়্যার সাপোর্ট',
    featureEn: 'Software support',
    others: 'একটি সফটওয়্যার',
    othersEn: 'One software only',
    nextgen: 'Aspire + ArtCAM + Vectric',
    nextgenEn: 'Aspire + ArtCAM + Vectric',
  },
  {
    feature: 'কমার্শিয়াল লাইসেন্স',
    featureEn: 'Commercial license',
    others: 'না / অস্পষ্ট',
    othersEn: 'No / unclear',
    nextgen: 'হ্যাঁ — আনলিমিটেড',
    nextgenEn: 'Yes — unlimited',
  },
  {
    feature: 'আপডেট',
    featureEn: 'Updates',
    others: 'না',
    othersEn: 'No',
    nextgen: 'লাইফটাইম ফ্রি',
    nextgenEn: 'Lifetime free',
  },
  {
    feature: 'সাপোর্ট',
    featureEn: 'Support',
    others: 'না',
    othersEn: 'None',
    nextgen: 'WhatsApp VIP গ্রুপ',
    nextgenEn: 'WhatsApp VIP group',
  },
  {
    feature: 'মূল্য',
    featureEn: 'Price',
    others: '৫০০–২,০০০ ৳',
    othersEn: '500–2,000 ৳',
    nextgen: '১৫০ ৳ (লঞ্চ অফার)',
    nextgenEn: '150 ৳ (launch offer)',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 13 — TESTIMONIALS  (⚠ Replace with Real Proof)                     */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  author: string
  authorEn: string
  role: string
  roleEn: string
  city: string
  cityEn: string
  quote: string
  quoteEn: string
  rating: number
  proof: 'warn' | 'verified'
  proofNote: string
  proofNoteEn: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'কামরুল হাসান',
    authorEn: 'Kamrul Hasan',
    role: 'ফার্নিচার ফ্যাক্টরি মালিক',
    roleEn: 'Furniture Factory Owner',
    city: 'যশোর',
    cityEn: 'Jessore',
    quote:
      'আগে প্রতিটা অর্ডারের জন্য ২-৩ দিন ডিজাইন করতে হতো। এখন এই বান্ডল থেকে সরাসরি ফাইল নিয়ে কাট শুরু করি। ডেলিভারি সময় অর্ধেক হয়ে গেছে।',
    quoteEn:
      'Earlier each order took 2–3 days to design. Now I pull a file straight from this bundle and start cutting. Delivery time has halved.',
    rating: 5,
    proof: 'warn',
    proofNote: '⚠ Replace with Real Proof — Facebook/WhatsApp screenshot যোগ করুন',
    proofNoteEn: '⚠ Replace with Real Proof — add Facebook/WhatsApp screenshot',
  },
  {
    author: 'সাজ্জাদ আহমেদ',
    authorEn: 'Sajjad Ahmed',
    role: 'ফ্রিল্যান্স CNC ডিজাইনার',
    roleEn: 'Freelance CNC Designer',
    city: 'ঢাকা',
    cityEn: 'Dhaka',
    quote:
      'ফাইলগুলো এত সুন্দরভাবে সাজানো যে ক্লায়েন্ট যা চায় সেটা ৩০ সেকেন্ডেই খুঁজে পাই। মাসে ১৫+ অর্ডার ডেলিভারি দিতে পারি এখন।',
    quoteEn:
      'The files are so well organized I find what the client wants in 30 seconds. I now deliver 15+ orders a month.',
    rating: 5,
    proof: 'warn',
    proofNote: '⚠ Replace with Real Proof — Fiverr/Upwork review screenshot যোগ করুন',
    proofNoteEn: '⚠ Replace with Real Proof — add Fiverr/Upwork review screenshot',
  },
  {
    author: 'রফিকুল ইসলাম',
    authorEn: 'Rafiqul Islam',
    role: 'CNC ওয়ার্কশপ মালিক',
    roleEn: 'CNC Workshop Owner',
    city: 'চট্টগ্রাম',
    cityEn: 'Chattogram',
    quote:
      '১৫০ টাকায় ১৫০ GB — প্রথমে বিশ্বাস হয়নি। ডাউনলোড করে দেখলাম সব আসল ফাইল। এক মাসে বান্ডলের দাম ১০ গুণ উঠে গেছে।',
    quoteEn:
      '150 GB for 150 ৳ — I did not believe it at first. Downloaded and every file is real. In one month the bundle paid for itself 10× over.',
    rating: 5,
    proof: 'warn',
    proofNote: '⚠ Replace with Real Proof — WhatsApp স্ক্রিনশট + ফ্যাক্টরি ছবি যোগ করুন',
    proofNoteEn: '⚠ Replace with Real Proof — add WhatsApp screenshot + factory photo',
  },
  {
    author: 'তানভীর রহমান',
    authorEn: 'Tanvir Rahman',
    role: 'ইন্টেরিয়র ডিজাইনার',
    roleEn: 'Interior Designer',
    city: 'খুলনা',
    cityEn: 'Khulna',
    quote:
      'ক্লায়েন্টকে ডিজাইন দেখানোর আগে এই গ্যালারি থেকে রেফারেন্স দেখাই। ক্লায়েন্ট ইম্প্রেস হয়ে যায়, অর্ডার কনফার্ম হয় দ্রুত।',
    quoteEn:
      'Before showing designs to clients I show references from this gallery. Clients are impressed and orders close faster.',
    rating: 5,
    proof: 'warn',
    proofNote: '⚠ Replace with Real Proof — ক্লায়েন্ট প্রজেক্ট ছবি যোগ করুন',
    proofNoteEn: '⚠ Replace with Real Proof — add client project photo',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 14 — CASE STUDIES  (⚠ Replace with Real Proof)                     */
/* -------------------------------------------------------------------------- */

export type CaseStudy = {
  name: string
  nameEn: string
  business: string
  businessEn: string
  before: string
  beforeEn: string
  after: string
  afterEn: string
  timeSaved: string
  timeSavedEn: string
  moneySaved: string
  moneySavedEn: string
  proof: 'warn' | 'verified'
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'কামরুল ফার্নিচার',
    nameEn: 'Kamrul Furniture',
    business: 'ফার্নিচার ফ্যাক্টরি',
    businessEn: 'Furniture Factory',
    before: 'প্রতি অর্ডারে গড়ে ৩ দিন ডিজাইনে ব্যয়, মাসে ৮টি অর্ডার ডেলিভারি।',
    beforeEn: 'Avg 3 days per order on design, 8 orders delivered per month.',
    after: 'বান্ডল থেকে সরাসরি ফাইল ব্যবহার, মাসে ১৮টি অর্ডার ডেলিভারি।',
    afterEn: 'Files pulled straight from the bundle, 18 orders delivered per month.',
    timeSaved: 'প্রতি অর্ডারে ২ দিন সাশ্রয়',
    timeSavedEn: '2 days saved per order',
    moneySaved: 'মাসে +৬০% আয় বৃদ্ধি',
    moneySavedEn: '+60% monthly revenue increase',
    proof: 'warn',
  },
  {
    name: 'সাজ্জাদ ডিজাইন স্টুডিও',
    nameEn: 'Sajjad Design Studio',
    business: 'ফ্রিল্যান্স সার্ভিস',
    businessEn: 'Freelance Service',
    before: 'ফাইল খুঁজতে প্রতিদিন ২ ঘন্টা, মাসে ৬টি ক্লায়েন্ট অর্ডার।',
    beforeEn: '2 hours/day searching for files, 6 client orders per month.',
    after: 'ফাইল খোঁজা সময় ১০ মিনিট, মাসে ১৫+ ক্লায়েন্ট অর্ডার।',
    afterEn: 'File search time down to 10 min, 15+ client orders per month.',
    timeSaved: 'মাসে ৫০+ ঘন্টা সাশ্রয়',
    timeSavedEn: '50+ hours saved per month',
    moneySaved: 'মাসে ৩× আয় বৃদ্ধি',
    moneySavedEn: '3× monthly income increase',
    proof: 'warn',
  },
  {
    name: 'রফিক সিএনসি',
    nameEn: 'Rafiq CNC',
    business: 'CNC ওয়ার্কশপ',
    businessEn: 'CNC Workshop',
    before: 'কাস্টম ডিজাইন না পারলে অর্ডার ফেরত, মাসে ৫টি অর্ডার বাতিল।',
    beforeEn: 'Orders returned when custom design was not possible, 5 cancellations per month.',
    after: 'বান্ডলের রিলিফ ও প্যানেল দিয়ে যেকোনো অর্ডার ডেলিভারি, বাতিল ০।',
    afterEn: 'Any order delivered using bundle reliefs & panels, zero cancellations.',
    timeSaved: 'ডিজাইন প্রস্তুতি ৯০% কম',
    timeSavedEn: '90% less design prep',
    moneySaved: 'মাসে +৪০,০০০ ৳ অতিরিক্ত আয়',
    moneySavedEn: '+40,000 ৳ extra monthly income',
    proof: 'warn',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 15 — WHO IS THIS FOR                                               */
/* -------------------------------------------------------------------------- */

export const WHO_FOR: { bn: string; en: string }[] = [
  { bn: 'ফার্নিচার ফ্যাক্টরি মালিক — যারা ডেলিভারি সময় কমাতে চান', en: 'Furniture factory owners who want to cut delivery time' },
  { bn: 'CNC ওয়ার্কশপ মালিক — যারা প্রতিটা অর্ডারে নতুন করে ডিজাইন করতে চান না', en: 'CNC workshop owners tired of redesigning for every order' },
  { bn: 'ফ্রিল্যান্স CNC ডিজাইনার — যারা ক্লায়েন্ট ডেলিভারি দ্রুত করতে চান', en: 'Freelance CNC designers who want faster client delivery' },
  { bn: 'ফার্নিচার ডিজাইনার — যারা রেফারেন্স লাইব্রেরি চান', en: 'Furniture designers who want a reference library' },
  { bn: 'ইন্টেরিয়র ডিজাইনার — যারা ক্লায়েন্টকে ইম্প্রেস করতে চান', en: 'Interior designers who want to impress clients' },
  { bn: 'মেশিন অপারেটর — যারা নিজের ডিজাইন স্কিল বাড়াতে চান', en: 'Machine operators who want to level up their design skills' },
  { bn: 'Aspire / ArtCAM / Vectric ইউজার — যারা রেডি-টু-কাট ফাইল চান', en: 'Aspire / ArtCAM / Vectric users who want ready-to-cut files' },
  { bn: 'CNC বিগিনার — যারা শেখার সময় রেফারেন্স হিসেবে ফাইল পড়তে চান', en: 'CNC beginners who want to study files as learning references' },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 16 — WHO SHOULD NOT BUY                                            */
/* -------------------------------------------------------------------------- */

export const WHO_NOT_FOR: { bn: string; en: string }[] = [
  { bn: 'যারা শুধু ফ্রি ফাইল খোঁজেন — এই বান্ডল আপনার জন্য না', en: 'If you only want free files — this bundle is not for you' },
  { bn: 'যারা কখনো সফটওয়্যার খুলে প্র্যাকটিস করেন না', en: 'If you never open the software to practice' },
  { bn: 'যাদের কাছে CNC সফটওয়্যার বা মেশিন নেই', en: 'If you do not own CNC software or a machine' },
  { bn: 'যারা এক রাতেই রিচ কিং হওয়ার আশা করেন', en: 'If you expect overnight success without effort' },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 17 — FAQ (40+ SEO-optimized questions)                             */
/* -------------------------------------------------------------------------- */

export type Faq = { q: string; qEn: string; a: string; aEn: string }

export const FAQS: Faq[] = [
  {
    q: 'NextGen CNC Design Bundle কী?',
    qEn: 'What is the NextGen CNC Design Bundle?',
    a: 'এটি ১৫০ GB আকারের একটি ডিজিটাল বান্ডল যাতে ২,৫০০+ রেডি-টু-কাট CNC ডিজাইন ফাইল আছে — STL, DXF, Aspire, ArtCAM, Vectric ফরম্যাটে। দরজা, চেয়ার, বিছানা, ওয়ার্ডরোব, রিলিফ, মন্দির সহ ১২+ ক্যাটাগরিতে সাজানো।',
    aEn: 'It is a 150 GB digital bundle containing 2,500+ ready-to-cut CNC design files in STL, DXF, Aspire, ArtCAM, and Vectric formats. Organized into 12+ categories including doors, chairs, beds, wardrobes, reliefs, and temples.',
  },
  {
    q: 'বান্ডলটির মূল্য কত?',
    qEn: 'How much does the bundle cost?',
    a: 'বর্তমান লঞ্চ অফার মূল্য মাত্র ১৫০ ৳ (মূল মূল্য ১,৫০০ ৳)। এই দামে ১৫০ GB + সব বোনাস + কমার্শিয়াল লাইসেন্স + লাইফটাইম আপডেট পাবেন।',
    aEn: 'The current launch-offer price is just 150 ৳ (original 1,500 ৳). This includes 150 GB + all bonuses + commercial license + lifetime updates.',
  },
  {
    q: 'কিভাবে ডেলিভারি পাব?',
    qEn: 'How do I receive the bundle?',
    a: 'পেমেন্ট নিশ্চিত হওয়ার সাথে সাথে আপনার WhatsApp ও ইমেইলে Google Drive লিংক পাঠানো হবে। ইনস্ট্যান্ট ডাউনলোড — কোনো অপেক্ষা নেই।',
    aEn: 'As soon as your payment is confirmed, a Google Drive link is sent to your WhatsApp and email. Instant download — no waiting.',
  },
  {
    q: 'ফাইলগুলো কোন সফটওয়্যারে চলে?',
    qEn: 'Which software do the files work with?',
    a: 'Vectric Aspire, ArtCAM, Vectric Cut3D, এবং যেকোনো STL/DXF সমর্থনকারী সফটওয়্যারে (Fusion 360, FreeCAD, MeshCAM ইত্যাদি)।',
    aEn: 'Vectric Aspire, ArtCAM, Vectric Cut3D, and any software that supports STL/DXF (Fusion 360, FreeCAD, MeshCAM, etc.).',
  },
  {
    q: 'আমি কি এই ফাইলগুলো বাণিজ্যিকভাবে ব্যবহার করতে পারব?',
    qEn: 'Can I use these files commercially?',
    a: 'হ্যাঁ। বান্ডলের সাথে আনলিমিটেড কমার্শিয়াল লাইসেন্স অন্তর্ভুক্ত — আপনার ফ্যাক্টরি, ওয়ার্কশপ, বা ফ্রিল্যান্স ক্লায়েন্টের জন্য আনলিমিটেড ব্যবহার। শুধু ফাইলগুলো পুনরায় বিক্রি করা যাবে না।',
    aEn: 'Yes. The bundle includes an unlimited commercial license — for your factory, workshop, or freelance clients. You just cannot resell the files themselves.',
  },
  {
    q: 'আমার ইন্টারনেট স্পিড কম — ১৫০ GB কিভাবে ডাউনলোড করব?',
    qEn: 'My internet is slow — how do I download 150 GB?',
    a: 'Google Drive লিংক পাওয়ার পর আপনি আপনার সুবিধামতো যেকোনো সময়, যেকোনো ডিভাইস থেকে ডাউনলোড করতে পারবেন। লিংক আজীবন থাকে — তাড়াহুড়ো নেই।',
    aEn: 'Once you have the Google Drive link you can download anytime, from any device, at your convenience. The link stays active forever — no rush.',
  },
  {
    q: 'ফাইলগুলো কি সত্যিই কাট-রেডি?',
    qEn: 'Are the files truly cut-ready?',
    a: 'বেশিরভাগ ফাইল কাট-রেডি — শুধু আপনার মেশিনের স্পেসিফিকেশন (ফিড, স্পিড, টুল) বসিয়ে টুলপাথ জেনারেট করলেই চলবে। কিছু ফাইল রেফারেন্স হিসেবে দেওয়া হয়েছে যা আপনি কাস্টমাইজ করতে পারবেন।',
    aEn: 'Most files are cut-ready — just set your machine specs (feed, speed, tool) and generate the toolpath. Some files are provided as references you can customize.',
  },
  {
    q: 'বোনাসগুলো কী কী?',
    qEn: 'What are the bonuses?',
    a: '৬টি বোনাস: ফার্নিচার লাইব্রেরি (৫০০+ ব্লক), HD টেক্সচার প্যাক (২০০+), Aspire ব্রাশ (৮০+), রেডি টুলপাথ টেমপ্লেট (৫০+), কমার্শিয়াল লাইসেন্স, এবং লাইফটাইম আপডেট + VIP সাপোর্ট।',
    aEn: 'Six bonuses: Furniture Library (500+ blocks), HD Texture Pack (200+), Aspire Brushes (80+), Ready Toolpath Templates (50+), Commercial License, and Lifetime Updates + VIP Support.',
  },
  {
    q: 'আপডেট কিভাবে পাব?',
    qEn: 'How do I get updates?',
    a: 'নতুন ফাইল যোগ হলে একই Google Drive ফোল্ডারে যোগ হয়। আপনি কিছু করার দরকার নেই — শুধু ফোল্ডারটি সেভ করে রাখুন, নতুন ফাইল অটোমেটিক দেখতে পাবেন। WhatsApp গ্রুপেও নোটিফিকেশন যায়।',
    aEn: 'New files are added to the same Google Drive folder. You do not need to do anything — just keep the folder saved and you will see new files automatically. Notifications also go to the WhatsApp group.',
  },
  {
    q: 'সাপোর্ট কিভাবে পাব?',
    qEn: 'How do I get support?',
    a: 'VIP WhatsApp সাপোর্ট গ্রুপে যুক্ত হবেন। যেকোনো প্রশ্ন — ফাইল খুঁজতে সমস্যা, সফটওয়্যার সমস্যা, টুলপাথ সমস্যা — সরাসরি গ্রুপে জিজ্ঞাসা করুন।',
    aEn: 'You join a VIP WhatsApp support group. Any question — finding files, software issues, toolpath problems — ask directly in the group.',
  },
  {
    q: '১৫০ ৳ কেন এত কম? কোনো ধোঁকা আছে কি?',
    qEn: 'Why only 150 ৳? Is there a catch?',
    a: 'এটি একটি সীমিত সময়ের লঞ্চ অফার। আমরা বাংলাদেশের CNC কমিউনিটি গড়তে চাই, তাই প্রথম ১০০ জন কাস্টমারকে এই দামে দিচ্ছি। ১০০ জন পূর্ণ হলে মূল্য ১,৫০০ ৳-এ ফিরে যাবে।',
    aEn: 'This is a limited-time launch offer. We want to build Bangladesh\'s CNC community, so the first 100 customers get this price. Once 100 is reached, the price returns to 1,500 ৳.',
  },
  {
    q: 'রিফান্ড পলিসি কী?',
    qEn: 'What is the refund policy?',
    a: 'ডিজিটাল প্রোডাক্ট হওয়ায় ডাউনলোডের পর রিফান্ড সম্ভব না। তবে কোনো ফাইল কাজ না করলে আমরা প্রতিস্থাপন দিই। আপনি যদি সন্তুষ্ট না হন, WhatsApp-এ জানান — আমরা সমাধান করব।',
    aEn: 'As a digital product, refunds are not possible after download. However, if any file does not work we provide a replacement. If you are not satisfied, message us on WhatsApp — we will make it right.',
  },
  {
    q: 'ফাইলগুলো কি বাংলাদেশের ফার্নিচার স্টাইলের?',
    qEn: 'Are the files suited to Bangladeshi furniture styles?',
    a: 'হ্যাঁ, বেশিরভাগ ডিজাইন বাংলাদেশের ফার্নিচার মার্কেট, দরজা স্টাইল, এবং সাংস্কৃতিক প্যাটার্ন অনুসরণ করে তৈরি — যশোর, চট্টগ্রাম, ঢাকার জনপ্রিয় স্টাইল সহ।',
    aEn: 'Yes, most designs follow Bangladeshi furniture markets, door styles, and cultural patterns — including popular styles from Jessore, Chattogram, and Dhaka.',
  },
  {
    q: 'আমি কি ফাইলগুলো পরিবর্তন করতে পারব?',
    qEn: 'Can I modify the files?',
    a: 'একদম। Aspire, ArtCAM, বা Vectric-এ খুলে আপনার প্রয়োজনমতো সাইজ, ডিটেইল, টুলপাথ পরিবর্তন করতে পারবেন। এটাই বান্ডলের সবচেয়ে বড় সুবিধা।',
    aEn: 'Absolutely. Open in Aspire, ArtCAM, or Vectric and modify size, detail, and toolpath to your needs. That is the biggest advantage of the bundle.',
  },
  {
    q: 'আমার মেশিন কি এই ফাইলগুলো কাটতে পারবে?',
    qEn: 'Can my machine cut these files?',
    a: 'যেকোনো 3-axis CNC router (1325, 2030, 6090 ইত্যাদি) যা STL/DXF সাপোর্ট করে, সে সব মেশিনে কাটা যাবে। টুলপাথ আপনার মেশিনের স্পেসিফিকেশন অনুযায়ী সেট করতে হবে।',
    aEn: 'Any 3-axis CNC router (1325, 2030, 6090, etc.) that supports STL/DXF can cut these. The toolpath must be set per your machine specifications.',
  },
  {
    q: 'ভিডিও টিউটোরিয়াল আছে কি?',
    qEn: 'Are there video tutorials?',
    a: 'হ্যাঁ, VIP সাপোর্ট গ্রুপে নিয়মিত টিউটোরিয়াল শেয়ার করা হয় — কিভাবে ফাইল ব্যবহার করবেন, টুলপাথ সেট করবেন, মেশিন রান করবেন। এছাড়া ৭ দিনের CNC বুটক্যাম্পও আছে (আলাদা)।',
    aEn: 'Yes, the VIP support group gets regular tutorials — how to use files, set toolpaths, run the machine. There is also a separate 7-day CNC bootcamp.',
  },
  {
    q: 'বান্ডলটি কি ম্যাকে চলবে?',
    qEn: 'Does the bundle work on Mac?',
    a: 'ফাইলগুলো প্ল্যাটফর্ম-নিরপেক্ষ (STL/DXF)। তবে Aspire, ArtCAM, Vectric উইন্ডোজে চলে। ম্যাকে আপনি Parallels/Boot Camp ব্যবহার করে চালাতে পারেন।',
    aEn: 'The files are platform-agnostic (STL/DXF). However Aspire, ArtCAM, and Vectric run on Windows. On Mac you can use Parallels/Boot Camp.',
  },
  {
    q: 'কতবার ডাউনলোড করতে পারব?',
    qEn: 'How many times can I download?',
    a: 'Google Drive লিংক আজীবন থাকে — যতবার খুশি, যত ডিভাইসে খুশি ডাউনলোড করতে পারবেন।',
    aEn: 'The Google Drive link stays forever — download as many times as you want, on as many devices as you want.',
  },
  {
    q: 'ফাইলগুলো কি ভাইরাস-মুক্ত?',
    qEn: 'Are the files virus-free?',
    a: '১০০%। সব ফাইল Google Drive-এ হোস্ট করা — গুগলের নিজস্ব ভাইরাস স্ক্যান পাস করে। এছাড়া আমরা প্রতিটি ফাইল আপলোডের আগে স্ক্যান করি।',
    aEn: '100%. All files are hosted on Google Drive — scanned by Google\'s own virus scanner. We also scan every file before uploading.',
  },
  {
    q: 'পেমেন্ট কিভাবে করব?',
    qEn: 'How do I pay?',
    a: 'bKash, Nagad, Rocket, বা ব্যাংক ট্রান্সফার। রেজিস্টার করার পর পেমেন্ট ইনস্ট্রাকশন দেখা যাবে। পেমেন্ট নিশ্চিত হলেই লিংক পাবেন।',
    aEn: 'bKash, Nagad, Rocket, or bank transfer. Payment instructions appear after registration. You get the link as soon as payment is confirmed.',
  },
  {
    q: 'আমি কি ফাইলগুলো শেয়ার করতে পারব?',
    qEn: 'Can I share the files?',
    a: 'না। লাইসেন্স শুধু আপনার জন্য। ফাইল শেয়ার করা লাইসেন্স চুক্তি লঙ্ঘন — আইনি ব্যবস্থা নেওয়া হতে পারে। বন্ধুকে রেফার করলে আলাদা রেফারেল অফার আছে।',
    aEn: 'No. The license is for you only. Sharing files violates the license agreement — legal action may be taken. Refer a friend through our separate referral offer instead.',
  },
  {
    q: 'বান্ডলে কতগুলো ফাইল আছে?',
    qEn: 'How many files are in the bundle?',
    a: '২,৫০০+ ফাইল — ১২+ ক্যাটাগরিতে সাজানো। দরজা ৩২০+, চেয়ার ২৮০+, বিছানা ২৪০+, ওয়ার্ডরোব ২১০+, প্যানেল ৩৫০+, রিলিফ ৪০০+ ইত্যাদি।',
    aEn: '2,500+ files organized into 12+ categories. Doors 320+, chairs 280+, beds 240+, wardrobes 210+, panels 350+, reliefs 400+, etc.',
  },
  {
    q: 'ফাইলগুলোর কোয়ালিটি কেমন?',
    qEn: 'What is the quality of the files?',
    a: 'প্রতিটি ফাইল ৭ বছরের অভিজ্ঞ CNC ডিজাইনার তাজ ভাই নিজে যাচাই করেছেন। কোনো কম-কোয়ালিটি, ডুপ্লিকেট, বা কাজ না-করা ফাইল নেই।',
    aEn: 'Every file is verified by Taj Bhai, a 7-year experienced CNC designer. No low-quality, duplicate, or non-working files.',
  },
  {
    q: 'আমি নতুন — এই বান্ডল কি আমার জন্য?',
    qEn: 'I am a beginner — is this bundle for me?',
    a: 'হ্যাঁ, তবে আপনার বেসিক সফটওয়্যার জ্ঞান থাকা দরকার। বান্ডল থেকে ফাইল খুলে দেখলে আপনি শিখবেন কিভাবে প্রফেশনাল ডিজাইন করা হয়। VIP গ্রুপে সাপোর্টও পাবেন।',
    aEn: 'Yes, but you need basic software knowledge. Opening files from the bundle teaches you how professional designs are made. You also get VIP group support.',
  },
  {
    q: 'ফাইলগুলোর নামকরণ কেমন?',
    qEn: 'How are files named?',
    a: 'প্রতিটি ফাইলের নাম স্পষ্ট — ক্যাটাগরি, সাব-টাইপ, সাইজ সহ। যেমন: Door-Panels-Royal-900x2100.stl। সার্চ করলেই পাবেন।',
    aEn: 'Every file is clearly named — category, sub-type, and size included. e.g., Door-Panels-Royal-900x2100.stl. Just search and find.',
  },
  {
    q: 'আমি কি কাস্টম ডিজাইন অর্ডার করতে পারি?',
    qEn: 'Can I order custom designs?',
    a: 'হ্যাঁ। বান্ডলে যা না থাকলে তাজ ভাইয়ের কাস্টম ডিজাইন সার্ভিস আছে (আলাদা ফি)। WhatsApp-এ যোগাযোগ করুন।',
    aEn: 'Yes. If something is not in the bundle, Taj Bhai offers a custom design service (separate fee). Contact on WhatsApp.',
  },
  {
    q: 'বান্ডলটি কি ব্যবসার জন্য ভালো?',
    qEn: 'Is the bundle good for business?',
    a: 'এটাই বান্ডলের মূল উদ্দেশ্য। ফাইল খোঁজার সময় কমান, ডেলিভারি দ্রুত করুন, ক্লায়েন্ট বেশি সন্তুষ্ট করুন, আয় বাড়ান।',
    aEn: 'That is the main purpose. Cut file-search time, deliver faster, satisfy more clients, grow income.',
  },
  {
    q: 'Google Drive লিংক কি মুছে যাবে?',
    qEn: 'Will the Google Drive link be deleted?',
    a: 'না। লিংক আজীবন থাকে। আপনি ফাইল আপনার নিজের ড্রাইভে "Make a copy" করেও সেভ করে রাখতে পারেন।',
    aEn: 'No. The link stays forever. You can also "Make a copy" to your own Drive for safekeeping.',
  },
  {
    q: 'ফাইলগুলো কি রিভার্স-ইঞ্জিনিয়ার করা বা চুরি করা?',
    qEn: 'Are the files reverse-engineered or stolen?',
    a: 'কখনোই না। প্রতিটি ফাইল NextGen Digital Studio-তে তৈরি বা লিগ্যালি লাইসেন্সকৃত। কপিরাইট সম্পূর্ণ আমাদের।',
    aEn: 'Never. Every file is created by or legally licensed to NextGen Digital Studio. Copyright is fully ours.',
  },
  {
    q: 'আমি কি প্রথমে কিছু ফাইল টেস্ট করতে পারি?',
    qEn: 'Can I test some files first?',
    a: 'হ্যাঁ। নিচে ফ্রি প্রিভিউ সেকশনে কিছু স্যাম্পল ফাইল ডাউনলোড করতে পারেন। অথবা WhatsApp-এ মেসেজ করলে আমরা ৩টি স্যাম্পল ফাইল পাঠাব।',
    aEn: 'Yes. Download some sample files from the free preview section below. Or message us on WhatsApp and we will send 3 sample files.',
  },
  {
    q: '১৫০ ৳ কি এককালীন নাকি মাসিক?',
    qEn: 'Is 150 ৳ one-time or monthly?',
    a: 'এককালীন। কোনো মাসিক ফি নেই। একবার কিনলে আজীবন ব্যবহার + আপডেট ফ্রি।',
    aEn: 'One-time. No monthly fee. Buy once, use forever, free updates.',
  },
  {
    q: 'আমি কি পরে আপগ্রেড করতে পারব?',
    qEn: 'Can I upgrade later?',
    a: 'বান্ডলে সব কিছু অন্তর্ভুক্ত — আপগ্রেডের দরকার নেই। তবে ৭ দিনের CNC বুটক্যাম্প (২৫০ ৳) আলাদাভাবে কিনতে পারেন।',
    aEn: 'The bundle includes everything — no upgrade needed. However the 7-day CNC bootcamp (250 ৳) can be purchased separately.',
  },
  {
    q: 'ফাইলগুলো কি HD কোয়ালিটির?',
    qEn: 'Are the files HD quality?',
    a: 'হ্যাঁ। রিলিফ ও 3D ফাইলগুলো উচ্চ-রেজোলিউশন মেশ সহ, 2D ফাইলগুলো পরিষ্কার ভেক্টর। কাটের সময় কোনো ডিটেইল হারাবেন না।',
    aEn: 'Yes. Relief & 3D files have high-resolution meshes, 2D files are clean vectors. You will lose no detail during cutting.',
  },
  {
    q: 'আমি বাইরে থেকে কিনতে পারি?',
    qEn: 'Can I buy from outside Bangladesh?',
    a: 'হ্যাঁ। পেপ্যাল বা কার্ড পেমেন্টের জন্য WhatsApp-এ যোগাযোগ করুন। দাম আন্তর্জাতিক রেটে নির্ধারিত হবে।',
    aEn: 'Yes. For PayPal or card payment, contact on WhatsApp. Price will be set at an international rate.',
  },
  {
    q: 'বান্ডল কিনলে কি সার্টিফিকেট পাব?',
    qEn: 'Do I get a certificate with the bundle?',
    a: 'না, সার্টিফিকেট শুধু ৭ দিনের CNC বুটক্যাম্পের জন্য। বান্ডল হলো ডিজাইন ফাইল কালেকশন — কোর্স না।',
    aEn: 'No, the certificate is only for the 7-day CNC bootcamp. The bundle is a design-file collection — not a course.',
  },
  {
    q: 'ফাইলগুলো কি রেগুলার আপডেট হয়?',
    qEn: 'Are files updated regularly?',
    a: 'হ্যাঁ। প্রতি মাসে নতুন ফাইল যোগ হয়। আপনি কিছু না করলেও একই ফোল্ডারে নতুন ফাইল দেখতে পাবেন।',
    aEn: 'Yes. New files are added every month. Even if you do nothing, new files appear in the same folder.',
  },
  {
    q: 'আমি কি ফাইলগুলো প্রিন্ট করতে পারব?',
    qEn: 'Can I print the files?',
    a: 'ফাইলগুলো CNC কাটের জন্য — 3D প্রিন্টারের জন্য না। তবে STL ফাইলগুলো 3D প্রিন্টারেও চলবে।',
    aEn: 'The files are for CNC cutting — not 3D printers. However the STL files will also work on 3D printers.',
  },
  {
    q: 'সবচেয়ে বড় ফাইলটি কত বড়?',
    qEn: 'How big is the largest file?',
    a: 'বড় রিলিফ ফাইলগুলো ২০০-৫০০ MB পর্যন্ত হতে পারে। ছোট 2D ফাইল ৫০ KB-এর নিচে। গড় ফাইল সাইজ ৫-১০ MB।',
    aEn: 'Large relief files can be 200–500 MB. Small 2D files are under 50 KB. Average file size is 5–10 MB.',
  },
  {
    q: 'আমি কি ফাইলগুলো ক্লাউডে সেভ রাখতে পারব?',
    qEn: 'Can I keep the files in the cloud?',
    a: 'হ্যাঁ। Google Drive-এই হোস্ট করা, আর আপনি নিজের ড্রাইভে "Make a copy" করে আজীবন সেভ রাখতে পারেন।',
    aEn: 'Yes. Hosted on Google Drive, and you can "Make a copy" to your own Drive to keep forever.',
  },
  {
    q: 'অফারটি কবে শেষ হবে?',
    qEn: 'When does the offer end?',
    a: 'প্রথম ১০০ জন কাস্টমার পূর্ণ হলে বা ৭২ ঘন্টা পরে — যা আগে ঘটে। এরপর মূল্য ১,৫০০ ৳-এ ফিরে যাবে।',
    aEn: 'When the first 100 customers are reached OR after 72 hours — whichever comes first. After that, the price returns to 1,500 ৳.',
  },
  {
    q: 'আমার প্রশ্ন এখানে নেই — কি করব?',
    qEn: 'My question is not here — what do I do?',
    a: 'WhatsApp-এ সরাসরি তাজ ভাইকে জিজ্ঞাসা করুন। উত্তর পাবেন কয়েক মিনিটের মধ্যে।',
    aEn: 'Ask Taj Bhai directly on WhatsApp. You will get an answer within minutes.',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 18 — RISK REVERSAL / GUARANTEES                                    */
/* -------------------------------------------------------------------------- */

export type Guarantee = {
  title: string
  titleEn: string
  desc: string
  descEn: string
  emoji: string
}

export const GUARANTEES: Guarantee[] = [
  {
    title: 'ফাইল কাজ গ্যারান্টি',
    titleEn: 'File-Works Guarantee',
    desc: 'কোনো ফাইল কাজ না করলে ২৪ ঘন্টার মধ্যে প্রতিস্থাপন বা ফিক্স করে দেব।',
    descEn: 'If any file does not work, I will replace or fix it within 24 hours.',
    emoji: '✅',
  },
  {
    title: 'ডাউনলোড গ্যারান্টি',
    titleEn: 'Download Guarantee',
    desc: 'Google Drive লিংক আজীবন থাকে — যতবার খুশি ডাউনলোড করুন।',
    descEn: 'The Google Drive link stays forever — download as many times as you want.',
    emoji: '⬇️',
  },
  {
    title: 'সাপোর্ট গ্যারান্টি',
    titleEn: 'Support Guarantee',
    desc: 'VIP WhatsApp গ্রুপে যেকোনো প্রশ্ন — সর্বোচ্চ ৬ ঘন্টায় উত্তর পাবেন।',
    descEn: 'Any question in the VIP WhatsApp group — answered within 6 hours max.',
    emoji: '🎧',
  },
  {
    title: 'আপডেট গ্যারান্টি',
    titleEn: 'Update Guarantee',
    desc: 'নতুন ফাইল যোগ হলে আজীবন ফ্রি — কোনো হিডেন ফি নেই।',
    descEn: 'New files added forever, free — no hidden fees.',
    emoji: '🔄',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 5 — BEFORE / AFTER                                                 */
/* -------------------------------------------------------------------------- */

export const BEFORE_AFTER = {
  before: {
    title: 'আজকের অবস্থা',
    titleEn: 'Today',
    items: [
      { bn: 'প্রতিটা অর্ডারে ২-৩ দিন ডিজাইন করতে হয়', en: '2–3 days designing per order' },
      { bn: 'একই ডিজাইন বারবার নতুন করে করতে হয়', en: 'Redesigning the same files again & again' },
      { bn: 'ফাইল খুঁজতে ঘন্টার পর ঘন্টা নষ্ট', en: 'Hours wasted searching for files' },
      { bn: 'ক্লায়েন্ট অপেক্ষা করে — অর্ডার হাতছাড়া', en: 'Clients wait — orders lost' },
      { bn: 'Pinterest/Google থেকে এলোমেলো ফাইল', en: 'Scattered files from Pinterest/Google' },
      { bn: 'কোনো সিস্টেম নেই, কোনো লাইব্রেরি নেই', en: 'No system, no library' },
    ],
  },
  after: {
    title: 'বান্ডল কেনার পর',
    titleEn: 'After the bundle',
    items: [
      { bn: '৩০ সেকেন্ডে ফাইল খুঁজে কাট শুরু', en: 'Find a file in 30 seconds, start cutting' },
      { bn: 'একই ফাইল বারবার ব্যবহার — সময় বাঁচান', en: 'Reuse the same files — save time' },
      { bn: '১২+ ক্যাটাগরিতে সাজানো লাইব্রেরি', en: '12+ category organized library' },
      { bn: 'ক্লায়েন্টকে দ্রুত ডেলিভারি — বেশি অর্ডার', en: 'Faster client delivery — more orders' },
      { bn: 'সব ফাইল এক জায়গায়, সব ফরম্যাটে', en: 'All files in one place, all formats' },
      { bn: 'প্রফেশনাল সিস্টেম — আয় বাড়ে', en: 'Professional system — income grows' },
    ],
  },
}

/* -------------------------------------------------------------------------- */
/*  SECTION 3 — PROBLEM (hidden costs)                                         */
/* -------------------------------------------------------------------------- */

export const PROBLEMS = [
  {
    emoji: '⏰',
    title: 'সময়ের অপচয়',
    titleEn: 'Time Cost',
    desc: 'প্রতিটা অর্ডারে ২-৩ দিন ডিজাইনে। মাসে ১০টি অর্ডারে ৩০ দিন — আপনার পুরো মাস শুধু ডিজাইনেই শেষ।',
    descEn: '2–3 days designing per order. 10 orders a month = 30 days — your whole month spent just designing.',
  },
  {
    emoji: '💰',
    title: 'টাকার অপচয়',
    titleEn: 'Money Cost',
    desc: 'প্রতিজন ডিজাইনার মাসে ১৫,০০০-২৫,০০০ ৳। কাস্টম ডিজাইন প্রতিটা ৫০০-২,০০০ ৳। বছরে লক্ষাধিক টাকা শুধু ডিজাইনে।',
    descEn: 'A designer costs 15,000–25,000 ৳/month. Custom design 500–2,000 ৳ each. Lakhs per year on design alone.',
  },
  {
    emoji: '🎯',
    title: 'সুযোগ হারানো',
    titleEn: 'Opportunity Cost',
    desc: 'ক্লায়েন্ট ২ দিন অপেক্ষা করে না — সে অন্য কাউকে দিয়ে দেয়। আপনি ধীর হওয়ায় অর্ডার হাতছাড়া হয়।',
    descEn: 'Clients do not wait 2 days — they go elsewhere. Being slow costs you orders.',
  },
  {
    emoji: '🔄',
    title: 'একই কাজ বারবার',
    titleEn: 'Redundant Work',
    desc: 'গত মাসে যে দরজা ডিজাইন করেছেন, এই মাসেও আবার নতুন করে করছেন। একই কাজ বারবার — কোনো লাইব্রেরি নেই।',
    descEn: 'The door you designed last month? You are redesigning it this month. Same work repeated — no library.',
  },
]
