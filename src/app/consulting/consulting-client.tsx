'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { SiteFooter } from '@/components/site/footer'
import { usePageViewTracking } from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import {
  ArrowRight,
  ArrowDown,
  Check,
  X,
  Stethoscope,
  Search,
  Target,
  Zap,
  Compass,
  ClipboardCheck,
  ChevronDown,
  Users,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Laptop,
  GraduationCap,
  Lightbulb,
  Clock,
  Layers,
  Rocket,
  AlertTriangle,
  TrendingDown,
  Brain,
  Heart,
  Eye,
  Map,
  Flag,
  Route,
  GitBranch,
  CheckCircle2,
  Circle,
  HelpCircle,
  Hand,
  Activity,
  Workflow,
  Wrench,
  Repeat,
  FileSearch,
  Scale,
  Cpu,
  Settings,
} from 'lucide-react'

type LangCode = 'en' | 'bn'

/* ============================================================
   INLINE BILINGUAL LOOKUPS (matches who-we-help.tsx pattern)
   Keeps array-of-objects data bilingual without bloating the
   language-provider dictionary.
   ============================================================ */

// SECTION 02: HERO diagnostic pathway steps
const PATHWAY_LABELS: Record<LangCode, string[]> = {
  en: ['CURRENT SITUATION', 'PROBLEM GAP', 'BOTTLENECK', 'PRIORITY', 'ACTION PLAN'],
  bn: ['বর্তমান অবস্থা', 'সমস্যার ফাঁক', 'ব্যবধান', 'অগ্রাধিকার', 'পদক্ষেপ পরিকল্পনা'],
}

// SECTION 04: PROBLEM RECOGNITION — 7 scenarios (tag / chain / q)
const PROB_TAGS: Record<LangCode, string[]> = {
  en: ['Learning', 'Entrepreneurship', 'Business', 'Freelancing', 'Career', 'Time / Execution', 'System'],
  bn: ['শেখা', 'উদ্যোক্তা', 'ব্যবসা', 'ফ্রিল্যান্সিং', 'ক্যারিয়ার', 'সময় / বাস্তবায়ন', 'সিস্টেম'],
}
const PROB_CHAINS: Record<LangCode, string[]> = {
  en: [
    'Learning a Skill → but no Offer → no Customer → no Sales',
    'Idea exists → but Customer Problem unclear → Validation not done',
    'Doing Marketing → but cannot figure out where the Problem is in Positioning/Offer/Lead/Sales',
    'Skill exists → Portfolio exists → but Client Acquisition not consistent',
    'Growing Skill → but unclear which direction to go',
    'Doing lots of work → but Priority unclear',
    'Business runs → but process, system, review structure weak',
  ],
  bn: [
    'দক্ষতা শিখছেন → কিন্তু অফার নেই → গ্রাহক নেই → বিক্রি নেই',
    'ধারণা আছে → কিন্তু গ্রাহকের সমস্যা পরিষ্কার নয় → যাচাই হয়নি',
    'Marketing করছেন → কিন্তু Positioning/অফার/Lead/বিক্রি কোথায় সমস্যা বুঝতে পারছেন না',
    'দক্ষতা আছে → Portfolio আছে → কিন্তু ক্লায়েন্ট অর্জন ধারাবাহিক নয়',
    'দক্ষতা বাড়াচ্ছেন → কিন্তু কোন দিকে যাবেন পরিষ্কার নয়',
    'অনেক কাজ করছেন → কিন্তু অগ্রাধিকার পরিষ্কার নয়',
    'ব্যবসা চলছে → কিন্তু প্রক্রিয়া, সিস্টেম, পর্যালোচনা কাঠামো দুর্বল',
  ],
}
const PROB_QS: Record<LangCode, string[]> = {
  en: [
    'Skill selection or positioning — which comes first?',
    'Validation or MVP — which is the first step?',
    'Marketing funnel or sales conversion — where is the bottleneck?',
    'Client acquisition or offer redesign — where are you stuck?',
    'Side income or career growth — which is the priority?',
    'Which task first — and which to drop completely?',
    'Fix the process or build a review structure?',
  ],
  bn: [
    'দক্ষতা নির্বাচন নাকি Positioning—কোনটা আগে?',
    'যাচাই নাকি MVP—প্রথম ধাপ কোনটা?',
    'Marketing funnel নাকি sales conversion—ব্যবধান কোথায়?',
    'ক্লায়েন্ট অর্জন নাকি অফার নকশা—কোথায় আটকে আছেন?',
    'সাইড আয় নাকি ক্যারিয়ার প্রবৃদ্ধি—অগ্রাধিকার কোনটা?',
    'কোন কাজটি আগে—আর কোনটি একদম বাদ?',
    'প্রক্রিয়া ঠিক করা নাকি পর্যালোচনা কাঠামো তৈরি করা?',
  ],
}

// SECTION 05: INFORMATION vs DIAGNOSIS — list items
const INFO_ITEMS: Record<LangCode, string[]> = {
  en: ['Another course', 'Another YouTube video', 'Another tutorial', 'Another framework', 'Another tool'],
  bn: ['আরও একটি course', 'আরও একটি YouTube video', 'আরও একটি tutorial', 'আরও একটি framework', 'আরও একটি tool'],
}
const DIAG_ITEMS: Record<LangCode, string[]> = {
  en: [
    'Which Problem to solve first',
    'Which work to NOT do now',
    'Where the real Bottleneck is',
    'Which Priority matters most',
    'What your Next Best Action is',
  ],
  bn: [
    'কোন সমস্যা আগে সমাধান করবেন',
    'কোন কাজ এখন করবেন না',
    'আসল ব্যবধান কোথায়',
    'কোন অগ্রাধিকার সবচেয়ে গুরুত্বপূর্ণ',
    'আপনার পরবর্তী সেরা পদক্ষেপ কী',
  ],
}

// SECTION 07: CORE FRAMEWORK — 8 steps (title / desc)
const FRAMEWORK_TITLES: Record<LangCode, string[]> = {
  en: ['CURRENT SITUATION', 'DESIRED OUTCOME', 'PROBLEM GAP', 'BOTTLENECK', 'PRIORITY', 'ACTION PLAN', 'IMPLEMENTATION', 'REVIEW'],
  bn: ['বর্তমান অবস্থা', 'কাঙ্ক্ষিত ফলাফল', 'সমস্যার ফাঁক', 'ব্যবধান', 'অগ্রাধিকার', 'পদক্ষেপ পরিকল্পনা', 'বাস্তবায়ন', 'পর্যালোচনা'],
}
const FRAMEWORK_DESCS: Record<LangCode, string[]> = {
  en: [
    'Where are you now?',
    'Where do you want to go?',
    'What is preventing the current state from becoming desired?',
    'Which constraint is causing the biggest blockage?',
    'What should be solved first?',
    'What should happen next?',
    'How should the plan be executed?',
    'What happened, learned, and should change?',
  ],
  bn: [
    'আপনি এখন কোথায় আছেন?',
    'আপনি কোথায় যেতে চান?',
    'বর্তমান অবস্থা থেকে কাঙ্ক্ষিত ফলাফলে যেতে কী বাধা?',
    'কোন সীমাবদ্ধতা সবচেয়ে বড় বাধা তৈরি করছে?',
    'কোনটি আগে সমাধান করা উচিত?',
    'এরপর কী হওয়া উচিত?',
    'পরিকল্পনা কীভাবে বাস্তবায়িত হবে?',
    'কী ঘটল, কী শিখলেন, আর কী পরিবর্তন করা উচিত?',
  ],
}

// SECTION 08: 7D ENGINE — 7 descriptions (labels DISCOVER..DEPLOY stay English brand)
const ENGINE_7D_DESCS: Record<LangCode, string[]> = {
  en: [
    'Understand current Situation and context',
    'Clarify Problem and Desired Outcome',
    'Analyze real Problem and likely Root Cause',
    'Find Bottleneck and highest-impact constraint',
    'Determine which Problem to solve first',
    'Build Strategy and Action Direction',
    'Move toward real Implementation',
  ],
  bn: [
    'বর্তমান অবস্থা ও প্রেক্ষাপট বোঝা',
    'সমস্যা ও কাঙ্ক্ষিত ফলাফল পরিষ্কার করা',
    'আসল সমস্যা ও সম্ভাব্য মূল কারণ বিশ্লেষণ',
    'ব্যবধান ও সর্বোচ্চ-প্রভাবশালী সীমাবদ্ধতা খুঁজে বের করা',
    'কোন সমস্যা আগে সমাধান করতে হবে তা নির্ধারণ',
    'কৌশল ও পদক্ষেপের দিকনির্দেশ তৈরি করা',
    'বাস্তব বাস্তবায়নের দিকে এগিয়ে যাওয়া',
  ],
}

