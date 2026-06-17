import Image from "next/image";

const StamploLogo = () => {
  return (
    <Image
      src="/images/textLogo.svg"
      alt="Stamplo"
      width={144}
      height={41}
      priority
    />
  );
};

export default StamploLogo;
