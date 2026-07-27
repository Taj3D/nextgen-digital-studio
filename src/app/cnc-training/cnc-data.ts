/**
 * CNC 3D Design Bootcamp — central data source.
 *
 * Used by:
 *  - page.tsx            (server component → JSON-LD structured data + metadata)
 *  - cnc-training-client.tsx (client component → renders every section)
 *
 * Single source of truth keeps copy + schema in perfect sync for SEO.
 *
 * BILINGUAL CONVENTION:
 *  - For object arrays (CURRICULUM, GALLERY, BONUSES, VALUE_STACK, COMPARISON,
 *    CASE_STUDIES, TESTIMONIALS, OBJECTIONS, CAREER_STEPS, INCOME_OPPORTUNITIES,
 *    GUARANTEE_BADGES, FAQS): every translatable string field keeps its existing
 *    unsuffixed Bangla name (e.g. `title`, `desc`, `q`, `a`, `name`, `city`)
 *    AND gets a matching `En`-suffixed English field (e.g. `titleEn`, `descEn`,
 *    `qEn`, `aEn`, `nameEn`, `cityEn`).
 *  - For plain-string arrays (WHO_FOR, WHO_NOT_FOR): each item is an object
 *    `{ bn: string; en: string }`.
 *  - For CNC_COURSE: the existing `Bn`-suffix convention is kept (English =
 *    unsuffixed, Bangla = `Bn`-suffixed), except `batchStart` which is Bangla
 *    in the unsuffixed slot and gets a new `batchStartEn` for English.
 */

export const CNC_COURSE = {
  name: 'CNC 3D Design Bootcamp',
  nameBn: 'CNC 3D ডিজাইন বুটক্যাম্প',
  price: 250,
  originalPrice: 5990,
  totalValue: 24490,
  currency: 'BDT',
  duration: '7 days',
  durationBn: '৭ দিন',
  time: '9 PM (BD)',
  timeBn: 'রাত ৯টা (বাংলাদেশ সময়)',
  language: 'Bangla',
  maxSeats: 30,
  seatsTaken: 17,
  seatsLeft: 13,
  batchStart: '০১ সেপটেম্বর',
  batchStartEn: '1 September',
  rating: 4.8,
  students: 150,
  designFiles: 4000,
  factories: 30,
  experienceYears: 7,
  bonusProjects: 8,
  mainProjects: 15,
  url: 'https://nextgendigitalstudio.com/cnc-training',
  instructorName: 'Mohammad Nazmul Islam Taj',
  instructorNameBn: 'মোঃ নাজমুল ইসলাম তাজ',
  instructorTitle: 'CNC Design Specialist & Founder, NextGen Digital Studio',
  instructorTitleBn: 'CNC ডিজাইন বিশেষজ্ঞ ও প্রতিষ্ঠাতা, NextGen Digital Studio',
}

export type CurriculumDay = {
  day: number
  title: string
  titleEn: string
  desc: string
  descEn: string
  project: string
  projectEn: string
  icon: string
  isMain?: boolean
  isGraduation?: boolean
}

export const CURRICULUM: CurriculumDay[] = [
  {
    day: 1,
    title: 'CNC বেসিক ও সফটওয়্যার পরিচিতি',
    titleEn: 'CNC Basics & Software Introduction',
    desc: 'Aspire, Vectric, ArtCAM — সফটওয়্যার সেটআপ, ইন্টারফেস, টুলস সম্পর্কে বিস্তারিত ধারণা।',
    descEn: 'Aspire, Vectric, ArtCAM — a detailed walkthrough of software setup, interface, and tools.',
    project: 'প্রজেক্ট: সফটওয়্যার সেটআপ',
    projectEn: 'Project: Software Setup',
    icon: 'Cpu',
  },
  {
    day: 2,
    title: 'শূন্য থেকে Relief ডিজাইন',
    titleEn: 'Relief Design From Scratch',
    desc: 'আপনার প্রথম 3D Relief তৈরি — বেসিক থেকে অ্যাডভান্সড টেকনিক।',
    descEn: 'Create your first 3D Relief — from basic to advanced techniques.',
    project: 'প্রজেক্ট: প্রথম Relief',
    projectEn: 'Project: First Relief',
    icon: 'Layers',
  },
  {
    day: 3,
    title: 'ফটো থেকে 3D স্কাল্পট',
    titleEn: 'Photo to 3D Sculpt',
    desc: 'যেকোনো ফটোকে 3D Relief-এ রূপান্তর করার সম্পূর্ণ প্রক্রিয়া।',
    descEn: 'The complete process of converting any photo into a 3D Relief.',
    project: 'প্রজেক্ট: ফটো স্কাল্পট',
    projectEn: 'Project: Photo Sculpt',
    icon: 'PenTool',
  },
  {
    day: 4,
    title: 'ফার্নিচার ও দরজা প্যানেল',
    titleEn: 'Furniture & Door Panels',
    desc: 'ইন্ডাস্ট্রি-গ্রেড প্যানেল ডিজাইন — প্রফেশনাল স্টাইলে।',
    descEn: 'Industry-grade panel design — in a professional style.',
    project: 'প্রজেক্ট: প্যানেল ডিজাইন',
    projectEn: 'Project: Panel Design',
    icon: 'Boxes',
  },
  {
    day: 5,
    title: 'টুলপাথ ও মেশিন সেটআপ',
    titleEn: 'Toolpath & Machine Setup',
    desc: 'G-code, টুলিং, ফিড ও স্পিড — মেশিন রেডি ফাইল তৈরি।',
    descEn: 'G-code, tooling, feeds and speeds — producing machine-ready files.',
    project: 'প্রজেক্ট: টুলপাথ',
    projectEn: 'Project: Toolpath',
    icon: 'Wrench',
  },
  {
    day: 6,
    title: 'লাইভ প্রজেক্ট: চেয়ার লেগ',
    titleEn: 'Live Project: Chair Leg',
    desc: 'একটি সত্যিকারের Chair Leg স্কাল্পট করুন — শুরু থেকে শেষ পর্যন্ত।',
    descEn: 'Sculpt a real Chair Leg from start to finish — live, end to end.',
    project: '🔥 প্রধান প্রজেক্ট',
    projectEn: '🔥 Main Project',
    icon: 'Gift',
    isMain: true,
  },
  {
    day: 7,
    title: 'ডেমো ডে + সার্টিফিকেট',
    titleEn: 'Demo Day + Certificate',
    desc: 'প্রজেক্ট প্রেজেন্টেশন, ফিডব্যাক এবং সার্টিফিকেট গ্রহণ।',
    descEn: 'Project presentations, feedback, and certificate ceremony.',
    project: '🎓 গ্র্যাজুয়েশন',
    projectEn: '🎓 Graduation',
    icon: 'Award',
    isGraduation: true,
  },
]

