import {
  Bell,
  BicepsFlexed,
  Grid,
  LogOut,
  Settings,
  Target,
} from "lucide-react";
import { FaDumbbell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    index: 0,
    name: "Dashboard",
    path: "/dashboard",
    icon: <Grid size={18} />,
  },
  {
    index: 1,
    name: "Fitness Program",
    path: "/dashboard/program",
    icon: <BicepsFlexed size={18} />,
  },
  {
    index: 3,
    name: "Meditation",
    path: "/dashboard/meditation",
    icon: <Bell size={18} />,
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(`${path}`);
  };

  const handleSettingsClick = () => {
    // Add your settings navigation logic here
    console.log("Settings clicked");
  };

  const handleLogoutClick = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  const handleTrackGoalsClick = () => {
    // Add your track goals logic here
    console.log("Track Goals clicked");
  };

  return (
    <div
      className="w-[16%] h-screen bg-white border-r border-slate-200 
     flex flex-col justify-between"
    >
      {/* Header Section */}
      <div className="px-4 py-6">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-8 pb-4 border-b border-slate-200">
          <FaDumbbell />
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            SouthFit
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.index}
                type="button"
                onClick={() => handleClick(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#dfe068]/20 to-[#c5cc5a]/20 border border-[#dfe068]/30 text-[#dfe068] "
                    : "text-slate-600 hover:bg-primary/60 hover:text-white"
                }`}
              >
                <div
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-[#dfe068]"
                      : "text-slate-500 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-6">
        {/* Track Goals Button */}
        <button
          onClick={handleTrackGoalsClick}
          className="w-full bg-gradient-to-r from-[#dfe068] to-[#c5cc5a] hover:from-[#c5cc5a] hover:to-[#b8b84d] text-slate-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
        >
          <Target className="w-5 h-5" />
          <span className="text-sm">Track Goals</span>
        </button>

        {/* Settings and Logout */}
        <div className=" border-t border-slate-200 pt-4">
          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-slate-700 group"
          >
            <Settings className="w-5 h-5 transition-colors duration-300 group-hover:text-slate-700" />
            <span className="font-medium">Settings</span>
          </button>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-slate-700 group"
          >
            <LogOut className="w-5 h-5 transition-colors duration-300 group-hover:text-slate-700" />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
