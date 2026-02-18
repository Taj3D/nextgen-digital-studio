'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/components/GoogleAnalytics';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  section: string;
  href: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Searchable content
const searchContent = {
  bn: [
    { id: '1', title: 'এআই এজেন্ট', description: 'নেক্সট-জেনারেশন AI পাওয়ার্ড বিজনেস অটোমেশন', section: 'সার্ভিস', href: '#services' },
    { id: '2', title: 'মোবাইল অ্যাপ', description: 'এন্টারপ্রাইজ-গ্রেড iOS ও Android অ্যাপ', section: 'সার্ভিস', href: '#services' },
    { id: '3', title: 'ওয়েবসাইট', description: 'এফিলিয়েট ও বিজনেস ওয়েব সলিউশন', section: 'সার্ভিস', href: '#services' },
    { id: '4', title: '৩ডি সিএনসি ডিজাইন', description: 'হাই-প্রিসিশন CNC মাস্টারপিস', section: 'সার্ভিস', href: '#services' },
    { id: '5', title: 'সোশ্যাল মিডিয়া', description: 'ডেটা-ড্রিভেন সোশ্যাল গ্রোথ সলিউশন', section: 'সার্ভিস', href: '#services' },
    { id: '6', title: 'ভিডিও প্রোডাকশন', description: 'সিনেম্যাটিক ভিডিও কনটেন্ট', section: 'সার্ভিস', href: '#services' },
    { id: '7', title: 'গ্রাফিক ডিজাইন', description: 'স্টানিং ব্র্যান্ড আইডেন্টিটি', section: 'সার্ভিস', href: '#services' },
    { id: '8', title: 'ডিজিটাল মার্কেটিং', description: 'ROI-ফোকাসড ডিজিটাল গ্রোথ', section: 'সার্ভিস', href: '#services' },
    { id: '9', title: 'সিলভার প্যাকেজ', description: '৪,৯৯৯ টাকা - প্রোমো ভিডিও, চ্যাটবট', section: 'প্রাইসিং', href: '#pricing' },
    { id: '10', title: 'গোল্ড প্যাকেজ', description: '১৪,৯৯৯ টাকা - ল্যান্ডিং পেজ, AI সিস্টেম', section: 'প্রাইসিং', href: '#pricing' },
    { id: '11', title: 'প্লাটিনাম প্যাকেজ', description: '২৫,০০০+ টাকা - ফুল ওয়েবসাইট/অ্যাপ', section: 'প্রাইসিং', href: '#pricing' },
    { id: '12', title: 'তাজ ভাই', description: 'যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার, ১৭+ বছর অভিজ্ঞতা', section: 'সম্পর্কে', href: '#about' },
    { id: '13', title: 'যোগাযোগ', description: 'ফোন: ০১৭১১৭৩১৩৫৪, WhatsApp এ চ্যাট', section: 'যোগাযোগ', href: '#contact' },
    { id: '14', title: 'পোর্টফোলিও', description: '৭,৫০০+ সফল প্রজেক্টের নমুনা', section: 'পোর্টফোলিও', href: '#portfolio' },
    { id: '15', title: 'ক্লায়েন্ট রিভিউ', description: '৭,৫০০+ সন্তুষ্ট ক্লায়েন্টের মতামত', section: 'টেস্টিমোনিয়াল', href: '#testimonials' },
    { id: '16', title: 'FAQ', description: 'সাধারণ প্রশ্ন ও উত্তর', section: 'FAQ', href: '#faq' },
  ],
  en: [
    { id: '1', title: 'AI Agent', description: 'Next-Generation AI-Powered Business Automation', section: 'Services', href: '#services' },
    { id: '2', title: 'Mobile App', description: 'Enterprise-Grade iOS & Android Apps', section: 'Services', href: '#services' },
    { id: '3', title: 'Website', description: 'High-Performance Business Web Solutions', section: 'Services', href: '#services' },
    { id: '4', title: '3D CNC Design', description: 'High-Precision CNC Masterpieces', section: 'Services', href: '#services' },
    { id: '5', title: 'Social Media', description: 'Data-Driven Social Growth Solutions', section: 'Services', href: '#services' },
    { id: '6', title: 'Video Production', description: 'Cinematic Video Content Creation', section: 'Services', href: '#services' },
    { id: '7', title: 'Graphic Design', description: 'Stunning Brand Identity Design', section: 'Services', href: '#services' },
    { id: '8', title: 'Digital Marketing', description: 'ROI-Focused Digital Growth', section: 'Services', href: '#services' },
    { id: '9', title: 'Silver Package', description: '৳4,999 - Promo Video, Chatbot', section: 'Pricing', href: '#pricing' },
    { id: '10', title: 'Gold Package', description: '৳14,999 - Landing Page, AI System', section: 'Pricing', href: '#pricing' },
    { id: '11', title: 'Platinum Package', description: '৳25,000+ - Full Website/App', section: 'Pricing', href: '#pricing' },
    { id: '12', title: 'Taj Bhai', description: "First Digital Engineer of Jessore, 17+ years experience", section: 'About', href: '#about' },
    { id: '13', title: 'Contact', description: 'Phone: +8801711731354, WhatsApp Chat', section: 'Contact', href: '#contact' },
    { id: '14', title: 'Portfolio', description: 'Samples of 7,500+ successful projects', section: 'Portfolio', href: '#portfolio' },
    { id: '15', title: 'Client Reviews', description: 'Feedback from 7,500+ satisfied clients', section: 'Testimonials', href: '#testimonials' },
    { id: '16', title: 'FAQ', description: 'Frequently Asked Questions', section: 'FAQ', href: '#faq' },
  ]
};