export type GalleryItem = {
  emoji: string
  label: string
  labelEn: string
  sub: string
  subEn: string
}

export const GALLERY: GalleryItem[] = [
  { emoji: '🪑', label: 'Chair Leg', labelEn: 'Chair Leg', sub: 'ফ্রি ফাইল', subEn: 'Free File' },
  { emoji: '🚪', label: 'Door Panel', labelEn: 'Door Panel', sub: 'ইন্ডাস্ট্রি-গ্রেড', subEn: 'Industry-Grade' },
  { emoji: '🌿', label: 'Relief Design', labelEn: 'Relief Design', sub: '3D স্কাল্পট', subEn: '3D Sculpt' },
  { emoji: '🏛️', label: 'Temple Design', labelEn: 'Temple Design', sub: 'সাংস্কৃতিক', subEn: 'Cultural' },
  { emoji: '🪵', label: 'Furniture', labelEn: 'Furniture', sub: 'ফার্নিচার', subEn: 'Furniture' },
  { emoji: '👤', label: '3D Face', labelEn: '3D Face', sub: 'পোর্ট্রেট', subEn: 'Portrait' },
  { emoji: '🪟', label: 'Window Panel', labelEn: 'Window Panel', sub: 'ডেকোরেটিভ', subEn: 'Decorative' },
  { emoji: '🐘', label: 'Animal Relief', labelEn: 'Animal Relief', sub: 'ওয়াইল্ডলাইফ', subEn: 'Wildlife' },
  { emoji: '🌸', label: 'Flower Relief', labelEn: 'Flower Relief', sub: 'ন্যাচারাল', subEn: 'Natural' },
]

export type Bonus = {
  icon: string
  title: string
  titleEn: string
  desc: string
  descEn: string
  value: number
}

export const BONUSES: Bonus[] = [
  { icon: 'Armchair', title: 'Chair Leg Design', titleEn: 'Chair Leg Design', desc: 'রেডি-টু-ইউজ ফাইল', descEn: 'Ready-to-use file', value: 300 },
  { icon: 'Sofa', title: 'Furniture Library', titleEn: 'Furniture Library', desc: '৫০+ ফার্নিচার ডিজাইন', descEn: '50+ furniture designs', value: 500 },
  { icon: 'Palette', title: 'Texture & Brush Pack', titleEn: 'Texture & Brush Pack', desc: '২০০+ টেক্সচার', descEn: '200+ textures', value: 1200 },
  { icon: 'Settings', title: 'Toolpath Library', titleEn: 'Toolpath Library', desc: '১০০+ টুলপাথ সেটিংস', descEn: '100+ toolpath settings', value: 2500 },
  { icon: 'FileText', title: 'Practice Files Bundle', titleEn: 'Practice Files Bundle', desc: '৫০০+ প্র্যাকটিস ফাইল', descEn: '500+ practice files', value: 3000 },
  { icon: 'RefreshCw', title: 'Lifetime Updates', titleEn: 'Lifetime Updates', desc: 'সারাজীবন আপডেট', descEn: 'Lifetime updates', value: 2500 },
  { icon: 'Users', title: 'Private Community', titleEn: 'Private Community', desc: 'সাপোর্ট ও নেটওয়ার্কিং', descEn: 'Support & networking', value: 2500 },
  { icon: 'Briefcase', title: 'Freelancing & Job Guide', titleEn: 'Freelancing & Job Guide', desc: 'ক্লায়েন্ট পাওয়ার কৌশল', descEn: 'Client acquisition strategies', value: 2000 },
  { icon: 'HelpCircle', title: 'Interview Q&A', titleEn: 'Interview Q&A', desc: 'চাকরির প্রস্তুতি', descEn: 'Job interview prep', value: 1500 },
  { icon: 'Map', title: 'Career Roadmap', titleEn: 'Career Roadmap', desc: '৩ বছরের প্ল্যান', descEn: '3-year career plan', value: 2000 },
]

export type ValueStackItem = { label: string; labelEn: string; value: number }

export const VALUE_STACK: ValueStackItem[] = [
  { label: 'কোর্স', labelEn: 'Course', value: 5990 },
  { label: 'Chair Leg', labelEn: 'Chair Leg', value: 300 },
  { label: 'Furniture Library', labelEn: 'Furniture Library', value: 500 },
  { label: 'Texture Pack', labelEn: 'Texture Pack', value: 1200 },
  { label: 'Toolpath', labelEn: 'Toolpath', value: 2500 },
  { label: 'Practice Files', labelEn: 'Practice Files', value: 3000 },
  { label: 'Lifetime Updates', labelEn: 'Lifetime Updates', value: 2500 },
  { label: 'Community', labelEn: 'Community', value: 2500 },
  { label: 'Job Guide', labelEn: 'Job Guide', value: 2000 },
  { label: 'Interview Q&A', labelEn: 'Interview Q&A', value: 1500 },
  { label: 'Career Roadmap', labelEn: 'Career Roadmap', value: 2000 },
]

export type ComparisonRow = {
  feature: string
  featureEn: string
  other: string
  otherEn: string
  ours: string
  oursEn: string
}

