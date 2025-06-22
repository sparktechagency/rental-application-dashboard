
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";

// eslint-disable-next-line react/prop-types
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const pathName = useLocation().pathname;
  return (
    <div
      className={`${
        isSidebarOpen ? "ml-[300px]" : "ml-[80px]"
      } w-full h-24 px-5 bg-[#F5F5F5] fixed flex justify-between items-center text-white left-0 z-10`}
    >
      {/* Toggle Button */}
      <button
        className="p-2 bg-primary text-white rounded-full z-[999] pointer-events-auto shadow-lg absolute top-5 -left-5"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <IoChevronBack size={20} />
        ) : (
          <IoChevronForward size={20} />
        )}
      </button>
      <div className="w-full flex justify-between items-center gap-3">
        {/* pathname section */}
        <div className="w-full flex items-center gap-2 px-5">
          <p className="text-gray-700 text-lg font-semibold">
            Pages / {pathName === "/" ? "Dashboard" : pathName.replace("/", "")}
          </p>
        </div>
        {/* User Profile Section */}
        <div className="w-full flex justify-center items-center gap-3">
          <div className="flex items-center gap-3 ">
            {/* Notification Icon */}
            <div
              className="cursor-pointer"
            >
              <div className="p-2 relative rounded-full  ">
               <Link to="/notifications">
                <GrNotification className="text-gray-700" size={24} />
               </Link>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate("/personal-info")}
            className="flex items-center justify-end gap-4 p-1 md:p-4 "
          >
            <img
              src={`${user?.profileImage}`}
              className="size-12 rounded-full cursor-pointer object-cover"
              alt="User Profile"
            />
            <div>
              <p className="whitespace-nowrap truncate cursor-pointer text-gray-950 text-base font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-500 text-sm">
                {user?.role === "admin" || user?.role === "super_admin"
                  ? "Admin"
                  : "User"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
