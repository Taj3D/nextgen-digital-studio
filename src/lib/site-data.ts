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
  challenge: string
  solution: string
  results: string
  testimonial: { quote: string; author: string; title: string }
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
    challenge:
      'Dhaka Realty Group, one of the larger real estate developers in Bangladesh, was generating a steady volume of inbound enquiries from Facebook ads, website forms, and property portals like bproperty.com — but their sales team of 12 consultants could not keep up. Most enquiries arrived outside business hours, and leads were being responded to 6–18 hours later, by which point many had already engaged competitors. Their legacy Zoho CRM had no automation, no lead scoring, and no WhatsApp integration, so consultants were manually copying lead data between Facebook Lead Ads spreadsheets, the website form submissions, and WhatsApp chat windows. Duplicate leads, missed follow-ups, and zero visibility on conversion rates made it impossible to forecast revenue. Worse, their combined Google and Meta ad spend had grown to ৳4.5 lakh per month with no clear attribution — they were paying for clicks that turned into conversations that never closed. Management knew they had a leaky funnel but could not pinpoint where, and the consultants were burning out trying to chase cold leads alongside genuinely interested buyers. The marketing team was also retargeting the same audiences with diminishing returns, unable to identify which segments actually converted, so an estimated 60% of ad budget was being wasted on leads who would never buy. The Managing Director had been pitched by three other agencies promising "AI solutions" but was skeptical after a previous vendor delivered a chatbot that broke every time a visitor asked an off-script question.',
    solution:
      'We deployed a bilingual (Bangla/English) AI chat agent on their website that engages every visitor in under 3 seconds, qualifies them against a 9-question property-buyer profile (budget, location preference, ready flat vs. under-construction, handover timeline, financing method), and routes hot leads directly to the right property consultant. The same AI agent was extended to the WhatsApp Business API so Facebook Lead Ads enquiries automatically receive a personalized WhatsApp message within 60 seconds. We then integrated everything into a fresh GoHighLevel CRM with lead scoring, automated follow-up sequences (5 touchpoints over 14 days via WhatsApp, email, and SMS), and a real-time dashboard for the sales manager. A site-visit booking flow lets the AI propose available time slots and sync them to the assigned consultant\'s Google Calendar. Every conversation is logged, transcribed, and scored, so management can identify high-performing consultants and coach underperformers. A custom UTM-tracking layer finally closed the attribution gap between ad spend and closed deals. We also implemented a sentiment and intent classifier that scores every conversation in real-time, surfacing only sales-ready leads to consultants via WhatsApp push notifications — meaning consultants now spend 80% of their day on closing conversations instead of prospecting. A weekly automated performance report is generated for the Managing Director showing lead-source ROI, consultant leaderboard, and pipeline forecast. The entire stack was deployed in 3 weeks with zero changes to the existing website — the AI agent was embedded as a floating widget plus a dedicated WhatsApp Business number.',
    results:
      'Within the first 90 days, qualified leads grew 212% and site-visit bookings jumped 168%, while average response time dropped from 6 hours to under 30 seconds — a 94% reduction. The sales team\'s closing rate improved from 3.2% to 7.8% thanks to lead scoring and faster follow-up. Facebook ad ROI improved 2.4x as the team could finally attribute closed deals to specific campaigns, and 41% of low-converting ad sets were paused within the first month. The CRM automation saved each consultant an estimated 12 hours per week of manual data entry, freeing them to focus on actual selling. The Managing Director now receives a weekly pipeline forecast that has been within 8% of actual closed-deal value for three consecutive months — a level of predictability the company has never had before.',
    testimonial: {
      quote:
        'We were burning 4.5 lakh taka a month on Facebook ads and had no idea which leads were actually turning into sales. NextGen\'s AI agent replies to every enquiry in seconds — even at 2 AM — and the CRM finally gives us proper visibility on what\'s closing. Our site visits have more than doubled. This is the best investment we\'ve made in our sales process.',
      author: 'Tanvir Ahmed',
      title: 'Head of Sales, Dhaka Realty Group',
    },
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
    challenge:
      'Medicare Hospital, a 220-bed multi-specialty hospital in Chittagong, was losing patients and frustrating staff due to an overwhelmed front-desk phone system. Their 4 receptionists handled roughly 4,200 inbound calls per month — appointment booking, rescheduling, doctor availability enquiries, report-ready confirmations, and emergency triage. During peak hours (9 AM–1 PM), 31% of calls went unanswered, and patients would either call back multiple times or simply go to a competing hospital. The manual ledger-based booking system also meant double-bookings happened 8–10 times a week, and no-show rates were sitting at 22% because there was no systematic reminder system. Elderly patients who only spoke Bangla struggled with the English-only IVR menu, and after-hours calls (5 PM–9 AM) were completely unhandled. Hospital management estimated they were losing 30–40 OPD patients per week to competitors purely because of phone accessibility issues, and the receptionists were reporting burnout at an unsustainable rate. The hospital\'s existing IT vendor had quoted ৳18 lakh for an on-premise PBX upgrade with a 6-month implementation timeline — money the management was reluctant to spend on infrastructure that still wouldn\'t solve the human-staffing gap. They needed a solution that could handle call volume 24/7, in both Bangla and English, without requiring additional headcount, and without disrupting the existing HMIS that staff were already trained on.',
    solution:
      'We deployed a bilingual (Bangla/English) AI voice agent built on a telephony-integrated LLM stack that now answers every inbound call 24/7 within 2 rings. The agent handles appointment booking by checking doctor availability in real-time against the hospital\'s HMIS, confirms slots verbally with the patient, and writes the booking directly into the system. It also handles rescheduling, cancellations, and answers FAQs about visiting hours, doctor OPD schedules, report collection, and billing counter locations. For after-hours calls, the agent triages emergencies — if keywords like "emergency", "accident", or "chest pain" are detected, it immediately forwards to the on-call doctor\'s mobile. We layered on an automated WhatsApp + SMS reminder system that sends confirmations at booking time, reminders 24 hours before, and a final reminder 2 hours before the appointment. Patients can confirm or cancel via a simple reply, and the AI updates the HMIS automatically. A full call transcript and analytics dashboard lets hospital management monitor volume, common questions, and agent performance. The entire integration was completed in 4 weeks without any changes to the existing HMIS database schema — the AI agent talks to the HMIS through a thin REST API wrapper that the hospital\'s IT team reviewed and approved. A fallback "press 0 to speak to a receptionist" option was preserved during business hours to handle edge cases and build patient trust during the rollout phase.',
    results:
      'In the first 6 months, the AI voice agent handled 4,200 calls/month autonomously — eliminating the 31% unanswered call rate entirely. No-show rates dropped 38% (from 22% to 13.6%) thanks to the multi-channel reminder system, freeing up an estimated 180 doctor-hours per month that were previously lost to empty slots. Patient satisfaction scores climbed 27% (CSAT from 71 to 90), with the highest score gains among elderly patients who could now converse in Bangla. Front-desk staff, freed from phone duty, were redeployed to in-person patient assistance, and the hospital recaptured an estimated 120+ OPD patients per month who previously went to competitors. After-hours call coverage went from 0% to 100%, and the AI agent correctly triaged 14 genuine emergencies to the on-call doctor during the first 6 months. The total investment was less than half of the quoted PBX upgrade cost, with ROI achieved in under 4 months.',
    testimonial: {
      quote:
        'Our receptionists were drowning in calls, and we were losing patients every single day because no one picked up. The AI voice agent handles every call in Bangla and English, books appointments straight into our system, and the reminders have cut our no-shows dramatically. Patients actually thank us for being so responsive now. I never thought AI could feel this human.',
      author: 'Dr. Shahana Begum',
      title: 'Medical Director, Medicare Hospital',
    },
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
    challenge:
      'ShopSmart BD, a D2C e-commerce brand selling electronics accessories across Bangladesh, was facing a textbook abandoned-cart crisis. Their Shopify store was generating ৳1.2 crore in annual GMV, but 68% of all carts were being abandoned — amounting to over ৳80 lakh in potentially recoverable revenue each year. Their previous "recovery" tactic was a single generic email sent 24 hours after abandonment, which had an open rate of just 6% and recovered fewer than 1% of carts. Worse, the Bangladeshi e-commerce market runs on WhatsApp — customers expect to message before buying, ask about stock, request cash-on-delivery confirmation, and get shipping updates. But ShopSmart had no WhatsApp infrastructure; customer support was a single overwhelmed agent working 9-to-5, and the Facebook Page inbox was a mess of unread messages. Order-status enquiries ("Where is my order?") consumed 70% of support time. Returns and refund requests were being lost in inbox clutter. They needed an automation layer that matched how Bangladeshis actually shop online. The founders had tried two generic WhatsApp marketing tools previously but abandoned both — one couldn\'t integrate with Shopify inventory, the other kept getting their WhatsApp Business number flagged as spam after large broadcast sends. The technical co-founder was specifically insistent that any new solution integrate cleanly with their existing Pathao and RedX courier APIs so order-status queries could be answered without human intervention, and that the AI chatbot be capable of understanding Romanised Bangla (Banglish) since most of their customers type in that hybrid script.',
    solution:
      'We built a full WhatsApp Business API automation stack layered on top of their Shopify store. At the moment of cart abandonment, an AI chatbot triggers a personalized WhatsApp message within 15 minutes — referencing the exact product left in the cart, with a one-tap checkout link and a limited-time 5% discount code. If the customer doesn\'t reply, two more smartly-spaced follow-ups go out over 48 hours with different angles (product benefit, then social proof). The same AI chatbot now handles all inbound WhatsApp messages — answering stock enquiries in real-time, confirming COD orders, and processing "Where is my order?" queries by pulling live data from the Pathao and RedX courier APIs. We integrated a 3-step post-purchase flow that requests a Google review, offers a complementary accessory upsell, and sends shipping + delivery updates automatically. Returns and refund requests are routed to a structured form that captures reason and photo evidence before reaching the human support agent. The AI was specifically fine-tuned to understand Banglish (Romanised Bengali) inputs, which account for roughly 60% of inbound messages. We also implemented a smart-segmentation engine that tags every customer by purchase history, cart value, and engagement tier — enabling targeted broadcast campaigns for new product launches that comply with WhatsApp\'s 24-hour messaging window policy. The whole stack went live in 3 weeks, with the WhatsApp Business API officially approved through Meta\'s Business Verification process.',
    results:
      'In the first quarter after launch, ShopSmart BD recovered 12,400 abandoned carts — translating to ৳48 lakh in recovered revenue. WhatsApp open rates hit 87% (vs. 6% on the old email flow), and reply rates were 23%. ROI on the automation was 7.2x within 90 days, with the system paying for itself in the first 18 days. Customer support tickets dropped 65% as the AI handled routine "where is my order" queries autonomously, and the lone support agent was finally able to take weekends off without a backlog piling up. The post-purchase review flow generated 380+ new 5-star Google reviews, boosting local SEO and ad click-through rates simultaneously. A targeted WhatsApp broadcast for a new product launch in month 3 generated ৳6.2 lakh in single-day revenue — the brand\'s biggest sales day ever.',
    testimonial: {
      quote:
        'We were leaving 80 lakh taka on the table every year in abandoned carts, and we knew it — we just didn\'t have the team or the tech to chase them. NextGen built a WhatsApp system that does it automatically, in our customers\' language, on the channel they actually use. The 7.2x ROI speaks for itself, and our support team finally has time to focus on real issues instead of answering "where is my order" 200 times a day.',
      author: 'Fahim Reza',
      title: 'Co-founder, ShopSmart BD',
    },
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
    challenge:
      'EduFirst School Network, a chain of 4 English-medium schools across Dhaka and Gazipur, was struggling to convert admissions enquiries into enrolled students during the critical January–March admission season. Their admissions team of 3 counselors was receiving 800+ enquiries per month across Facebook ads, website forms, phone calls, and walk-ins — but only converting 9% into enrolled students, well below the industry benchmark of 18–22%. The bottleneck was follow-up: parents would ask 4–6 questions over a 2–3 week decision window, and counselors simply could not keep up with personalized touchpoints for every enquiry. Most received a single templated reply and one phone call, then went cold. There was no lead nurturing sequence, no parent segmentation (by child\'s age, by campus preference, by fee sensitivity), and no analytics on which enquiry sources actually converted. Worse, prospective parents who messaged outside business hours — the majority, since both parents typically work — got no response until the next morning, by which point they had often shortlisted other schools. The Director of Admissions had previously invested in a generic email-marketing tool, but open rates sat at 11% and most parents ignored the templated newsletters entirely. They also faced intense competition from two rival school chains that had recently launched aggressive Facebook ad campaigns — meaning every delayed response was a direct loss to a competitor. Management set a clear KPI: grow enrolment by at least 30% year-over-year, or risk losing a campus to consolidation.',
    solution:
      'We deployed an AI chat agent on the EduFirst website and WhatsApp that responds to every admissions enquiry in under 5 seconds, 24/7, in both Bangla and English. The agent answers detailed questions about curriculum (Cambridge vs. Edexcel), fee structure, campus facilities, transport routes, teacher qualifications, and admission deadlines — pulling from a knowledge base of 200+ pre-approved FAQs. It then captures the parent\'s key details (child\'s name, current grade, target campus, preferred session) and segments the lead automatically in a GoHighLevel CRM. We built a 21-day automated nurturing sequence: parents receive a personalized WhatsApp message every 3 days with relevant content — first a campus virtual tour video, then a fee comparison sheet, then testimonials from current parents, then an invitation to a campus open house, then a limited-window application fee waiver. Hot leads (those who engage with 3+ messages) are auto-routed to a human counselor for a phone call within 2 hours. A parallel retargeting funnel on Facebook and Instagram shows campus-specific ads to parents who visited the site but didn\'t enquire. We also built a parent-friendly landing page for each campus, with embedded virtual tours, fee calculator, and a one-tap "Book a Campus Visit" CTA that drops straight into the counselor\'s Google Calendar. Every conversation is logged and tagged for the admissions team\'s monthly review, with an analytics dashboard showing enquiry-to-enrolment funnel conversion by source, campus, and counselor. The full stack launched in 4 weeks, just in time for the January admission season kickoff.',
    results:
      'Over the 4-month admission season, enrolment grew 45% year-over-year across all 4 campuses — from 612 new admissions to 887, comfortably exceeding the 30% target set by management. Average enquiry response time dropped from 8 hours (business-hours-only) to under 5 seconds, 24/7. Parent NPS climbed to 72 (from 54 the prior year), with surveys specifically citing the "responsive and informative" WhatsApp experience as a key driver. The Facebook retargeting funnel generated 156 additional enquiries at a 38% lower cost-per-lead than cold ads. Counselor productivity tripled as they focused only on hot, sales-ready leads — the team handled 41% more enquiries than the prior year with the same headcount, and one counselor was promoted to handle a fifth campus opening in the next academic year.',
    testimonial: {
      quote:
        'Admissions season used to be chaos — 800 enquiries, 3 counselors, and we\'d lose half the parents because we couldn\'t follow up fast enough. NextGen\'s AI agent replies instantly, in Bangla or English, at any hour, and the nurturing sequence keeps parents engaged for the full 3 weeks they need to make a decision. We grew enrolment 45% this year. I genuinely don\'t think we could have handled the volume without it.',
      author: 'Nusrat Jahan',
      title: 'Director of Admissions, EduFirst School Network',
    },
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

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  /** Long-form article body. Markdown-like plain text:
   *  - "\n\n" separates paragraphs
   *  - a paragraph starting with "## " is rendered as an h3 section heading
   *  - a paragraph starting with "### " is rendered as an h4 sub-heading
   *  - "**text**" is rendered as inline bold */
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-sales-automation-bangladesh',
    title: 'How AI Sales Automation is Reshaping Bangladeshi SMEs in 2025',
    excerpt:
      'A practical breakdown of how small businesses in Bangladesh are using AI to respond to leads instantly, cut costs and 3x their conversions.',
    category: 'AI Automation',
    readTime: '7 min read',
    date: 'Jan 12, 2025',
    content: '## Why Bangladeshi SMEs Are Losing Leads Every Single Day\n\nWalk through any SME market in Dhaka — from electronics shops in Bashundhara City to garments wholesalers in Karwan Bazar — and you will hear the same story. Customers message on Facebook at 11 PM, send WhatsApp inquiries at midnight, and call during lunch breaks. By the time a salesperson responds the next morning, the lead has already bought from a competitor who replied in 3 minutes.\n\nA 2024 study by the Bangladesh E-Commerce Association (e-CAB) found that 78% of Bangladeshi consumers expect a response within 5 minutes when they message a business online. The reality? The average SME response time is 8 hours. That gap is where 60-70% of qualified leads quietly die every day.\n\nAI sales automation closes that gap. Instead of relying on humans to manually respond to every message, an AI agent — trained on your exact products, prices, and policies — replies in under 3 seconds, 24 hours a day, 7 days a week, in both Bangla and English.\n\n## What AI Sales Automation Actually Means in 2025\n\nLet us clear up a common misunderstanding. When we say "AI sales automation," we are not talking about a clunky chatbot from 2018 that says "I did not understand that" every three messages. We are talking about a GPT-class AI agent that:\n\n- Understands natural Bangla, including regional spellings and romanized Bangla like "apnar dam koto"\n- Knows your full product catalogue, stock levels, and current offers\n- Qualifies leads by asking the right questions (budget, timeline, decision-maker)\n- Books appointments directly into your Google Calendar or GoHighLevel CRM\n- Hands off to a human salesperson the moment a deal is hot or the question is too complex\n\nThe agent does not replace your sales team. It handles the first 80% of the conversation — the repetitive qualifying questions every lead asks — so your humans can focus on closing deals instead of typing "our price starts at ৳15,000" for the 47th time that day.\n\n## The Real Numbers: What Bangladeshi SMEs Are Seeing\n\nWe have deployed AI sales automation for over 40 SMEs across Dhaka, Chittagong, Khulna, and Sylhet in the last 12 months. Here is what the data shows:\n\n- Average response time dropped from 4-8 hours to under 3 seconds (a 99.9% reduction)\n- Lead-to-appointment conversion rate rose from 8% to 24% on average\n- After-hours leads (8 PM to 8 AM) — previously 100% lost — now convert at 19%\n- Sales teams reclaimed 5-7 hours per person per week, redirecting that time to closing deals\n- One Jessore-based electronics retailer saw a 240% revenue jump in 4 months after deployment\n\nThe economics are simple. A typical Bangladeshi SME loses ৳2-5 lakh per month in missed lead opportunities. AI sales automation costs ৳15,000-35,000 per month depending on volume. The ROI is rarely under 10x.\n\n## How It Works: The 5-Stage AI Sales Engine\n\nA properly designed AI sales automation system has five connected stages.\n\n### Stage 1: Capture\n\nEvery lead — from Facebook Messenger, WhatsApp, website chat, Instagram DM, or form submission — gets pulled into one unified inbox. No more logging into 6 different apps to check messages.\n\n### Stage 2: Qualify\n\nThe AI asks 3-5 targeted questions to score the lead: budget range, timeline, decision-making authority, and specific need. Hot leads are flagged red; cold leads are tagged for nurture.\n\n### Stage 3: Nurture\n\nNot every lead is ready to buy today. The AI sends a 5-touch sequence over 2 weeks — sharing relevant offers, case studies, and FAQs — automatically reviving leads that went cold.\n\n### Stage 4: Book\n\nWhen a lead is qualified and interested, the AI offers 3 calendar slots and books directly. The appointment lands in your CRM with full context attached.\n\n### Stage 5: Report\n\nYou see a live dashboard: leads by source, conversion rate, response time, revenue per channel. No more guessing which Facebook ad actually makes money.\n\n## Common Mistakes to Avoid\n\nMost Bangladeshi SMEs that try AI sales automation fail in one of three ways.\n\nThe first mistake is using a generic chatbot that was not trained on your business. A customer asks "আপনার এয়ার কুলারের দাম কত?" and the bot responds with a generic "please visit our store." It has to know your actual prices, warranty terms, and delivery areas.\n\nThe second mistake is no human handoff. AI handles 80% of conversations, but the 20% it cannot handle need to reach a real human within 5 minutes — not 5 hours.\n\nThe third mistake is treating AI as a one-time install. The agent needs to be trained on new products, price changes, and seasonal offers every month. Without ongoing optimization, accuracy drops from 95% to 70% within weeks.\n\n## Who Should (and Should Not) Deploy AI Sales Automation\n\nThis technology shines for businesses that receive 50+ inbound messages per month and have a clear product or service to sell. That covers:\n\n- E-commerce stores (Daraz sellers, Facebook Live sellers, Shopify BD stores)\n- Real estate developers and brokers\n- Private clinics, dental chambers, and diagnostic centers\n- Coaching centers, schools, and online course creators\n- Auto showrooms, electronics retailers, and furniture shops\n- B2B service providers (agencies, accountants, legal firms)\n\nIt is not the right fit for businesses with under 30 monthly inquiries (you can handle that manually) or for high-touch luxury sales where the relationship IS the product.\n\n## The Cost Question: Is It Worth It for an SME?\n\nLet us do the math. Say you run a mid-sized e-commerce store in Dhaka doing ৳8 lakh/month in revenue. You receive 400 inquiries per month, convert 8% (32 sales), average order value ৳4,000.\n\nAfter AI automation, conversion rises to 18% (72 sales). Revenue becomes 72 × ৳4,000 = ৳2.88 lakh additional. AI cost is ৳25,000/month on the Starter plan. Net additional profit is roughly ৳2.6 lakh per month.\n\nThat is a 10x ROI in the first month. And it scales — the cost stays flat while lead volume grows.\n\n## How to Get Started\n\nThe fastest path is a 30-minute strategy call. We audit your current lead flow, identify the 3 biggest leaks, and design a custom AI + automation roadmap with clear ROI projections. No obligation, no jargon — just a real conversation about your business.\n\nBook your free strategy call today and see exactly how AI sales automation would work for your business in Bangladesh.',
  },
  {
    slug: 'whatsapp-business-api-guide',
    title: 'The Complete WhatsApp Business API Guide for Bangladeshi E-commerce',
    excerpt:
      'Everything you need to know about using WhatsApp automation to recover carts, send order updates and blast promotions legally and effectively.',
    category: 'WhatsApp',
    readTime: '9 min read',
    date: 'Jan 5, 2025',
    content: '## Why WhatsApp Matters More Than Facebook in Bangladesh\n\nBangladesh has 53 million WhatsApp users as of early 2025 — roughly 60% of all internet users in the country. For e-commerce, the numbers are even more striking: 87% of online shoppers in Bangladesh say WhatsApp is their preferred channel for order updates, customer support, and post-purchase questions, according to the BCC 2024 Digital Consumer Survey.\n\nIf your e-commerce store is not on WhatsApp Business API, you are leaving revenue on the table every single day.\n\nThis guide walks through everything a Bangladeshi e-commerce owner needs to know: what the WhatsApp Business API is, how it differs from the free WhatsApp Business app, how to get approved, what it costs in BDT, and how to actually use it to recover carts, send order updates, and run legal promotional campaigns.\n\n## WhatsApp Business App vs WhatsApp Business API: What is the Difference?\n\nThis is the number one point of confusion. The free WhatsApp Business App (the one you download from Play Store) is fine for a solopreneur with 100 customers. But for any serious e-commerce operation, it has hard limits:\n\n- Single device only — cannot have multiple agents\n- No automation beyond basic auto-replies\n- No broadcast messages above 256 contacts\n- No integration with Shopify, Daraz, or your CRM\n- WhatsApp can (and will) ban your number if you send too many messages\n\nThe WhatsApp Business API solves all of these. It is a cloud-based platform (officially called WhatsApp Cloud API, hosted by Meta) that lets you:\n\n- Connect unlimited agents to one number\n- Send programmatic messages triggered by events (order placed, shipped, delivered)\n- Run broadcast campaigns to unlimited opted-in subscribers\n- Integrate with Shopify, WooCommerce, GoHighLevel, n8n, and 100+ tools\n- Use chatbots and AI agents for 24/7 automated conversations\n\n## Step 1: Check Your Eligibility\n\nMeta has strict rules for who can use the WhatsApp Business API. To get approved, your business must:\n\n- Be a legally registered entity (Bangladeshi trade license is accepted)\n- Have a verified Facebook Business Manager account\n- Have a website with your business name and contact info\n- Sell products or services that comply with Meta Commerce Policies (no weapons, tobacco, adult content, etc.)\n\nFor Bangladeshi sole proprietors without a trade license, the workaround is to register under a personal business name with a shop license from your local City Corporation. Dhaka North and South City Corporation issue these for ৳2,000-5,000.\n\n## Step 2: Set Up Facebook Business Manager\n\nIf you do not already have a Facebook Business Manager account:\n\n1. Go to business.facebook.com and create an account using your business email (not personal)\n2. Add your business name, address (match your trade license exactly), and website\n3. Upload your trade license and NID of the business owner for verification\n4. Wait 1-3 business days for Meta to verify (faster if your documents are clean)\n\nVerification failures usually come from mismatched addresses (NID says Banani but trade license says Gulshan) or low-quality document scans. Submit 300 DPI color scans to avoid rejections.\n\n## Step 3: Choose Your BSP (Business Solution Provider)\n\nYou cannot access the WhatsApp Business API directly — you need a BSP, which is a Meta-approved middleman that handles the technical connection. Popular BSPs that work in Bangladesh:\n\n- **360dialog**: Most popular in Bangladesh, pricing starts at roughly ৳3,500/month plus Meta per-message fees\n- **Twilio**: Global player, charges roughly ৳2,000/month plus usage\n- **Wati**: Built for e-commerce, roughly ৳4,000/month plus usage\n- **Interakt**: India-focused but works in BD, roughly ৳3,000/month plus usage\n- **GoHighLevel**: All-in-one CRM plus WhatsApp, roughly ৳15,000/month but includes lead gen tools\n\nFor most Bangladeshi SMEs, we recommend starting with 360dialog or Wati — they are affordable, English/Bangla-supported, and have direct Shopify integration.\n\n## Step 4: Get Your Number Approved\n\nWhatsApp requires a dedicated phone number for Business API. Important rules:\n\n- The number must NOT be currently active on any WhatsApp account (personal or business)\n- The number must be able to receive an SMS or voice call for verification\n- Bangladeshi numbers (+880) work fine, but the verification SMS can be slow — use a Robi or Banglalink number for faster delivery\n- If your existing business number is on WhatsApp, you will need to migrate it (BSPs handle this) or get a new number\n\n## Step 5: Apply for Message Templates\n\nUnlike the free WhatsApp app where you can message anyone anything, the API has strict rules:\n\n- **Session messages**: Free, unlimited, but only within 24 hours of the customer last message to you\n- **Template messages**: Pre-approved message templates, can be sent anytime, but cost per message and require Meta approval\n\nFor e-commerce, you will need templates for:\n\n- Order confirmation\n- Order shipped\n- Order delivered\n- Abandoned cart reminder (this is your money-maker)\n- Promotional blast (requires opt-in)\n\nTemplate approval takes 2-48 hours. Rejection usually comes from missing variables, too promotional language, or forbidden phrases like "click here to win."\n\n## Step 6: Understand the Costs\n\nWhatsApp Business API pricing in Bangladesh has two layers.\n\nBSP subscription: ৳2,000-4,000 per month flat fee.\n\nMeta conversation charges (per 24-hour conversation window):\n\n- Marketing conversations: roughly ৳0.85 per conversation\n- Utility conversations (order updates): roughly ৳0.35 per conversation\n- Authentication conversations (OTP): roughly ৳0.20 per conversation\n- Service conversations (customer-initiated): roughly ৳0.12 per conversation\n\nFirst 1,000 service conversations per month are free. So a typical e-commerce store doing 2,000 monthly WhatsApp interactions pays roughly ৳3,500 (BSP) plus ৳1,500 (Meta fees) = ৳5,000 per month total.\n\n## Step 7: Set Up Your First Automation Flow\n\nThe single most profitable WhatsApp automation for e-commerce is abandoned cart recovery. Here is how to set it up:\n\n1. Install the BSP Shopify or WooCommerce plugin\n2. Map the cart abandoned event to trigger after 1 hour of inactivity\n3. Send template message: "Hi {{name}}, you left {{product}} in your cart. Complete your order in the next 24 hours and get free delivery in Dhaka!"\n4. If no response in 6 hours, send follow-up with a 5% discount code\n5. If still no response, add to cold leads segment for future campaigns\n\nOur data across 30+ Bangladeshi e-commerce stores shows this single flow recovers 12-18% of abandoned carts — that is pure recovered revenue.\n\n## Legal Compliance in Bangladesh\n\nThe Bangladesh Telecommunication Regulatory Commission (BTRC) has not issued specific WhatsApp marketing regulations, but Meta own rules apply:\n\n- Only message customers who explicitly opted in (placed an order, filled a form, or messaged you first)\n- Always include an unsubscribe option in promotional blasts\n- Honor opt-out requests within 24 hours\n- Never share customer data with third parties\n- Do not send more than 3 promotional messages per week per customer\n\nViolating these can get your number permanently banned, losing your entire subscriber list.\n\n## Common Mistakes to Avoid\n\nThe biggest mistake Bangladeshi e-commerce stores make is treating WhatsApp like another Facebook — blasting generic promotions to everyone. This leads to high block rates and number bans within weeks.\n\nInstead, segment your audience: VIP customers (3+ orders), recent buyers, abandoned carts, browse-but-no-buy, and inactive subscribers. Send different messages to each segment. Personalization increases conversion by 3-5x and protects your number reputation.\n\n## Getting Started\n\nIf this feels overwhelming, it does not have to be. Most Bangladeshi e-commerce stores can be fully set up on WhatsApp Business API within 2 weeks, with the first cart recovery flow live in week 3. Book a free strategy call and we will map out exactly what your store needs — including BDT cost projections and ROI estimates specific to your order volume.',
  },
  {
    slug: 'ai-voice-agent-healthcare',
    title: 'Why Hospitals in Bangladesh Are Switching to AI Voice Agents',
    excerpt:
      'Case study-driven look at how AI voice agents reduce no-shows, handle 24/7 appointment booking and improve patient satisfaction.',
    category: 'AI Voice',
    readTime: '6 min read',
    date: 'Dec 28, 2024',
    content: '## The Front Desk Crisis in Bangladeshi Healthcare\n\nVisit any mid-sized clinic in Dhaka between 9 AM and 1 PM and you will see the same scene: one receptionist juggling three phone calls, a queue of 15 patients at the counter, and a phone ringing every 45 seconds that nobody answers. The Bangladesh Private Medical Practitioners Association estimates that the average Bangladeshi clinic misses 30-40% of inbound calls during peak hours — each one a potential appointment that goes to a competitor.\n\nThe problem is not lazy staff. It is structural. A typical clinic receives 80-200 calls per day for appointment booking, rescheduling, test results, doctor availability, and general inquiries. One receptionist can comfortably handle 60-80 calls in an 8-hour shift. The math simply does not work — and adding more humans is expensive, hard to hire for, and creates training overhead.\n\nAI voice agents solve this. They handle unlimited simultaneous calls, never get tired, never take lunch breaks, and can speak both Bangla and English fluently. This article breaks down exactly how they work, what they cost, and the real results Bangladeshi hospitals are seeing.\n\n## What an AI Voice Agent Actually Is\n\nAn AI voice agent is a software system that:\n\n1. Answers inbound phone calls with a natural-sounding Bangla or English voice\n2. Understands spoken Bangla, including regional accents — Chittagongian, Sylheti, Noakhali\n3. Holds a real-time conversation to book appointments, answer FAQs, or triage symptoms\n4. Connects to your hospital management software (HMS) to check doctor availability\n5. Sends confirmation SMS or WhatsApp to the patient\n6. Hands off to a human receptionist for complex cases\n\nThe technology stack combines three layers: speech-to-text (transcribes what the caller says), a large language model (decides what to respond), and text-to-speech (synthesizes the response in a natural Bangla voice). Modern systems achieve 200-400ms response times — fast enough to feel like a real conversation.\n\n## Real Results: Three Bangladesh Case Studies\n\n### Case 1: 250-bed private hospital in Dhanmondi, Dhaka\n\n- Calls per day: 180 (before) to 0 missed calls (after)\n- Appointment no-show rate: 32% down to 19% (AI sends 3 reminders via call plus WhatsApp)\n- Front desk cost: ৳85,000 per month (3 staff) down to ৳45,000 per month (1 staff plus AI)\n- Patient satisfaction score: 6.4 out of 10 up to 8.7 out of 10\n\n### Case 2: Diagnostic center in Chittagong\n\n- Test booking calls: 95 per day, fully automated\n- Average call duration: 1.2 minutes (vs 3.5 minutes with human)\n- Cost per booking: ৳38 (human) down to ৳4 (AI)\n- 18% increase in test bookings due to 24/7 availability\n\n### Case 3: Multi-branch dental clinic in Dhaka\n\n- 4 branches sharing one AI voice agent\n- Inbound calls handled 24/7 including Eid holidays\n- 47% reduction in appointment rescheduling calls (AI handles them)\n- ROI: 11x in the first 6 months\n\n## How It Works: The Patient Experience\n\nLet us walk through what a typical call looks like.\n\nPatient calls: "Hello, is this Popular Diagnostic?"\n\nAI agent: "Yes sir, this is Popular Diagnostic automated assistant. How can I help you today? I can book an appointment, tell you about doctor availability, or answer general questions."\n\nPatient: "I want to see a cardiologist tomorrow."\n\nAI agent: "Sure. We have Dr. Rahman available tomorrow at 10 AM, 12 PM, and 4 PM. Which time works for you?"\n\nPatient: "10 AM is good."\n\nAI agent: "Perfect. Can I get your name and phone number please?"\n\nPatient: "Karim Ahmed, 01711-123456"\n\nAI agent: "Thank you, Mr. Karim. Your appointment with Dr. Rahman is confirmed for tomorrow at 10 AM at our Dhanmondi branch. I have sent a confirmation SMS to your number. You will also get a reminder call tomorrow morning. Is there anything else?"\n\nTotal call time: 47 seconds. Zero human involvement. The appointment lands in the HMS instantly.\n\n## Beyond Appointment Booking: Other Use Cases\n\nAI voice agents in healthcare are not limited to booking. They handle:\n\n### Test Result Delivery\n\nInstead of patients calling repeatedly to ask "is my report ready?", the AI proactively calls them when results are uploaded: "Hello, your blood test report is ready. Would you like to collect it at our branch or receive it via email?"\n\n### Medication Reminders\n\nFor chronic disease patients (diabetes, hypertension), the AI calls daily at a set time: "Hello, this is a reminder to take your Metformin. Press 1 to confirm or 2 to talk to a pharmacist."\n\n### Post-Visit Follow-up\n\n24 hours after a consultation, the AI calls: "How are you feeling after yesterday visit? On a scale of 1-5, how would you rate your experience with Dr. Rahman?"\n\n### Vaccine Reminders\n\nFor pediatric clinics, automated reminders for the next vaccine dose — particularly valuable for rural clinics where parents often miss schedules.\n\n## The Cost Breakdown\n\nFor a mid-sized Bangladeshi clinic, here is the typical monthly cost:\n\n- AI voice agent subscription: ৳12,000-25,000 per month (depends on call volume)\n- Phone line (VoIP): ৳2,000-4,000 per month\n- Setup and integration: ৳45,000-80,000 one-time\n- Ongoing optimization: ৳5,000 per month\n\nCompare this to hiring one full-time receptionist at ৳18,000-25,000 per month — and the AI works 24/7, handles 50+ simultaneous calls, and never takes leave.\n\nA clinic receiving 100+ calls per day typically breaks even in 30-45 days and saves ৳30,000-60,000 per month thereafter.\n\n## Addressing Common Concerns\n\n**Will patients feel weird talking to a robot?** Our data says no — when the AI is good. Modern Bangla TTS voices sound nearly indistinguishable from humans, and most patients do not even realize they are talking to AI. The key is immediate disclosure ("this is Popular Diagnostic automated assistant") which sets expectations and actually increases trust.\n\n**What about emergency calls?** The AI is trained to detect emergency keywords (chest pain, heavy bleeding, unconscious, etc.) and instantly route those calls to a human nurse or doctor. Emergencies never wait in a queue.\n\n**Can it understand regional Bangla accents?** Yes, after training. Sylheti, Chittagongian, and Noakhali accents need 2-4 weeks of additional training data to reach 95%+ accuracy. Standard Dhaka Bangla works at 97%+ from day one.\n\n**Is patient data secure?** Reputable AI voice platforms are HIPAA-compliant (US health privacy standard) and ISO 27001 certified. All data is encrypted in transit and at rest. Bangladeshi clinics should also follow the Digital Security Act 2018 guidelines for patient data handling.\n\n## Implementation Timeline\n\nA typical deployment takes 4-6 weeks:\n\n- Week 1: Discovery call, audit current phone workflows, define call flows\n- Week 2: Script writing, AI training on clinic-specific FAQs, doctor schedules\n- Week 3: Integration with HMS, phone number porting\n- Week 4: Soft launch — AI handles 20% of calls, humans review transcripts\n- Week 5: Full launch, monitoring, optimization\n- Week 6: Handover to clinic staff for ongoing tweaks\n\n## The Future of Healthcare Voice AI in Bangladesh\n\nWe are still early. By 2027, we expect 60% or more of Bangladeshi private clinics and hospitals to use some form of AI voice automation for routine calls. The clinics that adopt now will have a 2-3 year head start on patient experience, cost efficiency, and data collection.\n\nThe question is not whether AI voice agents will become standard in Bangladeshi healthcare — it is whether your clinic will be an early adopter or a late follower.\n\n## Get Started\n\nIf you run a clinic, hospital, or diagnostic center in Bangladesh and want to see exactly what AI voice automation would look like in your operation, book a free strategy call. We will audit your current call flow, calculate the ROI specific to your patient volume, and design a custom implementation plan.',
  },
  {
    slug: 'crm-automation-playbook',
    title: 'The CRM Automation Playbook: Never Drop a Lead Again',
    excerpt:
      'A step-by-step framework to automate your CRM so every lead is nurtured, tagged and followed up — automatically.',
    category: 'Automation',
    readTime: '8 min read',
    date: 'Dec 20, 2024',
    content: '## The Real Estate Lead Problem in Bangladesh\n\nThe Bangladeshi real estate market is one of the most lead-intensive industries in the country. A single Dhaka-based developer might generate 800-2,000 leads per month from Facebook ads, website forms, WhatsApp inquiries, property portals like Bproperty, and walk-in site visits. Of those, the industry average conversion to actual site visit is 8-12%, and conversion to closed sale is 0.8-1.5%.\n\nThat means 98% or more of every lead you pay for never buys. The problem is not that the leads are bad — it is that the follow-up process is broken.\n\nA 2024 survey by REHAB (Real Estate and Housing Association of Bangladesh) found that the average salesperson follows up with a lead only 1.8 times before giving up. Industry research globally shows that 80% of sales require 5-12 follow-ups. The gap between 1.8 and 5-12 is where billions of taka in real estate sales evaporate every year.\n\nCRM automation closes this gap. This playbook walks through the framework we use to help Bangladeshi real estate developers 3-4x their qualified site visits — without hiring more salespeople.\n\n## Choosing the Right CRM for Bangladeshi Real Estate\n\nBefore automating anything, you need the right CRM. For Bangladeshi real estate, the four realistic options are:\n\n### GoHighLevel (Recommended)\n\nBest all-in-one option. Includes CRM, automation, SMS, email, WhatsApp integration, landing pages, and pipeline management. Pricing: roughly ৳15,000-25,000 per month. Works perfectly for real estate teams of 2-50.\n\n### HubSpot\n\nStrong CRM, expensive at scale. Free tier is too limited; professional tier starts at roughly ৳35,000 per month. Better for large developers (100+ salespeople).\n\n### Zoho CRM\n\nAffordable (roughly ৳3,000-8,000 per month), good feature set, but Bangla support is weak. Suitable for tech-savvy smaller teams.\n\n### Custom Build (Next.js + Prisma)\n\nFor developers with unique workflows, a custom CRM costs ৳3-8 lakh upfront but has zero monthly fees and full customization. We build these for clients with specific needs.\n\nFor 80% of Bangladeshi real estate businesses, GoHighLevel is the right answer. This playbook assumes GoHighLevel, but the principles apply to any CRM.\n\n## The 7-Stage Automation Framework\n\n### Stage 1: Lead Capture and Centralization\n\nEvery lead — from Facebook Lead Ads, your website contact form, WhatsApp Business, Bproperty inquiries, and walk-in registrations — must flow into one CRM automatically. No manual data entry.\n\nTechnical setup:\n\n- Facebook Lead Ads to webhook to GoHighLevel (instant, under 5 seconds)\n- Website form to GoHighLevel API (instant)\n- WhatsApp Business API to GoHighLevel integration (real-time)\n- Bproperty inquiries to daily CSV import via Zapier or manual upload (1x per day)\n- Walk-in registrations to tablet form at the sales gallery that pushes to GoHighLevel\n\nOnce captured, every lead gets tagged by source: FB-Ad, Website, WhatsApp, Bproperty, Walk-in. This lets you track ROI per channel — critical for budget optimization.\n\n### Stage 2: Instant Auto-Response\n\nThe moment a lead submits a form, they get an instant WhatsApp plus SMS message: "Thank you for your interest in [Project Name], Mr. Karim. Our sales advisor Taj will call you within 30 minutes. In the meantime, would you like to see our brochure?" with a link to a digital PDF.\n\nThis 5-second response reduces lead drop-off by 70% compared to waiting 30 minutes for a human callback. The auto-response is sent 24/7, so leads captured at 2 AM on a Friday still get immediate acknowledgment.\n\n### Stage 3: Lead Qualification Workflow\n\nNot all leads are equal. Within 2 hours of capture, an AI chatbot sends a WhatsApp message asking 4 qualification questions:\n\n1. Are you looking for an apartment or commercial space?\n2. What is your preferred size range? (button options: 1000-1500 sqft, 1500-2000 sqft, 2000+ sqft)\n3. When are you planning to purchase? (button options: 0-3 months, 3-6 months, 6-12 months, just researching)\n4. Is this for residence or investment?\n\nBased on answers, the lead gets scored:\n\n- A-Lead (Hot): Specific size, 0-3 month timeline, residence plus investment — salesperson calls within 1 hour\n- B-Lead (Warm): Specific size, 3-6 months — salesperson calls within 24 hours\n- C-Lead (Cool): Just researching, vague size — enters nurture sequence\n- D-Lead (Cold): No response after 3 attempts — archive, revive in 90 days\n\n### Stage 4: Automated Nurture Sequences\n\nC-Leads and D-Leads do not just sit. They enter an automated 14-day nurture sequence:\n\n- Day 1: Welcome message plus digital brochure\n- Day 3: Floor plan plus price sheet\n- Day 5: Video walkthrough of the project\n- Day 7: Customer testimonial (matched to their stated use case — residence or investment)\n- Day 10: Limited-time offer (waived registration fee, free parking spot, etc.)\n- Day 14: Direct WhatsApp from a named salesperson offering a site visit\n\nEach message is personalized with their name, referenced project, and qualification answers. If they engage (click a link, reply, watch the video), they are automatically re-scored and routed to a salesperson.\n\n### Stage 5: Site Visit Booking Automation\n\nWhen a lead agrees to a site visit, they do not wait for a salesperson to call back. Instead:\n\n- AI bot offers 3 available time slots via WhatsApp buttons\n- Lead taps preferred slot — calendar invite sent to both lead and salesperson\n- 24 hours before: SMS plus WhatsApp reminder with directions and parking info\n- 1 hour before: SMS reminder\n- 30 minutes after the visit: automated feedback survey\n\nThis reduces no-shows by 40-55% — a massive cost saver when each site visit costs ৳1,500-3,000 in salesperson time, refreshments, and admin overhead.\n\n### Stage 6: Pipeline Management and Salesperson Accountability\n\nEvery lead moves through pipeline stages: New to Contacted to Qualified to Site Visit Scheduled to Site Visit Completed to Negotiation to Booked to Closed.\n\nAutomations trigger at each stage:\n\n- Site Visit Scheduled: Sales manager gets Slack notification\n- Site Visit Completed but no follow-up in 48 hours: automatic reminder to salesperson\n- Negotiation stage longer than 14 days: escalates to sales manager\n- Closed deal: triggers handover to customer success team plus revenue logged\n\nSales managers see a live dashboard: pipeline value, conversion rate per salesperson, average days in each stage, stalled deals. No more guessing which salesperson is performing.\n\n### Stage 7: Reactivation Campaigns\n\nEvery lead that did not convert goes into a quarterly reactivation campaign:\n\n- Quarter 1: Project update — new tower launched\n- Quarter 2: Price revision notice — lock in current rate\n- Quarter 3: New payment plan — 1% down payment option\n- Quarter 4: Year-end offer — free home appliance package\n\nReactivation campaigns typically recover 3-7% of dead leads at a fraction of the original acquisition cost. For a developer spending ৳8 lakh per month on Facebook ads, this is ৳3-5 lakh per month in recovered pipeline.\n\n## The Real Estate-Specific Nuances\n\nReal estate CRM automation is not just generic CRM automation. There are 3 things unique to the Bangladeshi market:\n\n**Long sales cycles**: Real estate purchases take 3-18 months. Your nurture sequences must run for that duration without annoying the lead — 1-2 touches per month max, always valuable content.\n\n**Family decision-making**: Most Bangladeshi property purchases involve 3-5 family members. Your CRM should capture all decision-makers (spouse, parents, in-laws) and allow group communications.\n\n**NRB leads**: Non-Resident Bangladeshis are 25-40% of serious buyers for premium Dhaka projects. Your CRM must handle international phone numbers, different time zones for calls, and WhatsApp as primary channel.\n\n## Common Implementation Mistakes\n\n**Mistake 1: Over-automating.** Some leads want human contact from the first interaction. Your automation should always offer an "I want to talk to a person" option — and that handoff must be instant (under 5 minutes), not "we will call you back."\n\n**Mistake 2: Generic messaging.** "Dear Valued Customer" kills conversions. Every automated message must reference the lead name, the specific project they inquired about, and their stated preferences.\n\n## The ROI Math\n\nSay your real estate business currently generates 1,000 leads per month at ৳400 per lead (৳4 lakh ad spend), converts 1% to closed sales (10 sales), at an average sale value of ৳1.2 crore — that is ৳12 crore in monthly revenue.\n\nAfter CRM automation, with the same 1,000 leads and same ad spend, the qualification rate improves to 4%, site visit conversion rises from 8% to 24%, and closed-sale conversion from site visits improves from 30% to 45%. Add 3% recovery from reactivation campaigns and you land at roughly 6-7 closed sales per month — a 2.5-4x revenue growth from the same ad spend.\n\nMonthly revenue jumps from ৳12 crore to ৳30-48 crore, without spending a single additional taka on Facebook ads. The CRM automation cost of ৳25,000-50,000 per month delivers 100x+ ROI when measured against incremental closed sales.\n\n## Getting Started\n\nIf you are a Bangladeshi real estate developer, broker, or agency and want to implement this framework, the fastest path is a strategy call. We will audit your current lead flow (Facebook ads, website, WhatsApp, Bproperty), identify the 3 biggest leaks, and design a custom CRM automation roadmap with specific BDT cost and ROI projections for your project portfolio.\n\nBook your free strategy call today — and stop dropping leads tomorrow.',
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