export const COMPARISON: ComparisonRow[] = [
  { feature: 'মূল্য', featureEn: 'Price', other: '১০,০০০+ ৳', otherEn: '৳10,000+', ours: '২৫০ ৳', oursEn: '৳250' },
  { feature: 'ক্লাস পদ্ধতি', featureEn: 'Class Format', other: 'প্রাক-রেকর্ডেড', otherEn: 'Pre-recorded', ours: 'লাইভ জুম', oursEn: 'Live Zoom' },
  { feature: 'সাপোর্ট', featureEn: 'Support', other: 'না', otherEn: 'No', ours: 'WhatsApp + প্রাইভেট গ্রুপ', oursEn: 'WhatsApp + Private Group' },
  { feature: 'প্রজেক্ট', featureEn: 'Projects', other: '২-৩টি', otherEn: '2-3', ours: '১৫+ প্রজেক্ট', oursEn: '15+ projects' },
  { feature: 'বোনাস', featureEn: 'Bonuses', other: 'কোনো বোনাস নেই', otherEn: 'No bonuses', ours: '২২,০০০+ টাকার বোনাস', oursEn: '৳22,000+ in bonuses' },
  { feature: 'রেকর্ডিং', featureEn: 'Recordings', other: 'সীমিত', otherEn: 'Limited', ours: 'লাইফটাইম অ্যাক্সেস', oursEn: 'Lifetime access' },
  { feature: 'সার্টিফিকেট', featureEn: 'Certificate', other: 'হ্যাঁ', otherEn: 'Yes', ours: 'প্রফেশনাল সার্টিফিকেট', oursEn: 'Professional certificate' },
  { feature: 'টাকা ফেরত', featureEn: 'Money-Back', other: 'না', otherEn: 'No', ours: '১০০% গ্যারান্টি', oursEn: '100% guarantee' },
  { feature: 'পোর্টফোলিও', featureEn: 'Portfolio', other: 'না', otherEn: 'No', ours: '৭টি মূল প্রজেক্ট', oursEn: '7 main projects' },
  { feature: 'ফ্রিল্যান্সিং গাইড', featureEn: 'Freelancing Guide', other: 'না', otherEn: 'No', ours: 'সম্পূর্ণ গাইড', oursEn: 'Complete guide' },
]

export type CaseStudy = {
  name: string
  nameEn: string
  city: string
  cityEn: string
  before: string
  beforeEn: string
  after: string
  afterEn: string
  result: string
  resultEn: string
}

export const CASE_STUDIES: CaseStudy[] = [
  { name: 'রকিবুল হাসান', nameEn: 'Rakibul Hasan', city: 'সিলেট', cityEn: 'Sylhet', before: 'CNC ডিজাইন জানতেন না', beforeEn: 'No prior CNC design knowledge', after: 'ফ্রিল্যান্সিং শুরু, প্রথম ক্লায়েন্ট ৫,০০০ টাকা', afterEn: 'Started freelancing, first client ৳5,000', result: '✅ আয় শুরু', resultEn: '✅ Earning started' },
  { name: 'আব্দুল্লাহ আল নোমান', nameEn: 'Abdullah Al Noaman', city: 'যশোর', cityEn: 'Jashore', before: 'ফার্নিচার ব্যবসায় খরচ বেশি', beforeEn: 'High costs in furniture business', after: 'নিজের ডিজাইন তৈরি করে খরচ কমেছে ৪০%', afterEn: 'Designing in-house cut costs by 40%', result: '✅ ব্যবসায় উন্নতি', resultEn: '✅ Business improved' },
  { name: 'সুমাইয়া আক্তার', nameEn: 'Sumaiya Akter', city: 'ঢাকা', cityEn: 'Dhaka', before: 'ফ্রিল্যান্সিং করতে পারতেন না', beforeEn: 'Could not freelance', after: 'প্রথম প্রজেক্ট ১০,০০০ টাকা, ৪০x ROI', afterEn: 'First project ৳10,000, 40x ROI', result: '✅ ৪০x ROI', resultEn: '✅ 40x ROI' },
  { name: 'মিজানুর রহমান', nameEn: 'Mizanur Rahman', city: 'খুলনা', cityEn: 'Khulna', before: 'কোন দক্ষতা ছিল না', beforeEn: 'No prior skills', after: 'মাসে ১৫,০০০+ আয় ডিজাইন ফাইল বিক্রি করে', afterEn: 'Earning ৳15,000+/month selling design files', result: '✅ স্থিতিশীল আয়', resultEn: '✅ Stable income' },
  { name: 'ফাতেমা বেগম', nameEn: 'Fatema Begum', city: 'রাজশাহী', cityEn: 'Rajshahi', before: 'চাকরি খুঁজছিলেন', beforeEn: 'Was job hunting', after: 'ফ্যাক্টরিতে CNC ডিজাইনার হিসেবে চাকরি পেয়েছেন', afterEn: 'Got hired as a CNC designer in a factory', result: '✅ চাকরি', resultEn: '✅ Got a job' },
  { name: 'শহিদুল ইসলাম', nameEn: 'Shahidul Islam', city: 'চট্টগ্রাম', cityEn: 'Chattogram', before: 'কোন পোর্টফোলিও ছিল না', beforeEn: 'No portfolio', after: '৫টি প্রজেক্ট দেখিয়ে ফ্রিল্যান্সিং শুরু', afterEn: 'Started freelancing with 5 projects', result: '✅ পোর্টফোলিও', resultEn: '✅ Portfolio built' },
  { name: 'নাদিয়া পারভীন', nameEn: 'Nadia Parvin', city: 'বরিশাল', cityEn: 'Barishal', before: 'আত্মবিশ্বাস ছিল না', beforeEn: 'Lacked confidence', after: 'নিজের ডিজাইন ফাইল অনলাইনে বিক্রি করছেন', afterEn: 'Selling her own design files online', result: '✅ অনলাইন বিক্রি', resultEn: '✅ Online sales' },
  { name: 'আরিফ হোসেন', nameEn: 'Arif Hossain', city: 'ময়মনসিংহ', cityEn: 'Mymensingh', before: 'ফ্যাক্টরিতে শ্রমিক ছিলেন', beforeEn: 'Was a factory worker', after: 'CNC অপারেটর ও ডিজাইনার হয়েছেন', afterEn: 'Became a CNC operator & designer', result: '✅ ক্যারিয়ার পরিবর্তন', resultEn: '✅ Career change' },
  { name: 'মাহমুদা আক্তার', nameEn: 'Mahmuda Akter', city: 'কুমিল্লা', cityEn: 'Cumilla', before: 'কোন ইনকাম ছিল না', beforeEn: 'No income', after: 'Fiverr-এ CNC ডিজাইন সেবা শুরু', afterEn: 'Started offering CNC design services on Fiverr', result: '✅ ফ্রিল্যান্সিং', resultEn: '✅ Freelancing' },
  { name: 'জুবায়ের আহমেদ', nameEn: 'Zubayer Ahmed', city: 'সিলেট', cityEn: 'Sylhet', before: 'স্বপ্ন ছিল নিজের ব্যবসা', beforeEn: 'Dreamt of his own business', after: 'ফার্নিচার ডিজাইন শিখে ব্যবসা শুরু', afterEn: 'Started a business after learning furniture design', result: '✅ উদ্যোক্তা', resultEn: '✅ Entrepreneur' },
]

