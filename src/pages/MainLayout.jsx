import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";

const MainLayout = () => {
  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
