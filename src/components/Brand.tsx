import Image from "next/image";

type BrandProps = {
    priority?: boolean;
};

export default function Brand({ priority = false }: BrandProps) {
    return (
        <span className="brand" aria-label="Poπ">
            <Image
                src="/logo-popi.png"
                alt="Poπ"
                width={240}
                height={80}
                className="brand__logo"
                priority={priority}
            />
        </span>
    );
}
