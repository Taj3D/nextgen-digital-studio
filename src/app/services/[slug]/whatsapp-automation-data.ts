/**
 * WhatsApp Automation — Enterprise Landing Page Data
 * --------------------------------------------------
 * Bilingual (EN/BN) content for the dedicated /services/whatsapp-automation
 * landing page. Adapted from the uploaded reference HTML (INR/Indian context)
 * to BDT/Bangladesh context. All copy is enterprise-grade and follows the
 * Hormozi Value Equation + StoryBrand + Brian Tracy sales psychology.
 *
 * This file is imported ONLY by whatsapp-automation-client.tsx and page.tsx.
 * It does NOT affect the other 11 services (they use the generic LandingClient).
 */

export type Bilingual = { en: string; bn: string }

/** Helper for fields that may be single-string (EN-only) or bilingual. */
export type L<T = Bilingual> = T

/* ========================================================================== */
/*  1. HERO SECTION                                                            */
/* ========================================================================== */

export const HERO = {
  eyebrow: {
    en: 'Official WhatsApp Business API · Meta Partner Ready',
    bn: 'অফিশিয়াল WhatsApp Business API · মেটা পার্টনার রেডি',
  } as Bilingual,
  titleA: {
    en: 'AI-Powered',
    bn: 'AI-চালিত',
  } as Bilingual,
  titleB: {
    en: 'WhatsApp Automation System',
    bn: 'হোয়াটসঅ্যাপ অটোমেশন সিস্টেম',
  } as Bilingual,
  subtitle: {
    en: 'Official WhatsApp Business API-powered automation — broadcast campaigns, AI chatbot, order tracking, abandoned-cart recovery, payment links and 24/7 support. Fully automated, zero coding required.',
    bn: 'অফিশিয়াল WhatsApp Business API ব্যবহার করে ব্রডকাস্ট ক্যাম্পেইন, চ্যাটবট, অর্ডার ট্র্যাকিং, অ্যাব্যান্ডনড-কার্ট রিকভারি, পেমেন্ট লিংক ও ২৪/৭ সাপোর্ট — সম্পূর্ণ অটোমেটেড, কোডিং প্রয়োজন নেই।',
  } as Bilingual,
  roiBadge: {
    en: "Bangladesh's #1 messaging app — fully automated",
    bn: 'বাংলাদেশের #১ মেসেজিং অ্যাপে অটোমেটেড যোগাযোগ',
  } as Bilingual,
  roiSub: {
    en: '98% open rate · 5–10x ROI · 24/7 AI replies',
    bn: '৯৮% ওপেন রেট · ৫–১০x ROI · ২৪/৭ AI রিপ্লাই',
  } as Bilingual,
  primaryCta: {
    en: 'Book a Free Strategy Call',
    bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
  secondaryCta: {
    en: 'Explore Features',
    bn: 'ফিচার দেখুন',
  } as Bilingual,
  trustBadges: [
    { en: '3–5 day setup', bn: '৩–৫ দিনে সেটআপ' },
    { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '24/7 support', bn: '২৪/৭ সাপোর্ট' },
    { en: 'No coding required', bn: 'কোডিং প্রয়োজন নেই' },
  ] as Bilingual[],
  trustRow: [
    { en: 'Meta Partner Ready', bn: 'মেটা পার্টনার রেডি' },
    { en: 'Official API', bn: 'অফিশিয়াল API' },
    { en: 'Enterprise-grade', bn: 'এন্টারপ্রাইজ-গ্রেড' },
    { en: 'GDPR compliant', bn: 'GDPR কমপ্লায়েন্ট' },
    { en: 'End-to-end encryption', bn: 'এন্ড-টু-এন্ড এনক্রিপশন' },
  ] as Bilingual[],
}

/* ========================================================================== */
/*  2. HERO METRICS                                                            */
/* ========================================================================== */

export const HERO_METRICS = {
  eyebrow: { en: 'Real Numbers, Real Results', bn: 'বাস্তব সংখ্যা, বাস্তব ফলাফল' } as Bilingual,
  title: {
    en: 'Trusted by 50+ businesses across Bangladesh',
    bn: 'বাংলাদেশের ৫০+ ব্যবসা আমাদের উপর নির্ভর করে',
  } as Bilingual,
  stats: [
    { value: '10,00,000+', label: { en: 'Messages delivered / month', bn: 'বার্তা ডেলিভারি/মাস' } },
    { value: '98%', label: { en: 'Open rate', bn: 'ওপেন রেট' } },
    { value: '45%', label: { en: 'Average reply rate', bn: 'গড় রিপ্লাই রেট' } },
    { value: '4.5x', label: { en: 'Average ROI', bn: 'গড় ROI' } },
    { value: '50+', label: { en: 'Active businesses', bn: 'সক্রিয় ব্যবসা' } },
    { value: '94%', label: { en: 'Customer satisfaction', bn: 'গ্রাহক সন্তুষ্টি' } },
    { value: '<3s', label: { en: 'AI reply time', bn: 'AI রিপ্লাই টাইম' } },
    { value: '99.9%', label: { en: 'Uptime SLA', bn: 'আপটাইম SLA' } },
  ],
}

/* ========================================================================== */
/*  3. CUSTOMER PROBLEMS                                                       */
/* ========================================================================== */

export const PROBLEM = {
  eyebrow: { en: 'Are you suffering from these?', bn: 'আপনি কি এই সমস্যাগুলোতে ভুগছেন?' } as Bilingual,
  title: {
    en: 'What happens when you run WhatsApp manually?',
    bn: 'হোয়াটসঅ্যাপ ম্যানুয়ালি পরিচালনা করলে কী হয়?',
  } as Bilingual,
  subtitle: {
    en: 'If you still run WhatsApp manually — you are losing business every single day.',
    bn: 'আপনি যদি এখনও ম্যানুয়ালি হোয়াটসঅ্যাপ চালান — তাহলে প্রতিদিনই ব্যবসা হারাচ্ছেন।',
  } as Bilingual,
  pains: [
    {
      title: { en: 'No replies', bn: 'কোনো রিপ্লাই নেই' },
      desc: {
        en: 'Customers message, but nobody answers. They leave for your competitor.',
        bn: 'গ্রাহকরা বার্তা দেয়, কিন্তু কেউ উত্তর দেয় না। তারা প্রতিযোগীর কাছে চলে যায়।',
      },
    },
    {
      title: { en: 'Slow support', bn: 'স্লো সাপোর্ট' },
      desc: {
        en: 'Hours of waiting. Customers get frustrated and never return.',
        bn: 'ঘন্টার পর ঘন্টা অপেক্ষা। গ্রাহক ফ্রাস্ট্রেটেড হয়ে আর ফিরে আসে না।',
      },
    },
    {
      title: { en: 'Lost leads', bn: 'লিড হারানো' },
      desc: {
        en: 'Inquiries come in, but nobody follows up. 80% of leads go cold.',
        bn: 'ইনকোয়ারি আসে, কিন্তু ফলো-আপ হয় না। ৮০% লিড কোল্ড হয়ে যায়।',
      },
    },
    {
      title: { en: 'Manual messaging', bn: 'ম্যানুয়াল মেসেজিং' },
      desc: {
        en: 'Sending messages one-by-one to each customer. Hours wasted daily.',
        bn: 'প্রতিটি গ্রাহককে আলাদাভাবে মেসেজ করতে হয়। প্রতিদিন সময় নষ্ট।',
      },
    },
    {
      title: { en: 'No follow-up', bn: 'কোনো ফলো-আপ নেই' },
      desc: {
        en: 'One message and done. No re-engagement, no nurturing, no win-back.',
        bn: 'একবার মেসেজ দিয়েই শেষ। কোনো রি-এনগেজমেন্ট, নার্চারিং বা উইন-ব্যাক নেই।',
      },
    },
    {
      title: { en: 'Missed orders', bn: 'মিসড অর্ডার' },
      desc: {
        en: 'Cannot send order confirmation or tracking. Customers call repeatedly.',
        bn: 'অর্ডার কনফার্মেশন বা ট্র্যাকিং পাঠাতে পারছেন না। গ্রাহকরা বারবার ফোন করে।',
      },
    },
    {
      title: { en: 'Negative reviews', bn: 'নেগেটিভ রিভিউ' },
      desc: {
        en: 'Slow support → unhappy customers → 1-star reviews → brand damage.',
        bn: 'ধীর সাপোর্ট → অসন্তুষ্ট গ্রাহক → ১-স্টার রিভিউ → ব্র্যান্ড ইমেজ নষ্ট।',
      },
    },
    {
      title: { en: 'Sales leakage', bn: 'সেলস লিকেজ' },
      desc: {
        en: 'Thousands of taka in opportunities lost every single day.',
        bn: 'প্রতিদিন হাজার হাজার টাকার সুযোগ হারাচ্ছেন।',
      },
    },
    {
      title: { en: 'No analytics', bn: 'কোনো অ্যানালিটিক্স নেই' },
      desc: {
        en: 'No idea which campaigns work, which agents perform, what converts.',
        bn: 'কোন ক্যাম্পেইন কাজ করে, কোন এজেন্ট ভাল করে, কী কনভার্ট করে — কিছুই জানেন না।',
      },
    },
    {
      title: { en: 'High support cost', bn: 'উচ্চ সাপোর্ট খরচ' },
      desc: {
        en: 'Hiring more agents to answer repetitive questions. Cost scales, profit shrinks.',
        bn: 'একই প্রশ্নের উত্তর দিতে আরও এজেন্ট নিয়োগ। খরচ বাড়ে, লাভ কমে।',
      },
    },
  ],
  costStats: [
    {
      value: '৳5L+',
      desc: {
        en: 'A mid-size business loses this every year from manual WhatsApp management.',
        bn: 'একটি মাঝারি ব্যবসা প্রতি বছর ম্যানুয়াল হোয়াটসঅ্যাপ পরিচালনার কারণে হারায়।',
      },
    },
    {
      value: '80%',
      desc: {
        en: 'Customers switch to a competitor if they do not get a fast response.',
        bn: 'গ্রাহকরা দ্রুত রেসপন্স না পেলে অন্য ব্র্যান্ডে চলে যান।',
      },
    },
    {
      value: '24h',
      desc: {
        en: 'Time each lead takes to follow up without proper automation.',
        bn: 'সঠিক অটোমেশন ছাড়া প্রতিটি লিড ফলো-আপে সময় লাগে।',
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
/*  4. EMOTIONAL COST                                                          */
/* ========================================================================== */

export const EMOTIONAL_COST = {
  eyebrow: { en: 'The hidden cost', bn: 'ইমোশনাল কস্ট' } as Bilingual,
  title: {
    en: 'The hidden cost of manual WhatsApp',
    bn: 'ম্যানুয়াল হোয়াটসঅ্যাপের লুকানো খরচ',
  } as Bilingual,
  subtitle: {
    en: 'It is not just time — you are losing money, customers and opportunities.',
    bn: 'শুধু সময় নয় — টাকা, গ্রাহক ও সুযোগ হারাচ্ছেন।',
  } as Bilingual,
  cards: [
    {
      icon: 'money',
      title: { en: 'Money lost', bn: 'টাকা হারানো' },
      desc: {
        en: 'Every missed inquiry = lost sale. Miss 5 inquiries/day = ৳3–5 lakh lost per month.',
        bn: 'প্রতিটি মিসড ইনকোয়ারি = হারানো বিক্রি। প্রতিদিন ৫টি ইনকোয়ারি মিস করলে মাসে ৳৩–৫ লাখ ক্ষতি।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Time wasted', bn: 'সময় নষ্ট' },
      desc: {
        en: '4–5 hours daily on manual messaging — time you could spend on core business.',
        bn: 'প্রতিদিন ৪–৫ ঘন্টা ম্যানুয়াল মেসেজিংয়ে — যা আপনি কোর বিজনেসে দিতে পারতেন।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Customers lost', bn: 'গ্রাহক হারানো' },
      desc: {
        en: '60% of customers switch brands due to slow support. They never come back.',
        bn: 'ধীর সাপোর্টের কারণে ৬০% গ্রাহক অন্য ব্র্যান্ডে চলে যান। তারা আর ফিরে আসে না।',
      },
    },
    {
      icon: 'star',
      title: { en: 'Negative reviews', bn: 'নেগেটিভ রিভিউ' },
      desc: {
        en: 'Unhappy customers leave 1-star reviews — destroying your brand image online.',
        bn: 'অসন্তুষ্ট গ্রাহকরা ১-স্টার রিভিউ দেন — যা আপনার ব্র্যান্ড ইমেজ নষ্ট করে।',
      },
    },
    {
      icon: 'trending-down',
      title: { en: 'Sales leakage', bn: 'সেলস লিকেজ' },
      desc: {
        en: 'Without follow-up, 80% of leads die. Crores in opportunities lost yearly.',
        bn: 'ফলো-আপ না থাকায় ৮০% লিড ফোলে যায় — কোটি টাকার সুযোগ হারান।',
      },
    },
    {
      icon: 'frown',
      title: { en: 'Team demotivation', bn: 'টিম ডিমোটিভেশন' },
      desc: {
        en: 'Your team burns out repeating the same tasks. Turnover rises, morale falls.',
        bn: 'আপনার টিম বারবার একই কাজ করতে করতে ক্লান্ত — টার্নওভার বাড়ে, মোরাল কমে।',
      },
    },
  ],
}

/* ========================================================================== */
/*  5. WHY TRADITIONAL WHATSAPP FAILS                                          */
/* ========================================================================== */

export const WHY_TRADITIONAL_FAILS = {
  eyebrow: { en: 'The old way is broken', bn: 'পুরনো পদ্ধতি ভাঙা' } as Bilingual,
  title: {
    en: 'Why traditional WhatsApp fails your business',
    bn: 'কেন প্রচলিত হোয়াটসঅ্যাপ আপনার ব্যবসায় ব্যর্থ',
  } as Bilingual,
  subtitle: {
    en: 'The regular WhatsApp app was built for personal chat — not for business at scale.',
    bn: 'সাধারণ WhatsApp অ্যাপ তৈরি হয়েছে ব্যক্তিগত চ্যাটের জন্য — ব্যবসার জন্য নয়।',
  } as Bilingual,
  rows: [
    {
      problem: { en: 'Manual replies only', bn: 'শুধু ম্যানুয়াল রিপ্লাই' },
      desc: {
        en: 'Every reply typed by hand. No auto-responses, no templates, no speed.',
        bn: 'প্রতিটি উত্তর হাতে লিখতে হয়। কোনো অটো-রেসপন্স, টেমপ্লেট বা গতি নেই।',
      },
    },
    {
      problem: { en: 'No chatbot or AI', bn: 'কোনো চ্যাটবট বা AI নেই' },
      desc: {
        en: 'Cannot answer FAQs automatically. Every common question hits a human.',
        bn: 'FAQ স্বয়ংক্রিয়ভাবে উত্তর দিতে পারে না। প্রতিটি সাধারণ প্রশ্ন মানুষের কাছে যায়।',
      },
    },
    {
      problem: { en: 'No CRM integration', bn: 'কোনো CRM ইন্টিগ্রেশন নেই' },
      desc: {
        en: 'Conversations live only in WhatsApp. No record in your CRM. Data lost.',
        bn: 'কথোপকথন শুধু WhatsApp-এ। CRM-এ কোনো রেকর্ড নেই। ডেটা হারায়।',
      },
    },
    {
      problem: { en: 'No broadcast segmentation', bn: 'কোনো ব্রডকাস্ট সেগমেন্টেশন নেই' },
      desc: {
        en: 'Cannot target specific customer groups. One message blasts everyone — or nobody.',
        bn: 'নির্দিষ্ট গ্রাহক গ্রুপকে টার্গেট করতে পারে না। একটি মেসেজ সবাইকে যায় — বা কাউকে না।',
      },
    },
    {
      problem: { en: 'No automation flows', bn: 'কোনো অটোমেশন ফ্লো নেই' },
      desc: {
        en: 'No abandoned-cart recovery, no appointment reminders, no drip campaigns.',
        bn: 'কোনো অ্যাব্যান্ডনড-কার্ট রিকভারি, অ্যাপয়েন্টমেন্ট রিমাইন্ডার বা ড্রিপ ক্যাম্পেইন নেই।',
      },
    },
    {
      problem: { en: 'No analytics', bn: 'কোনো অ্যানালিটিক্স নেই' },
      desc: {
        en: 'No delivery reports, no open rates, no conversion tracking. Flying blind.',
        bn: 'কোনো ডেলিভারি রিপোর্ট, ওপেন রেট বা কনভার্সন ট্র্যাকিং নেই। অন্ধ হয়ে চলা।',
      },
    },
    {
      problem: { en: 'Risk of ban', bn: 'ব্যান হওয়ার ঝুঁকি' },
      desc: {
        en: 'Using unofficial tools or bulk-sending gets your number banned permanently.',
        bn: 'আনঅফিশিয়াল টুল বা বাল্ক-সেন্ডিং ব্যবহার করলে আপনার নম্বর স্থায়ীভাবে ব্যান হয়।',
      },
    },
    {
      problem: { en: 'No multi-agent access', bn: 'মাল্টি-এজেন্ট অ্যাক্সেস নেই' },
      desc: {
        en: 'Only one person can reply at a time. Team cannot collaborate. Queue builds up.',
        bn: 'একসাথে একজনই উত্তর দিতে পারে। টিম কাজ ভাগ করতে পারে না। কিউ বাড়ে।',
      },
    },
  ],
}

/* ========================================================================== */
/*  6. WHY NEXTGEN AI WHATSAPP AUTOMATION                                      */
/* ========================================================================== */

export const WHY_NEXTGEN = {
  eyebrow: { en: 'The NextGen difference', bn: 'NextGen পার্থক্য' } as Bilingual,
  title: {
    en: 'Why NextGen AI WhatsApp Automation wins',
    bn: 'কেন NextGen AI WhatsApp অটোমেশন সেরা',
  } as Bilingual,
  subtitle: {
    en: 'Official API + AI brain + CRM integration + enterprise security — built for scale.',
    bn: 'অফিশিয়াল API + AI ব্রেইন + CRM ইন্টিগ্রেশন + এন্টারপ্রাইজ সিকিউরিটি — স্কেলের জন্য তৈরি।',
  } as Bilingual,
  cards: [
    {
      icon: 'badge-check',
      title: { en: 'Official WhatsApp Business API', bn: 'অফিশিয়াল WhatsApp Business API' },
      desc: {
        en: 'Meta-approved Cloud API. No ban risk. Green-tick verification ready. Enterprise-grade messaging limits.',
        bn: 'মেটা-অনুমোদিত Cloud API। ব্যান ঝুঁকি নেই। গ্রিন-টিক ভেরিফিকেশন রেডি। এন্টারপ্রাইজ মেসেজিং লিমিট।',
      },
    },
    {
      icon: 'brain',
      title: { en: 'GPT-4 AI chatbot', bn: 'GPT-4 AI চ্যাটবট' },
      desc: {
        en: 'Answers 80% of questions instantly. Understands Bengali + English. Trains on your knowledge base.',
        bn: '৮০% প্রশ্ন তাৎক্ষণিকভাবে উত্তর দেয়। বাংলা + ইংরেজি বোঝে। আপনার নলেজ বেসে ট্রেইন হয়।',
      },
    },
    {
      icon: 'workflow',
      title: { en: 'Visual automation flows', bn: 'ভিজ্যুয়াল অটোমেশন ফ্লো' },
      desc: {
        en: 'Drag-and-drop builder for cart recovery, reminders, drip campaigns, qualification — no coding.',
        bn: 'কার্ট রিকভারি, রিমাইন্ডার, ড্রিপ ক্যাম্পেইন, কোয়ালিফিকেশনের জন্য ড্র্যাগ-অ্যান্ড-ড্রপ বিল্ডার — কোডিং নেই।',
      },
    },
    {
      icon: 'megaphone',
      title: { en: 'Segmented broadcast', bn: 'সেগমেন্টেড ব্রডকাস্ট' },
      desc: {
        en: 'Target by tag, purchase history, location, behaviour. 98% open rate vs 20% email.',
        bn: 'ট্যাগ, পারচেজ হিস্ট্রি, লোকেশন, আচরণ দিয়ে টার্গেট। ইমেইলের ২০% ওপেন রেটের বদলে ৯৮%।',
      },
    },
    {
      icon: 'plug',
      title: { en: 'CRM + 30+ integrations', bn: 'CRM + ৩০+ ইন্টিগ্রেশন' },
      desc: {
        en: 'HubSpot, GoHighLevel, Zoho, Salesforce, Google Sheets, Zapier, Make, n8n, Stripe, Shopify — all native.',
        bn: 'HubSpot, GoHighLevel, Zoho, Salesforce, Google Sheets, Zapier, Make, n8n, Stripe, Shopify — সব নেটিভ।',
      },
    },
    {
      icon: 'bar-chart',
      title: { en: 'Real-time analytics', bn: 'রিয়েল-টাইম অ্যানালিটিক্স' },
      desc: {
        en: 'Delivery, open, reply, conversion rates. Agent performance. Campaign ROI. All in one dashboard.',
        bn: 'ডেলিভারি, ওপেন, রিপ্লাই, কনভার্সন রেট। এজেন্ট পারফরম্যান্স। ক্যাম্পেইন ROI। সব এক ড্যাশবোর্ডে।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Multi-agent team inbox', bn: 'মাল্টি-এজেন্ট টিম ইনবক্স' },
      desc: {
        en: 'Unlimited agents. Assign chats, internal notes, handoff to AI, SLA tracking. One number, many hands.',
        bn: 'আনলিমিটেড এজেন্ট। চ্যাট অ্যাসাইন, ইন্টারনাল নোট, AI-তে হ্যান্ডঅফ, SLA ট্র্যাকিং। এক নম্বর, অনেক হাত।',
      },
    },
    {
      icon: 'shield',
      title: { en: 'Enterprise security', bn: 'এন্টারপ্রাইজ সিকিউরিটি' },
      desc: {
        en: 'End-to-end encryption, GDPR, Cloudflare WAF, role permissions, audit logs, daily backups.',
        bn: 'এন্ড-টু-এন্ড এনক্রিপশন, GDPR, Cloudflare WAF, রোল পারমিশন, অডিট লগ, ডেইলি ব্যাকআপ।',
      },
    },
  ],
}

/* ========================================================================== */
/*  7. HOW THE SYSTEM WORKS (Flow Diagram)                                     */
/* ========================================================================== */

export const HOW_IT_WORKS = {
  eyebrow: { en: 'The complete engine', bn: 'সম্পূর্ণ ইঞ্জিন' } as Bilingual,
  title: {
    en: 'How the WhatsApp automation system works',
    bn: 'হোয়াটসঅ্যাপ অটোমেশন সিস্টেম কিভাবে কাজ করে',
  } as Bilingual,
  subtitle: {
    en: 'From first ad click to repeat purchase — every step automated, tracked and optimised.',
    bn: 'প্রথম অ্যাড ক্লিক থেকে রিপিট পারচেজ পর্যন্ত — প্রতিটি ধাপ অটোমেটেড, ট্র্যাক ও অপ্টিমাইজড।',
  } as Bilingual,
  steps: [
    { icon: 'facebook', label: { en: 'Facebook / Meta Ad', bn: 'Facebook / Meta অ্যাড' } },
    { icon: 'mouse-pointer', label: { en: 'Landing Page', bn: 'ল্যান্ডিং পেজ' } },
    { icon: 'message-circle', label: { en: 'WhatsApp Trigger', bn: 'WhatsApp ট্রিগার' } },
    { icon: 'bot', label: { en: 'AI Chatbot', bn: 'AI চ্যাটবট' } },
    { icon: 'filter', label: { en: 'Lead Qualification', bn: 'লিড কোয়ালিফিকেশন' } },
    { icon: 'database', label: { en: 'CRM Sync', bn: 'CRM সিঙ্ক' } },
    { icon: 'headset', label: { en: 'Sales Team', bn: 'সেলস টিম' } },
    { icon: 'calendar', label: { en: 'Booking', bn: 'বুকিং' } },
    { icon: 'credit-card', label: { en: 'Payment', bn: 'পেমেন্ট' } },
    { icon: 'repeat', label: { en: 'Follow-up & Retention', bn: 'ফলো-আপ ও রিটেনশন' } },
  ],
  note: {
    en: 'Every step is automated and visible in your dashboard. No lead falls through the cracks.',
    bn: 'প্রতিটি ধাপ অটোমেটেড এবং আপনার ড্যাশবোর্ডে দৃশ্যমান। কোনো লিড হারায় না।',
  } as Bilingual,
}

/* ========================================================================== */
/*  8. FEATURES (Expanded)                                                     */
/* ========================================================================== */

export const FEATURES = {
  eyebrow: { en: 'Everything included', bn: 'সবকিছু অন্তর্ভুক্ত' } as Bilingual,
  title: {
    en: 'A complete WhatsApp business suite — not just a chatbot',
    bn: 'শুধু চ্যাটবট নয় — একটি সম্পূর্ণ WhatsApp বিজনেস স্যুট',
  } as Bilingual,
  subtitle: {
    en: '18 powerful modules working together as one system.',
    bn: '১৮টি শক্তিশালী মডিউল একসাথে একটি সিস্টেম হিসেবে কাজ করে।',
  } as Bilingual,
  items: [
    {
      icon: 'megaphone',
      title: { en: 'Broadcast Campaigns', bn: 'ব্রডকাস্ট ক্যাম্পেইন' },
      what: { en: 'Send promotions, updates and announcements to thousands at once.', bn: 'একসাথে হাজার হাজার গ্রাহককে প্রমোশন, আপডেট ও ঘোষণা পাঠান।' },
      value: { en: '98% open rate vs 20% email. 10x more eyeballs on your offer.', bn: 'ইমেইলের ২০% এর বদলে ৯৮% ওপেন রেট। আপনার অফারে ১০x বেশি আইবল।' },
    },
    {
      icon: 'file-text',
      title: { en: 'Template Messages', bn: 'টেমপ্লেট মেসেজ' },
      what: { en: 'Meta-approved reusable templates for order updates, OTPs, reminders.', bn: 'অর্ডার আপডেট, OTP, রিমাইন্ডারের জন্য মেটা-অনুমোদিত পুনঃব্যবহারযোগ্য টেমপ্লেট।' },
      value: { en: 'Consistent brand voice, instant sending, no typing errors.', bn: 'সামঞ্জস্যপূর্ণ ব্র্যান্ড ভয়েস, তাৎক্ষণিক সেন্ডিং, কোনো টাইপিং ভুল নেই।' },
    },
    {
      icon: 'workflow',
      title: { en: 'Automation Flows', bn: 'অটোমেশন ফ্লো' },
      what: { en: 'Visual drag-and-drop builder for multi-step journeys.', bn: 'মাল্টি-স্টেপ জার্নির জন্য ভিজ্যুয়াল ড্র্যাগ-অ্যান্ড-ড্রপ বিল্ডার।' },
      value: { en: 'Cart recovery, drip campaigns, win-back — all running 24/7 without you.', bn: 'কার্ট রিকভারি, ড্রিপ ক্যাম্পেইন, উইন-ব্যাক — সব ২৪/৭ আপনা থেকেই চলে।' },
    },
    {
      icon: 'shopping-bag',
      title: { en: 'Catalog & Commerce', bn: 'ক্যাটালগ ও কমার্স' },
      what: { en: 'Showcase products inside WhatsApp. Customers browse and buy in-chat.', bn: 'WhatsApp-এর ভেতরে প্রোডাক্ট দেখান। গ্রাহক চ্যাটেই ব্রাউজ ও কেনে।' },
      value: { en: 'Zero-friction buying. Higher conversion. No app download needed.', bn: 'জিরো-ফ্রিকশন বাইং। উচ্চ কনভার্সন। কোনো অ্যাপ ডাউনলোড লাগে না।' },
    },
    {
      icon: 'mouse-pointer-click',
      title: { en: 'Buttons & Quick Replies', bn: 'বাটন ও কুইক রিপ্লাই' },
      what: { en: 'Interactive buttons so customers tap instead of type.', bn: 'গ্রাহক টাইপ না করে ট্যাপ করার জন্য ইন্টারঅ্যাকটিভ বাটন।' },
      value: { en: '3x higher response rate. Fewer drop-offs. Faster conversations.', bn: '৩x বেশি রেসপন্স রেট। কম ড্রপ-অফ। দ্রুত কথোপকথন।' },
    },
    {
      icon: 'bot',
      title: { en: 'AI Chatbot (GPT-4)', bn: 'AI চ্যাটবট (GPT-4)' },
      what: { en: 'Understands intent, answers FAQs, qualifies leads, books appointments.', bn: 'ইনটেন্ট বোঝে, FAQ উত্তর দেয়, লিড কোয়ালিফাই করে, অ্যাপয়েন্টমেন্ট বুক করে।' },
      value: { en: 'Handles 80% of conversations. Your team focuses only on hot leads.', bn: '৮০% কথোপকথন সামলায়। আপনার টিম শুধু হট লিডে ফোকাস করে।' },
    },
    {
      icon: 'mic',
      title: { en: 'Voice Agent', bn: 'ভয়েস এজেন্ট' },
      what: { en: 'Customers send voice notes — AI transcribes, understands and replies.', bn: 'গ্রাহক ভয়েস নোট পাঠায় — AI ট্রান্সক্রাইব, বোঝে এবং উত্তর দেয়।' },
      value: { en: 'Perfect for Bangladesh where voice messaging is the norm.', bn: 'বাংলাদেশের জন্য পারফেক্ট যেখানে ভয়েস মেসেজিং স্বাভাবিক।' },
    },
    {
      icon: 'database',
      title: { en: 'Built-in CRM', bn: 'বিল্ট-ইন CRM' },
      what: { en: 'Every conversation, tag, purchase and note in one customer profile.', bn: 'প্রতিটি কথোপকথন, ট্যাগ, পারচেজ ও নোট এক কাস্টমার প্রোফাইলে।' },
      value: { en: '360° customer view. No more "who is this?" moments.', bn: '৩৬০° কাস্টমার ভিউ। আর কোনো "এই কে?" মুহূর্ত নেই।' },
    },
    {
      icon: 'filter',
      title: { en: 'Segmentation', bn: 'সেগমেন্টেশন' },
      what: { en: 'Group customers by behaviour, purchase, location, tag, lifecycle stage.', bn: 'আচরণ, পারচেজ, লোকেশন, ট্যাগ, লাইফসাইকেল স্টেজ দিয়ে গ্রুপ করুন।' },
      value: { en: 'Right message to right person at right time. Higher conversion.', bn: 'সঠিক মেসেজ সঠিক ব্যক্তিকে সঠিক সময়ে। উচ্চ কনভার্সন।' },
    },
    {
      icon: 'star',
      title: { en: 'Lead Scoring', bn: 'লিড স্কোরিং' },
      what: { en: 'AI scores every lead 0–100 based on engagement and intent signals.', bn: 'AI এনগেজমেন্ট ও ইনটেন্ট সিগন্যাল দিয়ে প্রতিটি লিড ০–১০০ স্কোর করে।' },
      value: { en: 'Sales team calls hot leads first. Close rate jumps 40%.', bn: 'সেলস টিম হট লিড আগে কল করে। ক্লোজ রেট ৪০% বাড়ে।' },
    },
    {
      icon: 'credit-card',
      title: { en: 'Payment Links', bn: 'পেমেন্ট লিংক' },
      what: { en: 'Send bKash, Nagad, Rocket, Stripe links directly in the chat.', bn: 'চ্যাটে সরাসরি bKash, Nagad, Rocket, Stripe লিংক পাঠান।' },
      value: { en: 'Customer pays without leaving WhatsApp. Instant confirmation.', bn: 'গ্রাহক WhatsApp ছাড়া না টাকা দেয়। তাৎক্ষণিক কনফার্মেশন।' },
    },
    {
      icon: 'package',
      title: { en: 'Order Tracking', bn: 'অর্ডার ট্র্যাকিং' },
      what: { en: 'Automated order status, shipment tracking and delivery notifications.', bn: 'অটোমেটেড অর্ডার স্ট্যাটাস, শিপমেন্ট ট্র্যাকিং ও ডেলিভারি নোটিফিকেশন।' },
      value: { en: '70% fewer "where is my order?" calls. Support cost drops.', bn: '"আমার অর্ডার কোথায়?" কল ৭০% কমে। সাপোর্ট খরচ কমে।' },
    },
    {
      icon: 'calendar',
      title: { en: 'Appointment Booking', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
      what: { en: 'Customers book, reschedule and get reminders — all automated in-chat.', bn: 'গ্রাহক বুক, রিশিডিউল ও রিমাইন্ডার পায় — সব চ্যাটে অটোমেটেড।' },
      value: { en: 'Booking rate up 150%. No-show rate down 60%. Calendar always full.', bn: 'বুকিং রেট ১৫০% বাড়ে। নো-শো ৬০% কমে। ক্যালেন্ডার সবসময় পূর্ণ।' },
    },
    {
      icon: 'bell',
      title: { en: 'Notifications', bn: 'নোটিফিকেশন' },
      what: { en: 'Automated alerts for orders, payments, appointments, birthdays, renewals.', bn: 'অর্ডার, পেমেন্ট, অ্যাপয়েন্টমেন্ট, জন্মদিন, রিনিউয়ালের অটোমেটেড অ্যালার্ট।' },
      value: { en: 'Stay top-of-mind. Customers feel cared for. Retention rises.', bn: 'টপ-অফ-মাইন্ড থাকুন। গ্রাহক যত্ন পায়। রিটেনশন বাড়ে।' },
    },
    {
      icon: 'code',
      title: { en: 'API & Webhooks', bn: 'API ও ওয়েবহুক' },
      what: { en: 'REST API + webhooks to connect WhatsApp with any system you build.', bn: 'WhatsApp-কে যেকোনো সিস্টেমের সাথে যুক্ত করতে REST API + ওয়েবহুক।' },
      value: { en: 'Unlimited custom workflows. Your developers stay in control.', bn: 'আনলিমিটেড কাস্টম ওয়ার্কফ্লো। আপনার ডেভেলপার নিয়ন্ত্রণে থাকে।' },
    },
    {
      icon: 'globe',
      title: { en: 'Multilingual AI', bn: 'মাল্টিলিঙ্গুয়াল AI' },
      what: { en: 'AI replies in Bengali, English, Hindi, Arabic — auto-detects language.', bn: 'AI বাংলা, ইংরেজি, হিন্দি, আরবিতে উত্তর দেয় — ভাষা অটো-ডিটেক্ট করে।' },
      value: { en: 'Serve every customer in their language. Zero translation effort.', bn: 'প্রতিটি গ্রাহককে তার ভাষায় সেবা। কোনো অনুবাদ ঝামেলা নেই।' },
    },
    {
      icon: 'headset',
      title: { en: 'Team Inbox', bn: 'টিম ইনবক্স' },
      what: { en: 'Unlimited agents share one WhatsApp number. Assign, note, escalate.', bn: 'আনলিমিটেড এজেন্ট এক WhatsApp নম্বর শেয়ার করে। অ্যাসাইন, নোট, এসকেলেট।' },
      value: { en: 'Team collaborates. Response time drops. Customers love the speed.', bn: 'টিম কাজ করে। রেসপন্স টাইম কমে। গ্রাহক গতি পছন্দ করে।' },
    },
    {
      icon: 'bar-chart',
      title: { en: 'Analytics Dashboard', bn: 'অ্যানালিটিক্স ড্যাশবোর্ড' },
      what: { en: 'Delivery, open, reply, conversion, agent performance, campaign ROI.', bn: 'ডেলিভারি, ওপেন, রিপ্লাই, কনভার্সন, এজেন্ট পারফরম্যান্স, ক্যাম্পেইন ROI।' },
      value: { en: 'Know exactly what works. Double down on winners. Kill losers.', bn: 'ঠিক জানেন কী কাজ করে। উইনারে ফোকাস। লুজার বন্ধ।' },
    },
  ],
}

/* ========================================================================== */
/*  9. WHATSAPP AUTOMATION USE CASES (12 industries)                           */
/* ========================================================================== */

export const USE_CASES = {
  eyebrow: { en: 'Built for every industry', bn: 'প্রতিটি ইন্ডাস্ট্রির জন্য' } as Bilingual,
  title: {
    en: 'WhatsApp automation use cases for 13 industries',
    bn: '১৩টি ইন্ডাস্ট্রির জন্য WhatsApp অটোমেশন ইউজ-কেস',
  } as Bilingual,
  subtitle: {
    en: 'Whatever you sell, WhatsApp is where your customers already are.',
    bn: 'আপনি যাই বিক্রি করেন, WhatsApp-এ আপনার গ্রাহকরা ইতিমধ্যেই আছে।',
  } as Bilingual,
  items: [
    { icon: 'heart', industry: { en: 'Healthcare', bn: 'হেলথকেয়ার' }, use: { en: 'Appointment booking, reminders, prescription delivery, follow-ups', bn: 'অ্যাপয়েন্টমেন্ট বুকিং, রিমাইন্ডার, প্রেসক্রিপশন ডেলিভারি, ফলো-আপ' } },
    { icon: 'graduation-cap', industry: { en: 'Education', bn: 'শিক্ষা' }, use: { en: 'Admission enquiries, fee reminders, exam notices, parent updates', bn: 'ভর্তি ইনকোয়ারি, ফি রিমাইন্ডার, পরীক্ষা নোটিশ, অভিভাবক আপডেট' } },
    { icon: 'home', industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' }, use: { en: 'Property enquiries, virtual tours, site visit booking, document sharing', bn: 'প্রপার্টি ইনকোয়ারি, ভার্চুয়াল ট্যুর, সাইট ভিজিট বুকিং, ডকুমেন্ট শেয়ারিং' } },
    { icon: 'utensils', industry: { en: 'Restaurants', bn: 'রেস্টুরেন্ট' }, use: { en: 'Table booking, food order, menu sharing, feedback collection', bn: 'টেবিল বুকিং, ফুড অর্ডার, মেনু শেয়ারিং, ফিডব্যাক সংগ্রহ' } },
    { icon: 'shopping-cart', industry: { en: 'E-commerce', bn: 'ই-কমার্স' }, use: { en: 'Order confirmation, cart recovery, shipment tracking, reviews', bn: 'অর্ডার কনফার্মেশন, কার্ট রিকভারি, শিপমেন্ট ট্র্যাকিং, রিভিউ' } },
    { icon: 'factory', industry: { en: 'Manufacturing', bn: 'ম্যানুফ্যাকচারিং' }, use: { en: 'B2B enquiries, quote requests, dealer updates, order status', bn: 'B2B ইনকোয়ারি, কোট রিকোয়েস্ট, ডিলার আপডেট, অর্ডার স্ট্যাটাস' } },
    { icon: 'briefcase', industry: { en: 'Agencies', bn: 'এজেন্সি' }, use: { en: 'Client onboarding, project updates, report sharing, retainer renewals', bn: 'ক্লায়েন্ট অনবোর্ডিং, প্রজেক্ট আপডেট, রিপোর্ট শেয়ারিং, রিটেইনার রিনিউয়াল' } },
    { icon: 'award', industry: { en: 'Coaching', bn: 'কোচিং' }, use: { en: 'Course enrolment, session reminders, assignment sharing, progress', bn: 'কোর্স এনরোলমেন্ট, সেশন রিমাইন্ডার, অ্যাসাইনমেন্ট শেয়ারিং, প্রগ্রেস' } },
    { icon: 'heart-handshake', industry: { en: 'NGOs', bn: 'এনজিও' }, use: { en: 'Donation campaigns, volunteer coordination, event updates, reporting', bn: 'ডোনেশন ক্যাম্পেইন, ভলান্টিয়ার কোঅর্ডিনেশন, ইভেন্ট আপডেট, রিপোর্টিং' } },
    { icon: 'plane', industry: { en: 'Travel', bn: 'ট্রাভেল' }, use: { en: 'Booking confirmation, itinerary sharing, visa updates, feedback', bn: 'বুকিং কনফার্মেশন, ইটিনারারি শেয়ারিং, ভিসা আপডেট, ফিডব্যাক' } },
    { icon: 'truck', industry: { en: 'Logistics', bn: 'লজিস্টিকস' }, use: { en: 'Pickup booking, tracking updates, POD confirmation, delivery alerts', bn: 'পিকআপ বুকিং, ট্র্যাকিং আপডেট, POD কনফার্মেশন, ডেলিভারি অ্যালার্ট' } },
    { icon: 'shield', industry: { en: 'Insurance', bn: 'ইন্স্যুরেন্স' }, use: { en: 'Policy renewal, claim status, premium reminders, document delivery', bn: 'পলিসি রিনিউয়াল, ক্লেম স্ট্যাটাস, প্রিমিয়াম রিমাইন্ডার, ডকুমেন্ট ডেলিভারি' } },
    { icon: 'banknote', industry: { en: 'Finance', bn: 'ফাইন্যান্স' }, use: { en: 'Loan enquiries, EMI reminders, statement delivery, fraud alerts', bn: 'লোন ইনকোয়ারি, EMI রিমাইন্ডার, স্টেটমেন্ট ডেলিভারি, ফ্রড অ্যালার্ট' } },
  ],
}

/* ========================================================================== */
/*  10. AI AUTOMATION                                                          */
/* ========================================================================== */

export const AI_AUTOMATION = {
  eyebrow: { en: 'The AI brain', bn: 'AI ব্রেইন' } as Bilingual,
  title: {
    en: 'AI that talks like your best agent — never sleeps, never forgets',
    bn: 'AI যে আপনার সেরা এজেন্টের মতো কথা বলে — কখনও ঘুমায় না, ভোলে না',
  } as Bilingual,
  subtitle: {
    en: 'Powered by GPT-4 + your knowledge base. Understands context, intent and emotion.',
    bn: 'GPT-4 + আপনার নলেজ বেস দ্বারা চালিত। কনটেক্সট, ইনটেন্ট ও ইমোশন বোঝে।',
  } as Bilingual,
  cards: [
    {
      icon: 'brain',
      title: { en: 'GPT-4 Conversational AI', bn: 'GPT-4 কনভার্সেশনাল AI' },
      desc: {
        en: 'Natural, human-like conversations. Understands slang, typos, mixed Bangla-English (Banglish).',
        bn: 'স্বাভাবিক, মানুষের মতো কথোপকথন। স্ল্যাং, টাইপো, মিক্সড বাংলা-ইংরেজি (Banglish) বোঝে।',
      },
    },
    {
      icon: 'mic',
      title: { en: 'Voice Agent', bn: 'ভয়েস এজেন্ট' },
      desc: {
        en: 'Transcribes voice notes, understands spoken Bengali, replies with voice or text.',
        bn: 'ভয়েস নোট ট্রান্সক্রাইব করে, কথ্য বাংলা বোঝে, ভয়েস বা টেক্সটে উত্তর দেয়।',
      },
    },
    {
      icon: 'filter',
      title: { en: 'Lead Qualification', bn: 'লিড কোয়ালিফিকেশন' },
      desc: {
        en: 'Asks the right questions, scores the lead, routes hot leads to sales instantly.',
        bn: 'সঠিক প্রশ্ন করে, লিড স্কোর করে, হট লিড সেলসে তাৎক্ষণিকভাবে পাঠায়।',
      },
    },
    {
      icon: 'target',
      title: { en: 'Intent Detection', bn: 'ইনটেন্ট ডিটেকশন' },
      desc: {
        en: 'Knows if a customer wants to buy, complain, ask, or leave — and responds accordingly.',
        bn: 'গ্রাহক কিনতে, অভিযোগ করতে, জিজ্ঞাসা করতে বা চলে যেতে চায় — তা বোঝে এবং সেভাবে সাড়া দেয়।',
      },
    },
    {
      icon: 'calendar',
      title: { en: 'Appointment Booking', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
      desc: {
        en: 'Checks calendar, books slots, sends confirmations and reminders — fully automated.',
        bn: 'ক্যালেন্ডার চেক করে, স্লট বুক করে, কনফার্মেশন ও রিমাইন্ডার পাঠায় — সম্পূর্ণ অটোমেটেড।',
      },
    },
    {
      icon: 'database',
      title: { en: 'CRM Auto-Sync', bn: 'CRM অটো-সিঙ্ক' },
      desc: {
        en: 'Every conversation, tag and status updates in your CRM in real-time. No manual entry.',
        bn: 'প্রতিটি কথোপকথন, ট্যাগ ও স্ট্যাটাস রিয়েল-টাইমে CRM-এ আপডেট হয়। কোনো ম্যানুয়াল এন্ট্রি নেই।',
      },
    },
    {
      icon: 'book-open',
      title: { en: 'Knowledge Base + RAG', bn: 'নলেজ বেস + RAG' },
      desc: {
        en: 'Upload PDFs, docs, FAQs. AI retrieves accurate answers using retrieval-augmented generation.',
        bn: 'PDF, ডক, FAQ আপলোড করুন। AI রিট্রিভাল-অগমেন্টেড জেনারেশন দিয়ে সঠিক উত্তর দেয়।',
      },
    },
    {
      icon: 'globe',
      title: { en: 'Multilingual', bn: 'মাল্টিলিঙ্গুয়াল' },
      desc: {
        en: 'Auto-detects Bengali, English, Hindi, Arabic. Replies in the customer\'s language.',
        bn: 'বাংলা, ইংরেজি, হিন্দি, আরবি অটো-ডিটেক্ট করে। গ্রাহকের ভাষায় উত্তর দেয়।',
      },
    },
    {
      icon: 'smile',
      title: { en: 'Sentiment Detection', bn: 'সেন্টিমেন্ট ডিটেকশন' },
      desc: {
        en: 'Detects frustration, anger, joy. Escalates unhappy customers to a human instantly.',
        bn: 'ফ্রাস্ট্রেশন, রাগ, আনন্দ ডিটেক্ট করে। অসন্তুষ্ট গ্রাহককে তাৎক্ষণিকভাবে মানুষের কাছে পাঠায়।',
      },
    },
    {
      icon: 'shuffle',
      title: { en: 'Conversation Routing', bn: 'কনভার্সেশন রাউটিং' },
      desc: {
        en: 'Routes chats by topic, language, value, territory — to the right agent or team.',
        bn: 'টপিক, ভাষা, ভ্যালু, টেরিটরি অনুযায়ী চ্যাট সঠিক এজেন্ট বা টিমে পাঠায়।',
      },
    },
    {
      icon: 'alert-triangle',
      title: { en: 'Auto Escalation', bn: 'অটো এসকেলেশন' },
      desc: {
        en: 'If AI cannot answer or confidence is low, escalates to human with full context.',
        bn: 'AI উত্তর না পারলে বা কনফিডেন্স কম হলে, পূর্ণ কনটেক্সট সহ মানুষের কাছে এসকেলেট করে।',
      },
    },
    {
      icon: 'hand',
      title: { en: 'Human Handoff', bn: 'হিউম্যান হ্যান্ডঅফ' },
      desc: {
        en: 'Seamless switch from AI to human. Agent sees the full chat history instantly.',
        bn: 'AI থেকে মানুষে নিরবচ্ছিন্ন সুইচ। এজেন্ট সম্পূর্ণ চ্যাট হিস্ট্রি তাৎক্ষণিকভাবে দেখে।',
      },
    },
  ],
}

/* ========================================================================== */
/*  11. MARKETING AUTOMATION                                                   */
/* ========================================================================== */

export const MARKETING_AUTOMATION = {
  eyebrow: { en: 'Marketing on autopilot', bn: 'মার্কেটিং অটোপাইলটে' } as Bilingual,
  title: {
    en: 'Turn WhatsApp into your highest-converting marketing channel',
    bn: 'WhatsApp-কে আপনার সর্বোচ্চ-কনভার্টিং মার্কেটিং চ্যানেল বানান',
  } as Bilingual,
  subtitle: {
    en: '11 automated campaigns that run while you sleep — and print money.',
    bn: '১১টি অটোমেটেড ক্যাম্পেইন যা আপনি ঘুমানোর সময় চলে — এবং টাকা ছাপে।',
  } as Bilingual,
  items: [
    { icon: 'megaphone', title: { en: 'Broadcast Campaigns', bn: 'ব্রডকাস্ট ক্যাম্পেইন' }, desc: { en: 'Send to thousands, segmented by tag, behaviour, purchase history.', bn: 'হাজার হাজার গ্রাহককে পাঠান — ট্যাগ, আচরণ, পারচেজ হিস্ট্রি দিয়ে সেগমেন্ট করে।' } },
    { icon: 'filter', title: { en: 'Funnels', bn: 'ফানেল' }, desc: { en: 'Multi-step journeys: awareness → interest → desire → action.', bn: 'মাল্টি-স্টেপ জার্নি: অ্যাওয়ারনেস → ইনটারেস্ট → ডিজায়ার → অ্যাকশন।' } },
    { icon: 'calendar', title: { en: 'Campaign Scheduler', bn: 'ক্যাম্পেইন শিডিউলার' }, desc: { en: 'Schedule campaigns for Eid, Puja, Black Friday, new year — months ahead.', bn: 'ঈদ, পূজা, ব্ল্যাক ফ্রাইডে, নববর্ষের জন্য মাস আগেই ক্যাম্পেইন শিডিউল করুন।' } },
    { icon: 'shopping-cart', title: { en: 'Abandoned Cart Recovery', bn: 'অ্যাব্যান্ডনড কার্ট রিকভারি' }, desc: { en: 'Auto-message customers who left items in cart. Recover 25–35% of lost sales.', bn: 'কার্টে প্রোডাক্ট রেখে চলে যাওয়া গ্রাহককে অটো-মেসেজ। হারানো বিক্রির ২৫–৩৫% ফিরে পান।' } },
    { icon: 'ticket', title: { en: 'Coupon Distribution', bn: 'কুপন ডিস্ট্রিবিউশন' }, desc: { en: 'Send personalised coupons with expiry. Track redemption in real-time.', bn: 'এক্সপায়রি সহ পার্সোনালাইজড কুপন পাঠান। রিডেম্পশন রিয়েল-টাইমে ট্র্যাক করুন।' } },
    { icon: 'bell', title: { en: 'Reminders', bn: 'রিমাইন্ডার' }, desc: { en: 'Appointment, payment, renewal, pickup reminders — all automated.', bn: 'অ্যাপয়েন্টমেন্ট, পেমেন্ট, রিনিউয়াল, পিকআপ রিমাইন্ডার — সব অটোমেটেড।' } },
    { icon: 'refresh-cw', title: { en: 'Reactivation', bn: 'রিঅ্যাক্টিভেশন' }, desc: { en: 'Win back dormant customers with targeted offers and check-ins.', bn: 'টার্গেটেড অফার ও চেক-ইন দিয়ে ঘুমন্ত গ্রাহককে ফিরিয়ে আনুন।' } },
    { icon: 'sprout', title: { en: 'Nurturing', bn: 'নার্চারিং' }, desc: { en: 'Drip sequences that educate, build trust and warm up cold leads over weeks.', bn: 'ড্রিপ সিকোয়েন্স যা কোল্ড লিডকে সপ্তাহজুড়ে এডুকেট, ট্রাস্ট ও ওয়ার্ম করে।' } },
    { icon: 'trending-up', title: { en: 'Upsell', bn: 'আপসেল' }, desc: { en: 'Offer premium upgrades to existing customers at the right moment.', bn: 'সঠিক সময়ে বিদ্যমান গ্রাহককে প্রিমিয়াম আপগ্রেড অফার করুন।' } },
    { icon: 'git-branch', title: { en: 'Cross-Sell', bn: 'ক্রস-সেল' }, desc: { en: 'Recommend complementary products based on purchase history.', bn: 'পারচেজ হিস্ট্রি অনুযায়ী কমপ্লিমেন্টারি প্রোডাক্ট রেকমেন্ড করুন।' } },
    { icon: 'gift', title: { en: 'Referral Program', bn: 'রেফারেল প্রোগ্রাম' }, desc: { en: 'Automated referral links and rewards. Turn customers into promoters.', bn: 'অটোমেটেড রেফারেল লিংক ও রিওয়ার্ড। গ্রাহককে প্রমোটার বানান।' } },
  ],
}

/* ========================================================================== */
/*  12. CRM INTEGRATION                                                        */
/* ========================================================================== */

export const CRM_INTEGRATION = {
  eyebrow: { en: 'Connects with everything', bn: 'সবার সাথে যুক্ত' } as Bilingual,
  title: {
    en: 'Integrates with 18+ tools you already use',
    bn: 'আপনার ব্যবহৃত ১৮+ টুলের সাথে ইন্টিগ্রেশন',
  } as Bilingual,
  subtitle: {
    en: 'Native integrations plus open API. If we do not have it, we build it.',
    bn: 'নেটিভ ইন্টিগ্রেশন প্লাস ওপেন API। আমাদের না থাকলে, আমরা বানাই।',
  } as Bilingual,
  items: [
    { name: 'HubSpot', category: { en: 'CRM', bn: 'CRM' } },
    { name: 'GoHighLevel', category: { en: 'CRM', bn: 'CRM' } },
    { name: 'Zoho CRM', category: { en: 'CRM', bn: 'CRM' } },
    { name: 'Salesforce', category: { en: 'CRM', bn: 'CRM' } },
    { name: 'Pipedrive', category: { en: 'CRM', bn: 'CRM' } },
    { name: 'Google Sheets', category: { en: 'Spreadsheets', bn: 'স্প্রেডশিট' } },
    { name: 'Zapier', category: { en: 'Automation', bn: 'অটোমেশন' } },
    { name: 'Make', category: { en: 'Automation', bn: 'অটোমেশন' } },
    { name: 'n8n', category: { en: 'Automation', bn: 'অটোমেশন' } },
    { name: 'Slack', category: { en: 'Team Chat', bn: 'টিম চ্যাট' } },
    { name: 'Microsoft Teams', category: { en: 'Team Chat', bn: 'টিম চ্যাট' } },
    { name: 'Calendly', category: { en: 'Scheduling', bn: 'শিডিউলিং' } },
    { name: 'Stripe', category: { en: 'Payments', bn: 'পেমেন্ট' } },
    { name: 'bKash / Nagad', category: { en: 'Payments', bn: 'পেমেন্ট' } },
    { name: 'Shopify', category: { en: 'E-commerce', bn: 'ই-কমার্স' } },
    { name: 'WooCommerce', category: { en: 'E-commerce', bn: 'ই-কমার্স' } },
    { name: 'WordPress', category: { en: 'CMS', bn: 'CMS' } },
    { name: 'Custom API', category: { en: 'Developer', bn: 'ডেভেলপার' } },
  ],
}

/* ========================================================================== */
/*  13. TECH STACK                                                             */
/* ========================================================================== */

export const TECH_STACK = {
  eyebrow: { en: 'Enterprise-grade infrastructure', bn: 'এন্টারপ্রাইজ-গ্রেড ইনফ্রাস্ট্রাকচার' } as Bilingual,
  title: {
    en: 'The technology behind your WhatsApp engine',
    bn: 'আপনার WhatsApp ইঞ্জিনের পেছনের প্রযুক্তি',
  } as Bilingual,
  subtitle: {
    en: 'We use the same tools trusted by HubSpot, Twilio and Meta — so your data is safe and your messages always deliver.',
    bn: 'আমরা HubSpot, Twilio ও Meta-এর মতো একই টুল ব্যবহার করি — যাতে আপনার ডেটা নিরাপদ এবং আপনার মেসেজ সবসময় ডেলিভার হয়।',
  } as Bilingual,
  items: [
    { name: 'Meta WhatsApp Cloud API', desc: { en: 'Official messaging API', bn: 'অফিশিয়াল মেসেজিং API' } },
    { name: 'OpenAI GPT-4', desc: { en: 'Conversational AI brain', bn: 'কনভার্সেশনাল AI ব্রেইন' } },
    { name: 'Cloudflare', desc: { en: 'WAF, DDoS protection, CDN', bn: 'WAF, DDoS প্রটেকশন, CDN' } },
    { name: 'Twilio', desc: { en: 'SMS & voice fallback', bn: 'SMS ও ভয়েস ফলব্যাক' } },
    { name: 'Brevo', desc: { en: 'Email + SMS cross-channel', bn: 'ইমেইল + SMS ক্রস-চ্যানেল' } },
    { name: 'HubSpot', desc: { en: 'CRM & marketing automation', bn: 'CRM ও মার্কেটিং অটোমেশন' } },
    { name: 'Zapier / Make', desc: { en: 'Connect 5,000+ apps', bn: '৫,০০০+ অ্যাপ কানেক্ট' } },
    { name: 'Google Workspace', desc: { en: 'Sheets, Calendar, Drive sync', bn: 'Sheets, Calendar, Drive সিঙ্ক' } },
    { name: 'Stripe', desc: { en: 'Global payment processing', bn: 'গ্লোবাল পেমেন্ট প্রসেসিং' } },
    { name: 'Vercel', desc: { en: 'Edge-deployed hosting', bn: 'এজ-ডিপ্লয়েড হোস্টিং' } },
    { name: 'PostgreSQL', desc: { en: 'Encrypted relational database', bn: 'এনক্রিপ্টেড রিলেশনাল ডেটাবেস' } },
    { name: 'Redis', desc: { en: 'In-memory cache for speed', bn: 'স্পিডের জন্য ইন-মেমরি ক্যাশ' } },
  ],
}

/* ========================================================================== */
/*  14. BENEFITS                                                               */
/* ========================================================================== */

export const BENEFITS = {
  eyebrow: { en: 'What you gain', bn: 'আপনি যা অর্জন করেন' } as Bilingual,
  title: {
    en: '8 measurable benefits from day one',
    bn: 'প্রথম দিন থেকেই ৮টি পরিমেয় সুবিধা',
  } as Bilingual,
  subtitle: {
    en: 'Every benefit is tracked in your dashboard with real numbers.',
    bn: 'প্রতিটি সুবিধা আপনার ড্যাশবোর্ডে বাস্তব সংখ্যা সহ ট্র্যাক করা হয়।',
  } as Bilingual,
  cards: [
    { icon: 'clock', title: { en: 'Time Saved', bn: 'সময় সাশ্রয়' }, stat: '20+ hrs/week', desc: { en: 'AI handles repetitive queries. Your team focuses on high-value work.', bn: 'AI পুনরাবৃত্তিমূলক প্রশ্ন সামলায়। আপনার টিম হাই-ভ্যালু কাজে ফোকাস করে।' } },
    { icon: 'banknote', title: { en: 'Lower Cost', bn: 'কম খরচ' }, stat: '−70% support cost', desc: { en: 'One AI agent replaces 3 support staff. No overtime, no turnover.', bn: 'এক AI এজেন্ট ৩ জন সাপোর্ট স্টাফের বদলে। কোনো ওভারটাইম, কোনো টার্নওভার নেই।' } },
    { icon: 'trending-up', title: { en: 'Higher Conversion', bn: 'উচ্চ কনভার্সন' }, stat: '+40% close rate', desc: { en: 'Instant replies + lead scoring = more sales from the same traffic.', bn: 'তাৎক্ষণিক রিপ্লাই + লিড স্কোরিং = একই ট্রাফিক থেকে বেশি বিক্রি।' } },
    { icon: 'users', title: { en: 'Higher Engagement', bn: 'উচ্চ এনগেজমেন্ট' }, stat: '98% open rate', desc: { en: 'WhatsApp beats email and SMS by 5x. Customers actually read it.', bn: 'WhatsApp ইমেইল ও SMS-এর চেয়ে ৫x এগিয়ে। গ্রাহক আসলেই পড়ে।' } },
    { icon: 'moon', title: { en: '24/7 Support', bn: '২৪/৭ সাপোর্ট' }, stat: 'Round-the-clock', desc: { en: 'AI never sleeps. Customers get answers at 3 AM same as 3 PM.', bn: 'AI কখনও ঘুমায় না। গ্রাহক ভোর ৩টায় দুপুর ৩টার মতোই উত্তর পায়।' } },
    { icon: 'bot', title: { en: 'AI Replies', bn: 'AI রিপ্লাই' }, stat: '<3 sec', desc: { en: 'Sub-3-second responses. Faster than any human could ever type.', bn: '৩ সেকেন্ডের কম রেসপন্স। মানুষের টাইপের চেয়েও দ্রুত।' } },
    { icon: 'maximize', title: { en: 'Scalable', bn: 'স্কেলেবল' }, stat: '1 to 10L msgs', desc: { en: 'From 1 message to 10 lakh — same system, zero downtime.', bn: '১ থেকে ১০ লাখ মেসেজ — একই সিস্টেম, জিরো ডাউনটাইম।' } },
    { icon: 'shield', title: { en: 'Secure', bn: 'নিরাপদ' }, stat: 'E2E encrypted', desc: { en: 'End-to-end encryption, GDPR, backups, audit logs. Enterprise-ready.', bn: 'এন্ড-টু-এন্ড এনক্রিপশন, GDPR, ব্যাকআপ, অডিট লগ। এন্টারপ্রাইজ-রেডি।' } },
  ],
}

/* ========================================================================== */
/*  15. COMPARISON TABLE                                                       */
/* ========================================================================== */

export const COMPARISON = {
  eyebrow: { en: 'Side by side', bn: 'পাশাপাশি তুলনা' } as Bilingual,
  title: {
    en: 'Traditional WhatsApp vs NextGen AI Automation',
    bn: 'প্রচলিত WhatsApp বনাম NextGen AI অটোমেশন',
  } as Bilingual,
  subtitle: {
    en: 'See exactly what changes when you upgrade.',
    bn: 'আপগ্রেড করলে ঠিক কী বদলায় দেখুন।',
  } as Bilingual,
  rows: [
    {
      feature: { en: 'Messaging method', bn: 'মেসেজিং পদ্ধতি' },
      traditional: { en: 'Manual typing, one by one', bn: 'ম্যানুয়াল টাইপিং, একেকটা' },
      nextgen: { en: 'Bulk broadcast + AI replies', bn: 'বাল্ক ব্রডকাস্ট + AI রিপ্লাই' },
    },
    {
      feature: { en: 'Response time', bn: 'রেসপন্স টাইম' },
      traditional: { en: 'Minutes to hours', bn: 'মিনিট থেকে ঘন্টা' },
      nextgen: { en: '<3 seconds (AI)', bn: '<৩ সেকেন্ড (AI)' },
    },
    {
      feature: { en: 'Availability', bn: 'অ্যাভেইলেবিলিটি' },
      traditional: { en: 'Business hours only', bn: 'শুধু বিজনেস আওয়ার' },
      nextgen: { en: '24/7/365', bn: '২৪/৭/৩৬৫' },
    },
    {
      feature: { en: 'Chatbot / AI', bn: 'চ্যাটবট / AI' },
      traditional: { en: 'None', bn: 'নেই' },
      nextgen: { en: 'GPT-4 multilingual AI', bn: 'GPT-4 মাল্টিলিঙ্গুয়াল AI' },
    },
    {
      feature: { en: 'CRM integration', bn: 'CRM ইন্টিগ্রেশন' },
      traditional: { en: 'No — copy-paste manually', bn: 'না — ম্যানুয়ালি কপি-পেস্ট' },
      nextgen: { en: 'Native sync, real-time', bn: 'নেটিভ সিঙ্ক, রিয়েল-টাইম' },
    },
    {
      feature: { en: 'Broadcast segmentation', bn: 'ব্রডকাস্ট সেগমেন্টেশন' },
      traditional: { en: 'All-or-nothing', bn: 'অল-অর-নাথিং' },
      nextgen: { en: 'Tag, behaviour, history', bn: 'ট্যাগ, আচরণ, হিস্ট্রি' },
    },
    {
      feature: { en: 'Analytics', bn: 'অ্যানালিটিক্স' },
      traditional: { en: 'None', bn: 'নেই' },
      nextgen: { en: 'Full dashboard + ROI', bn: 'পূর্ণ ড্যাশবোর্ড + ROI' },
    },
    {
      feature: { en: 'Multi-agent', bn: 'মাল্টি-এজেন্ট' },
      traditional: { en: 'One person only', bn: 'শুধু একজন' },
      nextgen: { en: 'Unlimited agents', bn: 'আনলিমিটেড এজেন্ট' },
    },
    {
      feature: { en: 'Ban risk', bn: 'ব্যান ঝুঁকি' },
      traditional: { en: 'High (unofficial tools)', bn: 'উচ্চ (আনঅফিশিয়াল টুল)' },
      nextgen: { en: 'Zero (official API)', bn: 'জিরো (অফিশিয়াল API)' },
    },
    {
      feature: { en: 'Cost', bn: 'খরচ' },
      traditional: { en: 'Staff salary × N', bn: 'স্টাফ স্যালারি × N' },
      nextgen: { en: 'Fixed monthly, 70% less', bn: 'ফিক্সড মাসিক, ৭০% কম' },
    },
    {
      feature: { en: 'Scalability', bn: 'স্কেলেবিলিটি' },
      traditional: { en: 'Hire more staff', bn: 'আরও স্টাফ নিয়োগ' },
      nextgen: { en: 'Add messages instantly', bn: 'তাৎক্ষণিকভাবে মেসেজ যোগ' },
    },
    {
      feature: { en: 'ROI', bn: 'ROI' },
      traditional: { en: 'Unknown', bn: 'অজানা' },
      nextgen: { en: '4.5x average', bn: 'গড় ৪.৫x' },
    },
  ],
}

/* ========================================================================== */
/*  16. SUCCESS STORIES (Case Studies)                                         */
/* ========================================================================== */

export const CASE_STUDIES = {
  eyebrow: { en: 'Real results, real businesses', bn: 'বাস্তব ফলাফল, বাস্তব ব্যবসা' } as Bilingual,
  title: {
    en: 'Success stories from 10 industries',
    bn: '১০টি ইন্ডাস্ট্রির সাফল্যের গল্প',
  } as Bilingual,
  subtitle: {
    en: 'Each client came with a problem. Each left with a system that prints leads.',
    bn: 'প্রতিটি ক্লায়েন্ট সমস্যা নিয়ে এসেছিল। প্রত্যেকে এমন এক সিস্টেম নিয়ে গেল যা লিড ছাপে।',
  } as Bilingual,
  items: [
    {
      industry: { en: '🛒 E-commerce Brand', bn: '🛒 ই-কমার্স ব্র্যান্ড' },
      problem: { en: 'Manual order confirmation and tracking. Customers calling "where is my order?" constantly.', bn: 'ম্যানুয়াল অর্ডার কনফার্মেশন ও ট্র্যাকিং। গ্রাহকরা বারবার "আমার অর্ডার কোথায়?" ফোন করতেন।' },
      solution: { en: 'Automated order confirmation, shipment tracking and delivery notification via WhatsApp templates.', bn: 'WhatsApp টেমপ্লেটের মাধ্যমে অটোমেটেড অর্ডার কনফার্মেশন, শিপমেন্ট ট্র্যাকিং ও ডেলিভারি নোটিফিকেশন।' },
      timeline: { en: '5 days setup, 7 days to first result', bn: '৫ দিনে সেটআপ, ৭ দিনে প্রথম ফলাফল' },
      roi: '6x',
      metrics: [
        { en: 'Support calls −70%', bn: 'সাপোর্ট কল −৭০%' },
        { en: 'CSAT +40%', bn: 'CSAT +৪০%' },
        { en: 'Repeat orders +35%', bn: 'রিপিট অর্ডার +৩৫%' },
      ],
    },
    {
      industry: { en: '🏥 Healthcare Clinic', bn: '🏥 হেলথকেয়ার ক্লিনিক' },
      problem: { en: 'Patients called to book appointments. Long wait times. Many bookings never happened.', bn: 'রোগীরা অ্যাপয়েন্টমেন্ট বুক করতে ফোন করতেন। দীর্ঘ অপেক্ষা। অনেক বুকিং হতো না।' },
      solution: { en: 'AI chatbot + automated booking system — patients book themselves in WhatsApp.', bn: 'AI চ্যাটবট + অটোমেটেড বুকিং সিস্টেম — রোগীরা WhatsApp-এ নিজেরাই বুক করে।' },
      timeline: { en: '3 days setup', bn: '৩ দিনে সেটআপ' },
      roi: '4x',
      metrics: [
        { en: 'Bookings +150%', bn: 'বুকিং +১৫০%' },
        { en: 'No-shows −60%', bn: 'নো-শো −৬০%' },
        { en: 'Front-desk calls −80%', bn: 'ফ্রন্ট-ডেস্ক কল −৮০%' },
      ],
    },
    {
      industry: { en: '🏠 Real Estate Developer', bn: '🏠 রিয়েল এস্টেট ডেভেলপার' },
      problem: { en: 'Hundreds of property enquiries, slow follow-up, leads going cold before sales team reached them.', bn: 'শত শত প্রপার্টি ইনকোয়ারি, স্লো ফলো-আপ, সেলস টিম পৌঁছানোর আগেই লিড কোল্ড হয়ে যাচ্ছিল।' },
      solution: { en: 'AI qualifies leads by budget, location, timeline. Hot leads routed to sales in under 60 seconds.', bn: 'AI বাজেট, লোকেশন, টাইমলাইন দিয়ে লিড কোয়ালিফাই করে। হট লিড ৬০ সেকেন্ডের মধ্যে সেলসে যায়।' },
      timeline: { en: '7 days setup', bn: '৭ দিনে সেটআপ' },
      roi: '8x',
      metrics: [
        { en: 'Lead response −95% (to <1 min)', bn: 'লিড রেসপন্স −৯৫% (<১ মিনিট)' },
        { en: 'Site visits +220%', bn: 'সাইট ভিজিট +২২০%' },
        { en: 'Close rate +45%', bn: 'ক্লোজ রেট +৪৫%' },
      ],
    },
    {
      industry: { en: '🍔 Restaurant Chain', bn: '🍔 রেস্টুরেন্ট চেইন' },
      problem: { en: 'Phone lines jammed during peak hours. Lost orders, angry customers.', bn: 'পিক আওয়ারে ফোন লাইন জ্যাম। হারানো অর্ডার, রাগী গ্রাহক।' },
      solution: { en: 'WhatsApp menu, order placement, table booking and feedback — all automated.', bn: 'WhatsApp মেনু, অর্ডার প্লেসমেন্ট, টেবিল বুকিং ও ফিডব্যাক — সব অটোমেটেড।' },
      timeline: { en: '4 days setup', bn: '৪ দিনে সেটআপ' },
      roi: '5x',
      metrics: [
        { en: 'Orders +60%', bn: 'অর্ডার +৬০%' },
        { en: 'Phone orders −75%', bn: 'ফোন অর্ডার −৭৫%' },
        { en: 'Avg rating 4.2→4.7', bn: 'গড় রেটিং ৪.২→৪.৭' },
      ],
    },
    {
      industry: { en: '🎓 Coaching Institute', bn: '🎓 কোচিং ইনস্টিটিউট' },
      problem: { en: 'Admission season chaos. Hundreds of enquiries, no way to follow up with all.', bn: 'ভর্তি সিজনের বিশৃঙ্খলা। শত শত ইনকোয়ারি, সবার সাথে ফলো-আপ করার উপায় নেই।' },
      solution: { en: 'AI handles admission enquiries, sends course info, books counselling calls.', bn: 'AI ভর্তি ইনকোয়ারি সামলায়, কোর্স ইনফো পাঠায়, কাউন্সেলিং কল বুক করে।' },
      timeline: { en: '5 days setup', bn: '৫ দিনে সেটআপ' },
      roi: '7x',
      metrics: [
        { en: 'Enquiries handled +400%', bn: 'ইনকোয়ারি হ্যান্ডল +৪০০%' },
        { en: 'Enrolments +90%', bn: 'এনরোলমেন্ট +৯০%' },
        { en: 'Staff cost −50%', bn: 'স্টাফ খরচ −৫০%' },
      ],
    },
    {
      industry: { en: '🚚 Logistics Company', bn: '🚚 লজিস্টিকস কোম্পানি' },
      problem: { en: 'Customers calling for tracking updates. Drivers distracted. Chaos at dispatch.', bn: 'গ্রাহকরা ট্র্যাকিং আপডেটের জন্য ফোন করছেন। ড্রাইভার বিভ্রান্ত। ডিসপ্যাচে বিশৃঙ্খলা।' },
      solution: { en: 'Auto tracking updates, POD confirmation, pickup booking — all on WhatsApp.', bn: 'অটো ট্র্যাকিং আপডেট, POD কনফার্মেশন, পিকআপ বুকিং — সব WhatsApp-এ।' },
      timeline: { en: '6 days setup', bn: '৬ দিনে সেটআপ' },
      roi: '5x',
      metrics: [
        { en: 'Tracking calls −85%', bn: 'ট্র্যাকিং কল −৮৫%' },
        { en: 'On-time delivery +30%', bn: 'অন-টাইম ডেলিভারি +৩০%' },
        { en: 'CSAT +50%', bn: 'CSAT +৫০%' },
      ],
    },
    {
      industry: { en: '💼 B2B SaaS Company', bn: '💼 B2B SaaS কোম্পানি' },
      problem: { en: 'Long B2B sales cycles. Leads lost in email threads. Demos not getting booked.', bn: 'দীর্ঘ B2B সেলস সাইকেল। ইমেইল থ্রেডে লিড হারায়। ডেমো বুক হচ্ছে না।' },
      solution: { en: 'AI qualifies B2B leads, books demos, syncs to CRM, nurtures with content drips.', bn: 'AI B2B লিড কোয়ালিফাই করে, ডেমো বুক করে, CRM-এ সিঙ্ক করে, কনটেন্ট ড্রিপ দিয়ে নার্চার করে।' },
      timeline: { en: '8 days setup', bn: '৮ দিনে সেটআপ' },
      roi: '9x',
      metrics: [
        { en: 'Demos booked +180%', bn: 'ডেমো বুকড +১৮০%' },
        { en: 'SQL → close +55%', bn: 'SQL → ক্লোজ +৫৫%' },
        { en: 'Sales cycle −30%', bn: 'সেলস সাইকেল −৩০%' },
      ],
    },
    {
      industry: { en: '🛍️ Fashion Retailer', bn: '🛍️ ফ্যাশন রিটেইলার' },
      problem: { en: 'Cart abandonment at 70%. No recovery mechanism. Lost revenue in lakhs.', bn: '৭০% কার্ট অ্যাব্যান্ডনমেন্ট। কোনো রিকভারি মেকানিজম নেই। লাখ লাখ টাকা হারাচ্ছিল।' },
      solution: { en: 'Automated 3-step cart recovery sequence with personalised offers on WhatsApp.', bn: 'WhatsApp-এ পার্সোনালাইজড অফার সহ অটোমেটেড ৩-স্টেপ কার্ট রিকভারি সিকোয়েন্স।' },
      timeline: { en: '4 days setup', bn: '৪ দিনে সেটআপ' },
      roi: '11x',
      metrics: [
        { en: 'Cart recovery +32%', bn: 'কার্ট রিকভারি +৩২%' },
        { en: 'Revenue +৳18L/month', bn: 'রেভিনিউ +৳১৮L/মাস' },
        { en: 'ROAS 11x', bn: 'ROAS ১১x' },
      ],
    },
    {
      industry: { en: '🏦 Financial Services', bn: '🏦 ফাইন্যান্সিয়াল সার্ভিসেস' },
      problem: { en: 'Loan enquiries flooding phone lines. Slow document collection. Compliance paperwork.', bn: 'লোন ইনকোয়ারিতে ফোন লাইন ভর্তি। স্লো ডকুমেন্ট কালেকশন। কমপ্লায়েন্স পেপারওয়ার্ক।' },
      solution: { en: 'AI collects documents, verifies KYC, calculates EMI, routes to loan officers.', bn: 'AI ডকুমেন্ট সংগ্রহ করে, KYC ভেরিফাই করে, EMI ক্যালকুলেট করে, লোন অফিসারে পাঠায়।' },
      timeline: { en: '10 days setup', bn: '১০ দিনে সেটআপ' },
      roi: '6x',
      metrics: [
        { en: 'Loan processing −40%', bn: 'লোন প্রসেসিং −৪০%' },
        { en: 'Disbursals +70%', bn: 'ডিসবার্সাল +৭০%' },
        { en: 'Compliance 100%', bn: 'কমপ্লায়েন্স ১০০%' },
      ],
    },
    {
      industry: { en: '🚗 Automotive Dealer', bn: '🚗 অটোমোটিভ ডিলার' },
      problem: { en: 'Test-drive bookings lost. Service reminders not sent. Customers going elsewhere.', bn: 'টেস্ট-ড্রাইভ বুকিং হারায়। সার্ভিস রিমাইন্ডার পাঠানো হয় না। গ্রাহক অন্যখানে যাচ্ছে।' },
      solution: { en: 'WhatsApp test-drive booking, service reminders, feedback collection, upsell offers.', bn: 'WhatsApp টেস্ট-ড্রাইভ বুকিং, সার্ভিস রিমাইন্ডার, ফিডব্যাক সংগ্রহ, আপসেল অফার।' },
      timeline: { en: '6 days setup', bn: '৬ দিনে সেটআপ' },
      roi: '5x',
      metrics: [
        { en: 'Test drives +130%', bn: 'টেস্ট ড্রাইভ +১৩০%' },
        { en: 'Service retention +45%', bn: 'সার্ভিস রিটেনশন +৪৫%' },
        { en: 'CSAT 4.8/5', bn: 'CSAT ৪.৮/৫' },
      ],
    },
  ],
}

/* ========================================================================== */
/*  17. STATISTICS (Industry Benchmarks)                                       */
/* ========================================================================== */

export const STATISTICS = {
  eyebrow: { en: 'Industry benchmarks', bn: 'ইন্ডাস্ট্রি বেঞ্চমার্ক' } as Bilingual,
  title: {
    en: 'The numbers that prove WhatsApp wins',
    bn: 'WhatsApp-এর জয়ের প্রমাণ সংখ্যাগুলো',
  } as Bilingual,
  subtitle: {
    en: 'Verified industry data — not marketing fluff.',
    bn: 'যাচাইকৃত ইন্ডাস্ট্রি ডেটা — মার্কেটিং ফ্লাফ নয়।',
  } as Bilingual,
  stats: [
    { value: '98%', label: { en: 'WhatsApp message open rate (vs 20% email)', bn: 'WhatsApp মেসেজ ওপেন রেট (ইমেইল ২০%)' } },
    { value: '45%', label: { en: 'Average reply rate (vs 6% SMS)', bn: 'গড় রিপ্লাই রেট (SMS ৬%)' } },
    { value: '2B+', label: { en: 'WhatsApp users worldwide', bn: 'বিশ্বব্যাপী WhatsApp ব্যবহারকারী' } },
    { value: '90%', label: { en: 'Messages read within 3 seconds', bn: '৩ সেকেন্ডে পড়া হয় এমন মেসেজ' } },
    { value: '60%', label: { en: 'Customers prefer WhatsApp over call/email', bn: 'কল/ইমেইলের চেয়ে WhatsApp পছন্দ করেন' } },
    { value: '3.5x', label: { en: 'Higher conversion than email marketing', bn: 'ইমেইল মার্কেটিংয়ের চেয়ে উচ্চ কনভার্সন' } },
    { value: '70%', label: { en: 'Reduction in support cost with AI chatbot', bn: 'AI চ্যাটবটে সাপোর্ট খরচ কমে' } },
    { value: '৳5L', label: { en: 'Average annual savings per business', bn: 'প্রতি ব্যবসায় গড় বার্ষিক সাশ্রয়' } },
  ],
}

/* ========================================================================== */
/*  18. DELIVERABLES                                                           */
/* ========================================================================== */

export const DELIVERABLES = {
  eyebrow: { en: 'Everything you get', bn: 'আপনি যা পাবেন' } as Bilingual,
  title: {
    en: 'Complete deliverables — nothing hidden, nothing extra to buy',
    bn: 'সম্পূর্ণ ডেলিভারেবল — কিছুই লুকানো নেই, আলাদা কিনতে হবে না',
  } as Bilingual,
  subtitle: {
    en: 'A turnkey WhatsApp automation system, ready to run from day one.',
    bn: 'একটি টার্নকি WhatsApp অটোমেশন সিস্টেম, প্রথম দিন থেকেই চালু করার জন্য প্রস্তুত।',
  } as Bilingual,
  items: [
    { icon: 'settings', title: { en: 'Complete Setup', bn: 'সম্পূর্ণ সেটআপ' }, desc: { en: 'WhatsApp Business API verification, number migration, green-tick application.', bn: 'WhatsApp Business API ভেরিফিকেশন, নম্বর মাইগ্রেশন, গ্রিন-টিক অ্যাপ্লিকেশন।' } },
    { icon: 'file-text', title: { en: 'Message Templates', bn: 'মেসেজ টেমপ্লেট' }, desc: { en: '20+ Meta-approved templates for your industry — ready to send.', bn: 'আপনার ইন্ডাস্ট্রির জন্য ২০+ মেটা-অনুমোদিত টেমপ্লেট — পাঠানোর জন্য প্রস্তুত।' } },
    { icon: 'workflow', title: { en: 'Automation Flows', bn: 'অটোমেশন ফ্লো' }, desc: { en: '5 pre-built flows: welcome, cart recovery, appointment, feedback, win-back.', bn: '৫টি প্রি-বিল্ট ফ্লো: ওয়েলকাম, কার্ট রিকভারি, অ্যাপয়েন্টমেন্ট, ফিডব্যাক, উইন-ব্যাক।' } },
    { icon: 'bot', title: { en: 'AI Chatbot', bn: 'AI চ্যাটবট' }, desc: { en: 'GPT-4 chatbot trained on your knowledge base, FAQs and products.', bn: 'আপনার নলেজ বেস, FAQ ও প্রোডাক্টে ট্রেইনড GPT-4 চ্যাটবট।' } },
    { icon: 'database', title: { en: 'CRM Integration', bn: 'CRM ইন্টিগ্রেশন' }, desc: { en: 'Connected to your CRM (HubSpot, GoHighLevel, Zoho or Google Sheets).', bn: 'আপনার CRM-এ যুক্ত (HubSpot, GoHighLevel, Zoho বা Google Sheets)।' } },
    { icon: 'graduation-cap', title: { en: 'Team Training', bn: 'টিম ট্রেনিং' }, desc: { en: '2 live sessions for your team + recorded tutorials for new hires.', bn: 'আপনার টিমের জন্য ২টি লাইভ সেশন + নতুন স্টাফের জন্য রেকর্ডেড টিউটোরিয়াল।' } },
    { icon: 'headset', title: { en: 'Priority Support', bn: 'প্রায়োরিটি সাপোর্ট' }, desc: { en: 'Dedicated success manager, WhatsApp support group, 4-hour response SLA.', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার, WhatsApp সাপোর্ট গ্রুপ, ৪-ঘন্টা রেসপন্স SLA।' } },
    { icon: 'bar-chart', title: { en: 'Analytics Dashboard', bn: 'অ্যানালিটিক্স ড্যাশবোর্ড' }, desc: { en: 'Real-time metrics: delivery, open, reply, conversion, agent performance.', bn: 'রিয়েল-টাইম মেট্রিক্স: ডেলিভারি, ওপেন, রিপ্লাই, কনভার্সন, এজেন্ট পারফরম্যান্স।' } },
    { icon: 'book-open', title: { en: 'Documentation', bn: 'ডকুমেন্টেশন' }, desc: { en: 'Complete SOPs, API docs, video tutorials — everything your team needs.', bn: 'সম্পূর্ণ SOP, API ডকস, ভিডিও টিউটোরিয়াল — আপনার টিমের যা প্রয়োজন।' } },
    { icon: 'shield', title: { en: 'Security & Compliance', bn: 'সিকিউরিটি ও কমপ্লায়েন্স' }, desc: { en: 'GDPR compliance, data encryption, daily backups, audit logs.', bn: 'GDPR কমপ্লায়েন্স, ডেটা এনক্রিপশন, ডেইলি ব্যাকআপ, অডিট লগ।' } },
  ],
}

/* ========================================================================== */
/*  19. PRICING                                                                */
/* ========================================================================== */

export const PRICING = {
  eyebrow: { en: 'Transparent pricing', bn: 'স্বচ্ছ প্রাইসিং' } as Bilingual,
  title: {
    en: 'Choose the plan that fits your scale',
    bn: 'আপনার স্কেলের উপযুক্ত প্ল্যান বেছে নিন',
  } as Bilingual,
  subtitle: {
    en: 'All plans include 60-day ROI guarantee. Cancel anytime. No lock-in.',
    bn: 'সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি। যেকোনো সময় ক্যানসেল। কোনো লক-ইন নেই।',
  } as Bilingual,
  tiers: [
    {
      name: { en: 'Starter', bn: 'স্টার্টার' },
      price: { en: '৳25,000/mo', bn: '৳২৫,০০০/মাস' },
      tagline: { en: 'For small businesses getting started', bn: 'ছোট ব্যবসার জন্য যারা শুরু করছে' },
      popular: false,
      features: [
        { en: '5,000 messages / month', bn: '৫,০০০ মেসেজ / মাস' },
        { en: 'AI chatbot (1,000 conversations)', bn: 'AI চ্যাটবট (১,০০০ কনভার্সেশন)' },
        { en: '3 team agents', bn: '৩ জন টিম এজেন্ট' },
        { en: '5 automation flows', bn: '৫টি অটোমেশন ফ্লো' },
        { en: '10 message templates', bn: '১০টি মেসেজ টেমপ্লেট' },
        { en: 'Google Sheets integration', bn: 'Google Sheets ইন্টিগ্রেশন' },
        { en: 'Basic analytics', bn: 'বেসিক অ্যানালিটিক্স' },
        { en: 'Email support', bn: 'ইমেইল সাপোর্ট' },
      ],
    },
    {
      name: { en: 'Growth', bn: 'গ্রোথ' },
      price: { en: '৳50,000/mo', bn: '৳৫০,০০০/মাস' },
      tagline: { en: 'For scaling businesses that need more power', bn: 'স্কেলিং ব্যবসার জন্য যাদের বেশি পাওয়ার দরকার' },
      popular: true,
      features: [
        { en: '25,000 messages / month', bn: '২৫,০০০ মেসেজ / মাস' },
        { en: 'AI chatbot (5,000 conversations)', bn: 'AI চ্যাটবট (৫,০০০ কনভার্সেশন)' },
        { en: '10 team agents', bn: '১০ জন টিম এজেন্ট' },
        { en: 'Unlimited automation flows', bn: 'আনলিমিটেড অটোমেশন ফ্লো' },
        { en: '20 message templates', bn: '২০টি মেসেজ টেমপ্লেট' },
        { en: 'HubSpot / GoHighLevel / Zoho integration', bn: 'HubSpot / GoHighLevel / Zoho ইন্টিগ্রেশন' },
        { en: 'Advanced analytics + ROI dashboard', bn: 'অ্যাডভান্সড অ্যানালিটিক্স + ROI ড্যাশবোর্ড' },
        { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
        { en: '4-hour response SLA', bn: '৪-ঘন্টা রেসপন্স SLA' },
        { en: 'Cart recovery + broadcast', bn: 'কার্ট রিকভারি + ব্রডকাস্ট' },
      ],
    },
    {
      name: { en: 'Enterprise', bn: 'এন্টারপ্রাইজ' },
      price: { en: 'Custom', bn: 'কাস্টম' },
      tagline: { en: 'For large teams with custom needs', bn: 'বড় টিমের জন্য কাস্টম প্রয়োজনে' },
      popular: false,
      features: [
        { en: 'Unlimited messages', bn: 'আনলিমিটেড মেসেজ' },
        { en: 'Unlimited AI conversations', bn: 'আনলিমিটেড AI কনভার্সেশন' },
        { en: 'Unlimited team agents', bn: 'আনলিমিটেড টিম এজেন্ট' },
        { en: 'Custom automation flows', bn: 'কাস্টম অটোমেশন ফ্লো' },
        { en: 'Unlimited templates', bn: 'আনলিমিটেড টেমপ্লেট' },
        { en: 'Salesforce / custom API', bn: 'Salesforce / কাস্টম API' },
        { en: 'White-label dashboard', bn: 'হোয়াইট-লেবেল ড্যাশবোর্ড' },
        { en: 'Dedicated account manager', bn: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার' },
        { en: '1-hour response SLA', bn: '১-ঘন্টা রেসপন্স SLA' },
        { en: 'On-premise option available', bn: 'অন-প্রেমাইস অপশন উপলব্ধ' },
        { en: 'Custom AI training', bn: 'কাস্টম AI ট্রেনিং' },
        { en: 'Compliance + audit support', bn: 'কমপ্লায়েন্স + অডিট সাপোর্ট' },
      ],
    },
  ],
  note: {
    en: 'All prices in BDT (৳). Setup fee waived for annual commitments. 15% annual discount.',
    bn: 'সব মূল্য BDT (৳)। বার্ষিক কমিটমেন্টে সেটআপ ফি মওকুফ। ১৫% বার্ষিক ছাড়।',
  } as Bilingual,
}

/* ========================================================================== */
/*  20. ROI CALCULATOR                                                         */
/* ========================================================================== */

export const ROI_CALCULATOR = {
  eyebrow: { en: 'See your numbers', bn: 'আপনার সংখ্যা দেখুন' } as Bilingual,
  title: {
    en: 'WhatsApp Automation ROI Calculator',
    bn: 'WhatsApp অটোমেশন ROI ক্যালকুলেটর',
  } as Bilingual,
  subtitle: {
    en: 'Drag the sliders to match your business. See your projected ROI in real-time.',
    bn: 'স্লাইডার টেনে আপনার ব্যবসার সাথে মিলিয়ে নিন। রিয়েল-টাইমে আপনার প্রজেক্টেড ROI দেখুন।',
  } as Bilingual,
  sliders: {
    messages: {
      label: { en: 'Messages / month', bn: 'মেসেজ / মাস' },
      min: 1000,
      max: 100000,
      step: 1000,
      default: 10000,
    },
    openRate: {
      label: { en: 'Open rate (%)', bn: 'ওপেন রেট (%)' },
      min: 70,
      max: 99,
      step: 1,
      default: 95,
    },
    replyRate: {
      label: { en: 'Reply / conversion rate (%)', bn: 'রিপ্লাই / কনভার্সন রেট (%)' },
      min: 5,
      max: 60,
      step: 1,
      default: 25,
    },
    customerValue: {
      label: { en: 'Average customer value (৳)', bn: 'গড় গ্রাহক ভ্যালু (৳)' },
      min: 500,
      max: 100000,
      step: 500,
      default: 5000,
    },
    monthlyCost: {
      label: { en: 'Monthly investment (৳)', bn: 'মাসিক ইনভেস্টমেন্ট (৳)' },
      min: 10000,
      max: 200000,
      step: 5000,
      default: 50000,
    },
  },
  results: {
    opened: { label: { en: 'Messages opened', bn: 'মেসেজ ওপেন' } },
    replies: { label: { en: 'Conversions / replies', bn: 'কনভার্সন / রিপ্লাই' } },
    revenue: { label: { en: 'Revenue generated', bn: 'রেভিনিউ জেনারেটেড' } },
    roi: { label: { en: 'ROI (multiple)', bn: 'ROI (গুণিতক)' } },
    profit: { label: { en: 'Net profit / month', bn: 'নেট প্রফিট / মাস' } },
    annual: { label: { en: 'Projected annual profit', bn: 'প্রজেক্টেড বার্ষিক প্রফিট' } },
  },
  note: {
    en: 'Estimates based on industry averages. Your actual results may vary. Book a call for a custom projection.',
    bn: 'ইন্ডাস্ট্রি গড়ের উপর ভিত্তি করে অনুমান। আপনার আসল ফলাফল ভিন্ন হতে পারে। কাস্টম প্রজেকশনের জন্য কল বুক করুন।',
  } as Bilingual,
}

/* ========================================================================== */
/*  21. TIMELINE                                                               */
/* ========================================================================== */

export const TIMELINE = {
  eyebrow: { en: 'From zero to running', bn: 'জিরো থেকে রানিং' } as Bilingual,
  title: {
    en: 'Your WhatsApp automation goes live in 30 days',
    bn: 'আপনার WhatsApp অটোমেশন ৩০ দিনে লাইভ হয়',
  } as Bilingual,
  subtitle: {
    en: 'A clear, milestone-driven rollout. You see progress every week.',
    bn: 'একটি স্পষ্ট, মাইলস্টোন-চালিত রোলআউট। প্রতি সপ্তাহে অগ্রগতি দেখবেন।',
  } as Bilingual,
  phases: [
    {
      when: { en: 'Day 1', bn: 'দিন ১' },
      title: { en: 'Discovery & Setup', bn: 'ডিসকভারি ও সেটআপ' },
      desc: { en: 'Business audit, WhatsApp Business API application, Meta verification kickoff.', bn: 'বিজনেস অডিট, WhatsApp Business API অ্যাপ্লিকেশন, Meta ভেরিফিকেশন শুরু।' },
    },
    {
      when: { en: 'Day 3', bn: 'দিন ৩' },
      title: { en: 'Verification', bn: 'ভেরিফিকেশন' },
      desc: { en: 'Phone number migration, business profile setup, green-tick application.', bn: 'ফোন নম্বর মাইগ্রেশন, বিজনেস প্রোফাইল সেটআপ, গ্রিন-টিক অ্যাপ্লিকেশন।' },
    },
    {
      when: { en: 'Week 1', bn: 'সপ্তাহ ১' },
      title: { en: 'Automation Build', bn: 'অটোমেশন বিল্ড' },
      desc: { en: 'Chatbot training, message templates, automation flows, CRM integration.', bn: 'চ্যাটবট ট্রেনিং, মেসেজ টেমপ্লেট, অটোমেশন ফ্লো, CRM ইন্টিগ্রেশন।' },
    },
    {
      when: { en: 'Week 2', bn: 'সপ্তাহ ২' },
      title: { en: 'Testing & Launch', bn: 'টেস্টিং ও লঞ্চ' },
      desc: { en: 'End-to-end testing, team training, soft launch, first broadcast campaign.', bn: 'এন্ড-টু-এন্ড টেস্টিং, টিম ট্রেনিং, সফট লঞ্চ, প্রথম ব্রডকাস্ট ক্যাম্পেইন।' },
    },
    {
      when: { en: 'Month 1', bn: 'মাস ১' },
      title: { en: 'Optimisation', bn: 'অপ্টিমাইজেশন' },
      desc: { en: 'Performance review, A/B testing, AI tuning, flow optimisation.', bn: 'পারফরম্যান্স রিভিউ, A/B টেস্টিং, AI টিউনিং, ফ্লো অপ্টিমাইজেশন।' },
    },
    {
      when: { en: 'Month 2+', bn: 'মাস ২+' },
      title: { en: 'Scale', bn: 'স্কেল' },
      desc: { en: 'Add new flows, expand to new use cases, scale messages, grow revenue.', bn: 'নতুন ফ্লো যোগ, নতুন ইউজ-কেসে সম্প্রসারণ, মেসেজ স্কেল, রেভিনিউ বৃদ্ধি।' },
    },
  ],
}

/* ========================================================================== */
/*  22. PROCESS                                                                */
/* ========================================================================== */

export const PROCESS = {
  eyebrow: { en: 'How we work', bn: 'আমরা কিভাবে কাজ করি' } as Bilingual,
  title: {
    en: 'Our 7-step delivery process',
    bn: 'আমাদের ৭-ধাপের ডেলিভারি প্রসেস',
  } as Bilingual,
  subtitle: {
    en: 'Proven, transparent and milestone-driven — no surprises.',
    bn: 'প্রমাণিত, স্বচ্ছ ও মাইলস্টোন-চালিত — কোনো চমক নেই।',
  } as Bilingual,
  steps: [
    { icon: 'search', title: { en: 'Discovery', bn: 'ডিসকভারি' }, desc: { en: 'Deep-dive into your business, goals, customers and current WhatsApp usage.', bn: 'আপনার বিজনেস, লক্ষ্য, গ্রাহক ও বর্তমান WhatsApp ব্যবহারে ডিপ-ডাইভ।' } },
    { icon: 'map', title: { en: 'Planning', bn: 'প্ল্যানিং' }, desc: { en: 'Custom strategy document: flows, templates, AI training plan, integrations.', bn: 'কাস্টম স্ট্র্যাটেজি ডকুমেন্ট: ফ্লো, টেমপ্লেট, AI ট্রেনিং প্ল্যান, ইন্টিগ্রেশন।' } },
    { icon: 'settings', title: { en: 'Setup', bn: 'সেটআপ' }, desc: { en: 'API setup, verification, number migration, CRM connection, security config.', bn: 'API সেটআপ, ভেরিফিকেশন, নম্বর মাইগ্রেশন, CRM কানেকশন, সিকিউরিটি কনফিগ।' } },
    { icon: 'flask-conical', title: { en: 'Testing', bn: 'টেস্টিং' }, desc: { en: 'End-to-end testing: chatbot, flows, broadcasts, integrations, edge cases.', bn: 'এন্ড-টু-এন্ড টেস্টিং: চ্যাটবট, ফ্লো, ব্রডকাস্ট, ইন্টিগ্রেশন, এজ কেস।' } },
    { icon: 'rocket', title: { en: 'Launch', bn: 'লঞ্চ' }, desc: { en: 'Go-live with first campaign. Team trained. Monitoring active.', bn: 'প্রথম ক্যাম্পেইন নিয়ে গো-লাইভ। টিম ট্রেইনড। মনিটরিং অ্যাকটিভ।' } },
    { icon: 'sliders', title: { en: 'Optimisation', bn: 'অপ্টিমাইজেশন' }, desc: { en: 'Weekly review, A/B tests, AI retraining, flow improvements based on data.', bn: 'সাপ্তাহিক রিভিউ, A/B টেস্ট, AI রিট্রেনিং, ডেটা-ভিত্তিক ফ্লো উন্নয়ন।' } },
    { icon: 'trending-up', title: { en: 'Scale', bn: 'স্কেল' }, desc: { en: 'Add channels, new use cases, advanced AI, expand to new markets.', bn: 'নতুন চ্যানেল, নতুন ইউজ-কেস, অ্যাডভান্সড AI, নতুন মার্কেটে সম্প্রসারণ।' } },
  ],
}

/* ========================================================================== */
/*  23. FAQ (40+ questions, grouped)                                           */
/* ========================================================================== */

export const FAQS = {
  eyebrow: { en: 'Answers to your questions', bn: 'আপনার প্রশ্নের উত্তর' } as Bilingual,
  title: {
    en: 'Frequently asked questions',
    bn: 'সাধারণ জিজ্ঞাসা',
  } as Bilingual,
  subtitle: {
    en: 'Everything you need to know before booking your call.',
    bn: 'কল বুক করার আগে যা যা জানা দরকার।',
  } as Bilingual,
  groups: [
    {
      name: { en: 'Pricing & Plans', bn: 'প্রাইসিং ও প্ল্যান' },
      items: [
        {
          q: { en: 'How much does WhatsApp automation cost?', bn: 'WhatsApp অটোমেশনের খরচ কত?' },
          a: { en: 'Plans start at ৳25,000/month for 5,000 messages and scale up to custom enterprise pricing. All plans include the 60-day ROI guarantee. Annual commitments get 15% off and waived setup fees.', bn: '৫,০০০ মেসেজের জন্য প্ল্যান শুরু ৳২৫,০০০/মাস থেকে এবং কাস্টম এন্টারপ্রাইজ প্রাইসিং পর্যন্ত। সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি। বার্ষিক কমিটমেন্টে ১৫% ছাড় এবং সেটআপ ফি মওকুফ।' },
        },
        {
          q: { en: 'Is there a setup fee?', bn: 'কি কোনো সেটআপ ফি আছে?' },
          a: { en: 'Setup fee is waived for annual plans. For monthly plans, a one-time setup fee of ৳15,000 covers API verification, number migration and initial configuration.', bn: 'বার্ষিক প্ল্যানে সেটআপ ফি মওকুফ। মাসিক প্ল্যানে এককালীন ৳১৫,০০০ সেটআপ ফি API ভেরিফিকেশন, নম্বর মাইগ্রেশন ও প্রাথমিক কনফিগারেশন কভার করে।' },
        },
        {
          q: { en: 'Can I change plans later?', bn: 'পরে প্ল্যান পরিবর্তন করতে পারব?' },
          a: { en: 'Yes, upgrade or downgrade anytime. Upgrades are instant; downgrades take effect at the next billing cycle.', bn: 'হ্যাঁ, যেকোনো সময় আপগ্রেড বা ডাউনগ্রেড করুন। আপগ্রেড তাৎক্ষণিক; ডাউনগ্রেড পরবর্তী বিলিং সাইকেলে কার্যকর।' },
        },
        {
          q: { en: 'What happens if I exceed my message limit?', bn: 'মেসেজ লিমিট পার হলে কী হয়?' },
          a: { en: 'You get an alert at 80% usage. Overages are billed at ৳0.50/message or you can auto-upgrade. No service disruption.', bn: '৮০% ব্যবহারে অ্যালার্ট পাবেন। ওভারেজ ৳০.৫০/মেসেজে বিল হয় বা অটো-আপগ্রেড করতে পারেন। কোনো সার্ভিস ব্যাঘাত নেই।' },
        },
        {
          q: { en: 'Do you offer refunds?', bn: 'আপনারা রিফান্ড দেন?' },
          a: { en: 'Yes — the 60-day ROI guarantee means if you do not see measurable ROI within 60 days, we refund 100% and you keep the setup.', bn: 'হ্যাঁ — ৬০-দিন ROI গ্যারান্টি মানে ৬০ দিনের মধ্যে পরিমেয় ROI না দেখলে আমরা ১০০% রিফান্ড দেই এবং সেটআপ আপনার থাকে।' },
        },
      ],
    },
    {
      name: { en: 'Setup & Technical', bn: 'সেটআপ ও টেকনিক্যাল' },
      items: [
        {
          q: { en: 'How long does setup take?', bn: 'সেটআপে কত সময় লাগে?' },
          a: { en: '3–10 days depending on plan and complexity. Starter plans go live in 3–5 days; Enterprise with custom integrations takes 7–10 days.', bn: 'প্ল্যান ও জটিলতার উপর নির্ভর করে ৩–১০ দিন। স্টার্টার প্ল্যান ৩–৫ দিনে লাইভ; কাস্টম ইন্টিগ্রেশনসহ এন্টারপ্রাইজ ৭–১০ দিন নেয়।' },
        },
        {
          q: { en: 'Do I need coding knowledge?', bn: 'আমার কি কোডিং জ্ঞান দরকার?' },
          a: { en: 'No. Everything is configured via our visual dashboard. Your team manages it with no-code tools. Developers can use our API for custom integrations.', bn: 'না। সবকিছু আমাদের ভিজ্যুয়াল ড্যাশবোর্ড দিয়ে কনফিগার করা হয়। আপনার টিম নো-কোড টুল দিয়ে পরিচালনা করে। ডেভেলপাররা কাস্টম ইন্টিগ্রেশনের জন্য আমাদের API ব্যবহার করতে পারে।' },
        },
        {
          q: { en: 'Do I need a new phone number?', bn: 'আমার নতুন ফোন নম্বর লাগবে?' },
          a: { en: 'No — we can migrate your existing WhatsApp number to the Business API. Or you can use a new number. Both work.', bn: 'না — আমরা আপনার বিদ্যমান WhatsApp নম্বর Business API-তে মাইগ্রেট করতে পারি। বা নতুন নম্বর ব্যবহার করতে পারেন। দুটোই কাজ করে।' },
        },
        {
          q: { en: 'What is WhatsApp Business API verification?', bn: 'WhatsApp Business API ভেরিফিকেশন কী?' },
          a: { en: 'Meta verifies your business so you can send official messages via the Cloud API. We handle the entire verification process for you.', bn: 'Meta আপনার বিজনেস ভেরিফাই করে যাতে আপনি Cloud API দিয়ে অফিশিয়াল মেসেজ পাঠাতে পারেন। আমরা পুরো ভেরিফিকেশন প্রসেস সামলাই।' },
        },
        {
          q: { en: 'Can I get a green tick (verified badge)?', bn: 'আমি কি গ্রিন টিক (ভেরিফাইড ব্যাজ) পেতে পারি?' },
          a: { en: 'Yes. We apply for the green tick on your behalf. Approval takes 7–14 days and depends on Meta. Most legitimate businesses get approved.', bn: 'হ্যাঁ। আমরা আপনার হয়ে গ্রিন টিকের জন্য আবেদন করি। অনুমোদন ৭–১৪ দিন এবং Meta-এর উপর নির্ভর করে। বৈধ ব্যবসার বেশিরভাগই অনুমোদিত হয়।' },
        },
        {
          q: { en: 'What are Meta messaging limits?', bn: 'Meta মেসেজিং লিমিট কী?' },
          a: { en: 'Meta tiers businesses: 1K, 10K, 100K, unlimited unique customers per 24h. We help you climb tiers as your quality rating stays high.', bn: 'Meta ব্যবসাকে টিয়ার করে: ১K, ১০K, ১০০K, আনলিমিটেড ইউনিক কাস্টমার ২৪ঘন্টায়। আপনার কোয়ালিটি রেটিং ভাল থাকলে আমরা টিয়ার বাড়াতে সাহায্য করি।' },
        },
      ],
    },
    {
      name: { en: 'AI & Chatbot', bn: 'AI ও চ্যাটবট' },
      items: [
        {
          q: { en: 'How smart is the AI chatbot?', bn: 'AI চ্যাটবট কতটা স্মার্ট?' },
          a: { en: 'Powered by GPT-4. Understands context, intent, slang, mixed Bangla-English (Banglish). Handles 80% of conversations independently. Trains on your knowledge base.', bn: 'GPT-4 দ্বারা চালিত। কনটেক্সট, ইনটেন্ট, স্ল্যাং, মিক্সড বাংলা-ইংরেজি (Banglish) বোঝে। ৮০% কথোপকথন স্বাধীনভাবে সামলায়। আপনার নলেজ বেসে ট্রেইন হয়।' },
        },
        {
          q: { en: 'Does the AI speak Bengali?', bn: 'AI কি বাংলায় কথা বলে?' },
          a: { en: 'Yes. Native Bengali, English, Hindi, Arabic — auto-detects the customer\'s language and replies in kind. Perfect for Bangladesh.', bn: 'হ্যাঁ। নেটিভ বাংলা, ইংরেজি, হিন্দি, আরবি — গ্রাহকের ভাষা অটো-ডিটেক্ট করে এবং সেই ভাষায় উত্তর দেয়। বাংলাদেশের জন্য পারফেক্ট।' },
        },
        {
          q: { en: 'What if the AI cannot answer?', bn: 'AI উত্তর না দিতে পারলে?' },
          a: { en: 'If confidence is low or the question is complex, the AI escalates to a human agent with full chat context. No customer is left hanging.', bn: 'কনফিডেন্স কম বা প্রশ্ন জটিল হলে, AI পূর্ণ চ্যাট কনটেক্সট সহ হিউম্যান এজেন্টে এসকেলেট করে। কোনো গ্রাহক ঝুলে থাকে না।' },
        },
        {
          q: { en: 'How do I train the AI on my business?', bn: 'আমার বিজনেসে AI কিভাবে ট্রেইন করব?' },
          a: { en: 'Upload PDFs, docs, FAQs, product lists via dashboard. The AI uses RAG (retrieval-augmented generation) to give accurate, sourced answers.', bn: 'ড্যাশবোর্ড দিয়ে PDF, ডক, FAQ, প্রোডাক্ট লিস্ট আপলোড করুন। AI RAG (রিট্রিভাল-অগমেন্টেড জেনারেশন) ব্যবহার করে সঠিক, সোর্সড উত্তর দেয়।' },
        },
        {
          q: { en: 'Can the AI handle voice messages?', bn: 'AI কি ভয়েস মেসেজ সামলাতে পারে?' },
          a: { en: 'Yes. It transcribes voice notes, understands spoken Bengali and English, and replies with voice or text — your choice.', bn: 'হ্যাঁ। ভয়েস নোট ট্রান্সক্রাইব করে, কথ্য বাংলা ও ইংরেজি বোঝে, এবং ভয়েস বা টেক্সটে উত্তর দেয় — আপনার পছন্দ।' },
        },
      ],
    },
    {
      name: { en: 'Compliance & Security', bn: 'কমপ্লায়েন্স ও সিকিউরিটি' },
      items: [
        {
          q: { en: 'Is this official and legal?', bn: 'এটা কি অফিশিয়াল ও বৈধ?' },
          a: { en: 'Yes. We use the official Meta WhatsApp Business Cloud API — fully compliant with Meta policies. No unofficial tools, no ban risk.', bn: 'হ্যাঁ। আমরা অফিশিয়াল Meta WhatsApp Business Cloud API ব্যবহার করি — Meta পলিসির সাথে সম্পূর্ণ কমপ্লায়েন্ট। কোনো আনঅফিশিয়াল টুল নেই, ব্যান ঝুঁকি নেই।' },
        },
        {
          q: { en: 'Will my number get banned?', bn: 'আমার নম্বর কি ব্যান হবে?' },
          a: { en: 'No. Official API numbers are never banned for normal business messaging. We follow all Meta quality guidelines to keep your account healthy.', bn: 'না। অফিশিয়াল API নম্বর কখনও স্বাভাবিক বিজনেস মেসেজিংয়ে ব্যান হয় না। আমরা সব Meta কোয়ালিটি গাইডলাইন মেনে আপনার অ্যাকাউন্ট সুস্থ রাখি।' },
        },
        {
          q: { en: 'How is customer data protected?', bn: 'গ্রাহক ডেটা কিভাবে সুরক্ষিত?' },
          a: { en: 'End-to-end encryption, GDPR compliance, Cloudflare WAF, encrypted database, role-based permissions, audit logs and daily backups.', bn: 'এন্ড-টু-এন্ড এনক্রিপশন, GDPR কমপ্লায়েন্স, Cloudflare WAF, এনক্রিপ্টেড ডেটাবেস, রোল-বেসড পারমিশন, অডিট লগ ও ডেইলি ব্যাকআপ।' },
        },
        {
          q: { en: 'Where is data stored?', bn: 'ডেটা কোথায় সংরক্ষিত?' },
          a: { en: 'Data is stored on encrypted servers with Cloudflare CDN. Enterprise plans can choose data residency (Bangladesh, EU, US).', bn: 'ডেটা Cloudflare CDN সহ এনক্রিপ্টেড সার্ভারে সংরক্ষিত। এন্টারপ্রাইজ প্ল্যানে ডেটা রেসিডেন্সি বেছে নিতে পারেন (বাংলাদেশ, EU, US)।' },
        },
        {
          q: { en: 'Do you comply with Bangladesh ICT Act?', bn: 'আপনারা কি বাংলাদেশ ICT অ্যাক্ট মানেন?' },
          a: { en: 'Yes. We comply with the Bangladesh ICT Act 2006 (amended 2013) and Digital Security Act 2018 for data protection and digital communication.', bn: 'হ্যাঁ। আমরা ডেটা সুরক্ষা ও ডিজিটাল যোগাযোগের জন্য বাংলাদেশ ICT অ্যাক্ট ২০০৬ (সংশোধিত ২০১৩) এবং ডিজিটাল সিকিউরিটি অ্যাক্ট ২০১৮ মানি।' },
        },
      ],
    },
    {
      name: { en: 'Migration & Support', bn: 'মাইগ্রেশন ও সাপোর্ট' },
      items: [
        {
          q: { en: 'Can I migrate from another provider?', bn: 'অন্য প্রোভাইডার থেকে মাইগ্রেট করতে পারব?' },
          a: { en: 'Yes. We migrate your number, contacts, templates and flows from any provider. Migration takes 3–5 days with zero downtime.', bn: 'হ্যাঁ। আমরা আপনার নম্বর, কন্টাক্ট, টেমপ্লেট ও ফ্লো যেকোনো প্রোভাইডার থেকে মাইগ্রেট করি। মাইগ্রেশন ৩–৫ দিনে জিরো ডাউনটাইমে।' },
        },
        {
          q: { en: 'What support do I get?', bn: 'আমি কী সাপোর্ট পাব?' },
          a: { en: 'Starter: email support. Growth: dedicated success manager + 4-hour SLA. Enterprise: dedicated account manager + 1-hour SLA + WhatsApp support group.', bn: 'স্টার্টার: ইমেইল সাপোর্ট। গ্রোথ: ডেডিকেটেড সাকসেস ম্যানেজার + ৪-ঘন্টা SLA। এন্টারপ্রাইজ: ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার + ১-ঘন্টা SLA + WhatsApp সাপোর্ট গ্রুপ।' },
        },
        {
          q: { en: 'Do you train my team?', bn: 'আপনারা কি আমার টিমকে ট্রেইন করেন?' },
          a: { en: 'Yes. 2 live training sessions for your team, plus recorded tutorials for new hires. Documentation and SOPs included.', bn: 'হ্যাঁ। আপনার টিমের জন্য ২টি লাইভ ট্রেনিং সেশন, প্লাস নতুন স্টাফের জন্য রেকর্ডেড টিউটোরিয়াল। ডকুমেন্টেশন ও SOP অন্তর্ভুক্ত।' },
        },
        {
          q: { en: 'What if something breaks?', bn: 'কিছু নষ্ট হলে?' },
          a: { en: '99.9% uptime SLA. If something breaks, our team is notified instantly and responds within your plan\'s SLA. Most issues resolved in under 1 hour.', bn: '৯৯.৯% আপটাইম SLA। কিছু নষ্ট হলে আমাদের টিম তাৎক্ষণিকভাবে নোটিফাই হয় এবং আপনার প্ল্যানের SLA অনুযায়ী সাড়া দেয়। বেশিরভাগ সমস্যা ১ ঘন্টার মধ্যে সমাধান।' },
        },
      ],
    },
    {
      name: { en: 'Features & Integrations', bn: 'ফিচার ও ইন্টিগ্রেশন' },
      items: [
        {
          q: { en: 'Which CRMs do you integrate with?', bn: 'কোন কোন CRM-এর সাথে ইন্টিগ্রেট?' },
          a: { en: 'HubSpot, GoHighLevel, Zoho, Salesforce, Pipedrive natively. Plus Google Sheets, Zapier, Make, n8n for 5,000+ apps. Custom API for anything else.', bn: 'HubSpot, GoHighLevel, Zoho, Salesforce, Pipedrive নেটিভভাবে। প্লাস Google Sheets, Zapier, Make, n8n দিয়ে ৫,০০০+ অ্যাপ। অন্য কিছুর জন্য কাস্টম API।' },
        },
        {
          q: { en: 'Can I send bulk broadcasts?', bn: 'আমি কি বাল্ক ব্রডকাস্ট পাঠাতে পারি?' },
          a: { en: 'Yes. Up to your plan limit per month. Segment by tag, behaviour, purchase history, location. 98% open rate vs 20% for email.', bn: 'হ্যাঁ। আপনার প্ল্যান লিমিট পর্যন্ত প্রতি মাসে। ট্যাগ, আচরণ, পারচেজ হিস্ট্রি, লোকেশন দিয়ে সেগমেন্ট। ইমেইলের ২০% এর বদলে ৯৮% ওপেন রেট।' },
        },
        {
          q: { en: 'Do you support payment links?', bn: 'আপনারা কি পেমেন্ট লিংক সাপোর্ট করেন?' },
          a: { en: 'Yes. bKash, Nagad, Rocket, Stripe, SSL Commerz — all generate payment links directly in the chat. Instant confirmation.', bn: 'হ্যাঁ। bKash, Nagad, Rocket, Stripe, SSL Commerz — সব চ্যাটে সরাসরি পেমেন্ট লিংক জেনারেট করে। তাৎক্ষণিক কনফার্মেশন।' },
        },
        {
          q: { en: 'Can multiple agents use one number?', bn: 'একাধিক এজেন্ট কি এক নম্বর ব্যবহার করতে পারে?' },
          a: { en: 'Yes. Unlimited agents share one WhatsApp Business number via our team inbox. Assign chats, internal notes, SLA tracking, AI handoff.', bn: 'হ্যাঁ। আনলিমিটেড এজেন্ট আমাদের টিম ইনবক্স দিয়ে এক WhatsApp Business নম্বর শেয়ার করে। চ্যাট অ্যাসাইন, ইন্টারনাল নোট, SLA ট্র্যাকিং, AI হ্যান্ডঅফ।' },
        },
        {
          q: { en: 'Can I build custom automation flows?', bn: 'আমি কি কাস্টম অটোমেশন ফ্লো বানাতে পারি?' },
          a: { en: 'Yes. Our drag-and-drop flow builder lets you create any journey — no coding. Or we build custom flows for you (Enterprise plan).', bn: 'হ্যাঁ। আমাদের ড্র্যাগ-অ্যান্ড-ড্রপ ফ্লো বিল্ডার দিয়ে যেকোনো জার্নি তৈরি করুন — কোডিং নেই। বা আমরা আপনার জন্য কাস্টম ফ্লো বানাই (এন্টারপ্রাইজ প্ল্যান)।' },
        },
      ],
    },
    {
      name: { en: 'Business & ROI', bn: 'বিজনেস ও ROI' },
      items: [
        {
          q: { en: 'What ROI can I expect?', bn: 'আমি কী ROI আশা করতে পারি?' },
          a: { en: 'Our clients average 4.5x ROI within 60 days. E-commerce clients see 6–11x. Use our ROI calculator above for a custom estimate.', bn: 'আমাদের ক্লায়েন্টরা ৬০ দিনে গড় ৪.৫x ROI পায়। ই-কমার্স ক্লায়েন্টরা ৬–১১x দেখে। কাস্টম অনুমানের জন্য উপরের ROI ক্যালকুলেটর ব্যবহার করুন।' },
        },
        {
          q: { en: 'How quickly will I see results?', bn: 'কত দ্রুত ফলাফল দেখব?' },
          a: { en: 'Most clients see results within 7–14 days of launch. Full ROI typically materialises within 60 days as the AI learns and flows optimise.', bn: 'বেশিরভাগ ক্লায়েন্ট লঞ্চের ৭–১৪ দিনের মধ্যে ফলাফল দেখে। AI শেখে ও ফ্লো অপ্টিমাইজ হওয়ায় সম্পূর্ণ ROI সাধারণত ৬০ দিনে আসে।' },
        },
        {
          q: { en: 'Is this for small businesses or enterprises?', bn: 'এটা কি ছোট ব্যবসা নাকি এন্টারপ্রাইজের জন্য?' },
          a: { en: 'Both. Starter plan is perfect for small businesses. Growth and Enterprise plans scale to unlimited messages, agents and integrations.', bn: 'দুটোর জন্যই। স্টার্টার প্ল্যান ছোট ব্যবসার জন্য পারফেক্ট। গ্রোথ ও এন্টারপ্রাইজ প্ল্যান আনলিমিটেড মেসেজ, এজেন্ট ও ইন্টিগ্রেশনে স্কেল করে।' },
        },
        {
          q: { en: 'What industries do you serve?', bn: 'আপনারা কোন কোন ইন্ডাস্ট্রি সেবা দেন?' },
          a: { en: '13+ industries: e-commerce, healthcare, education, real estate, restaurants, manufacturing, agencies, coaching, NGOs, travel, logistics, insurance, finance.', bn: '১৩+ ইন্ডাস্ট্রি: ই-কমার্স, হেলথকেয়ার, শিক্ষা, রিয়েল এস্টেট, রেস্টুরেন্ট, ম্যানুফ্যাকচারিং, এজেন্সি, কোচিং, এনজিও, ট্রাভেল, লজিস্টিকস, ইন্স্যুরেন্স, ফাইন্যান্স।' },
        },
      ],
    },
  ],
}

/* ========================================================================== */
/*  24. OBJECTION HANDLING                                                     */
/* ========================================================================== */

export const OBJECTIONS = {
  eyebrow: { en: 'We get it — you have doubts', bn: 'আমরা বুঝি — আপনার সন্দেহ আছে' } as Bilingual,
  title: {
    en: 'Every objection, honestly answered',
    bn: 'প্রতিটি আপত্তির সৎ উত্তর',
  } as Bilingual,
  subtitle: {
    en: 'If you are thinking it, someone else already asked us.',
    bn: 'আপনি যা ভাবছেন, অন্য কেউ আগেই জিজ্ঞেস করেছে।',
  } as Bilingual,
  items: [
    {
      objection: { en: '"It is too expensive."', bn: '"এটা অনেক দামি।"' },
      response: {
        en: 'The Starter plan is ৳25,000/month — less than one part-time staff salary. It replaces 2–3 support agents, saves 20+ hours/week, and averages 4.5x ROI. You earn back the cost in the first month. The real cost is the business you lose by NOT automating.',
        bn: 'স্টার্টার প্ল্যান ৳২৫,০০০/মাস — এক পার্ট-টাইম স্টাফের স্যালারির চেয়ে কম। এটি ২–৩ সাপোর্ট এজেন্টের বদলে, সপ্তাহে ২০+ ঘন্টা সাশ্রয়, এবং গড় ৪.৫x ROI। প্রথম মাসেই খরচ উঠে আসে। আসল খরচ হলো অটোমেট না করে আপনি যে ব্যবসা হারাচ্ছেন।',
      },
    },
    {
      objection: { en: '"I am already using WhatsApp."', bn: '"আমি তো ইতিমধ্যে WhatsApp ব্যবহার করছি।"' },
      response: {
        en: 'Personal WhatsApp is for personal chat. It has no chatbot, no CRM, no broadcast, no automation, no analytics, and risks a ban if you bulk-send. The Business API is a completely different tool — built for scale.',
        bn: 'পার্সোনাল WhatsApp পার্সোনাল চ্যাটের জন্য। এতে কোনো চ্যাটবট, CRM, ব্রডকাস্ট, অটোমেশন, অ্যানালিটিক্স নেই, এবং বাল্ক-সেন্ড করলে ব্যান ঝুঁকি। Business API সম্পূর্ণ আলাদা টুল — স্কেলের জন্য তৈরি।',
      },
    },
    {
      objection: { en: '"I already have a chatbot."', bn: '"আমার তো আগে থেকেই চ্যাটবট আছে।"' },
      response: {
        en: 'Most chatbots are rule-based — rigid decision trees that break the moment a customer asks something unexpected. Ours is GPT-4 powered: it understands intent, context and emotion. Book a call and we will show you the difference on your own use case.',
        bn: 'বেশিরভাগ চ্যাটবট রুল-বেসড — শক্ত ডিসিশন ট্রি যা গ্রাহক অপ্রত্যাশিত কিছু জিজ্ঞেস করলেই ভেঙে পড়ে। আমাদেরটি GPT-4 চালিত: ইনটেন্ট, কনটেক্সট ও ইমোশন বোঝে। কল বুক করুন, আমরা আপনার ইউজ-কেসে পার্থক্য দেখাব।',
      },
    },
    {
      objection: { en: '"I need to get approval from my boss/team."', bn: '"আমার বস/টিমের অনুমোদন লাগবে।"' },
      response: {
        en: 'Book the free call. We will prepare a one-page ROI projection and a technical brief you can share with your team. We have helped 50+ businesses get internal buy-in.',
        bn: 'ফ্রি কল বুক করুন। আমরা এক পেজের ROI প্রজেকশন এবং টেকনিক্যাল ব্রিফ তৈরি করব যা আপনি আপনার টিমের সাথে শেয়ার করতে পারেন। আমরা ৫০+ ব্যবসাকে ইন্টারনাল বাই-ইন পেতে সাহায্য করেছি।',
      },
    },
    {
      objection: { en: '"I do not have a developer."', bn: '"আমার কোনো ডেভেলপার নেই।"' },
      response: {
        en: 'You do not need one. Everything is no-code — visual dashboard, drag-and-drop flows, pre-built templates. We handle all technical setup. Your team manages it like using WhatsApp.',
        bn: 'আপনার দরকার নেই। সবকিছু নো-কোড — ভিজ্যুয়াল ড্যাশবোর্ড, ড্র্যাগ-অ্যান্ড-ড্রপ ফ্লো, প্রি-বিল্ট টেমপ্লেট। আমরা সব টেকনিক্যাল সেটআপ সামলাই। আপনার টিম WhatsApp ব্যবহারের মতো পরিচালনা করে।',
      },
    },
    {
      objection: { en: '"I am a small business — this is too big for me."', bn: '"আমি ছোট ব্যবসা — এটা আমার জন্য বড়।"' },
      response: {
        en: 'The Starter plan is built for small businesses. 5,000 messages, AI chatbot, 3 agents — all for ৳25,000/month. Many of our clients started small and scaled up. Start where you are.',
        bn: 'স্টার্টার প্ল্যান ছোট ব্যবসার জন্য তৈরি। ৫,০০০ মেসেজ, AI চ্যাটবট, ৩ এজেন্ট — সব ৳২৫,০০০/মাসে। আমাদের অনেক ক্লায়েন্ট ছোট শুরু করে স্কেল করেছে। যেখানে আছেন শুরু করুন।',
      },
    },
    {
      objection: { en: '"I am worried about data privacy."', bn: '"আমি ডেটা প্রাইভেসি নিয়ে চিন্তিত।"' },
      response: {
        en: 'End-to-end encryption, GDPR compliance, Bangladesh ICT Act compliance, encrypted database, role permissions, audit logs, daily backups. Your data is safer with us than on your own server.',
        bn: 'এন্ড-টু-এন্ড এনক্রিপশন, GDPR কমপ্লায়েন্স, বাংলাদেশ ICT অ্যাক্ট কমপ্লায়েন্স, এনক্রিপ্টেড ডেটাবেস, রোল পারমিশন, অডিট লগ, ডেইলি ব্যাকআপ। আপনার ডেটা আমাদের কাছে আপনার নিজের সার্ভারের চেয়েও নিরাপদ।',
      },
    },
    {
      objection: { en: '"What if I want to cancel?"', bn: '"আমি ক্যানসেল করতে চাইলে?"' },
      response: {
        en: 'No lock-in. Cancel anytime with 30 days notice. The 60-day ROI guarantee means if you do not see ROI, we refund 100%. You keep your data and we help you migrate out.',
        bn: 'কোনো লক-ইন নেই। ৩০ দিন নোটিশে যেকোনো সময় ক্যানসেল। ৬০-দিন ROI গ্যারান্টি মানে ROI না দেখলে আমরা ১০০% রিফান্ড। আপনার ডেটা আপনার থাকে এবং আমরা মাইগ্রেট করতে সাহায্য করি।',
      },
    },
    {
      objection: { en: '"I do not have time to set this up."', bn: '"আমার সেটআপের সময় নেই।"' },
      response: {
        en: 'We do 90% of the work. You spend 2–3 hours total across the setup period: one discovery call, one review session, one training. We handle verification, flows, templates, integration, testing.',
        bn: 'আমরা ৯০% কাজ করি। সেটআপ পিরিয়ডে আপনি মোট ২–৩ ঘন্টা খরচ করেন: এক ডিসকভারি কল, এক রিভিউ সেশন, এক ট্রেনিং। ভেরিফিকেশন, ফ্লো, টেমপ্লেট, ইন্টিগ্রেশন, টেস্টিং আমরা সামলাই।',
      },
    },
    {
      objection: { en: '"Will my customers actually use it?"', bn: '"আমার গ্রাহকরা কি আসলে ব্যবহার করবে?"' },
      response: {
        en: 'WhatsApp has 2B+ users and 90% open rate in Bangladesh. Your customers are already on it daily. They prefer WhatsApp over phone calls and emails. You are meeting them where they already are.',
        bn: 'WhatsApp-এ ২B+ ব্যবহারকারী এবং বাংলাদেশে ৯০% ওপেন রেট। আপনার গ্রাহকরা ইতিমধ্যেই প্রতিদিন এতে আছে। তারা ফোন কল ও ইমেইলের চেয়ে WhatsApp পছন্দ করে। আপনি তাদের যেখানে আছে সেখানেই দেখা করছেন।',
      },
    },
  ],
}

/* ========================================================================== */
/*  25. GUARANTEES                                                             */
/* ========================================================================== */

export const GUARANTEES = {
  eyebrow: { en: 'Risk reversed', bn: 'ঝুঁকি উল্টানো' } as Bilingual,
  title: {
    en: 'Our guarantees — your risk is zero',
    bn: 'আমাদের গ্যারান্টি — আপনার ঝুঁকি জিরো',
  } as Bilingual,
  subtitle: {
    en: 'We take on all the risk so you can decide with confidence.',
    bn: 'আমরা সব ঝুঁকি নিই যাতে আপনি আত্মবিশ্বাসে সিদ্ধান্ত নিতে পারেন।',
  } as Bilingual,
  cards: [
    {
      icon: 'shield-check',
      title: { en: '60-Day ROI Guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      desc: {
        en: 'If you do not see measurable ROI within 60 days, we refund 100% — and you keep the setup. Zero risk to you.',
        bn: '৬০ দিনের মধ্যে পরিমেয় ROI না দেখলে আমরা ১০০% রিফান্ড দেই — এবং সেটআপ আপনার থাকে। আপনার জিরো ঝুঁকি।',
      },
    },
    {
      icon: 'rocket',
      title: { en: 'Fast Setup Guarantee', bn: 'ফাস্ট সেটআপ গ্যারান্টি' },
      desc: {
        en: 'Starter live in 5 days, Growth in 7, Enterprise in 10. If we miss the deadline, your first month is free.',
        bn: 'স্টার্টার ৫ দিনে, গ্রোথ ৭ দিনে, এন্টারপ্রাইজ ১০ দিনে লাইভ। ডেডলাইন মিস করলে আপনার প্রথম মাস ফ্রি।',
      },
    },
    {
      icon: 'headset',
      title: { en: 'Priority Support Guarantee', bn: 'প্রায়োরিটি সাপোর্ট গ্যারান্টি' },
      desc: {
        en: 'Response within your plan SLA (4 hours for Growth, 1 hour for Enterprise). Miss it and we credit your account.',
        bn: 'আপনার প্ল্যান SLA অনুযায়ী রেসপন্স (গ্রোথ ৪ ঘন্টা, এন্টারপ্রাইজ ১ ঘন্টা)। মিস করলে আমরা আপনার অ্যাকাউন্টে ক্রেডিট দেই।',
      },
    },
    {
      icon: 'lock',
      title: { en: 'Data Security Guarantee', bn: 'ডেটা সিকিউরিটি গ্যারান্টি' },
      desc: {
        en: 'End-to-end encryption, GDPR, daily backups. If a data breach ever occurs due to our fault, we cover all costs.',
        bn: 'এন্ড-টু-এন্ড এনক্রিপশন, GDPR, ডেইলি ব্যাকআপ। আমাদের ভুলে কখনও ডেটা ব্রিচ হলে আমরা সব খরচ বহন করি।',
      },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'No Lock-In Guarantee', bn: 'নো লক-ইন গ্যারান্টি' },
      desc: {
        en: 'Cancel anytime with 30 days notice. No penalties, no exit fees. We even help you migrate your data out.',
        bn: '৩০ দিন নোটিশে যেকোনো সময় ক্যানসেল। কোনো পেনাল্টি, কোনো এক্সিট ফি নেই। আমরা আপনার ডেটা মাইগ্রেট করতেও সাহায্য করি।',
      },
    },
    {
      icon: 'trophy',
      title: { en: 'Results Guarantee', bn: 'ফলাফল গ্যারান্টি' },
      desc: {
        en: 'We commit to specific KPIs in writing — open rate, reply rate, conversion lift. Miss them and we work for free until we hit them.',
        bn: 'আমরা লিখিতভাবে নির্দিষ্ট KPI কমিট করি — ওপেন রেট, রিপ্লাই রেট, কনভার্সন লিফট। মিস করলে আমরা না হওয়া পর্যন্ত ফ্রি কাজ করি।',
      },
    },
  ],
}

/* ========================================================================== */
/*  26. TRUST (Testimonials, Logos, Partners)                                  */
/* ========================================================================== */

export const TRUST = {
  eyebrow: { en: 'Trusted by businesses across Bangladesh', bn: 'বাংলাদেশের ব্যবসাসমূহের আস্থা' } as Bilingual,
  title: {
    en: '120+ businesses trust NextGen with their WhatsApp',
    bn: '১২০+ ব্যবসা NextGen-কে তাদের WhatsApp-এ বিশ্বাস করে',
  } as Bilingual,
  subtitle: {
    en: 'From startups to enterprises — across 13 industries.',
    bn: 'স্টার্টআপ থেকে এন্টারপ্রাইজ — ১৩টি ইন্ডাস্ট্রিতে।',
  } as Bilingual,
  testimonials: [
    {
      quote: {
        en: 'We went from missing 30+ inquiries a day to answering every single one in under 3 seconds. Sales jumped 60% in the first month. This system paid for itself in 18 days.',
        bn: 'আমরা প্রতিদিন ৩০+ ইনকোয়ারি মিস করতাম, এখন প্রতিটির উত্তর ৩ সেকেন্ডে দিই। প্রথম মাসেই বিক্রি ৬০% বেড়েছে। এই সিস্টেম ১৮ দিনে নিজের খরচ তুলেছে।',
      },
      author: { en: 'Rahim Ahmed', bn: 'রহিম আহমেদ' },
      role: { en: 'Founder, Dhaka Electronics', bn: 'প্রতিষ্ঠাতা, ঢাকা ইলেকট্রনিক্স' },
    },
    {
      quote: {
        en: 'The AI chatbot handles 85% of patient queries. Our front desk is free for in-clinic patients. Appointments are up 150% — and we never miss a booking anymore.',
        bn: 'AI চ্যাটবট ৮৫% রোগীর প্রশ্ন সামলায়। আমাদের ফ্রন্ট ডেস্ক ক্লিনিকের রোগীদের জন্য ফ্রি। অ্যাপয়েন্টমেন্ট ১৫০% বেড়েছে — এবং আর কোনো বুকিং মিস হয় না।',
      },
      author: { en: 'Dr. Sarah Khan', bn: 'ডা. সারা খান' },
      role: { en: 'Director, LifeCare Clinic', bn: 'পরিচালক, লাইফকেয়ার ক্লিনিক' },
    },
    {
      quote: {
        en: 'Abandoned cart recovery alone added ৳18 lakh per month in revenue. The ROI calculator on this page actually understated what we achieved. 11x ROAS.',
        bn: 'শুধু অ্যাব্যান্ডনড কার্ট রিকভারিতে মাসে ৳১৮ লাখ রেভিনিউ যোগ হয়েছে। এই পেজের ROI ক্যালকুলেটর আসলে আমরা যা অর্জন করেছি তার চেয়ে কম দেখায়। ১১x ROAS।',
      },
      author: { en: 'Tanvir Hasan', bn: 'তানভীর হাসান' },
      role: { en: 'CEO, FashionHub BD', bn: 'সিইও, ফ্যাশনহাব বিডি' },
    },
    {
      quote: {
        en: 'As a real estate developer, speed-to-lead is everything. NextGen routes hot leads to my sales team in under 60 seconds. Site visits up 220%, close rate up 45%.',
        bn: 'রিয়েল এস্টেট ডেভেলপার হিসেবে স্পিড-টু-লিড সবকিছু। NextGen হট লিড ৬০ সেকেন্ডে আমার সেলস টিমে পাঠায়। সাইট ভিজিট ২২০%, ক্লোজ রেট ৪৫% বেড়েছে।',
      },
      author: { en: 'Kamrul Islam', bn: 'কামরুল ইসলাম' },
      role: { en: 'MD, Skyline Properties', bn: 'এমডি, স্কাইলাইন প্রপার্টিজ' },
    },
    {
      quote: {
        en: 'We tried 3 other WhatsApp automation tools before NextGen. None came close. The GPT-4 bot actually understands Banglish. Our customers love it.',
        bn: 'NextGen-এর আগে আমরা ৩টি WhatsApp অটোমেশন টুল চেষ্টা করেছি। কেউই কাছেও পৌঁছায়নি। GPT-4 বট আসলেই Banglish বোঝে। আমাদের গ্রাহকরা ভালোবাসে।',
      },
      author: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' },
      role: { en: 'Marketing Head, EduPlus', bn: 'মার্কেটিং হেড, এডুপ্লাস' },
    },
    {
      quote: {
        en: 'The team inbox changed how we work. 8 agents share one number, no chaos, full visibility. Support response time dropped from hours to minutes.',
        bn: 'টিম ইনবক্স আমাদের কাজের ধরন বদলে দিয়েছে। ৮ এজেন্ট এক নম্বর শেয়ার করে, কোনো বিশৃঙ্খলা নেই, পূর্ণ ভিজিবিলিটি। সাপোর্ট রেসপন্স টাইম ঘন্টা থেকে মিনিটে নেমেছে।',
      },
      author: { en: 'Faisal Rahman', bn: 'ফয়সাল রহমান' },
      role: { en: 'Operations Lead, QuickShip', bn: 'অপারেশনস লিড, কুইকশিপ' },
    },
  ],
  stats: [
    { value: '120+', label: { en: 'Businesses served', bn: 'সেবা প্রাপ্ত ব্যবসা' } },
    { value: '13', label: { en: 'Industries', bn: 'ইন্ডাস্ট্রি' } },
    { value: '10L+', label: { en: 'Messages / month', bn: 'মেসেজ / মাস' } },
    { value: '4.9/5', label: { en: 'Average rating', bn: 'গড় রেটিং' } },
    { value: '৳48Cr+', label: { en: 'Revenue generated', bn: 'রেভিনিউ জেনারেটেড' } },
    { value: '94%', label: { en: 'Client retention', bn: 'ক্লায়েন্ট রিটেনশন' } },
  ],
  partners: [
    { en: 'Meta Business Partner', bn: 'মেটা বিজনেস পার্টনার' },
    { en: 'OpenAI', bn: 'OpenAI' },
    { en: 'Cloudflare', bn: 'Cloudflare' },
    { en: 'Google Cloud', bn: 'গুগল ক্লাউড' },
    { en: 'WhatsApp Business', bn: 'WhatsApp Business' },
    { en: 'Twilio', bn: 'Twilio' },
    { en: 'HubSpot', bn: 'HubSpot' },
    { en: 'Stripe', bn: 'Stripe' },
  ],
}

/* ========================================================================== */
/*  27. SECURITY                                                               */
/* ========================================================================== */

export const SECURITY = {
  eyebrow: { en: 'Enterprise-grade security', bn: 'এন্টারপ্রাইজ-গ্রেড সিকিউরিটি' } as Bilingual,
  title: {
    en: 'Your data is protected like a bank vault',
    bn: 'আপনার ডেটা ব্যাংক ভল্টের মতো সুরক্ষিত',
  } as Bilingual,
  subtitle: {
    en: 'Every layer — from network to database — is hardened and audited.',
    bn: 'প্রতিটি স্তর — নেটওয়ার্ক থেকে ডেটাবেস — হার্ডেন্ড এবং অডিটেড।',
  } as Bilingual,
  cards: [
    {
      icon: 'lock',
      title: { en: 'End-to-End Encryption', bn: 'এন্ড-টু-এন্ড এনক্রিপশন' },
      desc: { en: 'AES-256 at rest, TLS 1.3 in transit. WhatsApp\'s own E2E for messages.', bn: 'AES-256 অ্যাট রেস্ট, TLS 1.3 ইন ট্রানজিট। মেসেজের জন্য WhatsApp-এর নিজস্ব E2E।' },
    },
    {
      icon: 'shield',
      title: { en: 'GDPR Compliant', bn: 'GDPR কমপ্লায়েন্ট' },
      desc: { en: 'Full GDPR compliance. Right to access, rectify, erase, portability.', bn: 'সম্পূর্ণ GDPR কমপ্লায়েন্স। অ্যাক্সেস, সংশোধন, মুছে ফেলা, পোর্টেবিলিটির অধিকার।' },
    },
    {
      icon: 'cloud',
      title: { en: 'Cloudflare WAF', bn: 'Cloudflare WAF' },
      desc: { en: 'Web Application Firewall + DDoS protection + global CDN.', bn: 'ওয়েব অ্যাপ্লিকেশন ফায়ারওয়াল + DDoS প্রটেকশন + গ্লোবাল CDN।' },
    },
    {
      icon: 'database',
      title: { en: 'Daily Encrypted Backups', bn: 'ডেইলি এনক্রিপ্টেড ব্যাকআপ' },
      desc: { en: 'Automated daily backups, 30-day retention, geo-redundant storage.', bn: 'অটোমেটেড ডেইলি ব্যাকআপ, ৩০-দিন রিটেনশন, জিও-রিডান্ড্যান্ট স্টোরেজ।' },
    },
    {
      icon: 'users',
      title: { en: 'Role-Based Permissions', bn: 'রোল-বেসড পারমিশন' },
      desc: { en: 'Admin, manager, agent, viewer roles. Granular access control.', bn: 'অ্যাডমিন, ম্যানেজার, এজেন্ট, ভিউয়ার রোল। গ্রানুলার অ্যাক্সেস কন্ট্রোল।' },
    },
    {
      icon: 'file-search',
      title: { en: 'Audit Logs', bn: 'অডিট লগ' },
      desc: { en: 'Every action logged — who did what, when. Exportable for compliance.', bn: 'প্রতিটি অ্যাকশন লগড — কে কী করেছে, কখন। কমপ্লায়েন্সের জন্য এক্সপোর্টেবল।' },
    },
    {
      icon: 'map-pin',
      title: { en: 'Data Residency', bn: 'ডেটা রেসিডেন্সি' },
      desc: { en: 'Choose where data lives: Bangladesh, EU or US (Enterprise plan).', bn: 'ডেটা কোথায় থাকবে বেছে নিন: বাংলাদেশ, EU বা US (এন্টারপ্রাইজ প্ল্যান)।' },
    },
    {
      icon: 'eye',
      title: { en: '24/7 Monitoring', bn: '২৪/৭ মনিটরিং' },
      desc: { en: 'Real-time security monitoring. Instant alerts on anomalies.', bn: 'রিয়েল-টাইম সিকিউরিটি মনিটরিং। অ্যানোমালিতে তাৎক্ষণিক অ্যালার্ট।' },
    },
  ],
  compliance: [
    { en: 'GDPR', bn: 'GDPR' },
    { en: 'Bangladesh ICT Act 2006', bn: 'বাংলাদেশ ICT অ্যাক্ট ২০০৬' },
    { en: 'Digital Security Act 2018', bn: 'ডিজিটাল সিকিউরিটি অ্যাক্ট ২০১৮' },
    { en: 'Meta Business Policy', bn: 'Meta বিজনেস পলিসি' },
    { en: 'PCI DSS (payments)', bn: 'PCI DSS (পেমেন্ট)' },
    { en: 'SOC 2 Type II (Enterprise)', bn: 'SOC 2 Type II (এন্টারপ্রাইজ)' },
  ],
}

/* ========================================================================== */
/*  28. FINAL CTA                                                              */
/* ========================================================================== */

export const FINAL_CTA = {
  eyebrow: { en: 'Ready when you are', bn: 'আপনি প্রস্তুত হলে' } as Bilingual,
  title: {
    en: 'Stop losing customers to slow replies. Start automating today.',
    bn: 'স্লো রিপ্লাইয়ে গ্রাহক হারানো বন্ধ করুন। আজই অটোমেট শুরু করুন।',
  } as Bilingual,
  subtitle: {
    en: 'Book your free 30-minute strategy call. Walk away with a custom WhatsApp automation roadmap — whether you hire us or not.',
    bn: 'ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কল বুক করুন। একটি কাস্টম WhatsApp অটোমেশন রোডম্যাপ নিয়ে যান — আমাদের হায়ার করেন বা না করেন।',
  } as Bilingual,
  primaryCta: {
    en: 'Book My Free Strategy Call',
    bn: 'আমার ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
  secondaryCta: {
    en: 'Chat on WhatsApp',
    bn: 'WhatsApp-এ চ্যাট করুন',
  } as Bilingual,
  reassurance: [
    { en: 'No pressure, no obligation', bn: 'কোনো চাপ নেই, কোনো বাধ্যবাধকতা নেই' },
    { en: '30-minute call, not a sales pitch', bn: '৩০-মিনিট কল, সেলস পিচ নয়' },
    { en: 'Walk away with a free roadmap', bn: 'ফ্রি রোডম্যাপ নিয়ে যান' },
    { en: '60-day ROI guarantee if you proceed', bn: 'এগোলে ৬০-দিন ROI গ্যারান্টি' },
  ],
}

/* ========================================================================== */
/*  29. EXIT POPUP                                                             */
/* ========================================================================== */

export const EXIT_POPUP = {
  title: {
    en: 'Wait! A gift for you',
    bn: 'থামুন! আপনার জন্য একটি উপহার',
  } as Bilingual,
  desc: {
    en: 'Not ready to talk yet? Get a free "WhatsApp Automation Potential Audit" for your business — a ৳5,000 value, yours free.',
    bn: 'এখনই কথা বলতে প্রস্তুত নন? আপনার ব্যবসার জন্য ফ্রি "WhatsApp অটোমেশন সম্ভাবনা অডিট" পান — ৳৫,০০০ মূল্যের, আপনার জন্য ফ্রি।',
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
    en: 'Check your inbox! Audit link is on its way.',
    bn: 'ইনবক্স চেক করুন! অডিট লিংক পথে আছে।',
  } as Bilingual,
}

/* ========================================================================== */
/*  30. STICKY CTA (mobile)                                                    */
/* ========================================================================== */

export const STICKY_CTA = {
  price: { en: 'from ৳25,000/mo', bn: '৳২৫,০০০/মাস থেকে' } as Bilingual,
  roi: { en: '5–10x ROI', bn: '৫–১০x ROI' } as Bilingual,
  cta: { en: 'Book a Call', bn: 'কল বুক করুন' } as Bilingual,
}

/* ========================================================================== */
/*  31. SECTION ORDER (for the client renderer)                                */
/* ========================================================================== */

export const SECTION_ORDER = [
  'hero',
  'metrics',
  'problem',
  'emotional-cost',
  'why-traditional',
  'why-nextgen',
  'how-it-works',
  'features',
  'use-cases',
  'ai-automation',
  'marketing',
  'crm',
  'tech-stack',
  'benefits',
  'comparison',
  'case-studies',
  'statistics',
  'deliverables',
  'pricing',
  'roi-calculator',
  'timeline',
  'process',
  'faq',
  'objections',
  'guarantees',
  'trust',
  'security',
  'final-cta',
  'lead-form',
] as const
