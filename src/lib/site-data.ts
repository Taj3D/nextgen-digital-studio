// Central site content for NextGen Digital Studio
// All data is bilingual (English + Bangla) for EN/BN language toggle

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
  nameBn: 'নেক্সটজেন ডিজিটাল স্টুডিও',
  shortName: 'NextGen',
  url: 'https://nextgendigitalstudio.com',
  tagline: 'AI Sales Automation Agency in Bangladesh',
  description:
    'NextGen Digital Studio helps businesses in Bangladesh automate marketing, sales, customer communication and operations using Artificial Intelligence and Business Automation. Generate qualified leads and book strategy calls.',
  email: 'nextgendigitalstudio1@gmail.com',
  phone: '+880 1711 731354',
  phoneDisplay: '+880 1711-731354',
  whatsapp: '8801711731354',
  address: 'মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট, যশোর, বাংলাদেশ',
  founded: 2023,
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
