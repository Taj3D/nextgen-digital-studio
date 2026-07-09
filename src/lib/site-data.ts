// Central site content for NextGen Digital Studio
// All data is bilingual (English + Bangla) for EN/BN language toggle

export const SITE_CONFIG = {
  name: 'NextGen Digital Studio',
  nameBn: 'নেক্সটজেন ডিজিটাল স্টুডিও',
  phone: '+8801711731354',
  phoneDisplay: '+880 1711-731354',
  whatsapp: '8801711731354',
  email: 'nextgendigitalstudio1@gmail.com',
  address: 'মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট, যশোর, বাংলাদেশ',
  url: 'https://nextgendigitalstudio.com',
  founded: 2023,
  facebook: 'https://www.facebook.com/nextgendigitalstudio',
  linkedin: 'https://www.linkedin.com/in/nextgen-digital-studio',
  github: 'https://github.com/Taj3D',
  instagram: 'https://instagram.com/nextgendigitalstudio1',
  threads: 'https://threads.net/nextgendigitalstudio1',
  youtube: 'https://www.youtube.com/@NextGenDigitalStudio1',
  twitter: 'https://x.com/NextGenDigit',
}

export type Testimonial = {
  id: string
  name: string
  nameBn: string
  role: string
  roleBn: string
  company: string
  companyBn: string
  avatar: string
  quote: string
  quoteBn: string
  metric: string
  metricBn: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rakib Hasan',
    nameBn: 'রাকিব হাসান',
    role: 'Founder',
    roleBn: 'প্রতিষ্ঠাতা',
    company: 'Jessore Electronics',
    companyBn: 'যশোর ইলেকট্রনিক্স',
    avatar: 'RH',
    quote: 'Before NextGen, I was losing 60% of leads after 8 PM. Now my AI replies in 3 seconds — even at midnight. Sales up 240% in 4 months.',
    quoteBn: 'নেক্সটজেনের আগে আমি রাত ৮টার পর ৬০% লিড হারাতাম। এখন আমার এআই ৩ সেকেন্ডে রিপ্লাই দেয় — মধ্যরাতেও। ৪ মাসে সেলস ২৪০% বেড়েছে।',
    metric: '240% sales growth',
    metricBn: '২৪০% সেলস বৃদ্ধি',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Shahana Begum',
    nameBn: 'শাহানা বেগম',
    role: 'CEO',
    roleBn: 'সিইও',
    company: 'Boutique Bhabna',
    companyBn: 'বুটিক ভাবনা',
    avatar: 'SB',
    quote: 'I used to spend 5 hours daily answering the same questions. Now the AI handles 80% of customer chats. I focus on growing my business.',
    quoteBn: 'আমি প্রতিদিন ৫ ঘন্টা একই প্রশ্নের উত্তর দিতাম। এখন এআই ৮০% কাস্টমার চ্যাট সামলায়। আমি ব্যবসা বড় করায় মনোযোগ দিই।',
    metric: '5 hrs saved daily',
    metricBn: 'দৈনিক ৫ ঘন্টা সাশ্রয়',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Tanvir Ahmed',
    nameBn: 'তানভীর আহমেদ',
    role: 'Director',
    roleBn: 'পরিচালক',
    company: 'Khulna Real Estate',
    companyBn: 'খুলনা রিয়েল এস্টেট',
    avatar: 'TA',
    quote: 'We went from 12 to 47 qualified appointments per month. The AI qualifies leads better than my best salesperson — and never takes a day off.',
    quoteBn: 'আমরা মাসে ১২ থেকে ৪৭ কোয়ালিফাইড অ্যাপয়েন্টমেন্টে গেলাম। এআই আমার সেরা সেলসম্যানের চেয়ে ভালো লিড কোয়ালিফাই করে — আর কখনো ছুটি নেয় না।',
    metric: '4x more appointments',
    metricBn: '৪গুণ বেশি অ্যাপয়েন্টমেন্ট',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    role: 'Owner',
    roleBn: 'মালিক',
    company: 'Beauty by Nusrat',
    companyBn: 'বিউটি বাই নুসরাত',
    avatar: 'NJ',
    quote: 'My salon bookings doubled in 6 weeks. The AI handles bookings in Bangla perfectly — my customers love it. Best investment I ever made.',
    quoteBn: '৬ সপ্তাহে আমার সেলুন বুকিং দ্বিগুণ হয়েছে। এআই নিখুঁত বাংলায় বুকিং সামলায় — আমার কাস্টমাররা ভালোবাসে। আমার সেরা ইনভেস্টমেন্ট।',
    metric: '2x bookings in 6 weeks',
    metricBn: '৬ সপ্তাহে ২গুণ বুকিং',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Imran Khan',
    nameBn: 'ইমরান খান',
    role: 'Managing Director',
    roleBn: 'ব্যবস্থাপনা পরিচালক',
    company: 'Dhaka Auto Parts',
    companyBn: 'ঢাকা অটো পার্টস',
    avatar: 'IK',
    quote: 'We were spending 3 lakh/month on ads with no idea what worked. Now we know exact ROI per taka. Stopped wasting 1.2 lakh/month instantly.',
    quoteBn: 'আমরা মাসে ৩ লক্ষ অ্যাডে খরচ করতাম, কিছুই বুঝতাম না। এখন প্রতি টাকার সঠিক ROI জানি। মাসে ১.২ লক্ষ নষ্ট করা সাথে সাথে বন্ধ।',
    metric: '1.2L saved monthly',
    metricBn: 'মাসে ১.২লক্ষ সাশ্রয়',
    rating: 5,
  },
  {
    id: 't6',
    name: 'Farzana Akter',
    nameBn: 'ফরজানা আক্তার',
    role: 'Founder',
    roleBn: 'প্রতিষ্ঠাতা',
    company: 'Online Pathshala',
    companyBn: 'অনলাইন পাঠশালা',
    avatar: 'FA',
    quote: 'From 30 to 380 student enrollments per month. The AI follows up with every inquiry for weeks. I just check my dashboard and smile.',
    quoteBn: 'মাসে ৩০ থেকে ৩৮০ স্টুডেন্ট এনরোলমেন্ট। এআই প্রতিটি ইনকোয়ারি সপ্তাহজুড়ে ফলোআপ করে। আমি শুধু ড্যাশবোর্ড দেখে হাসি।',
    metric: '12x more enrollments',
    metricBn: '১২গুণ বেশি এনরোলমেন্ট',
    rating: 5,
  },
]

