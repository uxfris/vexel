import Image from "next/image";
import Link from "next/link";

export default function Brand({ className }: { className: string }) {
  return (
    <Link href="/">
      <Image
        src="/images/logo.svg"
        alt="Vexel"
        width={80}
        height={80}
        className={className}
      />
    </Link>
  );
}
