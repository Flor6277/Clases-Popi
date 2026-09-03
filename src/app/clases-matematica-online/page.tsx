import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServicePage } from "@/config/services";

const service = getServicePage("clases-matematica-online");

export const metadata: Metadata = {
    title: service?.seoTitle,
    description: service?.seoDescription,
    alternates: {
        canonical: "/clases-matematica-online/",
    },
    openGraph: {
        title: service?.seoTitle,
        description: service?.seoDescription,
        url: "/clases-matematica-online/",
        type: "website",
        images: ["/opengraph-image"],
    },
    twitter: {
        card: "summary_large_image",
        title: service?.seoTitle,
        description: service?.seoDescription,
        images: ["/opengraph-image"],
    },
};

export default function Page() {
    let page = null;

    if (service) {
        page = <ServiceDetailPage service={service} />;
    } else {
        notFound();
    }

    return page;
}
