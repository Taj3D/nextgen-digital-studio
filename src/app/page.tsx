'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, FormEvent, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Bot,
  User,
  Calendar,
  Award,
  Globe,
  Check,
  Star,
  ChevronRight,
  Target,
  Menu,
  ArrowUp,
  Shield,
  FileText,
  RotateCcw,
  ChevronDown,
  Crown,
  Clock,
  Sparkles,
  Cpu,
  Mic,
  MicOff,
  ThumbsUp,
  ThumbsDown,
  Share2,
  History,
  Copy,
  Trash2,
  Sun,
  Moon,
  ZoomIn,
  ChevronLeft,
  Quote,
  ImageIcon
} from 'lucide-react';

// Pricing packages - Multilingual
const pricingPackagesData = {
  bn: [
    {
      name: 'সিলভার',
      icon: '🥈',
      price: '৪,৯৯৯',
      features: ['১টি প্রোমো ভিডিও', 'বেসিক চ্যাটবট', 'ফেসবুক পেজ অডিট', '৩ দিনে ডেলিভারি'],
      popular: false,
      cta: 'এখনই শুরু করুন'
    },
    {
      name: 'গোল্ড',
      icon: '🥇',
      price: '১৪,৯৯৯',
      features: ['১টি ল্যান্ডিং পেজ', '৩টি প্রিমিয়াম ভিডিও', 'ফুল AI অর্ডার সিস্টেম', '১ বছর ফ্রি হোস্টিং', '৫ দিনে ডেলিভারি'],
      popular: true,
      cta: 'এখনই শুরু করুন',
      popularBadge: 'সেরা বিক্রিত'
    },
    {
      name: 'প্লাটিনাম',
      icon: '💎',
      price: '২৫,০০০+',
      features: ['ফুল ওয়েবসাইট/অ্যাপ', 'AI ইন্টিগ্রেশন', 'পেমেন্ট গেটওয়ে', '৬ মাস ফ্রি মেইনটেন্যান্স', 'প্রায়োরিটি সাপোর্ট'],
      popular: false,
      cta: 'এখনই শুরু করুন'
    }
  ],
  en: [
    {
      name: 'Silver',
      icon: '🥈',
      price: '4,999',
      features: ['1 Promo Video', 'Basic Chatbot', 'Facebook Page Audit', '3 Days Delivery'],
      popular: false,
      cta: 'Start Now'
    },
    {
      name: 'Gold',
      icon: '🥇',
      price: '14,999',
      features: ['1 Landing Page', '3 Premium Videos', 'Full AI Order System', '1 Year Free Hosting', '5 Days Delivery'],
      popular: true,
      cta: 'Start Now',
      popularBadge: 'Best Seller'
    },
    {
      name: 'Platinum',
      icon: '💎',
      price: '25,000+',
      features: ['Full Website/App', 'AI Integration', 'Payment Gateway', '6 Months Free Maintenance', 'Priority Support'],
      popular: false,
      cta: 'Start Now'
    }
  ]
};

// Timeline data - Multilingual
const timelineData = {
  bn: [
    { year: '২০১০', title: 'ডিজিটাল যাত্রা শুরু', desc: 'যশোরে প্রথম ডিজিটাল সার্ভিস', icon: Clock },
    { year: '২০১২', title: 'প্রথম স্টুডিও', desc: 'NextGen Digital প্রতিষ্ঠা', icon: Award },
    { year: '২০১৪', title: 'সিএনসি এক্সপার্ট', desc: '৩ডি সিএনসি সার্ভিস শুরু', icon: Target },
    { year: '২০১৮', title: 'আন্তর্জাতিক', desc: '৫০+ দেশে সেবা প্রসার', icon: Globe },
    { year: '২০২০', title: '৭,৫০০+ ক্লায়েন্ট', desc: 'সন্তুষ্ট ক্লায়েন্ট মাইলফলক', icon: Award },
    { year: '২০২৪', title: 'AI যুগ', desc: 'এআই সার্ভিস সংযোজন', icon: Sparkles },
    { year: '২০২৫', title: 'নতুন যাত্রা', desc: 'ওয়েবসাইট ও অ্যাপ সার্ভিস সম্প্রসারণ', icon: Cpu }
  ],
  en: [
    { year: '2010', title: 'Digital Journey Begins', desc: 'First digital service in Jessore', icon: Clock },
    { year: '2012', title: 'First Studio', desc: 'NextGen Digital established', icon: Award },
    { year: '2014', title: 'CNC Expert', desc: '3D CNC service started', icon: Target },
    { year: '2018', title: 'International', desc: 'Services expanded to 50+ countries', icon: Globe },
    { year: '2020', title: '7,500+ Clients', desc: 'Satisfied clients milestone', icon: Award },
    { year: '2024', title: 'AI Era', desc: 'AI services added', icon: Sparkles },
    { year: '2025', title: 'New Journey', desc: 'Website & App services expansion', icon: Cpu }
  ]
};

// Social Links
const socialLinks = {
  facebook: 'https://www.facebook.com/mdnajmulislam.taj.33',
  facebookPage1: 'https://www.facebook.com/mdnajmulislam.taj.33',
  portfolio: 'https://www.facebook.com/mdnajmulislam.taj.33',
  whatsapp: 'https://wa.me/8801711731354',
  phone: '+8801711731354',
  email: 'concept11art@gmail.com',
  address: 'পুরাতন কসবা, ঘোষপাড়া, যশোর সদর'
};

// Translations
const translations = {
  bn: {
    nav: {
      services: 'সার্ভিস',
      pricing: 'প্যাকেজ',
      about: 'সম্পর্কে',
      contact: 'যোগাযোগ',
      portfolio: 'পোর্টফোলিও',
      faq: 'FAQ'
    },
    hero: {
      greeting: 'আসসালামু আলাইকুম 👋',
      title: 'আমি ডিজিটাল ইঞ্জিনিয়ার',
      name: 'তাজ ভাই',
      typingTexts: ['১৭+ বছর অভিজ্ঞতা', '৭,৫০০+ সন্তুষ্ট ক্লায়েন্ট', 'যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার', '৫০+ দেশে সেবা'],
      cta1: 'আপনার প্রজেক্ট শুরু করুন',
      cta2: 'WhatsApp এ কথা বলুন',
      stats: {
        experience: 'বছর অভিজ্ঞতা',
        clients: 'সন্তুষ্ট ক্লায়েন্ট',
        countries: 'দেশে সেবা'
      }
    },
    about: {
      badge: 'যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার',
      name: 'মোঃ নাজমুল ইসলাম',
      title: 'সিনিয়র ডিজিটাল ইঞ্জিনিয়ার | CNC স্পেশালিস্ট | AI ইন্টিগ্রেটর',
      timeline_title: '🏆 যাত্রার মাইলফলক',
      cta1: 'যোগাযোগ করুন',
      cta2: 'সার্ভিস দেখুন'
    },
    services: {
      badge: 'আমাদের সার্ভিস',
      title: 'প্রফেশনাল',
      titleHighlight: 'ডিজিটাল সেবা',
      subtitle: 'ইঞ্জিনিয়ারিং প্রিসিশনে ৮টি ক্যাটাগরিতে ২৫+ ডিজিটাল সার্ভিস। ১৭+ বছরের অভিজ্ঞতায় আধুনিক প্রযুক্তি ব্যবহার করে সেরা সেবা।',
      cta: 'ফ্রি কনসালটেশন নিন'
    },
    portfolio: {
      badge: 'আমাদের কাজ',
      title: 'পোর্টফোলিও',
      titleHighlight: 'গ্যালারি',
      subtitle: '৮টি ক্যাটাগরিতে ৭,৫০০+ সফল প্রজেক্টের নমুনা',
      viewMore: 'আরও দেখুন ফেসবুকে'
    },
    whyUs: {
      badge: 'কেন আমরা?',
      title: 'কেন',
      titleHighlight: 'NextGen',
      titleEnd: 'বেছে নেবেন?',
      subtitle: 'যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার হিসেবে আমরা প্রতিটি প্রজেক্টে সেরা মান নিশ্চিত করি'
    },
    testimonials: {
      badge: 'ক্লায়েন্ট রিভিউ',
      title: 'ক্লায়েন্টরা',
      titleHighlight: 'কী বলেন?',
      subtitle: '৭,৫০০+ সন্তুষ্ট ক্লায়েন্টের মতামত'
    },
    faq: {
      badge: 'সাধারণ প্রশ্ন',
      title: 'প্রায়শই জিজ্ঞাসিত',
      titleHighlight: 'প্রশ্ন',
      stillQuestions: 'এখনও প্রশ্ন আছে? সরাসরি জিজ্ঞেস করুন!',
      askWhatsApp: 'WhatsApp এ প্রশ্ন করুন'
    },
    pricing: {
      badge: 'প্রাইসিং',
      title: 'আপনার বাজেটে',
      titleHighlight: 'সেরা প্যাকেজ',
      subtitle: 'সব প্যাকেজে ফ্রি কনসালটেশন এবং আফটার সেলস সাপোর্ট'
    },
    contact: {
      badge: 'যোগাযোগ',
      title: 'ইঞ্জিনিয়ার',
      titleHighlight: 'তাজ ভাই',
      titleEnd: 'এর সাথে কথা বলুন',
      subtitle: 'আমি নিজেই ক্লায়েন্টদের সাথে কথা বলি। ১৭+ বছরের অভিজ্ঞতা নিয়ে আপনার ব্যবসার ডিজিটাল রূপান্তরে সরাসরি গাইড করি।',
      responseTime: 'রেসপন্স টাইম: ৫ মিনিট',
      responseNote: 'WhatsApp এ তাৎক্ষণিক রিপ্লাই',
      phone: 'ফোন',
      email_label: 'ইমেইল',
      office: 'অফিস',
      serviceArea: 'সেবা এলাকা',
      serviceAreaValue: 'সারা বাংলাদেশ ও ৫০+ দেশে অনলাইন সেবা',
      form: {
        title: 'ফ্রি কনসালটেশন',
        name: 'আপনার নাম',
        mobile: 'মোবাইল নম্বর',
        email: 'ইমেইল (ঐচ্ছিক)',
        service: 'সার্ভিস নির্বাচন করুন',
        selectService: 'সার্ভিস নির্বাচন করুন',
        message: 'আপনার মেসেজ',
        submit: 'পাঠান',
        success: 'আপনার অনুরোধ সফলভাবে জমা হয়েছে!',
        successNote: 'আমরা শীঘ্রই যোগাযোগ করব।'
      }
    },
    footer: {
      description: 'যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) এর ডিজিটাল স্টুডিও। ১৭+ বছরের অভিজ্ঞতায় আধুনিক ডিজিটাল সেবা।',
      quickLinks: 'দ্রুত লিংক',
      policies: 'পলিসি',
      privacy: 'প্রাইভেসি পলিসি',
      terms: 'শর্তাবলী',
      refund: 'রিফান্ড পলিসি',
      copyright: 'সর্বস্বত্ব সংরক্ষিত।',
      credit: 'ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) | যশোর, বাংলাদেশ'
    },
    chat: {
      title: 'AI সহায়িকা',
      placeholder: 'আপনার মেসেজ লিখুন...',
      send: 'পাঠান',
      typing: 'টাইপ করছে...'
    }
  },
  en: {
    nav: {
      services: 'Services',
      pricing: 'Packages',
      about: 'About',
      contact: 'Contact',
      portfolio: 'Portfolio',
      faq: 'FAQ'
    },
    hero: {
      greeting: 'Hello & Welcome 👋',
      title: "I'm Digital Engineer",
      name: 'Taj Bhai',
      typingTexts: ['17+ Years Experience', '7,500+ Happy Clients', "First Digital Engineer of Jessore", 'Serving 50+ Countries'],
      cta1: 'Start Your Project',
      cta2: 'Chat on WhatsApp',
      stats: {
        experience: 'Years Experience',
        clients: 'Happy Clients',
        countries: 'Countries Served'
      }
    },
    about: {
      badge: "First Digital Engineer of Jessore",
      name: 'Md. Nazmul Islam',
      title: 'Senior Digital Engineer | CNC Specialist | AI Integrator',
      timeline_title: '🏆 Journey Milestones',
      cta1: 'Contact Me',
      cta2: 'View Services'
    },
    services: {
      badge: 'Our Services',
      title: 'Professional',
      titleHighlight: 'Digital Services',
      subtitle: '25+ digital services in 8 categories with engineering precision. Best service using modern technology with 17+ years of experience.',
      cta: 'Get Free Consultation'
    },
    portfolio: {
      badge: 'Our Work',
      title: 'Portfolio',
      titleHighlight: 'Gallery',
      subtitle: 'Samples of 7,500+ successful projects in 8 categories',
      viewMore: 'View More on Facebook'
    },
    whyUs: {
      badge: 'Why Choose Us?',
      title: 'Why Choose',
      titleHighlight: 'NextGen',
      titleEnd: '?',
      subtitle: "As Jessore's first digital engineer, we ensure the best quality in every project"
    },
    testimonials: {
      badge: 'Client Reviews',
      title: 'What Our',
      titleHighlight: 'Clients Say?',
      subtitle: 'Feedback from 7,500+ satisfied clients'
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      stillQuestions: 'Still have questions? Ask directly!',
      askWhatsApp: 'Ask on WhatsApp'
    },
    pricing: {
      badge: 'Pricing',
      title: 'Best Packages for',
      titleHighlight: 'Your Budget',
      subtitle: 'Free consultation and after-sales support with all packages'
    },
    contact: {
      badge: 'Contact',
      title: 'Talk with Engineer',
      titleHighlight: 'Taj Bhai',
      titleEnd: '',
      subtitle: "I personally talk to clients. With 17+ years of experience, I directly guide your business's digital transformation.",
      responseTime: 'Response Time: 5 Minutes',
      responseNote: 'Instant reply on WhatsApp',
      phone: 'Phone',
      email_label: 'Email',
      office: 'Office',
      serviceArea: 'Service Area',
      serviceAreaValue: 'All Bangladesh & 50+ Countries Online',
      form: {
        title: 'Free Consultation',
        name: 'Your Name',
        mobile: 'Mobile Number',
        email: 'Email (Optional)',
        service: 'Select Service',
        selectService: 'Select a Service',
        message: 'Your Message',
        submit: 'Submit',
        success: 'Your request has been submitted successfully!',
        successNote: 'We will contact you soon.'
      }
    },
    footer: {
      description: "Digital Studio of Engineer Md. Nazmul Islam Taj (Taj Bhai), the first digital engineer of Jessore. Modern digital services with 17+ years of experience.",
      quickLinks: 'Quick Links',
      policies: 'Policies',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      refund: 'Refund Policy',
      copyright: 'All Rights Reserved.',
      credit: 'Engineer Md. Nazmul Islam Taj | Jessore, Bangladesh'
    },
    chat: {
      title: 'AI Assistant',
      placeholder: 'Type your message...',
      send: 'Send',
      typing: 'Typing...'
    }
  }
};

