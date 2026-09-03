import { FaWhatsapp } from "react-icons/fa";

import WhatsAppLink from "./WhatsAppLink";

export default function WhatsAppFloat() {
    return (
        <WhatsAppLink
            className="whatsapp-float"
            source="floating_button"
            aria-label="Consultar disponibilidad por WhatsApp"
            title="Consultar disponibilidad por WhatsApp"
        >
            <FaWhatsapp size={30} aria-hidden="true" />
        </WhatsAppLink>
    );
}
