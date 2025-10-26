import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const SidebarLayout = () => {
  return (
    <div className="flex items-center justify-start ">
      <Sidebar />
      <main className="md:pl-[215px] p-2 md:pt-2 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
