"use client";

import { useReportWebVitals } from "next/web-vitals";

import { sendAnalyticsEvent } from "@/lib/analytics";
import type { VitalEvent } from "@/lib/analytics-schema";

type WebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const CORE_WEB_VITALS: Record<string, VitalEvent | undefined> = {
    CLS: "web_vital_cls",
    INP: "web_vital_inp",
    LCP: "web_vital_lcp",
};

const reportWebVitals: WebVitalsCallback = (metric) => {
    const event = CORE_WEB_VITALS[metric.name];
    if (event) {
        sendAnalyticsEvent({
            event,
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
