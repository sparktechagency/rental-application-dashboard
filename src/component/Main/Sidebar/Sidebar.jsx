/* eslint-disable react/prop-types */
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import logo from "../../../assets/logo/logo.png";
import { CalendarCheck, Car } from "lucide-react";

const sidebarItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LuLayoutDashboard className="size-7" />,
  },
  {
    path: "/booking",
    name: "Booking",
    icon: <CalendarCheck className="size-7" />,
  },
  {
    path: "/manual-booking",
    name: "Manual Booking",
    icon: <CalendarCheck className="size-7" />,
  },
  {
    path: "/earning",
    name: "Earning",
    icon: <IoWalletOutline className="size-7" />,
  },
  {
    path:"/vehicles",
    name: "Vehicles",
    icon: <Car className="size-7" />,
  },
  {
    path: "/all-users",
    name: "Users",
    icon: <PiUsers className="size-7" />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline className="size-7" />,
  },
];

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-full md:h-screen ${
          isSidebarOpen ? "w-[300px]" : "w-[80px]"
        } shadow-md transition-all bg-[#FEFEFE]  duration-300 overflow-auto`}
      >
        {/* Sidebar Logo */}
        <div className="flex justify-center border-b border-[#E5E5E5]">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all ${
              isSidebarOpen ? "size-32" : "w-16 h-16"
            }`}
          />
        </div>

        <div className="flex flex-col gap-4 py-3">
          {/* Sidebar Menu */}
          <ul className="w-full flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "px-10 py-4 flex items-center gap-3  font-semibold text-primary"
                    : "px-10 py-4 flex items-center gap-3 font-semibold text-[#9B9B9B]"
                }
              >
                {item.icon}
                {isSidebarOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-10"
        >
          <IoIosLogOut className="size-7" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
