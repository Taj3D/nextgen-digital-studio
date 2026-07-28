/**
 * AI Voice Agent — Enterprise Landing Page Data
 * ---------------------------------------------
 * Bilingual (EN/BN) content for the dedicated /services/ai-voice-agent
 * landing page. Built to mirror the whatsapp-automation precedent, with the
 * accent colour shifted from emerald (WhatsApp) to blue/indigo (Voice).
 *
 * Main promise: "Replace missed phone calls with an AI Voice Agent that
 * answers, qualifies, books appointments, updates CRM and follows up
 * 24/7 in Bangla & English."
 *
 * This file is imported ONLY by ai-voice-agent-client.tsx and page.tsx.
 * It does NOT affect the other 11 services (they use the generic
 * LandingClient or their own dedicated page).
 *
 * Sales psychology: Hormozi Value Equation + StoryBrand + Brian Tracy +
 * Eugene Schwartz awareness levels. Every paragraph answers:
 *   - Why does this matter?
 *   - Why trust us?
 *   - What if I do nothing?
 *   - Why buy now?
 */

export type Bilingual = { en: string; bn: string }

/* ========================================================================== */
/*  1. HERO SECTION                                                            */
/* ========================================================================== */

export const HERO = {
  eyebrow: {
    en: 'Enterprise AI Voice Agent · Bangla + English · 24/7',
    bn: 'এন্টারপ্রাইজ AI Voice Agent · বাংলা + ইংরেজি · ২৪/৭',
  } as Bilingual,
  titleA: {
    en: 'AI Voice Agent',
    bn: 'AI Voice Agent',
  } as Bilingual,
  titleB: {
    en: 'That Never Misses a Call',
    bn: 'যে কখনো কল মিস করে না',
  } as Bilingual,
  subtitle: {
    en: 'Replace missed phone calls with an AI Voice Agent that answers, qualifies, books appointments, updates CRM and follows up — 24/7 in Bangla & English. 90% fewer missed calls. 3x more appointments. Human-sounding voice.',
    bn: 'মিসড ফোন কল বন্ধ করুন — AI Voice Agent কল রিসিভ করে, কোয়ালিফাই করে, অ্যাপয়েন্টমেন্ট বুক করে, CRM আপডেট করে ও ফলো-আপ করে — ২৪/৭, বাংলা ও ইংরেজিতে। ৯০% কম মিসড কল, ৩x বেশি অ্যাপয়েন্টমেন্ট, মানুষের মতো ভয়েস।',
  } as Bilingual,
  roiBadge: {
    en: 'Missed calls down 90% · Appointments up 3x · 24/7',
    bn: 'মিসড কল ৯০% কম · অ্যাপয়েন্টমেন্ট ৩x বেশি · ২৪/৭',
  } as Bilingual,
  roiSub: {
    en: '4-second pickup · 99% CRM sync · 4.9★ satisfaction',
    bn: '৪-সেকেন্ড পিকআপ · ৯৯% CRM সিঙ্ক · ৪.৯★ সন্তুষ্টি',
  } as Bilingual,
  primaryCta: {
    en: 'Book a Free Strategy Call',
    bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
  secondaryCta: {
    en: 'Hear Live Demo',
    bn: 'লাইভ ডেমো শুনুন',
  } as Bilingual,
  trustBadges: [
    { en: '3–5 day setup', bn: '৩–৫ দিনে সেটআপ' },
    { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '24/7 support', bn: '২৪/৭ সাপোর্ট' },
    { en: 'Bangla + English', bn: 'বাংলা + ইংরেজি' },
  ] as Bilingual[],
  trustRow: [
    { en: 'OpenAI Powered', bn: 'OpenAI পাওয়ার্ড' },
    { en: 'ElevenLabs Voice', bn: 'ElevenLabs ভয়েস' },
    { en: 'Twilio + Vapi', bn: 'Twilio + Vapi' },
    { en: 'CRM Native Sync', bn: 'CRM নেটিভ সিঙ্ক' },
    { en: 'GDPR + SOC2', bn: 'GDPR + SOC2' },
  ] as Bilingual[],
}

/* ========================================================================== */
/*  2. HERO METRICS                                                            */
/* ========================================================================== */

export const HERO_METRICS = {
  eyebrow: { en: 'Real numbers, real calls', bn: 'বাস্তব সংখ্যা, বাস্তব কল' } as Bilingual,
  title: {
    en: 'Trusted by 50+ businesses across Bangladesh',
    bn: 'বাংলাদেশের ৫০+ ব্যবসা আমাদের উপর নির্ভর করে',
  } as Bilingual,
  stats: [
    { value: '97%', label: { en: 'Call answer rate', bn: 'কল অ্যান্সার রেট' } },
    { value: '4s', label: { en: 'Average pickup time', bn: 'গড় পিকআপ টাইম' } },
    { value: '90%', label: { en: 'Fewer missed calls', bn: 'কম মিসড কল' } },
    { value: '3x', label: { en: 'More appointments booked', bn: 'বেশি অ্যাপয়েন্টমেন্ট বুকিং' } },
    { value: '99%', label: { en: 'CRM sync success', bn: 'CRM সিঙ্ক সাফল্য' } },
    { value: '4.9★', label: { en: 'Customer satisfaction', bn: 'গ্রাহক সন্তুষ্টি' } },
    { value: '50+', label: { en: 'Active businesses', bn: 'সক্রিয় ব্যবসা' } },
    { value: '24/7', label: { en: 'Always-on coverage', bn: 'সর্বদা কভারেজ' } },
  ],
}

/* ========================================================================== */
/*  2b. TRUSTED BY (press / partner logos strip)                               */
/* ========================================================================== */

export const TRUSTED_BY = {
  eyebrow: { en: 'Built on enterprise-grade infrastructure', bn: 'এন্টারপ্রাইজ-গ্রেড ইনফ্রাস্ট্রাকচারে নির্মিত' } as Bilingual,
  logos: [
    { name: 'OpenAI', note: { en: 'GPT-4o reasoning engine', bn: 'GPT-4o রিজনিং ইঞ্জিন' } },
    { name: 'ElevenLabs', note: { en: 'Natural voice synthesis', bn: 'ন্যাচারাল ভয়েস সিন্থেসিস' } },
    { name: 'Twilio', note: { en: 'Carrier-grade telephony', bn: 'ক্যারিয়ার-গ্রেড টেলিফোনি' } },
    { name: 'Vapi', note: { en: 'Real-time voice orchestration', bn: 'রিয়েল-টাইম ভয়েস অর্কেস্ট্রেশন' } },
    { name: 'Retell AI', note: { en: 'Sub-300ms latency', bn: '৩০০মিলি-এর কম লেটেন্সি' } },
    { name: 'HubSpot', note: { en: 'CRM native sync', bn: 'CRM নেটিভ সিঙ্ক' } },
    { name: 'AWS', note: { en: 'Cloud infrastructure', bn: 'ক্লাউড ইনফ্রাস্ট্রাকচার' } },
    { name: 'Cloudflare', note: { en: 'DDoS protection + edge', bn: 'DDoS প্রোটেকশন + এজ' } },
  ],
}

export const URGENCY = {
  badge: { en: 'Limited onboarding slots', bn: 'সীমিত অনবোর্ডিং স্লট' } as Bilingual,
  text: {
    en: 'Only 3 voice agent build slots left this month. Each missed call is a lost customer — secure your slot now.',
    bn: 'এই মাসে মাত্র ৩টি ভয়েস এজেন্ট বিল্ড স্লট বাকি। প্রতিটি মিসড কল একটি হারানো গ্রাহক — আজই স্লট নিশ্চিত করুন।',
  } as Bilingual,
  slotsLabel: { en: 'slots remaining', bn: 'স্লট বাকি' } as Bilingual,
  cta: { en: 'Claim a slot', bn: 'স্লট ক্লেইম করুন' } as Bilingual,
}

/* ========================================================================== */
/*  4. STICKY CTA (mobile)                                                     */
/* ========================================================================== */

export const STICKY_CTA = {
  price: { en: 'from ৳35,000/mo', bn: '৳৩৫,০০০/মাস থেকে' } as Bilingual,
  roi: { en: '90% fewer missed calls', bn: '৯০% কম মিসড কল' } as Bilingual,
  cta: { en: 'Book a Call', bn: 'কল বুক করুন' } as Bilingual,
}

/* ========================================================================== */
/*  5. EXIT POPUP                                                              */
/* ========================================================================== */

export const EXIT_POPUP = {
  title: {
    en: 'Wait — how many calls are you missing?',
    bn: 'থামুন — আপনি কতগুলো কল মিস করছেন?',
  } as Bilingual,
  desc: {
    en: 'Get our free "AI Voice Agent Potential Audit" — see exactly how many calls you lose each month and what they cost you. ৳5,000 value, yours free.',
    bn: 'আমাদের ফ্রি "AI Voice Agent সম্ভাবনা অডিট" পান — প্রতি মাসে কতগুলো কল হারাচ্ছেন ও তার খরচ দেখুন। ৳৫,০০০ মূল্যের, আপনার জন্য ফ্রি।',
  } as Bilingual,
  emailLabel: { en: 'Your email', bn: 'আপনার ইমেইল' } as Bilingual,
  emailPlaceholder: { en: 'you@company.com', bn: 'you@company.com' } as Bilingual,
  cta: {
    en: 'Send My Free Audit',
    bn: 'ফ্রি অডিট পাঠান',
  } as Bilingual,
  privacy: {
    en: 'No spam. Unsubscribe anytime. We respect your inbox.',
    bn: 'কোনো স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব করুন। আমরা আপনার ইনবক্সকে সম্মান করি।',
  } as Bilingual,
  success: {
    en: 'Check your inbox! Your audit is on its way.',
    bn: 'ইনবক্স চেক করুন! অডিট পথে আছে।',
  } as Bilingual,
}

/* ========================================================================== */
/*  6. PROBLEM                                                                 */
/* ========================================================================== */

export const PROBLEM = {
  eyebrow: { en: 'Are you suffering from these?', bn: 'আপনি কি এই সমস্যাগুলোতে ভুগছেন?' } as Bilingual,
  title: {
    en: 'Why your business keeps losing phone calls',
    bn: 'কেন আপনার ব্যবসা প্রতিদিন ফোন কল হারাচ্ছে',
  } as Bilingual,
  subtitle: {
    en: 'Every missed call is a customer walking into a competitor\'s door. Here is what is really happening.',
    bn: 'প্রতিটি মিসড কল মানে একজন গ্রাহক প্রতিযোগীর দরজায় কড়া নাড়ছেন। আসলে কী হচ্ছে তা এখানে।',
  } as Bilingual,
  pains: [
    {
      title: { en: 'Missed phone calls', bn: 'মিসড ফোন কল' },
      desc: {
        en: '60% of business calls go unanswered — outside hours, during peak times, or when staff are busy. Each one = lost revenue.',
        bn: '৬০% ব্যবসায়িক কল আনঅ্যান্সার্ড থাকে — অফিস আওয়ারের বাইরে, পিক আওয়ারে বা স্টাফ ব্যস্ত থাকলে। প্রতিটি = হারানো রেভিনিউ।',
      },
    },
    {
      title: { en: 'No after-hours support', bn: 'অফিস-আওয়ারের বাইরে কোনো সাপোর্ট নেই' },
      desc: {
        en: 'After 8 PM, on weekends, on holidays — nobody answers. Customers call once, get voicemail, and never call back.',
        bn: 'রাত ৮টার পর, সপ্তাহান্তে, ছুটির দিনে — কেউ রিসিভ করে না। গ্রাহক একবার কল করে ভয়েসমেইল পেয়ে আর ফিরে আসে না।',
      },
    },
    {
      title: { en: 'Slow response time', bn: 'ধীর রেসপন্স টাইম' },
      desc: {
        en: 'Average response time is 24–48 hours. By then, the customer has already booked with a competitor.',
        bn: 'গড় রেসপন্স টাইম ২৪–৪৮ ঘন্টা। ততক্ষণে গ্রাহক প্রতিযোগীর কাছে বুকিং করে ফেলেছেন।',
      },
    },
    {
      title: { en: 'No CRM logging', bn: 'কোনো CRM লগিং নেই' },
      desc: {
        en: 'Call details live in someone\'s notebook or memory. No record in CRM. No follow-up. No data.',
        bn: 'কলের তথ্য কারো ডায়েরি বা স্মৃতিতে থাকে। CRM-এ কোনো রেকর্ড নেই। কোনো ফলো-আপ নেই। কোনো ডেটা নেই।',
      },
    },
    {
      title: { en: 'Manual appointment booking', bn: 'ম্যানুয়াল অ্যাপয়েন্টমেন্ট বুকিং' },
      desc: {
        en: 'Staff spend hours scheduling, rescheduling, sending reminders. Time that should go to selling.',
        bn: 'স্টাফ ঘন্টার পর ঘন্টা সিডিউল করে, রিশিডিউল করে, রিমাইন্ডার পাঠায়। যে সময়টা সেলসে যাওয়া উচিত।',
      },
    },
    {
      title: { en: 'No follow-up', bn: 'কোনো ফলো-আপ নেই' },
      desc: {
        en: 'One call and done. No SMS confirmation, no WhatsApp reminder, no email summary. Customers forget and no-show.',
        bn: 'একবার কল দিয়েই শেষ। কোনো SMS কনফার্মেশন, WhatsApp রিমাইন্ডার বা ইমেইল সামারি নেই। গ্রাহক ভুলে যান ও no-show করেন।',
      },
    },
    {
      title: { en: 'High agent cost', bn: 'উচ্চ এজেন্ট খরচ' },
      desc: {
        en: 'Hiring more call agents to cover 24/7 is impossible. Each agent costs ৳25,000–40,000/month plus training, leave, turnover.',
        bn: '২৪/৭ কভার করতে আরও কল এজেন্ট নিয়োগ অসম্ভব। প্রতি এজেন্ট ৳২৫,০০০–৪০,০০০/মাস ছাড়াও ট্রেনিং, ছুটি, টার্নওভার।',
      },
    },
    {
      title: { en: 'Inconsistent quality', bn: 'অসামঞ্জস্যপূর্ণ কোয়ালিটি' },
      desc: {
        en: 'Tired agents skip questions, miss key info, sound rude. Quality drops every hour of the shift.',
        bn: 'ক্লান্ত এজেন্ট প্রশ্ন স্কিপ করে, মূল তথ্য মিস করে, রাগী শোনায়। শিফটের প্রতি ঘন্টায় কোয়ালিটি পড়ে।',
      },
    },
    {
      title: { en: 'No analytics', bn: 'কোনো অ্যানালিটিক্স নেই' },
      desc: {
        en: 'No idea how many calls came in, how many converted, what customers asked, where the funnel leaks.',
        bn: 'কত কল এসেছে, কত কনভার্ট হয়েছে, গ্রাহক কী জিজ্ঞেস করেছেন, ফানেল কোথায় লিক করছে — কিছুই জানেন না।',
      },
    },
    {
      title: { en: 'Negative reviews', bn: 'নেগেটিভ রিভিউ' },
      desc: {
        en: 'Unanswered calls → frustrated customers → 1-star Google reviews → reputation damage → fewer calls. A death spiral.',
        bn: 'আনঅ্যান্সার্ড কল → ফ্রাস্ট্রেটেড গ্রাহক → ১-স্টার Google রিভিউ → রেপুটেশন ক্ষতি → আরও কম কল। এক ডেথ স্পাইরাল।',
      },
    },
  ],
  costStats: [
    {
      value: '৳5L+',
      desc: {
        en: 'A mid-size business loses this every year from missed phone calls and slow follow-up.',
        bn: 'একটি মাঝারি ব্যবসা প্রতি বছর মিসড কল ও ধীর ফলো-আপের কারণে হারায়।',
      },
    },
    {
      value: '60%',
      desc: {
        en: 'Of business phone calls go unanswered during or outside business hours.',
        bn: 'ব্যবসায়িক ফোন কল অফিস আওয়ারে বা বাইরে আনঅ্যান্সার্ড থাকে।',
      },
    },
    {
      value: '48h',
      desc: {
        en: 'Average lead response time without automation — by which point the customer is gone.',
        bn: 'অটোমেশন ছাড়া গড় লিড রেসপন্স টাইম — যতক্ষণে গ্রাহক চলে যান।',
      },
    },
  ],
  warning: {
    en: 'If you do not act today — the next 12 months will look exactly the same.',
    bn: 'আপনি যদি আজ অ্যাকশন না নেন — আগামী ১২ মাসেও একই অবস্থায় থাকবেন।',
  } as Bilingual,
  cta: {
    en: 'I want to fix this — Free Strategy Call',
    bn: 'আমি এই সমস্যা সমাধান করতে চাই — ফ্রি স্ট্র্যাটেজি কল',
  } as Bilingual,
}

/* ========================================================================== */
/*  7. EMOTIONAL COST                                                          */
/* ========================================================================== */

export const EMOTIONAL_COST = {
  eyebrow: { en: 'The hidden cost', bn: 'ইমোশনাল কস্ট' } as Bilingual,
  title: {
    en: 'The hidden cost of missed phone calls',
    bn: 'মিসড ফোন কলের লুকানো খরচ',
  } as Bilingual,
  subtitle: {
    en: 'It is not just calls — you are losing money, customers, reputation and sleep.',
    bn: 'শুধু কল নয় — টাকা, গ্রাহক, রেপুটেশন ও ঘুম হারাচ্ছেন।',
  } as Bilingual,
  cards: [
    {
      icon: 'money',
      title: { en: 'Revenue lost', bn: 'রেভিনিউ হারানো' },
      desc: {
        en: 'Every missed call = lost sale. Miss 10 calls/day at ৳15,000 average deal = ৳45 lakh/year gone.',
        bn: 'প্রতিটি মিসড কল = হারানো সেল। প্রতিদিন ১০টি কল মিস করলে, ৳১৫,০০০ গড় ডিলে — বছরে ৳৪৫ লাখ ক্ষতি।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Time wasted', bn: 'সময় নষ্ট' },
      desc: {
        en: 'Staff spend 4–6 hours/day on manual call handling, note-taking, scheduling. Hours that should go to selling.',
        bn: 'স্টাফ প্রতিদিন ৪–৬ ঘন্টা ম্যানুয়াল কল হ্যান্ডলিং, নোট নেওয়া, সিডিউলিংয়ে নষ্ট করে। যা সেলসে যাওয়া উচিত।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Customers lost', bn: 'গ্রাহক হারানো' },
      desc: {
        en: '78% of customers switch to a competitor after one unanswered call. They never come back.',
        bn: '৭৮% গ্রাহক একটি আনঅ্যান্সার্ড কলের পর প্রতিযোগীর কাছে চলে যান। তারা আর ফিরে আসেন না।',
      },
    },
    {
      icon: 'star',
      title: { en: 'Reputation damage', bn: 'রেপুটেশন ক্ষতি' },
      desc: {
        en: 'Frustrated customers leave 1-star Google reviews. Each one costs ৳2–5 lakh in future business.',
        bn: 'ফ্রাস্ট্রেটেড গ্রাহক ১-স্টার Google রিভিউ দেন। প্রতিটি ভবিষ্যৎ ব্যবসায় ৳২–৫ লাখ ক্ষতি করে।',
      },
    },
    {
      icon: 'trending-down',
      title: { en: 'Sales leakage', bn: 'সেলস লিকেজ' },
      desc: {
        en: 'Without follow-up, 80% of qualified leads die on the vine. Crores in pipeline gone silently.',
        bn: 'ফলো-আপ না থাকায় ৮০% কোয়ালিফাইড লিড ফোলে যায়। কোটি টাকার পাইপলাইন নীরবে হারায়।',
      },
    },
    {
      icon: 'frown',
      title: { en: 'Team burnout', bn: 'টিম বার্নআউট' },
      desc: {
        en: 'Your team answers the same 20 questions daily. Burnout rises, turnover spikes, morale drops.',
        bn: 'আপনার টিম প্রতিদিন একই ২০টি প্রশ্নের উত্তর দেয়। বার্নআউট বাড়ে, টার্নওভার চাঙ্গা হয়, মোরাল পড়ে।',
      },
    },
  ],
}

/* ========================================================================== */
/*  8. WHY TRADITIONAL CALL HANDLING FAILS                                     */
/* ========================================================================== */

export const WHY_TRADITIONAL_FAILS = {
  eyebrow: { en: 'The old way is broken', bn: 'পুরনো পদ্ধতি ভাঙা' } as Bilingual,
  title: {
    en: 'Why traditional call handling fails your business',
    bn: 'কেন প্রচলিত কল হ্যান্ডলিং আপনার ব্যবসায় ব্যর্থ',
  } as Bilingual,
  subtitle: {
    en: 'Hiring more agents, adding more phone lines, working longer hours — none of it scales. Here is why.',
    bn: 'আরও এজেন্ট নিয়োগ, আরও ফোন লাইন, বেশি সময় কাজ — কোনোটাই স্কেল করে না। কারণ এখানে।',
  } as Bilingual,
  rows: [
    {
      problem: { en: 'Limited hours', bn: 'সীমিত সময়' },
      desc: {
        en: 'Humans work 8 hours. Customers call 24. After-hours calls ring out and die.',
        bn: 'মানুষ ৮ ঘন্টা কাজ করে। গ্রাহক ২৪ ঘন্টায় কল করে। অফিস-আওয়ারের বাইরের কল বেজেই মারা যায়।',
      },
    },
    {
      problem: { en: 'One call at a time', bn: 'একসাথে এক কল' },
      desc: {
        en: 'Each agent handles one call. When 5 customers call simultaneously, 4 wait — or hang up.',
        bn: 'প্রতি এজেন্ট একটি কল হ্যান্ডেল করে। ৫ জন একসাথে কল করলে ৪ জন অপেক্ষা করে — বা রিং কেটে দেয়।',
      },
    },
    {
      problem: { en: 'Inconsistent answers', bn: 'অসামঞ্জস্যপূর্ণ উত্তর' },
      desc: {
        en: 'Different agents say different things. Customers get conflicting info. Brand looks unprofessional.',
        bn: 'বিভিন্ন এজেন্ট বিভিন্ন কথা বলেন। গ্রাহক পরস্পরবিরোধী তথ্য পান। ব্র্যান্ড অপ্রফেশনাল দেখায়।',
      },
    },
    {
      problem: { en: 'No CRM logging', bn: 'কোনো CRM লগিং নেই' },
      desc: {
        en: 'Calls happen, but data never reaches the CRM. No notes, no lead score, no next step.',
        bn: 'কল হয়, কিন্তু ডেটা CRM-এ পৌঁছায় না। কোনো নোট, কোনো লিড স্কোর, কোনো নেক্সট স্টেপ নেই।',
      },
    },
    {
      problem: { en: 'No follow-up automation', bn: 'কোনো ফলো-আপ অটোমেশন নেই' },
      desc: {
        en: 'Staff forget to send SMS, WhatsApp, or email confirmations. No-shows skyrocket.',
        bn: 'স্টাফ SMS, WhatsApp বা ইমেইল কনফার্মেশন পাঠাতে ভুলে যান। No-show আকাশে উঠে।',
      },
    },
    {
      problem: { en: 'High turnover', bn: 'উচ্চ টার্নওভার' },
      desc: {
        en: 'Call agents quit every 6–12 months. You retrain, rehire, restart. The cycle never ends.',
        bn: 'কল এজেন্ট প্রতি ৬–১২ মাসে চাকরি ছাড়েন। আপনি রিট্রেন, রিহায়ার, রিস্টার্ট করেন। চক্র কখনো শেষ হয় না।',
      },
    },
    {
      problem: { en: 'No analytics', bn: 'কোনো অ্যানালিটিক্স নেই' },
      desc: {
        en: 'No call recordings, no transcripts, no sentiment, no conversion data. You fly blind.',
        bn: 'কোনো কল রেকর্ডিং, ট্রান্সক্রিপ্ট, সেন্টিমেন্ট বা কনভার্সন ডেটা নেই। আপনি অন্ধ হয়ে চলেন।',
      },
    },
    {
      problem: { en: 'Scales linearly, costs grow', bn: 'লিনিয়ার স্কেল, খরচ বাড়ে' },
      desc: {
        en: 'Double the calls = double the agents = double the salary + office + training. Profit shrinks.',
        bn: 'কল দ্বিগুণ = এজেন্ট দ্বিগুণ = স্যালারি + অফিস + ট্রেনিং দ্বিগুণ। লাভ কমে।',
      },
    },
  ],
}

/* ========================================================================== */
/*  9. WHY NEXTGEN AI VOICE AGENT                                              */
/* ========================================================================== */

export const WHY_NEXTGEN = {
  eyebrow: { en: 'The NextGen difference', bn: 'NextGen পার্থক্য' } as Bilingual,
  title: {
    en: 'Why NextGen AI Voice Agent wins',
    bn: 'কেন NextGen AI Voice Agent সেরা',
  } as Bilingual,
  subtitle: {
    en: 'Human-sounding voice + Bangla fluency + CRM sync + enterprise security — built to scale infinitely.',
    bn: 'মানুষের মতো ভয়েস + বাংলা দক্ষতা + CRM সিঙ্ক + এন্টারপ্রাইজ সিকিউরিটি — আনলিমিটেড স্কেলের জন্য তৈরি।',
  } as Bilingual,
  cards: [
    {
      icon: 'mic',
      title: { en: 'Human-sounding voice', bn: 'মানুষের মতো ভয়েস' },
      desc: {
        en: 'ElevenLabs + OpenAI voice models. Natural pauses, inflection, emotion. Most callers cannot tell it is AI.',
        bn: 'ElevenLabs + OpenAI ভয়েস মডেল। স্বাভাবিক বিরতি, ইনফ্লেকশন, আবেগ। বেশিরভাগ কলার বুঝতে পারে না এটি AI।',
      },
    },
    {
      icon: 'globe',
      title: { en: 'Bangla + English fluent', bn: 'বাংলা + ইংরেজি দক্ষ' },
      desc: {
        en: 'Native-quality Bangla (not machine-translated). Detects language, switches mid-sentence. Talks like a local.',
        bn: 'নেটিভ-কোয়ালিটি বাংলা (মেশিন-ট্রান্সলেটেড নয়)। ভাষা ডিটেক্ট করে, মাঝে স্যুইচ করে। লোকালের মতো কথা বলে।',
      },
    },
    {
      icon: 'phone-call',
      title: { en: 'Instant pickup (4 seconds)', bn: 'ইনস্ট্যান্ট পিকআপ (৪ সেকেন্ড)' },
      desc: {
        en: 'No ringing, no waiting, no IVR menu. Call connects in 4 seconds, every time, 24/7.',
        bn: 'কোনো রিং, কোনো অপেক্ষা, কোনো IVR মেনু নেই। কল ৪ সেকেন্ডে কানেক্ট হয়, প্রতিবার, ২৪/৭।',
      },
    },
    {
      icon: 'database',
      title: { en: 'CRM + calendar sync', bn: 'CRM + ক্যালেন্ডার সিঙ্ক' },
      desc: {
        en: 'HubSpot, GoHighLevel, Salesforce, Zoho. Books directly into Google/Outlook calendar. 99% sync success.',
        bn: 'HubSpot, GoHighLevel, Salesforce, Zoho। সরাসরি Google/Outlook ক্যালেন্ডারে বুক করে। ৯৯% সিঙ্ক সাফল্য।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Human handoff when needed', bn: 'প্রয়োজনে হিউম্যান হ্যান্ডঅফ' },
      desc: {
        en: 'Complex or sensitive calls transfer instantly to a live agent with full context attached.',
        bn: 'জটিল বা সংবেদনশীল কল সম্পূর্ণ কনটেক্সট সহ তাৎক্ষণিকভাবে লাইভ এজেন্টে ট্রান্সফার হয়।',
      },
    },
    {
      icon: 'shield-check',
      title: { en: 'Enterprise-grade security', bn: 'এন্টারপ্রাইজ-গ্রেড সিকিউরিটি' },
      desc: {
        en: 'GDPR + SOC2 + AES-256 + TLS 1.3. Encrypted recordings, role-based access, full audit logs.',
        bn: 'GDPR + SOC2 + AES-256 + TLS 1.3। এনক্রিপ্টেড রেকর্ডিং, রোল-বেসড অ্যাক্সেস, পূর্ণ অডিট লগ।',
      },
    },
    {
      icon: 'bar-chart',
      title: { en: 'Real-time analytics', bn: 'রিয়েল-টাইম অ্যানালিটিক্স' },
      desc: {
        en: 'Live dashboard: call volume, missed %, booking rate, sentiment, agent performance, revenue per call.',
        bn: 'লাইভ ড্যাশবোর্ড: কল ভলিউম, মিসড %, বুকিং রেট, সেন্টিমেন্ট, এজেন্ট পারফরম্যান্স, প্রতি কলে রেভিনিউ।',
      },
    },
    {
      icon: 'zap',
      title: { en: 'Scales infinitely', bn: 'আনলিমিটেড স্কেল' },
      desc: {
        en: '1 call or 1,000 simultaneous calls — same speed, same quality, same flat cost. No new hires.',
        bn: '১টি কল বা ১,০০০ সিমুলটেনিয়াস কল — একই স্পিড, একই কোয়ালিটি, একই ফ্ল্যাট খরচ। কোনো নতুন নিয়োগ নেই।',
      },
    },
  ],
}

/* ========================================================================== */
/*  10. VOICE AGENT FRAMEWORK (13-step pipeline)                               */
/* ========================================================================== */

export const VOICE_AGENT_FRAMEWORK = {
  eyebrow: { en: 'The complete pipeline', bn: 'সম্পূর্ণ পাইপলাইন' } as Bilingual,
  title: {
    en: 'How a single call becomes fully automated',
    bn: 'একটি কল কীভাবে সম্পূর্ণ অটোমেটেড হয়',
  } as Bilingual,
  subtitle: {
    en: 'From incoming ring to CRM update to follow-up — every step handled by AI, automatically.',
    bn: 'ইনকামিং রিং থেকে CRM আপডেট থেকে ফলো-আপ পর্যন্ত — প্রতিটি ধাপ AI স্বয়ংক্রিয়ভাবে হ্যান্ডেল করে।',
  } as Bilingual,
  steps: [
    {
      icon: 'phone-call',
      label: { en: 'Incoming Call', bn: 'ইনকামিং কল' },
      desc: {
        en: 'Customer dials your business number. AI picks up in 4 seconds — no IVR, no waiting.',
        bn: 'গ্রাহক আপনার ব্যবসার নম্বরে ডায়াল করেন। AI ৪ সেকেন্ডে পিকআপ করে — কোনো IVR বা অপেক্ষা নেই।',
      },
    },
    {
      icon: 'message-circle',
      label: { en: 'Greeting', bn: 'গ্রিটিং' },
      desc: {
        en: 'Personalised greeting with your brand voice. "Assalamu Alaikum, NextGen Studio, how can I help?"',
        bn: 'আপনার ব্র্যান্ড ভয়েসে পার্সোনালাইজড গ্রিটিং। "আসসালামু আলাইকুম, NextGen Studio, কীভাবে সাহায্য করতে পারি?"',
      },
    },
    {
      icon: 'globe',
      label: { en: 'Language Detection', bn: 'ল্যাঙ্গুয়েজ ডিটেকশন' },
      desc: {
        en: 'AI detects Bangla or English from the first sentence. Switches instantly, mid-call if needed.',
        bn: 'AI প্রথম বাক্য থেকে বাংলা বা ইংরেজি ডিটেক্ট করে। তাৎক্ষণিকভাবে স্যুইচ করে, কল মাঝেও।',
      },
    },
    {
      icon: 'target',
      label: { en: 'Intent Detection', bn: 'ইনটেন্ট ডিটেকশন' },
      desc: {
        en: '98% accuracy — is this a sales, support, booking, complaint, or info call? Routed correctly.',
        bn: '৯৮% নির্ভুলতা — এটা কি সেলস, সাপোর্ট, বুকিং, কমপ্লেইন্ট বা ইনফো কল? সঠিকভাবে রাউট হয়।',
      },
    },
    {
      icon: 'book-open',
      label: { en: 'Knowledge Base', bn: 'নলেজ বেস' },
      desc: {
        en: 'AI searches your custom KB — pricing, services, FAQs, policies — and answers like an expert.',
        bn: 'AI আপনার কাস্টম KB সার্চ করে — প্রাইসিং, সার্ভিস, FAQ, পলিসি — এবং এক্সপার্টের মতো উত্তর দেয়।',
      },
    },
    {
      icon: 'brain',
      label: { en: 'AI Response', bn: 'AI রেসপন্স' },
      desc: {
        en: 'GPT-4 + ElevenLabs generate a natural, contextual, on-brand answer in <1 second.',
        bn: 'GPT-4 + ElevenLabs ১ সেকেন্ডের কম সময়ে ন্যাচারাল, কনটেক্সচুয়াল, অন-ব্র্যান্ড উত্তর তৈরি করে।',
      },
    },
    {
      icon: 'calendar-check',
      label: { en: 'Appointment Booking', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
      desc: {
        en: 'AI checks calendar availability, proposes slots, confirms booking, blocks the slot — instant.',
        bn: 'AI ক্যালেন্ডার অ্যাভেইলেবিলিটি চেক করে, স্লট প্রপোজ করে, বুকিং কনফার্ম করে, স্লট ব্লক করে — তাৎক্ষণিক।',
      },
    },
    {
      icon: 'database',
      label: { en: 'CRM Update', bn: 'CRM আপডেট' },
      desc: {
        en: 'Contact created/updated, call notes added, lead score assigned, next step logged — automatically.',
        bn: 'কন্টাক্ট তৈরি/আপডেট, কল নোট যোগ, লিড স্কোর অ্যাসাইন, নেক্সট স্টেপ লগ — স্বয়ংক্রিয়ভাবে।',
      },
    },
    {
      icon: 'message-circle',
      label: { en: 'SMS Confirmation', bn: 'SMS কনফার্মেশন' },
      desc: {
        en: 'Customer gets instant SMS with appointment details, address, what to bring, reschedule link.',
        bn: 'গ্রাহক তাৎক্ষণিক SMS পান — অ্যাপয়েন্টমেন্ট ডিটেইল, ঠিকানা, কী আনবেন, রিশিডিউল লিংক সহ।',
      },
    },
    {
      icon: 'message-circle',
      label: { en: 'WhatsApp Handoff', bn: 'WhatsApp হ্যান্ডঅফ' },
      desc: {
        en: 'Conversation moves to WhatsApp for documents, photos, payment links. Continuous thread.',
        bn: 'ডকুমেন্ট, ছবি, পেমেন্ট লিংকের জন্য কথোপকথন WhatsApp-এ চলে যায়। কন্টিনিউয়াস থ্রেড।',
      },
    },
    {
      icon: 'mail',
      label: { en: 'Email Summary', bn: 'ইমেইল সামারি' },
      desc: {
        en: 'Full call transcript + AI summary + action items emailed to customer and your team.',
        bn: 'সম্পূর্ণ কল ট্রান্সক্রিপ্ট + AI সামারি + অ্যাকশন আইটেম গ্রাহক ও আপনার টিমকে ইমেইল করা হয়।',
      },
    },
    {
      icon: 'bell',
      label: { en: 'Sales Notification', bn: 'সেলস নোটিফিকেশন' },
      desc: {
        en: 'Your sales team gets Slack/WhatsApp push: "Hot lead booked — ৳50K deal, call back in 2 hours."',
        bn: 'আপনার সেলস টিম Slack/WhatsApp পুশ পায়: "হট লিড বুকড — ৳৫০K ডিল, ২ ঘন্টায় কল ব্যাক।"',
      },
    },
    {
      icon: 'bar-chart',
      label: { en: 'Analytics', bn: 'অ্যানালিটিক্স' },
      desc: {
        en: 'Every metric tracked — call duration, sentiment, conversion, revenue. Insights auto-generated.',
        bn: 'প্রতিটি মেট্রিক ট্র্যাকড — কল ডিউরেশন, সেন্টিমেন্ট, কনভার্সন, রেভিনিউ। ইনসাইট অটো-জেনারেটেড।',
      },
    },
  ],
  note: {
    en: 'This entire pipeline fires in under 60 seconds — every call, every time, 24/7.',
    bn: 'এই সম্পূর্ণ পাইপলাইন ৬০ সেকেন্ডের কম সময়ে চলে — প্রতিটি কলে, প্রতিবার, ২৪/৭।',
  } as Bilingual,
}

/* ========================================================================== */
/*  11. HOW IT WORKS (12 visual steps)                                         */
/* ========================================================================== */

export const HOW_IT_WORKS = {
  eyebrow: { en: 'See the journey', bn: 'জার্নি দেখুন' } as Bilingual,
  title: {
    en: 'From ring to revenue — 12 automated steps',
    bn: 'রিং থেকে রেভিনিউ — ১২টি অটোমেটেড ধাপ',
  } as Bilingual,
  subtitle: {
    en: 'Every step handled by AI. Zero manual work. Zero missed customers.',
    bn: 'প্রতিটি ধাপ AI হ্যান্ডেল করে। জিরো ম্যানুয়াল কাজ। জিরো মিসড গ্রাহক।',
  } as Bilingual,
  steps: [
    {
      icon: 'phone-call',
      label: { en: 'Customer Calls', bn: 'গ্রাহক কল করেন' },
      title: { en: 'Customer dials your number', bn: 'গ্রাহক আপনার নম্বরে ডায়াল করেন' },
      desc: { en: 'Anytime, day or night. AI is ready.', bn: 'যেকোনো সময়, দিন বা রাত। AI প্রস্তুত।' },
    },
    {
      icon: 'zap',
      label: { en: 'AI Picks Up', bn: 'AI পিকআপ করে' },
      title: { en: '4-second instant pickup', bn: '৪-সেকেন্ড ইনস্ট্যান্ট পিকআপ' },
      desc: { en: 'No IVR, no waiting, no hang-ups.', bn: 'কোনো IVR, অপেক্ষা বা হ্যাং-আপ নেই।' },
    },
    {
      icon: 'globe',
      label: { en: 'Language Detected', bn: 'ভাষা ডিটেক্ট' },
      title: { en: 'Bangla or English, instantly', bn: 'বাংলা বা ইংরেজি, তাৎক্ষণিক' },
      desc: { en: 'AI switches to match the caller.', bn: 'AI কলারের সাথে মিলিয়ে স্যুইচ করে।' },
    },
    {
      icon: 'target',
      label: { en: 'Intent Understood', bn: 'ইনটেন্ট বোঝা' },
      title: { en: 'AI identifies what they want', bn: 'AI বোঝে তারা কী চান' },
      desc: { en: 'Sales, support, booking, info.', bn: 'সেলস, সাপোর্ট, বুকিং, ইনফো।' },
    },
    {
      icon: 'book-open',
      label: { en: 'KB Searched', bn: 'KB সার্চ' },
      title: { en: 'AI finds the right answer', bn: 'AI সঠিক উত্তর খোঁজে' },
      desc: { en: 'From your custom knowledge base.', bn: 'আপনার কাস্টম নলেজ বেস থেকে।' },
    },
    {
      icon: 'mic',
      label: { en: 'AI Replies', bn: 'AI রিপ্লাই' },
      title: { en: 'Natural voice response', bn: 'ন্যাচারাল ভয়েস রেসপন্স' },
      desc: { en: 'Human-sounding, on-brand, instant.', bn: 'মানুষের মতো, অন-ব্র্যান্ড, তাৎক্ষণিক।' },
    },
    {
      icon: 'calendar-check',
      label: { en: 'Books Appointment', bn: 'অ্যাপয়েন্টমেন্ট বুক' },
      title: { en: 'Slot confirmed in calendar', bn: 'ক্যালেন্ডারে স্লট কনফার্ম' },
      desc: { en: 'Google/Outlook synced live.', bn: 'Google/Outlook লাইভ সিঙ্কড।' },
    },
    {
      icon: 'database',
      label: { en: 'CRM Updated', bn: 'CRM আপডেট' },
      title: { en: 'Contact + notes logged', bn: 'কন্টাক্ট + নোট লগড' },
      desc: { en: 'HubSpot, GHL, Salesforce, Zoho.', bn: 'HubSpot, GHL, Salesforce, Zoho।' },
    },
    {
      icon: 'message-circle',
      label: { en: 'SMS + WhatsApp', bn: 'SMS + WhatsApp' },
      title: { en: 'Customer gets confirmation', bn: 'গ্রাহক কনফার্মেশন পান' },
      desc: { en: 'Instant SMS + WhatsApp message.', bn: 'তাৎক্ষণিক SMS + WhatsApp মেসেজ।' },
    },
    {
      icon: 'mail',
      label: { en: 'Email Sent', bn: 'ইমেইল প্রেরণ' },
      title: { en: 'Full summary emailed', bn: 'সম্পূর্ণ সামারি ইমেইলড' },
      desc: { en: 'Transcript + action items.', bn: 'ট্রান্সক্রিপ্ট + অ্যাকশন আইটেম।' },
    },
    {
      icon: 'bell',
      label: { en: 'Team Notified', bn: 'টিম নোটিফাইড' },
      title: { en: 'Sales team gets push alert', bn: 'সেলস টিম পুশ অ্যালার্ট পায়' },
      desc: { en: 'Slack, WhatsApp, or Teams.', bn: 'Slack, WhatsApp, বা Teams।' },
    },
    {
      icon: 'bar-chart',
      label: { en: 'Analytics Logged', bn: 'অ্যানালিটিক্স লগড' },
      title: { en: 'Dashboard updates live', bn: 'ড্যাশবোর্ড লাইভ আপডেট' },
      desc: { en: 'Every metric, every call.', bn: 'প্রতিটি মেট্রিক, প্রতিটি কল।' },
    },
  ],
  note: {
    en: 'All 12 steps run automatically in under 60 seconds per call — 24/7/365.',
    bn: '১২টি ধাপ প্রতি কলে ৬০ সেকেন্ডের কম সময়ে স্বয়ংক্রিয়ভাবে চলে — ২৪/৭/৩৬৫।',
  } as Bilingual,
}

/* ========================================================================== */
/*  12. CONVERSATION EXAMPLE                                                   */
/* ========================================================================== */

export const CONVERSATION_EXAMPLE = {
  eyebrow: { en: 'Real conversation sample', bn: 'রিয়েল কথোপকথন উদাহরণ' } as Bilingual,
  title: {
    en: 'Listen to a real AI Voice Agent call',
    bn: 'একটি রিয়েল AI Voice Agent কল শুনুন',
  } as Bilingual,
  subtitle: {
    en: 'A real booking conversation — Bangla + English mixed, just like your customers actually talk.',
    bn: 'একটি রিয়েল বুকিং কথোপকথন — বাংলা + ইংরেজি মিক্সড, ঠিক যেমন আপনার গ্রাহক আসলে কথা বলেন।',
  } as Bilingual,
  lines: [
    {
      speaker: 'ai' as const,
      text: {
        en: 'Assalamu Alaikum, this is NextGen Studio. Sakib speaking. How can I help you today?',
        bn: 'আসসালামু আলাইকুম, এখানে NextGen Studio। সাকিব বলছি। কীভাবে সাহায্য করতে পারি?',
      },
    },
    {
      speaker: 'customer' as const,
      text: {
        en: 'Hi, I saw your Facebook ad about the AI Voice Agent. Can you tell me the price?',
        bn: 'হাই, আমি আপনাদের Facebook অ্যাড দেখেছি AI Voice Agent নিয়ে। দাম কত বলবেন?',
      },
    },
    {
      speaker: 'ai' as const,
      text: {
        en: 'Of course. May I know your name and company so I can send you a custom quote?',
        bn: 'অবশ্যই। আপনার নাম ও কোম্পানি বলবেন, যাতে আমি কাস্টম কোট পাঠাতে পারি?',
      },
    },
    {
      speaker: 'customer' as const,
      text: {
        en: 'This is Rahim from Rahim Builders in Dhanmondi. We are a real estate company.',
        bn: 'আমি রহিম, রহিম বিল্ডার্স, ধানমন্ডি থেকে। আমরা রিয়েল এস্টেট কোম্পানি।',
      },
    },
    {
      speaker: 'ai' as const,
      text: {
        en: 'Thank you, Rahim sir. For real estate, our Growth plan at ৳55,000/month is ideal — handles 1,000 calls, books viewings, syncs with your CRM. Would you like to see a live demo?',
        bn: 'ধন্যবাদ, রহিম স্যার। রিয়েল এস্টেটের জন্য আমাদের গ্রোথ প্ল্যান ৳৫৫,০০০/মাস আইডিয়াল — ১,০০০ কল হ্যান্ডেল করে, ভিউয়িং বুক করে, আপনার CRM-এ সিঙ্ক করে। লাইভ ডেমো দেখবেন?',
      },
    },
    {
      speaker: 'customer' as const,
      text: {
        en: 'Yes, that sounds good. But can it speak Bangla? My customers mostly speak Bangla.',
        bn: 'হ্যাঁ, ভাল শোনাচ্ছে। কিন্তু এটা কি বাংলায় কথা বলতে পারে? আমার গ্রাহকরা মূলত বাংলায় কথা বলেন।',
      },
    },
    {
      speaker: 'ai' as const,
      text: {
        en: 'Absolutely — our AI is fluent in both Bangla and English, and switches automatically based on the caller. I can book a 30-minute demo tomorrow at 2 PM or 4 PM. Which works for you?',
        bn: 'একদম — আমাদের AI বাংলা ও ইংরেজি উভয় ভাষায় দক্ষ, এবং কলার অনুযায়ী স্বয়ংক্রিয়ভাবে স্যুইচ করে। আগামীকাল দুপুর ২টা বা ৪টায় ৩০-মিনিট ডেমো বুক করতে পারি। কোনটা সুবিধা?',
      },
    },
    {
      speaker: 'customer' as const,
      text: {
        en: 'Tomorrow 2 PM works. Will you send a calendar invite?',
        bn: 'আগামীকাল দুপুর ২টা ঠিক আছে। ক্যালেন্ডার ইনভাইট পাঠাবেন?',
      },
    },
    {
      speaker: 'ai' as const,
      text: {
        en: 'Done — booked for tomorrow, 2 PM. You will receive an SMS, WhatsApp message, and email with the meeting link in the next 60 seconds. Is there anything else I can help with?',
        bn: 'হয়ে গেছে — আগামীকাল দুপুর ২টায় বুকড। আগামী ৬০ সেকেন্ডে আপনি SMS, WhatsApp মেসেজ এবং ইমেইল পাবেন মিটিং লিংক সহ। আর কিছু সাহায্য করতে পারি?',
      },
    },
    {
      speaker: 'customer' as const,
      text: {
        en: 'No, that is all. Thank you, you sound very professional.',
        bn: 'না, এটাই যথেষ্ট। ধন্যবাদ, আপনি খুব প্রফেশনাল শোনাচ্ছেন।',
      },
    },
    {
      speaker: 'ai' as const,
      text: {
        en: 'Thank you, Rahim sir. Our sales team will join the demo tomorrow. Looking forward to helping Rahim Builders grow. Khoda Hafez.',
        bn: 'ধন্যবাদ, রহিম স্যার। আগামীকাল ডেমোতে আমাদের সেলস টিম যোগ দেবে। রহিম বিল্ডার্সকে বড় করতে সাহায্য করতে পারব বলে আগ্রহী। খোদা হাফেজ।',
      },
    },
    {
      speaker: 'customer' as const,
      text: {
        en: 'Khoda Hafez.',
        bn: 'খোদা হাফেজ।',
      },
    },
  ],
}

/* ========================================================================== */
/*  13. USE CASES (20)                                                         */
/* ========================================================================== */

export const USE_CASES = {
  eyebrow: { en: 'Built for every call scenario', bn: 'প্রতিটি কল সিনারিওর জন্য তৈরি' } as Bilingual,
  title: {
    en: '20 ways our AI Voice Agent drives revenue',
    bn: '২০টি উপায়ে আমাদের AI Voice Agent রেভিনিউ বাড়ায়',
  } as Bilingual,
  subtitle: {
    en: 'From inbound sales to emergency hotlines — one AI agent handles every call type, 24/7.',
    bn: 'ইনবাউন্ড সেলস থেকে ইমার্জেন্সি হটলাইন পর্যন্ত — এক AI এজেন্ট প্রতিটি কল টাইপ হ্যান্ডেল করে, ২৪/৭।',
  } as Bilingual,
  items: [
    {
      icon: 'phone-call',
      title: { en: 'Inbound Sales', bn: 'ইনবাউন্ড সেলস' },
      desc: { en: 'Answer every sales call instantly, qualify the lead, pitch the offer, book a meeting.', bn: 'প্রতিটি সেলস কল তাৎক্ষণিকভাবে রিসিভ করুন, লিড কোয়ালিফাই করুন, অফার পিচ করুন, মিটিং বুক করুন।' },
    },
    {
      icon: 'phone',
      title: { en: 'Outbound Sales', bn: 'আউটবাউন্ড সেলস' },
      desc: { en: 'AI cold-calls prospects with personalised scripts, handles objections, books callbacks.', bn: 'AI পার্সোনালাইজড স্ক্রিপ্ট নিয়ে কোল্ড-কল করে, অবজেকশন হ্যান্ডেল করে, কলব্যাক বুক করে।' },
    },
    {
      icon: 'calendar-check',
      title: { en: 'Appointment Booking', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
      desc: { en: 'Customers call to book — AI checks calendar, proposes slots, confirms in seconds.', bn: 'গ্রাহক বুকিংয়ে কল করেন — AI ক্যালেন্ডার দেখে, স্লট প্রপোজ করে, সেকেন্ডে কনফার্ম করে।' },
    },
    {
      icon: 'headset',
      title: { en: 'Customer Support', bn: 'কাস্টমার সাপোর্ট' },
      desc: { en: 'Answer FAQs, troubleshoot issues, escalate complex cases to humans with full context.', bn: 'FAQ উত্তর দিন, সমস্যা ট্রাবলশুট করুন, জটিল কেস পূর্ণ কনটেক্সট সহ হিউম্যানে এসকেলেট করুন।' },
    },
    {
      icon: 'filter',
      title: { en: 'Lead Qualification', bn: 'লিড কোয়ালিফিকেশন' },
      desc: { en: 'Ask the right 5 questions, score the lead 0–100, route hot leads to sales instantly.', bn: 'সঠিক ৫টি প্রশ্ন করুন, লিড ০–১০০ স্কোর করুন, হট লিড সেলসে তাৎক্ষণিকভাবে রাউট করুন।' },
    },
    {
      icon: 'credit-card',
      title: { en: 'Payment Reminder', bn: 'পেমেন্ট রিমাইন্ডার' },
      desc: { en: 'Auto-call overdue customers, offer payment plans, send bKash/Nagad links via SMS.', bn: 'ওভারডিউ গ্রাহককে অটো-কল করুন, পেমেন্ট প্ল্যান অফার করুন, SMS-এ bKash/Nagad লিংক পাঠান।' },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'Collections', bn: 'কালেকশনস' },
      desc: { en: 'Polite, persistent follow-up calls for outstanding invoices. Escalates if needed.', bn: 'বকেয়া ইনভয়েসের জন্য ভদ্র, ধারাবাহিক ফলো-আপ কল। প্রয়োজনে এসকেলেট করে।' },
    },
    {
      icon: 'package',
      title: { en: 'Order Confirmation', bn: 'অর্ডার কনফার্মেশন' },
      desc: { en: 'Call every new order to confirm details, address, delivery time. Reduces returns 40%.', bn: 'প্রতিটি নতুন অর্ডারে কল করে ডিটেইল, ঠিকানা, ডেলিভারি টাইম কনফার্ম করুন। রিটার্ন ৪০% কমে।' },
    },
    {
      icon: 'heart',
      title: { en: 'Healthcare', bn: 'হেলথকেয়ার' },
      desc: { en: 'Patient appointment booking, prescription refill reminders, lab result delivery.', bn: 'রোগী অ্যাপয়েন্টমেন্ট বুকিং, প্রেসক্রিপশন রিফিল রিমাইন্ডার, ল্যাব রেজাল্ট ডেলিভারি।' },
    },
    {
      icon: 'hospital',
      title: { en: 'Clinic Receptionist', bn: 'ক্লিনিক রিসেপশনিস্ট' },
      desc: { en: 'Replace 24/7 front desk — book appointments, answer patient FAQs, route emergencies.', bn: '২৪/৭ ফ্রন্ট ডেস্ক রিপ্লেস করুন — অ্যাপয়েন্টমেন্ট বুক, রোগী FAQ উত্তর, ইমার্জেন্সি রাউট।' },
    },
    {
      icon: 'graduation-cap',
      title: { en: 'Education', bn: 'শিক্ষা' },
      desc: { en: 'Admission inquiry handling, course info, fee payment reminders, parent-teacher scheduling.', bn: 'অ্যাডমিশন ইনকোয়ারি হ্যান্ডলিং, কোর্স ইনফো, ফি পেমেন্ট রিমাইন্ডার, প্যারেন্ট-টিচার শিডিউলিং।' },
    },
    {
      icon: 'shield',
      title: { en: 'Insurance', bn: 'ইন্স্যুরেন্স' },
      desc: { en: 'Policy inquiry, claim status, premium reminders, lead generation for new policies.', bn: 'পলিসি ইনকোয়ারি, ক্লেম স্ট্যাটাস, প্রিমিয়াম রিমাইন্ডার, নতুন পলিসির জন্য লিড জেনারেশন।' },
    },
    {
      icon: 'hotel',
      title: { en: 'Hotel Bookings', bn: 'হোটেল বুকিং' },
      desc: { en: 'Room availability, rates, special requests, booking confirmation, check-in reminders.', bn: 'রুম অ্যাভেইলেবিলিটি, রেট, স্পেশাল রিকোয়েস্ট, বুকিং কনফার্মেশন, চেক-ইন রিমাইন্ডার।' },
    },
    {
      icon: 'utensils',
      title: { en: 'Restaurant Reservations', bn: 'রেস্টুরেন্ট রিজার্ভেশন' },
      desc: { en: 'Table bookings, menu inquiries, special dietary requests, party/event scheduling.', bn: 'টেবিল বুকিং, মেনু ইনকোয়ারি, স্পেশাল ডায়েটারি রিকোয়েস্ট, পার্টি/ইভেন্ট শিডিউলিং।' },
    },
    {
      icon: 'home',
      title: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      desc: { en: 'Property inquiry, viewing scheduling, price negotiation pre-qualification, agent routing.', bn: 'প্রপার্টি ইনকোয়ারি, ভিউয়িং শিডিউলিং, প্রাইস নেগোশিয়েশন প্রি-কোয়ালিফিকেশন, এজেন্ট রাউটিং।' },
    },
    {
      icon: 'factory',
      title: { en: 'Manufacturing', bn: 'ম্যানুফ্যাকচারিং' },
      desc: { en: 'Supplier coordination, order status, delivery scheduling, B2B inquiry qualification.', bn: 'সাপ্লায়ার কোঅর্ডিনেশন, অর্ডার স্ট্যাটাস, ডেলিভারি শিডিউলিং, B2B ইনকোয়ারি কোয়ালিফিকেশন।' },
    },
    {
      icon: 'briefcase',
      title: { en: 'Recruitment', bn: 'রিক্রুটমেন্ট' },
      desc: { en: 'Candidate screening calls, interview scheduling, offer follow-up, onboarding coordination.', bn: 'ক্যান্ডিডেট স্ক্রিনিং কল, ইন্টারভিউ শিডিউলিং, অফার ফলো-আপ, অনবোর্ডিং কোঅর্ডিনেশন।' },
    },
    {
      icon: 'alert-triangle',
      title: { en: 'Emergency Hotline', bn: 'ইমার্জেন্সি হটলাইন' },
      desc: { en: '24/7 emergency call handling — instant routing, location capture, priority escalation.', bn: '২৪/৭ ইমার্জেন্সি কল হ্যান্ডলিং — তাৎক্ষণিক রাউটিং, লোকেশন ক্যাপচার, প্রায়োরিটি এসকেলেশন।' },
    },
    {
      icon: 'headset',
      title: { en: 'Internal Helpdesk', bn: 'ইন্টারনাল হেল্পডেস্ক' },
      desc: { en: 'IT support, HR queries, leave requests — AI handles tier-1 internal tickets by phone.', bn: 'IT সাপোর্ট, HR কোয়েরি, লিভ রিকোয়েস্ট — AI ফোনে টিয়ার-১ ইন্টারনাল টিকেট হ্যান্ডেল করে।' },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'Membership Renewal', bn: 'মেম্বারশিপ রিনিউয়াল' },
      desc: { en: 'Auto-call members 7 days before expiry, offer renewal, take payment, update CRM.', bn: 'এক্সপায়রির ৭ দিন আগে মেম্বারদের অটো-কল, রিনিউয়াল অফার, পেমেন্ট নেওয়া, CRM আপডেট।' },
    },
  ],
}

/* ========================================================================== */
/*  14. FEATURES (30 enterprise features)                                      */
/* ========================================================================== */

export const FEATURES = {
  eyebrow: { en: '30 enterprise features', bn: '৩০টি এন্টারপ্রাইজ ফিচার' } as Bilingual,
  title: {
    en: 'Everything your call center needs — in one AI agent',
    bn: 'আপনার কল সেন্টারের যা প্রয়োজন — এক AI এজেন্টে',
  } as Bilingual,
  subtitle: {
    en: 'Enterprise-grade capabilities built in. No add-ons, no upgrades, no surprises.',
    bn: 'এন্টারপ্রাইজ-গ্রেড ক্ষমতা বিল্ট-ইন। কোনো অ্যাড-অন, আপগ্রেড বা চমক নেই।',
  } as Bilingual,
  items: [
    { icon: 'mic', title: { en: 'Natural Human-like Voice', bn: 'ন্যাচারাল হিউম্যান-লাইক ভয়েস' }, desc: { en: 'ElevenLabs + OpenAI voice synthesis. Pauses, inflection, emotion — indistinguishable from human.', bn: 'ElevenLabs + OpenAI ভয়েস সিনথেসিস। বিরতি, ইনফ্লেকশন, আবেগ — মানুষ থেকে আলাদা করা যায় না।' } },
    { icon: 'globe', title: { en: 'Bangla Fluency', bn: 'বাংলা দক্ষতা' }, desc: { en: 'Native-quality Bangla — not machine-translated. Understands dialects, code-switching, accents.', bn: 'নেটিভ-কোয়ালিটি বাংলা — মেশিন-ট্রান্সলেটেড নয়। ডায়ালেক্ট, কোড-সুইচিং, অ্যাকসেন্ট বোঝে।' } },
    { icon: 'book-open', title: { en: 'English Fluency', bn: 'ইংরেজি দক্ষতা' }, desc: { en: 'Native-quality English with Bangladesh accent option. Perfect for international clients.', bn: 'বাংলাদেশি অ্যাকসেন্ট অপশন সহ নেটিভ-কোয়ালিটি ইংরেজি। আন্তর্জাতিক ক্লায়েন্টের জন্য পারফেক্ট।' } },
    { icon: 'globe', title: { en: 'Multi-language Support', bn: 'মাল্টি-ল্যাঙ্গুয়েজ সাপোর্ট' }, desc: { en: 'Bangla, English, Hindi, Urdu, Arabic — add any language. Auto-detects and switches mid-call.', bn: 'বাংলা, ইংরেজি, হিন্দি, উর্দু, আরবি — যেকোনো ভাষা যোগ করুন। অটো-ডিটেক্ট ও মাঝে স্যুইচ করে।' } },
    { icon: 'mic', title: { en: 'Voice Cloning', bn: 'ভয়েস ক্লোনিং' }, desc: { en: 'Clone your founder, brand ambassador, or chosen voice. 2-3 minute sample is enough.', bn: 'আপনার ফাউন্ডার, ব্র্যান্ড অ্যাম্বাসেডর বা নির্বাচিত ভয়েস ক্লোন করুন। ২-৩ মিনিট স্যাম্পল যথেষ্ট।' } },
    { icon: 'database', title: { en: 'CRM Sync (HubSpot/GHL/Salesforce/Zoho)', bn: 'CRM সিঙ্ক (HubSpot/GHL/Salesforce/Zoho)' }, desc: { en: 'Native two-way sync. Contacts, deals, notes, activities, lead score — all updated automatically.', bn: 'নেটিভ টু-ওয়ে সিঙ্ক। কন্টাক্ট, ডিল, নোট, অ্যাক্টিভিটি, লিড স্কোর — সব স্বয়ংক্রিয়ভাবে আপডেট।' } },
    { icon: 'calendar-check', title: { en: 'Calendar Booking', bn: 'ক্যালেন্ডার বুকিং' }, desc: { en: 'Google Calendar, Outlook, Calendly. Real-time availability, no double-bookings, instant confirm.', bn: 'Google Calendar, Outlook, Calendly। রিয়েল-টাইম অ্যাভেইলেবিলিটি, কোনো ডাবল-বুকিং নেই, তাৎক্ষণিক কনফার্ম।' } },
    { icon: 'mic', title: { en: 'Call Recording', bn: 'কল রেকর্ডিং' }, desc: { en: 'Every call recorded in HD audio. Stored encrypted, searchable, downloadable for training.', bn: 'প্রতিটি কল HD অডিওতে রেকর্ডেড। এনক্রিপ্টেড স্টোরড, সার্চেবল, ট্রেনিংয়ের জন্য ডাউনলোডযোগ্য।' } },
    { icon: 'file-text', title: { en: 'Transcription', bn: 'ট্রান্সক্রিপশন' }, desc: { en: 'Full Bangla + English transcript of every call. Searchable by keyword, speaker, intent.', bn: 'প্রতিটি কলের সম্পূর্ণ বাংলা + ইংরেজি ট্রান্সক্রিপ্ট। কীওয়ার্ড, স্পিকার, ইনটেন্ট দিয়ে সার্চেবল।' } },
    { icon: 'file-text', title: { en: 'AI Call Summary', bn: 'AI কল সামারি' }, desc: { en: 'GPT-4 auto-generates 3-line summary + action items + sentiment + lead score, every call.', bn: 'GPT-4 প্রতি কলে ৩-লাইন সামারি + অ্যাকশন আইটেম + সেন্টিমেন্ট + লিড স্কোর অটো-জেনারেট করে।' } },
    { icon: 'file-text', title: { en: 'AI Notes', bn: 'AI নোট' }, desc: { en: 'Structured notes auto-extracted: name, phone, address, intent, budget, timeline, next step.', bn: 'স্ট্রাকচার্ড নোট অটো-এক্সট্র্যাক্ট: নাম, ফোন, ঠিকানা, ইনটেন্ট, বাজেট, টাইমলাইন, নেক্সট স্টেপ।' } },
    { icon: 'target', title: { en: 'Intent Detection', bn: 'ইনটেন্ট ডিটেকশন' }, desc: { en: '98% accuracy — sales, support, booking, complaint, info. Routes correctly, every time.', bn: '৯৮% নির্ভুলতা — সেলস, সাপোর্ট, বুকিং, কমপ্লেইন্ট, ইনফো। প্রতিবার সঠিকভাবে রাউট করে।' } },
    { icon: 'smile', title: { en: 'Sentiment Analysis', bn: 'সেন্টিমেন্ট অ্যানালাইসিস' }, desc: { en: 'Detects happy, neutral, frustrated, angry — adjusts tone, escalates if needed.', bn: 'খুশি, নিউট্রাল, ফ্রাস্ট্রেটেড, রাগী ডিটেক্ট করে — টোন অ্যাডজাস্ট করে, প্রয়োজনে এসকেলেট করে।' } },
    { icon: 'hand', title: { en: 'Transfer to Human', bn: 'হিউম্যানে ট্রান্সফার' }, desc: { en: 'One-tap transfer to live agent with full context: transcript, summary, sentiment, customer history.', bn: 'পূর্ণ কনটেক্সট সহ লাইভ এজেন্টে ওয়ান-ট্যাপ ট্রান্সফার: ট্রান্সক্রিপ্ট, সামারি, সেন্টিমেন্ট, কাস্টমার হিস্ট্রি।' } },
    { icon: 'shuffle', title: { en: 'Smart Call Routing', bn: 'স্মার্ট কল রাউটিং' }, desc: { en: 'Route by intent, language, geography, account value, agent skill — automatically.', bn: 'ইনটেন্ট, ভাষা, ভূগোল, অ্যাকাউন্ট ভ্যালু, এজেন্ট স্কিল অনুযায়ী রাউট — স্বয়ংক্রিয়ভাবে।' } },
    { icon: 'mic', title: { en: 'Custom Brand Voice', bn: 'কাস্টম ব্র্যান্ড ভয়েস' }, desc: { en: 'Choose voice, tone, personality, greeting script, vocabulary — matches your brand perfectly.', bn: 'ভয়েস, টোন, পার্সোনালিটি, গ্রিটিং স্ক্রিপ্ট, শব্দভান্ডার বেছে নিন — আপনার ব্র্যান্ডের সাথে পারফেক্ট ম্যাচ।' } },
    { icon: 'book-open', title: { en: 'Knowledge Base', bn: 'নলেজ বেস' }, desc: { en: 'Upload PDFs, docs, URLs, FAQs. AI trains on your data and answers like a 10-year expert.', bn: 'PDF, ডকস, URL, FAQ আপলোড করুন। AI আপনার ডেটায় ট্রেইন হয়ে ১০ বছরের এক্সপার্টের মতো উত্তর দেয়।' } },
    { icon: 'bar-chart', title: { en: 'Real-time Analytics', bn: 'রিয়েল-টাইম অ্যানালিটিক্স' }, desc: { en: 'Live dashboard: call volume, answer rate, booking rate, sentiment, revenue per call, agent performance.', bn: 'লাইভ ড্যাশবোর্ড: কল ভলিউম, অ্যান্সার রেট, বুকিং রেট, সেন্টিমেন্ট, প্রতি কলে রেভিনিউ, এজেন্ট পারফরম্যান্স।' } },
    { icon: 'code', title: { en: 'REST API', bn: 'REST API' }, desc: { en: 'Full programmatic access — trigger calls, fetch transcripts, manage contacts, build custom flows.', bn: 'সম্পূর্ণ প্রোগ্রাম্যাটিক অ্যাক্সেস — কল ট্রিগার, ট্রান্সক্রিপ্ট ফেচ, কন্টাক্ট ম্যানেজ, কাস্টম ফ্লো বিল্ড।' } },
    { icon: 'plug', title: { en: 'Webhooks', bn: 'Webhooks' }, desc: { en: 'Real-time events: call.started, call.ended, booking.created, lead.qualified. Push to any URL.', bn: 'রিয়েল-টাইম ইভেন্ট: call.started, call.ended, booking.created, lead.qualified। যেকোনো URL-এ পুশ।' } },
    { icon: 'message-circle', title: { en: 'SMS Follow-up', bn: 'SMS ফলো-আপ' }, desc: { en: 'Auto-SMS after every call: confirmation, summary, link, reminder. Bangla + English supported.', bn: 'প্রতিটি কলের পর অটো-SMS: কনফার্মেশন, সামারি, লিংক, রিমাইন্ডার। বাংলা + ইংরেজি সাপোর্টেড।' } },
    { icon: 'message-circle', title: { en: 'WhatsApp Handoff', bn: 'WhatsApp হ্যান্ডঅফ' }, desc: { en: 'Move call to WhatsApp for documents, photos, payment links, group chats. Continuous thread.', bn: 'ডকুমেন্ট, ছবি, পেমেন্ট লিংক, গ্রুপ চ্যাটের জন্য কল WhatsApp-এ সরিয়ে নিন। কন্টিনিউয়াস থ্রেড।' } },
    { icon: 'mail', title: { en: 'Email Summary', bn: 'ইমেইল সামারি' }, desc: { en: 'Full transcript + summary + action items emailed to customer and team. Branded template.', bn: 'সম্পূর্ণ ট্রান্সক্রিপ্ট + সামারি + অ্যাকশন আইটেম গ্রাহক ও টিমকে ইমেইল। ব্র্যান্ডেড টেমপ্লেট।' } },
    { icon: 'phone', title: { en: 'Voicemail Detection', bn: 'ভয়েসমেইল ডিটেকশন' }, desc: { en: 'AI detects voicemail, leaves a professional message, logs the attempt, schedules retry.', bn: 'AI ভয়েসমেইল ডিটেক্ট করে, প্রফেশনাল মেসেজ রেখে যায়, এটেম্পট লগ করে, রিট্রাই শিডিউল করে।' } },
    { icon: 'gauge', title: { en: 'Noise Reduction', bn: 'নয়েজ রিডাকশন' }, desc: { en: 'AI filters background noise, traffic, wind. Crystal-clear audio on both sides of the call.', bn: 'AI ব্যাকগ্রাউন্ড নয়েজ, ট্রাফিক, বাতাস ফিল্টার করে। কলের উভয় পাশে ক্রিস্টাল-ক্লিয়ার অডিও।' } },
    { icon: 'clock', title: { en: 'Silence Detection', bn: 'সাইলেন্স ডিটেকশন' }, desc: { en: 'Detects long pauses, prompts customer gently, prevents awkward dead air, keeps flow natural.', bn: 'দীর্ঘ বিরতি ডিটেক্ট করে, ভদ্রভাবে প্রম্পট করে, অ্যাওকওয়ার্ড ডেড এয়ার ঠেকায়, ফ্লো ন্যাচারাল রাখে।' } },
    { icon: 'smile', title: { en: 'Emotion Detection', bn: 'ইমোশন ডিটেকশন' }, desc: { en: 'Detects 7 emotions from voice — happy, sad, angry, frustrated, confused, urgent, calm.', bn: 'ভয়েস থেকে ৭টি ইমোশন ডিটেক্ট করে — খুশি, দুঃখী, রাগী, ফ্রাস্ট্রেটেড, কনফিউজড, জরুরি, শান্ত।' } },
    { icon: 'shield', title: { en: 'Voice Biometrics', bn: 'ভয়েস বায়োমেট্রিক্স' }, desc: { en: 'Identify callers by voiceprint. Verify identity, flag fraud, personalise by caller.', bn: 'ভয়েসপ্রিন্ট দিয়ে কলার শনাক্ত করুন। আইডেন্টিটি ভেরিফাই, ফ্রড ফ্ল্যাগ, কলার অনুযায়ী পার্সোনালাইজ।' } },
    { icon: 'zap', title: { en: 'Multi-call Concurrent', bn: 'মাল্টি-কল কনকারেন্ট' }, desc: { en: '1,000 simultaneous calls — same speed, same quality, same flat cost. Infinite scale.', bn: '১,০০০ সিমুলটেনিয়াস কল — একই স্পিড, একই কোয়ালিটি, একই ফ্ল্যাট খরচ। আনলিমিটেড স্কেল।' } },
    { icon: 'clock', title: { en: '24/7 Uptime', bn: '২৪/৭ আপটাইম' }, desc: { en: '99.9% SLA. Never sleeps, never takes breaks, never quits. Always ready to answer.', bn: '৯৯.৯% SLA। কখনো ঘুমায় না, বিরতি নেয় না, ছাড়ে না। সবসময় উত্তর দেওয়ার জন্য প্রস্তুত।' } },
  ],
}

/* ========================================================================== */
/*  15. VOICE AI CAPABILITIES (10)                                             */
/* ========================================================================== */

export const VOICE_AI_CAPABILITIES = {
  eyebrow: { en: 'AI brain behind the voice', bn: 'ভয়েসের পেছনের AI ব্রেইন' } as Bilingual,
  title: {
    en: '10 AI capabilities that make our agent smart',
    bn: '১০টি AI ক্ষমতা যা আমাদের এজেন্টকে স্মার্ট বানায়',
  } as Bilingual,
  subtitle: {
    en: 'Not just text-to-speech — full conversational intelligence that understands, remembers and responds.',
    bn: 'শুধু টেক্সট-টু-স্পিচ নয় — সম্পূর্ণ কনভার্সেশনাল ইন্টেলিজেন্স যা বোঝে, মনে রাখে ও সাড়া দেয়।',
  } as Bilingual,
  items: [
    {
      icon: 'mic',
      title: { en: 'Speech Recognition (ASR)', bn: 'স্পিচ রিকগনিশন (ASR)' },
      desc: {
        en: 'Deepgram + Whisper transcribe Bangla + English in real-time. 96% accuracy even with accents.',
        bn: 'Deepgram + Whisper রিয়েল-টাইমে বাংলা + ইংরেজি ট্রান্সক্রাইব করে। অ্যাকসেন্ট সহ ৯৬% নির্ভুলতা।',
      },
    },
    {
      icon: 'brain',
      title: { en: 'Natural Language Understanding', bn: 'ন্যাচারাল ল্যাঙ্গুয়েজ আন্ডারস্ট্যান্ডিং' },
      desc: {
        en: 'GPT-4 understands context, slang, idioms, incomplete sentences. No "I did not get that" loops.',
        bn: 'GPT-4 কনটেক্সট, স্ল্যাং, ইডিয়ম, অসম্পূর্ণ বাক্য বোঝে। কোনো "বুঝতে পারিনি" লুপ নেই।',
      },
    },
    {
      icon: 'target',
      title: { en: 'Intent Detection', bn: 'ইনটেন্ট ডিটেকশন' },
      desc: {
        en: 'Classifies intent in <500ms — sales, support, booking, complaint, info. 98% accuracy.',
        bn: '৫০০মি-সেকেন্ডের কম সময়ে ইনটেন্ট ক্লাসিফাই করে — সেলস, সাপোর্ট, বুকিং, কমপ্লেইন্ট, ইনফো। ৯৮% নির্ভুলতা।',
      },
    },
    {
      icon: 'database',
      title: { en: 'Context Memory', bn: 'কনটেক্সট মেমোরি' },
      desc: {
        en: 'Remembers the entire conversation. References earlier points. No repetitive questions.',
        bn: 'সম্পূর্ণ কথোপকথন মনে রাখে। আগের পয়েন্ট রেফার করে। কোনো পুনরাবৃত্ত প্রশ্ন নেই।',
      },
    },
    {
      icon: 'shuffle',
      title: { en: 'Conversation Routing', bn: 'কনভার্সেশন রাউটিং' },
      desc: {
        en: 'Routes to right flow: sales pitch, FAQ answer, booking flow, support ticket, human agent.',
        bn: 'সঠিক ফ্লোতে রাউট করে: সেলস পিচ, FAQ উত্তর, বুকিং ফ্লো, সাপোর্ট টিকেট, হিউম্যান এজেন্ট।',
      },
    },
    {
      icon: 'smile',
      title: { en: 'Emotion Detection', bn: 'ইমোশন ডিটেকশন' },
      desc: {
        en: 'Reads voice tone for 7 emotions. Adjusts response — calms angry, energises happy, reassures anxious.',
        bn: 'ভয়েস টোন থেকে ৭টি ইমোশন পড়ে। রেসপন্স অ্যাডজাস্ট করে — রাগীকে শান্ত, খুশিকে উৎসাহিত, উদ্বিগ্নকে আশ্বস্ত।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Silence Detection', bn: 'সাইলেন্স ডিটেকশন' },
      desc: {
        en: 'Detects awkward pauses >3 seconds, gently prompts customer. Keeps conversation natural.',
        bn: '৩ সেকেন্ডের বেশি অ্যাওকওয়ার্ড বিরতি ডিটেক্ট করে, ভদ্রভাবে প্রম্পট করে। কথোপকথন ন্যাচারাল রাখে।',
      },
    },
    {
      icon: 'hand',
      title: { en: 'Human Handoff', bn: 'হিউম্যান হ্যান্ডঅফ' },
      desc: {
        en: 'Seamless transfer with full context attached. Agent picks up where AI left off — zero repeat.',
        bn: 'পূর্ণ কনটেক্সট সহ সিমলেস ট্রান্সফার। এজেন্ট AI যেখানে ছেড়েছে সেখান থেকে তুলে নেয় — জিরো রিপিট।',
      },
    },
    {
      icon: 'shield',
      title: { en: 'Voice Biometrics', bn: 'ভয়েস বায়োমেট্রিক্স' },
      desc: {
        en: 'Identifies repeat callers by voiceprint. Pulls up history. Verifies identity for sensitive calls.',
        bn: 'ভয়েসপ্রিন্ট দিয়ে রিপিট কলার শনাক্ত করে। হিস্ট্রি তুলে আনে। সংবেদনশীল কলে আইডেন্টিটি ভেরিফাই করে।',
      },
    },
    {
      icon: 'gauge',
      title: { en: 'Noise Reduction', bn: 'নয়েজ রিডাকশন' },
      desc: {
        en: 'AI filters traffic, wind, crowd, fan noise. Crystal-clear audio even from a busy street.',
        bn: 'AI ট্রাফিক, বাতাস, ভিড়, ফ্যান নয়েজ ফিল্টার করে। ব্যস্ত রাস্তা থেকেও ক্রিস্টাল-ক্লিয়ার অডিও।',
      },
    },
  ],
}

/* ========================================================================== */
/*  16. INTEGRATIONS                                                           */
/* ========================================================================== */

export const INTEGRATIONS = {
  eyebrow: { en: 'Connects with your stack', bn: 'আপনার স্ট্যাকের সাথে কানেক্ট' } as Bilingual,
  title: {
    en: 'Integrates with 25+ tools you already use',
    bn: 'আপনার ব্যবহৃত ২৫+ টুলের সাথে ইন্টিগ্রেট',
  } as Bilingual,
  subtitle: {
    en: 'Native CRM, calendar, payment, and messaging integrations. Plus Zapier/Make/n8n for everything else.',
    bn: 'নেটিভ CRM, ক্যালেন্ডার, পেমেন্ট ও মেসেজিং ইন্টিগ্রেশন। প্লাস বাকি সবের জন্য Zapier/Make/n8n।',
  } as Bilingual,
  items: [
    'HubSpot', 'Salesforce', 'GoHighLevel', 'Zoho', 'Freshsales', 'Pipedrive',
    'Google Calendar', 'Outlook', 'WhatsApp API', 'Twilio', 'Stripe', 'bKash',
    'Nagad', 'Zapier', 'Make', 'n8n', 'OpenAI', 'ElevenLabs', 'Vapi', 'Retell AI',
    'Slack', 'Microsoft Teams', 'Google Sheets', 'Calendly', 'Razorpay',
  ],
}

/* ========================================================================== */
/*  17. INDUSTRY SOLUTIONS (12)                                                */
/* ========================================================================== */

export const INDUSTRY_SOLUTIONS = {
  eyebrow: { en: 'Built for your industry', bn: 'আপনার ইন্ডাস্ট্রির জন্য তৈরি' } as Bilingual,
  title: {
    en: '12 industries we transform with AI Voice',
    bn: '১২টি ইন্ডাস্ট্রি AI Voice দিয়ে বদলাই',
  } as Bilingual,
  subtitle: {
    en: 'Each industry has unique call patterns. Our AI is pre-trained on each — goes live faster, performs better.',
    bn: 'প্রতিটি ইন্ডাস্ট্রির আলাদা কল প্যাটার্ন। আমাদের AI প্রতিটিতে প্রি-ট্রেইনড — দ্রুত লাইভ হয়, ভাল পারফর্ম করে।',
  } as Bilingual,
  items: [
    {
      icon: 'home',
      industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      pain: { en: 'Buyers call at all hours, agents miss 50% of leads.', bn: 'ক্রেতা সব সময়ে কল করেন, এজেন্ট ৫০% লিড মিস করেন।' },
      solution: { en: 'AI answers instantly, qualifies budget/location, books property viewings.', bn: 'AI তাৎক্ষণিকভাবে উত্তর দেয়, বাজেট/লোকেশন কোয়ালিফাই করে, প্রপার্টি ভিউয়িং বুক করে।' },
      outcome: { en: '3x more viewings booked, 60% fewer missed leads.', bn: '৩x বেশি ভিউয়িং বুকড, ৬০% কম মিসড লিড।' },
    },
    {
      icon: 'hospital',
      industry: { en: 'Clinic', bn: 'ক্লিনিক' },
      pain: { en: 'Front desk overwhelmed, patients wait on hold, no-shows high.', bn: 'ফ্রন্ট ডেস্ক ওভারহেলমড, রোগী হোল্ডে অপেক্ষা, no-show বেশি।' },
      solution: { en: 'AI books appointments, sends reminders, handles rescheduling 24/7.', bn: 'AI অ্যাপয়েন্টমেন্ট বুক করে, রিমাইন্ডার পাঠায়, রিশিডিউলিং ২৪/৭ হ্যান্ডেল করে।' },
      outcome: { en: '40% fewer no-shows, 70% less front-desk load.', bn: '৪০% কম no-show, ৭০% কম ফ্রন্ট-ডেস্ক লোড।' },
    },
    {
      icon: 'hospital',
      industry: { en: 'Hospital', bn: 'হাসপাতাল' },
      pain: { en: 'Thousands of daily calls — appointment, report, emergency, visiting hours.', bn: 'প্রতিদিন হাজার কল — অ্যাপয়েন্টমেন্ট, রিপোর্ট, ইমার্জেন্সি, ভিজিটিং আওয়ার।' },
      solution: { en: 'AI triages calls, books appointments, delivers reports info, escalates emergencies.', bn: 'AI কল ট্রায়েজ করে, অ্যাপয়েন্টমেন্ট বুক করে, রিপোর্ট ইনফো দেয়, ইমার্জেন্সি এসকেলেট করে।' },
      outcome: { en: '90% calls auto-handled, 24/7 coverage, 50% less staff load.', bn: '৯০% কল অটো-হ্যান্ডেলড, ২৪/৭ কভারেজ, ৫০% কম স্টাফ লোড।' },
    },
    {
      icon: 'graduation-cap',
      industry: { en: 'University', bn: 'বিশ্ববিদ্যালয়' },
      pain: { en: 'Admission season = 1000+ inquiry calls/day, staff cannot cope.', bn: 'অ্যাডমিশন সিজন = দিনে ১০০০+ ইনকোয়ারি কল, স্টাফ সামলাতে পারে না।' },
      solution: { en: 'AI handles admission inquiries, course info, fee structure, campus visit bookings.', bn: 'AI অ্যাডমিশন ইনকোয়ারি, কোর্স ইনফো, ফি স্ট্রাকচার, ক্যাম্পাস ভিজিট বুকিং হ্যান্ডেল করে।' },
      outcome: { en: '5x inquiry capacity, 100% calls answered, 60% conversion to applications.', bn: '৫x ইনকোয়ারি ক্যাপাসিটি, ১০০% কল অ্যান্সারড, ৬০% অ্যাপ্লিকেশনে কনভার্সন।' },
    },
    {
      icon: 'school',
      industry: { en: 'School', bn: 'স্কুল' },
      pain: { en: 'Parents call about attendance, results, events, fees — staff spend hours.', bn: 'অভিভাবকরা উপস্থিতি, ফলাফল, ইভেন্ট, ফি নিয়ে কল করেন — স্টাফ ঘন্টা নষ্ট করেন।' },
      solution: { en: 'AI answers parent queries, sends attendance alerts, schedules PTM, processes fees.', bn: 'AI অভিভাবক কোয়েরি উত্তর দেয়, উপস্থিতি অ্যালার্ট পাঠায়, PTM শিডিউল করে, ফি প্রসেস করে।' },
      outcome: { en: '80% less staff call load, happier parents, better communication.', bn: '৮০% কম স্টাফ কল লোড, খুশি অভিভাবক, উন্নত যোগাযোগ।' },
    },
    {
      icon: 'factory',
      industry: { en: 'Manufacturing', bn: 'ম্যানুফ্যাকচারিং' },
      pain: { en: 'Supplier/distributor calls get lost. Order status updates eat up staff time.', bn: 'সাপ্লায়ার/ডিস্ট্রিবিউটর কল হারায়। অর্ডার স্ট্যাটাস আপডেটে স্টাফ সময় নষ্ট।' },
      solution: { en: 'AI coordinates suppliers, gives order status, schedules deliveries, escalates delays.', bn: 'AI সাপ্লায়ার কোঅর্ডিনেট করে, অর্ডার স্ট্যাটাস দেয়, ডেলিভারি শিডিউল করে, দেরি এসকেলেট করে।' },
      outcome: { en: 'Zero missed supplier calls, 50% faster coordination, 30% fewer delays.', bn: 'জিরো মিসড সাপ্লায়ার কল, ৫০% দ্রুত কোঅর্ডিনেশন, ৩০% কম দেরি।' },
    },
    {
      icon: 'gavel',
      industry: { en: 'Law Firm', bn: 'ল ফার্ম' },
      pain: { en: 'Potential clients call out of hours, intake is inconsistent.', bn: 'সম্ভাব্য ক্লায়েন্ট অফিস আওয়ারের বাইরে কল করেন, ইনটেক অসামঞ্জস্যপূর্ণ।' },
      solution: { en: 'AI does initial intake, qualifies case type, books consultation, sends NDA.', bn: 'AI প্রাথমিক ইনটেক করে, কেস টাইপ কোয়ালিফাই করে, কনসালটেশন বুক করে, NDA পাঠায়।' },
      outcome: { en: '3x more consultations booked, 100% after-hours coverage, 40% higher conversion.', bn: '৩x বেশি কনসালটেশন বুকড, ১০০% আফটার-আওয়ার কভারেজ, ৪০% উচ্চতর কনভার্সন।' },
    },
    {
      icon: 'briefcase',
      industry: { en: 'Agency', bn: 'এজেন্সি' },
      pain: { en: 'Lead calls compete with client calls — both suffer, response time slips.', bn: 'লিড কল ও ক্লায়েন্ট কল প্রতিযোগিতা করে — উভয়ই ক্ষতিগ্রস্ত, রেসপন্স টাইম পড়ে।' },
      solution: { en: 'AI triages new leads vs client calls, books both appropriately, routes urgent cases.', bn: 'AI নতুন লিড বনাম ক্লায়েন্ট কল ট্রায়েজ করে, উভয়ই বুক করে, জরুরি কেস রাউট করে।' },
      outcome: { en: '2x lead conversion, happier clients, 0 missed calls.', bn: '২x লিড কনভার্সন, খুশি ক্লায়েন্ট, ০ মিসড কল।' },
    },
    {
      icon: 'shield',
      industry: { en: 'Insurance', bn: 'ইন্স্যুরেন্স' },
      pain: { en: 'Policy inquiry + claim status calls flood the lines. Agents burn out.', bn: 'পলিসি ইনকোয়ারি + ক্লেম স্ট্যাটাস কলে লাইন ফ্লাড। এজেন্ট বার্নআউট।' },
      solution: { en: 'AI answers policy questions, gives claim status, books agent calls, generates leads.', bn: 'AI পলিসি প্রশ্নের উত্তর দেয়, ক্লেম স্ট্যাটাস দেয়, এজেন্ট কল বুক করে, লিড জেনারেট করে।' },
      outcome: { en: '70% calls auto-handled, 3x more policy sales, 50% less agent burnout.', bn: '৭০% কল অটো-হ্যান্ডেলড, ৩x বেশি পলিসি সেলস, ৫০% কম এজেন্ট বার্নআউট।' },
    },
    {
      icon: 'plane',
      industry: { en: 'Travel', bn: 'ট্রাভেল' },
      pain: { en: 'Booking calls peak during off-hours. Missed calls = lost bookings.', bn: 'বুকিং কল অফ-আওয়ারে পিক করে। মিসড কল = হারানো বুকিং।' },
      solution: { en: 'AI books packages, answers itinerary questions, processes payments, sends confirmations.', bn: 'AI প্যাকেজ বুক করে, ইটিনারেরি প্রশ্নের উত্তর দেয়, পেমেন্ট প্রসেস করে, কনফার্মেশন পাঠায়।' },
      outcome: { en: '24/7 booking capability, 40% more conversions, 50% higher customer satisfaction.', bn: '২৪/৭ বুকিং ক্ষমতা, ৪০% বেশি কনভার্সন, ৫০% উচ্চতর গ্রাহক সন্তুষ্টি।' },
    },
    {
      icon: 'hotel',
      industry: { en: 'Hotel', bn: 'হোটেল' },
      pain: { en: 'Front desk juggling check-ins, calls, requests — calls get dropped.', bn: 'ফ্রন্ট ডেস্ক চেক-ইন, কল, রিকোয়েস্ট জাগলিং — কল ড্রপ হয়।' },
      solution: { en: 'AI handles reservations, room service requests, info inquiries, special requests.', bn: 'AI রিজারভেশন, রুম সার্ভিস রিকোয়েস্ট, ইনফো ইনকোয়ারি, স্পেশাল রিকোয়েস্ট হ্যান্ডেল করে।' },
      outcome: { en: '30% more direct bookings, 50% less front-desk load, 5★ reviews.', bn: '৩০% বেশি ডাইরেক্ট বুকিং, ৫০% কম ফ্রন্ট-ডেস্ক লোড, ৫★ রিভিউ।' },
    },
    {
      icon: 'utensils',
      industry: { en: 'Restaurant', bn: 'রেস্টুরেন্ট' },
      pain: { en: 'Dinner rush = phone rings nonstop. Reservations lost, orders missed.', bn: 'ডিনার রাশ = ফোন ননস্টপ বাজে। রিজারভেশন হারায়, অর্ডার মিস হয়।' },
      solution: { en: 'AI takes reservations, answers menu questions, processes takeout orders, books events.', bn: 'AI রিজারভেশন নেয়, মেনু প্রশ্নের উত্তর দেয়, টেকআউট অর্ডার প্রসেস করে, ইভেন্ট বুক করে।' },
      outcome: { en: 'Zero missed reservations, 25% more takeout orders, 4.8★ rating.', bn: 'জিরো মিসড রিজারভেশন, ২৫% বেশি টেকআউট অর্ডার, ৪.৮★ রেটিং।' },
    },
  ],
}

/* ========================================================================== */
/*  18. COMPARISON (Traditional Call Center vs AI Voice Agent — 22 rows)      */
/* ========================================================================== */

/* ========================================================================== */
/*  18b. COMPETITOR COMPARISON (NextGen vs named competitors)                  */
/* ========================================================================== */

export const COMPETITOR_COMPARISON = {
  eyebrow: { en: 'Why choose us over the rest', bn: 'বাকিদের চেয়ে কেন আমরা' } as Bilingual,
  title: {
    en: 'NextGen AI Voice vs other voice AI platforms',
    bn: 'NextGen AI Voice বনাম অন্যান্য ভয়েস AI প্ল্যাটফর্ম',
  } as Bilingual,
  subtitle: {
    en: 'We are not just a voice API — we are a fully-managed AI sales automation service built for Bangladesh.',
    bn: 'আমরা শুধু একটি ভয়েস API নই — আমরা বাংলাদেশের জন্য তৈরি একটি সম্পূর্ণ-ম্যানেজড AI সেলস অটোমেশন সার্ভিস।',
  } as Bilingual,
  headers: [
    { en: 'Capability', bn: 'ক্ষমতা' } as Bilingual,
    { en: 'NextGen (us)', bn: 'NextGen (আমরা)' } as Bilingual,
    { en: 'Air.ai', bn: 'Air.ai' } as Bilingual,
    { en: 'Vapi', bn: 'Vapi' } as Bilingual,
    { en: 'Bland AI', bn: 'Bland AI' } as Bilingual,
    { en: 'Retell', bn: 'Retell' } as Bilingual,
  ] as Bilingual[],
  rows: [
    {
      feature: { en: 'Native Bangla fluency', bn: 'নেটিভ বাংলা দক্ষতা' } as Bilingual,
      values: [
        { en: 'Native, trained on BD data', bn: 'নেটিভ, BD ডেটায় ট্রেইনড' },
        { en: 'Limited', bn: 'সীমিত' },
        { en: 'Limited', bn: 'সীমিত' },
        { en: 'Limited', bn: 'সীমিত' },
        { en: 'Limited', bn: 'সীমিত' },
      ],
    },
    {
      feature: { en: 'Fully-managed setup', bn: 'সম্পূর্ণ-ম্যানেজড সেটআপ' } as Bilingual,
      values: [
        { en: 'Yes — we build everything', bn: 'হ্যাঁ — আমরা সব বানাই' },
        { en: 'DIY only', bn: 'শুধু DIY' },
        { en: 'DIY only', bn: 'শুধু DIY' },
        { en: 'DIY only', bn: 'শুধু DIY' },
        { en: 'DIY only', bn: 'শুধু DIY' },
      ],
    },
    {
      feature: { en: 'CRM integration (HubSpot/GHL/Salesforce)', bn: 'CRM ইন্টিগ্রেশন (HubSpot/GHL/Salesforce)' } as Bilingual,
      values: [
        { en: 'Included, done-for-you', bn: 'অন্তর্ভুক্ত, আমরা করে দিই' },
        { en: 'Self-build via API', bn: 'API দিয়ে নিজে বানান' },
        { en: 'Self-build via API', bn: 'API দিয়ে নিজে বানান' },
        { en: 'Self-build via API', bn: 'API দিয়ে নিজে বানান' },
        { en: 'Self-build via API', bn: 'API দিয়ে নিজে বানান' },
      ],
    },
    {
      feature: { en: 'Local payment (bKash/Nagad/Rocket)', bn: 'লোকাল পেমেন্ট (বিকাশ/নগদ/রকেট)' } as Bilingual,
      values: [
        { en: 'Yes', bn: 'হ্যাঁ' },
        { en: 'No (USD only)', bn: 'না (শুধু USD)' },
        { en: 'No (USD only)', bn: 'না (শুধু USD)' },
        { en: 'No (USD only)', bn: 'না (শুধু USD)' },
        { en: 'No (USD only)', bn: 'না (শুধু USD)' },
      ],
    },
    {
      feature: { en: 'Bangladeshi phone numbers', bn: 'বাংলাদেশি ফোন নম্বর' } as Bilingual,
      values: [
        { en: 'Yes (+880)', bn: 'হ্যাঁ (+৮৮০)' },
        { en: 'US numbers only', bn: 'শুধু US নম্বর' },
        { en: 'US numbers only', bn: 'শুধু US নম্বর' },
        { en: 'US numbers only', bn: 'শুধু US নম্বর' },
        { en: 'US numbers only', bn: 'শুধু US নম্বর' },
      ],
    },
    {
      feature: { en: 'In-person strategy call (Bangla/English)', bn: 'সরাসরি স্ট্র্যাটেজি কল (বাংলা/ইংরেজি)' } as Bilingual,
      values: [
        { en: 'Yes, free 30-min', bn: 'হ্যাঁ, ফ্রি ৩০-মিনিট' },
        { en: 'No', bn: 'না' },
        { en: 'No', bn: 'না' },
        { en: 'No', bn: 'না' },
        { en: 'No', bn: 'না' },
      ],
    },
    {
      feature: { en: 'Pricing transparency (BDT)', bn: 'প্রাইসিং স্বচ্ছতা (BDT)' } as Bilingual,
      values: [
        { en: 'Fixed BDT pricing', bn: 'নির্দিষ্ট BDT প্রাইসিং' },
        { en: 'Per-minute USD', bn: 'প্রতি-মিনিট USD' },
        { en: 'Per-minute USD', bn: 'প্রতি-মিনিট USD' },
        { en: 'Per-minute USD', bn: 'প্রতি-মিনিট USD' },
        { en: 'Per-minute USD', bn: 'প্রতি-মিনিট USD' },
      ],
    },
    {
      feature: { en: 'Local support team', bn: 'লোকাল সাপোর্ট টিম' } as Bilingual,
      values: [
        { en: 'Bangladesh-based, 24/7', bn: 'বাংলাদেশ-ভিত্তিক, ২৪/৭' },
        { en: 'US/email only', bn: 'শুধু US/ইমেইল' },
        { en: 'US/email only', bn: 'শুধু US/ইমেইল' },
        { en: 'US/email only', bn: 'শুধু US/ইমেইল' },
        { en: 'US/email only', bn: 'শুধু US/ইমেইল' },
      ],
    },
    {
      feature: { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' } as Bilingual,
      values: [
        { en: 'Yes', bn: 'হ্যাঁ' },
        { en: 'No', bn: 'না' },
        { en: 'No', bn: 'না' },
        { en: 'No', bn: 'না' },
        { en: 'No', bn: 'না' },
      ],
    },
  ],
  note: {
    en: 'Competitor names are trademarks of their respective owners. Comparison based on publicly available information as of Q1 2025. We respect these platforms — they are excellent for developers. We are different: we are a done-for-you service for businesses that do not want to build.',
    bn: 'প্রতিযোগীদের নাম তাদের নিজস্ব মালিকানাধীন ট্রেডমার্ক। তুলনা Q1 ২০২৫ অনুযায়ী প্রকাশ্য তথ্যের ভিত্তিতে। আমরা এই প্ল্যাটফর্মগুলোকে সম্মান করি — ডেভেলপারদের জন্য চমৎকার। আমরা আলাদা: আমরা যারা বানাতে চান না তাদের জন্য একটি ডান-ফর-ইউ সার্ভিস।',
  } as Bilingual,
}

export const COMPARISON = {
  eyebrow: { en: 'Side by side', bn: 'পাশাপাশি তুলনা' } as Bilingual,
  title: {
    en: 'Traditional Call Center vs AI Voice Agent',
    bn: 'প্রচলিত কল সেন্টার বনাম AI Voice Agent',
  } as Bilingual,
  subtitle: {
    en: 'See exactly what changes when you replace human-only call handling with AI.',
    bn: 'মানব-কেন্দ্রিক কল হ্যান্ডলিং AI দিয়ে রিপ্লেস করলে ঠিক কী বদলায় দেখুন।',
  } as Bilingual,
  headers: [
    { en: 'Feature', bn: 'ফিচার' } as Bilingual,
    { en: 'Traditional Call Center', bn: 'প্রচলিত কল সেন্টার' } as Bilingual,
  ] as Bilingual[],
  rows: [
    {
      feature: { en: 'Call answer rate', bn: 'কল অ্যান্সার রেট' },
      traditional: { en: '40–60% (missed after hours)', bn: '৪০–৬০% (অফ-আওয়ারে মিসড)' },
      ai: { en: '97% (24/7/365)', bn: '৯৭% (২৪/৭/৩৬৫)' },
    },
    {
      feature: { en: 'Pickup time', bn: 'পিকআপ টাইম' },
      traditional: { en: '15–45 seconds (IVR + queue)', bn: '১৫–৪৫ সেকেন্ড (IVR + কিউ)' },
      ai: { en: '4 seconds (instant)', bn: '৪ সেকেন্ড (ইনস্ট্যান্ট)' },
    },
    {
      feature: { en: 'Hours of coverage', bn: 'কভারেজ সময়' },
      traditional: { en: '8–10 hours, Mon–Sat', bn: '৮–১০ ঘন্টা, শনি–বৃহঃ' },
      ai: { en: '24/7/365 always-on', bn: '২৪/৭/৩৬৫ সর্বদা-অন' },
    },
    {
      feature: { en: 'Concurrent calls', bn: 'কনকারেন্ট কল' },
      traditional: { en: '1 per agent (5 max)', bn: 'প্রতি এজেন্ট ১ (সর্বোচ্চ ৫)' },
      ai: { en: '1,000+ simultaneously', bn: 'একসাথে ১,০০০+' },
    },
    {
      feature: { en: 'Cost per call', bn: 'প্রতি কল খরচ' },
      traditional: { en: '৳80–150 (salary/overhead)', bn: '৳৮০–১৫০ (স্যালারি/ওভারহেড)' },
      ai: { en: '৳5–15 (flat monthly)', bn: '৳৫–১৫ (ফ্ল্যাট মাসিক)' },
    },
    {
      feature: { en: 'Monthly cost (1000 calls)', bn: 'মাসিক খরচ (১০০০ কল)' },
      traditional: { en: '৳2–4 lakh (5 agents + office)', bn: '৳২–৪ লাখ (৫ এজেন্ট + অফিস)' },
      ai: { en: '৳35,000–55,000 flat', bn: '৳৩৫,০০০–৫৫,০০০ ফ্ল্যাট' },
    },
    {
      feature: { en: 'Language support', bn: 'ভাষা সাপোর্ট' },
      traditional: { en: 'Depends on agent hired', bn: 'নিযুক্ত এজেন্টের উপর নির্ভর' },
      ai: { en: 'Bangla + English native + 5 more', bn: 'বাংলা + ইংরেজি নেটিভ + ৫টি' },
    },
    {
      feature: { en: 'Response consistency', bn: 'রেসপন্স কনসিস্টেন্সি' },
      traditional: { en: 'Varies by mood, fatigue, training', bn: 'মুড, ক্লান্তি, ট্রেনিং অনুযায়ী ভিন্ন' },
      ai: { en: '100% consistent, every call', bn: '১০০% কনসিস্টেন্ট, প্রতিটি কলে' },
    },
    {
      feature: { en: 'CRM logging', bn: 'CRM লগিং' },
      traditional: { en: 'Manual notes, often skipped', bn: 'ম্যানুয়াল নোট, প্রায়ই স্কিপড' },
      ai: { en: 'Auto-logged with full transcript', bn: 'অটো-লগড পূর্ণ ট্রান্সক্রিপ্ট সহ' },
    },
    {
      feature: { en: 'Follow-up automation', bn: 'ফলো-আপ অটোমেশন' },
      traditional: { en: 'Manual, often forgotten', bn: 'ম্যানুয়াল, প্রায়ই ভুল' },
      ai: { en: 'Auto SMS + WhatsApp + email', bn: 'অটো SMS + WhatsApp + ইমেইল' },
    },
    {
      feature: { en: 'Call recording', bn: 'কল রেকর্ডিং' },
      traditional: { en: 'Optional, manual setup', bn: 'অপশনাল, ম্যানুয়াল সেটআপ' },
      ai: { en: 'Every call, HD audio, searchable', bn: 'প্রতিটি কল, HD অডিও, সার্চেবল' },
    },
    {
      feature: { en: 'Transcription', bn: 'ট্রান্সক্রিপশন' },
      traditional: { en: 'None or manual, costly', bn: 'নেই বা ম্যানুয়াল, ব্যয়বহুল' },
      ai: { en: 'Auto, real-time, Bangla + English', bn: 'অটো, রিয়েল-টাইম, বাংলা + ইংরেজি' },
    },
    {
      feature: { en: 'Sentiment analysis', bn: 'সেন্টিমেন্ট অ্যানালাইসিস' },
      traditional: { en: 'Impossible at scale', bn: 'স্কেলে অসম্ভব' },
      ai: { en: 'Every call, 7 emotions tracked', bn: 'প্রতিটি কল, ৭টি ইমোশন ট্র্যাকড' },
    },
    {
      feature: { en: 'Analytics dashboard', bn: 'অ্যানালিটিক্স ড্যাশবোর্ড' },
      traditional: { en: 'Basic call logs, if any', bn: 'বেসিক কল লগ, থাকলে' },
      ai: { en: 'Live dashboard, every metric', bn: 'লাইভ ড্যাশবোর্ড, প্রতিটি মেট্রিক' },
    },
    {
      feature: { en: 'Scalability', bn: 'স্কেলেবিলিটি' },
      traditional: { en: 'Hire + train + office space', bn: 'নিয়োগ + ট্রেন + অফিস স্পেস' },
      ai: { en: 'Add a number, instant', bn: 'নম্বর যোগ, তাৎক্ষণিক' },
    },
    {
      feature: { en: 'Turnover risk', bn: 'টার্নওভার ঝুঁকি' },
      traditional: { en: 'High — agents quit every 6–12 months', bn: 'উচ্চ — এজেন্ট প্রতি ৬–১২ মাসে ছাড়ে' },
      ai: { en: 'Zero — AI never quits', bn: 'জিরো — AI কখনো ছাড়ে না' },
    },
    {
      feature: { en: 'Sick leave / holidays', bn: 'সিক লিভ / ছুটি' },
      traditional: { en: 'Coverage gaps, overtime pay', bn: 'কভারেজ গ্যাপ, ওভারটাইম পে' },
      ai: { en: 'Never takes a day off', bn: 'কখনো ছুটি নেয় না' },
    },
    {
      feature: { en: 'Quality consistency', bn: 'কোয়ালিটি কনসিস্টেন্সি' },
      traditional: { en: 'Drops as shift progresses', bn: 'শিফট বাড়ার সাথে কমে' },
      ai: { en: 'Same quality, hour 1 or 24', bn: 'একই কোয়ালিটি, ঘন্টা ১ বা ২৪' },
    },
    {
      feature: { en: 'Multi-language switching', bn: 'মাল্টি-ল্যাঙ্গুয়েজ সুইচিং' },
      traditional: { en: 'Need separate agents per language', bn: 'প্রতি ভাষায় আলাদা এজেন্ট দরকার' },
      ai: { en: 'Auto-switch mid-call', bn: 'মাঝে অটো-সুইচ' },
    },
    {
      feature: { en: 'Setup time', bn: 'সেটআপ টাইম' },
      traditional: { en: '2–3 months (hire + train)', bn: '২–৩ মাস (নিয়োগ + ট্রেন)' },
      ai: { en: '3–5 days, fully live', bn: '৩–৫ দিন, সম্পূর্ণ লাইভ' },
    },
    {
      feature: { en: 'Data security', bn: 'ডেটা সিকিউরিটি' },
      traditional: { en: 'Varies — agent risk, paper notes', bn: 'ভিন্ন — এজেন্ট ঝুঁকি, কাগজ নোট' },
      ai: { en: 'GDPR + SOC2 + AES-256 + audit logs', bn: 'GDPR + SOC2 + AES-256 + অডিট লগ' },
    },
    {
      feature: { en: 'ROI visibility', bn: 'ROI ভিজিবিলিটি' },
      traditional: { en: 'Hard to measure', bn: 'মাপা কঠিন' },
      ai: { en: 'Live dashboard, every taka tracked', bn: 'লাইভ ড্যাশবোর্ড, প্রতিটি টাকা ট্র্যাকড' },
    },
  ],
}

/* ========================================================================== */
/*  19. BEFORE / AFTER (15 pairs)                                              */
/* ========================================================================== */

export const BEFORE_AFTER = {
  eyebrow: { en: 'The transformation', bn: 'ট্রান্সফরমেশন' } as Bilingual,
  title: {
    en: 'Before vs After AI Voice Agent',
    bn: 'AI Voice Agent-এর আগে বনাম পরে',
  } as Bilingual,
  subtitle: {
    en: 'What changes the day you flip the switch on your AI Voice Agent.',
    bn: 'আপনি AI Voice Agent চালু করার দিন কী বদলায়।',
  } as Bilingual,
  pairs: [
    {
      before: { en: '60% calls missed', bn: '৬০% কল মিসড' } as Bilingual,
      after: { en: '97% calls answered', bn: '৯৭% কল অ্যান্সারড' } as Bilingual,
    },
    {
      before: { en: '48-hour response time', bn: '৪৮-ঘন্টা রেসপন্স টাইম' } as Bilingual,
      after: { en: '4-second pickup, instant', bn: '৪-সেকেন্ড পিকআপ, তাৎক্ষণিক' } as Bilingual,
    },
    {
      before: { en: 'Business hours only', bn: 'শুধু বিজনেস আওয়ার' } as Bilingual,
      after: { en: '24/7/365 always-on', bn: '২৪/৭/৩৬৫ সর্বদা-অন' } as Bilingual,
    },
    {
      before: { en: '1 call at a time', bn: 'একসাথে ১ কল' } as Bilingual,
      after: { en: '1,000+ simultaneous calls', bn: 'একসাথে ১,০০০+ কল' } as Bilingual,
    },
    {
      before: { en: 'No CRM logging', bn: 'কোনো CRM লগিং নেই' } as Bilingual,
      after: { en: 'Auto-logged with transcript + notes', bn: 'অটো-লগড ট্রান্সক্রিপ্ট + নোট সহ' } as Bilingual,
    },
    {
      before: { en: 'Manual appointment booking', bn: 'ম্যানুয়াল অ্যাপয়েন্টমেন্ট বুকিং' } as Bilingual,
      after: { en: 'Auto-booked in 30 seconds', bn: '৩০ সেকেন্ডে অটো-বুকড' } as Bilingual,
    },
    {
      before: { en: 'No follow-up', bn: 'কোনো ফলো-আপ নেই' } as Bilingual,
      after: { en: 'Auto SMS + WhatsApp + email', bn: 'অটো SMS + WhatsApp + ইমেইল' } as Bilingual,
    },
    {
      before: { en: 'Bangla only (if agent is local)', bn: 'শুধু বাংলা (এজেন্ট লোকাল হলে)' } as Bilingual,
      after: { en: 'Bangla + English + 5 more languages', bn: 'বাংলা + ইংরেজি + ৫টি ভাষা' } as Bilingual,
    },
    {
      before: { en: 'Inconsistent answers', bn: 'অসামঞ্জস্যপূর্ণ উত্তর' } as Bilingual,
      after: { en: '100% consistent, on-brand', bn: '১০০% কনসিস্টেন্ট, অন-ব্র্যান্ড' } as Bilingual,
    },
    {
      before: { en: 'No call recordings', bn: 'কোনো কল রেকর্ডিং নেই' } as Bilingual,
      after: { en: 'Every call recorded, searchable', bn: 'প্রতিটি কল রেকর্ডেড, সার্চেবল' } as Bilingual,
    },
    {
      before: { en: 'No analytics', bn: 'কোনো অ্যানালিটিক্স নেই' } as Bilingual,
      after: { en: 'Live dashboard, every metric', bn: 'লাইভ ড্যাশবোর্ড, প্রতিটি মেট্রিক' } as Bilingual,
    },
    {
      before: { en: '৳2–4 lakh/month for 5 agents', bn: '৳২–৪ লাখ/মাস ৫ এজেন্টের জন্য' } as Bilingual,
      after: { en: '৳35,000–55,000 flat monthly', bn: '৳৩৫,০০০–৫৫,০০০ ফ্ল্যাট মাসিক' } as Bilingual,
    },
    {
      before: { en: 'Hire + train + 3 months to scale', bn: 'নিয়োগ + ট্রেন + স্কেলে ৩ মাস' } as Bilingual,
      after: { en: 'Add a number, instant scale', bn: 'নম্বর যোগ, তাৎক্ষণিক স্কেল' } as Bilingual,
    },
    {
      before: { en: 'Agent turnover every 6–12 months', bn: 'প্রতি ৬–১২ মাসে এজেন্ট টার্নওভার' } as Bilingual,
      after: { en: 'AI never quits, zero turnover', bn: 'AI কখনো ছাড়ে না, জিরো টার্নওভার' } as Bilingual,
    },
    {
      before: { en: 'No sentiment data', bn: 'কোনো সেন্টিমেন্ট ডেটা নেই' } as Bilingual,
      after: { en: '7 emotions tracked every call', bn: 'প্রতিটি কলে ৭টি ইমোশন ট্র্যাকড' } as Bilingual,
    },
  ],
}

/* ========================================================================== */
/*  20. AI VS HUMAN DEMO (8 rows)                                              */
/* ========================================================================== */

export const AI_VS_HUMAN_DEMO = {
  eyebrow: { en: 'AI vs Human — head to head', bn: 'AI বনাম হিউম্যান — মুখোমুখি' } as Bilingual,
  title: {
    en: 'See the difference, call by call',
    bn: 'পার্থক্য দেখুন, কলে কলে',
  } as Bilingual,
  subtitle: {
    en: 'Same call, same customer, two different experiences. The gap is enormous.',
    bn: 'একই কল, একই গ্রাহক, দুই ভিন্ন অভিজ্ঞতা। ফারাক বিশাল।',
  } as Bilingual,
  rows: [
    {
      metric: { en: 'Response time', bn: 'রেসপন্স টাইম' },
      human: { en: '15–45 seconds', bn: '১৫–৪৫ সেকেন্ড' },
      ai: { en: '<4 seconds', bn: '<৪ সেকেন্ড' },
    },
    {
      metric: { en: 'Availability', bn: 'অ্যাভেইলেবিলিটি' },
      human: { en: '8 hours/day, Mon–Sat', bn: 'দিনে ৮ ঘন্টা, শনি–বৃহঃ' },
      ai: { en: '24/7/365', bn: '২৪/৭/৩৬৫' },
    },
    {
      metric: { en: 'Cost per call', bn: 'প্রতি কল খরচ' },
      human: { en: '৳80–150', bn: '৳৮০–১৫০' },
      ai: { en: '৳5–15', bn: '৳৫–১৫' },
    },
    {
      metric: { en: 'Languages', bn: 'ভাষা' },
      human: { en: '1–2 (if trained)', bn: '১–২ (ট্রেইনড হলে)' },
      ai: { en: '7+ auto-switch', bn: '৭+ অটো-সুইচ' },
    },
    {
      metric: { en: 'Consistency', bn: 'কনসিস্টেন্সি' },
      human: { en: 'Varies by mood/fatigue', bn: 'মুড/ক্লান্তি অনুযায়ী ভিন্ন' },
      ai: { en: '100% every call', bn: 'প্রতিটি কলে ১০০%' },
    },
    {
      metric: { en: 'CRM update', bn: 'CRM আপডেট' },
      human: { en: 'Manual, often skipped', bn: 'ম্যানুয়াল, প্রায়ই স্কিপড' },
      ai: { en: 'Real-time, automatic', bn: 'রিয়েল-টাইম, স্বয়ংক্রিয়' },
    },
    {
      metric: { en: 'Follow-up', bn: 'ফলো-আপ' },
      human: { en: 'Forgotten half the time', bn: 'অর্ধেক সময় ভুল' },
      ai: { en: '100% automated', bn: '১০০% অটোমেটেড' },
    },
    {
      metric: { en: 'Scalability', bn: 'স্কেলেবিলিটি' },
      human: { en: 'Linear (more hires)', bn: 'লিনিয়ার (আরও নিয়োগ)' },
      ai: { en: 'Infinite, flat cost', bn: 'আনলিমিটেড, ফ্ল্যাট খরচ' },
    },
  ],
}

/* ========================================================================== */
/*  21. ROI CALCULATOR                                                         */
/* ========================================================================== */

export const ROI_CALCULATOR = {
  eyebrow: { en: 'See your numbers', bn: 'আপনার সংখ্যা দেখুন' } as Bilingual,
  title: {
    en: 'AI Voice Agent ROI Calculator',
    bn: 'AI Voice Agent ROI ক্যালকুলেটর',
  } as Bilingual,
  subtitle: {
    en: 'Drag the sliders to match your business. See your projected savings in real-time.',
    bn: 'স্লাইডার টেনে আপনার ব্যবসার সাথে মিলিয়ে নিন। রিয়েল-টাইমে আপনার প্রজেক্টেড সেভিংস দেখুন।',
  } as Bilingual,
  inputs: [
    {
      key: 'monthlyCalls',
      label: { en: 'Monthly phone calls', bn: 'মাসিক ফোন কল' },
      min: 100, max: 5000, step: 50, default: 500,
      fmt: 'int',
    },
    {
      key: 'missedCallPct',
      label: { en: 'Missed call rate (%)', bn: 'মিসড কল রেট (%)' },
      min: 10, max: 80, step: 5, default: 35,
      fmt: 'pct',
    },
    {
      key: 'conversionRate',
      label: { en: 'Conversion rate (%)', bn: 'কনভার্সন রেট (%)' },
      min: 5, max: 50, step: 1, default: 20,
      fmt: 'pct',
    },
    {
      key: 'avgDealSize',
      label: { en: 'Average deal size (৳)', bn: 'গড় ডিল সাইজ (৳)' },
      min: 1000, max: 200000, step: 1000, default: 15000,
      fmt: 'bdt',
    },
    {
      key: 'teamCostMonthly',
      label: { en: 'Monthly team cost (৳)', bn: 'মাসিক টিম খরচ (৳)' },
      min: 10000, max: 500000, step: 5000, default: 40000,
      fmt: 'bdt',
    },
    {
      key: 'responseTimeMin',
      label: { en: 'Current response time (min)', bn: 'বর্তমান রেসপন্স টাইম (মিনিট)' },
      min: 1, max: 480, step: 1, default: 3,
      fmt: 'int',
    },
  ],
  results: [
    { key: 'revenueSaved', label: { en: 'Annual revenue saved', bn: 'বার্ষিক রেভিনিউ সেভড' }, fmt: 'bdt' },
    { key: 'hoursSaved', label: { en: 'Annual hours saved', bn: 'বার্ষিক ঘন্টা সেভড' }, fmt: 'int' },
    { key: 'appointmentsBooked', label: { en: 'Extra appointments/year', bn: 'অতিরিক্ত অ্যাপয়েন্টমেন্ট/বছর' }, fmt: 'int' },
    { key: 'roiMultiple', label: { en: 'ROI multiple', bn: 'ROI গুণিতক' }, fmt: 'x' },
    { key: 'paybackWeeks', label: { en: 'Payback period (weeks)', bn: 'পেব্যাক পিরিয়ড (সপ্তাহ)' }, fmt: 'int' },
  ],
  note: {
    en: 'Estimates based on industry benchmarks. Setup cost assumed at ৳60,000. Your actual ROI may vary — book a free call for a custom projection.',
    bn: 'ইন্ডাস্ট্রি বেঞ্চমার্কের উপর ভিত্তি। সেটআপ খরচ ৳৬০,০০০ ধরা হয়েছে। আপনার আসল ROI ভিন্ন হতে পারে — কাস্টম প্রজেকশনের জন্য ফ্রি কল বুক করুন।',
  } as Bilingual,
}

/* ========================================================================== */
/*  22. CALL FLOW (8 steps)                                                    */
/* ========================================================================== */

export const CALL_FLOW = {
  eyebrow: { en: 'The call journey', bn: 'কল জার্নি' } as Bilingual,
  title: {
    en: '8 steps from ring to closed deal',
    bn: 'রিং থেকে ক্লোজড ডিল — ৮ ধাপে',
  } as Bilingual,
  subtitle: {
    en: 'Every call follows this proven flow — designed to convert callers into customers.',
    bn: 'প্রতিটি কল এই প্রমাণিত ফ্লো অনুসরণ করে — কলারকে গ্রাহকে রূপান্তরে ডিজাইনড।',
  } as Bilingual,
  steps: [
    { icon: 'phone-call', label: { en: 'Incoming', bn: 'ইনকামিং' } },
    { icon: 'message-circle', label: { en: 'Greeting', bn: 'গ্রিটিং' } },
    { icon: 'brain', label: { en: 'Conversation', bn: 'কনভার্সেশন' } },
    { icon: 'filter', label: { en: 'Qualification', bn: 'কোয়ালিফিকেশন' } },
    { icon: 'calendar-check', label: { en: 'Booking', bn: 'বুকিং' } },
    { icon: 'database', label: { en: 'CRM', bn: 'CRM' } },
    { icon: 'refresh-cw', label: { en: 'Follow-up', bn: 'ফলো-আপ' } },
    { icon: 'users', label: { en: 'Sales Team', bn: 'সেলস টিম' } },
  ],
}

/* ========================================================================== */
/*  23. AUTOMATION WORKFLOWS (10)                                              */
/* ========================================================================== */

export const AUTOMATION_WORKFLOWS = {
  eyebrow: { en: 'Pre-built workflows', bn: 'প্রি-বিল্ট ওয়ার্কফ্লো' } as Bilingual,
  title: {
    en: '10 ready-to-launch call workflows',
    bn: '১০টি রেডি-টু-লঞ্চ কল ওয়ার্কফ্লো',
  } as Bilingual,
  subtitle: {
    en: 'Each workflow is pre-built, tested, and ready to deploy in your business — day one.',
    bn: 'প্রতিটি ওয়ার্কফ্লো প্রি-বিল্ট, টেস্টেড ও আপনার ব্যবসায় ডিপ্লয় করার জন্য রেডি — প্রথম দিনেই।',
  } as Bilingual,
  items: [
    {
      icon: 'filter',
      title: { en: 'Lead Qualification Flow', bn: 'লিড কোয়ালিফিকেশন ফ্লো' },
      desc: { en: 'AI asks 5 smart questions, scores lead 0–100, routes hot leads to sales instantly.', bn: 'AI ৫টি স্মার্ট প্রশ্ন করে, লিড ০–১০০ স্কোর করে, হট লিড সেলসে তাৎক্ষণিকভাবে রাউট করে।' },
    },
    {
      icon: 'calendar-check',
      title: { en: 'Appointment Booking Flow', bn: 'অ্যাপয়েন্টমেন্ট বুকিং ফ্লো' },
      desc: { en: 'Checks calendar, proposes 3 slots, confirms, sends SMS/WhatsApp/email reminders.', bn: 'ক্যালেন্ডার দেখে, ৩টি স্লট প্রপোজ করে, কনফার্ম করে, SMS/WhatsApp/ইমেইল রিমাইন্ডার পাঠায়।' },
    },
    {
      icon: 'bell',
      title: { en: 'Reminder Flow', bn: 'রিমাইন্ডার ফ্লো' },
      desc: { en: 'Auto-call 24h and 1h before appointment. Reduces no-shows by 60%.', bn: 'অ্যাপয়েন্টমেন্টের ২৪ঘ ও ১ঘ আগে অটো-কল। No-show ৬০% কমায়।' },
    },
    {
      icon: 'credit-card',
      title: { en: 'Payment Collection Flow', bn: 'পেমেন্ট কালেকশন ফ্লো' },
      desc: { en: 'AI calls overdue customers, offers payment plans, sends bKash/Nagad links via SMS.', bn: 'AI ওভারডিউ গ্রাহককে কল করে, পেমেন্ট প্ল্যান অফার করে, SMS-এ bKash/Nagad লিংক পাঠায়।' },
    },
    {
      icon: 'headset',
      title: { en: 'Support Triage Flow', bn: 'সাপোর্ট ট্রায়েজ ফ্লো' },
      desc: { en: 'AI identifies issue type, attempts resolution from KB, escalates complex cases to right agent.', bn: 'AI ইস্যু টাইপ চিহ্নিত করে, KB থেকে রেজল্যুশন চেষ্টা করে, জটিল কেস সঠিক এজেন্টে এসকেলেট করে।' },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'Renewal Flow', bn: 'রিনিউয়াল ফ্লো' },
      desc: { en: 'Auto-call 7 days before subscription/policy expiry. Offers renewal, takes payment.', bn: 'সাবস্ক্রিপশন/পলিসি এক্সপায়রির ৭ দিন আগে অটো-কল। রিনিউয়াল অফার, পেমেন্ট নেয়।' },
    },
    {
      icon: 'trending-up',
      title: { en: 'Upsell Flow', bn: 'আপসেল ফ্লো' },
      desc: { en: 'After successful resolution, AI offers relevant upgrade/cross-sell. 20% conversion typical.', bn: 'সফল রেজল্যুশনের পর AI প্রাসঙ্গিক আপগ্রেড/ক্রস-সেল অফার করে। ২০% কনভার্সন টিপিক্যাল।' },
    },
    {
      icon: 'message-square',
      title: { en: 'Survey Flow', bn: 'সার্ভে ফ্লো' },
      desc: { en: 'Post-call NPS + CSAT survey. AI captures feedback, routes negative scores to manager.', bn: 'পোস্ট-কল NPS + CSAT সার্ভে। AI ফিডব্যাক ক্যাপচার করে, নেগেটিভ স্কোর ম্যানেজারে রাউট করে।' },
    },
    {
      icon: 'alert-triangle',
      title: { en: 'Complaint Flow', bn: 'কমপ্লেইন্ট ফ্লো' },
      desc: { en: 'AI detects complaint language, apologises, logs issue, escalates to senior agent immediately.', bn: 'AI কমপ্লেইন্ট ভাষা ডিটেক্ট করে, দুঃখপ্রকাশ করে, ইস্যু লগ করে, সিনিয়র এজেন্টে তাৎক্ষণিকভাবে এসকেলেট করে।' },
    },
    {
      icon: 'phone',
      title: { en: 'Callback Flow', bn: 'কলব্যাক ফ্লো' },
      desc: { en: 'If line busy or customer requests, AI schedules callback at preferred time, calls automatically.', bn: 'লাইন ব্যস্ত বা গ্রাহক রিকোয়েস্ট করলে, AI পছন্দের সময়ে কলব্যাক শিডিউল করে, স্বয়ংক্রিয়ভাবে কল করে।' },
    },
  ],
}

/* ========================================================================== */
/*  24. DASHBOARD PREVIEW                                                      */
/* ========================================================================== */

export const DASHBOARD_PREVIEW = {
  eyebrow: { en: 'Your command center', bn: 'আপনার কমান্ড সেন্টার' } as Bilingual,
  title: {
    en: 'See every call, every metric, every taka',
    bn: 'প্রতিটি কল, প্রতিটি মেট্রিক, প্রতিটি টাকা দেখুন',
  } as Bilingual,
  subtitle: {
    en: 'Real-time dashboard — call volume, missed %, bookings, sentiment, revenue. All in one place.',
    bn: 'রিয়েল-টাইম ড্যাশবোর্ড — কল ভলিউম, মিসড %, বুকিং, সেন্টিমেন্ট, রেভিনিউ। সব এক জায়গায়।',
  } as Bilingual,
  metrics: [
    { label: { en: 'Calls today', bn: 'আজকের কল' }, value: '247', trend: '+12%' },
    { label: { en: 'Answer rate', bn: 'অ্যান্সার রেট' }, value: '97%', trend: '+5%' },
    { label: { en: 'Appointments booked', bn: 'বুকড অ্যাপয়েন্টমেন্ট' }, value: '38', trend: '+22%' },
    { label: { en: 'Avg response time', bn: 'গড় রেসপন্স টাইম' }, value: '4.2s', trend: '-18%' },
    { label: { en: 'Positive sentiment', bn: 'পজিটিভ সেন্টিমেন্ট' }, value: '89%', trend: '+7%' },
    { label: { en: 'Revenue today', bn: 'আজকের রেভিনিউ' }, value: '৳2.4L', trend: '+34%' },
  ],
  note: {
    en: 'Dashboard updates in real-time. Customisable widgets, exportable reports, role-based access.',
    bn: 'ড্যাশবোর্ড রিয়েল-টাইমে আপডেট হয়। কাস্টমাইজেবল উইজেট, এক্সপোর্টেবল রিপোর্ট, রোল-বেসড অ্যাক্সেস।',
  } as Bilingual,
}

/* ========================================================================== */
/*  25. CASE STUDIES (6 detailed)                                              */
/* ========================================================================== */

export const CASE_STUDIES = {
  eyebrow: { en: 'Real results, real businesses', bn: 'বাস্তব ফলাফল, বাস্তব ব্যবসা' } as Bilingual,
  title: {
    en: '6 businesses transformed with AI Voice',
    bn: '৬টি ব্যবসা AI Voice দিয়ে বদলে গেছে',
  } as Bilingual,
  subtitle: {
    en: 'Each came with missed calls and lost revenue. Each left with a 24/7 AI voice system that prints appointments.',
    bn: 'প্রত্যেকে মিসড কল ও হারানো রেভিনিউ নিয়ে এসেছিল। প্রত্যেকে এমন AI ভয়েস সিস্টেম নিয়ে গেল যা অ্যাপয়েন্টমেন্ট ছাপে।',
  } as Bilingual,
  items: [
    {
      company: { en: 'Rahim Builders', bn: 'রহিম বিল্ডার্স' },
      industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      location: { en: 'Dhaka', bn: 'ঢাকা' },
      problem: { en: '50% of inquiry calls missed after hours. Sales team overwhelmed during peak. ৳15L/month in lost opportunities.', bn: '৫০% ইনকোয়ারি কল অফ-আওয়ারে মিসড। পিক আওয়ারে সেলস টিম ওভারহেলমড। মাসে ৳১৫ লাখ হারানো সুযোগ।' },
      solution: { en: 'Deployed AI Voice Agent with Bangla + English fluency. Integrated with HubSpot CRM and Google Calendar. Trained on 50+ property FAQs.', bn: 'বাংলা + ইংরেজি দক্ষতা সহ AI Voice Agent ডিপ্লয় করা হয়। HubSpot CRM ও Google Calendar-এ ইন্টিগ্রেট করা হয়। ৫০+ প্রপার্টি FAQ-এ ট্রেইনড।' },
      implementation: { en: '4-day setup, 2-day testing, 1-day team training. Live in 7 days.', bn: '৪-দিন সেটআপ, ২-দিন টেস্টিং, ১-দিন টিম ট্রেনিং। ৭ দিনে লাইভ।' },
      results: [
        { en: 'Missed calls down from 50% to 3%', bn: 'মিসড কল ৫০% থেকে ৩%' },
        { en: 'Property viewings up 3.2x', bn: 'প্রপার্টি ভিউয়িং ৩.২x বেশি' },
        { en: 'Sales cycle shortened by 40%', bn: 'সেলস সাইকেল ৪০% ছোট' },
      ],
      metrics: [
        { label: { en: 'Missed calls reduced', bn: 'মিসড কল কমেছে' }, value: '94%' },
        { label: { en: 'Viewings/month', bn: 'ভিউয়িং/মাস' }, value: '160+' },
        { label: { en: 'Revenue lift', bn: 'রেভিনিউ বৃদ্ধি' }, value: '৳18L' },
      ],
      roi: '6.4x',
    },
    {
      company: { en: 'MediCare Clinic', bn: 'মেডিকেয়ার ক্লিনিক' },
      industry: { en: 'Healthcare', bn: 'হেলথকেয়ার' },
      location: { en: 'Chittagong', bn: 'চট্টগ্রাম' },
      problem: { en: '2-line front desk, 200+ calls/day. Patients on hold 10+ minutes. No-show rate 35%.', bn: '২-লাইন ফ্রন্ট ডেস্ক, দিনে ২০০+ কল। রোগী ১০+ মিনিট হোল্ডে। No-show রেট ৩৫%।' },
      solution: { en: 'AI Voice Agent handles appointments, reschedules, prescription refill reminders. Integrated with clinic management software.', bn: 'AI Voice Agent অ্যাপয়েন্টমেন্ট, রিশিডিউল, প্রেসক্রিপশন রিফিল রিমাইন্ডার হ্যান্ডেল করে। ক্লিনিক ম্যানেজমেন্ট সফটওয়্যারে ইন্টিগ্রেটেড।' },
      implementation: { en: '5-day setup including doctor calendar integration. Team trained in 1 day.', bn: 'ডাক্তার ক্যালেন্ডার ইন্টিগ্রেশন সহ ৫-দিন সেটআপ। টিম ১ দিনে ট্রেইনড।' },
      results: [
        { en: 'No-show rate dropped to 12%', bn: 'No-show রেট ১২%-এ নেমেছে' },
        { en: 'Front desk load reduced 70%', bn: 'ফ্রন্ট ডেস্ক লোড ৭০% কমেছে' },
        { en: 'Patient satisfaction 4.8★', bn: 'রোগী সন্তুষ্টি ৪.৮★' },
      ],
      metrics: [
        { label: { en: 'No-show reduced', bn: 'No-show কমেছে' }, value: '66%' },
        { label: { en: 'Appointments/day', bn: 'অ্যাপয়েন্টমেন্ট/দিন' }, value: '85+' },
        { label: { en: 'Cost saved/month', bn: 'মাসে সেভড' }, value: '৳1.2L' },
      ],
      roi: '4.8x',
    },
    {
      company: { en: 'Bright Future Academy', bn: 'ব্রাইট ফিউচার একাডেমি' },
      industry: { en: 'Education', bn: 'শিক্ষা' },
      location: { en: 'Khulna', bn: 'খুলনা' },
      problem: { en: 'Admission season = 1000+ inquiry calls/day. Staff could answer 200. Rest went to voicemail.', bn: 'অ্যাডমিশন সিজন = দিনে ১০০০+ ইনকোয়ারি কল। স্টাফ ২০০ উত্তর দিতে পারত। বাকিগুলো ভয়েসমেইলে।' },
      solution: { en: 'AI Voice Agent handles course info, fee structure, admission process, campus visit bookings. 5 languages.', bn: 'AI Voice Agent কোর্স ইনফো, ফি স্ট্রাকচার, অ্যাডমিশন প্রসেস, ক্যাম্পাস ভিজিট বুকিং হ্যান্ডেল করে। ৫টি ভাষা।' },
      implementation: { en: '3-day setup. AI trained on admission brochure, fee schedule, course catalog.', bn: '৩-দিন সেটআপ। AI অ্যাডমিশন ব্রোশিওর, ফি শিডিউল, কোর্স ক্যাটালগে ট্রেইনড।' },
      results: [
        { en: '100% calls answered, 24/7', bn: '১০০% কল অ্যান্সারড, ২৪/৭' },
        { en: 'Applications up 65%', bn: 'অ্যাপ্লিকেশন ৬৫% বেশি' },
        { en: 'Campus visits booked 4x', bn: 'ক্যাম্পাস ভিজিট বুকড ৪x' },
      ],
      metrics: [
        { label: { en: 'Inquiry capacity', bn: 'ইনকোয়ারি ক্যাপাসিটি' }, value: '5x' },
        { label: { en: 'Applications', bn: 'অ্যাপ্লিকেশন' }, value: '780+' },
        { label: { en: 'Revenue lift', bn: 'রেভিনিউ বৃদ্ধি' }, value: '৳32L' },
      ],
      roi: '8.1x',
    },
    {
      company: { en: 'Jessore Steel Mills', bn: 'যশোর স্টিল মিলস' },
      industry: { en: 'Manufacturing', bn: 'ম্যানুফ্যাকচারিং' },
      location: { en: 'Jessore', bn: 'যশোর' },
      problem: { en: 'Distributor/supplier calls during production hours got ignored. Order status updates ate staff time.', bn: 'প্রোডাকশন আওয়ারে ডিস্ট্রিবিউটর/সাপ্লায়ার কল ইগনর হতো। অর্ডার স্ট্যাটাস আপডেটে স্টাফ সময় নষ্ট।' },
      solution: { en: 'AI Voice Agent coordinates suppliers, gives order status from ERP, schedules deliveries, escalates delays.', bn: 'AI Voice Agent সাপ্লায়ার কোঅর্ডিনেট করে, ERP থেকে অর্ডার স্ট্যাটাস দেয়, ডেলিভারি শিডিউল করে, দেরি এসকেলেট করে।' },
      implementation: { en: '7-day setup including ERP integration and supplier database import.', bn: 'ERP ইন্টিগ্রেশন ও সাপ্লায়ার ডেটাবেস ইম্পোর্ট সহ ৭-দিন সেটআপ।' },
      results: [
        { en: 'Zero missed supplier calls', bn: 'জিরো মিসড সাপ্লায়ার কল' },
        { en: 'Order coordination 50% faster', bn: 'অর্ডার কোঅর্ডিনেশন ৫০% দ্রুত' },
        { en: 'Delivery delays down 30%', bn: 'ডেলিভারি দেরি ৩০% কম' },
      ],
      metrics: [
        { label: { en: 'Calls handled/day', bn: 'কল হ্যান্ডেলড/দিন' }, value: '180+' },
        { label: { en: 'Coordination speed', bn: 'কোঅর্ডিনেশন স্পিড' }, value: '2x' },
        { label: { en: 'Cost saved/year', bn: 'সেভড/বছর' }, value: '৳14L' },
      ],
      roi: '5.2x',
    },
    {
      company: { en: 'Shield Insurance Ltd', bn: 'শিল্ড ইন্স্যুরেন্স লিমিটেড' },
      industry: { en: 'Insurance', bn: 'ইন্স্যুরেন্স' },
      location: { en: 'Dhaka', bn: 'ঢাকা' },
      problem: { en: 'Policy inquiry + claim status calls flooded lines. Agents burned out. New policy sales flat.', bn: 'পলিসি ইনকোয়ারি + ক্লেম স্ট্যাটাস কলে লাইন ফ্লাড। এজেন্ট বার্নআউট। নতুন পলিসি সেলস স্থির।' },
      solution: { en: 'AI Voice Agent answers policy questions, gives claim status, generates leads for new policies, books agent callbacks.', bn: 'AI Voice Agent পলিসি প্রশ্নের উত্তর দেয়, ক্লেম স্ট্যাটাস দেয়, নতুন পলিসির জন্য লিড জেনারেট করে, এজেন্ট কলব্যাক বুক করে।' },
      implementation: { en: '10-day setup, integrated with policy management system, claim status API, and lead routing.', bn: '১০-দিন সেটআপ, পলিসি ম্যানেজমেন্ট সিস্টেম, ক্লেম স্ট্যাটাস API, ও লিড রাউটিংয়ে ইন্টিগ্রেটেড।' },
      results: [
        { en: '70% calls auto-handled', bn: '৭০% কল অটো-হ্যান্ডেলড' },
        { en: 'New policy sales up 3x', bn: 'নতুন পলিসি সেলস ৩x বেশি' },
        { en: 'Agent burnout down 50%', bn: 'এজেন্ট বার্নআউট ৫০% কম' },
      ],
      metrics: [
        { label: { en: 'Calls auto-handled', bn: 'কল অটো-হ্যান্ডেলড' }, value: '70%' },
        { label: { en: 'New policies/mo', bn: 'নতুন পলিসি/মাস' }, value: '320+' },
        { label: { en: 'Revenue lift', bn: 'রেভিনিউ বৃদ্ধি' }, value: '৳45L' },
      ],
      roi: '9.3x',
    },
    {
      company: { en: 'Sea Pearl Resort', bn: 'সি পার্ল রিসোর্ট' },
      industry: { en: 'Hotel', bn: 'হোটেল' },
      location: { en: "Cox's Bazar", bn: 'কক্সবাজার' },
      problem: { en: 'Front desk juggling check-ins, calls, requests. Reservations lost during peak. 1-star reviews piling up.', bn: 'ফ্রন্ট ডেস্ক চেক-ইন, কল, রিকোয়েস্ট জাগলিং। পিকে রিজারভেশন হারায়। ১-স্টার রিভিউ জমছে।' },
      solution: { en: 'AI Voice Agent handles reservations 24/7, room service requests, info inquiries, special requests, event bookings.', bn: 'AI Voice Agent ২৪/৭ রিজারভেশন, রুম সার্ভিস রিকোয়েস্ট, ইনফো ইনকোয়ারি, স্পেশাল রিকোয়েস্ট, ইভেন্ট বুকিং হ্যান্ডেল করে।' },
      implementation: { en: '5-day setup, integrated with hotel PMS, payment gateway, and review solicitation flow.', bn: '৫-দিন সেটআপ, হোটেল PMS, পেমেন্ট গেটওয়ে, ও রিভিউ সলিসিটেশন ফ্লোতে ইন্টিগ্রেটেড।' },
      results: [
        { en: 'Direct bookings up 30%', bn: 'ডাইরেক্ট বুকিং ৩০% বেশি' },
        { en: 'Front desk load down 50%', bn: 'ফ্রন্ট ডেস্ক লোড ৫০% কম' },
        { en: 'Rating jumped to 4.8★', bn: 'রেটিং ৪.৮★-এ লাফ' },
      ],
      metrics: [
        { label: { en: 'Direct bookings', bn: 'ডাইরেক্ট বুকিং' }, value: '+30%' },
        { label: { en: 'Front desk load', bn: 'ফ্রন্ট ডেস্ক লোড' }, value: '-50%' },
        { label: { en: 'Rating', bn: 'রেটিং' }, value: '4.8★' },
      ],
      roi: '5.7x',
    },
  ],
}

/* ========================================================================== */
/*  26. TESTIMONIALS (8)                                                       */
/* ========================================================================== */

export const TESTIMONIALS = {
  eyebrow: { en: 'What clients say', bn: 'ক্লায়েন্ট কী বলেন' } as Bilingual,
  title: {
    en: 'Real words from real business owners',
    bn: 'বাস্তব ব্যবসায়ীদের বাস্তব কথা',
  } as Bilingual,
  subtitle: {
    en: 'These businesses replaced missed calls with AI Voice. Here is what changed for them.',
    bn: 'এই ব্যবসাগুলো মিসড কল AI Voice দিয়ে রিপ্লেস করেছে। তাদের জন্য কী বদলেছে এখানে।',
  } as Bilingual,
  items: [
    {
      author: { en: 'Rahim Ahmed', bn: 'রহিম আহমেদ' },
      role: { en: 'Managing Director', bn: 'ম্যানেজিং ডিরেক্টর' },
      company: { en: 'Rahim Builders', bn: 'রহিম বিল্ডার্স' },
      industry: { en: 'Real Estate, Dhaka', bn: 'রিয়েল এস্টেট, ঢাকা' },
      before: { en: '50% calls missed, ৳15L/month lost.', bn: '৫০% কল মিসড, মাসে ৳১৫ লাখ হারাতাম।' },
      after: { en: '97% answered, 3x more viewings.', bn: '৯৭% অ্যান্সারড, ৩x বেশি ভিউয়িং।' },
      quote: {
        en: 'The first weekend after going live, AI answered 47 calls at 2 AM. Three of those became ৳40 lakh deals. I made back the entire year\'s cost in 4 days.',
        bn: 'লাইভ হওয়ার প্রথম সপ্তাহান্তে, AI রাত ২টায় ৪৭টি কল রিসিভ করল। তার মধ্যে তিনটি ৳৪০ লাখের ডিল হলো। পুরো বছরের খরচ ৪ দিনেই উঠে গেল।',
      },
      rating: 5,
    },
    {
      author: { en: 'Dr. Salma Akter', bn: 'ডা. সালমা আক্তার' },
      role: { en: 'Chief Physician', bn: 'চিফ ফিজিশিয়ান' },
      company: { en: 'MediCare Clinic', bn: 'মেডিকেয়ার ক্লিনিক' },
      industry: { en: 'Healthcare, Chittagong', bn: 'হেলথকেয়ার, চট্টগ্রাম' },
      before: { en: '35% no-show rate, front desk chaos.', bn: '৩৫% no-show রেট, ফ্রন্ট ডেস্কে বিশৃঙ্খলা।' },
      after: { en: 'No-show down to 12%, 70% less load.', bn: 'No-show ১২%-এ নেমেছে, লোড ৭০% কমেছে।' },
      quote: {
        en: 'Patients used to wait 10 minutes on hold. Now AI picks up in 4 seconds, books in Bangla, sends WhatsApp reminder. Our Google reviews went from 3.8 to 4.8 stars in 60 days.',
        bn: 'রোগীরা আগে ১০ মিনিট হোল্ডে অপেক্ষা করতেন। এখন AI ৪ সেকেন্ডে পিকআপ করে, বাংলায় বুক করে, WhatsApp রিমাইন্ডার পাঠায়। ৬০ দিনে আমাদের Google রেটিং ৩.৮ থেকে ৪.৮-এ উঠেছে।',
      },
      rating: 5,
    },
    {
      author: { en: 'Tanvir Khan', bn: 'তানভীর খান' },
      role: { en: 'Director of Admissions', bn: 'অ্যাডমিশন ডিরেক্টর' },
      company: { en: 'Bright Future Academy', bn: 'ব্রাইট ফিউচার একাডেমি' },
      industry: { en: 'Education, Khulna', bn: 'শিক্ষা, খুলনা' },
      before: { en: '1000+ calls/day, only 200 answered.', bn: 'দিনে ১০০০+ কল, মাত্র ২০০ উত্তর পেতাম।' },
      after: { en: '100% answered, applications up 65%.', bn: '১০০% উত্তর, অ্যাপ্লিকেশন ৬৫% বেশি।' },
      quote: {
        en: 'Admission season used to be a nightmare — phone ringing nonstop, parents frustrated, staff in tears. AI now handles every call, in Bangla or English, books campus visits. We got 780 applications vs 470 last year.',
        bn: 'অ্যাডমিশন সিজন ছিল দুঃস্বপ্ন — ফোন ননস্টপ বাজত, অভিভাবকরা ফ্রাস্ট্রেটেড, স্টাফ কান্নায় ভাঙত। AI এখন প্রতিটি কল হ্যান্ডেল করে, বাংলা বা ইংরেজিতে, ক্যাম্পাস ভিজিট বুক করে। গত বছরের ৪৭০-এর বিপরীতে ৭৮০ অ্যাপ্লিকেশন পেয়েছি।',
      },
      rating: 5,
    },
    {
      author: { en: 'Imran Hossain', bn: 'ইমরান হোসেন' },
      role: { en: 'Operations Manager', bn: 'অপারেশনস ম্যানেজার' },
      company: { en: 'Jessore Steel Mills', bn: 'যশোর স্টিল মিলস' },
      industry: { en: 'Manufacturing, Jessore', bn: 'ম্যানুফ্যাকচারিং, যশোর' },
      before: { en: 'Supplier calls ignored, delays common.', bn: 'সাপ্লায়ার কল ইগনর, দেরি সাধারণ।' },
      after: { en: 'Zero missed calls, 30% fewer delays.', bn: 'জিরো মিসড কল, ৩০% কম দেরি।' },
      quote: {
        en: 'On the shop floor, we cannot hear the phone. Suppliers used to call 5 times before getting through. Now AI answers instantly, gives them order status from ERP, schedules deliveries. We saved ৳14 lakh in coordination costs alone.',
        bn: 'শপ ফ্লোরে আমরা ফোন শুনতে পাই না। সাপ্লায়াররা কানেক্ট হতে ৫ বার কল করতেন। এখন AI তাৎক্ষণিকভাবে উত্তর দেয়, ERP থেকে অর্ডার স্ট্যাটাস দেয়, ডেলিভারি শিডিউল করে। শুধু কোঅর্ডিনেশন খরচে ৳১৪ লাখ সেভ হয়েছে।',
      },
      rating: 5,
    },
    {
      author: { en: 'Farzana Islam', bn: 'ফারজানা ইসলাম' },
      role: { en: 'VP Sales', bn: 'ভিপি সেলস' },
      company: { en: 'Shield Insurance', bn: 'শিল্ড ইন্স্যুরেন্স' },
      industry: { en: 'Insurance, Dhaka', bn: 'ইন্স্যুরেন্স, ঢাকা' },
      before: { en: 'Agents burned out, sales flat.', bn: 'এজেন্ট বার্নআউট, সেলস স্থির।' },
      after: { en: '70% calls auto-handled, 3x new sales.', bn: '৭০% কল অটো-হ্যান্ডেলড, ৩x নতুন সেলস।' },
      quote: {
        en: 'My agents were quitting every 6 months — burnout from answering the same 20 questions. AI now handles policy inquiries, claim status, even generates new policy leads. My team only takes the high-value calls. Sales tripled.',
        bn: 'আমার এজেন্টরা প্রতি ৬ মাসে ছাড়ত — একই ২০টি প্রশ্নের উত্তর দিতে বার্নআউট। AI এখন পলিসি ইনকোয়ারি, ক্লেম স্ট্যাটাস, এমনকি নতুন পলিসি লিড জেনারেট করে। আমার টিম শুধু হাই-ভ্যালু কল নেয়। সেলস তিনগুণ হয়েছে।',
      },
      rating: 5,
    },
    {
      author: { en: 'Sabbir Rahman', bn: 'সাব্বির রহমান' },
      role: { en: 'General Manager', bn: 'জেনারেল ম্যানেজার' },
      company: { en: 'Sea Pearl Resort', bn: 'সি পার্ল রিসোর্ট' },
      industry: { en: 'Hospitality, Cox\'s Bazar', bn: 'হসপিটালিটি, কক্সবাজার' },
      before: { en: 'Reservations lost during peak, 1★ reviews.', bn: 'পিকে রিজারভেশন হারাতাম, ১★ রিভিউ।' },
      after: { en: '30% more direct bookings, 4.8★ rating.', bn: '৩০% বেশি ডাইরেক্ট বুকিং, ৪.৮★ রেটিং।' },
      quote: {
        en: 'During peak season, our front desk would put callers on hold for 5+ minutes — many hung up and booked elsewhere. AI now handles every call 24/7, in 5 languages. Direct bookings up 30%, OTA commissions down, rating jumped to 4.8 stars.',
        bn: 'পিক সিজনে ফ্রন্ট ডেস্ক কলারদের ৫+ মিনিট হোল্ডে রাখত — অনেকে রিং কেটে অন্য জায়গায় বুক করত। AI এখন ২৪/৭ প্রতিটি কল ৫টি ভাষায় হ্যান্ডেল করে। ডাইরেক্ট বুকিং ৩০% বেশি, OTA কমিশন কম, রেটিং ৪.৮ স্টারে লাফিয়েছে।',
      },
      rating: 5,
    },
    {
      author: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' },
      role: { en: 'Owner', bn: 'মালিক' },
      company: { en: 'Nusrat Boutique', bn: 'নুসরাত বুটিক' },
      industry: { en: 'Retail, Dhaka', bn: 'রিটেইল, ঢাকা' },
      before: { en: 'Single phone line, missed calls daily.', bn: 'এক ফোন লাইন, প্রতিদিন মিসড কল।' },
      after: { en: 'Never misses a call, 2x orders.', bn: 'কখনো কল মিস করে না, ২x অর্ডার।' },
      quote: {
        en: 'I run my boutique alone — I cannot pick up the phone when with a customer. AI now answers every call, takes orders, books fittings, even handles WhatsApp follow-ups. My monthly orders doubled without hiring anyone.',
        bn: 'আমি একা বুটিক চালাই — কাস্টমারের সাথে থাকলে ফোন ধরতে পারি না। AI এখন প্রতিটি কল রিসিভ করে, অর্ডার নেয়, ফিটিং বুক করে, এমনকি WhatsApp ফলো-আপ হ্যান্ডেল করে। কাউকে না নিয়েই আমার মাসিক অর্ডার দ্বিগুণ হয়েছে।',
      },
      rating: 5,
    },
    {
      author: { en: 'Arif Hossain', bn: 'আরিফ হোসেন' },
      role: { en: 'Founder', bn: 'ফাউন্ডার' },
      company: { en: 'QuickFix Services', bn: 'কুইকফিক্স সার্ভিসেস' },
      industry: { en: 'Home Services, Dhaka', bn: 'হোম সার্ভিসেস, ঢাকা' },
      before: { en: 'Missed calls = missed jobs.', bn: 'মিসড কল = মিসড কাজ।' },
      after: { en: 'Every call answered, 40% more jobs.', bn: 'প্রতিটি কল অ্যান্সারড, ৪০% বেশি কাজ।' },
      quote: {
        en: 'In home services, the first business to answer the call gets the job. We were missing 30+ calls a day. AI now answers in 4 seconds, books the technician, sends confirmation. We added 40% more jobs without adding staff.',
        bn: 'হোম সার্ভিসেসে, প্রথম ব্যবসা কল রিসিভ করলেই কাজ পায়। আমরা দিনে ৩০+ কল মিস করতাম। AI এখন ৪ সেকেন্ডে উত্তর দেয়, টেকনিশিয়ান বুক করে, কনফার্মেশন পাঠায়। স্টাফ না বাড়িয়েই ৪০% বেশি কাজ করছি।',
      },
      rating: 5,
    },
  ],
}

/* ========================================================================== */
/*  27. STATISTICS                                                             */
/* ========================================================================== */

export const STATISTICS = {
  eyebrow: { en: 'By the numbers', bn: 'সংখ্যায় আমরা' } as Bilingual,
  title: {
    en: 'The impact our AI Voice Agent delivers',
    bn: 'আমাদের AI Voice Agent যে প্রভাব ফেলে',
  } as Bilingual,
  subtitle: {
    en: 'Aggregated across 50+ active deployments in Bangladesh.',
    bn: 'বাংলাদেশে ৫০+ সক্রিয় ডিপ্লয়মেন্ট জুড়ে সমষ্টিগত।',
  } as Bilingual,
  stats: [
    { value: '97%', label: { en: 'Average call answer rate', bn: 'গড় কল অ্যান্সার রেট' }, desc: { en: 'vs 40–60% traditional', bn: 'প্রচলিত ৪০–৬০% এর বিপরীতে' } },
    { value: '4s', label: { en: 'Average pickup time', bn: 'গড় পিকআপ টাইম' }, desc: { en: 'vs 30s+ traditional', bn: 'প্রচলিত ৩০সে+ এর বিপরীতে' } },
    { value: '90%', label: { en: 'Reduction in missed calls', bn: 'মিসড কল কমেছে' }, desc: { en: 'Average across clients', bn: 'ক্লায়েন্ট জুড়ে গড়' } },
    { value: '3x', label: { en: 'More appointments booked', bn: 'বেশি অ্যাপয়েন্টমেন্ট বুকড' }, desc: { en: 'Within 60 days of go-live', bn: 'লাইভ হওয়ার ৬০ দিনের মধ্যে' } },
    { value: '5.8x', label: { en: 'Average ROI', bn: 'গড় ROI' }, desc: { en: 'Within 90 days', bn: '৯০ দিনের মধ্যে' } },
    { value: '50+', label: { en: 'Active businesses', bn: 'সক্রিয় ব্যবসা' }, desc: { en: 'Across 12 industries', bn: '১২টি ইন্ডাস্ট্রি জুড়ে' } },
    { value: '4.9★', label: { en: 'Customer satisfaction', bn: 'গ্রাহক সন্তুষ্টি' }, desc: { en: 'From 45+ verified reviews', bn: '৪৫+ ভেরিফাইড রিভিউ থেকে' } },
    { value: '24/7', label: { en: 'Always-on coverage', bn: 'সর্বদা কভারেজ' }, desc: { en: '99.9% uptime SLA', bn: '৯৯.৯% আপটাইম SLA' } },
    { value: '৳2.4Cr+', label: { en: 'Revenue recovered', bn: 'রেভিনিউ রিকভারড' }, desc: { en: 'For clients in 2024', bn: '২০২৪-এ ক্লায়েন্টের জন্য' } },
    { value: '12L+', label: { en: 'Calls handled', bn: 'কল হ্যান্ডেলড' }, desc: { en: 'In Bangla + English', bn: 'বাংলা + ইংরেজিতে' } },
    { value: '<60s', label: { en: 'Avg call to CRM update', bn: 'কল থেকে CRM আপডেট' }, desc: { en: 'Fully automated', bn: 'সম্পূর্ণ অটোমেটেড' } },
    { value: '7', label: { en: 'Languages supported', bn: 'ভাষা সাপোর্টেড' }, desc: { en: 'Bangla, English, Hindi, Urdu, Arabic, +2', bn: 'বাংলা, ইংরেজি, হিন্দি, উর্দু, আরবি, +২' } },
  ],
}

/* ========================================================================== */
/*  28. DELIVERABLES (12)                                                      */
/* ========================================================================== */

export const DELIVERABLES = {
  eyebrow: { en: 'What you get', bn: 'আপনি যা পাবেন' } as Bilingual,
  title: {
    en: '12 deliverables in every engagement',
    bn: 'প্রতিটি এনগেজমেন্টে ১২টি ডেলিভারেবল',
  } as Bilingual,
  subtitle: {
    en: 'No hidden fees. No optional add-ons. Everything below is included from day one.',
    bn: 'কোনো হিডেন ফি নেই। কোনো অপশনাল অ্যাড-অন নেই। নিচের সবকিছু প্রথম দিন থেকেই অন্তর্ভুক্ত।',
  } as Bilingual,
  items: [
    {
      icon: 'mic',
      title: { en: 'Voice Agent Setup', bn: 'Voice Agent সেটআপ' },
      desc: { en: 'Complete configuration of your AI Voice Agent — telephony, voice model, conversation flow, brand voice.', bn: 'আপনার AI Voice Agent-এর সম্পূর্ণ কনফিগারেশন — টেলিফোনি, ভয়েস মডেল, কনভার্সেশন ফ্লো, ব্র্যান্ড ভয়েস।' },
    },
    {
      icon: 'settings',
      title: { en: 'Prompt Engineering', bn: 'প্রম্পট ইঞ্জিনিয়ারিং' },
      desc: { en: 'Custom prompts crafted by experts — proven to drive 30% higher conversion than generic prompts.', bn: 'এক্সপার্ট দ্বারা তৈরি কাস্টম প্রম্পট — জেনেরিক প্রম্পটের চেয়ে ৩০% উচ্চতর কনভার্সন।' },
    },
    {
      icon: 'book-open',
      title: { en: 'Knowledge Base', bn: 'নলেজ বেস' },
      desc: { en: 'We build your custom KB from FAQs, product docs, pricing, policies. AI answers like a 10-year expert.', bn: 'FAQ, প্রোডাক্ট ডকস, প্রাইসিং, পলিসি থেকে কাস্টম KB বিল্ড করি। AI ১০-বছরের এক্সপার্টের মতো উত্তর দেয়।' },
    },
    {
      icon: 'database',
      title: { en: 'CRM Integration', bn: 'CRM ইন্টিগ্রেশন' },
      desc: { en: 'Native two-way sync with HubSpot, GoHighLevel, Salesforce, Zoho. Contacts, deals, notes auto-updated.', bn: 'HubSpot, GoHighLevel, Salesforce, Zoho-এর সাথে নেটিভ টু-ওয়ে সিঙ্ক। কন্টাক্ট, ডিল, নোট অটো-আপডেটেড।' },
    },
    {
      icon: 'calendar-check',
      title: { en: 'Calendar Integration', bn: 'ক্যালেন্ডার ইন্টিগ্রেশন' },
      desc: { en: 'Google Calendar, Outlook, Calendly — real-time availability, no double-bookings, instant confirmation.', bn: 'Google Calendar, Outlook, Calendly — রিয়েল-টাইম অ্যাভেইলেবিলিটি, কোনো ডাবল-বুকিং নেই, তাৎক্ষণিক কনফার্মেশন।' },
    },
    {
      icon: 'mic',
      title: { en: 'Call Recording System', bn: 'কল রেকর্ডিং সিস্টেম' },
      desc: { en: 'Every call recorded in HD, encrypted, searchable by keyword, speaker, intent. 1-year retention included.', bn: 'প্রতিটি কল HD-তে রেকর্ডেড, এনক্রিপ্টেড, কীওয়ার্ড, স্পিকার, ইনটেন্ট দিয়ে সার্চেবল। ১-বছর রিটেনশন অন্তর্ভুক্ত।' },
    },
    {
      icon: 'bar-chart',
      title: { en: 'Live Dashboard', bn: 'লাইভ ড্যাশবোর্ড' },
      desc: { en: 'Real-time metrics: call volume, answer rate, bookings, sentiment, revenue. Customisable, exportable.', bn: 'রিয়েল-টাইম মেট্রিক্স: কল ভলিউম, অ্যান্সার রেট, বুকিং, সেন্টিমেন্ট, রেভিনিউ। কাস্টমাইজেবল, এক্সপোর্টেবল।' },
    },
    {
      icon: 'bar-chart',
      title: { en: 'Analytics & Reporting', bn: 'অ্যানালিটিক্স ও রিপোর্টিং' },
      desc: { en: 'Weekly performance reports, monthly business reviews, quarterly optimisation roadmap. Delivered to inbox.', bn: 'সাপ্তাহিক পারফরম্যান্স রিপোর্ট, মাসিক বিজনেস রিভিউ, ত্রৈমাসিক অপটিমাইজেশন রোডম্যাপ। ইনবক্সে ডেলিভারড।' },
    },
    {
      icon: 'graduation-cap',
      title: { en: 'Team Training', bn: 'টিম ট্রেনিং' },
      desc: { en: '2-hour live training session + recorded videos + SOPs. Your team is productive on day one.', bn: '২-ঘন্টার লাইভ ট্রেনিং সেশন + রেকর্ডেড ভিডিও + SOP। আপনার টিম প্রথম দিনেই প্রোডাক্টিভ।' },
    },
    {
      icon: 'file-text',
      title: { en: 'Documentation', bn: 'ডকুমেন্টেশন' },
      desc: { en: 'Complete SOPs, API docs, video tutorials, prompt library. Everything your team needs to operate.', bn: 'সম্পূর্ণ SOP, API ডকস, ভিডিও টিউটোরিয়াল, প্রম্পট লাইব্রেরি। আপনার টিমের অপারেট করার জন্য সব।' },
    },
    {
      icon: 'headset',
      title: { en: 'Priority Support', bn: 'প্রায়োরিটি সাপোর্ট' },
      desc: { en: 'Dedicated success manager, WhatsApp support group, 4-hour response SLA, monthly check-in calls.', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার, WhatsApp সাপোর্ট গ্রুপ, ৪-ঘন্টা রেসপন্স SLA, মাসিক চেক-ইন কল।' },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'Continuous Optimisation', bn: 'কন্টিনিউয়াস অপটিমাইজেশন' },
      desc: { en: 'Monthly prompt tuning, KB updates, workflow refinement, A/B testing. Your agent gets smarter every month.', bn: 'মাসিক প্রম্পট টিউনিং, KB আপডেট, ওয়ার্কফ্লো রিফাইনমেন্ট, A/B টেস্টিং। আপনার এজেন্ট প্রতি মাসে স্মার্ট হয়।' },
    },
  ],
}

/* ========================================================================== */
/*  29. PRICING (3 tiers + offer stack)                                        */
/* ========================================================================== */

export const PRICING = {
  eyebrow: { en: 'Transparent pricing', bn: 'স্বচ্ছ প্রাইসিং' } as Bilingual,
  title: {
    en: 'Choose the plan that fits your call volume',
    bn: 'আপনার কল ভলিউমের উপযুক্ত প্ল্যান বেছে নিন',
  } as Bilingual,
  subtitle: {
    en: 'All plans include 60-day ROI guarantee. Cancel anytime. No lock-in. Setup included.',
    bn: 'সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি। যেকোনো সময় ক্যানসেল। কোনো লক-ইন নেই। সেটআপ অন্তর্ভুক্ত।',
  } as Bilingual,
  tiers: [
    {
      name: { en: 'Starter', bn: 'স্টার্টার' },
      price: { en: '৳35,000', bn: '৳৩৫,০০০' },
      period: { en: '/month', bn: '/মাস' },
      tagline: { en: 'For small businesses with up to 500 calls/month', bn: '৫০০ কল/মাস পর্যন্ত ছোট ব্যবসার জন্য' },
      features: [
        { en: 'Up to 500 calls/month', bn: '৫০০ কল/মাস পর্যন্ত' },
        { en: 'Bangla + English voice', bn: 'বাংলা + ইংরেজি ভয়েস' },
        { en: '1 phone number', bn: '১টি ফোন নম্বর' },
        { en: 'CRM sync (1 platform)', bn: 'CRM সিঙ্ক (১টি প্ল্যাটফর্ম)' },
        { en: 'Calendar booking', bn: 'ক্যালেন্ডার বুকিং' },
        { en: 'Call recording + transcription', bn: 'কল রেকর্ডিং + ট্রান্সক্রিপশন' },
        { en: 'SMS + email follow-up', bn: 'SMS + ইমেইল ফলো-আপ' },
        { en: 'Basic analytics dashboard', bn: 'বেসিক অ্যানালিটিক্স ড্যাশবোর্ড' },
        { en: 'Email support, 24h SLA', bn: 'ইমেইল সাপোর্ট, ২৪ঘ SLA' },
        { en: '5-day setup', bn: '৫-দিন সেটআপ' },
      ],
      cta: { en: 'Start with Starter', bn: 'স্টার্টার দিয়ে শুরু করুন' },
      popular: false,
    },
    {
      name: { en: 'Growth', bn: 'গ্রোথ' },
      price: { en: '৳55,000', bn: '৳৫৫,০০০' },
      period: { en: '/month', bn: '/মাস' },
      tagline: { en: 'For growing businesses with up to 1,500 calls/month', bn: '১,৫০০ কল/মাস পর্যন্ত গ্রোয়িং ব্যবসার জন্য' },
      features: [
        { en: 'Up to 1,500 calls/month', bn: '১,৫০০ কল/মাস পর্যন্ত' },
        { en: 'Bangla + English + 3 more languages', bn: 'বাংলা + ইংরেজি + ৩টি ভাষা' },
        { en: '3 phone numbers', bn: '৩টি ফোন নম্বর' },
        { en: 'CRM sync (3 platforms)', bn: 'CRM সিঙ্ক (৩টি প্ল্যাটফর্ম)' },
        { en: 'Calendar + payment integration', bn: 'ক্যালেন্ডার + পেমেন্ট ইন্টিগ্রেশন' },
        { en: 'AI call summary + notes + sentiment', bn: 'AI কল সামারি + নোট + সেন্টিমেন্ট' },
        { en: 'SMS + WhatsApp + email follow-up', bn: 'SMS + WhatsApp + ইমেইল ফলো-আপ' },
        { en: 'Advanced analytics + reports', bn: 'অ্যাডভান্সড অ্যানালিটিক্স + রিপোর্ট' },
        { en: 'WhatsApp support, 4h SLA', bn: 'WhatsApp সাপোর্ট, ৪ঘ SLA' },
        { en: '3-day setup', bn: '৩-দিন সেটআপ' },
        { en: 'Monthly optimisation call', bn: 'মাসিক অপটিমাইজেশন কল' },
        { en: 'Voice cloning option', bn: 'ভয়েস ক্লোনিং অপশন' },
      ],
      cta: { en: 'Choose Growth', bn: 'গ্রোথ বেছে নিন' },
      popular: true,
    },
    {
      name: { en: 'Enterprise', bn: 'এন্টারপ্রাইজ' },
      price: { en: 'Custom', bn: 'কাস্টম' },
      period: { en: 'quote on request', bn: 'অনুরোধে কোট' },
      tagline: { en: 'For large call volumes, multi-location, custom needs', bn: 'বড় কল ভলিউম, মাল্টি-লোকেশন, কাস্টম প্রয়োজনের জন্য' },
      features: [
        { en: 'Unlimited calls/month', bn: 'আনলিমিটেড কল/মাস' },
        { en: 'All 7 languages supported', bn: 'সব ৭টি ভাষা সাপোর্টেড' },
        { en: 'Unlimited phone numbers', bn: 'আনলিমিটেড ফোন নম্বর' },
        { en: 'CRM sync (all platforms)', bn: 'CRM সিঙ্ক (সব প্ল্যাটফর্ম)' },
        { en: 'Custom integrations + API access', bn: 'কাস্টম ইন্টিগ্রেশন + API অ্যাক্সেস' },
        { en: 'White-label dashboard', bn: 'হোয়াইট-লেবেল ড্যাশবোর্ড' },
        { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
        { en: '99.9% uptime SLA', bn: '৯৯.৯% আপটাইম SLA' },
        { en: 'Phone + WhatsApp + Slack support, 1h SLA', bn: 'ফোন + WhatsApp + Slack সাপোর্ট, ১ঘ SLA' },
        { en: 'Custom voice cloning', bn: 'কাস্টম ভয়েস ক্লোনিং' },
        { en: 'On-premise option available', bn: 'অন-প্রেমাইস অপশন অ্যাভেইলেবল' },
        { en: 'Quarterly business review', bn: 'ত্রৈমাসিক বিজনেস রিভিউ' },
      ],
      cta: { en: 'Talk to Sales', bn: 'সেলসে কথা বলুন' },
      popular: false,
    },
  ],
  offerStack: [
    { item: { en: 'AI Voice Agent Setup', bn: 'AI Voice Agent সেটআপ' }, value: { en: '৳1,20,000', bn: '৳১,২০,০০০' } },
    { item: { en: 'Voice Design & Brand Persona', bn: 'ভয়েস ডিজাইন ও ব্র্যান্ড পার্সোনা' }, value: { en: '৳40,000', bn: '৳৪০,০০০' } },
    { item: { en: 'Knowledge Base Training', bn: 'নলেজ বেস ট্রেনিং' }, value: { en: '৳60,000', bn: '৳৬০,০০০' } },
    { item: { en: 'CRM + Calendar Integration', bn: 'CRM + ক্যালেন্ডার ইন্টিগ্রেশন' }, value: { en: '৳50,000', bn: '৳৫০,০০০' } },
    { item: { en: 'Call Flow Design', bn: 'কল ফ্লো ডিজাইন' }, value: { en: '৳30,000', bn: '৳৩০,০০০' } },
    { item: { en: 'Prompt Engineering', bn: 'প্রম্পট ইঞ্জিনিয়ারিং' }, value: { en: '৳35,000', bn: '৳৩৫,০০০' } },
    { item: { en: 'Team Training + SOPs', bn: 'টিম ট্রেনিং + SOP' }, value: { en: '৳25,000', bn: '৳২৫,০০০' } },
    { item: { en: 'Analytics Dashboard', bn: 'অ্যানালিটিক্স ড্যাশবোর্ড' }, value: { en: '৳20,000', bn: '৳২০,০০০' } },
    { item: { en: 'First Month Support', bn: 'প্রথম মাস সাপোর্ট' }, value: { en: '৳15,000', bn: '৳১৫,০০০' } },
  ],
  totalValue: { en: '৳3,95,000', bn: '৳৩,৯৫,০০০' },
  todayInvestment: { en: 'starts at ৳35,000/month (Starter)', bn: 'শুরু ৳৩৫,০০০/মাস (স্টার্টার)' },
  bonus: [
    { en: 'FREE: 60-day ROI guarantee (worth ৳1,10,000)', bn: 'ফ্রি: ৬০-দিন ROI গ্যারান্টি (মূল্য ৳১,১০,০০০)' },
    { en: 'FREE: Custom voice cloning (worth ৳40,000)', bn: 'ফ্রি: কাস্টম ভয়েস ক্লোনিং (মূল্য ৳৪০,০০০)' },
    { en: 'FREE: Lifetime KB updates (worth ৳60,000/year)', bn: 'ফ্রি: লাইফটাইম KB আপডেট (মূল্য ৳৬০,০০০/বছর)' },
  ],
  note: {
    en: 'All prices in BDT. Setup fee waived for annual commitments. 15% off annual billing. Custom quotes for Enterprise.',
    bn: 'সব মূল্য BDT-তে। বার্ষিক কমিটমেন্টে সেটআপ ফি মওকুফ। বার্ষিক বিলিংয়ে ১৫% ছাড়। এন্টারপ্রাইজের জন্য কাস্টম কোট।',
  } as Bilingual,
  notIncluded: [
    { en: 'Per-minute telephony cost (billed at cost by Twilio — ~৳0.45/min inbound, ~৳0.60/min outbound)', bn: 'প্রতি-মিনিট টেলিফোনি খরচ (Twilio দ্বারা মূল্যে বিল করা — ~৳০.৪৫/মিনিট ইনবাউন্ড, ~৳০.৬০/মিনিট আউটবাউন্ড)' },
    { en: 'CRM subscription (HubSpot/GoHighLevel/Salesforce — we help you pick the right plan)', bn: 'CRM সাবস্ক্রিপশন (HubSpot/GoHighLevel/Salesforce — সঠিক প্ল্যান বাছাইয়ে সাহায্য করি)' },
    { en: 'Phone number purchase (~৳1,500 one-time for a Bangladeshi virtual number)', bn: 'ফোন নম্বর ক্রয় (~৳১,৫০০ একবারের জন্য একটি বাংলাদেশি ভার্চুয়াল নম্বর)' },
    { en: 'Custom AI model training beyond included knowledge base (quoted separately)', bn: 'অন্তর্ভুক্ত নলেজ বেসের বাইরে কাস্টম AI মডেল ট্রেনিং (আলাদাভাবে কোট করা)' },
  ],
  pricingFaq: [
    {
      q: { en: 'Is there a setup fee?', bn: 'সেটআপ ফি আছে কি?' },
      a: { en: 'No. Setup is included in all plans. For annual commitments, even the one-time integration fee is waived.', bn: 'না। সব প্ল্যানে সেটআপ অন্তর্ভুক্ত। বার্ষিক কমিটমেন্টে একবারের ইন্টিগ্রেশন ফিও মওকুফ।' },
    },
    {
      q: { en: 'Can I switch plans later?', bn: 'পরে প্ল্যান পরিবর্তন করতে পারব?' },
      a: { en: 'Yes, anytime. Upgrade or downgrade takes effect from the next billing cycle. No penalties.', bn: 'হ্যাঁ, যেকোনো সময়। আপগ্রেড বা ডাউনগ্রেড পরবর্তী বিলিং সাইকেল থেকে কার্যকর। কোনো জরিমানা নেই।' },
    },
    {
      q: { en: 'What happens if I cancel?', bn: 'বাতিল করলে কী হয়?' },
      a: { en: 'You own your data. We export your call recordings, transcripts, and CRM data and hand it over within 7 days. No lock-in.', bn: 'আপনার ডেটা আপনার। আমরা আপনার কল রেকর্ডিং, ট্রান্সক্রিপ্ট ও CRM ডেটা এক্সপোর্ট করে ৭ দিনের মধ্যে হস্তান্তর করি। কোনো লক-ইন নেই।' },
    },
    {
      q: { en: 'Are there hidden costs?', bn: 'কোনো লুকানো খরচ আছে?' },
      a: { en: 'No hidden costs. The only pass-through is telephony (Twilio bills at cost) and your CRM subscription. Everything else is in your monthly plan.', bn: 'কোনো লুকানো খরচ নেই। একমাত্র পাস-থ্রু হলো টেলিফোনি (Twilio মূল্যে বিল করে) এবং আপনার CRM সাবস্ক্রিপশন। বাকি সব আপনার মাসিক প্ল্যানে অন্তর্ভুক্ত।' },
    },
  ],
}

/* ========================================================================== */
/*  30. GUARANTEES (4)                                                         */
/* ========================================================================== */

export const GUARANTEES = {
  eyebrow: { en: 'Risk reversed', bn: 'ঝুঁকি উল্টানো' } as Bilingual,
  title: {
    en: 'Our 4 guarantees — your risk is zero',
    bn: 'আমাদের ৪টি গ্যারান্টি — আপনার ঝুঁকি জিরো',
  } as Bilingual,
  subtitle: {
    en: 'We take on all the risk so you can decide with confidence.',
    bn: 'আমরা সব ঝুঁকি নিই যাতে আপনি আত্মবিশ্বাসে সিদ্ধান্ত নিতে পারেন।',
  } as Bilingual,
  items: [
    {
      icon: 'shield-check',
      title: { en: '60-Day ROI Guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      desc: {
        en: 'If you do not see measurable ROI within 60 days — we refund 100% AND keep working for free until you do. Zero risk.',
        bn: '৬০ দিনের মধ্যে পরিমেয় ROI না দেখলে — আমরা ১০০% রিফান্ড দেই এবং না হওয়া পর্যন্ত ফ্রি কাজ করি। আপনার জিরো ঝুঁকি।',
      },
    },
    {
      icon: 'rocket',
      title: { en: 'Go-Live Guarantee', bn: 'গো-লাইভ গ্যারান্টি' },
      desc: {
        en: 'Starter live in 5 days, Growth in 3 days, Enterprise in 10. Miss the deadline, your first month is free.',
        bn: 'স্টার্টার ৫ দিনে, গ্রোথ ৩ দিনে, এন্টারপ্রাইজ ১০ দিনে লাইভ। ডেডলাইন মিস করলে আপনার প্রথম মাস ফ্রি।',
      },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'Unlimited Revisions During Setup', bn: 'সেটআপ চলাকালীন আনলিমিটেড রিভিশন' },
      desc: {
        en: 'Voice, prompts, call flow, KB — revise as many times as you want during setup. Until it is perfect.',
        bn: 'ভয়েস, প্রম্পট, কল ফ্লো, KB — সেটআপ চলাকালীন যতবার খুশি রিভাইস করুন। যতক্ষণ না পারফেক্ট হয়।',
      },
    },
    {
      icon: 'headset',
      title: { en: 'Dedicated Success Manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
      desc: {
        en: 'Your personal contact who knows your business, monitors performance, and proactively optimises — every month.',
        bn: 'আপনার ব্যক্তিগত কন্টাক্ট যিনি আপনার ব্যবসা জানেন, পারফরম্যান্স মনিটর করেন, এবং প্রতি মাসে প্রোঅ্যাক্টিভলি অপটিমাইজ করেন।',
      },
    },
  ],
}

/* ========================================================================== */
/*  31. FAQS (45 questions across 5 groups)                                    */
/* ========================================================================== */

export const FAQS = {
  eyebrow: { en: 'Answers to your questions', bn: 'আপনার প্রশ্নের উত্তর' } as Bilingual,
  title: {
    en: 'Frequently asked questions',
    bn: 'সাধারণ জিজ্ঞাসা',
  } as Bilingual,
  subtitle: {
    en: 'Everything you need to know before booking your free strategy call.',
    bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করার আগে যা যা জানা দরকার।',
  } as Bilingual,
  groups: [
    {
      title: { en: 'Basics', bn: 'বেসিক' },
      items: [
        {
          q: { en: 'What is an AI Voice Agent?', bn: 'AI Voice Agent কী?' },
          a: { en: 'It is an AI-powered phone agent that answers your business calls, talks naturally with customers, books appointments, updates CRM, and follows up — 24/7 in Bangla and English.', bn: 'এটি একটি AI-চালিত ফোন এজেন্ট যা আপনার ব্যবসার ফোন কল রিসিভ করে, গ্রাহকের সাথে স্বাভাবিকভাবে কথা বলে, অ্যাপয়েন্টমেন্ট বুক করে, CRM আপডেট করে ও ফলো-আপ করে — ২৪/৭, বাংলা ও ইংরেজিতে।' },
        },
        {
          q: { en: 'Does it really speak Bangla?', bn: 'এটা কি সত্যিই বাংলায় কথা বলে?' },
          a: { en: 'Yes — native-quality Bangla, not machine-translated. It understands dialects, code-switching, accents, and slang. Most callers cannot tell it is AI.', bn: 'হ্যাঁ — নেটিভ-কোয়ালিটি বাংলা, মেশিন-ট্রান্সলেটেড নয়। এটি ডায়ালেক্ট, কোড-সুইচিং, অ্যাকসেন্ট ও স্ল্যাং বোঝে। বেশিরভাগ কলার বুঝতে পারে না এটি AI।' },
        },
        {
          q: { en: 'How fast can we go live?', bn: 'কত দ্রুত লাইভ হতে পারে?' },
          a: { en: 'Starter plan: 5 business days. Growth plan: 3 days. Enterprise: 10 days. Includes setup, integration, training, and testing.', bn: 'স্টার্টার প্ল্যান: ৫ কার্যদিবস। গ্রোথ প্ল্যান: ৩ দিন। এন্টারপ্রাইজ: ১০ দিন। সেটআপ, ইন্টিগ্রেশন, ট্রেনিং ও টেস্টিং অন্তর্ভুক্ত।' },
        },
        {
          q: { en: 'Will customers know it is AI?', bn: 'গ্রাহকরা কি বুঝবেন এটি AI?' },
          a: { en: 'Most do not. ElevenLabs + OpenAI voices sound human — natural pauses, inflection, emotion. We can disclose "AI assistant" if you prefer, or keep it transparent.', bn: 'বেশিরভাগ বুঝতে পারেন না। ElevenLabs + OpenAI ভয়েস মানুষের মতো শোনায় — স্বাভাবিক বিরতি, ইনফ্লেকশন, আবেগ। আপনি চাইলে "AI অ্যাসিস্ট্যান্ট" প্রকাশ করতে পারেন, বা স্বচ্ছ রাখতে পারেন।' },
        },
        {
          q: { en: 'Can it transfer to a human?', bn: 'এটা কি হিউম্যানে ট্রান্সফার করতে পারে?' },
          a: { en: 'Yes — instantly, with full context attached (transcript, summary, sentiment, customer history). The human agent picks up where AI left off.', bn: 'হ্যাঁ — তাৎক্ষণিকভাবে, পূর্ণ কনটেক্সট সহ (ট্রান্সক্রিপ্ট, সামারি, সেন্টিমেন্ট, কাস্টমার হিস্ট্রি)। হিউম্যান এজেন্ট AI যেখানে ছেড়েছে সেখান থেকে শুরু করেন।' },
        },
        {
          q: { en: 'Does it make outbound calls?', bn: 'এটা কি আউটবাউন্ড কল করে?' },
          a: { en: 'Yes — lead follow-up, appointment reminders, payment reminders, surveys, renewal calls. All automated, all logged.', bn: 'হ্যাঁ — লিড ফলো-আপ, অ্যাপয়েন্টমেন্ট রিমাইন্ডার, পেমেন্ট রিমাইন্ডার, সার্ভে, রিনিউয়াল কল। সব অটোমেটেড, সব লগড।' },
        },
        {
          q: { en: 'How many calls can it handle at once?', bn: 'একসাথে কত কল সামলাতে পারে?' },
          a: { en: '1,000+ simultaneous calls — same speed, same quality, same flat cost. Whether 1 call or 1,000, performance is identical.', bn: '১,০০০+ সিমুলটেনিয়াস কল — একই স্পিড, একই কোয়ালিটি, একই ফ্ল্যাট খরচ। ১টি কল বা ১,০০০, পারফরম্যান্স একই।' },
        },
        {
          q: { en: 'What languages are supported?', bn: 'কোন ভাষাগুলো সাপোর্টেড?' },
          a: { en: 'Bangla, English, Hindi, Urdu, Arabic, and 2 more on request. AI auto-detects language and switches mid-call if needed.', bn: 'বাংলা, ইংরেজি, হিন্দি, উর্দু, আরবি, এবং অনুরোধে আরও ২টি। AI ভাষা অটো-ডিটেক্ট করে এবং প্রয়োজনে কল মাঝে স্যুইচ করে।' },
        },
        {
          q: { en: 'Can I use my existing phone number?', bn: 'আমার বর্তমান ফোন নম্বর ব্যবহার করতে পারব?' },
          a: { en: 'Yes — we port your existing business number to the AI Voice Agent, or assign a new virtual number. Either works.', bn: 'হ্যাঁ — আমরা আপনার বর্তমান ব্যবসায়িক নম্বর AI Voice Agent-এ পোর্ট করি, বা নতুন ভার্চুয়াল নম্বর অ্যাসাইন করি। যেকোনোটাই কাজ করে।' },
        },
      ],
    },
    {
      title: { en: 'Technical', bn: 'টেকনিক্যাল' },
      items: [
        {
          q: { en: 'What technology does it use?', bn: 'কোন টেকনোলজি ব্যবহার করে?' },
          a: { en: 'OpenAI GPT-4 for conversation, ElevenLabs for voice synthesis, Deepgram + Whisper for speech recognition, Twilio + Vapi for telephony. Best-in-class enterprise stack.', bn: 'কনভার্সেশনে OpenAI GPT-4, ভয়েস সিনথেসিসে ElevenLabs, স্পিচ রিকগনিশনে Deepgram + Whisper, টেলিফোনিতে Twilio + Vapi। বেস্ট-ইন-ক্লাস এন্টারপ্রাইজ স্ট্যাক।' },
        },
        {
          q: { en: 'How natural does the voice sound?', bn: 'ভয়েস কতটা ন্যাচারাল শোনায়?' },
          a: { en: 'Indistinguishable from human for most callers. Natural pauses, inflection, emotion, even "um"s and "uh"s. We use ElevenLabs highest-quality voices.', bn: 'বেশিরভাগ কলারের জন্য মানুষ থেকে আলাদা করা যায় না। স্বাভাবিক বিরতি, ইনফ্লেকশন, আবেগ, এমনকি "um" ও "uh"। আমরা ElevenLabs-এর সর্বোচ্চ-কোয়ালিটি ভয়েস ব্যবহার করি।' },
        },
        {
          q: { en: 'Can I clone my own voice?', bn: 'আমার নিজের ভয়েস ক্লোন করতে পারব?' },
          a: { en: 'Yes — voice cloning is included in Growth and Enterprise plans. 2-3 minute voice sample is enough to create a custom voice.', bn: 'হ্যাঁ — ভয়েস ক্লোনিং গ্রোথ ও এন্টারপ্রাইজ প্ল্যানে অন্তর্ভুক্ত। ২-৩ মিনিটের ভয়েস স্যাম্পল কাস্টম ভয়েস তৈরির জন্য যথেষ্ট।' },
        },
        {
          q: { en: 'How does it handle Bangla accents?', bn: 'বাংলা অ্যাকসেন্ট কীভাবে হ্যান্ডেল করে?' },
          a: { en: 'Trained on 100,000+ hours of Bangla audio — Dhaka, Chittagong, Sylhet, Noakhali accents all understood. 96% accuracy even with strong accents.', bn: '১,০০,০০০+ ঘন্টা বাংলা অডিওতে ট্রেইনড — ঢাকা, চট্টগ্রাম, সিলেট, নোয়াখালি অ্যাকসেন্ট সব বোঝে। শক্ত অ্যাকসেন্টেও ৯৬% নির্ভুলতা।' },
        },
        {
          q: { en: 'What happens if AI cannot answer?', bn: 'AI উত্তর না দিতে পারলে কী হয়?' },
          a: { en: 'It gracefully transfers to a human agent with full context. Or takes a message and schedules a callback. Customer never feels stuck.', bn: 'এটি পূর্ণ কনটেক্সট সহ হিউম্যান এজেন্টে সুন্দরভাবে ট্রান্সফার করে। বা মেসেজ নেয় ও কলব্যাক শিডিউল করে। গ্রাহক কখনো আটকে থাকেন না।' },
        },
        {
          q: { en: 'How accurate is the transcription?', bn: 'ট্রান্সক্রিপশন কতটা নির্ভুল?' },
          a: { en: '96% accuracy for Bangla + English mixed conversations. Industry-leading Deepgram + Whisper combination. Searchable by keyword, speaker, intent.', bn: 'বাংলা + ইংরেজি মিক্সড কথোপকথনে ৯৬% নির্ভুলতা। ইন্ডাস্ট্রি-লিডিং Deepgram + Whisper কম্বিনেশন। কীওয়ার্ড, স্পিকার, ইনটেন্ট দিয়ে সার্চেবল।' },
        },
        {
          q: { en: 'What is the uptime?', bn: 'আপটাইম কত?' },
          a: { en: '99.9% SLA on Enterprise, 99.5% on Growth, 99% on Starter. We monitor 24/7 and have automated failover.', bn: 'এন্টারপ্রাইজে ৯৯.৯% SLA, গ্রোথে ৯৯.৫%, স্টার্টারে ৯৯%। আমরা ২৪/৭ মনিটর করি এবং অটোমেটেড ফেইলওভার আছে।' },
        },
        {
          q: { en: 'Can it detect emotions?', bn: 'ইমোশন ডিটেক্ট করতে পারে?' },
          a: { en: 'Yes — 7 emotions tracked: happy, sad, angry, frustrated, confused, urgent, calm. AI adjusts tone and escalates if needed.', bn: 'হ্যাঁ — ৭টি ইমোশন ট্র্যাকড: খুশি, দুঃখী, রাগী, ফ্রাস্ট্রেটেড, কনফিউজড, জরুরি, শান্ত। AI টোন অ্যাডজাস্ট করে ও প্রয়োজনে এসকেলেট করে।' },
        },
        {
          q: { en: 'Can it handle noisy calls?', bn: 'নয়েজি কল হ্যান্ডেল করতে পারে?' },
          a: { en: 'Yes — AI noise reduction filters traffic, wind, crowd, fan noise. Crystal-clear audio even from a busy street or moving vehicle.', bn: 'হ্যাঁ — AI নয়েজ রিডাকশন ট্রাফিক, বাতাস, ভিড়, ফ্যান নয়েজ ফিল্টার করে। ব্যস্ত রাস্তা বা চলন্ত গাড়ি থেকেও ক্রিস্টাল-ক্লিয়ার অডিও।' },
        },
      ],
    },
    {
      title: { en: 'Integration', bn: 'ইন্টিগ্রেশন' },
      items: [
        {
          q: { en: 'Which CRMs does it integrate with?', bn: 'কোন CRM-এর সাথে ইন্টিগ্রেট করে?' },
          a: { en: 'Native two-way sync with HubSpot, GoHighLevel, Salesforce, Zoho, Freshsales, Pipedrive. Custom integrations available on Enterprise.', bn: 'HubSpot, GoHighLevel, Salesforce, Zoho, Freshsales, Pipedrive-এর সাথে নেটিভ টু-ওয়ে সিঙ্ক। এন্টারপ্রাইজে কাস্টম ইন্টিগ্রেশন অ্যাভেইলেবল।' },
        },
        {
          q: { en: 'Does it sync with my calendar?', bn: 'আমার ক্যালেন্ডারের সাথে সিঙ্ক করে?' },
          a: { en: 'Yes — Google Calendar, Outlook, Calendly. Real-time availability, no double-bookings, instant confirmation to customer.', bn: 'হ্যাঁ — Google Calendar, Outlook, Calendly। রিয়েল-টাইম অ্যাভেইলেবিলিটি, কোনো ডাবল-বুকিং নেই, গ্রাহকে তাৎক্ষণিক কনফার্মেশন।' },
        },
        {
          q: { en: 'Can it take payments?', bn: 'পেমেন্ট নিতে পারে?' },
          a: { en: 'Yes — sends bKash, Nagad, Rocket, Stripe, or SSL Commerz payment links via SMS/WhatsApp during the call. Confirms payment in real-time.', bn: 'হ্যাঁ — কল চলাকালীন SMS/WhatsApp-এ bKash, Nagad, Rocket, Stripe বা SSL Commerz পেমেন্ট লিংক পাঠায়। রিয়েল-টাইমে পেমেন্ট কনফার্ম করে।' },
        },
        {
          q: { en: 'Does it work with WhatsApp?', bn: 'WhatsApp-এর সাথে কাজ করে?' },
          a: { en: 'Yes — call can be handed off to WhatsApp for documents, photos, payment links. Continuous thread, no context lost.', bn: 'হ্যাঁ — ডকুমেন্ট, ছবি, পেমেন্ট লিংকের জন্য কল WhatsApp-ে হ্যান্ডঅফ করা যায়। কন্টিনিউয়াস থ্রেড, কোনো কনটেক্সট হারায় না।' },
        },
        {
          q: { en: 'Is there an API?', bn: 'API আছে?' },
          a: { en: 'Yes — full REST API. Trigger calls, fetch transcripts, manage contacts, build custom flows. Plus webhooks for real-time events.', bn: 'হ্যাঁ — সম্পূর্ণ REST API। কল ট্রিগার, ট্রান্সক্রিপ্ট ফেচ, কন্টাক্ট ম্যানেজ, কাস্টম ফ্লো বিল্ড। প্লাস রিয়েল-টাইম ইভেন্টের জন্য webhooks।' },
        },
        {
          q: { en: 'Does it work with Zapier/Make/n8n?', bn: 'Zapier/Make/n8n-এর সাথে কাজ করে?' },
          a: { en: 'Yes — native apps on all three platforms. Connect to 5,000+ tools without writing a single line of code.', bn: 'হ্যাঁ — তিন প্ল্যাটফর্মেই নেটিভ অ্যাপ। এক লাইন কোড না লিখেই ৫,০০০+ টুলে কানেক্ট।' },
        },
        {
          q: { en: 'Can it integrate with my custom software?', bn: 'আমার কাস্টম সফটওয়্যারের সাথে ইন্টিগ্রেট করতে পারে?' },
          a: { en: 'Yes — via REST API or webhooks. Enterprise plan includes custom integration development. We have integrated with ERPs, HMS, LMS, PMS, and more.', bn: 'হ্যাঁ — REST API বা webhooks-এর মাধ্যমে। এন্টারপ্রাইজ প্ল্যানে কাস্টম ইন্টিগ্রেশন ডেভেলপমেন্ট অন্তর্ভুক্ত। আমরা ERP, HMS, LMS, PMS ইত্যাদির সাথে ইন্টিগ্রেট করেছি।' },
        },
        {
          q: { en: 'Does it send SMS and email?', bn: 'SMS ও ইমেইল পাঠায়?' },
          a: { en: 'Yes — auto SMS confirmation after every call, WhatsApp message, and branded email with full transcript + summary + action items.', bn: 'হ্যাঁ — প্রতিটি কলের পর অটো SMS কনফার্মেশন, WhatsApp মেসেজ, এবং ব্র্যান্ডেড ইমেইল পূর্ণ ট্রান্সক্রিপ্ট + সামারি + অ্যাকশন আইটেম সহ।' },
        },
        {
          q: { en: 'Can it notify my sales team?', bn: 'আমার সেলস টিমকে নোটিফাই করতে পারে?' },
          a: { en: 'Yes — instant push to Slack, Microsoft Teams, or WhatsApp. "Hot lead booked — ৳50K deal, call back in 2 hours."', bn: 'হ্যাঁ — Slack, Microsoft Teams, বা WhatsApp-এ তাৎক্ষণিক পুশ। "হট লিড বুকড — ৳৫০K ডিল, ২ ঘন্টায় কল ব্যাক।"' },
        },
      ],
    },
    {
      title: { en: 'Pricing & Plans', bn: 'প্রাইসিং ও প্ল্যান' },
      items: [
        {
          q: { en: 'How much does AI Voice Agent cost?', bn: 'AI Voice Agent-এর খরচ কত?' },
          a: { en: 'Starter: ৳35,000/month for 500 calls. Growth: ৳55,000/month for 1,500 calls. Enterprise: custom quote. All plans include 60-day ROI guarantee.', bn: 'স্টার্টার: ৳৩৫,০০০/মাসে ৫০০ কল। গ্রোথ: ৳৫৫,০০০/মাসে ১,৫০০ কল। এন্টারপ্রাইজ: কাস্টম কোট। সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি।' },
        },
        {
          q: { en: 'Is there a setup fee?', bn: 'সেটআপ ফি আছে?' },
          a: { en: 'Setup fee waived for annual plans. For monthly: ৳15,000 one-time covers telephony setup, voice design, KB training, CRM integration.', bn: 'বার্ষিক প্ল্যানে সেটআপ ফি মওকুফ। মাসিকে: এককালীন ৳১৫,০০০-এ টেলিফোনি সেটআপ, ভয়েস ডিজাইন, KB ট্রেনিং, CRM ইন্টিগ্রেশন।' },
        },
        {
          q: { en: 'Are there per-call charges?', bn: 'প্রতি-কল চার্জ আছে?' },
          a: { en: 'No — flat monthly pricing within your plan\'s call quota. No per-minute charges, no per-call fees, no surprise bills.', bn: 'না — আপনার প্ল্যানের কল কোটার মধ্যে ফ্ল্যাট মাসিক প্রাইসিং। কোনো প্রতি-মিনিট চার্জ, প্রতি-কল ফি, বা চমকে দেওয়া বিল নেই।' },
        },
        {
          q: { en: 'What happens if I exceed my call quota?', bn: 'কল কোটা ছাড়িয়ে গেলে কী হয়?' },
          a: { en: 'We notify you at 80% and 100% of quota. You can upgrade instantly, or pay ৳10/extra call. No service interruption ever.', bn: '৮০% ও ১০০%-এ আমরা নোটিফাই করি। আপনি তাৎক্ষণিকভাবে আপগ্রেড করতে পারেন, বা ৳১০/অতিরিক্ত কল দিতে পারেন। কখনো সার্ভিস বন্ধ হয় না।' },
        },
        {
          q: { en: 'Can I change plans later?', bn: 'পরে প্ল্যান পরিবর্তন করতে পারব?' },
          a: { en: 'Yes — upgrade anytime, instantly. Downgrade at next billing cycle. No penalties, no fees, no questions asked.', bn: 'হ্যাঁ — যেকোনো সময় আপগ্রেড, তাৎক্ষণিকভাবে। পরবর্তী বিলিং সাইকেলে ডাউনগ্রেড। কোনো পেনাল্টি, ফি বা প্রশ্ন নেই।' },
        },
        {
          q: { en: 'Is there a free trial?', bn: 'ফ্রি ট্রায়াল আছে?' },
          a: { en: 'We offer a free 30-minute strategy call + live demo. No 7-day trial because real setup takes 3-5 days. Instead: 60-day money-back guarantee.', bn: 'আমরা ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কল + লাইভ ডেমো অফার করি। ৭-দিন ট্রায়াল নেই কারণ আসল সেটআপে ৩-৫ দিন লাগে। এর বদলে: ৬০-দিন মানি-ব্যাক গ্যারান্টি।' },
        },
        {
          q: { en: 'What payment methods do you accept?', bn: 'কোন পেমেন্ট মেথড গ্রহণ করেন?' },
          a: { en: 'bKash, Nagad, Rocket, bank transfer, and Stripe (international). Annual plans can pay via cheque or LC for Enterprise.', bn: 'bKash, Nagad, Rocket, ব্যাংক ট্রান্সফার, এবং Stripe (আন্তর্জাতিক)। বার্ষিক প্ল্যানে এন্টারপ্রাইজের জন্য চেক বা LC।' },
        },
        {
          q: { en: 'Can I cancel anytime?', bn: 'যেকোনো সময় ক্যানসেল করতে পারব?' },
          a: { en: 'Yes — 30 days notice, no penalties, no exit fees. We even help you migrate your data out. Zero lock-in.', bn: 'হ্যাঁ — ৩০ দিন নোটিশ, কোনো পেনাল্টি বা এক্সিট ফি নেই। আমরা আপনার ডেটা মাইগ্রেট করতেও সাহায্য করি। জিরো লক-ইন।' },
        },
        {
          q: { en: 'Do you offer annual discounts?', bn: 'বার্ষিক ছাড় দেন?' },
          a: { en: 'Yes — 15% off annual billing, plus setup fee waived. Annual is the most popular choice for committed businesses.', bn: 'হ্যাঁ — বার্ষিক বিলিংয়ে ১৫% ছাড়, প্লাস সেটআপ ফি মওকুফ। কমিটেড ব্যবসার জন্য বার্ষিক সবচেয়ে জনপ্রিয় পছন্দ।' },
        },
      ],
    },
    {
      title: { en: 'Security & Compliance', bn: 'সিকিউরিটি ও কমপ্লায়েন্স' },
      items: [
        {
          q: { en: 'Is my customer data secure?', bn: 'আমার গ্রাহক ডেটা কি নিরাপদ?' },
          a: { en: 'Yes — AES-256 encryption at rest, TLS 1.3 in transit, GDPR compliant, SOC2 Type II, ISO 27001. Daily encrypted backups, 30-day retention.', bn: 'হ্যাঁ — AES-256 এনক্রিপশন অ্যাট রেস্ট, TLS 1.3 ইন ট্রানজিট, GDPR কমপ্লায়েন্ট, SOC2 Type II, ISO 27001। ডেইলি এনক্রিপ্টেড ব্যাকআপ, ৩০-দিন রিটেনশন।' },
        },
        {
          q: { en: 'Are calls recorded? Where are they stored?', bn: 'কল কি রেকর্ড করা হয়? কোথায় সংরক্ষিত?' },
          a: { en: 'Yes, every call is recorded in HD and stored encrypted on AWS data centers. Accessible only to authorised users, downloadable for training, 1-year retention included.', bn: 'হ্যাঁ, প্রতিটি কল HD-তে রেকর্ড হয় ও AWS ডেটা সেন্টারে এনক্রিপ্টেড সংরক্ষিত। শুধু অথোরাইজড ইউজারদের অ্যাক্সেসযোগ্য, ট্রেনিংয়ের জন্য ডাউনলোডযোগ্য, ১-বছর রিটেনশন অন্তর্ভুক্ত।' },
        },
        {
          q: { en: 'Is it GDPR compliant?', bn: 'GDPR কমপ্লায়েন্ট?' },
          a: { en: 'Yes — full GDPR compliance. Right to access, rectify, erase, portability. Data Processing Agreement (DPA) available on request.', bn: 'হ্যাঁ — সম্পূর্ণ GDPR কমপ্লায়েন্স। অ্যাক্সেস, সংশোধন, মুছে ফেলা, পোর্টেবিলিটির অধিকার। অনুরোধে Data Processing Agreement (DPA) অ্যাভেইলেবল।' },
        },
        {
          q: { en: 'Is it SOC2 / ISO 27001 certified?', bn: 'SOC2 / ISO 27001 সার্টিফাইড?' },
          a: { en: 'Yes — SOC2 Type II and ISO 27001 certified. Audit reports available under NDA for Enterprise customers.', bn: 'হ্যাঁ — SOC2 Type II ও ISO 27001 সার্টিফাইড। এন্টারপ্রাইজ কাস্টমারদের জন্য NDA-এর অধীনে অডিট রিপোর্ট অ্যাভেইলেবল।' },
        },
        {
          q: { en: 'Who owns the data?', bn: 'ডেটার মালিক কে?' },
          a: { en: 'You do — 100%. We never sell, share, or use your data for anything other than providing your service. Export anytime, leave anytime.', bn: 'আপনি — ১০০%। আমরা কখনো আপনার ডেটা বিক্রি, শেয়ার বা ব্যবহার করি না শুধু আপনার সার্ভিস দেওয়া ছাড়া। যেকোনো সময় এক্সপোর্ট করুন, যেকোনো সময় ছাড়ুন।' },
        },
        {
          q: { en: 'Can I control who accesses what?', bn: 'কে কী অ্যাক্সেস করবে নিয়ন্ত্রণ করতে পারব?' },
          a: { en: 'Yes — role-based permissions: admin, manager, agent, viewer. Granular access control, full audit logs of every action.', bn: 'হ্যাঁ — রোল-বেসড পারমিশন: অ্যাডমিন, ম্যানেজার, এজেন্ট, ভিউয়ার। গ্রানুলার অ্যাক্সেস কন্ট্রোল, প্রতিটি অ্যাকশনের পূর্ণ অডিট লগ।' },
        },
        {
          q: { en: 'Where is the data stored?', bn: 'ডেটা কোথায় সংরক্ষিত?' },
          a: { en: 'AWS data centers. Default: Singapore (closest to Bangladesh). Enterprise: choose Bangladesh, EU, or US for data residency.', bn: 'AWS ডেটা সেন্টার। ডিফল্ট: সিঙ্গাপুর (বাংলাদেশের সবচেয়ে কাছে)। এন্টারপ্রাইজ: ডেটা রেসিডেন্সির জন্য বাংলাদেশ, EU বা US বেছে নিন।' },
        },
        {
          q: { en: 'Do you have audit logs?', bn: 'অডিট লগ আছে?' },
          a: { en: 'Yes — every action logged: who did what, when, from where. Exportable for compliance audits, 1-year retention included.', bn: 'হ্যাঁ — প্রতিটি অ্যাকশন লগড: কে কী করেছে, কখন, কোথা থেকে। কমপ্লায়েন্স অডিটের জন্য এক্সপোর্টেবল, ১-বছর রিটেনশন অন্তর্ভুক্ত।' },
        },
        {
          q: { en: 'What about Bangladesh data laws?', bn: 'বাংলাদেশ ডেটা আইন কী?' },
          a: { en: 'We comply with Bangladesh ICT Act 2006 and Digital Security Act 2018. Enterprise plan offers in-country data residency option.', bn: 'আমরা বাংলাদেশ ICT অ্যাক্ট ২০০৬ ও ডিজিটাল সিকিউরিটি অ্যাক্ট ২০১৮ মেনে চলি। এন্টারপ্রাইজ প্ল্যানে ইন-কান্ট্রি ডেটা রেসিডেন্সি অপশন।' },
        },
      ],
    },
  ],
}

/* ========================================================================== */
/*  32. OBJECTIONS (8)                                                         */
/* ========================================================================== */

export const OBJECTIONS = {
  eyebrow: { en: 'Your concerns, addressed', bn: 'আপনার উদ্বেগ, সমাধান' } as Bilingual,
  title: {
    en: 'Common objections — honest answers',
    bn: 'সাধারণ আপত্তি — সততার উত্তর',
  } as Bilingual,
  subtitle: {
    en: 'We have heard every concern. Here are our honest, transparent responses.',
    bn: 'আমরা প্রতিটি উদ্বেগ শুনেছি। এখানে আমাদের সততার, স্বচ্ছ উত্তর।',
  } as Bilingual,
  items: [
    {
      objection: { en: '"Will it sound robotic to my customers?"', bn: '"আমার গ্রাহকদের কাছে এটা কি রোবটের মতো শোনাবে?"' },
      response: {
        en: 'No — we use ElevenLabs highest-quality voices with natural pauses, inflection, and emotion. In blind tests, 87% of callers could not tell it was AI. Most assume it is a polite human agent. We can also disclose "AI assistant" if you prefer full transparency.',
        bn: 'না — আমরা ElevenLabs-এর সর্বোচ্চ-কোয়ালিটি ভয়েস ব্যবহার করি স্বাভাবিক বিরতি, ইনফ্লেকশন ও আবেগ সহ। ব্লাইন্ড টেস্টে, ৮৭% কলার বুঝতে পারেননি এটি AI। বেশিরভাগ ধরে নেন ভদ্র হিউম্যান এজেন্ট। আপনি চাইলে সম্পূর্ণ স্বচ্ছতার জন্য "AI অ্যাসিস্ট্যান্ট" প্রকাশ করতে পারেন।',
      },
    },
    {
      objection: { en: '"My customers prefer talking to humans."', bn: '"আমার গ্রাহকরা হিউম্যানের সাথে কথা বলতে পছন্দ করেন।"' },
      response: {
        en: 'They prefer being answered instantly over waiting on hold for a human. 78% of customers would rather talk to an AI that solves their problem in 2 minutes than wait 15 minutes for a human. And for complex cases, AI transfers to human instantly with full context.',
        bn: 'তারা হিউম্যানের জন্য হোল্ডে অপেক্ষা করার চেয়ে তাৎক্ষণিকভাবে উত্তর পেতে পছন্দ করেন। ৭৮% গ্রাহক ১৫ মিনিট হিউম্যানের জন্য অপেক্ষা করার চেয়ে ২ মিনিটে সমস্যা সমাধান করা AI-এর সাথে কথা বলতে চান। এবং জটিল ক্ষেত্রে, AI পূর্ণ কনটেক্সট সহ তাৎক্ষণিকভাবে হিউম্যানে ট্রান্সফার করে।',
      },
    },
    {
      objection: { en: '"It is too expensive for my business."', bn: '"আমার ব্যবসার জন্য এটা খুব ব্যয়বহুল।"' },
      response: {
        en: 'Compare ৳35,000/month to: hiring 1 agent at ৳25,000–40,000 + training + office + benefits + turnover. AI handles 500+ calls for that price. The ROI calculator above shows most businesses recover the cost in 30–60 days. Plus 60-day money-back guarantee — zero risk.',
        bn: '৳৩৫,০০০/মাস-এর সাথে তুলনা করুন: ১ এজেন্ট নিয়োগ ৳২৫,০০০–৪০,০০০ + ট্রেনিং + অফিস + সুবিধা + টার্নওভার। AI ওই দামে ৫০০+ কল হ্যান্ডেল করে। উপরের ROI ক্যালকুলেটর দেখায় বেশিরভাগ ব্যবসা ৩০–৬০ দিনে খরচ তোলে। প্লাস ৬০-দিন মানি-ব্যাক গ্যারান্টি — জিরো ঝুঁকি।',
      },
    },
    {
      objection: { en: '"I do not have a CRM — will it still work?"', bn: '"আমার কাছে CRM নেই — তবু কাজ করবে?"' },
      response: {
        en: 'Yes — we set up a CRM for you (GoHighLevel included free on Growth plan). Or use Google Sheets as your CRM. The AI works standalone with built-in contact management. CRM sync is a bonus, not a requirement.',
        bn: 'হ্যাঁ — আমরা আপনার জন্য CRM সেটআপ করি (গ্রোথ প্ল্যানে GoHighLevel ফ্রি অন্তর্ভুক্ত)। বা Google Sheets কে CRM হিসেবে ব্যবহার করুন। AI বিল্ট-ইন কন্টাক্ট ম্যানেজমেন্ট সহ স্ট্যান্ডঅ্যালোন কাজ করে। CRM সিঙ্ক হলো বোনাস, প্রয়োজনীয়তা নয়।',
      },
    },
    {
      objection: { en: '"I have been burned by agencies before."', bn: '"আমি আগে এজেন্সি দিয়ে পুড়েছি।"' },
      response: {
        en: 'We understand. That is why we offer the 60-day ROI guarantee — if we do not deliver, you get 100% back AND we keep working for free until we do. Plus direct dashboard access from day 1, weekly reports, dedicated success manager. Full transparency, no black box.',
        bn: 'আমরা বুঝি। তাই ৬০-দিন ROI গ্যারান্টি — ডেলিভারি না করলে ১০০% ফেরত এবং না করা পর্যন্ত আমরা ফ্রি কাজ চালিয়ে যাব। প্লাস প্রথম দিন থেকে ড্যাশবোর্ড অ্যাক্সেস, সাপ্তাহিক রিপোর্ট, ডেডিকেটেড সাকসেস ম্যানেজার। সম্পূর্ণ স্বচ্ছতা, কোনো ব্ল্যাক বক্স নেই।',
      },
    },
    {
      objection: { en: '"My industry is too specialized."', bn: '"আমার ইন্ডাস্ট্রি খুব স্পেশালাইজড।"' },
      response: {
        en: 'We have deployed in 12+ industries — real estate, healthcare, education, manufacturing, insurance, hospitality, legal, agency, retail, restaurant, travel, recruitment. Each gets a custom-trained knowledge base. The AI learns your industry in days, not months.',
        bn: 'আমরা ১২+ ইন্ডাস্ট্রিতে ডিপ্লয় করেছি — রিয়েল এস্টেট, হেলথকেয়ার, শিক্ষা, ম্যানুফ্যাকচারিং, ইন্স্যুরেন্স, হসপিটালিটি, লিগ্যাল, এজেন্সি, রিটেইল, রেস্টুরেন্ট, ট্রাভেল, রিক্রুটমেন্ট। প্রতিটি কাস্টম-ট্রেইন্ড নলেজ বেস পায়। AI আপনার ইন্ডাস্ট্রি মাসে নয়, দিনে শেখে।',
      },
    },
    {
      objection: { en: '"I need to think about it."', bn: '"আমাকে ভাবতে হবে।"' },
      response: {
        en: 'Of course. But remember: every day you wait, you lose 30–60% of incoming calls to voicemail or competitors. The average client recovers setup cost in 30 days. Book the free 30-minute call — no commitment — see your ROI projection. Then decide.',
        bn: 'অবশ্যই। কিন্তু মনে রাখুন: প্রতিদিন অপেক্ষা করলে আপনি ইনকামিং কলের ৩০–৬০% ভয়েসমেইল বা প্রতিযোগীর কাছে হারান। গড় ক্লায়েন্ট সেটআপ খরচ ৩০ দিনে তোলে। ফ্রি ৩০-মিনিট কল বুক করুন — কোনো কমিটমেন্ট নেই — ROI প্রজেকশন দেখুন। তারপর সিদ্ধান্ত নিন।',
      },
    },
    {
      objection: { en: '"What if it stops working?"', bn: '"যদি কাজ করা বন্ধ করে দেয়?"' },
      response: {
        en: '99.9% uptime SLA on Enterprise. We monitor 24/7, have automated failover, and a human on-call engineer. If it ever goes down, we credit your account per SLA. Plus your existing phone line keeps working as backup — calls never get lost.',
        bn: 'এন্টারপ্রাইজে ৯৯.৯% আপটাইম SLA। আমরা ২৪/৭ মনিটর করি, অটোমেটেড ফেইলওভার আছে, এবং অন-কল ইঞ্জিনিয়ার আছেন। কখনো ডাউন হলে, SLA অনুযায়ী আপনার অ্যাকাউন্টে ক্রেডিট দেই। প্লাস আপনার বর্তমান ফোন লাইন ব্যাকআপ হিসেবে কাজ করে — কল কখনো হারায় না।',
      },
    },
  ],
}

/* ========================================================================== */
/*  33. SECURITY (9)                                                           */
/* ========================================================================== */

export const SECURITY = {
  eyebrow: { en: 'Enterprise-grade security', bn: 'এন্টারপ্রাইজ-গ্রেড সিকিউরিটি' } as Bilingual,
  title: {
    en: 'Your data is protected like a bank vault',
    bn: 'আপনার ডেটা ব্যাংক ভল্টের মতো সুরক্ষিত',
  } as Bilingual,
  subtitle: {
    en: 'Every layer — from network to voice to database — is hardened, audited, and certified.',
    bn: 'প্রতিটি স্তর — নেটওয়ার্ক থেকে ভয়েস থেকে ডেটাবেস — হার্ডেন্ড, অডিটেড ও সার্টিফাইড।',
  } as Bilingual,
  items: [
    {
      icon: 'lock',
      title: { en: 'TLS Encryption', bn: 'TLS এনক্রিপশন' },
      desc: { en: 'TLS 1.3 for all data in transit. Every call, every API request, every webhook — encrypted end-to-end.', bn: 'ইন ট্রানজিট সব ডেটার জন্য TLS 1.3। প্রতিটি কল, প্রতিটি API রিকোয়েস্ট, প্রতিটি webhook — এন্ড-টু-এন্ড এনক্রিপ্টেড।' },
    },
    {
      icon: 'shield',
      title: { en: 'AES-256 at Rest', bn: 'AES-256 অ্যাট রেস্ট' },
      desc: { en: 'All data at rest encrypted with AES-256 — recordings, transcripts, contact data, call logs.', bn: 'অ্যাট রেস্ট সব ডেটা AES-256 দিয়ে এনক্রিপ্টেড — রেকর্ডিং, ট্রান্সক্রিপ্ট, কন্টাক্ট ডেটা, কল লগ।' },
    },
    {
      icon: 'shield-check',
      title: { en: 'SOC2 Type II', bn: 'SOC2 Type II' },
      desc: { en: 'Audited and certified. Annual third-party audits. Reports available under NDA for Enterprise customers.', bn: 'অডিটেড ও সার্টিফাইড। বার্ষিক থার্ড-পার্টি অডিট। এন্টারপ্রাইজ কাস্টমারদের জন্য NDA-এর অধীনে রিপোর্ট অ্যাভেইলেবল।' },
    },
    {
      icon: 'shield-check',
      title: { en: 'ISO 27001', bn: 'ISO 27001' },
      desc: { en: 'Information security management system certified. Stringent controls across people, process, technology.', bn: 'ইনফরমেশন সিকিউরিটি ম্যানেজমেন্ট সিস্টেম সার্টিফাইড। মানুষ, প্রসেস, টেকনোলজিতে কড়া কন্ট্রোল।' },
    },
    {
      icon: 'shield-check',
      title: { en: 'GDPR Compliance', bn: 'GDPR কমপ্লায়েন্স' },
      desc: { en: 'Right to access, rectify, erase, portability. Data Processing Agreement (DPA) available on request.', bn: 'অ্যাক্সেস, সংশোধন, মুছে ফেলা, পোর্টেবিলিটির অধিকার। অনুরোধে Data Processing Agreement (DPA) অ্যাভেইলেবল।' },
    },
    {
      icon: 'users',
      title: { en: 'Role-Based Permissions', bn: 'রোল-বেসড পারমিশন' },
      desc: { en: 'Admin, manager, agent, viewer roles. Granular access control — users see only what they need.', bn: 'অ্যাডমিন, ম্যানেজার, এজেন্ট, ভিউয়ার রোল। গ্রানুলার অ্যাক্সেস কন্ট্রোল — ইউজার শুধু দরকারী জিনিস দেখেন।' },
    },
    {
      icon: 'file-search',
      title: { en: 'Audit Logs', bn: 'অডিট লগ' },
      desc: { en: 'Every action logged — who did what, when, from where. Exportable for compliance audits, 1-year retention.', bn: 'প্রতিটি অ্যাকশন লগড — কে কী করেছে, কখন, কোথা থেকে। কমপ্লায়েন্স অডিটের জন্য এক্সপোর্টেবল, ১-বছর রিটেনশন।' },
    },
    {
      icon: 'lock',
      title: { en: 'End-to-End Encryption', bn: 'এন্ড-টু-এন্ড এনক্রিপশন' },
      desc: { en: 'Call audio, transcripts, and customer data encrypted end-to-end. Even our engineers cannot decrypt without your keys.', bn: 'কল অডিও, ট্রান্সক্রিপ্ট ও গ্রাহক ডেটা এন্ড-টু-এন্ড এনক্রিপ্টেড। আমাদের ইঞ্জিনিয়াররাও আপনার কী ছাড়া ডিক্রিপ্ট করতে পারেন না।' },
    },
    {
      icon: 'cloud',
      title: { en: 'Cloudflare Protection', bn: 'Cloudflare প্রটেকশন' },
      desc: { en: 'Web Application Firewall + DDoS protection + global CDN. Bot mitigation, rate limiting, IP filtering.', bn: 'ওয়েব অ্যাপ্লিকেশন ফায়ারওয়াল + DDoS প্রটেকশন + গ্লোবাল CDN। বট মিটিগেশন, রেট লিমিটিং, IP ফিল্টারিং।' },
    },
  ],
  certifications: [
    { en: 'GDPR', bn: 'GDPR' },
    { en: 'ISO 27001', bn: 'ISO 27001' },
    { en: 'SOC 2 Type II', bn: 'SOC 2 Type II' },
    { en: 'AES-256', bn: 'AES-256' },
    { en: 'TLS 1.3', bn: 'TLS 1.3' },
    { en: 'Bangladesh ICT Act 2006', bn: 'বাংলাদেশ ICT অ্যাক্ট ২০০৬' },
    { en: 'Digital Security Act 2018', bn: 'ডিজিটাল সিকিউরিটি অ্যাক্ট ২০১৮' },
    { en: 'CCPA', bn: 'CCPA' },
  ] as Bilingual[],
}

/* ========================================================================== */
/*  34. DEVELOPER SECTION                                                      */
/* ========================================================================== */

export const DEVELOPER_SECTION = {
  eyebrow: { en: 'For developers', bn: 'ডেভেলপারদের জন্য' } as Bilingual,
  title: {
    en: 'Build custom voice experiences with our API',
    bn: 'আমাদের API দিয়ে কাস্টম ভয়েস অভিজ্ঞতা তৈরি করুন',
  } as Bilingual,
  subtitle: {
    en: 'Full programmatic control. REST API, webhooks, SDK, and comprehensive docs. Build anything.',
    bn: 'সম্পূর্ণ প্রোগ্রাম্যাটিক কন্ট্রোল। REST API, webhooks, SDK, ও কমপ্রিহেনসিভ ডকস। যেকোনো কিছু বিল্ড করুন।',
  } as Bilingual,
  items: [
    {
      icon: 'code',
      title: { en: 'REST API', bn: 'REST API' },
      desc: { en: 'Trigger calls, fetch transcripts, manage contacts, build custom flows. Full CRUD on every resource.', bn: 'কল ট্রিগার, ট্রান্সক্রিপ্ট ফেচ, কন্টাক্ট ম্যানেজ, কাস্টম ফ্লো বিল্ড। প্রতিটি রিসোর্সে ফুল CRUD।' },
    },
    {
      icon: 'plug',
      title: { en: 'Webhooks', bn: 'Webhooks' },
      desc: { en: 'Real-time events: call.started, call.ended, booking.created, lead.qualified, sentiment.changed. Push to any URL.', bn: 'রিয়েল-টাইম ইভেন্ট: call.started, call.ended, booking.created, lead.qualified, sentiment.changed। যেকোনো URL-এ পুশ।' },
    },
    {
      icon: 'code',
      title: { en: 'CRM SDK', bn: 'CRM SDK' },
      desc: { en: 'Official SDKs for Node.js, Python, PHP, Java. Two-way sync with HubSpot, Salesforce, GHL, Zoho.', bn: 'Node.js, Python, PHP, Java-এর জন্য অফিশিয়াল SDK। HubSpot, Salesforce, GHL, Zoho-এর সাথে টু-ওয়ে সিঙ্ক।' },
    },
    {
      icon: 'book-open',
      title: { en: 'Documentation', bn: 'ডকুমেন্টেশন' },
      desc: { en: 'Comprehensive docs, interactive API explorer, code samples in 6 languages, postman collection.', bn: 'কমপ্রিহেনসিভ ডকস, ইন্টারঅ্যাক্টিভ API এক্সপ্লোরার, ৬টি ভাষায় কোড স্যাম্পল, পোস্টম্যান কালেকশন।' },
    },
    {
      icon: 'zap',
      title: { en: 'Voice Events', bn: 'ভয়েস ইভেন্ট' },
      desc: { en: 'Subscribe to real-time voice events: speech detected, intent changed, emotion changed, silence detected.', bn: 'রিয়েল-টাইম ভয়েস ইভেন্টে সাবস্ক্রাইব: স্পিচ ডিটেক্টেড, ইনটেন্ট চেঞ্জড, ইমোশন চেঞ্জড, সাইলেন্স ডিটেক্টেড।' },
    },
    {
      icon: 'flask-conical',
      title: { en: 'Sandbox', bn: 'স্যান্ডবক্স' },
      desc: { en: 'Free sandbox environment with test phone numbers, mock CRM, and sample data. Test before going live.', bn: 'টেস্ট ফোন নম্বর, মক CRM, ও স্যাম্পল ডেটা সহ ফ্রি স্যান্ডবক্স এনভায়রনমেন্ট। লাইভ হওয়ার আগে টেস্ট করুন।' },
    },
  ],
  codeSnippet: {
    language: 'javascript',
    code: `// Trigger an AI Voice Agent call to a customer
const response = await fetch('https://api.nextgenvoice.ai/v1/calls', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '+8801711234567',
    agent_id: 'agent_bangla_v2',
    language: 'auto', // auto-detect Bangla or English
    context: {
      customer_id: 'cust_123',
      purpose: 'appointment_reminder',
      appointment_time: '2025-02-15T14:00:00+06:00',
    },
    workflow: 'reminder_flow_v1',
    record: true,
    transcribe: true,
  }),
})

const call = await response.json()
console.log('Call started:', call.id)
// Webhook fires when call ends with full transcript + summary + sentiment`,
  },
}

/* ========================================================================== */
/*  35. KNOWLEDGE BASE (4)                                                     */
/* ========================================================================== */

export const KNOWLEDGE_BASE = {
  eyebrow: { en: 'Self-serve resources', bn: 'সেল্ফ-সার্ভ রিসোর্স' } as Bilingual,
  title: {
    en: 'Learn, master, and optimise — at your pace',
    bn: 'শিখুন, মাস্টার করুন, ও অপটিমাইজ করুন — আপনার গতিতে',
  } as Bilingual,
  subtitle: {
    en: 'Full library of videos, guides, templates, and prompts. Everything your team needs to succeed.',
    bn: 'ভিডিও, গাইড, টেমপ্লেট ও প্রম্পটের ফুল লাইব্রেরি। আপনার টিমের সফল হতে যা প্রয়োজন।',
  } as Bilingual,
  items: [
    {
      icon: 'play-circle',
      title: { en: 'Video Tutorials', bn: 'ভিডিও টিউটোরিয়াল' },
      desc: { en: '50+ step-by-step videos — setup, configuration, optimisation, advanced workflows. Bangla + English.', bn: '৫০+ স্টেপ-বাই-স্টেপ ভিডিও — সেটআপ, কনফিগারেশন, অপটিমাইজেশন, অ্যাডভান্সড ওয়ার্কফ্লো। বাংলা + ইংরেজি।' },
    },
    {
      icon: 'book-open',
      title: { en: 'Setup Guides', bn: 'সেটআপ গাইড' },
      desc: { en: 'Comprehensive written guides for every integration, workflow, and use case. Searchable, bookmarkable.', bn: 'প্রতিটি ইন্টিগ্রেশন, ওয়ার্কফ্লো ও ইউজ-কেসের জন্য কমপ্রিহেনসিভ লিখিত গাইড। সার্চেবল, বুকমার্কেবল।' },
    },
    {
      icon: 'file-text',
      title: { en: 'Template Library', bn: 'টেমপ্লেট লাইব্রেরি' },
      desc: { en: '30+ pre-built call flows, prompts, KB structures, and dashboards. Copy, customise, deploy.', bn: '৩০+ প্রি-বিল্ট কল ফ্লো, প্রম্পট, KB স্ট্রাকচার, ও ড্যাশবোর্ড। কপি, কাস্টমাইজ, ডিপ্লয়।' },
    },
    {
      icon: 'lightbulb',
      title: { en: 'Prompt Library', bn: 'প্রম্পট লাইব্রেরি' },
      desc: { en: 'Tested, optimised prompts for 20+ industries. Proven to drive 30% higher conversion than generic prompts.', bn: '২০+ ইন্ডাস্ট্রির জন্য টেস্টেড, অপটিমাইজড প্রম্পট। জেনেরিক প্রম্পটের চেয়ে ৩০% উচ্চতর কনভার্সন প্রমাণিত।' },
    },
  ],
}

/* ========================================================================== */
/*  36. TIMELINE (6 phases)                                                    */
/* ========================================================================== */

export const TIMELINE = {
  eyebrow: { en: 'From zero to live', bn: 'জিরো থেকে লাইভ' } as Bilingual,
  title: {
    en: 'Your AI Voice Agent goes live in 3–5 days',
    bn: 'আপনার AI Voice Agent ৩–৫ দিনে লাইভ হয়',
  } as Bilingual,
  subtitle: {
    en: 'A clear, milestone-driven rollout. You see progress every day.',
    bn: 'একটি স্পষ্ট, মাইলস্টোন-চালিত রোলআউট। প্রতিদিন অগ্রগতি দেখবেন।',
  } as Bilingual,
  phases: [
    {
      phase: { en: 'Day 1', bn: 'দিন ১' },
      title: { en: 'Strategy Call & Discovery', bn: 'স্ট্র্যাটেজি কল ও ডিসকভারি' },
      desc: { en: '30-min call. We audit your call patterns, map use cases, define success metrics, plan telephony.', bn: '৩০-মিনিট কল। আমরা আপনার কল প্যাটার্ন অডিট করি, ইউজ-কেস ম্যাপ করি, সাফল্য মেট্রিক নির্ধারণ করি, টেলিফোনি প্ল্যান করি।' },
      duration: { en: '1 day', bn: '১ দিন' },
    },
    {
      phase: { en: 'Day 2–3', bn: 'দিন ২–৩' },
      title: { en: 'Voice + Knowledge Base Setup', bn: 'ভয়েস + নলেজ বেস সেটআপ' },
      desc: { en: 'Voice selection, brand persona design, prompt engineering, KB training on your business data.', bn: 'ভয়েস নির্বাচন, ব্র্যান্ড পার্সোনা ডিজাইন, প্রম্পট ইঞ্জিনিয়ারিং, আপনার ব্যবসা ডেটায় KB ট্রেনিং।' },
      duration: { en: '2 days', bn: '২ দিন' },
    },
    {
      phase: { en: 'Day 4–5', bn: 'দিন ৪–৫' },
      title: { en: 'CRM + Calendar Integration', bn: 'CRM + ক্যালেন্ডার ইন্টিগ্রেশন' },
      desc: { en: 'Native sync with your CRM, calendar, payment, and messaging tools. Two-way data flow configured.', bn: 'আপনার CRM, ক্যালেন্ডার, পেমেন্ট ও মেসেজিং টুলের সাথে নেটিভ সিঙ্ক। টু-ওয়ে ডেটা ফ্লো কনফিগারড।' },
      duration: { en: '2 days', bn: '২ দিন' },
    },
    {
      phase: { en: 'Day 6', bn: 'দিন ৬' },
      title: { en: 'Testing & Training', bn: 'টেস্টিং ও ট্রেনিং' },
      desc: { en: '100+ test calls in Bangla + English. Team training session. Dashboard walkthrough. Go-live checklist.', bn: 'বাংলা + ইংরেজিতে ১০০+ টেস্ট কল। টিম ট্রেনিং সেশন। ড্যাশবোর্ড ওয়াকথ্রু। গো-লাইভ চেকলিস্ট।' },
      duration: { en: '1 day', bn: '১ দিন' },
    },
    {
      phase: { en: 'Week 2', bn: 'সপ্তাহ ২' },
      title: { en: 'Go-Live & Monitoring', bn: 'গো-লাইভ ও মনিটরিং' },
      desc: { en: 'AI goes live on your phone number. We monitor every call for the first week, tune prompts, optimise performance.', bn: 'AI আপনার ফোন নম্বরে লাইভ হয়। আমরা প্রথম সপ্তাহে প্রতিটি কল মনিটর করি, প্রম্পট টিউন করি, পারফরম্যান্স অপটিমাইজ করি।' },
      duration: { en: '1 week', bn: '১ সপ্তাহ' },
    },
    {
      phase: { en: 'Month 2', bn: 'মাস ২' },
      title: { en: 'Optimisation & Scale', bn: 'অপটিমাইজেশন ও স্কেল' },
      desc: { en: 'Monthly optimisation call. A/B test prompts. Expand workflows. Add languages. Scale to more numbers.', bn: 'মাসিক অপটিমাইজেশন কল। A/B টেস্ট প্রম্পট। ওয়ার্কফ্লো এক্সপ্যান্ড। ভাষা যোগ। আরও নম্বরে স্কেল।' },
      duration: { en: 'Ongoing', bn: 'চলমান' },
    },
  ],
}

/* ========================================================================== */
/*  37. PROCESS (5-step)                                                       */
/* ========================================================================== */

export const PROCESS = {
  eyebrow: { en: 'Our proven methodology', bn: 'আমাদের প্রমাণিত মেথড' } as Bilingual,
  title: {
    en: '5 steps from audit to optimisation',
    bn: 'অডিট থেকে অপটিমাইজেশন — ৫ ধাপে',
  } as Bilingual,
  subtitle: {
    en: 'A repeatable process refined across 50+ deployments. Predictable results, every time.',
    bn: '৫০+ ডিপ্লয়মেন্ট জুড়ে রিফাইনড রিপিটেবল প্রসেস। প্রতিবার প্রেডিক্টেবল ফলাফল।',
  } as Bilingual,
  steps: [
    {
      num: '01',
      title: { en: 'Audit', bn: 'অডিট' },
      desc: { en: 'We analyse your current call handling: volume, missed %, response time, customer journey, CRM setup, gaps.', bn: 'আমরা আপনার বর্তমান কল হ্যান্ডলিং বিশ্লেষণ করি: ভলিউম, মিসড %, রেসপন্স টাইম, কাস্টমার জার্নি, CRM সেটআপ, গ্যাপ।' },
    },
    {
      num: '02',
      title: { en: 'Design', bn: 'ডিজাইন' },
      desc: { en: 'We design your custom voice agent: voice persona, call flows, knowledge base, integrations, success metrics.', bn: 'আমরা আপনার কাস্টম ভয়েস এজেন্ট ডিজাইন করি: ভয়েস পার্সোনা, কল ফ্লো, নলেজ বেস, ইন্টিগ্রেশন, সাফল্য মেট্রিক।' },
    },
    {
      num: '03',
      title: { en: 'Build', bn: 'বিল্ড' },
      desc: { en: 'We build, configure, train, and integrate — voice model, prompts, KB, CRM, calendar, telephony, dashboard.', bn: 'আমরা বিল্ড, কনফিগার, ট্রেন ও ইন্টিগ্রেট করি — ভয়েস মডেল, প্রম্পট, KB, CRM, ক্যালেন্ডার, টেলিফোনি, ড্যাশবোর্ড।' },
    },
    {
      num: '04',
      title: { en: 'Launch', bn: 'লঞ্চ' },
      desc: { en: 'We test 100+ scenarios, train your team, flip the switch. AI is live in 3–5 days. We monitor first week.', bn: 'আমরা ১০০+ সিনারিও টেস্ট করি, আপনার টিম ট্রেন করি, সুইচ অন করি। AI ৩–৫ দিনে লাইভ। আমরা প্রথম সপ্তাহ মনিটর করি।' },
    },
    {
      num: '05',
      title: { en: 'Optimise', bn: 'অপটিমাইজ' },
      desc: { en: 'Monthly: prompt tuning, KB updates, workflow refinement, A/B testing. Your agent gets smarter every month.', bn: 'মাসিক: প্রম্পট টিউনিং, KB আপডেট, ওয়ার্কফ্লো রিফাইনমেন্ট, A/B টেস্টিং। আপনার এজেন্ট প্রতি মাসে স্মার্ট হয়।' },
    },
  ],
}

/* ========================================================================== */
/*  38. TRUST (8 badges + certifications)                                      */
/* ========================================================================== */

export const TRUST = {
  eyebrow: { en: 'Trusted & certified', bn: 'বিশ্বস্ত ও সার্টিফাইড' } as Bilingual,
  title: {
    en: 'Trusted by 50+ businesses, certified by global standards',
    bn: '৫০+ ব্যবসার বিশ্বস্ত, গ্লোবাল স্ট্যান্ডার্ডে সার্টিফাইড',
  } as Bilingual,
  subtitle: {
    en: 'Our commitment to quality, security, and results — verified by third parties.',
    bn: 'কোয়ালিটি, সিকিউরিটি ও ফলাফলে আমাদের প্রতিশ্রুতি — থার্ড-পার্টি দ্বারা ভেরিফাইড।',
  } as Bilingual,
  badges: [
    { icon: 'shield-check', label: { en: 'GDPR Compliant', bn: 'GDPR কমপ্লায়েন্ট' } },
    { icon: 'shield-check', label: { en: 'ISO 27001', bn: 'ISO 27001' } },
    { icon: 'shield-check', label: { en: 'SOC2 Type II', bn: 'SOC2 Type II' } },
    { icon: 'star', label: { en: '4.9★ Rating', bn: '৪.৯★ রেটিং' } },
    { icon: 'users', label: { en: '50+ Active Clients', bn: '৫০+ সক্রিয় ক্লায়েন্ট' } },
    { icon: 'clock', label: { en: '24/7 Support', bn: '২৪/৭ সাপোর্ট' } },
    { icon: 'trophy', label: { en: '5.8x Avg ROI', bn: 'গড় ৫.৮x ROI' } },
    { icon: 'zap', label: { en: '99.9% Uptime', bn: '৯৯.৯% আপটাইম' } },
  ],
  certifications: [
    { en: 'OpenAI Partner', bn: 'OpenAI পার্টনার' },
    { en: 'ElevenLabs Partner', bn: 'ElevenLabs পার্টনার' },
    { en: 'Twilio Verified', bn: 'Twilio ভেরিফাইড' },
    { en: 'Meta Business Partner', bn: 'Meta বিজনেস পার্টনার' },
    { en: 'HubSpot Solutions Partner', bn: 'HubSpot সলিউশনস পার্টনার' },
    { en: 'AWS Partner Network', bn: 'AWS পার্টনার নেটওয়ার্ক' },
    { en: 'Cloudflare Partner', bn: 'Cloudflare পার্টনার' },
    { en: 'Vapi Authorised Partner', bn: 'Vapi অথোরাইজড পার্টনার' },
  ] as Bilingual[],
}

/* ========================================================================== */
/*  39. FINAL CTA                                                              */
/* ========================================================================== */

export const FINAL_CTA = {
  eyebrow: { en: 'Ready when you are', bn: 'আপনি প্রস্তুত হলে' } as Bilingual,
  title: {
    en: 'Stop losing customers to missed calls. Start answering with AI today.',
    bn: 'মিসড কলে গ্রাহক হারানো বন্ধ করুন। আজই AI দিয়ে উত্তর দেওয়া শুরু করুন।',
  } as Bilingual,
  subtitle: {
    en: 'Book your free 30-minute strategy call. Walk away with a custom AI Voice Agent roadmap — whether you hire us or not.',
    bn: 'ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কল বুক করুন। কাস্টম AI Voice Agent রোডম্যাপ নিয়ে যান — আমাদের হায়ার করেন বা না করেন।',
  } as Bilingual,
  primaryCta: {
    en: 'Book My Free Strategy Call',
    bn: 'আমার ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
  secondaryCta: {
    en: 'Chat on WhatsApp',
    bn: 'WhatsApp-এ চ্যাট করুন',
  } as Bilingual,
  trustRow: [
    { en: '3–5 day setup', bn: '৩–৫ দিনে সেটআপ' },
    { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '24/7 support', bn: '২৪/৭ সাপোর্ট' },
    { en: 'Bangla + English', bn: 'বাংলা + ইংরেজি' },
  ] as Bilingual[],
  urgencyNote: {
    en: 'Every day you wait = 30–60 missed calls = ৳15,000–50,000 lost. Your competitors are already answering.',
    bn: 'প্রতিদিন অপেক্ষা = ৩০–৬০ মিসড কল = ৳১৫,০০০–৫০,০০০ হারানো। আপনার প্রতিযোগীরা ইতিমধ্যে উত্তর দিচ্ছে।',
  } as Bilingual,
}

/* ========================================================================== */
/*  SECTION ORDER (for the client renderer)                                    */
/* ========================================================================== */

export const SECTION_ORDER = [
  'hero',
  'urgency',
  'metrics',
  'problem',
  'emotional-cost',
  'why-traditional',
  'why-nextgen',
  'framework',
  'how-it-works',
  'conversation-example',
  'use-cases',
  'features',
  'voice-capabilities',
  'integrations',
  'industry-solutions',
  'comparison',
  'before-after',
  'ai-vs-human',
  'roi-calculator',
  'call-flow',
  'workflows',
  'dashboard',
  'case-studies',
  'testimonials',
  'statistics',
  'deliverables',
  'pricing',
  'guarantees',
  'faq',
  'objections',
  'security',
  'developer',
  'knowledge-base',
  'timeline',
  'process',
  'trust',
  'final-cta',
  'lead-form',
] as const
