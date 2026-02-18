'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';

// Google Analytics 4 Measurement ID
// Set NEXT_PUBLIC_GA_ID in your .env file with your actual GA4 measurement ID
// Example: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Check if GA is enabled (has valid ID)
const isGAEnabled = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith('G-') && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

// Declare gtag function type
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetIdOrParams: string | Record<string, unknown>,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

// Track page views
export function usePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGAEnabled || typeof window === 'undefined' || !window.gtag) return;
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);
}

// Track events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (!isGAEnabled || typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// Track form submissions
export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', 'engagement', formName);
}

// Track button clicks
export function trackButtonClick(buttonName: string) {
  trackEvent('click', 'button', buttonName);
}

// Track WhatsApp clicks
export function trackWhatsAppClick(source: string) {
  trackEvent('whatsapp_click', 'contact', source);
}

// Track service views
export function trackServiceView(serviceName: string) {
  trackEvent('view_item', 'services', serviceName);
}

// Track chat interactions
export function trackChatInteraction(type: 'open' | 'message' | 'close') {
  trackEvent(`chat_${type}`, 'ai_chatbot');
}

// Track language switch
export function trackLanguageSwitch(language: 'bn' | 'en') {
  trackEvent('language_switch', 'engagement', language);
}

// Track theme change
export function trackThemeChange(theme: 'light' | 'dark') {
  trackEvent('theme_change', 'engagement', theme);
}

// Track scroll depth
export function trackScrollDepth(percentage: number) {
  trackEvent('scroll', 'engagement', `${percentage}%`, percentage);
}

// Track time on page
export function trackTimeOnPage(seconds: number) {
  trackEvent('time_on_page', 'engagement', undefined, seconds);
}

export default function GoogleAnalytics() {
  // Don't render if GA is not configured
  if (!isGAEnabled) return null;

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