// SECTION 09: CUSTOMER INTELLIGENCE MODEL — 5 layers (label / desc)
const CIM_LAYER_LABELS: Record<LangCode, string[]> = {
  en: ['SYMPTOM', 'PROBLEM', 'ROOT CAUSE', 'BOTTLENECK', 'DESIRED OUTCOME'],
  bn: ['লক্ষণ', 'সমস্যা', 'মূল কারণ', 'ব্যবধান', 'কাঙ্ক্ষিত ফলাফল'],
}
const CIM_LAYER_DESCS: Record<LangCode, string[]> = {
  en: [
    'What you notice',
    'What you think wrongly',
    'Likely what is creating the problem',
    'The most restrictive constraint',
    'What you truly want',
  ],
  bn: [
    'যা আপনি লক্ষ্য করেন',
    'যা আপনি ভুলে ভাবেন',
    'সম্ভাব্য যা সমস্যা তৈরি করছে',
    'সবচেয়ে সীমাবদ্ধ সীমাবদ্ধতা',
    'আপনি যা সত্যিই চান',
  ],
}
// SECTION 09: CIM worked example rows (l / v)
const CIM_EXAMPLE_LS: Record<LangCode, string[]> = {
  en: ['Symptom', 'Problem', 'Root Cause', 'Bottleneck', 'Desired Outcome'],
  bn: ['লক্ষণ', 'সমস্যা', 'মূল কারণ', 'ব্যবধান', 'কাঙ্ক্ষিত ফলাফল'],
}
const CIM_EXAMPLE_VS: Record<LangCode, string[]> = {
  en: [
    'No clients',
    'Weak client acquisition',
    'Likely: Unclear positioning / weak offer / poor outreach / wrong audience',
    'No clear acquisition mechanism',
    'Predictable qualified client opportunities',
  ],
  bn: [
    'ক্লায়েন্ট নেই',
    'দুর্বল ক্লায়েন্ট অর্জন',
    'সম্ভাব্য: অস্পষ্ট Positioning / দুর্বল অফার / দুর্বল আউটরিচ / ভুল শ্রোতা',
    'স্পষ্ট অর্জন প্রক্রিয়া নেই',
    'পূর্বানুমানযোগ্য উপযুক্ত ক্লায়েন্ট সুযোগ',
  ],
}

// SECTION 10: CONSULTING CATEGORIES — 4 items (title / subtitle / areas / cta)
const CAT_TITLES: Record<LangCode, string[]> = {
  en: ['Business Growth', 'Freelancer Growth', 'Career & Side-Income', 'Idea & Entrepreneurship'],
  bn: ['ব্যবসা প্রবৃদ্ধি', 'ফ্রিল্যান্সার প্রবৃদ্ধি', 'ক্যারিয়ার ও সাইড আয়', 'ধারণা ও উদ্যোক্তা'],
}
const CAT_SUBTITLES: Record<LangCode, string[]> = {
  en: [
    'For those who have a Business or want to grow one',
    'For those stuck on Client Acquisition and Positioning',
    'For those confused about Career Direction and Side Income',
    'For those starting out with a new Idea',
  ],
  bn: [
    'যাদের ব্যবসা আছে অথবা বাড়াতে চান',
    'যারা ক্লায়েন্ট অর্জন ও Positioning নিয়ে আটকে',
    'যারা ক্যারিয়ারের দিকনির্দেশ ও সাইড আয় নিয়ে বিভ্রান্ত',
    'যারা নতুন ধারণা নিয়ে শুরু করতে চান',
  ],
}
const CAT_AREAS: Record<LangCode, string[][]> = {
  en: [
    ['Customer Acquisition', 'Lead Generation', 'Sales', 'Offer', 'Positioning', 'Marketing', 'Execution', 'Growth Direction'],
    ['Client Acquisition', 'Positioning', 'Offer', 'Pricing', 'Sales Communication', 'Portfolio', 'Workflow'],
    ['Career Direction', 'Skill Development', 'Side Income Direction', 'Time Management', 'Career Transition', 'Risk', 'Action Planning'],
    ['Business Idea', 'Customer Problem', 'Validation', 'Offer', 'MVP', 'Market Direction', 'Priority'],
  ],
  bn: [
    ['গ্রাহক অর্জন', 'লিড জেনারেশন', 'বিক্রি', 'অফার', 'Positioning', 'Marketing', 'বাস্তবায়ন', 'প্রবৃদ্ধির দিকনির্দেশ'],
    ['ক্লায়েন্ট অর্জন', 'Positioning', 'অফার', 'মূল্য নির্ধারণ', 'বিক্রি যোগাযোগ', 'Portfolio', 'ওয়ার্কফ্লো'],
    ['ক্যারিয়ারের দিকনির্দেশ', 'দক্ষতা উন্নয়ন', 'সাইড আয়ের দিকনির্দেশ', 'সময় ব্যবস্থাপনা', 'ক্যারিয়ার পরিবর্তন', 'ঝুঁকি', 'পদক্ষেপ পরিকল্পনা'],
    ['ব্যবসার ধারণা', 'গ্রাহকের সমস্যা', 'যাচাই', 'অফার', 'MVP', 'বাজারের দিকনির্দেশ', 'অগ্রাধিকার'],
  ],
}
const CAT_CTAS: Record<LangCode, string[]> = {
  en: [
    'Diagnose Business Problem →',
    'Diagnose Freelancing Problem →',
    'Diagnose Career Direction →',
    'Validate & Diagnose Idea →',
  ],
  bn: [
    'ব্যবসার সমস্যা নির্ণয় করুন →',
    'ফ্রিল্যান্সিং সমস্যা নির্ণয় করুন →',
    'ক্যারিয়ারের দিকনির্দেশ নির্ণয় করুন →',
    'ধারণা যাচাই ও নির্ণয় করুন →',
  ],
}

// SECTION 11: WHO THIS IS FOR — 8 items
const FOR_ITEMS: Record<LangCode, string[]> = {
  en: [
    'Serious Business Owners',
    'Freelancers',
    'Career Professionals',
    'Entrepreneurs',
    'Beginners with a serious Idea',
    'Stuck on a specific business/career decision',
    'Tried multiple times but lack clarity',
    'Willing to take Action',
  ],
  bn: [
    'সিরিয়াস ব্যবসায়ী',
    'ফ্রিল্যান্সার',
    'ক্যারিয়ার পেশাদার',
    'উদ্যোক্তা',
    'সিরিয়াস ধারণা নিয়ে নতুন',
    'নির্দিষ্ট ব্যবসা/ক্যারিয়ার সিদ্ধান্তে আটকে',
    'একাধিক চেষ্টা করেছেন কিন্তু স্পষ্টতা নেই',
    'পদক্ষেপ নিতে ইচ্ছুক',
  ],
}

// SECTION 12: WHO THIS IS NOT FOR — 7 items
const NOTFOR_ITEMS: Record<LangCode, string[]> = {
  en: [
    'Want guaranteed income',
    'Want overnight success',
    'Looking for a magic formula',
    'Just want motivation',
    'Want zero-effort success',
    'Want all Decisions made by someone else',
    'Want an unrealistic shortcut',
  ],
  bn: [
    'গ্যারান্টিযুক্ত আয় চান',
    'রাতারাতি সাফল্য চান',
    'জাদুকরী সূত্র খুঁজছেন',
    'শুধু অনুপ্রেরণা চান',
    'চেষ্টাহীন সাফল্য চান',
    'সব সিদ্ধান্ত অন্যকে দিয়ে করাতে চান',
    'অবাস্তব শর্টকাট চান',
  ],
}

// SECTION 13: WHAT YOU GET — 7 items (title / desc)
const GET_TITLES: Record<LangCode, string[]> = {
  en: ['Problem Clarity', 'Bottleneck Clarity', 'Priority Clarity', 'Decision Clarity', 'Action Direction', 'Implementation Direction', 'Review Structure'],
  bn: ['সমস্যার স্পষ্টতা', 'ব্যবধানের স্পষ্টতা', 'অগ্রাধিকারের স্পষ্টতা', 'সিদ্ধান্তের স্পষ্টতা', 'পদক্ষেপের দিকনির্দেশ', 'বাস্তবায়নের দিকনির্দেশ', 'পর্যালোচনা কাঠামো'],
}
const GET_DESCS: Record<LangCode, string[]> = {
  en: [
    'Which problem truly matters?',
    'Where is the biggest blockage?',
    'Which to solve first?',
    'Which option/decision is more logical?',
    'Next Best Action now?',
    'How to move forward?',
    'How to decide next step from results?',
  ],
  bn: [
    'কোন সমস্যাটি আসলেই গুরুত্বপূর্ণ?',
    'কোথায় সবচেয়ে বড় বাধা?',
    'কোনটি আগে সমাধান করা উচিত?',
    'কোন বিকল্প/সিদ্ধান্ত বেশি যুক্তিযুক্ত?',
    'এখন পরবর্তী সেরা পদক্ষেপ কী?',
    'কীভাবে এগোবেন?',
    'ফলাফল দেখে পরবর্তী সিদ্ধান্ত কীভাবে নেবেন?',
  ],
}

