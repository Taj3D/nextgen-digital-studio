'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function SkipToContent() {
  const { language } = useLanguage();

  const text = language === 'bn' 
    ? 'মূল বিষয়ে যান' 
    : 'Skip to main content';

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all"
      onClick={(e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      {text}
    </a>
  );
}
