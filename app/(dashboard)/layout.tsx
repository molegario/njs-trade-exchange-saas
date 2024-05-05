import { ReactNode } from "react";
import NavbarMain from "./(routes)/dashboard/_components/navbar";
import Sidebar from "./(routes)/dashboard/_components/sidebar";
// import NavbarMain from "../(main)/_components/navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        
        <NavbarMain />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
