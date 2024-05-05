import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="w-auto"
      height={130}
      width={130}
      alt="logo"
      src="/images/IKAG_Short.png"
    />
  );
};

export default Logo;
