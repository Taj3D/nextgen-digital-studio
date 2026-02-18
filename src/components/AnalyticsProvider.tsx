'use client';

import Script from 'next/script';

// Microsoft Clarity Project ID
// Set NEXT_PUBLIC_CLARITY_ID in your .env file
// Get your ID from: https://clarity.microsoft.com/
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

// Hotjar Site ID
// Set NEXT_PUBLIC_HOTJAR_ID in your .env file
// Get your ID from: https://www.hotjar.com/
const HOTJAR_SITE_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';

// Check if analytics are enabled
const isClarityEnabled = CLARITY_PROJECT_ID && CLARITY_PROJECT_ID.length > 5;
const isHotjarEnabled = HOTJAR_SITE_ID && HOTJAR_SITE_ID.length > 3;

export default function AnalyticsProvider() {
  return (
    <>
      {/* Microsoft Clarity - Heatmaps & Session Recordings */}
      {isClarityEnabled && (
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}

      {/* Hotjar Tracking */}
      {isHotjarEnabled && (
        <Script id="hotjar-script" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${HOTJAR_SITE_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}
    </>
  );
}