// Service translations
const servicesData = {
  bn: [
    { icon: '🤖', title: 'এআই এজেন্ট', description: 'ইন্টেলিজেন্ট AI চ্যাটবট ও অটোমেশন সলিউশন', price: 'স্টার্টিং ৩০,০০০ টাকা', features: ['কাস্টম AI চ্যাটবট', 'অর্ডার ম্যানেজমেন্ট', 'লিড জেনারেশন', 'ভয়েস এজেন্ট'] },
    { icon: '📱', title: 'মোবাইল অ্যাপ', description: 'iOS ও Android অ্যাপ ডেভেলপমেন্ট', price: 'স্টার্টিং ৫০,০০০ টাকা', features: ['ক্রস-প্ল্যাটফর্ম', 'পেমেন্ট গেটওয়ে', 'অ্যাডমিন প্যানেল', 'প্লে স্টোর লাইভ'] },
    { icon: '💻', title: 'ওয়েবসাইট', description: 'প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট', price: 'স্টার্টিং ১৫,০০০ টাকা', features: ['রেসপনসিভ ডিজাইন', 'SEO অপটিমাইজড', 'অ্যাডমিন প্যানেল', '১ বছর হোস্টিং'] },
    { icon: '🎨', title: '৩ডি সিএনসি ডিজাইন', description: 'প্রিমিয়াম সিএনসি আর্ট ও ডিজাইন', price: '২,০০০ - ২০,০০০ টাকা', features: ['৩ডি রিলিফ ডিজাইন', 'ফার্নিচার ডিজাইন', 'পোর্ট্রেট আর্ট', 'CNC রেডি ফাইল'], badge: '১০+ বছর এক্সপার্ট' },
    { icon: '📱', title: 'সোশ্যাল মিডিয়া', description: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট', price: 'স্টার্টিং ৮,০০০ টাকা/মাস', features: ['ফেসবুক/ইনস্টাগ্রাম', 'কনটেন্ট ক্রিয়েশন', 'এড ক্যাম্পেইন', 'মাসিক রিপোর্ট'] },
    { icon: '🎬', title: 'ভিডিও এডিটিং', description: 'প্রফেশনাল ভিডিও এডিটিং', price: 'স্টার্টিং ৩,০০০ টাকা', features: ['প্রোমো ভিডিও', 'রিলস/শর্টস', 'মোশন গ্রাফিক্স', 'কালার গ্রেডিং'] },
    { icon: '🎨', title: 'গ্রাফিক ডিজাইন', description: 'লোগো, ব্যানার ও ব্র্যান্ডিং', price: 'স্টার্টিং ১,৫০০ টাকা', features: ['লোগো ডিজাইন', 'বিজনেস কার্ড', 'সোশ্যাল পোস্ট', 'ব্র্যান্ডিং'] },
    { icon: '📊', title: 'ডিজিটাল মার্কেটিং', description: 'SEO, SEM ও কন্টেন্ট মার্কেটিং', price: 'স্টার্টিং ৫,০০০ টাকা/মাস', features: ['SEO অপটিমাইজেশন', 'ইমেইল মার্কেটিং', 'কনটেন্ট স্ট্র্যাটেজি', 'অ্যানালিটিক্স'] }
  ],
  en: [
    { icon: '🤖', title: 'AI Agent', description: 'Intelligent AI Chatbot & Automation Solutions', price: 'Starting 30,000 BDT', features: ['Custom AI Chatbot', 'Order Management', 'Lead Generation', 'Voice Agent'] },
    { icon: '📱', title: 'Mobile App', description: 'iOS & Android App Development', price: 'Starting 50,000 BDT', features: ['Cross-Platform', 'Payment Gateway', 'Admin Panel', 'Play Store Live'] },
    { icon: '💻', title: 'Website', description: 'Professional Website Development', price: 'Starting 15,000 BDT', features: ['Responsive Design', 'SEO Optimized', 'Admin Panel', '1 Year Hosting'] },
    { icon: '🎨', title: '3D CNC Design', description: 'Premium CNC Art & Design', price: '2,000 - 20,000 BDT', features: ['3D Relief Design', 'Furniture Design', 'Portrait Art', 'CNC Ready Files'], badge: '10+ Years Expert' },
    { icon: '📱', title: 'Social Media', description: 'Social Media Management', price: 'Starting 8,000 BDT/month', features: ['Facebook/Instagram', 'Content Creation', 'Ad Campaigns', 'Monthly Reports'] },
    { icon: '🎬', title: 'Video Editing', description: 'Professional Video Editing', price: 'Starting 3,000 BDT', features: ['Promo Videos', 'Reels/Shorts', 'Motion Graphics', 'Color Grading'] },
    { icon: '🎨', title: 'Graphic Design', description: 'Logo, Banner & Branding', price: 'Starting 1,500 BDT', features: ['Logo Design', 'Business Card', 'Social Posts', 'Branding'] },
    { icon: '📊', title: 'Digital Marketing', description: 'SEO, SEM & Content Marketing', price: 'Starting 5,000 BDT/month', features: ['SEO Optimization', 'Email Marketing', 'Content Strategy', 'Analytics'] }
  ]
};

// Quick replies for chat - Multilingual
const quickRepliesData = {
  bn: [
    { text: 'সার্ভিস সম্পর্কে জানতে চাই', icon: '📋' },
    { text: 'মূল্য তালিকা দরকার', icon: '💰' },
    { text: 'ওয়েবসাইট বানাতে চাই', icon: '💻' },
    { text: 'সিএনসি ডিজাইন দরকার', icon: '🎨' }
  ],
  en: [
    { text: 'I want to know about services', icon: '📋' },
    { text: 'I need price list', icon: '💰' },
    { text: 'I want to build a website', icon: '💻' },
    { text: 'I need CNC design', icon: '🎨' }
  ]
};

// Policy content - Multilingual
const policiesData = {
  bn: {
    privacy: {
      title: 'গোপনীয়তা নীতি',
      icon: Shield,
      content: [
        'আপনার ব্যক্তিগত তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।',
        'আমরা কখনো স্প্যাম ইমেইল বা অযাচিত মেসেজ পাঠাই না।',
        'আপনার অনুমতি ছাড়া তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।',
        'সকল ডাটা এনক্রিপ্টেড আকারে সংরক্ষিত থাকে।',
        'যেকোনো প্রশ্নে ইমেইল: concept11art@gmail.com'
      ]
    },
    terms: {
      title: 'সেবার শর্তাবলী',
      icon: FileText,
      content: [
        '৫০% অগ্রিম পেমেন্ট প্রয়োজন কাজ শুরু করতে।',
        'বাকি ৫০% পেমেন্ট ডেলিভারির পূর্বে দিতে হবে।',
        '৭ দিনের মধ্যে ফ্রি রিভিশন পাবেন।',
        'কাজ শুরু হলে রিফান্ড সম্ভব নয়।',
        'কাস্টম প্রজেক্টের সময়সীমা আলোচনা সাপেক্ষে নির্ধারিত হবে।'
      ]
    },
    refund: {
      title: 'রিফান্ড পলিসি',
      icon: RotateCcw,
      content: [
        'কাজ শুরু করার পর রিফান্ড দেওয়া হয় না।',
        'ডেলিভারির পর ৭ দিনের মধ্যে বাগ ফিক্স সম্পূর্ণ ফ্রি।',
        'ক্লায়েন্ট অসন্তুষ্ট হলে কেস বাই কেস সিদ্ধান্ত নেওয়া হয়।',
        'আংশিক কাজে আংশিক রিফান্ড বিবেচনা করা হতে পারে।',
        'অগ্রিম পেমেন্ট ফেরতের জন্য ২৪ ঘন্টার মধ্যে জানাতে হবে।'
      ]
    }
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      content: [
        'Your personal information will be kept completely confidential.',
        'We never send spam emails or unsolicited messages.',
        'Information is not shared with third parties without your permission.',
        'All data is stored in encrypted form.',
        'For any questions email: concept11art@gmail.com'
      ]
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      content: [
        '50% advance payment required to start work.',
        'Remaining 50% payment must be made before delivery.',
        'You will get free revision within 7 days.',
        'Refund is not possible once work has started.',
        'Custom project timeline will be determined through discussion.'
      ]
    },
    refund: {
      title: 'Refund Policy',
      icon: RotateCcw,
      content: [
        'No refund is given after work has started.',
        'Bug fix is completely free within 7 days after delivery.',
        'Case by case decision is made if client is dissatisfied.',
        'Partial refund may be considered for partial work.',
        'Must inform within 24 hours for advance payment refund.'
      ]
    }
  }
};