export type Testimonial = {
  quote: string
  quoteEn: string
  author: string
  authorEn: string
  city: string
  cityEn: string
  result: string
  resultEn: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '৭ দিনে আমি Chair Leg ডিজাইন করতে শিখেছি। এখন ফ্রিল্যান্সিং শুরু করেছি। ২৫০ টাকা ছিল আমার সেরা ইনভেস্টমেন্ট।',
    quoteEn: 'In just 7 days I learned to design a Chair Leg. Now I have started freelancing. ৳250 was the best investment I ever made.',
    author: 'রকিবুল হাসান',
    authorEn: 'Rakibul Hasan',
    city: 'সিলেট',
    cityEn: 'Sylhet',
    result: '✅ প্রথম ক্লায়েন্ট ৫,০০০ টাকা',
    resultEn: '✅ First client ৳5,000',
    rating: 5,
  },
  {
    quote: 'আমার ফার্নিচার ব্যবসায় নিজের ডিজাইন তৈরি করি। এই কোর্স আমাকে পুরোপুরি বদলে দিয়েছে।',
    quoteEn: 'I now create my own designs for my furniture business. This course completely transformed me.',
    author: 'আব্দুল্লাহ আল নোমান',
    authorEn: 'Abdullah Al Noaman',
    city: 'যশোর',
    cityEn: 'Jashore',
    result: '✅ ব্যবসায় খরচ কমেছে ৪০%',
    resultEn: '✅ Business costs down 40%',
    rating: 5,
  },
  {
    quote: 'আমি ফ্রিল্যান্সার। এই কোর্সের পর প্রথম প্রজেক্ট পাই ১০,০০০ টাকা। ২৫০ টাকায় ৪০x রিটার্ন!',
    quoteEn: 'I am a freelancer. After this course I landed my first project for ৳10,000. A 40x return on ৳250!',
    author: 'সুমাইয়া আক্তার',
    authorEn: 'Sumaiya Akter',
    city: 'ঢাকা',
    cityEn: 'Dhaka',
    result: '✅ ৪০x ROI',
    resultEn: '✅ 40x ROI',
    rating: 5,
  },
  {
    quote: 'কোডিং জানতাম না, কিন্তু CNC ডিজাইন শিখে এখন নিজের ডিজাইন ফাইল বিক্রি করছি।',
    quoteEn: 'I did not know coding, but after learning CNC design I now sell my own design files.',
    author: 'মিজানুর রহমান',
    authorEn: 'Mizanur Rahman',
    city: 'খুলনা',
    cityEn: 'Khulna',
    result: '✅ মাসে ১৫,০০০+ আয়',
    resultEn: '✅ ৳15,000+/month income',
    rating: 5,
  },
]

export type Objection = {
  icon: string
  q: string
  qEn: string
  a: string
  aEn: string
}

export const OBJECTIONS: Objection[] = [
  { icon: 'HelpCircle', q: 'আমি পারবো?', qEn: 'Can I really do it?', a: 'আমরা শূন্য থেকে শুরু করি। ১৫০+ শিক্ষার্থী যারা কিছুই জানত না, এখন প্রফেশনাল ডিজাইনার।', aEn: 'We start from absolute zero. 150+ students who knew nothing are now professional designers.' },
  { icon: 'Clock', q: 'সময় পাবো না?', qEn: 'I will not have the time?', a: 'প্রতিদিন মাত্র ১.৫-২ ঘন্টা। ৭ দিনে ১৫+ প্রজেক্ট — আপনার সময়ের সেরা বিনিয়োগ।', aEn: 'Just 1.5-2 hours a day. 15+ projects in 7 days — the best investment of your time.' },
  { icon: 'Laptop', q: 'ল্যাপটপ নেই?', qEn: 'I do not own a laptop?', a: 'Windows 10/11 সহ যেকোনো ল্যাপটপে কাজ করে। সফটওয়্যার সেটআপ গাইড দেওয়া হবে।', aEn: 'Runs on any laptop with Windows 10/11. A software setup guide is provided.' },
  { icon: 'Languages', q: 'ইংরেজি জানি না?', qEn: 'I do not know English?', a: 'পুরো কোর্স বাংলায় — শুধু টেকনিক্যাল টার্ম ইংরেজিতে, ব্যাখ্যা বাংলায়।', aEn: 'The entire course is in Bangla — only technical terms are in English, with Bangla explanations.' },
  { icon: 'Paintbrush', q: 'আমি Drawing পারি না', qEn: 'I cannot draw', a: 'CNC ডিজাইনে আঁকার দক্ষতা প্রয়োজন হয় না। সফটওয়্যার নিজেই তৈরি করে দেয়।', aEn: 'CNC design does not require drawing skills. The software does the heavy lifting for you.' },
  { icon: 'Smartphone', q: 'মোবাইল দিয়ে Join করতে পারবো?', qEn: 'Can I join from a mobile?', a: 'হ্যাঁ, Zoom মোবাইল অ্যাপ দিয়েও ক্লাসে যোগ দিতে পারেন।', aEn: 'Yes, you can join classes using the Zoom mobile app.' },
  { icon: 'Video', q: 'Class Miss হলে?', qEn: 'What if I miss a class?', a: 'প্রতিটি ক্লাস রেকর্ড করা হবে। লাইফটাইম অ্যাক্সেস পাবেন।', aEn: 'Every class is recorded. You get lifetime access.' },
  { icon: 'Award', q: 'Certificate কি কাজে লাগবে?', qEn: 'Will the certificate help me?', a: 'সার্টিফিকেট আপনার দক্ষতার প্রমাণ — ফ্রিল্যান্সিং, চাকরি বা ব্যবসায় বিশ্বাস তৈরি করে।', aEn: 'The certificate is proof of your skill — it builds trust for freelancing, jobs, or business.' },
  { icon: 'Download', q: 'Software পাবো?', qEn: 'Will I get the software?', a: 'ইনস্টলেশন গাইড ও সেটআপ সহায়তা দেওয়া হবে।', aEn: 'An installation guide and setup support will be provided.' },
  { icon: 'Headset', q: 'Lifetime Support থাকবে?', qEn: 'Is there lifetime support?', a: 'হ্যাঁ, প্রাইভেট সাপোর্ট গ্রুপে লাইফটাইম সাপোর্ট পাবেন।', aEn: 'Yes, you get lifetime support in the private support group.' },
]

