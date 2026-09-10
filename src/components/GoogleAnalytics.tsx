import Script from "next/script";

import { SITE } from "@/config/site";
import { ANALYTICS_PATHS } from "@/lib/analytics-schema";
import { serializeJson } from "@/lib/serialize-json";

export default function GoogleAnalytics() {
    const gaId = SITE.googleAnalyticsId;

    return (
        <>
            {gaId ? (
                <>
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`(function () {
var path = window.location.pathname;
if (!path.endsWith('/')) path += '/';
if (!${serializeJson(ANALYTICS_PATHS)}.includes(path)) return;
window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', ${serializeJson(gaId)}, {
    send_page_view: false,
    page_location: ${serializeJson(SITE.url)} + path,
    page_referrer: '',
    allow_google_signals: false,
    allow_ad_personalization_signals: false
});
window.gtag('event', 'page_view', {
    page_location: ${serializeJson(SITE.url)} + path,
    page_referrer: ''
});
})();`}
                    </Script>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                </>
            ) : null}
        </>
    );
}
