import { Bell, Grid, LogOut, Settings } from "lucide-react";
import { GrDocumentDownload } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    index: 0,
    name: "Dashboard",
    path: "/dashboard",
    icon: <Grid size={12} />,
  },
  {
    index: 1,
    name: "Fitness Program",
    path: "/dashboard/program",
    icon: <GrDocumentDownload size={12} />,
  },
  // { index: 2, name: "Workout", path: "/workouts", icon: <List size={12} /> },
  {
    index: 3,
    name: "Notifications",
    path: "/notifications",
    icon: <Bell size={12} />,
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`${path}`);
  };

  return (
    <div className="w-[15%]  h-screen px-5 justify-between flex flex-col  ">
      <div className=" ">
        <p className="font-semibold mt-4 mb-6 ">SouthFit</p>

        <div>
          {menuItems.map((item, i) => {
            return (
              <button
                type="button"
                onClick={() => handleClick(item.path)}
                key={i}
                className="flex items-center mb-2 gap-2 cursor-pointer"
              >
                <div>{item.icon}</div>
                <p>{item?.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <button className="bg-[#dfe068] w-full py-2 rounded-full text-white font-semibold mb-2 ">
          Track Goals
        </button>
        <div className="flex items-center my-2 gap-2">
          <Settings size={12} />
          <p>Settings</p>
        </div>
        <div className="flex items-center mb-2 gap-2">
          <LogOut size={12} />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
