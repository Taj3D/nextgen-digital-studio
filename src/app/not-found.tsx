'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, MessageCircle, Search } from 'lucide-react';
import { useMemo } from 'react';

export default function NotFound() {
  const isDark = useMemo(() => {
    if (typeof window === 'undefined') return true;
    const theme = localStorage.getItem('nextgen_theme');
    return theme !== 'light';
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="text-center px-4 max-w-2xl">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <h1 className={`text-[180px] md:text-[250px] font-bold ${
            isDark ? 'text-gray-800' : 'text-gray-200'
          } leading-none select-none`}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className={`w-24 h-24 md:w-32 md:h-32 ${
              isDark ? 'text-cyan-500' : 'text-cyan-600'
            } animate-pulse`} />
          </div>
        </div>

        {/* Error Message */}
        <h2 className={`text-2xl md:text-4xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>
        <p className={`text-lg mb-8 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          দুঃখিত, আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className={`${
              isDark 
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
            } px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
              <Home className="w-5 h-5 mr-2" />
              হোমপেজে যান
            </Button>
          </Link>

          <Link href="/#contact">
            <Button variant="outline" className={`px-8 py-6 text-lg rounded-xl ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}>
              <MessageCircle className="w-5 h-5 mr-2" />
              যোগাযোগ করুন
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className={`mt-12 p-6 rounded-2xl ${
          isDark ? 'bg-gray-800/50' : 'bg-gray-100'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            জনপ্রিয় পেজ:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'সার্ভিস', href: '/#services' },
              { name: 'প্রাইসিং', href: '/#pricing' },
              { name: 'পোর্টফোলিও', href: '/#portfolio' },
              { name: 'যোগাযোগ', href: '/#contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-4 rounded-lg text-center transition-colors ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-cyan-600 text-gray-300 hover:text-white' 
                    : 'bg-white hover:bg-cyan-500 text-gray-700 hover:text-white shadow-sm'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className={`mt-8 inline-flex items-center gap-2 ${
            isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
          } transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          আগের পেজে ফিরে যান
        </button>
      </div>
    </div>
  );
}