// Testimonials - Multilingual
const testimonialsData = {
  bn: [
    {
      name: 'মোঃ রফিকুল ইসলাম',
      location: 'ঢাকা',
      rating: 5,
      text: 'তাজ ভাইয়ের সিএনসি ডিজাইন অসাধারণ! আমার ফার্নিচার ব্যবসার জন্য যে ডিজাইন করে দিয়েছেন, তা দেখে কাস্টমাররাও অবাক। দক্ষিণ এশিয়ার সেরা!',
      service: '৩ডি সিএনসি ডিজাইন'
    },
    {
      name: 'ফাতেমা খানম',
      location: 'যশোর',
      rating: 5,
      text: 'আমাদের অনলাইন শপের ওয়েবসাইট ও মোবাইল অ্যাপ তাজ ভাই তৈরি করে দিয়েছেন। এক মাসে সেলস ৩ গুণ বেড়েছে! ধন্যবাদ তাজ ভাই।',
      service: 'ওয়েবসাইট ও অ্যাপ'
    },
    {
      name: 'আহমেদ হাসান',
      location: 'চট্টগ্রাম',
      rating: 5,
      text: 'AI চ্যাটবট বসিয়ে কাস্টমার সার্ভিসের খরচ ৬০% কমে গেছে। ২৪/৭ অটোমেটিক রেসপন্স। এত ভালো টেকনোলজি বাংলাদেশে সত্যিই বিরল।',
      service: 'এআই এজেন্ট'
    },
    {
      name: 'সালমা আক্তার',
      location: 'খুলনা',
      rating: 5,
      text: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট নিয়েছি। ৩ মাসে ফলোয়ার ১০ গুণ বাড়ছে। কনটেন্ট ও এড ক্যাম্পেইন চমৎকার!',
      service: 'সোশ্যাল মিডিয়া'
    },
    {
      name: 'করিম সাহেব',
      location: 'সিলেট',
      rating: 5,
      text: 'বাবার ছবি দিয়ে কাঠে খোদাই করে দিয়েছেন। এত সুন্দর কাজ আর কোথাও দেখিনি। সারাজীবনের স্মৃতি হয়ে থাকবে।',
      service: 'পোর্ট্রেট আর্ট'
    },
    {
      name: 'নাসরিন বেগম',
      location: 'রাজশাহী',
      rating: 5,
      text: 'বিজনেসের লোগো ও ব্র্যান্ডিং করিয়েছি। প্রফেশনাল কোয়ালিটি, সময়মতো ডেলিভারি, দামও সাধ্যের মধ্যে।',
      service: 'গ্রাফিক ডিজাইন'
    },
  ],
  en: [
    {
      name: 'Mohammad Rafiqul Islam',
      location: 'Dhaka',
      rating: 5,
      text: 'Taj Bhai\'s CNC design is amazing! The design he made for my furniture business amazed customers too. Best in South Asia!',
      service: '3D CNC Design'
    },
    {
      name: 'Fatema Khanam',
      location: 'Jessore',
      rating: 5,
      text: 'Taj Bhai built our online shop\'s website and mobile app. Sales increased 3 times in one month! Thank you Taj Bhai.',
      service: 'Website & App'
    },
    {
      name: 'Ahmed Hassan',
      location: 'Chittagong',
      rating: 5,
      text: 'After installing AI chatbot, customer service cost reduced by 60%. 24/7 automatic response. Such good technology is rare in Bangladesh.',
      service: 'AI Agent'
    },
    {
      name: 'Salma Akter',
      location: 'Khulna',
      rating: 5,
      text: 'I took social media management. In 3 months followers increased 10 times. Content and ad campaigns are wonderful!',
      service: 'Social Media'
    },
    {
      name: 'Karim Sahib',
      location: 'Sylhet',
      rating: 5,
      text: 'He carved my father\'s picture on wood. I haven\'t seen such beautiful work anywhere else. It will remain a lifetime memory.',
      service: 'Portrait Art'
    },
    {
      name: 'Nasrin Begum',
      location: 'Rajshahi',
      rating: 5,
      text: 'Got logo and branding done for business. Professional quality, on-time delivery, price also within affordability.',
      service: 'Graphic Design'
    },
  ]
};

// FAQ - Multilingual
const faqData = {
  bn: [
    { q: 'সিএনসি ডিজাইনের মূল্য কত?', a: 'সিএনসি ডিজাইনের মূল্য ডিজাইনের জটিলতা ও সাইজের উপর নির্ভর করে। সাধারণ ডিজাইন ২,০০০ টাকা থেকে শুরু, জটিল ৩ডি রিলিফ ২০,০০০ টাকা পর্যন্ত হতে পারে। ফ্রি কনসালটেশনে সঠিক মূল্য জানতে পারবেন।' },
    { q: 'ওয়েবসাইট বানাতে কতদিন সময় লাগে?', a: 'সাধারণ ওয়েবসাইট ৫-৭ দিনে, ই-কমার্স সাইট ১৫-২০ দিনে, কাস্টম ওয়েব অ্যাপ্লিকেশন ১-২ মাসে সম্পন্ন হয়। জরুরি প্রজেক্টে এক্সপ্রেস ডেলিভারি সম্ভব।' },
    { q: 'পেমেন্ট কিভাবে করব?', a: '৫০% অগ্রিম, বাকি ৫০% ডেলিভারির সময়। বিকাশ, নগদ, রকেট, ব্যাংক ট্রান্সফার, বিদেশি ক্লায়েন্টরা PayPal/Wise ব্যবহার করতে পারেন।' },
    { q: 'রিভিশন কি ফ্রি?', a: 'হ্যাঁ, প্রতিটি প্রজেক্টে ৭ দিনের ফ্রি রিভিশন পাবেন। বড় প্রজেক্টে ৩০ দিন পর্যন্ত ফ্রি সাপোর্ট।' },
    { q: 'বিদেশ থেকে সার্ভিস নিতে পারব?', a: 'অবশ্যই! আমেরিকা, কানাডা, যুক্তরাজ্য, মধ্যপ্রাচ্যসহ ৫০+ দেশে আমাদের ক্লায়েন্ট আছে। অনলাইনে মিটিং, ফাইল ডেলিভারি সব সম্ভব।' },
    { q: 'AI চ্যাটবট কি বাংলায় কথা বলতে পারবে?', a: 'হ্যাঁ, আমাদের AI চ্যাটবট বাংলা, ইংরেজি সহ যেকোনো ভাষায় কথা বলতে পারে। ভয়েস সাপোর্টও থাকবে।' },
  ],
  en: [
    { q: 'What is the price of CNC design?', a: 'CNC design price depends on design complexity and size. Simple designs start from 2,000 BDT, complex 3D relief can go up to 20,000 BDT. You can know the exact price in free consultation.' },
    { q: 'How long does it take to build a website?', a: 'Simple website in 5-7 days, e-commerce site in 15-20 days, custom web application in 1-2 months. Express delivery is possible for urgent projects.' },
    { q: 'How to make payment?', a: '50% advance, remaining 50% at delivery. bKash, Nagad, Rocket, Bank Transfer, foreign clients can use PayPal/Wise.' },
    { q: 'Is revision free?', a: 'Yes, you will get 7 days free revision on every project. Up to 30 days free support for large projects.' },
    { q: 'Can I take service from abroad?', a: 'Of course! We have clients in 50+ countries including America, Canada, UK, Middle East. Online meeting, file delivery everything is possible.' },
    { q: 'Can AI chatbot speak Bengali?', a: 'Yes, our AI chatbot can speak Bengali, English and any language. Voice support will also be available.' },
  ]
};

