import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl } from "@/config/site";

export default function WhatsAppFloat() {
    return (
        <a
            className="whatsapp-float"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Consultar por WhatsApp"
            title="Consultar por WhatsApp"
        >
            <FaWhatsapp size={30} aria-hidden="true" />
        </a>
    );
}