export type PricingPlan = {
  id: 'starter' | 'growth' | 'dominant'
  monthly: number
  yearly: number
  features: { en: string; bn: string }[]
  popular?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    monthly: 15000,
    yearly: 144000,
    features: [
      { en: 'AI Lead Capture (1 channel)', bn: 'এআই লিড ক্যাপচার (১ চ্যানেল)' },
      { en: 'Up to 500 leads/month', bn: 'মাসে ৫০০ লিড পর্যন্ত' },
      { en: 'Bangla + English AI chatbot', bn: 'বাংলা + ইংরেজি এআই চ্যাটবট' },
      { en: 'Basic CRM dashboard', bn: 'বেসিক CRM ড্যাশবোর্ড' },
      { en: 'Email support', bn: 'ইমেইল সাপোর্ট' },
      { en: '60-day ROI guarantee', bn: '৬০ দিনের ROI গ্যারান্টি' },
    ],
  },
  {
    id: 'growth',
    monthly: 35000,
    yearly: 336000,
    popular: true,
    features: [
      { en: 'AI Lead Capture (3 channels)', bn: 'এআই লিড ক্যাপচার (৩ চ্যানেল)' },
      { en: 'Up to 2,500 leads/month', bn: 'মাসে ২,৫০০ লিড পর্যন্ত' },
      { en: 'AI Follow-Up Automation', bn: 'এআই ফলোআপ অটোমেশন' },
      { en: 'Advanced CRM + Analytics', bn: 'অ্যাডভান্সড CRM + অ্যানালিটিক্স' },
      { en: 'Weekly performance reports', bn: 'সাপ্তাহিক পারফরম্যান্স রিপোর্ট' },
      { en: 'Priority WhatsApp support', bn: 'প্রায়োরিটি হোয়াটসঅ্যাপ সাপোর্ট' },
      { en: 'Monthly strategy call', bn: 'মাসিক স্ট্র্যাটেজি কল' },
      { en: '60-day ROI guarantee', bn: '৬০ দিনের ROI গ্যারান্টি' },
    ],
  },
  {
    id: 'dominant',
    monthly: 75000,
    yearly: 720000,
    features: [
      { en: 'AI Lead Capture (all channels)', bn: 'এআই লিড ক্যাপচার (সব চ্যানেল)' },
      { en: 'Unlimited leads', bn: 'আনলিমিটেড লিড' },
      { en: 'Full AI Sales System', bn: 'ফুল এআই সেলস সিস্টেম' },
      { en: 'Custom AI training', bn: 'কাস্টম এআই ট্রেইনিং' },
      { en: 'Dedicated account manager', bn: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার' },
      { en: '24/7 phone support', bn: '২৪/৭ ফোন সাপোর্ট' },
      { en: 'Weekly strategy calls', bn: 'সাপ্তাহিক স্ট্র্যাটেজি কল' },
      { en: 'Custom integrations', bn: 'কাস্টম ইন্টিগ্রেশন' },
      { en: '60-day ROI guarantee', bn: '৬০ দিনের ROI গ্যারান্টি' },
    ],
  },
]

export type FAQ = {
  q: { en: string; bn: string }
  a: { en: string; bn: string }
}

export const FAQS: FAQ[] = [
  {
    q: { en: 'How quickly will I see results?', bn: 'কত দ্রুত ফলাফল দেখব?' },
    a: {
      en: 'Most clients see first qualified leads within 14 days of launch. Significant revenue impact typically shows in 30-45 days. Full ROI usually achieved within 60 days — guaranteed.',
      bn: 'বেশিরভাগ ক্লায়েন্ট লঞ্চের ১৪ দিনের মধ্যে প্রথম কোয়ালিফাইড লিড দেখেন। তাৎপর্যপূর্ণ আয়ের প্রভাব সাধারণত ৩০-৪৫ দিনে দেখা যায়। সম্পূর্ণ ROI সাধারণত ৬০ দিনে — গ্যারান্টিড।',
    },
  },
  {
    q: { en: 'Do I need technical knowledge?', bn: 'আমার কি টেকনিক্যাল জ্ঞান দরকার?' },
    a: {
      en: 'Zero. We handle everything — setup, integration, training, optimization. You just approve and watch your dashboard. If you can use WhatsApp, you can use our system.',
      bn: 'জিরো। আমরা সব সামলাই — সেটআপ, ইন্টিগ্রেশন, ট্রেইনিং, অপটিমাইজেশন। আপনি শুধু অ্যাপ্রুভ করেন আর ড্যাশবোর্ড দেখেন। আপনি হোয়াটসঅ্যাপ চালাতে পারলে, আমাদের সিস্টেম চালাতে পারবেন।',
    },
  },
  {
    q: { en: 'What if it doesnt work for my business?', bn: 'যদি আমার ব্যবসায় না কাজ করে?' },
    a: {
      en: 'Our 60-day ROI guarantee protects you completely. If our system hasnt paid for itself in 60 days, we work for free until it does. No risk, no catch.',
      bn: 'আমাদের ৬০ দিনের ROI গ্যারান্টি আপনাকে সম্পূর্ণ সুরক্ষা দেয়। ৬০ দিনে আমাদের সিস্টেম নিজের খরচ না তুললে, তুলনা পর্যন্ত আমরা ফ্রিতে কাজ করি। কোনো ঝুঁকি নেই, কোনো ধোঁয়া নেই।',
    },
  },
  {
    q: { en: 'Can the AI really speak Bangla properly?', bn: 'এআই কি সত্যিই ঠিকমতো বাংলা বলতে পারে?' },
    a: {
      en: 'Yes. Our AI is specifically trained on Bangladeshi business conversations — not Google-translated Bangla. It understands local context, cultural nuances, and even regional expressions. Your customers will feel understood.',
      bn: 'হ্যাঁ। আমাদের এআই বিশেষভাবে বাংলাদেশি ব্যবসায়িক কথোপকথনের উপর ট্রেইনড — গুগল-ট্রান্সলেট বাংলা নয়। এটি লোকাল কনটেক্সট, সাংস্কৃতিক বুদ্ধি, এমনকি আঞ্চলিক ভাষাও বোঝে। আপনার কাস্টমার বোঝা অনুভব করবে।',
    },
  },
  {
    q: { en: 'What happens after I sign up?', bn: 'সাইন-আপ করার পর কী হয়?' },
    a: {
      en: 'Day 1: 30-min audit call. Days 2-5: We build your system. Day 7: We go live. You get a personal WhatsApp group with our team for any questions. Simple.',
      bn: 'দিন ১: ৩০ মিনিট অডিট কল। দিন ২-৫: আমরা সিস্টেম বানাই। দিন ৭: আমরা লাইভ যাই। যেকোনো প্রশ্নে আমাদের টিমের সাথে পার্সোনাল হোয়াটসঅ্যাপ গ্রুপ পান। সহজ।',
    },
  },
  {
    q: { en: 'Are there any long-term contracts?', bn: 'কোনো দীর্ঘমেয়াদী চুক্তি আছে?' },
    a: {
      en: 'No. All plans are month-to-month. Cancel anytime with 7 days notice. No cancellation fees. We earn your business every month — or you leave. Simple.',
      bn: 'না। সব প্ল্যান মাসে-মাসে। ৭ দিন নোটিশে যেকোনো সময় ক্যানসেল। কোনো ক্যানসেলেশন ফি নেই। প্রতি মাস আমরা আপনার ব্যবসা অর্জন করি — নাহলে আপনি চলে যান। সহজ।',
    },
  },
  {
    q: { en: 'Which channels do you support?', bn: 'কোন কোন চ্যানেল সাপোর্ট করেন?' },
    a: {
      en: 'Website chat, WhatsApp Business, Facebook Messenger, Instagram DM, and email. We can also integrate with your existing CRM or tools. If you use it, we probably connect to it.',
      bn: 'ওয়েবসাইট চ্যাট, হোয়াটসঅ্যাপ বিজনেস, ফেসবুক মেসেঞ্জার, ইনস্টাগ্রাম DM, এবং ইমেইল। আপনার বর্তমান CRM বা টুলের সাথেও ইন্টিগ্রেট করতে পারি। আপনি যা ব্যবহার করেন, আমরা সম্ভবত সেটার সাথে কানেক্ট করি।',
    },
  },
  {
    q: { en: 'Is my customer data safe?', bn: 'আমার কাস্টমার ডাটা কি নিরাপদ?' },
    a: {
      en: 'Absolutely. All data is encrypted, stored in compliance with Bangladesh data protection guidelines, and never shared with third parties. You own your data — we just process it for you.',
      bn: 'একদম। সব ডাটা এনক্রিপ্টেড, বাংলাদেশ ডাটা প্রটেকশন গাইডলাইন অনুযায়ী সংরক্ষিত, কখনো তৃতীয় পক্ষের সাথে শেয়ার হয় না। আপনার ডাটা আপনারই — আমরা শুধু আপনার জন্য প্রসেস করি।',
    },
  },
]

