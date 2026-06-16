import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
};

const StamploLogo = ({ width = 144, height = 41, className, style }: Props) => {
  return (
    <Image
      src="/images/textLogo.svg"
      alt="Stamplo"
      width={width}
      height={height}
      className={className}
      style={style}
      priority
    />
  );
};

export default StamploLogo;
};

export default StamploLogo;