// SECTION 14: CONSULTING LEVELS — 3 items (title / purpose / use / focus / notGuarantee / cta)
const LEVELS_TITLES: Record<LangCode, string[]> = {
  en: ['Consulting Assessment', 'Strategic Consulting', 'Implementation Consulting'],
  bn: ['Consulting মূল্যায়ন', 'কৌশলগত Consulting', 'বাস্তবায়ন Consulting'],
}
const LEVELS_PURPOSES: Record<LangCode, string[]> = {
  en: ['Diagnosis', 'Strategy', 'Execution'],
  bn: ['নির্ণয়', 'কৌশল', 'বাস্তবায়ন'],
}
const LEVELS_USES: Record<LangCode, string[]> = {
  en: [
    'When the customer is unclear about their real problem',
    'When the problem is fairly clear but direction/strategy is missing',
    'When strategy exists but implementation needs structured support',
  ],
  bn: [
    'যখন গ্রাহক তার আসল সমস্যা সম্পর্কে অস্পষ্ট',
    'যখন সমস্যা বেশ পরিষ্কার কিন্তু দিকনির্দেশ/কৌশল নয়',
    'যখন কৌশল আছে কিন্তু বাস্তবায়নে কাঠামোগত সহায়তা দরকার',
  ],
}
const LEVELS_FOCUS: Record<LangCode, string[][]> = {
  en: [
    ['Current Situation', 'Desired Outcome', 'Problem', 'Gap', 'Bottleneck', 'Priority'],
    ['Diagnosis', 'Strategic Direction', 'Priority', 'Action Plan', 'Decision Support'],
    ['Strategy Implementation', 'Process', 'Execution', 'Review', 'Improvement'],
  ],
  bn: [
    ['বর্তমান অবস্থা', 'কাঙ্ক্ষিত ফলাফল', 'সমস্যা', 'ফাঁক', 'ব্যবধান', 'অগ্রাধিকার'],
    ['নির্ণয়', 'কৌশলগত দিকনির্দেশ', 'অগ্রাধিকার', 'পদক্ষেপ পরিকল্পনা', 'সিদ্ধান্ত সহায়তা'],
    ['কৌশল বাস্তবায়ন', 'প্রক্রিয়া', 'বাস্তবায়ন', 'পর্যালোচনা', 'উন্নতি'],
  ],
}
const LEVELS_NOTGUARANTEES: Record<LangCode, string[]> = {
  en: [
    'Not guaranteed income, revenue or specific result — only diagnosis and clarity.',
    'Not guaranteed business growth or outcome — only strategic direction and action plan.',
    'Not guaranteed result — structured execution support and review structure.',
  ],
  bn: [
    'গ্যারান্টিযুক্ত আয়, রাজস্ব বা নির্দিষ্ট ফলাফল নয়—শুধুমাত্র নির্ণয় ও স্পষ্টতা।',
    'গ্যারান্টিযুক্ত ব্যবসা প্রবৃদ্ধি বা ফলাফল নয়—শুধুমাত্র কৌশলগত দিকনির্দেশ ও পদক্ষেপ পরিকল্পনা।',
    'গ্যারান্টিযুক্ত ফলাফল নয়—কাঠামোগত বাস্তবায়ন সহায়তা ও পর্যালোচনা কাঠামো।',
  ],
}
const LEVELS_CTAS: Record<LangCode, string[]> = {
  en: ['Request Assessment', 'Request Strategic Consulting', 'Request Implementation Consulting'],
  bn: ['মূল্যায়নের অনুরোধ', 'কৌশলগত Consulting-এর অনুরোধ', 'বাস্তবায়ন Consulting-এর অনুরোধ'],
}

// SECTION 15: WHICH LEVEL — 4 items (q / a / desc / level)
const WHICH_QS: Record<LangCode, string[]> = {
  en: [
    '“I do not know what my real problem is.”',
    '“I know the problem, but the Strategy is unclear.”',
    '“I have a Strategy, but I am stuck in Execution.”',
    '“I am not sure which Level I need.”',
  ],
  bn: [
    '“আমি জানি না আমার আসল সমস্যা কী।”',
    '“সমস্যা জানি, কিন্তু কৌশল পরিষ্কার নয়।”',
    '“কৌশল আছে, কিন্তু বাস্তবায়নে আটকে আছি।”',
    '“আমি নিশ্চিত নই কোন লেভেল দরকার।”',
  ],
}
const WHICH_AS: Record<LangCode, string[]> = {
  en: ['Assessment', 'Strategic Consulting', 'Implementation Consulting', 'Not Sure → Assessment'],
  bn: ['মূল্যায়ন', 'কৌশলগত Consulting', 'বাস্তবায়ন Consulting', 'নিশ্চিত নই → মূল্যায়ন'],
}
const WHICH_DESCS: Record<LangCode, string[]> = {
  en: [
    'Need to diagnose Problem, Bottleneck and Priority first.',
    'Problem clear — need strategic direction and action plan.',
    'Strategy ready — need structured execution support.',
    'Apply with “Not Sure” — after Assessment we recommend the right path.',
  ],
  bn: [
    'আগে সমস্যা, ব্যবধান ও অগ্রাধিকার নির্ণয় করা দরকার।',
    'সমস্যা পরিষ্কার—এখন কৌশলগত দিকনির্দেশ ও পদক্ষেপ পরিকল্পনা দরকার।',
    'কৌশল প্রস্তুত—এখন কাঠামোগত বাস্তবায়ন সহায়তা দরকার।',
    '“Not Sure” সহ Apply করুন—মূল্যায়নের পর আমরা সঠিক পথ সুপারিশ করব।',
  ],
}
const WHICH_LEVELS: Record<LangCode, string[]> = {
  en: ['Level 1', 'Level 2', 'Level 3', 'Start Here'],
  bn: ['লেভেল ১', 'লেভেল ২', 'লেভেল ৩', 'এখান থেকে শুরু'],
}

// SECTION 16: HOW IT WORKS — 6 items (title / desc)
const HOW_TITLES: Record<LangCode, string[]> = {
  en: ['APPLY', 'ASSESSMENT', 'DIAGNOSIS', 'CONSULTING', 'IMPLEMENTATION', 'REVIEW'],
  bn: ['আবেদন', 'মূল্যায়ন', 'নির্ণয়', 'Consulting', 'বাস্তবায়ন', 'পর্যালোচনা'],
}
const HOW_DESCS: Record<LangCode, string[]> = {
  en: [
    'Share basic information about your situation.',
    'Your current state, desired outcome and problem will be understood.',
    'Gap and bottleneck will be identified.',
    'Structured discussion on Priority and Strategy.',
    'Implement the next action.',
    'Measure results, learning, and adjust next step. Strategy gives direction; review gives learning.',
  ],
  bn: [
    'আপনার অবস্থা সম্পর্কে মৌলিক তথ্য দিন।',
    'আপনার বর্তমান অবস্থা, কাঙ্ক্ষিত ফলাফল ও সমস্যা বোঝা হবে।',
    'ফাঁক ও ব্যবধান চিহ্নিত করা হবে।',
    'অগ্রাধিকার ও কৌশল নিয়ে কাঠামোগত আলোচনা হবে।',
    'পরবর্তী পদক্ষেপ বাস্তবায়ন করুন।',
    'ফলাফল পরিমাপ, শেখা ও পরবর্তী ধাপ সমন্বয় করুন। কৌশল দিকনির্দেশ দেয়; পর্যালোচনা শেখায়।',
  ],
}

// SECTION 17: DIAGNOSTIC QUESTIONS — 5 items (title / q)
const DIAG_TITLES: Record<LangCode, string[]> = {
  en: ['CURRENT STATE', 'DESIRED STATE', 'GAP', 'BOTTLENECK', 'NEXT BEST ACTION'],
  bn: ['বর্তমান অবস্থা', 'কাঙ্ক্ষিত অবস্থা', 'ফাঁক', 'ব্যবধান', 'পরবর্তী সেরা পদক্ষেপ'],
}
const DIAG_QS: Record<LangCode, string[]> = {
  en: [
    'Where are you right now?',
    'Where do you want to go?',
    'Where is the biggest gap on the path from current state to desired outcome?',
    'Among all problems, which is blocking your progress the most?',
    'Which action is most logical to take now?',
  ],
  bn: [
    'আপনি এখন কোথায় আছেন?',
    'আপনি কোথায় যেতে চান?',
    'বর্তমান অবস্থান থেকে কাঙ্ক্ষিত ফলাফলের পথে সবচেয়ে বড় ফাঁক কোথায়?',
    'সব সমস্যার মধ্যে কোনটি আপনার অগ্রগতি সবচেয়ে বেশি আটকে দিচ্ছে?',
    'এখন কোন পদক্ষেপ নেওয়া সবচেয়ে যৌক্তিক?',
  ],
}