export type ServiceDetail = {
  id: string
  icon: string
  features: { en: string; bn: string }[]
}

export const SERVICES: ServiceDetail[] = [
  {
    id: 'lead-capture',
    icon: 'Target',
    features: [
      { en: '24/7 instant response (under 3 seconds)', bn: '২৪/৭ ইনস্ট্যান্ট রেসপন্স (৩ সেকেন্ডের কম)' },
      { en: 'Multi-language support (Bangla + English)', bn: 'মাল্টি-ল্যাঙ্গুয়েজ (বাংলা + ইংরেজি)' },
      { en: 'Smart lead scoring', bn: 'স্মার্ট লিড স্কোরিং' },
    ],
  },
  {
    id: 'follow-up',
    icon: 'Repeat',
    features: [
      { en: '5+ touchpoint sequences', bn: '৫+ টাচপয়েন্ট সিকোয়েন্স' },
      { en: 'Personalized at scale', bn: 'স্কেলে পার্সোনালাইজড' },
      { en: 'Auto-revives dead leads', bn: 'ডেড লিড রিভাইভ করে' },
    ],
  },
  {
    id: 'chatbot',
    icon: 'Bot',
    features: [
      { en: 'Trained on YOUR business', bn: 'আপনার ব্যবসার উপর ট্রেইনড' },
      { en: 'Books appointments to your calendar', bn: 'আপনার ক্যালেন্ডারে বুকিং' },
      { en: 'Hands off to human when needed', bn: 'দরকারে হিউম্যানে হ্যান্ডঅফ' },
    ],
  },
  {
    id: 'crm',
    icon: 'BarChart3',
    features: [
      { en: 'Live ROI tracking', bn: 'লাইভ ROI ট্র্যাকিং' },
      { en: 'Pipeline visualization', bn: 'পাইপলাইন ভিজ্যুয়ালাইজেশন' },
      { en: 'Weekly performance reports', bn: 'সাপ্তাহিক পারফরম্যান্স রিপোর্ট' },
    ],
  },
]

export const TRUST_LOGOS = [
  'Jessore Electronics',
  'Boutique Bhabna',
  'Khulna Real Estate',
  'Beauty by Nusrat',
  'Dhaka Auto Parts',
  'Online Pathshala',
  'BD Fashion House',
  'Royal Restaurant',
]

// === Legacy exports (for other pages: blog, case-studies, admin, etc.) ===
import {
  Bot,
  MessageSquare,
  PhoneCall,
  Workflow,
  MessagesSquare,
  Target,
  TrendingUp,
  Filter,
  Cpu,
  Globe,
  LayoutTemplate,
  BrainCircuit,
  Building2,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Home,
  Factory,
  Briefcase,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  slug: string
  title: string
  icon: LucideIcon
  short: string
  description: string
  features: string[]
  gradient: string
}

