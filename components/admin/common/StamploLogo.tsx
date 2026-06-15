import Image from "next/image";

export default function StamploLogo() {
  return (
    <Image
      src="/images/textLogo.svg"
      alt="Stamplo"
      width={144}
      height={41}
      priority
    />
  );
}
