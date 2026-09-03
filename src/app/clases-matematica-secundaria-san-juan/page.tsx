import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServicePage } from "@/config/services";

const service = getServicePage("clases-matematica-secundaria-san-juan");

export const metadata: Metadata = {
    title: service?.seoTitle,
    description: service?.seoDescription,
    alternates: {
        canonical: "/clases-matematica-secundaria-san-juan/",
    },
    openGraph: {
        title: service?.seoTitle,
        description: service?.seoDescription,
        url: "/clases-matematica-secundaria-san-juan/",
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