export const services: Service[] = [
  {
    slug: 'ai-sales-automation',
    title: 'AI Sales Automation',
    icon: Bot,
    short: 'Close more deals with AI-driven outreach, follow-ups & pipeline nurturing.',
    description:
      'End-to-end AI sales engines that qualify leads, send personalised follow-ups, and hand hot prospects to your team — 24/7.',
    features: ['AI lead scoring', 'Auto follow-up sequences', 'CRM pipeline sync', 'Meeting booking'],
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    slug: 'ai-chat-agent',
    title: 'AI Chat Agent',
    icon: MessageSquare,
    short: 'A 24/7 AI chatbot trained on your business that converts visitors into leads.',
    description:
      'Deploy a GPT-powered chat agent on your website & WhatsApp that answers questions, captures leads and books calls instantly.',
    features: ['Trained on your data', 'Multilingual', 'Lead capture & routing', 'Human handoff'],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    slug: 'ai-voice-agent',
    title: 'AI Voice Agent',
    icon: PhoneCall,
    short: 'Human-sounding AI voice agents for inbound & outbound calls.',
    description:
      'Automate call handling, appointment booking and customer support with natural-sounding AI voice agents in Bangla & English.',
    features: ['Inbound & outbound', 'Bangla + English', 'Appointment booking', 'CRM logging'],
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    slug: 'crm-automation',
    title: 'CRM Automation',
    icon: Workflow,
    short: 'Turn your CRM into an autopilot that never drops a lead.',
    description:
      'We automate your HubSpot, GoHighLevel or custom CRM so every lead is nurtured, tagged and followed up automatically.',
    features: ['Pipeline automation', 'Smart tagging', 'Task reminders', 'Revenue reporting'],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    slug: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    icon: MessagesSquare,
    short: 'Reach customers on Bangladesh’s #1 messaging app — automatically.',
    description:
      'Official WhatsApp Business API flows for marketing blasts, order updates, support and abandoned-cart recovery.',
    features: ['Broadcast campaigns', 'Chatbots & menus', 'Template messages', 'Click-to-chat ads'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    icon: Target,
    short: 'Predictable, qualified leads on autopilot — every single month.',
    description:
      'Multi-channel lead generation systems combining paid ads, SEO, scraping and AI outreach to fill your pipeline.',
    features: ['B2B & B2C leads', 'Verified contact data', 'AI cold outreach', 'Conversion tracking'],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    icon: TrendingUp,
    short: 'Meta, Google & TikTok ads engineered for measurable ROI.',
    description:
      'Full-funnel paid media management with creative testing, audience scaling and relentless optimisation.',
    features: ['Meta & Google Ads', 'Creative production', 'Conversion tracking', 'ROAS reporting'],
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    slug: 'sales-funnel-development',
    title: 'Sales Funnel Development',
    icon: Filter,
    short: 'High-converting funnels that turn cold traffic into booked calls.',
    description:
      'We design, build and optimise complete sales funnels — from landing pages to email sequences to booking.',
    features: ['Funnel strategy', 'Landing pages', 'Email/SMS sequences', 'A/B testing'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    icon: Cpu,
    short: 'Automate repetitive operations with n8n, Zapier & custom workflows.',
    description:
      'Connect your tools and eliminate manual work with intelligent automation workflows across your entire business.',
    features: ['n8n & Zapier', 'API integrations', 'Document automation', 'Workflow audit'],
    gradient: 'from-slate-500 to-gray-600',
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    icon: Globe,
    short: 'Lightning-fast, SEO-ready websites built on Next.js.',
    description:
      'Premium, conversion-focused websites and web apps built with modern tech — optimised for speed, SEO and sales.',
    features: ['Next.js & React', 'SEO optimised', 'CMS integration', 'Core Web Vitals'],
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    slug: 'landing-page-design',
    title: 'Landing Page Design',
    icon: LayoutTemplate,
    short: 'High-converting landing pages built to turn clicks into customers.',
    description:
      'Persuasive, fast-loading landing pages designed around your offer and engineered to maximise conversions.',
    features: ['Copywriting', 'Conversion design', 'A/B variants', 'Analytics setup'],
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    slug: 'ai-consultation',
    title: 'AI Consultation',
    icon: BrainCircuit,
    short: 'A clear AI roadmap to cut costs, scale revenue and automate operations.',
    description:
      'Strategy sessions where we audit your business and design a custom AI + automation roadmap with measurable ROI.',
    features: ['Business audit', 'AI opportunity map', 'ROI modelling', 'Implementation plan'],
    gradient: 'from-teal-500 to-cyan-500',
  },
]

export type Industry = {
  slug: string
  name: string
  icon: LucideIcon
  blurb: string
  outcomes: string[]
}

export const industries: Industry[] = [
  {
    slug: 'small-medium-business',
    name: 'Small & Medium Businesses',
    icon: Briefcase,
    blurb: 'Automate sales & support to compete with the big players — without the big team.',
    outcomes: ['3x faster lead response', 'Cut manual tasks 60%', 'More booked appointments'],
  },
  {
    slug: 'corporate',
    name: 'Corporate Companies',
    icon: Building2,
    blurb: 'Enterprise-grade automation that scales across departments and geographies.',
    outcomes: ['Unified data pipelines', 'Automated reporting', 'Department-wide AI'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    blurb: 'Capture, qualify and nurture property leads automatically from first click to closing.',
    outcomes: ['Instant lead follow-up', 'Automated site-visit booking', 'Agent productivity up 2x'],
  },
  {
    slug: 'hospitals',
    name: 'Hospitals & Clinics',
    icon: Stethoscope,
    blurb: 'AI receptionists, appointment automation and patient follow-up that never sleeps.',
    outcomes: ['24/7 appointment booking', 'Reduced no-shows', 'Patient engagement flows'],
  },
  {
    slug: 'schools',
    name: 'Schools & Education',
    icon: GraduationCap,
    blurb: 'Automate admissions enquiries, parent communication and student support.',
    outcomes: ['Admissions enquiry bot', 'Parent WhatsApp updates', 'Fee reminder automation'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingBag,
    blurb: 'Recover lost sales with cart abandonment, order updates and AI product recommendations.',
    outcomes: ['Cart recovery flows', 'Order updates on WhatsApp', 'AI product search'],
  },
  {
    slug: 'agencies',
    name: 'Agencies',
    icon: Briefcase,
    blurb: 'White-label AI services and automation to scale your agency without scaling headcount.',
    outcomes: ['White-label AI agents', 'Client onboarding automation', 'Recurring service revenue'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    blurb: 'Automate procurement, inventory and supplier communication end-to-end.',
    outcomes: ['Inventory alerts', 'Supplier follow-ups', 'Order status automation'],
  },
]

export type Testimonial = {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Tanvir Ahmed',
    role: 'Founder',
    company: 'Dhaka Realty Group',
    quote:
      'NextGen Digital Studio built our AI chat agent and within 6 weeks our qualified leads tripled. The bot books site visits while we sleep. Genuinely game-changing.',
    rating: 5,
    initials: 'TA',
  },
  {
    name: 'Dr. Nusrat Jahan',
    role: 'Director',
    company: 'Medicare Hospital',
    quote:
      'Their AI voice agent now handles every appointment call in Bangla and English. No-shows dropped 38% and our reception team can finally breathe.',
    rating: 5,
    initials: 'NJ',
  },
  {
    name: 'Rakib Hasan',
    role: 'CEO',
    company: 'ShopSmart BD',
    quote:
      'The WhatsApp automation recovered over 12,000 abandoned carts in the first quarter alone. ROI was clear in the first month. Best agency we’ve worked with.',
    rating: 5,
    initials: 'RH',
  },
  {
    name: 'Farhana Karim',
    role: 'Marketing Head',
    company: 'EduFirst School Network',
    quote:
      'Admissions enquiries are now handled instantly by AI. Parents love the fast response on WhatsApp and our enrolment grew 45% this year.',
    rating: 5,
    initials: 'FK',
  },
  {
    name: 'Sajid Rahman',
    role: 'Managing Director',
    company: 'NovaCorp Bangladesh',
    quote:
      'They automated our entire sales pipeline on GoHighLevel. We went from chaotic spreadsheets to a predictable lead machine. Highly recommended.',
    rating: 5,
    initials: 'SR',
  },
  {
    name: 'Maliha Chowdhury',
    role: 'Founder',
    company: 'Bloom Agency',
    quote:
      'We white-labelled their AI agents for our clients. The tech is world-class and the team is genuinely invested in our success. A real partnership.',
    rating: 5,
    initials: 'MC',
  },
]

export type PricingPlan = {
  name: string
  tagline: string
  price: string
  period: string
  popular?: boolean
  features: string[]
  cta: string
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    tagline: 'For small businesses ready to automate.',
    price: '৳25,000',
    period: '/month',
    features: [
      '1 AI Chat Agent (website)',
      'WhatsApp automation (1 number)',
      'Lead capture & CRM setup',
      '2,000 AI conversations/mo',
      'Monthly strategy call',
      'Email support',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    tagline: 'For scaling companies that need a full system.',
    price: '৳60,000',
    period: '/month',
    popular: true,
    features: [
      'AI Chat + Voice Agent',
      'WhatsApp + SMS automation',
      'CRM automation (GHL/HubSpot)',
      '10,000 AI conversations/mo',
      'Landing page + funnel build',
      'Performance marketing management',
      'Weekly strategy calls',
      'Priority support',
    ],
    cta: 'Scale with Growth',
  },
  {
    name: 'Enterprise',
    tagline: 'Custom AI infrastructure for large organisations.',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited AI agents & channels',
      'Custom AI model training',
      'Full business automation suite',
      'Dedicated automation engineer',
      'API & system integrations',
      'Unlimited strategy sessions',
      'SLA & 24/7 support',
      'White-label options',
    ],
    cta: 'Talk to Sales',
  },
]

export type CaseStudy = {
  slug: string
  client: string
  industry: string
  title: string
  summary: string
  metrics: { label: string; value: string }[]
  services: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'dhaka-realty',
    client: 'Dhaka Realty Group',
    industry: 'Real Estate',
    title: 'Tripled qualified property leads with an AI sales agent',
    summary:
      'We deployed an AI chat agent on their website and WhatsApp that instantly qualifies buyers, answers property questions and books site visits — 24/7.',
    metrics: [
      { label: 'Qualified leads', value: '+212%' },
      { label: 'Response time', value: '-94%' },
      { label: 'Site visits booked', value: '+168%' },
    ],
    services: ['AI Chat Agent', 'WhatsApp Automation', 'CRM Automation'],
  },
  {
    slug: 'medicare-hospital',
    client: 'Medicare Hospital',
    industry: 'Healthcare',
    title: 'AI voice agent cut appointment no-shows by 38%',
    summary:
      'A bilingual (Bangla/English) AI voice agent now handles every appointment call, sends reminders and reschedules automatically — easing pressure on front desk staff.',
    metrics: [
      { label: 'No-show rate', value: '-38%' },
      { label: 'Calls automated', value: '4,200/mo' },
      { label: 'Patient satisfaction', value: '+27%' },
    ],
    services: ['AI Voice Agent', 'CRM Automation', 'Business Automation'],
  },
  {
    slug: 'shopsmart-bd',
    client: 'ShopSmart BD',
    industry: 'E-commerce',
    title: 'Recovered 12,000+ abandoned carts in one quarter',
    summary:
      'A full WhatsApp automation flow re-engages every abandoned cart with personalised offers and order updates — recovering revenue that was previously lost.',
    metrics: [
      { label: 'Carts recovered', value: '12,400' },
      { label: 'Revenue recovered', value: '৳48L' },
      { label: 'ROI', value: '7.2x' },
    ],
    services: ['WhatsApp Automation', 'Sales Funnel', 'Performance Marketing'],
  },
  {
    slug: 'edufirst',
    client: 'EduFirst School Network',
    industry: 'Education',
    title: 'Admissions grew 45% with instant AI enquiry handling',
    summary:
      'An AI agent now answers every admissions enquiry in seconds across web and WhatsApp, nurturing parents from first question to enrolment.',
    metrics: [
      { label: 'Enrolment growth', value: '+45%' },
      { label: 'Enquiry response', value: '<5s' },
      { label: 'Parent NPS', value: '72' },
    ],
    services: ['AI Chat Agent', 'Lead Generation', 'WhatsApp Automation'],
  },
]

export type Faq = { q: string; a: string }

export const pricingFaqs: Faq[] = [
  {
    q: 'Are there any setup fees?',
    a: 'No hidden setup fees. The monthly price covers build, integration, hosting and ongoing optimisation. You only pay the monthly plan price.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. All plans are month-to-month with no lock-in contracts. Cancel anytime and we will wind down your automations gracefully.',
  },
  {
    q: 'What happens if I exceed the AI conversation limit?',
    a: 'You will be notified at 80% and 100% usage. Extra conversations are billed at ৳2/conversation on Starter and ৳1.5/conversation on Growth. Enterprise has unlimited conversations.',
  },
  {
    q: 'Do you offer custom Enterprise pricing?',
    a: 'Absolutely. Enterprise plans are tailored to your volume, integrations and SLA requirements. Book a strategy call for a custom quote.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Instead of a trial, we offer a 30-Day ROI Promise: if you do not see qualified leads in your first month, we keep working for free until you do.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bKash, Nagad, bank transfer, and international cards via Stripe. Invoicing is available for Enterprise clients.',
  },
  {
    q: 'Can I upgrade or downgrade later?',
    a: 'Yes, you can change plans anytime. Upgrades take effect immediately; downgrades take effect at the next billing cycle.',
  },
  {
    q: 'Do you work with businesses outside Bangladesh?',
    a: 'Our primary focus is Bangladesh, but we serve clients globally. Our AI agents support English, Bangla and many other languages.',
  },
]

export const faqs: Faq[] = [
  {
    q: 'What exactly does NextGen Digital Studio do?',
    a: 'We help businesses in Bangladesh automate marketing, sales, customer communication and operations using AI and business automation. Think AI chat agents, voice agents, WhatsApp automation, CRM automation, lead generation and full sales funnels — all designed to generate qualified leads and book strategy calls.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We work with small & medium businesses, corporate companies, real estate, hospitals, schools, e-commerce stores and agencies. Our automations are custom-built around each industry’s workflow.',
  },
  {
    q: 'Can your AI agents speak Bangla?',
    a: 'Yes. Our AI chat and voice agents are fully bilingual in Bangla and English, which is essential for the Bangladesh market. They can switch languages mid-conversation.',
  },
  {
    q: 'How long does it take to launch?',
    a: 'Most AI chat agents and WhatsApp automations go live within 2–3 weeks. Larger CRM and funnel builds typically take 4–6 weeks depending on scope.',
  },
  {
    q: 'Do I need technical knowledge to use this?',
    a: 'Not at all. We handle everything end-to-end — strategy, build, integration, training and ongoing optimisation. You just receive qualified leads and booked calls.',
  },
  {
    q: 'What tools and platforms do you use?',
    a: 'We build on Next.js, GoHighLevel, HubSpot, the WhatsApp Business API, n8n, Zapier and modern LLMs (GPT-4 class models). We pick the right stack for your goals and budget.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plans start at ৳25,000/month for the Starter package. Growth is ৳60,000/month and Enterprise is custom-quoted. You can see full pricing in the pricing section above.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free strategy call using the “Book Strategy Call” button. We’ll audit your business and design a custom AI + automation roadmap with clear ROI projections — no obligation.',
  },
]

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; desc: string }[]
}

