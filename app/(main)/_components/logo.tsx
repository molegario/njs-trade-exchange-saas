import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="w-auto"
      fill
      alt="logo"
      src="/images/IKAG_Logo.png"
    />
  );
};

export default Logo;