const recentSearches: Record<'bn' | 'en', string[]> = {
  bn: ['এআই চ্যাটবট', 'ওয়েবসাইট মূল্য', 'সিএনসি ডিজাইন'],
  en: ['AI Chatbot', 'Website Price', 'CNC Design']
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const content = searchContent[language];
  const recentDefault = recentSearches[language];
  
  // Lazy initialization for recent searches
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === 'undefined') return recentDefault;
    const saved = localStorage.getItem('nextgen_recent_searches');
    if (saved) {
      try {
        return JSON.parse(saved).slice(0, 5);
      } catch {
        return recentDefault;
      }
    }
    return recentDefault;
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Use useMemo for derived search results
  const results = useMemo(() => {
    if (query.length < 2) return [];
    return content.filter(
      item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, content]);

  const handleSearch = (searchQuery: string) => {
    // Save to recent searches
    const updatedRecent = [searchQuery, ...recent.filter(s => s !== searchQuery)].slice(0, 5);
    setRecent(updatedRecent);
    localStorage.setItem('nextgen_recent_searches', JSON.stringify(updatedRecent));

    // Track search
    trackEvent('search', 'engagement', searchQuery);

    // Trigger search
    setQuery(searchQuery);
  };

  const handleResultClick = (result: SearchResult) => {
    // Track result click
    trackEvent('search_result_click', 'engagement', result.title);

    // Save search
    handleSearch(result.title);

    // Close modal
    onClose();
    
    // Navigate using router
    setTimeout(() => {
      window.location.href = result.href;
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'bn' ? 'কী খুঁজছেন?...' : 'What are you looking for?...'}
            className="flex-1 bg-transparent border-none outline-none text-lg dark:text-white placeholder-gray-400"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-96 overflow-y-auto p-4">
          {results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {language === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'} ({results.length})
              </p>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-medium dark:text-white">{result.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{result.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 px-2 py-1 rounded-full">
                      {result.section}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          ) : query.length < 2 ? (
            <div className="space-y-4">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Clock className="w-4 h-4" />
                  {language === 'bn' ? 'সাম্প্রতিক অনুসন্ধান' : 'Recent Searches'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {recent.map((search, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-gray-300"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  {language === 'bn' ? 'জনপ্রিয় অনুসন্ধান' : 'Popular Searches'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(language === 'bn' 
                    ? ['ওয়েবসাইট', 'এআই এজেন্ট', 'সিএনসি', 'মোবাইল অ্যাপ']
                    : ['Website', 'AI Agent', 'CNC', 'Mobile App']
                  ).map((search, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-300 rounded-full text-sm hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'bn' 
                  ? `"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি` 
                  : `No results found for "${query}"`}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            {language === 'bn' 
              ? '🔍 সার্ভিস, প্যাকেজ, বা তথ্য খুঁজুন' 
              : '🔍 Search for services, packages, or information'}
          </p>
        </div>
      </div>
    </div>
  );
}