export const navMenu: NavItem[] = [
  { label: 'About', href: '#about' },
  {
    label: 'Services',
    href: '#services',
    children: services.slice(0, 8).map((s) => ({
      label: s.title,
      href: `#services`,
      desc: s.short,
    })),
  },
  {
    label: 'Industries',
    href: '#industries',
    children: industries.slice(0, 6).map((i) => ({
      label: i.name,
      href: '#industries',
      desc: i.blurb,
    })),
  },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Why Us', href: '#comparison' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export const clientLogos = [
  'Dhaka Realty',
  'Medicare',
  'ShopSmart BD',
  'EduFirst',
  'NovaCorp',
  'Bloom Agency',
  'UrbanNest',
  'TechBd',
]

export const stats = [
  { value: '120+', label: 'Businesses Automated' },
  { value: '2.4M+', label: 'AI Conversations' },
  { value: '7.2x', label: 'Average ROI' },
  { value: '38%', label: 'Avg. Cost Reduction' },
]

// Numeric versions for animated count-up (suffix carried separately)
export const statsNumeric = [
  { num: 120, suffix: '+', label: 'Businesses Automated', icon: 'building' },
  { num: 2.4, suffix: 'M+', label: 'AI Conversations', icon: 'chat', decimals: 1 },
  { num: 7.2, suffix: 'x', label: 'Average ROI', icon: 'trending', decimals: 1 },
  { num: 38, suffix: '%', label: 'Avg. Cost Reduction', icon: 'piggy' },
]