// SECTION 18: AFTER APPLICATION — 5 items (s / t / d)
const AFTER_SS: Record<LangCode, string[]> = {
  en: ['Apply', 'Situation Reviewed', 'Consulting Need Identified', 'Path Determined', 'Session Begins'],
  bn: ['আবেদন', 'অবস্থা পর্যালোচিত', 'Consulting প্রয়োজন চিহ্নিত', 'পথ নির্ধারিত', 'সেশন শুরু'],
}
const AFTER_TS: Record<LangCode, string[]> = {
  en: [
    'Share basic information about your situation',
    'Your situation will be reviewed manually',
    'Which Consulting Level you need will be determined',
    'An appropriate consulting path will be determined',
    'Session / engagement will begin',
  ],
  bn: [
    'আপনার অবস্থা সম্পর্কে মৌলিক তথ্য দিন',
    'আপনার অবস্থা ম্যানুয়ালি পর্যালোচনা করা হবে',
    'আপনার কোন লেভেলের Consulting দরকার তা নির্ধারিত হবে',
    'উপযুক্ত Consulting পথ নির্ধারণ করা হবে',
    'সেশন / এনগেজমেন্ট শুরু হবে',
  ],
}
const AFTER_DS: Record<LangCode, string[]> = {
  en: [
    'Share your Category, Current Situation, Biggest Problem, Desired Outcome etc. in the Application form.',
    'No automated bot. We read your information to understand where you are stuck.',
    'Assessment / Strategic / Implementation — the right path for your situation.',
    'We contact you to determine the next step and required timing.',
    'Your Problem → Bottleneck → Priority → Action Direction become structured and clear.',
  ],
  bn: [
    'আবেদন ফর্মে আপনার ক্যাটাগরি, বর্তমান অবস্থা, সবচেয়ে বড় সমস্যা, কাঙ্ক্ষিত ফলাফল ইত্যাদি শেয়ার করুন।',
    'কোনো অটোমেটেড বট নয়। আপনার তথ্য পড়ে আমরা বুঝি আপনি কোথায় আটকে আছেন।',
    'মূল্যায়ন / কৌশলগত / বাস্তবায়ন—আপনার অবস্থা অনুযায়ী সঠিক পথ।',
    'আপনার সাথে যোগাযোগ করে পরবর্তী পদক্ষেপ ও প্রয়োজনীয় সময় নির্ধারণ করা হবে।',
    'আপনার সমস্যা → ব্যবধান → অগ্রাধিকার → পদক্ষেপের দিকনির্দেশ কাঠামোগতভাবে পরিষ্কার হবে।',
  ],
}

// SECTION 19: TRUST — 6 items (title / desc)
const TRUST_TITLES: Record<LangCode, string[]> = {
  en: ['Process', 'Transparency', 'Honesty', 'Expertise', 'Consistency', 'Proof'],
  bn: ['প্রক্রিয়া', 'স্বচ্ছতা', 'সততা', 'দক্ষতা', 'ধারাবাহিকতা', 'প্রমাণ'],
}
const TRUST_DESCS: Record<LangCode, string[]> = {
  en: [
    'A clear methodology and framework is followed',
    'No hidden promises — all expectations clear',
    'No promise of guaranteed result',
    'Founder + strategic frameworks + practical methodology',
    'Professional brand experience everywhere',
    'Only real proof — otherwise clearly labeled placeholder',
  ],
  bn: [
    'একটি স্পষ্ট পদ্ধতি ও কাঠামো অনুসরণ করা হয়',
    'কোনো লুকানো প্রতিশ্রুতি নয়—সব প্রত্যাশা পরিষ্কার',
    'কোনো গ্যারান্টিযুক্ত ফলাফলের প্রতিশ্রুতি নয়',
    'প্রতিষ্ঠাতা + কৌশলগত কাঠামো + ব্যবহারিক পদ্ধতি',
    'সব জায়গায় পেশাদার ব্র্যান্ড অভিজ্ঞতা',
    'শুধু আসল প্রমাণ—না থাকলে স্পষ্টভাবে চিহ্নিত প্লেসহোল্ডার',
  ],
}

// SECTION 21: WHY — 6 items (title / desc)
const WHY_TITLES: Record<LangCode, string[]> = {
  en: ['Diagnosis First', 'Customer-Centric', 'Structured', 'Action-Oriented', 'Multi-Domain Perspective', 'Honest'],
  bn: ['নির্ণয় প্রথম', 'গ্রাহককেন্দ্রিক', 'কাঠামোগত', 'কর্মমুখী', 'বহু-ডোমেইন দৃষ্টিভঙ্গি', 'সৎ'],
}
const WHY_DESCS: Record<LangCode, string[]> = {
  en: [
    'Understand Problem first, then prescribe solution',
    'Recommendations are based on your Situation',
    'Framework-based — not random advice',
    'Not just discussion — clear Next Action',
    'Business, Freelancing, Career, Entrepreneurship',
    'No unrealistic promise',
  ],
  bn: [
    'আগে সমস্যা বুঝি, তারপর সমাধান প্রস্তাব করি',
    'আপনার অবস্থা থেকে সুপারিশ নির্ধারিত হয়',
    'কাঠামো-ভিত্তিক—এলোমেলো পরামর্শ নয়',
    'শুধু আলোচনা নয়—পরবর্তী পদক্ষেপ পরিষ্কার',
    'ব্যবসা, ফ্রিল্যান্সিং, ক্যারিয়ার, উদ্যোক্তা',
    'কোনো অবাস্তব প্রতিশ্রুতি নয়',
  ],
}
// SECTION 21: WHY comparison lists (4 items × 2)
const WHY_RANDOM_ITEMS: Record<LangCode, string[]> = {
  en: [
    'Advice without understanding your Situation',
    'Generic formula',
    'Motivation-driven',
    'No Priority',
  ],
  bn: [
    'আপনার অবস্থা না বুঝেই পরামর্শ',
    'সাধারণ সূত্র',
    'অনুপ্রেরণা-চালিত',
    'কোনো অগ্রাধিকার নেই',
  ],
}
const WHY_STRUCTURED_ITEMS: Record<LangCode, string[]> = {
  en: [
    'Starts from your Situation',
    '7D Framework',
    'Action-driven',
    'Clear Priority',
  ],
  bn: [
    'আপনার অবস্থা থেকে শুরু',
    '7D কাঠামো',
    'কাজ-চালিত',
    'স্পষ্ট অগ্রাধিকার',
  ],
}

// SECTION 23: CONSULTING vs DFY — list items
const VSDFY_CONSULT_LS: Record<LangCode, string[]> = {
  en: ['Diagnose', 'Strategize', 'Prioritize', 'Recommend', 'Guide'],
  bn: ['নির্ণয়', 'কৌশল তৈরি', 'অগ্রাধিকার ঠিক করা', 'সুপারিশ', 'থপ্রদর্শন'],
}
const VSDFY_DFY_LS: Record<LangCode, string[]> = {
  en: ['Build', 'Deploy', 'Implement', 'Optimize'],
  bn: ['নির্মাণ', 'ডিপ্লয়', 'বাস্তবায়ন', 'অপ্টিমাইজ'],
}