// Why Choose Us - Multilingual
const whyUsData = {
  bn: [
    { icon: Award, title: '১৭+ বছর অভিজ্ঞতা', desc: 'দক্ষিণ এশিয়ার সেরা ডিজিটাল ইঞ্জিনিয়ার' },
    { icon: Clock, title: 'দ্রুত ডেলিভারি', desc: 'সময়মতো কাজ ডেলিভারি গ্যারান্টি' },
    { icon: Shield, title: '১০০% সন্তুষ্টি', desc: 'সীমাহীন রিভিশন ও সাপোর্ট' },
    { icon: Sparkles, title: 'প্রিমিয়াম কোয়ালিটি', desc: 'আন্তর্জাতিক মানের ডিজাইন' },
  ],
  en: [
    { icon: Award, title: '17+ Years Experience', desc: 'Best Digital Engineer in South Asia' },
    { icon: Clock, title: 'Fast Delivery', desc: 'Guaranteed on-time work delivery' },
    { icon: Shield, title: '100% Satisfaction', desc: 'Unlimited revisions & support' },
    { icon: Sparkles, title: 'Premium Quality', desc: 'International standard design' },
  ]
};

// Trust Badges - Multilingual
const trustBadgesData = {
  bn: [
    '🏆 যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার',
    '⭐ ৫.০ রেটিং (৫০০+ রিভিউ)',
    '🌍 ৫০+ দেশে ক্লায়েন্ট',
    '💰 স্বচ্ছ মূল্য নীতি'
  ],
  en: [
    '🏆 First Digital Engineer of Jessore',
    '⭐ 5.0 Rating (500+ Reviews)',
    '🌍 Clients in 50+ Countries',
    '💰 Transparent Pricing Policy'
  ]
};

// Portfolio Categories - Multilingual
const portfolioCategoriesData = {
  bn: [
    { icon: '🎨', title: '৩ডি সিএনসি', count: '১০+ নমুনা', color: 'from-yellow-500/20 to-orange-500/20' },
    { icon: '💻', title: 'ওয়েবসাইট', count: 'ফেসবুকে দেখুন', color: 'from-cyan-500/20 to-blue-500/20' },
    { icon: '📱', title: 'মোবাইল অ্যাপ', count: 'ফেসবুকে দেখুন', color: 'from-purple-500/20 to-pink-500/20' },
    { icon: '🎨', title: 'গ্রাফিক ডিজাইন', count: 'ফেসবুকে দেখুন', color: 'from-green-500/20 to-teal-500/20' },
  ],
  en: [
    { icon: '🎨', title: '3D CNC', count: '10+ Samples', color: 'from-yellow-500/20 to-orange-500/20' },
    { icon: '💻', title: 'Website', count: 'View on Facebook', color: 'from-cyan-500/20 to-blue-500/20' },
    { icon: '📱', title: 'Mobile App', count: 'View on Facebook', color: 'from-purple-500/20 to-pink-500/20' },
    { icon: '🎨', title: 'Graphic Design', count: 'View on Facebook', color: 'from-green-500/20 to-teal-500/20' },
  ]
};

// Portfolio Gallery Images
const portfolioImages = [
  { src: '/portfolio/cnc-design-1.png', category: 'cnc', title: 'CNC রিলিফ ডিজাইন' },
  { src: '/portfolio/cnc-design-2.png', category: 'cnc', title: 'জটিল প্যাটার্ন ডিজাইন' },
  { src: '/portfolio/cnc-design-3.png', category: 'cnc', title: '৩ডি ফুলের নকশা' },
  { src: '/portfolio/portrait-1.png', category: 'portrait', title: 'কাঠে খোদাই পোর্ট্রেট' },
  { src: '/portfolio/portrait-2.png', category: 'portrait', title: 'প্রিয়জনের ছবি' },
  { src: '/portfolio/portrait-3.png', category: 'portrait', title: 'মেমোরিয়াল আর্ট' },
  { src: '/portfolio/furniture-1.png', category: 'furniture', title: 'ফার্নিচার ডিজাইন' },
  { src: '/portfolio/islamic-art-1.png', category: 'islamic', title: 'ইসলামিক ক্যালিগ্রাফি' },
  { src: '/portfolio/calligraphy-1.png', category: 'islamic', title: 'আরবি ক্যালিগ্রাফি' },
  { src: '/portfolio/calligraphy-2.png', category: 'islamic', title: 'সুন্দর নকশা' },
  { src: '/portfolio/wood-art-1.png', category: 'cnc', title: 'কাঠের আর্টওয়ার্ক' },
  { src: '/portfolio/relief-1.png', category: 'cnc', title: 'রিলিফ কারুকাজ' },
];

// Particle component with reduced motion support
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Check for reduced motion preference
  // Using useMemo to compute this value once on mount
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.fill();

        // Connect particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-yellow-500/5" />
      </div>
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}

// Typing effect hook
function useTypingEffect(texts: string[], speed = 100, delay = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, delay]);

  return displayText;
}

// Chat message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'positive' | 'negative' | null;
}

// Chat session type for history
interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Feedback data type
interface FeedbackData {
  messageId: string;
  feedback: 'positive' | 'negative';
  timestamp: Date;
}

// Analytics data type for tracking
interface AnalyticsData {
  totalChats: number;
  totalMessages: number;
  sessionsCount: number;
  topicsAsked: { topic: string; count: number }[];
  feedbackStats: { positive: number; negative: number };
  averageMessagesPerSession: number;
  lastUpdated: Date;
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Local Storage Keys
const STORAGE_KEYS = {
  CHAT_HISTORY: 'nextgen_chat_history',
  ANALYTICS: 'nextgen_analytics',
  FEEDBACK: 'nextgen_feedback',
  CURRENT_SESSION: 'nextgen_current_session'
};

// Topics to track for analytics
const TRACKED_TOPICS = [
  { keywords: ['ওয়েবসাইট', 'website', 'ওয়েব', 'সাইট'], topic: 'ওয়েবসাইট' },
  { keywords: ['মোবাইল অ্যাপ', 'অ্যাপ', 'app', 'mobile', 'android', 'ios'], topic: 'মোবাইল অ্যাপ' },
  { keywords: ['সিএনসি', 'cnc', 'ডিজাইন', 'design', 'খোদাই'], topic: 'সিএনসি ডিজাইন' },
  { keywords: ['এআই', 'ai', 'চ্যাটবট', 'chatbot', 'বট'], topic: 'এআই এজেন্ট' },
  { keywords: ['মূল্য', 'দাম', 'price', 'কত', 'টাকা'], topic: 'মূল্য জিজ্ঞাসা' },
  { keywords: ['সোশ্যাল', 'social', 'ফেসবুক', 'facebook', 'ইনস্টাগ্রাম'], topic: 'সোশ্যাল মিডিয়া' },
  { keywords: ['ভিডিও', 'video', 'এডিট', 'edit'], topic: 'ভিডিও এডিটিং' },
  { keywords: ['গ্রাফিক', 'graphic', 'লোগো', 'logo', 'ব্যানার'], topic: 'গ্রাফিক ডিজাইন' },
  { keywords: ['মার্কেটিং', 'marketing', 'seo', 'এড'], topic: 'ডিজিটাল মার্কেটিং' },
  { keywords: ['যোগাযোগ', 'contact', 'ফোন', 'phone', 'whatsapp'], topic: 'যোগাযোগ' }
];

// Form validation
interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  service?: string;
}