export const byTheNumbers = [
  { num: 2.4, suffix: 'M+', label: 'AI conversations handled', decimals: 1 },
  { num: 120, suffix: '+', label: 'Businesses automated' },
  { num: 7.2, suffix: 'x', label: 'Average client ROI', decimals: 1 },
  { num: 4.9, suffix: '/5', label: 'Average client rating', decimals: 1 },
  { num: 38, suffix: '%', label: 'Average cost reduction' },
  { num: 5, suffix: 's', label: 'Average response time' },
]

export const comparisonRows = [
  {
    feature: 'AI chat agent on your website',
    nextgen: '24/7, trained on your business, Bangla + English',
    others: 'Generic chatbot or none',
  },
  {
    feature: 'Lead response time',
    nextgen: 'Under 5 seconds, fully automated',
    others: 'Hours or days, manual',
  },
  {
    feature: 'CRM automation',
    nextgen: 'Full pipeline auto-nurture & tagging',
    others: 'Basic setup or manual data entry',
  },
  {
    feature: 'WhatsApp Business API',
    nextgen: 'Official API, broadcasts, chatbots',
    others: 'Personal WhatsApp or none',
  },
  {
    feature: 'Bilingual AI (Bangla)',
    nextgen: 'Native Bangla + English switching',
    others: 'English-only or template messages',
  },
  {
    feature: 'Pricing transparency',
    nextgen: 'Clear monthly plans from ৳25,000',
    others: 'Opaque quotes, hidden fees',
  },
  {
    feature: 'Local Bangladesh team',
    nextgen: 'Dhaka-based, understands local market',
    others: 'Overseas or generic agency',
  },
  {
    feature: 'ROI reporting',
    nextgen: 'Leads, calls & revenue tracked',
    others: 'Vanity metrics or nothing',
  },
]

export const teamMembers = [
  {
    name: 'ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ',
    role: 'প্রতিষ্ঠাতা · যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার',
    bio: '১৭+ বছরের ইঞ্জিনিয়ারিং অভিজ্ঞতা, ৫০০+ সফল প্রজেক্ট, ১০+ বছর CNC বিশেষজ্ঞ। AI এজেন্ট, ওয়েবসাইট ও ডিজিটাল সলিউশনে যশোরের অগ্রগণ্য ইঞ্জিনিয়ার।',
    initials: 'NG',
    image: '/founder.png',
  },
  {
    name: 'AI Engineer',
    role: 'LLM & Automation',
    bio: 'Builds GPT-class chat agents, voice agents and n8n workflows that run 24/7 without human intervention.',
    initials: 'AE',
  },
  {
    name: 'Growth Specialist',
    role: 'Performance Marketing',
    bio: 'Manages Meta, Google & TikTok ad funnels engineered for qualified leads — not just clicks.',
    initials: 'GS',
  },
  {
    name: 'Automation Architect',
    role: 'CRM & Integrations',
    bio: 'Designs GoHighLevel, HubSpot & WhatsApp API flows that never drop a lead across the entire journey.',
    initials: 'AA',
  },
]

export const guarantees = [
  { title: '30-Day ROI Promise', desc: 'See qualified leads in the first month or we work free until you do.' },
  { title: 'No Long Lock-in', desc: 'Monthly plans. Cancel anytime — no multi-year contracts holding you hostage.' },
  { title: 'Bank-grade Security', desc: 'Your data is encrypted, never sold. Official APIs only — no shady shortcuts.' },
  { title: 'Dhaka-based Support', desc: 'A local team that understands your market and responds in Bangla.' },
]

export type ConfiguratorItem = {
  id: string
  name: string
  desc: string
  price: number
  category: 'AI Agents' | 'Automation' | 'Marketing' | 'Web'
  icon: string
  popular?: boolean
}

export const configuratorItems: ConfiguratorItem[] = [
  { id: 'chat-agent', name: 'AI Chat Agent', desc: '24/7 website chatbot trained on your business', price: 15000, category: 'AI Agents', icon: 'chat', popular: true },
  { id: 'voice-agent', name: 'AI Voice Agent', desc: 'Bilingual voice agent for inbound & outbound calls', price: 22000, category: 'AI Agents', icon: 'phone' },
  { id: 'whatsapp-bot', name: 'WhatsApp Bot', desc: 'Official WhatsApp Business API chatbot & broadcasts', price: 12000, category: 'AI Agents', icon: 'whatsapp', popular: true },
  { id: 'crm-auto', name: 'CRM Automation', desc: 'GoHighLevel/HubSpot pipeline & follow-up automation', price: 18000, category: 'Automation', icon: 'crm' },
  { id: 'lead-gen', name: 'Lead Generation', desc: 'Multi-channel lead gen with AI outreach', price: 25000, category: 'Marketing', icon: 'target', popular: true },
  { id: 'funnel', name: 'Sales Funnel', desc: 'Landing page + email/SMS sequence build', price: 20000, category: 'Marketing', icon: 'funnel' },
  { id: 'perf-ads', name: 'Performance Marketing', desc: 'Meta & Google Ads management + creatives', price: 30000, category: 'Marketing', icon: 'trending' },
  { id: 'website', name: 'Website Development', desc: 'Premium Next.js website with SEO', price: 35000, category: 'Web', icon: 'globe' },
  { id: 'landing', name: 'Landing Page', desc: 'High-converting standalone landing page', price: 12000, category: 'Web', icon: 'layout' },
  { id: 'consult', name: 'AI Consultation', desc: 'Strategy session + custom AI roadmap', price: 8000, category: 'Automation', icon: 'brain' },
]

export const awards = [
  { title: 'Top AI Agency 2024', org: 'Bangladesh Tech Awards', year: '2024' },
  { title: 'Best Automation Studio', org: 'Dhaka Business Review', year: '2024' },
  { title: 'Fastest Growing Tech Co.', org: 'Startup BD', year: '2023' },
  { title: 'Innovation Excellence', org: 'ICT Division Bangladesh', year: '2023' },
]

export const certifications = [
  { name: 'WhatsApp Business Partner', desc: 'Official API access' },
  { name: 'Meta Business Partner', desc: 'Certified ads management' },
  { name: 'Google Partner', desc: 'Premier ads & analytics' },
  { name: 'GoHighLevel Pro', desc: 'Certified SaaS automation' },
  { name: 'HubSpot Solutions', desc: 'Certified CRM partner' },
  { name: 'OpenAI API', desc: 'Authorized integration' },
]

