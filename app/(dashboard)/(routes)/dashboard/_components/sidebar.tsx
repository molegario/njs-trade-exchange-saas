// import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
// import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  // const router = useRouter();
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 flex items-center justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        {/* <SidebarRoutes /> */}
      </div>
    </div>
  );
};

export default Sidebar;