export type WhoForItem = { bn: string; en: string }

export const WHO_FOR: WhoForItem[] = [
  { bn: 'ছাত্র — নতুন ক্যারিয়ার শুরু করতে চান', en: 'Students — wanting to start a new career' },
  { bn: 'ফ্রিল্যান্সার — নতুন স্কিল যোগ করতে চান', en: 'Freelancers — wanting to add a new skill' },
  { bn: 'ফার্নিচার ব্যবসায়ী — নিজের ডিজাইন তৈরি করতে চান', en: 'Furniture business owners — wanting to design in-house' },
  { bn: 'মেশিন অপারেটর — ডিজাইন শিখে উন্নতি করতে চান', en: 'Machine operators — wanting to upskill with design' },
  { bn: 'কাঠের কারখানার কর্মী — দক্ষতা বাড়াতে চান', en: 'Wood-factory workers — wanting to upgrade their skills' },
  { bn: 'ইন্টেরিয়র ডিজাইনার — নতুন ডাইমেনশন যোগ করতে চান', en: 'Interior designers — wanting to add a new dimension' },
  { bn: 'শপ মালিক — নিজের প্রোডাক্ট ডিজাইন করতে চান', en: 'Shop owners — wanting to design their own products' },
  { bn: 'উদ্যোক্তা — নতুন ব্যবসা শুরু করতে চান', en: 'Entrepreneurs — wanting to start a new business' },
]

export type WhoNotForItem = { bn: string; en: string }

export const WHO_NOT_FOR: WhoNotForItem[] = [
  { bn: 'যারা প্র্যাকটিস করতে চান না', en: 'Those who will not practice' },
  { bn: 'যারা ক্লাসে যোগ দিতে চান না', en: 'Those who will not attend classes' },
  { bn: 'যারা তাত্ক্ষণিক সাফল্য আশা করেন', en: 'Those expecting instant success' },
  { bn: 'যারা শিখতে আগ্রহী নন', en: 'Those not willing to learn' },
]

export type CareerStep = {
  icon: string
  title: string
  titleEn: string
  desc: string
  descEn: string
}

export const CAREER_STEPS: CareerStep[] = [
  { icon: '🎓', title: 'Student', titleEn: 'Student', desc: 'শেখা শুরু', descEn: 'Start learning' },
  { icon: '🛠️', title: 'Designer', titleEn: 'Designer', desc: 'CNC ডিজাইনার', descEn: 'CNC Designer' },
  { icon: '💼', title: 'Freelancer', titleEn: 'Freelancer', desc: 'ফ্রিল্যান্সিং', descEn: 'Freelancing' },
  { icon: '🏢', title: 'Agency', titleEn: 'Agency', desc: 'এজেন্সি', descEn: 'Agency' },
  { icon: '👑', title: 'Business Owner', titleEn: 'Business Owner', desc: 'নিজের ব্যবসা', descEn: 'Own business' },
]

export type IncomeOpportunity = {
  amount: string
  amountEn: string
  label: string
  labelEn: string
}

export const INCOME_OPPORTUNITIES: IncomeOpportunity[] = [
  { amount: '১৫,০০০+', amountEn: '15,000+', label: 'ফ্রিল্যান্সে প্রতি প্রজেক্ট', labelEn: 'Freelance — per project' },
  { amount: '২৫,০০০+', amountEn: '25,000+', label: 'ফ্যাক্টরি জব (প্রতি মাস)', labelEn: 'Factory job (per month)' },
  { amount: '৫০,০০০+', amountEn: '50,000+', label: 'ফার্নিচার বিজনেস (প্রতি মাস)', labelEn: 'Furniture business (per month)' },
  { amount: '১০,০০০+', amountEn: '10,000+', label: 'কাস্টম ডিজাইন (প্রতি)', labelEn: 'Custom design (each)' },
  { amount: '২০,০০০+', amountEn: '20,000+', label: 'অনলাইন মার্কেটপ্লেস', labelEn: 'Online marketplace' },
  { amount: '৩০,০০০+', amountEn: '30,000+', label: 'ট্রেইনিং (প্রতি ব্যাচ)', labelEn: 'Training (per batch)' },
]

export type GuaranteeBadge = {
  icon: string
  label: string
  labelEn: string
}

export const GUARANTEE_BADGES: GuaranteeBadge[] = [
  { icon: 'RotateCcw', label: '১০০% টাকা ফেরত', labelEn: '100% Money-Back' },
  { icon: 'Video', label: 'রেকর্ডিং', labelEn: 'Recordings' },
  { icon: 'Headset', label: 'সাপোর্ট গ্রুপ', labelEn: 'Support Group' },
  { icon: 'Award', label: 'সার্টিফিকেট', labelEn: 'Certificate' },
  { icon: 'Gift', label: 'Chair Leg রাখুন', labelEn: 'Keep the Chair Leg' },
]

export type Faq = {
  q: string
  qEn: string
  a: string
  aEn: string
}

