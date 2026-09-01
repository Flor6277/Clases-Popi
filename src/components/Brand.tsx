import Image from "next/image";

export default function Brand() {
    return (
        <span className="brand" aria-label="Poπ">
            <Image
                src="/logo-popi.png"
                alt="Poπ"
                width={240}
                height={180}
                className="brand__logo"
                priority
            />
        </span>
    );
}
