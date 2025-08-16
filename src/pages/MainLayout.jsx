import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
