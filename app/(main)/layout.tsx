import { ReactNode } from "react";
import NavbarMain from "./_components/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <NavbarMain />
      <div className="flex-1">
        <main className="pt-8 h-full px-5">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
