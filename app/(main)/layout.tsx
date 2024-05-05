import { ReactNode } from "react";
import NavbarMain from "./_components/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col mt-[75px]">
      <NavbarMain />
      <div className="flex-1">
        <main className="pt-0 h-full pl-5 pr-0">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