export type VideoTestimonial = {
  name: string
  role: string
  company: string
  quote: string
  duration: string
  gradient: string
  initials: string
  metric: string
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    name: 'Tanvir Ahmed',
    role: 'Founder',
    company: 'Dhaka Realty Group',
    quote: 'NextGen tripled our qualified leads in 6 weeks. The AI agent books site visits while we sleep.',
    duration: '2:14',
    gradient: 'from-blue-600 to-cyan-500',
    initials: 'TA',
    metric: '+212% leads',
  },
  {
    name: 'Dr. Nusrat Jahan',
    role: 'Director',
    company: 'Medicare Hospital',
    quote: 'The AI voice agent handles every appointment call in Bangla. No-shows dropped 38%.',
    duration: '1:48',
    gradient: 'from-violet-500 to-purple-500',
    initials: 'NJ',
    metric: '-38% no-shows',
  },
  {
    name: 'Rakib Hasan',
    role: 'CEO',
    company: 'ShopSmart BD',
    quote: 'WhatsApp automation recovered 12,000+ abandoned carts in one quarter. 7x ROI.',
    duration: '2:32',
    gradient: 'from-emerald-500 to-teal-500',
    initials: 'RH',
    metric: '7.2x ROI',
  },
]

export type KnowledgeArticle = {
  title: string
  category: string
  excerpt: string
  readTime: string
  icon: string
}

export const knowledgeArticles: KnowledgeArticle[] = [
  { title: 'How to Set Up WhatsApp Business API in Bangladesh', category: 'WhatsApp', excerpt: 'A step-by-step guide to getting official WhatsApp Business API access and sending your first broadcast.', readTime: '8 min', icon: 'whatsapp' },
  { title: 'AI Chatbot vs AI Voice Agent: Which Is Right for You?', category: 'AI Agents', excerpt: 'Compare the pros, cons and use cases of chat vs voice AI for your business.', readTime: '6 min', icon: 'bot' },
  { title: 'CRM Automation Checklist for 2025', category: 'Automation', excerpt: 'The exact 12-point checklist we use to audit and automate any CRM pipeline.', readTime: '10 min', icon: 'crm' },
  { title: 'Lead Generation Strategies for Bangladeshi SMEs', category: 'Marketing', excerpt: '7 proven lead gen tactics that work specifically in the Bangladesh market.', readTime: '7 min', icon: 'target' },
  { title: 'Understanding n8n vs Zapier: A Practical Comparison', category: 'Automation', excerpt: 'Which automation platform should you choose? A developer-friendly breakdown.', readTime: '9 min', icon: 'workflow' },
  { title: 'How AI is Transforming Real Estate in Dhaka', category: 'Industry', excerpt: 'Real examples of how real estate agencies use AI to close more deals.', readTime: '5 min', icon: 'building' },
]

export type FreeResource = {
  id: string
  title: string
  desc: string
  type: 'Template' | 'Checklist' | 'Ebook' | 'Calculator' | 'Swipe File'
  size: string
  downloads: string
  icon: string
  color: string
}

export const freeResources: FreeResource[] = [
  { id: 'crm-checklist', title: 'CRM Automation Checklist', desc: '12-point audit to find every automation gap in your sales pipeline.', type: 'Checklist', size: 'PDF · 8 pages', downloads: '3.2k', icon: 'checklist', color: 'from-blue-600 to-cyan-500' },
  { id: 'whatsapp-templates', title: '30 WhatsApp Message Templates', desc: 'Ready-to-use broadcast & follow-up templates for Bangladeshi businesses.', type: 'Template', size: 'PDF · 24 templates', downloads: '5.1k', icon: 'whatsapp', color: 'from-green-500 to-emerald-500' },
  { id: 'ai-readiness-ebook', title: 'AI Readiness Ebook 2025', desc: 'The complete guide to assessing & implementing AI in your business.', type: 'Ebook', size: 'PDF · 42 pages', downloads: '2.8k', icon: 'book', color: 'from-violet-500 to-purple-500' },
  { id: 'funnel-swipe', title: '6 High-Converting Funnel Swipe File', desc: 'Real funnel breakdowns from our top-performing client campaigns.', type: 'Swipe File', size: 'PDF · 18 pages', downloads: '1.9k', icon: 'funnel', color: 'from-amber-500 to-orange-500' },
  { id: 'lead-gen-calculator', title: 'Lead Gen ROI Calculator', desc: 'Spreadsheet that models your lead gen ROI with AI automation.', type: 'Calculator', size: 'XLSX · interactive', downloads: '4.4k', icon: 'calculator', color: 'from-rose-500 to-pink-500' },
  { id: 'voice-agent-script', title: 'AI Voice Agent Script Library', desc: 'Proven call scripts for appointment booking, support & follow-up.', type: 'Template', size: 'PDF · 15 scripts', downloads: '1.5k', icon: 'phone', color: 'from-teal-500 to-cyan-500' },
]

export type Integration = {
  name: string
  category: 'AI & LLM' | 'CRM' | 'Messaging' | 'Marketing' | 'Automation' | 'Analytics' | 'Web'
  emoji: string
  desc: string
}

export const integrations: Integration[] = [
  { name: 'OpenAI GPT-4', category: 'AI & LLM', emoji: '🤖', desc: 'GPT-class models for chat & content' },
  { name: 'Anthropic Claude', category: 'AI & LLM', emoji: '🧠', desc: 'Advanced reasoning AI' },
  { name: 'Gemini', category: 'AI & LLM', emoji: '✨', desc: 'Google multimodal AI' },
  { name: 'ElevenLabs', category: 'AI & LLM', emoji: '🗣️', desc: 'Realistic AI voice generation' },
  { name: 'GoHighLevel', category: 'CRM', emoji: '📈', desc: 'All-in-one CRM & automation' },
  { name: 'HubSpot', category: 'CRM', emoji: '🎯', desc: 'Inbound marketing CRM' },
  { name: 'Salesforce', category: 'CRM', emoji: '☁️', desc: 'Enterprise CRM platform' },
  { name: 'Pipedrive', category: 'CRM', emoji: '🔧', desc: 'Sales pipeline management' },
  { name: 'WhatsApp Business API', category: 'Messaging', emoji: '💬', desc: 'Official WhatsApp automation' },
  { name: 'Telegram Bot API', category: 'Messaging', emoji: '✈️', desc: 'Telegram chatbot integration' },
  { name: 'Twilio', category: 'Messaging', emoji: '📞', desc: 'SMS & voice programmable API' },
  { name: 'SendGrid', category: 'Messaging', emoji: '📧', desc: 'Email delivery & automation' },
  { name: 'Meta Ads', category: 'Marketing', emoji: '📘', desc: 'Facebook & Instagram ads' },
  { name: 'Google Ads', category: 'Marketing', emoji: '🔍', desc: 'Search & display advertising' },
  { name: 'TikTok Ads', category: 'Marketing', emoji: '🎵', desc: 'Short-form video ads' },
  { name: 'LinkedIn Ads', category: 'Marketing', emoji: '💼', desc: 'B2B professional ads' },
  { name: 'n8n', category: 'Automation', emoji: '🔗', desc: 'Open-source workflow automation' },
  { name: 'Zapier', category: 'Automation', emoji: '⚡', desc: 'No-code app integrations' },
  { name: 'Make (Integromat)', category: 'Automation', emoji: '🔄', desc: 'Visual automation builder' },
  { name: 'ActiveCampaign', category: 'Automation', emoji: '📨', desc: 'Email & marketing automation' },
  { name: 'Google Analytics 4', category: 'Analytics', emoji: '📊', desc: 'Next-gen web analytics' },
  { name: 'Mixpanel', category: 'Analytics', emoji: '🔬', desc: 'Product & event analytics' },
  { name: 'Hotjar', category: 'Analytics', emoji: '🔥', desc: 'Heatmaps & session recordings' },
  { name: 'Next.js', category: 'Web', emoji: '▲', desc: 'React framework for web apps' },
  { name: 'Vercel', category: 'Web', emoji: '✦', desc: 'Deploy & hosting platform' },
  { name: 'Supabase', category: 'Web', emoji: '🗄️', desc: 'Postgres backend & auth' },
  { name: 'Stripe', category: 'Web', emoji: '💳', desc: 'Payment processing' },
]

