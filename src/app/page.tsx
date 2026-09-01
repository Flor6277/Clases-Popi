import About from "@/components/About";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import Testimonials from "@/components/Testimonials";
import Modality from "@/components/Modality";
import Navbar from "@/components/Navbar";
import Needs from "@/components/Needs";
import Services from "@/components/Services";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Needs />
                <Modality />
                <Method />
                <Testimonials />
                <Faq />
                <Contact />
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    );
}
