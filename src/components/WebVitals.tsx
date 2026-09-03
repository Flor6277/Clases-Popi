"use client";

import { useReportWebVitals } from "next/web-vitals";

import { sendAnalyticsEvent } from "@/lib/analytics";

type WebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const CORE_WEB_VITALS = new Set(["CLS", "INP", "LCP"]);

const reportWebVitals: WebVitalsCallback = (metric) => {
    if (CORE_WEB_VITALS.has(metric.name)) {
        sendAnalyticsEvent({
            event: `web_vital_${metric.name.toLowerCase()}`,
            source: metric.id,
            pathname: window.location.pathname,
            value: metric.value,
            rating: metric.rating,
        });
    }
};

export default function WebVitals() {
    useReportWebVitals(reportWebVitals);

    return null;
}