export type JobOpening = {
  id: string
  title: string
  department: string
  type: string
  location: string
  desc: string
  emoji: string
}

export const jobOpenings: JobOpening[] = [
  { id: 'ai-engineer', title: 'AI Engineer', department: 'Engineering', type: 'Full-time', location: 'Dhaka (Hybrid)', desc: 'Build GPT-class chat agents, voice agents & automation workflows for clients across Bangladesh.', emoji: '🤖' },
  { id: 'automation-specialist', title: 'Automation Specialist', department: 'Engineering', type: 'Full-time', location: 'Remote', desc: 'Design and build n8n/Zapier workflows that connect CRMs, messaging & AI for our clients.', emoji: '🔗' },
  { id: 'growth-marketer', title: 'Growth Marketer', department: 'Marketing', type: 'Full-time', location: 'Dhaka (Hybrid)', desc: 'Manage Meta, Google & TikTok ad funnels engineered for qualified leads and clear ROI.', emoji: '📈' },
  { id: 'frontend-developer', title: 'Frontend Developer', department: 'Engineering', type: 'Full-time', location: 'Remote', desc: 'Build premium, high-converting websites and landing pages with Next.js, React & Tailwind.', emoji: '🎨' },
  { id: 'sales-executive', title: 'Sales Executive', department: 'Sales', type: 'Full-time', location: 'Dhaka', desc: 'Convert inbound leads into clients. Manage the pipeline, give demos and close deals.', emoji: '💼' },
  { id: 'content-writer', title: 'Content Writer (Bangla/English)', department: 'Marketing', type: 'Part-time', location: 'Remote', desc: 'Write blog posts, case studies and WhatsApp templates in both Bangla and English.', emoji: '✍️' },
]







export const processSteps = [
  {
    step: '01',
    title: 'Discovery & Audit',
    desc: 'We analyse your sales process, customer journey and tools to find the highest-ROI automation opportunities.',
  },
  {
    step: '02',
    title: 'Strategy & Roadmap',
    desc: 'You receive a custom AI + automation roadmap with clear timelines, costs and projected ROI.',
  },
  {
    step: '03',
    title: 'Build & Integrate',
    desc: 'We design, build and integrate your AI agents, automations and funnels into your existing stack.',
  },
  {
    step: '04',
    title: 'Launch & Optimise',
    desc: 'We go live, monitor performance and continuously optimise to maximise leads, calls and revenue.',
  },
]

export const whyChooseUs = [
  {
    title: 'Bangladesh-First AI',
    desc: 'Bilingual Bangla & English AI agents built specifically for the local market — not generic global tools.',
    icon: 'globe',
  },
  {
    title: 'Done-For-You System',
    desc: 'We handle strategy, build, integration and optimisation end-to-end. You focus on closing deals.',
    icon: 'rocket',
  },
  {
    title: 'Measurable ROI',
    desc: 'Every automation is tied to revenue. We report on leads, calls and conversions — not vanity metrics.',
    icon: 'trending',
  },
  {
    title: 'Enterprise-Grade Tech',
    desc: 'GPT-class models, official WhatsApp API and modern infrastructure trusted by corporates.',
    icon: 'shield',
  },
  {
    title: 'Fast Time-To-Value',
    desc: 'Most systems go live in 2–4 weeks. You see qualified leads within the first month.',
    icon: 'zap',
  },
  {
    title: 'Local Support Team',
    desc: 'A Dhaka-based team that understands your market, your customers and your business culture.',
    icon: 'users',
  },
]

export const blogPosts = [
  {
    slug: 'ai-sales-automation-bangladesh',
    title: 'How AI Sales Automation is Reshaping Bangladeshi SMEs in 2025',
    excerpt:
      'A practical breakdown of how small businesses in Bangladesh are using AI to respond to leads instantly, cut costs and 3x their conversions.',
    category: 'AI Automation',
    readTime: '7 min read',
    date: 'Jan 12, 2025',
  },
  {
    slug: 'whatsapp-business-api-guide',
    title: 'The Complete WhatsApp Business API Guide for Bangladeshi E-commerce',
    excerpt:
      'Everything you need to know about using WhatsApp automation to recover carts, send order updates and blast promotions legally and effectively.',
    category: 'WhatsApp',
    readTime: '9 min read',
    date: 'Jan 5, 2025',
  },
  {
    slug: 'ai-voice-agent-healthcare',
    title: 'Why Hospitals in Bangladesh Are Switching to AI Voice Agents',
    excerpt:
      'Case study-driven look at how AI voice agents reduce no-shows, handle 24/7 appointment booking and improve patient satisfaction.',
    category: 'AI Voice',
    readTime: '6 min read',
    date: 'Dec 28, 2024',
  },
  {
    slug: 'crm-automation-playbook',
    title: 'The CRM Automation Playbook: Never Drop a Lead Again',
    excerpt:
      'A step-by-step framework to automate your CRM so every lead is nurtured, tagged and followed up — automatically.',
    category: 'Automation',
    readTime: '8 min read',
    date: 'Dec 20, 2024',
  },
]

export const siteConfig = {
  name: 'NextGen Digital Studio',
  shortName: 'NextGen',
  url: 'https://nextgendigitalstudio.com',
  tagline: 'AI Sales Automation Agency in Bangladesh',
  description:
    'NextGen Digital Studio helps businesses in Bangladesh automate marketing, sales, customer communication and operations using Artificial Intelligence and Business Automation. Generate qualified leads and book strategy calls.',
  email: 'nextgendigitalstudio1@gmail.com',
  phone: '+880 1711 731354',
  whatsapp: '8801711731354',
  address: 'মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট, যশোর, বাংলাদেশ',
  founder: 'ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই)',
  founderTitle: 'যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার',
  slogan: 'ইঞ্জিনিয়ারিং প্রিসিশনে ডিজিটাল সলিউশন',
  facebook: 'https://www.facebook.com/nextgendigitalstudio',
  linkedin: 'https://www.linkedin.com/in/nextgen-digital-studio',
  github: 'https://github.com/Taj3D',
  instagram: 'https://instagram.com/nextgendigitalstudio1',
  threads: 'https://threads.net/nextgendigitalstudio1',
  youtube: 'https://www.youtube.com/@NextGenDigitalStudio1',
  twitter: 'https://x.com/NextGenDigit',
  mapsQuery: 'নিউমার্কেট, যশোর, বাংলাদেশ',
}
