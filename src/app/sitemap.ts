import type { MetadataRoute } from "next";

import { SERVICE_PAGES } from "@/config/services";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const servicePages: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
        url: `${SITE.url}/${service.slug}/`,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [
        {
            url: `${SITE.url}/`,
            changeFrequency: "monthly",
            priority: 1,
        },
        ...servicePages,
    ];
}