export default function Home() {
  // Language state
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const t = translations[lang];
  const services = servicesData[lang];
  const timeline = timelineData[lang];
  const pricingPackages = pricingPackagesData[lang];
  const quickReplies = quickRepliesData[lang];
  const policies = policiesData[lang];
  const testimonials = testimonialsData[lang];
  const faq = faqData[lang];
  const whyUs = whyUsData[lang];
  const trustBadges = trustBadgesData[lang];
  const portfolioCategories = portfolioCategoriesData[lang];
  
  // State management
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);
  
  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  const [messages, setMessages] = useState<Message[]>(() => [{
    id: Math.random().toString(36).substring(2) + Date.now().toString(36),
    role: 'assistant' as const,
    content: 'আসসালামু আলাইকুম! 👋 আমি NextGen Digital Studio এর AI সহায়িকা "বুদ্ধিদীপ্ত"। আপনাকে কীভাবে সাহায্য করতে পারি?',
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const voiceRecognitionRef = useRef<any>(null);
  
  // Chat History State - lazy initialization from localStorage
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('nextgen_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => generateId());
  
  // Analytics State - lazy initialization from localStorage
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    if (typeof window === 'undefined') {
      return {
        totalChats: 0,
        totalMessages: 0,
        sessionsCount: 0,
        topicsAsked: [],
        feedbackStats: { positive: 0, negative: 0 },
        averageMessagesPerSession: 0,
        lastUpdated: new Date()
      };
    }
    const saved = localStorage.getItem('nextgen_analytics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          totalChats: 0,
          totalMessages: 0,
          sessionsCount: 0,
          topicsAsked: [],
          feedbackStats: { positive: 0, negative: 0 },
          averageMessagesPerSession: 0,
          lastUpdated: new Date()
        };
      }
    }
    return {
      totalChats: 0,
      totalMessages: 0,
      sessionsCount: 0,
      topicsAsked: [],
      feedbackStats: { positive: 0, negative: 0 },
      averageMessagesPerSession: 0,
      lastUpdated: new Date()
    };
  });
  
  // Share State
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  
  // Theme State - lazy initialization from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedTheme = localStorage.getItem('nextgen_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  // Portfolio Gallery State
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState<string | null>(null);
  const [portfolioCategory, setPortfolioCategory] = useState<string>('all');
  
  // Testimonials State
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [portfolioItem, setPortfolioItem] = useState<{ src: string; title: string } | null>(null);
  
  // PWA Install state
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const typingText = useTypingEffect(t.hero.typingTexts, 80, 1500);

  // Detect mobile device and iOS
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isIOSDevice = /ipad|iphone|ipod/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
      setIsIOS(isIOSDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('nextgen_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Testimonials Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // PWA Service Worker Registration & Install Prompt
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available - auto update
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
          
          // Check for updates periodically
          setInterval(() => registration.update(), 30 * 60 * 1000);
        })
        .catch((error) => console.log('❌ SW registration failed:', error));
      
      // Handle controller change (auto reload on update)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }

    // PWA Install Prompt - only for Chrome/Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // PWA Install Handler
  const handleInstallApp = async () => {
    // If browser supports native install prompt (Chrome/Android)
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } else {
      // For iOS/Safari - show instructions modal
      setShowInstallModal(true);
    }
  };

  // Preloader effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    const handleHashChange = () => setMobileMenuOpen(false);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Voice Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'bn-BD';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        voiceRecognitionRef.current = recognition;
        // Set voice supported after recognition is initialized
        setTimeout(() => setVoiceSupported(true), 0);
      }
    }
    
    return () => {
      if (voiceRecognitionRef.current) {
        voiceRecognitionRef.current.stop();
      }
    };
  }, []);

  // Save messages to history when session ends - using microtask to avoid cascading renders
  const prevMessagesLengthRef = useRef(messages.length);
  
  useEffect(() => {
    // Only update if messages length actually increased
    if (messages.length > 1 && messages.length > prevMessagesLengthRef.current && currentSessionId) {
      const session: ChatSession = {
        id: currentSessionId,
        title: messages[1]?.content.substring(0, 50) || 'নতুন চ্যাট',
        messages,
        createdAt: chatHistory.find(s => s.id === currentSessionId)?.createdAt || new Date(),
        updatedAt: new Date()
      };
      
      // Use microtask to defer state update
      queueMicrotask(() => {
        setChatHistory(prev => {
          const existing = prev.findIndex(s => s.id === currentSessionId);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = session;
            return updated.slice(0, 10);
          }
          return [session, ...prev].slice(0, 10);
        });
      });
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, currentSessionId, chatHistory]);

  // Save history to localStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Save analytics to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }, [analytics]);

  // Voice Input Toggle
  const toggleVoiceInput = () => {
    if (!voiceRecognitionRef.current) return;
    
    if (isListening) {
      voiceRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Try Bengali first, fallback to English
      try {
        voiceRecognitionRef.current.lang = 'bn-BD';
        voiceRecognitionRef.current.start();
        setIsListening(true);
      } catch {
        try {
          voiceRecognitionRef.current.lang = 'en-US';
          voiceRecognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error('Voice recognition failed:', e);
        }
      }
    }
  };

  // Track topic for analytics
  const trackTopic = (message: string) => {
    const lowerMessage = message.toLowerCase();
    for (const { keywords, topic } of TRACKED_TOPICS) {
      if (keywords.some(kw => lowerMessage.includes(kw.toLowerCase()))) {
        setAnalytics(prev => {
          const existing = prev.topicsAsked.find(t => t.topic === topic);
          if (existing) {
            return {
              ...prev,
              topicsAsked: prev.topicsAsked.map(t => 
                t.topic === topic ? { ...t, count: t.count + 1 } : t
              )
            };
          }
          return {
            ...prev,
            topicsAsked: [...prev.topicsAsked, { topic, count: 1 }]
          };
        });
        break;
      }
    }
  };

  // Handle Feedback
  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, feedback } : m
    ));
    
    setAnalytics(prev => ({
      ...prev,
      feedbackStats: {
        ...prev.feedbackStats,
        [feedback]: prev.feedbackStats[feedback] + 1
      }
    }));
  };

  // Share Chat
  const shareChat = (message: Message, platform: 'whatsapp' | 'facebook' | 'copy') => {
    const text = `🤖 NextGen AI সহায়িকা:\n\nপ্রশ্ন: ${messages.find(m => m.id === message.id && m.role === 'user')?.content || ''}\n\nউত্তর: ${message.content}\n\n📞 যোগাযোগ: +8801711731354`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      alert('চ্যাট কপি হয়েছে!');
    }
    setShowShareMenu(null);
  };

  // Load Chat Session
  const loadChatSession = (session: ChatSession) => {
    setMessages(session.messages);
    setCurrentSessionId(session.id);
    setShowHistory(false);
  };

  // New Chat
  const startNewChat = () => {
    const newSessionId = generateId();
    setCurrentSessionId(newSessionId);
    setMessages([{
      id: generateId(),
      role: 'assistant',
      content: 'আসসালামু আলাইকুম! 👋 আমি NextGen Digital Studio এর AI সহায়িকা "বুদ্ধিদীপ্ত"। আপনাকে কীভাবে সাহায্য করতে পারি?',
      timestamp: new Date()
    }]);
    setShowHistory(false);
  };

  // Delete Chat History
  const deleteChatSession = (sessionId: string) => {
    setChatHistory(prev => prev.filter(s => s.id !== sessionId));
  };

  // Clear All History
  const clearAllHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'নাম আবশ্যক';
    } else if (formData.name.length < 3) {
      errors.name = 'নাম কমপক্ষে ৩ অক্ষর হতে হবে';
    }
    
    if (!formData.mobile.trim()) {
      errors.mobile = 'মোবাইল নম্বর আবশ্যক';
    } else if (!/^01[3-9]\d{8}$/.test(formData.mobile.replace(/\D/g, ''))) {
      errors.mobile = 'সঠিক মোবাইল নম্বর দিন (০১XXXXXXXXX)';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'সঠিক ইমেইল দিন';
    }
    
    if (!formData.service) {
      errors.service = 'সার্ভিস নির্বাচন করুন';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage;
    if (!text.trim()) return;

    const userMessage: Message = { 
      id: generateId(),
      role: 'user', 
      content: text, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Track analytics
    setAnalytics(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1,
      totalChats: prev.totalChats + 1
    }));
    
    // Track topic
    trackTopic(text);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          newMessage: text
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Chat API returned error:', data.error);
      }
      
      const assistantMessage: Message = { 
        id: generateId(),
        role: 'assistant', 
        content: data.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat fetch error:', err);
      setMessages(prev => [...prev, { 
        id: generateId(),
        role: 'assistant', 
        content: 'দুঃখিত, সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে WhatsApp এ যোগাযোগ করুন: +8801711731354',
        timestamp: new Date()
      }]);
    }

    setIsLoading(false);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        setFormSuccess(true);
        setFormData({ name: '', mobile: '', email: '', service: '', message: '' });
        setFormErrors({});
      }
    } catch {
      alert('সাবমিশনে সমস্যা হয়েছে। WhatsApp এ যোগাযোগ করুন।');
    }

    setFormSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preloader
  if (loading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0a]" role="status" aria-label="লোড হচ্ছে">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-cyan-400">NextGen</span>
            <span className="text-yellow-400">Digital</span>
          </div>
          <div className="w-64 md:w-80 h-2 bg-[#333] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-yellow-400 transition-all duration-300"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            />
          </div>
          <p className="text-gray-400 mt-4">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:bg-cyan-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-lg"
      >
        মূল বিষয়ে যান
      </a>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}
        role="navigation"
        aria-label="প্রধান নেভিগেশন"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group" aria-label="NextGen Digital - হোম">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-400 to-cyan-600 p-0.5 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                <Image src="/logo.png" alt="NextGen Logo" fill className="object-cover rounded-lg" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg md:text-xl font-bold text-white">NextGen <span className="text-cyan-400">Digital</span></span>
                <p className="text-[10px] text-gray-400 -mt-1">যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার</p>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-gray-300 hover:text-cyan-400 transition-colors">{t.nav.services}</a>
              <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">{t.nav.pricing}</a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">{t.nav.about}</a>
              <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">{t.nav.contact}</a>
            </div>
            
            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white hover:border-cyan-500/50 transition-colors"
                aria-label={isDarkMode ? 'লাইট মোডে যান' : 'ডার্ক মোডে যান'}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-cyan-400" />}
              </button>
              
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm font-medium text-white hover:border-cyan-500/50 transition-colors flex items-center gap-1.5"
                aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় স্যুইচ করুন'}
              >
                <span className="text-base">{lang === 'bn' ? '🇬🇧' : '🇧🇩'}</span>
                <span className="hidden sm:inline">{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
              </button>
              
              <a href="https://wa.me/8801711731354" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp এ যোগাযোগ করুন">
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </a>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${mobileMenuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}
          role="menu"
        >
          <div className="bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#333] px-4 py-4 space-y-2">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 hover:translate-x-2" role="menuitem">{t.nav.services}</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 hover:translate-x-2" role="menuitem">{t.nav.pricing}</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 hover:translate-x-2" role="menuitem">{t.nav.about}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 hover:translate-x-2" role="menuitem">{t.nav.contact}</a>
            <button 
              onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-3 px-4 text-left text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 hover:translate-x-2 flex items-center gap-2"
              role="menuitem"
            >
              <Bot className="w-5 h-5" aria-hidden="true" />
              {t.chat.title}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        <Particles />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 animate-fade-in">
            <span className="text-cyan-400 text-lg md:text-2xl font-medium">{t.hero.greeting}</span>
          </div>
          
          {/* Profile Photo in Hero */}
          <div className="mb-8 animate-fade-in-up">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-yellow-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 animate-pulse transition-opacity" aria-hidden="true" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
                <Image src="/taj-bhai.jpg" alt="Engineer Taj" fill className="object-cover" priority />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            {t.hero.title}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-yellow-400 bg-clip-text text-transparent">
              {t.hero.name}
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 h-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-cyan-400">{typingText}</span>
            <span className="animate-pulse">|</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="#contact">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all">
                {t.hero.cta1}
                <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </a>
            <a href="https://wa.me/8801711731354" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold text-lg px-8 py-6 rounded-xl gap-2">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {t.hero.cta2}
              </Button>
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: lang === 'bn' ? '১৭+' : '17+', label: t.hero.stats.experience, icon: Calendar },
              { value: lang === 'bn' ? '৭,৫০০+' : '7,500+', label: t.hero.stats.clients, icon: User },
              { value: lang === 'bn' ? '৫০+' : '50+', label: t.hero.stats.countries, icon: Globe }
            ].map((stat, i) => (
              <div key={i} className="p-4 md:p-6 rounded-2xl bg-[#141414]/80 backdrop-blur border border-[#333] hover:border-cyan-500/50 transition-all group">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div className="text-2xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content">
        {/* Profile Section */}
        <section id="about" className="py-16 md:py-24 relative" aria-labelledby="about-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-500/20 text-yellow-400 mb-4">
                <Crown className="w-4 h-4 mr-1" aria-hidden="true" />
                {t.about.badge}
              </Badge>
              <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.about.name} <span className="text-cyan-400">তাজ</span>
              </h2>
              <p className="text-gray-400 text-lg">
                {t.about.title}
              </p>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-yellow-400 rounded-full blur-2xl opacity-30 group-hover:opacity-50 animate-pulse transition-opacity" aria-hidden="true" />
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors bg-[#141414]">
                  <Image src="/taj-bhai.jpg" alt="Engineer Md. Nazmul Islam Taj" fill className="object-cover" priority />
                </div>
                {/* Verified Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full shadow-lg">
                  <span className="text-black text-xs font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" aria-hidden="true" />
                    {lang === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-6 text-center">{t.about.timeline_title}</h3>
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-16 text-cyan-400 font-bold text-right">{item.year}</div>
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                      {i < timeline.length - 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-transparent" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-[#141414] border border-[#333] group-hover:border-cyan-500/50 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                        <span className="font-semibold text-white">{item.title}</span>
                      </div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <a href="#contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold">
                  {t.about.cta1}
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                  {t.about.cta2}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-cyan-500/20 text-cyan-400 mb-4">{t.services.badge}</Badge>
              <h2 id="services-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.services.title} <span className="text-cyan-400">{t.services.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.services.subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <Card key={i} className="bg-[#141414] border-[#333] hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{service.icon}</div>
                      {service.badge && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">{service.badge}</Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-1 mb-4">
                      {service.features.slice(0, 3).map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-500 text-xs">
                          <Check className="w-3 h-3 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-cyan-400 font-semibold">{service.price}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA under services */}
            <div className="text-center mt-12">
              <a href="#contact">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25">
                  {t.services.cta}
                  <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Gallery Section */}
        <section id="portfolio" className="py-16 md:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]" aria-labelledby="portfolio-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-500/20 text-yellow-400 mb-4">{t.portfolio.badge}</Badge>
              <h2 id="portfolio-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.portfolio.title} <span className="text-cyan-400">{t.portfolio.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.portfolio.subtitle}
              </p>
            </div>

            {/* Portfolio Grid - All Services */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* CNC Designs - Using uploaded images */}
              {[
                { src: '/portfolio/cnc-work-1.jpg', title: lang === 'bn' ? 'সিএনসি কাজ' : 'CNC Work', category: '🎨 CNC', desc: lang === 'bn' ? 'প্রিমিয়াম ডিজাইন' : 'Premium Design' },
                { src: '/portfolio/wood-portrait.png', title: lang === 'bn' ? 'উড পোর্ট্রেট' : 'Wood Portrait', category: '🎨 CNC', desc: lang === 'bn' ? 'কাঠের শিল্পকলা' : 'Wood Art' },
                { src: '/portfolio/wood-portrait-display.png', title: lang === 'bn' ? 'খোদাই শিল্প' : 'Carved Art', category: '🎨 CNC', desc: lang === 'bn' ? 'হাতের কাজ' : 'Handmade' },
                { src: '/portfolio/cnc-design-1.png', title: lang === 'bn' ? '৩ডি ডিজাইন' : '3D Design', category: '🎨 CNC', desc: lang === 'bn' ? 'জটিল প্যাটার্ন' : 'Complex Pattern' },
                { src: '/portfolio/cnc-design-2.png', title: lang === 'bn' ? 'সিএনসি আর্ট' : 'CNC Art', category: '🎨 CNC', desc: lang === 'bn' ? 'আর্টিস্টিক' : 'Artistic' },
                { src: '/portfolio/cnc-design-3.png', title: lang === 'bn' ? 'ডিজিটাল আর্ট' : 'Digital Art', category: '🎨 CNC', desc: lang === 'bn' ? 'মডার্ন ডিজাইন' : 'Modern Design' },
                { src: '/portfolio/ai-design-1.png', title: lang === 'bn' ? 'এআই আর্ট' : 'AI Art', category: '🤖 AI', desc: lang === 'bn' ? 'জেনারেটেড' : 'Generated' },
                { src: '/portfolio/ai-design-2.png', title: lang === 'bn' ? 'ক্রিয়েটিভ' : 'Creative', category: '🤖 AI', desc: lang === 'bn' ? 'ইউনিক' : 'Unique' },
                { src: '/portfolio/ai-design-3.png', title: lang === 'bn' ? 'মডার্ন আর্ট' : 'Modern Art', category: '🤖 AI', desc: lang === 'bn' ? 'কাস্টম' : 'Custom' },
                { src: '/portfolio/ai-design-4.png', title: lang === 'bn' ? 'ডিজিটাল' : 'Digital', category: '🤖 AI', desc: lang === 'bn' ? 'প্রফেশনাল' : 'Professional' },
                { src: '/portfolio/ai-design-5.png', title: lang === 'bn' ? 'প্যাটার্ন' : 'Pattern', category: '🤖 AI', desc: lang === 'bn' ? 'নকশা' : 'Design' },
                { src: '/portfolio/ai-design-6.png', title: lang === 'bn' ? 'আর্টওয়ার্ক' : 'Artwork', category: '🤖 AI', desc: lang === 'bn' ? 'সুন্দর' : 'Beautiful' },
                { src: '/portfolio/ai-design-7.png', title: lang === 'bn' ? 'ভিজ্যুয়াল' : 'Visual', category: '🤖 AI', desc: lang === 'bn' ? 'ক্রিয়েটিভ' : 'Creative' },
                { src: '/portfolio/ai-design-8.png', title: lang === 'bn' ? 'গ্রাফিক্স' : 'Graphics', category: '🤖 AI', desc: lang === 'bn' ? 'ডিজাইন' : 'Design' },
                { src: '/portfolio/relief-1.png', title: lang === 'bn' ? '৩ডি রিলিফ' : '3D Relief', category: '🎨 CNC', desc: lang === 'bn' ? 'গভীর খোদাই' : 'Deep Carving' },
                { src: '/portfolio/portrait-1.png', title: lang === 'bn' ? 'পোর্ট্রেট আর্ট' : 'Portrait Art', category: '🎨 CNC', desc: lang === 'bn' ? 'ব্যক্তিগত ছবি' : 'Personal Photo' },
                { src: '/portfolio/portrait-2.png', title: lang === 'bn' ? 'মেমোরিয়াল' : 'Memorial', category: '🎨 CNC', desc: lang === 'bn' ? 'স্মৃতি' : 'Memory' },
                { src: '/portfolio/portrait-3.png', title: lang === 'bn' ? 'কাস্টম পোর্ট্রেট' : 'Custom Portrait', category: '🎨 CNC', desc: lang === 'bn' ? 'ব্যক্তিগত' : 'Personal' },
                { src: '/portfolio/islamic-art-1.png', title: lang === 'bn' ? 'ইসলামিক আর্ট' : 'Islamic Art', category: '🕌 Islamic', desc: lang === 'bn' ? 'ধর্মীয় নকশা' : 'Religious Design' },
                { src: '/portfolio/calligraphy-1.png', title: lang === 'bn' ? 'আরবি ক্যালিগ্রাফি' : 'Arabic Calligraphy', category: '🕌 Islamic', desc: lang === 'bn' ? 'সুন্দর হস্তলিপি' : 'Beautiful Script' },
                { src: '/portfolio/calligraphy-2.png', title: lang === 'bn' ? 'ক্যালিগ্রাফি' : 'Calligraphy', category: '🕌 Islamic', desc: lang === 'bn' ? 'আরবি' : 'Arabic' },
                { src: '/portfolio/furniture-1.png', title: lang === 'bn' ? 'ফার্নিচার ডিজাইন' : 'Furniture Design', category: '🪑 Furniture', desc: lang === 'bn' ? 'কাঠের কাজ' : 'Wood Work' },
                { src: '/portfolio/wood-art-1.png', title: lang === 'bn' ? 'উড আর্ট' : 'Wood Art', category: '🎨 CNC', desc: lang === 'bn' ? 'খোদাই' : 'Carving' },
                { src: '/portfolio/facebook-work-1.jpg', title: lang === 'bn' ? 'সোশ্যাল মিডিয়া' : 'Social Media', category: '📱 Social', desc: lang === 'bn' ? 'কনটেন্ট' : 'Content' },
              ].map((item, i) => (
                <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-[#141414] border border-[#333] hover:border-cyan-500/50 transition-all cursor-pointer" onClick={() => setPortfolioItem({ src: item.src, title: item.title })}>
                  <Image src={item.src} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <Badge className="bg-cyan-500/20 text-cyan-400 text-[10px] mb-1">{item.category}</Badge>
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Info */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolioCategories.map((cat, i) => (
                <div key={i} className={`p-4 rounded-xl bg-gradient-to-br ${cat.color} border border-[#333] text-center`}>
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <h4 className="text-white font-semibold text-sm">{cat.title}</h4>
                  <p className="text-gray-400 text-xs">{cat.count}</p>
                </div>
              ))}
            </div>

            {/* View More */}
            <div className="text-center mt-10">
              <a href="https://www.facebook.com/mdnajmulislam.taj.33" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                  {t.portfolio.viewMore}
                  <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 md:py-24" aria-labelledby="why-us-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-cyan-500/20 text-cyan-400 mb-4">{t.whyUs.badge}</Badge>
              <h2 id="why-us-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.whyUs.title} <span className="text-cyan-400">{t.whyUs.titleHighlight}</span> {t.whyUs.titleEnd}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.whyUs.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((item, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-[#141414] border border-[#333] hover:border-cyan-500/50 transition-all group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-cyan-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {trustBadges.map((badge, i) => (
                <div key={i} className="px-4 py-2 rounded-full bg-[#141414] border border-[#333] text-gray-300 text-sm">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-500/20 text-yellow-400 mb-4">{t.testimonials.badge}</Badge>
              <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.testimonials.title} <span className="text-cyan-400">{t.testimonials.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.testimonials.subtitle}
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative">
              {/* Main Carousel */}
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial, i) => (
                    <div key={i} className="w-full flex-shrink-0 px-4">
                      <Card className="bg-[#141414] border-[#333] hover:border-cyan-500/50 transition-all max-w-2xl mx-auto">
                        <CardContent className="p-8">
                          <Quote className="w-10 h-10 text-cyan-500/30 mb-4" aria-hidden="true" />
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, j) => (
                              <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                            ))}
                          </div>
                          <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-bold text-lg">{testimonial.name}</div>
                              <div className="text-gray-500">{testimonial.location}</div>
                            </div>
                            <Badge className="bg-cyan-500/20 text-cyan-400">{testimonial.service}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeTestimonial === i ? 'bg-cyan-400 w-8' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#141414] border border-[#333] text-white hover:border-cyan-500/50 transition-all hidden md:block"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#141414] border border-[#333] text-white hover:border-cyan-500/50 transition-all hidden md:block"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Trust Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '৫.০', label: lang === 'bn' ? 'গড় রেটিং' : 'Average Rating', icon: Star },
                { value: '৭,৫০০+', label: lang === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট' : 'Happy Clients', icon: User },
                { value: '৫০+', label: lang === 'bn' ? 'দেশে সেবা' : 'Countries Served', icon: Globe },
                { value: '১৭+', label: lang === 'bn' ? 'বছর অভিজ্ঞতা' : 'Years Experience', icon: Award },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-[#141414] border border-[#333]">
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-cyan-500/20 text-cyan-400 mb-4">{t.faq.badge}</Badge>
              <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.faq.title} <span className="text-cyan-400">{t.faq.titleHighlight}</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faq.map((item, i) => (
                <details key={i} className="group bg-[#141414] border border-[#333] rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                    <span className="text-white font-semibold pr-4">{item.q}</span>
                    <ChevronDown className="w-5 h-5 text-cyan-400 group-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-[#333]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            {/* Still have questions */}
            <div className="text-center mt-10 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 border border-cyan-500/30">
              <p className="text-white mb-4">{t.faq.stillQuestions}</p>
              <a href="https://wa.me/8801711731354" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t.faq.askWhatsApp}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-500/20 text-yellow-400 mb-4">{t.pricing.badge}</Badge>
              <h2 id="pricing-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.pricing.title} <span className="text-cyan-400">{t.pricing.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.pricing.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPackages.map((pkg, i) => (
                <Card 
                  key={i} 
                  className={`relative bg-[#141414] border-[#333] transition-all duration-300 ${
                    pkg.popular 
                      ? 'border-cyan-500 md:scale-105 shadow-xl shadow-cyan-500/10' 
                      : 'hover:border-cyan-500/50'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold">
                        <Star className="w-3 h-3 mr-1" aria-hidden="true" /> {pkg.popularBadge || (lang === 'bn' ? 'সেরা বিক্রিত' : 'Best Seller')}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 md:p-8">
                    <div className="text-4xl mb-4">{pkg.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      ৳{pkg.price}
                    </div>
                    
                    <ul className="space-y-3 mb-8" role="list">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-300">
                          <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a href="#contact">
                      <Button 
                        className={`w-full ${
                          pkg.popular 
                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold' 
                            : 'bg-[#333] hover:bg-[#444] text-white'
                        }`}
                      >
                        {pkg.cta || (lang === 'bn' ? 'এখনই শুরু করুন' : 'Start Now')}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CNC Special */}
            <div className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border border-yellow-500/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 mb-2">🏆 CNC {lang === 'bn' ? 'স্পেশাল' : 'Special'} - {lang === 'bn' ? '১০+ বছর এক্সপার্ট' : '10+ Years Expert'}</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">{lang === 'bn' ? '৩ডি সিএনসি ডিজাইন' : '3D CNC Design'}</h3>
                  <p className="text-gray-400">{lang === 'bn' ? 'যশোরের প্রথম সিএনসি মাস্টার। ৩ডি রিলিফ, ফার্নিচার, পোর্ট্রেট, মেটাল কাটিং ডিজাইন।' : "Jessore's first CNC Master. 3D Relief, Furniture, Portrait, Metal Cutting Design."}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">৳{lang === 'bn' ? '২,০০০ - ২০,০০০' : '2,000 - 20,000'}</div>
                  <p className="text-gray-400 text-sm">{lang === 'bn' ? 'ডিজাইনের জটিলতা অনুযায়ী' : 'Based on design complexity'}</p>
                </div>
                <a href="https://wa.me/8801711731354?text=সিএনসি%20ডিজাইন%20সম্পর্কে%20জানতে%20চাই" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-semibold">
                    {lang === 'bn' ? 'WhatsApp এ জানুন' : 'Learn on WhatsApp'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-cyan-500/20 text-cyan-400 mb-4">{t.contact.badge}</Badge>
              <h2 id="contact-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.contact.title} <span className="text-cyan-400">{t.contact.titleHighlight}</span> {t.contact.titleEnd}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 border border-cyan-500/30">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-cyan-500/50 flex-shrink-0">
                    <Image src="/taj-bhai.jpg" alt="Engineer Taj" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{lang === 'bn' ? 'ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ' : 'Engineer Md. Nazmul Islam Taj'}</h3>
                    <p className="text-cyan-400 text-sm">{t.about.badge}</p>
                    <p className="text-gray-400 text-xs mt-1">{lang === 'bn' ? '১৭+ বছর অভিজ্ঞতা | ৭,৫০০+ ক্লায়েন্ট' : '17+ Years Experience | 7,500+ Clients'}</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                    <div>
                      <strong className="text-white">⏰ {t.contact.responseTime}</strong>
                      <p className="text-gray-400 text-sm">{t.contact.responseNote}</p>
                    </div>
                  </div>
                </div>
                
                {[
                  { icon: Phone, title: t.contact.phone, value: '+৮৮০ ১৭১১-৭৩১৩৫৪', link: 'tel:+8801711731354' },
                  { icon: Mail, title: t.contact.email_label, value: 'concept11art@gmail.com', link: 'mailto:concept11art@gmail.com' },
                  { icon: MapPin, title: t.contact.office, value: lang === 'bn' ? 'পুরাতন কসবা, ঘোষপাড়া, যশোর সদর' : 'Puratan Kosba, Ghoshpara, Jessore Sadar', link: null },
                  { icon: Globe, title: t.contact.serviceArea, value: t.contact.serviceAreaValue, link: null }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#141414] border border-[#333] hover:border-cyan-500/50 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <item.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{item.title}</div>
                      {item.link ? (
                        <a href={item.link} className="text-white font-semibold hover:text-cyan-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white font-semibold">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Social Links */}
                <div className="flex gap-4 pt-4">
                  <a href="https://wa.me/8801711731354" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors group" aria-label="WhatsApp">
                    <MessageCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors group" aria-label="Facebook">
                    <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors group" aria-label="YouTube">
                    <svg className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="bg-[#141414] border-[#333]">
                <CardContent className="p-6 md:p-8">
                  {formSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-400" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">ধন্যবাদ!</h3>
                      <p className="text-gray-400">আপনার অনুরোধ সফলভাবে জমা হয়েছে। ইঞ্জিনিয়ার তাজ ভাই শীঘ্রই যোগাযোগ করবেন।</p>
                      <Button 
                        onClick={() => setFormSuccess(false)} 
                        variant="outline" 
                        className="mt-4 border-cyan-500 text-cyan-400"
                      >
                        আরেকটি অনুরোধ পাঠান
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                      <div>
                        <Label htmlFor="name" className="text-gray-300">আপনার নাম *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: undefined }); }}
                          className={`bg-[#0a0a0a] border-[#333] text-white focus:border-cyan-500 ${formErrors.name ? 'border-red-500' : ''}`}
                          placeholder="আপনার পুরো নাম"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? 'name-error' : undefined}
                        />
                        {formErrors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="mobile" className="text-gray-300">মোবাইল নম্বর *</Label>
                        <Input
                          id="mobile"
                          value={formData.mobile}
                          onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }); setFormErrors({ ...formErrors, mobile: undefined }); }}
                          className={`bg-[#0a0a0a] border-[#333] text-white focus:border-cyan-500 ${formErrors.mobile ? 'border-red-500' : ''}`}
                          placeholder="০১XXXXXXXXX"
                          aria-invalid={!!formErrors.mobile}
                          aria-describedby={formErrors.mobile ? 'mobile-error' : undefined}
                        />
                        {formErrors.mobile && <p id="mobile-error" className="text-red-400 text-sm mt-1">{formErrors.mobile}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">ইমেইল (ঐচ্ছিক)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: undefined }); }}
                          className={`bg-[#0a0a0a] border-[#333] text-white focus:border-cyan-500 ${formErrors.email ? 'border-red-500' : ''}`}
                          placeholder="example@email.com"
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                        />
                        {formErrors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="service" className="text-gray-300">সার্ভিস নির্বাচন *</Label>
                        <Select value={formData.service} onValueChange={(value) => { setFormData({ ...formData, service: value }); setFormErrors({ ...formErrors, service: undefined }); }}>
                          <SelectTrigger className={`bg-[#0a0a0a] border-[#333] text-white focus:border-cyan-500 ${formErrors.service ? 'border-red-500' : ''}`} aria-invalid={!!formErrors.service}>
                            <SelectValue placeholder="সার্ভিস নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#141414] border-[#333]">
                            {services.map((s, i) => (
                              <SelectItem key={i} value={s.title} className="text-white hover:bg-[#333]">
                                {s.icon} {s.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.service && <p className="text-red-400 text-sm mt-1">{formErrors.service}</p>}
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-gray-300">আপনার প্রয়োজন</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-[#0a0a0a] border-[#333] text-white focus:border-cyan-500 min-h-[100px]"
                          placeholder="আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন..."
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold py-6"
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" aria-hidden="true" />
                            পাঠানো হচ্ছে...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-5 h-5" aria-hidden="true" />
                            ফ্রি কনসালটেন্সি বুক করুন
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-[#222]" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & About */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-400 to-cyan-600 p-0.5">
                  <Image src="/logo.png" alt="NextGen Logo" fill className="object-cover rounded-lg" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">NextGen <span className="text-cyan-400">Digital</span></span>
                  <p className="text-xs text-gray-400">যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) এর ডিজিটাল স্টুডিও। ১৭+ বছরের অভিজ্ঞতায় আধুনিক ডিজিটাল সেবা।
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/8801711731354" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" aria-label="WhatsApp">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook Profile">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={`mailto:${socialLinks.email}`} className="text-gray-400 hover:text-red-400 transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href={`tel:${socialLinks.phone}`} className="text-gray-400 hover:text-green-400 transition-colors" aria-label="Phone">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-cyan-400 transition-colors">সার্ভিস</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-cyan-400 transition-colors">প্যাকেজ</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">সম্পর্কে</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">যোগাযোগ</a></li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-white font-semibold mb-4">পলিসি</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setPolicyModal('privacy')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    প্রাইভেসি পলিসি
                  </button>
                </li>
                <li>
                  <button onClick={() => setPolicyModal('terms')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    শর্তাবলী
                  </button>
                </li>
                <li>
                  <button onClick={() => setPolicyModal('refund')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    রিফান্ড পলিসি
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#222] text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} NextGen Digital Studio. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="text-gray-600 text-sm mt-2">
              ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) | যশোর, বাংলাদেশ
            </p>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      <Dialog open={!!policyModal} onOpenChange={() => setPolicyModal(null)}>
        <DialogContent className="bg-[#141414] border-[#333] text-white max-w-lg">
          {policyModal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  {(() => {
                    const Icon = policies[policyModal].icon;
                    return <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />;
                  })()}
                  {policies[policyModal].title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <ul className="space-y-3 mt-4">
                  {policies[policyModal].content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DialogDescription>
              <Button onClick={() => setPolicyModal(null)} className="mt-6 w-full bg-cyan-500 text-black hover:bg-cyan-400">
                বন্ধ করুন
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-28 right-6 z-50 w-12 h-12 rounded-full bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-all hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="উপরে যান"
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl bg-[#141414] border border-[#333] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4" role="dialog" aria-label="AI চ্যাট">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-black text-sm">বুদ্ধিদীপ্ত - AI সহায়িকা</div>
                    <div className="text-xs text-black/70 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                      সবসময় অনলাইন
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {/* History Button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-black/70 hover:text-black hover:bg-white/20 h-8 w-8"
                    aria-label="চ্যাট ইতিহাস"
                  >
                    <History className="w-4 h-4" aria-hidden="true" />
                  </Button>
                  {/* New Chat Button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={startNewChat}
                    className="text-black/70 hover:text-black hover:bg-white/20 h-8 w-8"
                    aria-label="নতুন চ্যাট"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </Button>
                  {/* Close Button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setChatOpen(false)}
                    className="text-black/70 hover:text-black hover:bg-white/20 h-8 w-8"
                    aria-label="চ্যাট বন্ধ করুন"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat History Panel */}
            {showHistory && (
              <div className="bg-[#0a0a0a] border-b border-[#333] max-h-48 overflow-y-auto">
                <div className="p-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">চ্যাট ইতিহাস</span>
                  {chatHistory.length > 0 && (
                    <button 
                      onClick={clearAllHistory}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      সব মুছুন
                    </button>
                  )}
                </div>
                {chatHistory.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">কোনো ইতিহাস নেই</div>
                ) : (
                  <div className="space-y-1 p-2">
                    {chatHistory.map((session) => (
                      <div 
                        key={session.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer group"
                      >
                        <div className="flex-1 min-w-0" onClick={() => loadChatSession(session)}>
                          <p className="text-sm text-white truncate">{session.title}</p>
                          <p className="text-xs text-gray-500">
                            {session.updatedAt.toLocaleDateString('bn-BD')}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteChatSession(session.id); }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Chat Messages */}
            <div className="h-72 overflow-y-auto p-3 space-y-3" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-2.5 rounded-2xl whitespace-pre-wrap text-sm ${
                      msg.role === 'user' 
                        ? 'bg-cyan-500 text-black rounded-br-sm' 
                        : 'bg-[#0a0a0a] text-white border border-[#333] rounded-bl-sm'
                    }`}>
                      <p>{msg.content}</p>
                    </div>
                    {/* Feedback & Share buttons for AI messages */}
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1 mt-1 ml-1">
                        {/* Feedback */}
                        <button
                          onClick={() => handleFeedback(msg.id, 'positive')}
                          className={`p-1 rounded transition-colors ${
                            msg.feedback === 'positive' 
                              ? 'text-green-400 bg-green-400/20' 
                              : 'text-gray-500 hover:text-green-400 hover:bg-green-400/10'
                          }`}
                          aria-label="ভালো উত্তর"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.id, 'negative')}
                          className={`p-1 rounded transition-colors ${
                            msg.feedback === 'negative' 
                              ? 'text-red-400 bg-red-400/20' 
                              : 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
                          }`}
                          aria-label="খারাপ উত্তর"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                        {/* Share */}
                        <div className="relative">
                          <button
                            onClick={() => setShowShareMenu(showShareMenu === msg.id ? null : msg.id)}
                            className="p-1 rounded text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                            aria-label="শেয়ার করুন"
                          >
                            <Share2 className="w-3 h-3" />
                          </button>
                          {showShareMenu === msg.id && (
                            <div className="absolute bottom-full left-0 mb-1 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-lg overflow-hidden flex">
                              <button
                                onClick={() => shareChat(msg, 'whatsapp')}
                                className="p-2 text-green-400 hover:bg-green-400/10"
                                title="WhatsApp"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => shareChat(msg, 'copy')}
                                className="p-2 text-gray-400 hover:bg-gray-400/10"
                                title="কপি করুন"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                        {/* Feedback confirmation */}
                        {msg.feedback && (
                          <span className="text-xs text-gray-500 ml-1">
                            {msg.feedback === 'positive' ? '✓ ধন্যবাদ!' : '✓ মন্তব্যের জন্য ধন্যবাদ'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0a0a0a] border border-[#333] p-2.5 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1" aria-label="টাইপ করছে...">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(reply.text)}
                  className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
                >
                  <span>{reply.icon}</span>
                  <span>{reply.text}</span>
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-[#333]">
              <form 
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }} 
                className="flex gap-2 items-center"
              >
                <div className="relative flex-1">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="আপনার প্রশ্ন লিখুন..."
                    className="w-full bg-[#0a0a0a] border-[#333] text-white focus:border-cyan-500 pr-10 text-sm"
                    aria-label="চ্যাট মেসেজ"
                    disabled={isLoading}
                  />
                  {/* Voice Input Button */}
                  {voiceSupported && (
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'text-gray-400 hover:text-cyan-400'
                      }`}
                      aria-label={isListening ? 'ভয়েস বন্ধ করুন' : 'ভয়েস ইনপুট'}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-black h-9 w-9 shrink-0"
                  disabled={isLoading || !inputMessage.trim()}
                  aria-label="মেসেজ পাঠান"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </Button>
              </form>
              {/* Voice status */}
              {isListening && (
                <div className="flex items-center gap-2 mt-2 text-xs text-cyan-400">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  বলুন... (বাংলা/ইংরেজি)
                </div>
              )}
            </div>
          </div>
        )}
        
        <Button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-14 h-14 rounded-full shadow-lg ${
            chatOpen 
              ? 'bg-[#333] hover:bg-[#444]' 
              : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 animate-pulse'
          } text-white shadow-cyan-500/25`}
          aria-label={chatOpen ? 'চ্যাট বন্ধ করুন' : 'AI চ্যাট খুলুন'}
          aria-expanded={chatOpen}
        >
          {chatOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Bot className="w-6 h-6" aria-hidden="true" />}
        </Button>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/8801711731354?text=হ্যালো%20ইঞ্জিনিয়ার%20তাজ%20ভাই"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 flex items-center justify-center transition-all hover:scale-110"
        aria-label="WhatsApp এ যোগাযোগ করুন"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Install App Floating Button - Always visible */}
      <button
        onClick={handleInstallApp}
        className="fixed bottom-24 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-all hover:scale-110 animate-pulse"
        aria-label={lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
        title={lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>

      {/* Install Instructions Modal for iOS/Safari */}
      <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
        <DialogContent className="max-w-sm bg-[#0a0a0a] border-[#333]">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-lg">
              {lang === 'bn' ? '📱 অ্যাপ ইনস্টল করুন' : '📱 Install App'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {isIOS ? (
              <>
                <p className="text-gray-300 text-sm text-center">
                  {lang === 'bn' 
                    ? 'আপনার iPhone/iPad এ NextGen অ্যাপ ইনস্টল করতে নিচের ধাপগুলো অনুসরণ করুন:' 
                    : 'Follow these steps to install NextGen app on your iPhone/iPad:'}
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141414] border border-[#333]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">১</span>
                    <div>
                      <p className="text-white font-medium">{lang === 'bn' ? 'শেয়ার বাটনে ট্যাপ করুন' : 'Tap Share Button'}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {lang === 'bn' ? 'নিচের মেনু থেকে ' : 'From the bottom menu, tap '}
                        <span className="inline-flex items-center text-cyan-400">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                          </svg>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141414] border border-[#333]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">২</span>
                    <div>
                      <p className="text-white font-medium">{lang === 'bn' ? '"হোম স্ক্রিনে যোগ করুন" নির্বাচন করুন' : 'Select "Add to Home Screen"'}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {lang === 'bn' ? 'স্ক্রল করে ' : 'Scroll and find '}
                        <span className="text-cyan-400">+ {lang === 'bn' ? 'হোম স্ক্রিনে যোগ করুন' : 'Add to Home Screen'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141414] border border-[#333]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">৩</span>
                    <div>
                      <p className="text-white font-medium">{lang === 'bn' ? '"যোগ" এ ট্যাপ করুন' : 'Tap "Add"'}</p>
                      <p className="text-gray-400 text-xs mt-1">{lang === 'bn' ? 'অ্যাপ আপনার হোম স্ক্রিনে যোগ হবে!' : 'App will be added to your home screen!'}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-300 text-sm text-center">
                  {lang === 'bn' 
                    ? 'আপনার ফোনে NextGen অ্যাপ ইনস্টল করতে নিচের ধাপগুলো অনুসরণ করুন:' 
                    : 'Follow these steps to install NextGen app on your phone:'}
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141414] border border-[#333]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">১</span>
                    <div>
                      <p className="text-white font-medium">{lang === 'bn' ? 'ব্রাউজার মেনু খুলুন' : 'Open Browser Menu'}</p>
                      <p className="text-gray-400 text-xs mt-1">{lang === 'bn' ? 'উপরে ডান কোণায় ⋮ বা ☰ এ ট্যাপ করুন' : 'Tap on ⋮ or ☰ at top right corner'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141414] border border-[#333]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">২</span>
                    <div>
                      <p className="text-white font-medium">{lang === 'bn' ? '"অ্যাপ ইনস্টল করুন" বা "Add to Home Screen" নির্বাচন করুন' : 'Select "Install App" or "Add to Home Screen"'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141414] border border-[#333]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">৩</span>
                    <div>
                      <p className="text-white font-medium">{lang === 'bn' ? '"ইনস্টল" এ ট্যাপ করুন' : 'Tap "Install"'}</p>
                      <p className="text-gray-400 text-xs mt-1">{lang === 'bn' ? 'অ্যাপ আপনার হোম স্ক্রিনে যোগ হবে!' : 'App will be added to your home screen!'}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <Button 
            onClick={() => setShowInstallModal(false)} 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
          >
            {lang === 'bn' ? 'বুঝেছি' : 'Got it'}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Portfolio Modal */}
      {portfolioItem && (
        <Dialog open={!!portfolioItem} onOpenChange={() => setPortfolioItem(null)}>
          <DialogContent className="max-w-4xl bg-[#0a0a0a] border-[#333]">
            <DialogHeader>
              <DialogTitle className="text-white">{portfolioItem.title}</DialogTitle>
              <DialogDescription className="sr-only">পোর্টফোলিও ছবি দেখুন</DialogDescription>
            </DialogHeader>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src={portfolioItem.src} alt={portfolioItem.title} fill className="object-cover" />
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://wa.me/8801711731354?text=এই%20ধরনের%20ডিজাইন%20দরকার" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  WhatsApp এ জানুন
                </Button>
              </a>
              <Button variant="outline" onClick={() => setPortfolioItem(null)} className="flex-1 border-[#333] text-gray-300 hover:bg-[#1a1a1a]">
                বন্ধ করুন
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
    </div>
  );
}