// SECTION 24: FAQ — 10 items (q / a)
const FAQ_QS: Record<LangCode, string[]> = {
  en: [
    'Is Consulting like Coaching?',
    'Will all my problems be solved in one session?',
    'What if I do not know what my problem is?',
    'Does Consulting give guaranteed results?',
    'I am not a Business Owner — I am a Freelancer/Career Professional.',
    'Do I need a strategy before taking Consulting?',
    'What is the difference between Consulting and Training?',
    'What is the difference between Consulting and Done-for-You?',
    'What happens after I Apply?',
    'Where is the Price?',
  ],
  bn: [
    'Consulting কি Coaching-এর মতো?',
    'একটি সেশনে কি আমার সব সমস্যা সমাধান হবে?',
    'আমি জানি না আমার সমস্যা কী—তাহলে?',
    'Consulting কি গ্যারান্টিযুক্ত ফলাফল দেয়?',
    'আমি ব্যবসায়ী নই—আমি ফ্রিল্যান্সার/ক্যারিয়ার পেশাদার।',
    'Consulting নেওয়ার আগে কি আমার কৌশল থাকতে হবে?',
    'Consulting আর Training-এর পার্থক্য কী?',
    'Consulting আর Done-for-You-এর পার্থক্য কী?',
    'আবেদন করার পর কী হবে?',
    'মূল্য কোথায়?',
  ],
}
const FAQ_AS: Record<LangCode, string[]> = {
  en: [
    'Coaching usually focuses on long-term motivation and accountability. Consulting is structured diagnosis and strategic direction — where your Problem, Bottleneck and Priority are analyzed to determine Next Best Action. We do not attack coaching, but our work is not coaching.',
    'Not all problems will be solved at once. One session usually clarifies one major Problem or direction. Complex situations may require deep consulting or implementation consulting.',
    'This is exactly where Consulting Assessment is most useful. The purpose of the Assessment is to identify your real Problem and Bottleneck.',
    'No. Consulting is not a promise of guaranteed income, clients, business growth, employment or any specific financial result. It provides diagnosis, strategy and action direction; the outcome depends on your Action and Implementation.',
    'No problem. The NGS Consulting methodology applies across Business, Freelancing, Career and Entrepreneurship contexts. Consulting is provided across all 4 Categories.',
    'No. Diagnosis may come first depending on situation. Many people, while building strategy, realize the real Problem is unclear. Start with Assessment.',
    'Training teaches (What/How); Consulting analyzes your Situation and clarifies priority and direction (What should YOU solve first / Why is it blocking you / What should YOU do next). Training teaches. Consulting diagnoses and directs.',
    'Consulting is Diagnose / Strategize / Prioritize / Recommend / Guide. Done-for-You is Build / Deploy / Implement / Optimize. Consulting determines what should be built, then Done-for-You implements it.',
    '5 steps: 1) Apply → 2) Your situation is manually reviewed → 3) Consulting need is identified → 4) The right consulting path is determined → 5) Session/engagement begins. Contact is made in business hours — timing depends on application volume and complexity.',
    'Pricing is determined after Assessment. Each Level requires “Assessment Required”. No invented price.',
  ],
  bn: [
    'কোচিং সাধারণত দীর্ঘমেয়াদী অনুপ্রেরণা ও জবাবদিহিতায় ফোকাস করে। Consulting হলো কাঠামোগত নির্ণয় ও কৌশলগত দিকনির্দেশ—যেখানে আপনার সমস্যা, ব্যবধান ও অগ্রাধিকার বিশ্লেষণ করে পরবর্তী সেরা পদক্ষেপ নির্ধারণ করা হয়। কোচিং আক্রমণ করি না, কিন্তু আমাদের কাজ কোচিং নয়।',
    'সব সমস্যা একসাথে সমাধান হবে না। একটি সেশনে সাধারণত একটি বড় সমস্যা বা দিকনির্দেশ স্পষ্ট হয়। জটিল অবস্থায় গভীর Consulting বা বাস্তবায়ন Consulting প্রয়োজন হতে পারে।',
    'এটাই ঠিক সেই জায়গা যেখানে Consulting Assessment সবচেয়ে উপযোগী। Assessment-এর উদ্দেশ্যই হলো আপনার আসল সমস্যা ও ব্যবধান চিহ্নিত করা।',
    'না। Consulting কোনো গ্যারান্টিযুক্ত আয়, ক্লায়েন্ট, ব্যবসা প্রবৃদ্ধি, কর্মসংস্থান বা কোনো নির্দিষ্ট আর্থিক ফলাফলের প্রতিশ্রুতি নয়। এটি নির্ণয়, কৌশল ও পদক্ষেপের দিকনির্দেশ দেয়; ফলাফল আপনার পদক্ষেপ ও বাস্তবায়নের উপর নির্ভর করে।',
    'কোনো সমস্যা নয়। NGS Consulting-এর পদ্ধতি ব্যবসা, ফ্রিল্যান্সিং, ক্যারিয়ার ও উদ্যোক্তা—সব প্রেক্ষাপটে প্রযোজ্য। ৪টি ক্যাটাগরিতেই Consulting দেওয়া হয়।',
    'না। অবস্থা অনুযায়ী নির্ণয় আগে আসতে পারে। অনেকেই কৌশল তৈরি করতে গিয়ে বুঝতে পারেন যে আসল সমস্যাটাই পরিষ্কার নয়। Assessment দিয়ে শুরু করুন।',
    'Training শেখায় (কী/কীভাবে); Consulting আপনার অবস্থা বিশ্লেষণ করে অগ্রাধিকার ও দিকনির্দেশ পরিষ্কার করে (আপনার আগে কোন সমস্যাটি সমাধান করা উচিত / কেন এটি আপনাকে আটকে রেখেছে / আপনার পরবর্তী পদক্ষেপ কী)। Training শেখায়। Consulting নির্ণয় করে ও দিকনির্দেশ দেয়।',
    'Consulting হলো নির্ণয় / কৌশল তৈরি / অগ্রাধিকার ঠিক করা / সুপারিশ / পথপ্রদর্শন। Done-for-You হলো নির্মাণ / ডিপ্লয় / বাস্তবায়ন / অপ্টিমাইজ। Consulting নির্ধারণ করে কী নির্মাণ করা উচিত, তারপর Done-for-You তা বাস্তবায়িত করে।',
    '৫টি ধাপ: ১) Apply → ২) আপনার অবস্থা ম্যানুয়ালি পর্যালোচনা করা হয় → ৩) Consulting প্রয়োজন চিহ্নিত করা হয় → ৪) সঠিক Consulting পথ নির্ধারণ করা হয় → ৫) সেশন/এনগেজমেন্ট শুরু হয়। ব্যবসায়িক সময়ে যোগাযোগ করা হয়—সময়সীমা আবেদন পরিমাণ ও জটিলতার উপর নির্ভর করে।',
    'মূল্য Assessment-এর পরে নির্ধারিত হয়। প্রতিটি লেভেলের জন্য “Assessment Required”। কোনো বানানো মূল্য নেই।',
  ],
}

