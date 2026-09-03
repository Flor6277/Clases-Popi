"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { getWhatsAppUrl } from "@/config/site";
import { sendAnalyticsEvent } from "@/lib/analytics";

type WhatsAppLinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick"
> & {
    children: ReactNode;
    source: string;
    message?: string;
};

export default function WhatsAppLink({
    children,
    source,
    message,
    ...props
}: WhatsAppLinkProps) {
    const href = getWhatsAppUrl(message);

    const handleClick = () => {
        sendAnalyticsEvent({
            event: "whatsapp_click",
            source,
            pathname: window.location.pathname,
        });
    };

    return (
        <a
            {...props}
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
        >
            {children}
        </a>
    );
}
