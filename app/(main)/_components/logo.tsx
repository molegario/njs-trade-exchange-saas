import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image
        className="w-auto hidden md:block"
        fill
        alt="logo"
        src="/images/IKAG_Logo.png"
      />
      <Image
        className="w-auto block md:hidden max-w-[74px]"
        fill
        alt="logo"
        src="/images/IKAG_Short.png"
      />
    </>
  );
};

export default Logo;
