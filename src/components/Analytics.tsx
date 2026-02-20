// Analytics — loads GA4 and Microsoft Clarity in production only
// Set NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_CLARITY_ID in your Vercel environment variables

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function Analytics() {
  // Only render analytics in production and when IDs are configured
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* ── Google Analytics 4 ── */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* ── Microsoft Clarity ── */}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}

// ─── Event Tracking Helpers ───────────────────────────────────────────────────
// Import and call these from your components to track key interactions.

type GtagFunction = (command: string, action: string, params?: Record<string, string | number | boolean>) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      ...(label && { event_label: label }),
      ...(value !== undefined && { value }),
    });
  }
}

export function trackCTAClick(label: string) {
  trackEvent("cta_click", "engagement", label);
}

export function trackFormSubmit(formName: string) {
  trackEvent("form_submit", "conversion", formName);
}

export function trackSectionView(sectionName: string) {
  trackEvent("section_view", "engagement", sectionName);
}