/* ---------------- Section header helper ---------------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'default',
}: {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: 'center' | 'left'
  tone?: 'default' | 'emerald'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <div
          className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            tone === 'emerald'
              ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
              : 'border-border/60 bg-muted/40 text-muted-foreground'
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>
      )}
    </div>
  )
}

/* ---------------- CTA buttons ---------------- */
function PrimaryCTA({
  href = '/consulting/apply',
  children,
  className = '',
}: {
  href?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.99] ${className}`}
    >
      {children}
    </Link>
  )
}

function SecondaryCTA({
  href = '#how-it-works',
  children,
}: {
  href?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
    >
      {children}
    </a>
  )
}

/* ============================================================
   MAIN CONSULTING CLIENT — 25 SECTIONS PER V3 MASTER SPEC
   All user-facing strings go through t() for EN/BN toggle.
   ============================================================ */
export function ConsultingClient() {
  usePageViewTracking('consulting_page_v3')
  const { t, lang } = useLang()

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex-1">

        {/* ============================================================
            SECTION 02: HERO
            ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-background to-background dark:from-emerald-950/25 dark:via-background dark:to-background">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                'linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-24 lg:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
              <Stethoscope className="h-3.5 w-3.5" />
              {t('consulting.badge')}
            </div>

            <h1 className="mt-6 max-w-4xl font-heading text-3xl font-extrabold leading-[1.18] tracking-tight sm:text-4xl lg:text-[3.1rem] lg:leading-[1.1]">
              {t('consulting.h1').split(t('consulting.h1Highlight'))[0]}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
                {t('consulting.h1Highlight')}
              </span>
            </h1>

            <p className="mt-4 text-base font-semibold text-foreground/90 sm:text-lg">
              {t('consulting.heroSub1')}
            </p>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {t('consulting.heroSub2')}{' '}
              <strong className="font-semibold text-foreground">{t('consulting.heroSub3')}</strong>{lang === 'bn' ? '।' : '.'}
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {t('consulting.heroBody')}
            </p>

            {/* Value clarity — what you are buying is Decision Clarity */}
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-4 text-center dark:bg-emerald-950/25">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                {t('consulting.heroGetLabel')}
              </p>
              <p className="mt-2 text-sm font-bold leading-relaxed text-foreground sm:text-base">
                {t('consulting.heroGetValue')}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {t('consulting.heroGetSub')}
              </p>
            </div>

            {/* Emotional message */}
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-4 text-center dark:bg-emerald-950/25">
              <p className="text-sm font-semibold leading-relaxed text-emerald-800 dark:text-emerald-200 sm:text-base">
                {t('consulting.heroEmotional')}
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <PrimaryCTA>{t('consulting.heroCtaPrimary')}</PrimaryCTA>
              <SecondaryCTA>{t('consulting.heroCtaSecondary')}</SecondaryCTA>
            </div>

            <p className="mt-4 text-xs font-medium text-muted-foreground">
              {t('consulting.heroMicrotrust')}
            </p>

            {/* Diagnostic pathway visual */}
            <div className="mx-auto mt-12 max-w-4xl">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:p-7">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {t('consulting.pathway')}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
                  {[
                    { icon: Map },
                    { icon: AlertTriangle },
                    { icon: GitBranch },
                    { icon: Flag },
                    { icon: Route },
                  ].map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-50/60 px-3 py-2 font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                        <step.icon className="h-3.5 w-3.5" />
                        {PATHWAY_LABELS[lang][i]}
                      </div>
                      {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-emerald-500/60" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 03: TRUST STRIP
            ============================================================ */}
        <section className="border-b border-border/60 bg-background">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: Stethoscope, key: 'consulting.trust.1' },
                { icon: Layers, key: 'consulting.trust.2' },
                { icon: Zap, key: 'consulting.trust.3' },
                { icon: Heart, key: 'consulting.trust.4' },
                { icon: ShieldCheck, key: 'consulting.trust.5' },
                { icon: X, key: 'consulting.trust.6' },
              ].map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-muted/20 px-3 py-3 text-center transition-colors hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/15"
                >
                  <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-foreground/80">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 04: PROBLEM RECOGNITION (7 scenarios)
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.prob.eyebrow')}
              title={
                <>
                  {t('consulting.prob.title1')}{' '}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {t('consulting.prob.titleHighlight')}
                  </span>
                </>
              }
              subtitle={t('consulting.prob.subtitle')}
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: GraduationCap },
                { icon: Lightbulb },
                { icon: Briefcase },
                { icon: Laptop },
                { icon: GraduationCap },
                { icon: Clock },
                { icon: Workflow },
              ].map((step, i) => {
                const Icon = step.icon
                const tag = PROB_TAGS[lang][i]
                const chain = PROB_CHAINS[lang][i]
                const q = PROB_QS[lang][i]
                return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                      {tag}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground">{chain}</p>
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2.5">
                    <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">{t('consulting.diagQLabel')}</span> {q}
                    </span>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 05: INFORMATION VS DIAGNOSIS
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.infovsdiag.eyebrow')}
              title={t('consulting.infovsdiag.title1')}
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {/* Information side */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-50/40 p-6 dark:bg-rose-950/15">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                    <FileSearch className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-rose-700 dark:text-rose-300">
                    {t('consulting.infovsdiag.infoTitle')}
                  </h3>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{t('consulting.infovsdiag.infoLine')}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t('consulting.infovsdiag.infoLine2')}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {INFO_ITEMS[lang].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <X className="h-4 w-4 shrink-0 text-rose-500" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <p className="mt-5 rounded-lg bg-rose-100/50 px-3 py-2 text-center text-xs font-bold text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
                  {t('consulting.infovsdiag.infoFooter')}
                </p>
              </div>

              {/* Diagnosis side */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-6 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <Stethoscope className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-emerald-700 dark:text-emerald-300">
                    {t('consulting.infovsdiag.diagTitle')}
                  </h3>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{t('consulting.infovsdiag.diagLine')}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t('consulting.infovsdiag.diagLine2')}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {DIAG_ITEMS[lang].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-lg bg-emerald-100/60 px-3 py-2 text-center text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                  {t('consulting.infovsdiag.diagFooter')}
                </p>
              </div>
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-base font-semibold italic text-foreground">
              {t('consulting.infovsdiag.quote')}
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 06: WHAT IS NGS CONSULTING?
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader eyebrow={t('consulting.what.eyebrow')} title={t('consulting.what.title')} />

            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-6 text-center dark:bg-emerald-950/15">
              <p className="text-base leading-relaxed text-foreground sm:text-lg">{t('consulting.what.def')}</p>
            </div>

            {/* Three NOTs */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { key: 'consulting.what.not1', descKey: 'consulting.what.not1d' },
                { key: 'consulting.what.not2', descKey: 'consulting.what.not2d' },
                { key: 'consulting.what.not3', descKey: 'consulting.what.not3d' },
              ].map(({ key, descKey }) => (
                <div
                  key={key}
                  className="rounded-xl border border-rose-500/30 bg-rose-50/30 p-4 text-center dark:bg-rose-950/10"
                >
                  <div className="flex items-center justify-center gap-2">
                    <X className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-bold text-rose-700 dark:text-rose-300">{t(key)}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{t(descKey)}</p>
                </div>
              ))}
            </div>

            {/* Equation */}
            <div className="mt-8 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 text-center dark:from-emerald-950/30 dark:to-emerald-950/10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                {t('consulting.what.instead')}
              </p>
              <p className="mt-3 font-heading text-base font-extrabold leading-relaxed text-foreground sm:text-xl">
                {t('consulting.what.equation')}{' '}
                <span className="text-emerald-700 dark:text-emerald-400">{t('consulting.flow.diag')}</span> +{' '}
                <span className="text-emerald-700 dark:text-emerald-400">{t('consulting.flow.strategy')}</span> +{' '}
                <span className="text-emerald-700 dark:text-emerald-400">{t('consulting.flow.priority')}</span> +{' '}
                <span className="text-emerald-700 dark:text-emerald-400">{t('consulting.flow.actionDirection')}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 07: CORE CONSULTING FRAMEWORK
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.framework.eyebrow')}
              title={t('consulting.framework.title')}
              subtitle={t('consulting.framework.subtitle')}
            />

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: '01', icon: Map },
                { n: '02', icon: Target },
                { n: '03', icon: AlertTriangle },
                { n: '04', icon: GitBranch },
                { n: '05', icon: Flag },
                { n: '06', icon: Route },
                { n: '07', icon: Wrench },
                { n: '08', icon: ClipboardCheck },
              ].map(({ n, icon: Icon }, i, arr) => (
                <div
                  key={n}
                  className="group relative rounded-2xl border border-border/60 bg-background p-5 transition-all hover:border-emerald-500/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                      {n}
                    </span>
                    <Icon className="h-5 w-5 text-emerald-600/70 dark:text-emerald-400/70" />
                  </div>
                  <h3 className="mt-3 text-xs font-extrabold uppercase tracking-wider text-foreground">{FRAMEWORK_TITLES[lang][i]}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{FRAMEWORK_DESCS[lang][i]}</p>
                  {i < arr.length - 1 && (
                    <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-emerald-500/40 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 08: NGS 7D DIAGNOSTIC ENGINE
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.engine.eyebrow')}
              title={t('consulting.engine.title')}
              subtitle={t('consulting.engine.subtitle')}
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { d: 'DISCOVER', icon: Search },
                { d: 'DEFINE', icon: Target },
                { d: 'DIAGNOSE', icon: Stethoscope },
                { d: 'DETECT', icon: AlertTriangle },
                { d: 'DECIDE', icon: Flag },
                { d: 'DESIGN', icon: Compass },
                { d: 'DEPLOY', icon: Rocket },
              ].map(({ d: step, icon: Icon }, i) => {
                const desc = ENGINE_7D_DESCS[lang][i]
                return (
                <div
                  key={step}
                  className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-50/30 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-emerald-950/15"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-base font-extrabold tracking-tight text-emerald-700 dark:text-emerald-300">
                      {step}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
                )
              })}
              {/* Empty cell explaining relationship */}
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 p-5 text-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t('consulting.engine.relationship')}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{t('consulting.engine.relCore')}</strong>
                    <br />
                    <strong className="text-foreground">{t('consulting.engine.relEngine')}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 09: CUSTOMER INTELLIGENCE MODEL
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.cim.eyebrow')}
              title={t('consulting.cim.title')}
              subtitle={t('consulting.cim.subtitle')}
            />

            {/* 5-layer model */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { icon: Eye, tone: 'muted' },
                { icon: AlertTriangle, tone: 'amber' },
                { icon: FileSearch, tone: 'rose' },
                { icon: GitBranch, tone: 'emerald' },
                { icon: Target, tone: 'emerald' },
              ].map((item, i) => {
                const label = CIM_LAYER_LABELS[lang][i]
                const desc = CIM_LAYER_DESCS[lang][i]
                const tone = item.tone
                const Icon = item.icon
                const toneClass =
                  tone === 'emerald'
                    ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : tone === 'amber'
                      ? 'border-amber-500/40 bg-amber-50/40 dark:bg-amber-950/15'
                      : tone === 'rose'
                        ? 'border-rose-500/40 bg-rose-50/40 dark:bg-rose-950/15'
                        : 'border-border/60 bg-background'
                const iconClass =
                  tone === 'emerald'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : tone === 'amber'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                      : tone === 'rose'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                        : 'bg-muted text-muted-foreground'
                return (
                  <div key={i} className={`rounded-2xl border p-4 ${toneClass}`}>
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">{label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Worked example */}
            <div className="mt-10 rounded-2xl border border-border/60 bg-background p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                {t('consulting.cim.example')}
              </p>
              <p className="mt-3 text-lg font-bold italic text-foreground">{t('consulting.cim.quote')}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { l: CIM_EXAMPLE_LS[lang][0], v: CIM_EXAMPLE_VS[lang][0] },
                  { l: CIM_EXAMPLE_LS[lang][1], v: CIM_EXAMPLE_VS[lang][1] },
                  { l: CIM_EXAMPLE_LS[lang][2], v: CIM_EXAMPLE_VS[lang][2] },
                  { l: CIM_EXAMPLE_LS[lang][3], v: CIM_EXAMPLE_VS[lang][3] },
                  { l: CIM_EXAMPLE_LS[lang][4], v: CIM_EXAMPLE_VS[lang][4] },
                ].map((row, i, arr) => (
                  <div
                    key={i}
                    className={`rounded-lg border px-3 py-2.5 ${
                      i === arr.length - 1
                        ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-border/60 bg-muted/30'
                    }`}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{row.l}</p>
                    <p className="mt-1 text-xs font-medium text-foreground">{row.v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-sm font-semibold italic text-emerald-700 dark:text-emerald-300">
                {t('consulting.cim.flow')}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 10: CONSULTING CATEGORIES (problem-oriented with own CTAs)
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.cat.eyebrow')}
              title={t('consulting.cat.title')}
              subtitle={t('consulting.cat.subtitle')}
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {[
                { icon: Briefcase, cat: 'business' },
                { icon: Laptop, cat: 'freelancer' },
                { icon: GraduationCap, cat: 'career' },
                { icon: Lightbulb, cat: 'entrepreneurship' },
              ].map((item, i) => {
                const Icon = item.icon
                const cat = item.cat
                const title = CAT_TITLES[lang][i]
                const subtitle = CAT_SUBTITLES[lang][i]
                const areas = CAT_AREAS[lang][i]
                const cta = CAT_CTAS[lang][i]
                return (
                <div
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg sm:p-7"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold leading-tight text-foreground">{title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                      {t('consulting.cat.problems')}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {areas.map((a) => (
                        <span
                          key={a}
                          className="rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-[11px] font-medium text-foreground/80"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50/40 px-3 py-2 dark:bg-emerald-950/15">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">{t('consulting.flow.problem')}</span>
                    <ArrowRight className="h-3 w-3 text-emerald-500/60" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">{t('consulting.flow.diag')}</span>
                    <ArrowRight className="h-3 w-3 text-emerald-500/60" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">{t('consulting.flow.direction')}</span>
                  </div>
                  <Link
                    href={`/consulting/apply?category=${cat}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-50/30 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100/50 hover:shadow-md dark:bg-emerald-950/20 dark:text-emerald-300"
                  >
                    {cta}
                  </Link>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 11: WHO THIS IS FOR
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.for.eyebrow')}
              title={
                <>
                  {t('consulting.for.title')} <span className="text-emerald-600 dark:text-emerald-400">...</span>
                </>
              }
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {FOR_ITEMS[lang].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/30 p-4 dark:bg-emerald-950/10"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base font-semibold italic text-foreground">
              {t('consulting.for.quote')}
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 12: WHO THIS IS NOT FOR
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.notfor.eyebrow')}
              tone="emerald"
              title={
                <>
                  {t('consulting.notfor.title')} <span className="text-rose-600 dark:text-rose-400">...</span>
                </>
              }
              subtitle={t('consulting.notfor.subtitle')}
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {NOTFOR_ITEMS[lang].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-50/30 p-4 dark:bg-rose-950/10"
                >
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 13: WHAT YOU GET
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.get.eyebrow')}
              title={t('consulting.get.title')}
              subtitle={t('consulting.get.subtitle')}
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Eye },
                { icon: GitBranch },
                { icon: Flag },
                { icon: Compass },
                { icon: Zap },
                { icon: Route },
                { icon: ClipboardCheck },
              ].map((item, i) => {
                const Icon = item.icon
                const tt = GET_TITLES[lang][i]
                const d = GET_DESCS[lang][i]
                return (
                <div
                  key={i}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold text-foreground">{tt}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            MID CTA
            ============================================================ */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold text-muted-foreground sm:text-base">{t('consulting.midcta.q')}</p>
            <div className="mt-4">
              <PrimaryCTA>{t('consulting.heroCtaPrimary')}</PrimaryCTA>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 14: CONSULTING LEVELS
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.levels.eyebrow')}
              title={t('consulting.levels.title')}
              subtitle={t('consulting.levels.subtitle')}
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                { lv: '1', featured: true },
                { lv: '2', featured: false },
                { lv: '3', featured: false },
              ].map((item, i) => {
                const lv = item.lv
                const featured = item.featured
                const title = LEVELS_TITLES[lang][i]
                const purpose = LEVELS_PURPOSES[lang][i]
                const use = LEVELS_USES[lang][i]
                const focus = LEVELS_FOCUS[lang][i]
                const notGuarantee = LEVELS_NOTGUARANTEES[lang][i]
                const cta = LEVELS_CTAS[lang][i]
                return (
                <div
                  key={lv}
                  className={`relative overflow-hidden rounded-2xl border-2 p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${
                    featured
                      ? 'border-emerald-500/50 bg-background shadow-lg shadow-emerald-600/5'
                      : 'border-border/60 bg-background/60'
                  }`}
                >
                  {featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {t('consulting.levels.startHere')}
                    </span>
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                    {t('consulting.levels.levelLabel')} {lv}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-extrabold text-foreground">{title}</h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50/60 px-2 py-0.5 dark:bg-emerald-950/30">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                      {t('consulting.levels.purposePrefix')} {purpose}
                    </span>
                  </div>
                  <p className="mt-3 text-xs italic text-muted-foreground">{use}</p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('consulting.levels.focusAreas')}</p>
                  <ul className="mt-2 space-y-1.5">
                    {focus.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-md border border-rose-500/20 bg-rose-50/30 px-3 py-2 dark:bg-rose-950/10">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {t('consulting.levels.notGuarantee')}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{notGuarantee}</p>
                  </div>
                  <p className="mt-3 rounded-md bg-muted/50 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {t('consulting.levels.assessmentRequired')}
                  </p>
                  <Link
                    href="/consulting/apply"
                    className={`mt-3 block rounded-xl px-4 py-2.5 text-center text-sm font-bold transition-all ${
                      featured
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'border border-emerald-500/40 bg-emerald-50/30 text-emerald-700 hover:bg-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-300'
                    }`}
                  >
                    {cta} →
                  </Link>
                </div>
                )
              })}
            </div>
            <p className="mt-6 text-center text-xs italic text-muted-foreground">{t('consulting.levels.noprice')}</p>
          </div>
        </section>

        {/* ============================================================
            SECTION 15: WHICH LEVEL IS RIGHT FOR YOU?
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.which.eyebrow')}
              title={t('consulting.which.title')}
              subtitle={t('consulting.which.subtitle')}
            />
            <div className="mt-10 space-y-3">
              {[
                { cat: 'diagnosis' },
                { cat: 'strategy' },
                { cat: 'implementation' },
                { cat: 'not_sure' },
              ].map((item, i) => {
                const cat = item.cat
                const q = WHICH_QS[lang][i]
                const a = WHICH_AS[lang][i]
                const desc = WHICH_DESCS[lang][i]
                const level = WHICH_LEVELS[lang][i]
                return (
                <div
                  key={i}
                  className="group grid items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-emerald-500/40 hover:shadow-md sm:grid-cols-[1fr_auto_1fr]"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{q}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 rotate-90 text-emerald-500/60 sm:rotate-0" />
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{level}</p>
                      <p className="font-heading text-base font-extrabold text-foreground">{a}</p>
                    </div>
                    <Link
                      href={`/consulting/apply?need=${cat}`}
                      className="shrink-0 rounded-lg border border-emerald-500/40 bg-emerald-50/30 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-300"
                    >
                      {t('consulting.apply.link')} →
                    </Link>
                  </div>
                </div>
                )
              })}
            </div>
            <p className="mt-6 text-center text-xs italic text-muted-foreground">{t('consulting.which.notSure')}</p>
          </div>
        </section>

        {/* ============================================================
            SECTION 16: HOW CONSULTING WORKS
            ============================================================ */}
        <section id="how-it-works" className="scroll-mt-20 border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader eyebrow={t('consulting.how.eyebrow')} title={t('consulting.how.title')} />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: '01', icon: Stethoscope },
                { n: '02', icon: ClipboardCheck },
                { n: '03', icon: AlertTriangle },
                { n: '04', icon: Layers },
                { n: '05', icon: Rocket },
                { n: '06', icon: ClipboardCheck },
              ].map(({ n, icon: Icon }, i, arr) => {
                const tt = HOW_TITLES[lang][i]
                const d = HOW_DESCS[lang][i]
                return (
                <div
                  key={n}
                  className="group relative rounded-2xl border border-border/60 bg-background p-5 transition-all hover:border-emerald-500/40 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-600/20">
                    {n}
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-extrabold uppercase tracking-wider text-foreground">{tt}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
                  {i < arr.length - 1 && (
                    <ArrowDown className="absolute -bottom-3 left-1/2 h-3 w-3 -translate-x-1/2 text-emerald-500/40 sm:hidden" />
                  )}
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 17: DIAGNOSTIC QUESTIONS
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.diag.eyebrow')}
              title={t('consulting.diag.title')}
              subtitle={t('consulting.diag.subtitle')}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: '01', icon: Map },
                { n: '02', icon: Target },
                { n: '03', icon: AlertTriangle },
                { n: '04', icon: GitBranch },
                { n: '05', icon: Zap },
              ].map((item, i) => {
                const n = item.n
                const Icon = item.icon
                const tt = DIAG_TITLES[lang][i]
                const q = DIAG_QS[lang][i]
                return (
                <div
                  key={n}
                  className={`group rounded-2xl border-2 p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    i === 4
                      ? 'border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/20 sm:col-span-2 lg:col-span-1'
                      : 'border-border/60 bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-extrabold text-emerald-600/30 dark:text-emerald-400/30">{n}</span>
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="mt-2 text-xs font-bold uppercase tracking-wider text-foreground">{tt}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">{q}</p>
                </div>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <PrimaryCTA>{t('consulting.heroCtaPrimary')}</PrimaryCTA>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 18: WHAT HAPPENS AFTER APPLICATION?
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.after.eyebrow')}
              title={t('consulting.after.title')}
              subtitle={t('consulting.after.subtitle')}
            />
            <div className="mt-10">
              <ol className="relative space-y-5 border-l-2 border-emerald-500/30 pl-6">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const s = AFTER_SS[lang][idx]
                  const tt = AFTER_TS[lang][idx]
                  const d = AFTER_DS[lang][idx]
                  const i = idx
                  return (
                  <li key={i} className="relative">
                    <span className="absolute -left-[1.95rem] flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white ring-4 ring-background">
                      {i + 1}
                    </span>
                    <div className="rounded-2xl border border-border/60 bg-background p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                        {t('consulting.after.stepLabel')} {i + 1} · {s}
                      </p>
                      <h3 className="mt-1 font-heading text-base font-bold text-foreground">{tt}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
                    </div>
                  </li>
                  )
                })}
              </ol>
            </div>
            <p className="mt-6 text-center text-xs italic text-muted-foreground">{t('consulting.after.note')}</p>
          </div>
        </section>

        {/* ============================================================
            SECTION 19: TRUST / CREDIBILITY
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.trust.eyebrow')}
              title={t('consulting.trust.title')}
              subtitle={t('consulting.trust.subtitle')}
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Workflow },
                { icon: Eye },
                { icon: ShieldCheck },
                { icon: Brain },
                { icon: Repeat },
                { icon: CheckCircle2 },
              ].map((item, i) => {
                const Icon = item.icon
                const tt = TRUST_TITLES[lang][i]
                const d = TRUST_DESCS[lang][i]
                return (
                <div
                  key={i}
                  className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-emerald-500/40 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold text-foreground">{tt}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 20: FOUNDER / GUIDE
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader eyebrow={t('consulting.founder.eyebrow')} title={t('consulting.founder.title')} tone="emerald" />
            <div className="mt-10 grid items-center gap-8 md:grid-cols-[auto_1fr]">
              <div className="mx-auto max-w-[280px]">
                <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
                  <Image
                    src="/founder.png"
                    alt="MD Nazmul Islam Taj — Founder, NextGen Digital Studio"
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                  {t('consulting.founder.badge')}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">MD Nazmul Islam Taj</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t('consulting.founder.roles')}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('consulting.founder.bio')}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('consulting.founder.beliefPrefix')}<strong className="font-semibold text-foreground">{t('consulting.founder.belief')}</strong>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('consulting.founder.focusLabel')}{' '}
                  <span className="text-foreground">
                    {t('consulting.founder.focus')}
                  </span>
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/50 px-4 py-1.5 dark:bg-emerald-950/20">
                  <Hand className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{t('consulting.founder.tagline')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 21: WHY NGS CONSULTING
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader eyebrow={t('consulting.why.eyebrow')} title={t('consulting.why.title')} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Stethoscope },
                { icon: Heart },
                { icon: Layers },
                { icon: Zap },
                { icon: Brain },
                { icon: ShieldCheck },
              ].map((item, i) => {
                const Icon = item.icon
                const tt = WHY_TITLES[lang][i]
                const d = WHY_DESCS[lang][i]
                return (
                <div
                  key={i}
                  className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-emerald-500/40 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold text-foreground">{tt}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
                )
              })}
            </div>

            {/* Comparison */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-500/30 bg-rose-50/30 p-5 dark:bg-rose-950/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600">{t('consulting.why.randomAdvice')}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {WHY_RANDOM_ITEMS[lang].map((item) => (
                    <li key={item} className="flex items-center gap-2"><X className="h-4 w-4 text-rose-500" /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">{t('consulting.why.structuredDiag')}</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {WHY_STRUCTURED_ITEMS[lang].map((item) => (
                    <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 22: CONSULTING VS TRAINING
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader eyebrow={t('consulting.vstraining.eyebrow')} title={t('consulting.vstraining.title')} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-50/30 p-6 dark:bg-amber-950/15">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-amber-700 dark:text-amber-300">{t('consulting.vs.trainTitle')}</h3>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{t('consulting.vs.trainTagline')}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t('consulting.vs.trainLabel')}</p>
                <p className="mt-2 rounded-lg bg-background/60 px-3 py-2 text-center font-mono text-sm font-bold text-foreground">
                  {t('consulting.vs.trainQuestion')}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{t('consulting.vs.trainSub')}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-6 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-emerald-700 dark:text-emerald-300">{t('consulting.vs.consultTitle')}</h3>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{t('consulting.vs.consultTagline')}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t('consulting.vs.consultLabel')}</p>
                <p className="mt-2 rounded-lg bg-background/60 px-3 py-2 text-center font-mono text-xs font-bold text-foreground">
                  {t('consulting.vs.consultQuestion')}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{t('consulting.vs.consultSub')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 23: CONSULTING VS DONE-FOR-YOU
            ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow={t('consulting.vsdfy.eyebrow')}
              title={t('consulting.vsdfy.title')}
              subtitle={t('consulting.vsdfy.subtitle')}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-6 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-emerald-700 dark:text-emerald-300">{t('consulting.vs.consultTitle')}</h3>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{t('consulting.vsdfy.consultPrefix')}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    { icon: FileSearch },
                    { icon: Compass },
                    { icon: Flag },
                    { icon: ClipboardCheck },
                    { icon: Hand },
                  ].map((item, i) => {
                    const Ic = item.icon
                    const l = VSDFY_CONSULT_LS[lang][i]
                    return (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Ic className="h-4 w-4 text-emerald-600" />
                      {l}
                    </li>
                    )
                  })}
                </ul>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground/80">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground">{t('consulting.vsdfy.dfyTitle')}</h3>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{t('consulting.vsdfy.dfyLabel')}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    { icon: Wrench },
                    { icon: Rocket },
                    { icon: Settings },
                    { icon: Activity },
                  ].map((item, i) => {
                    const Ic = item.icon
                    const l = VSDFY_DFY_LS[lang][i]
                    return (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Ic className="h-4 w-4 text-foreground/60" />
                      {l}
                    </li>
                    )
                  })}
                </ul>
                <p className="mt-3 rounded-md bg-muted/40 px-3 py-2 text-[11px] italic text-muted-foreground">
                  {t('consulting.vsdfy.note')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 24: FAQ / OBJECTIONS (10 Qs)
            ============================================================ */}
        <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionHeader eyebrow={t('consulting.faq.eyebrow')} title={t('consulting.faq.title')} />
            <div className="mt-10 space-y-3">
              {FAQ_QS[lang].map((q, i) => (
                <FAQItem key={i} q={q} a={FAQ_AS[lang][i]} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 25a: PRIMARY CTA BAND
            ============================================================ */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800" />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              {t('consulting.primaryCta.title1')}
              <br />
              {t('consulting.primaryCta.title2')} <span className="text-yellow-300"></span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              {t('consulting.primaryCta.subtitle')}
            </p>
            <p className="mt-3 text-xs font-medium text-white/70">{t('consulting.primaryCta.microtrust')}</p>
            <div className="mt-8">
              <Link
                href="/consulting/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-extrabold text-emerald-700 shadow-2xl shadow-emerald-900/30 transition-all hover:scale-[1.03] hover:bg-yellow-50"
              >
                {t('consulting.heroCtaPrimary')}
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 25b: FINAL CTA BAND
            ============================================================ */}
        <section className="relative overflow-hidden border-t border-border/60 bg-gradient-to-b from-background to-emerald-50/40 py-16 sm:py-20 lg:py-24 dark:to-emerald-950/15">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" /> {t('consulting.finalCta.badge')}
            </div>
            <h2 className="mt-5 font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.3rem] lg:leading-[1.15]">
              {t('consulting.finalCta.title1')}
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
                {t('consulting.finalCta.title2')}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('consulting.finalCta.subtitle')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/consulting/apply"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] hover:bg-emerald-700"
              >
                {t('consulting.finalCta.ctaPrimary')}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                {t('consulting.finalCta.ctaSecondary')}
              </Link>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              {t('consulting.finalCta.tagline')}
            </p>
            <p className="mt-2 text-xs italic text-muted-foreground">{t('consulting.finalCta.quote')}</p>
          </div>
        </section>

      </main>
      <SiteFooter variant="consulting" />
      <FloatingButtons />
    </div>
  )
}

/* ---------------- FAQ Item ---------------- */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background transition-colors hover:border-emerald-500/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180 text-emerald-600' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-border/60 px-4 py-3">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      )}
    </div>
  )
}