export const FAQS: Faq[] = [
  {
    q: 'CNC ডিজাইন কি?',
    qEn: 'What is CNC design?',
    a: 'CNC ডিজাইন হলো কম্পিউটার-এডেড ডিজাইন (CAD) সফটওয়্যার ব্যবহার করে 3D মডেল তৈরি করা যা CNC মেশিনে কাটার জন্য ব্যবহার করা হয়। Chair Leg, Door Panel, Relief, Furniture Design — সবকিছুই CNC ডিজাইনের অংশ।',
    aEn: 'CNC design is the process of creating 3D models using computer-aided design (CAD) software that are then cut on a CNC machine. Chair Leg, Door Panel, Relief, and Furniture Design are all part of CNC design.',
  },
  {
    q: 'কোন সফটওয়্যার শেখানো হয়?',
    qEn: 'Which software is taught?',
    a: 'Aspire, Vectric, ArtCAM — ইন্ডাস্ট্রি-স্ট্যান্ডার্ড CNC ডিজাইন সফটওয়্যার।',
    aEn: 'Aspire, Vectric, ArtCAM — industry-standard CNC design software.',
  },
  {
    q: 'কম্পিউটারের কি স্পেসিফিকেশন দরকার?',
    qEn: 'What computer specs do I need?',
    a: 'Windows 10/11, 8GB RAM (সুপারিশকৃত 16GB), এবং 50GB ফ্রি স্পেস। সফটওয়্যার চালানোর জন্য মিড-রেঞ্জ গ্রাফিক্স কার্ড ভালো।',
    aEn: 'Windows 10/11, 8GB RAM (16GB recommended), and 50GB free space. A mid-range graphics card is good for running the software.',
  },
  {
    q: 'পেমেন্ট কীভাবে করব?',
    qEn: 'How do I pay?',
    a: 'bKash, Nagad, ব্যাংক ট্রান্সফার — যেকোনো পদ্ধতিতে পেমেন্ট করতে পারেন। রেজিস্টার ফর্ম পূরণ করলে বিস্তারিত জানানো হবে।',
    aEn: 'bKash, Nagad, or bank transfer — pay via any method. Fill out the registration form and you will receive detailed instructions.',
  },
  {
    q: 'ক্লাস মিস করলে কী হবে?',
    qEn: 'What if I miss a class?',
    a: 'প্রতিটি ক্লাস রেকর্ড করা হবে। আপনি যেকোনো সময় রেকর্ডিং দেখে ক্লাস ক্যাচ আপ করতে পারবেন। লাইফটাইম অ্যাক্সেস।',
    aEn: 'Every class is recorded. You can catch up anytime by watching the recordings. Lifetime access included.',
  },
  {
    q: 'সার্টিফিকেট দেওয়া হবে?',
    qEn: 'Will I get a certificate?',
    a: 'হ্যাঁ, কোর্স শেষে "CNC 3D ডিজাইনার" সার্টিফিকেট দেওয়া হবে।',
    aEn: 'Yes, you will receive a "CNC 3D Designer" certificate after completing the course.',
  },
  {
    q: 'Chair Leg Design ফাইল কী?',
    qEn: 'What is the Chair Leg Design file?',
    a: 'এটি একটি সম্পূর্ণ প্রফেশনাল Chair Leg 3D Design ফাইল যা আপনি আপনার পোর্টফোলিওতে ব্যবহার করতে পারেন। ফ্রি বোনাস হিসেবে দেওয়া হচ্ছে (মূল্য ৩০০ টাকা)।',
    aEn: 'It is a complete professional Chair Leg 3D Design file you can use in your portfolio. Provided free as a bonus (value ৳300).',
  },
  {
    q: 'ক্লাস কখন হয়?',
    qEn: 'When are the classes held?',
    a: 'প্রতিদিন রাত ৯টায় (বাংলাদেশ সময়) — লাইভ জুম ক্লাস।',
    aEn: 'Every day at 9 PM (Bangladesh time) — live Zoom classes.',
  },
  {
    q: 'কত দিনের কোর্স?',
    qEn: 'How long is the course?',
    a: '৭ দিন — প্রতিদিন ১টি করে মূল প্রজেক্ট, পাশাপাশি ৮টি বোনাস প্রজেক্ট।',
    aEn: '7 days — one main project per day, plus 8 bonus projects.',
  },
  {
    q: 'ফ্রিল্যান্সিং কীভাবে শুরু করব?',
    qEn: 'How do I start freelancing?',
    a: 'কোর্সে ফ্রিল্যান্সিং গাইড অন্তর্ভুক্ত আছে। পোর্টফোলিও তৈরি, ক্লায়েন্ট খোঁজা, প্রাইসিং — সবকিছু শেখানো হবে।',
    aEn: 'The course includes a freelancing guide. Portfolio building, client acquisition, and pricing — everything is taught.',
  },
  {
    q: 'ফার্নিচার ব্যবসার জন্য কি কাজে আসবে?',
    qEn: 'Will this help my furniture business?',
    a: 'অবশ্যই। Chair Leg, Door Panel, Furniture Design — সবকিছু ফার্নিচার ব্যবসার জন্য প্রয়োজনীয়। নিজের ডিজাইন তৈরি করে খরচ কমাতে পারবেন।',
    aEn: 'Absolutely. Chair Leg, Door Panel, and Furniture Design are all essential for the furniture business. Creating your own designs lets you cut costs significantly.',
  },
  {
    q: 'অ্যাডভান্সড কোর্সও আছে?',
    qEn: 'Is there an advanced course too?',
    a: 'হ্যাঁ, এই বুটক্যাম্প শেষে অ্যাডভান্সড CNC ডিজাইন কোর্সের সুযোগ আছে।',
    aEn: 'Yes, after completing this bootcamp there is an opportunity to join an advanced CNC design course.',
  },
  {
    q: 'কতজন স্টুডেন্ট থাকবে?',
    qEn: 'How many students per batch?',
    a: 'সর্বোচ্চ ৩০ জন — যাতে প্রতিটি শিক্ষার্থী পার্সোনাল মনিটরিং পায়।',
    aEn: 'Maximum 30 students — so every learner gets personal monitoring.',
  },
  {
    q: 'CNC মেশিন না থাকলে কি ডিজাইন শিখতে পারি?',
    qEn: 'Can I learn design without owning a CNC machine?',
    a: 'হ্যাঁ। আপনি ডিজাইন শিখতে পারেন, ফাইল তৈরি করতে পারেন, এবং ক্লায়েন্ট বা ফ্যাক্টরিতে ফাইল দিতে পারেন। মেশিন নিজে না থাকলেও ডিজাইন স্কিল থাকলে কাজ পাওয়া যায়।',
    aEn: 'Yes. You can learn design, create files, and deliver them to clients or factories. Even without owning a machine, design skills alone are enough to get work.',
  },
  {
    q: 'টাকা ফেরতের নিয়ম কী?',
    qEn: 'What is the refund policy?',
    a: 'প্রথম ক্লাসের ২৪ ঘন্টার মধ্যে যদি কোর্স পছন্দ না হয়, পুরো টাকা ফেরত দেওয়া হবে। Chair Leg Design ফাইলটি আপনারই থাকবে।',
    aEn: 'If you are not satisfied within 24 hours of the first class, you get a full refund. The Chair Leg Design file is yours to keep.',
  },
  {
    q: 'কোর্সের রেকর্ডিং কতদিন থাকবে?',
    qEn: 'How long are the recordings available?',
    a: 'লাইফটাইম অ্যাক্সেস — যেকোনো সময় দেখতে পারবেন।',
    aEn: 'Lifetime access — watch anytime.',
  },
  {
    q: 'কোন ভাষায় ক্লাস হবে?',
    qEn: 'What language are the classes in?',
    a: 'বাংলা — সহজ ভাষায়, টেকনিক্যাল টার্মগুলো ইংরেজিতে ব্যাখ্যা সহ।',
    aEn: 'Bangla — in simple language, with technical terms explained in English.',
  },
  {
    q: 'পোর্টফোলিও তৈরি করতে সাহায্য পাওয়া যাবে?',
    qEn: 'Will I get help building a portfolio?',
    a: 'হ্যাঁ, কোর্সের অংশ হিসেবে ১৫+ প্রজেক্ট থাকবে যা আপনার পোর্টফোলিওতে ব্যবহার করতে পারবেন।',
    aEn: 'Yes, the course includes 15+ projects you can use directly in your portfolio.',
  },
  {
    q: 'ইন্টারনেট কানেকশন কেমন দরকার?',
    qEn: 'What internet connection do I need?',
    a: 'সাধারণ ব্রডব্যান্ড বা মোবাইল ইন্টারনেট (৩G/৪G) যথেষ্ট।',
    aEn: 'Standard broadband or mobile internet (3G/4G) is sufficient.',
  },
  {
    q: 'আমি কীভাবে রেজিস্টার করব?',
    qEn: 'How do I register?',
    a: 'নিচের ফর্ম পূরণ করুন বা হোয়াটসঅ্যাপ করুন — আমরা ২ ঘন্টার মধ্যে যোগাযোগ করব।',
    aEn: 'Fill out the form below or WhatsApp us — we will contact you within 2 hours.',
  },
  {
    q: 'গ্রুপ সাপোর্ট আছে?',
    qEn: 'Is there group support?',
    a: 'হ্যাঁ, প্রাইভেট সাপোর্ট গ্রুপ যেখানে প্রশ্ন করতে পারবেন এবং অন্যান্য শিক্ষার্থীদের সাথে সংযুক্ত থাকতে পারবেন।',
    aEn: 'Yes, a private support group where you can ask questions and stay connected with other learners.',
  },
  {
    q: 'ফার্নিচার ডিজাইন শেখানো হবে?',
    qEn: 'Is furniture design taught?',
    a: 'হ্যাঁ, Day 4-এ ফার্নিচার ও দরজা প্যানেল ডিজাইন শেখানো হবে।',
    aEn: 'Yes, on Day 4 you will learn furniture and door panel design.',
  },
  {
    q: 'কোর্স শেষে চাকরি পেতে সাহায্য করেন?',
    qEn: 'Do you help with job placement after the course?',
    a: 'আমরা কোর্স শেষে ফ্রিল্যান্সিং এবং জব গাইড দিই। আপনার দক্ষতা অনুযায়ী ক্যারিয়ার পথ দেখাই।',
    aEn: 'We provide a freelancing and job guide after the course. We help you choose a career path that matches your skills.',
  },
  {
    q: 'সফটওয়্যার কোথায় পাব?',
    qEn: 'Where do I get the software?',
    a: 'কোর্সে সফটওয়্যার ইনস্টলেশন এবং সেটআপের সম্পূর্ণ গাইড দেওয়া হবে।',
    aEn: 'The course includes a complete software installation and setup guide.',
  },
  {
    q: 'কোর্সটি কাদের জন্য উপযুক্ত?',
    qEn: 'Who is this course for?',
    a: 'ছাত্র, ফ্রিল্যান্সার, ফার্নিচার ব্যবসায়ী, মেশিন অপারেটর, উদ্যোক্তা — যারা CNC ডিজাইন শিখতে চান তাদের জন্য।',
    aEn: 'Students, freelancers, furniture business owners, machine operators, and entrepreneurs — anyone who wants to learn CNC design.',
  },
  {
    q: 'অফলাইনে ক্লাস হয়?',
    qEn: 'Are there offline classes?',
    a: 'না, সম্পূর্ণ অনলাইন লাইভ জুম ক্লাস।',
    aEn: 'No, classes are fully online via live Zoom.',
  },
  {
    q: 'কোর্স শেষে কী কী দক্ষতা থাকবে?',
    qEn: 'What skills will I have after the course?',
    a: 'Relief ডিজাইন, ফটো স্কাল্পট, ফার্নিচার ডিজাইন, টুলপাথ সেটআপ, Chair Leg ডিজাইন — ইন্ডাস্ট্রি-রেডি দক্ষতা।',
    aEn: 'Relief design, photo sculpt, furniture design, toolpath setup, and Chair Leg design — industry-ready skills.',
  },
  {
    q: 'আমি কি ফ্রিল্যান্স মার্কেটপ্লেসে কাজ করতে পারব?',
    qEn: 'Can I work on freelance marketplaces?',
    a: 'হ্যাঁ, এই দক্ষতা দিয়ে আপনি Fiverr, Upwork, Freelancer-এ CNC ডিজাইন সেবা দিতে পারবেন।',
    aEn: 'Yes, with these skills you can offer CNC design services on Fiverr, Upwork, and Freelancer.',
  },
  {
    q: 'আমার কি ডিজাইন ব্যাকগ্রাউন্ড দরকার?',
    qEn: 'Do I need a design background?',
    a: 'না, একদম শূন্য থেকেও শুরু করতে পারেন। সবকিছু ধাপে ধাপে শেখানো হবে।',
    aEn: 'No, you can start from absolute zero. Everything is taught step by step.',
  },
  {
    q: 'কোর্সের উপকরণ কি ডিজিটাল?',
    qEn: 'Are the course materials digital?',
    a: 'হ্যাঁ, সব উপকরণ ডিজিটাল — ফাইল, ভিডিও, গাইড সব অনলাইন অ্যাক্সেসযোগ্য।',
    aEn: 'Yes, all materials are digital — files, videos, and guides are accessible online.',
  },
  {
    q: 'আমার কি নিজের CNC মেশিন দরকার?',
    qEn: 'Do I need my own CNC machine?',
    a: 'না, শেখার জন্য নিজের মেশিনের প্রয়োজন নেই। ডিজাইন ফাইল তৈরি করতে পারবেন এবং মেশিনের মালিকদের কাছে ফাইল দিতে পারবেন।',
    aEn: 'No, you do not need your own machine to learn. You can create design files and deliver them to machine owners.',
  },
  {
    q: 'আমি কীভাবে নিজের প্রজেক্ট বিক্রি করব?',
    qEn: 'How do I sell my own projects?',
    a: 'কোর্সে ফাইল বিক্রি, ফ্রিল্যান্সিং এবং কাস্টম অর্ডার নেয়ার সম্পূর্ণ গাইড দেওয়া হবে।',
    aEn: 'The course provides a complete guide to selling files, freelancing, and taking custom orders.',
  },
  {
    q: 'বাংলাদেশের বাইরে কি কাজ করতে পারি?',
    qEn: 'Can I work outside Bangladesh?',
    a: 'অবশ্যই। CNC ডিজাইন আন্তর্জাতিক মার্কেটে চাহিদাসম্পন্ন। আপনি বিশ্বের যেকোনো ক্লায়েন্টের জন্য কাজ করতে পারেন।',
    aEn: 'Absolutely. CNC design is in high demand globally. You can work with clients anywhere in the world.',
  },
  {
    q: 'কোর্সটি কতদিনের?',
    qEn: 'How long is the course?',
    a: '৭ দিনের লাইভ ক্লাস + লাইফটাইম অ্যাক্সেস।',
    aEn: '7 days of live classes + lifetime access.',
  },
  {
    q: 'আমি কি অন্য কারও সাথে কোর্স শেয়ার করতে পারি?',
    qEn: 'Can I share the course with someone else?',
    a: 'না, প্রতিটি রেজিস্ট্রেশন শুধুমাত্র একজন ব্যক্তির জন্য। তবে আপনি বন্ধুকে রেজিস্টার করতে উৎসাহিত করতে পারেন।',
    aEn: 'No, each registration is for one person only. But you can encourage your friends to register.',
  },
  {
    q: 'কোর্সটি কি সার্টিফাইড?',
    qEn: 'Is the course certified?',
    a: 'হ্যাঁ, NextGen Digital Studio থেকে সার্টিফিকেট দেওয়া হয়, যা ইন্ডাস্ট্রিতে স্বীকৃত।',
    aEn: 'Yes, a certificate from NextGen Digital Studio is provided, which is recognized in the industry.',
  },
  {
    q: 'আমি কি অফলাইনে মিটিং পেতে পারি?',
    qEn: 'Can I get an offline meeting?',
    a: 'বর্তমানে কোর্স সম্পূর্ণ অনলাইন। তবে যশোরের শিক্ষার্থীরা অফিসে এসে সহায়তা নিতে পারেন।',
    aEn: 'Currently the course is fully online. However, students from Jashore can visit our office for support.',
  },
  {
    q: 'আমার কি সাবস্ক্রিপশন দিতে হবে?',
    qEn: 'Do I need a subscription?',
    a: 'না, একবার পেমেন্ট করলেই লাইফটাইম অ্যাক্সেস। কোনো মাসিক খরচ নেই।',
    aEn: 'No, a one-time payment gives you lifetime access. No monthly fees.',
  },
  {
    q: 'আমি কি কোর্স শেষে ইন্টার্নশিপ পেতে পারি?',
    qEn: 'Can I get an internship after the course?',
    a: 'আমাদের কাছে ইন্টার্নশিপের সুযোগ সীমিত। তবে ভালো পারফর্মারদের জন্য সুযোগ রয়েছে।',
    aEn: 'Internship opportunities are limited. However, top performers do have a chance.',
  },
  {
    q: 'আমার কি আগে CNC সম্পর্কে জানতে হবে?',
    qEn: 'Do I need prior CNC knowledge?',
    a: 'না, একদম বিগিনার থেকে শুরু করা হয়।',
    aEn: 'No, we start from absolute beginner.',
  },
  {
    q: 'আমি কি ছাত্র?',
    qEn: 'I am a student — is this for me?',
    a: 'হ্যাঁ, ছাত্ররা আমাদের প্রধান শিক্ষার্থী। এই দক্ষতা তাদের ক্যারিয়ারে বড় সুযোগ তৈরি করে।',
    aEn: 'Yes, students are our primary learners. This skill creates major career opportunities for them.',
  },
  {
    q: 'আমি কি চাকরিজীবী?',
    qEn: 'I am a working professional — is this for me?',
    a: 'হ্যাঁ, চাকরিজীবীরাও রাতের ক্লাসে অংশ নিতে পারেন। এটি সেকেন্ড ইনকামের সুযোগ।',
    aEn: 'Yes, working professionals can attend evening classes. This is a second-income opportunity.',
  },
]
