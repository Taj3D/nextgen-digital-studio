"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * AnalyticsPixels — installs client-side tracking pixels on every page.
 *
 * Pixels:
 * 1. Google Analytics 4 (GA4)      — NEXT_PUBLIC_GA4_ID
 * 2. Facebook/Meta Pixel            — NEXT_PUBLIC_FB_PIXEL_ID
 * 3. Snapchat Pixel                 — NEXT_PUBLIC_SNAP_PIXEL_ID
 * 4. TikTok Pixel                   — NEXT_PUBLIC_TIKTOK_PIXEL_ID
 *
 * Server-side Conversions API (CAPI) tracking is in src/lib/tracking.ts.
 */

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-QF7TJBHR7Z";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export function AnalyticsPixels() {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}',{send_page_view:true});`}
      </Script>

      {/* Facebook / Meta Pixel */}
      {FB_PIXEL_ID && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt="Facebook Pixel Tracking"
            />
          </noscript>
        </>
      )}

      {/* Snapchat Pixel */}
      {SNAP_PIXEL_ID && (
        <Script id="snap-pixel" strategy="afterInteractive">
          {`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');snaptr('init','${SNAP_PIXEL_ID}');snaptr('track','PAGE_VIEW');`}
        </Script>
      )}

      {/* TikTok Pixel */}
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page();}(window,document,'ttq');`}
        </Script>
      )}

      {/* Route-change pageview tracking for all 4 pixels.
          Next.js App Router is an SPA — without this, only the initial
          page load is tracked. Every navigation needs an explicit pageview. */}
      <PageViewTracker />
    </>
  );
}

/**
 * PageViewTracker — fires a pageview event on every route change for all
 * 4 analytics pixels (GA4, Facebook, Snapchat, TikTok).
 *
 * Mounted once inside <AnalyticsPixels /> so it lives at the layout level
 * and persists across navigations.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Build the full URL (pathname + search params) for accurate tracking.
    const search = searchParams?.toString();
    const url = pathname + (search ? `?${search}` : "");

    // GA4 — config with page_path sends a pageview.
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("config", GA4_ID, { page_path: url });

    // Facebook Pixel — track PageView (fbq is already initialised).
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.("track", "PageView");

    // Snapchat — track PAGE_VIEW.
    const snaptr = (window as unknown as { snaptr?: (...args: unknown[]) => void }).snaptr;
    snaptr?.("track", "PAGE_VIEW");

    // TikTok — ttq.page() sends a pageview.
    const ttq = (window as unknown as { ttq?: { page?: () => void } }).ttq;
    ttq?.page?.();
  }, [pathname, searchParams]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Client-side event trackers                                                */
/* -------------------------------------------------------------------------- */

type SnapEvent =
  | "PAGE_VIEW"
  | "VIEW_CONTENT"
  | "ADD_CART"
  | "ADD_BILLING"
  | "SIGN_UP"
  | "PURCHASE"
  | "SUBSCRIBE";

type TikTokEvent =
  | "ViewContent"
  | "AddToCart"
  | "AddPaymentInfo"
  | "InitiateCheckout"
  | "PlaceAnOrder"
  | "CompleteRegistration"
  | "Purchase"
  | "Search"
  | "AddToWishlist";

type FBEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "Subscribe";

export function trackFBEvent(event: FBEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  fbq?.("track", event, params ?? {});
}

export function trackSnapEvent(event: SnapEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const snaptr = (window as unknown as { snaptr?: (...args: unknown[]) => void }).snaptr;
  snaptr?.("track", event, params ?? {});
}

export function trackTikTokEvent(event: TikTokEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const ttq = (window as unknown as { ttq?: { track?: (e: string, p?: Record<string, unknown>) => void } }).ttq;
  ttq?.track?.(event, params ?? {});
}
