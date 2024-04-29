import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="w-auto"
      fill
      alt="logo"
      src="/images/logo_inag.svg"
    />
  );
};

export default Logo;
