/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";
import {
  useGetUnviewNotificationsQuery,
  useViewAllNotificationMutation,
} from "../../../redux/features/notification/notificationApi";

// Initialize Socket.IO client
const socket = io("http://10.0.80.220:8082", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: responseData } = useGetUnviewNotificationsQuery();
  const [viewAllNotifications] = useViewAllNotificationMutation();

  // State to manage the unread notification count
  const [unreadCount, setUnreadCount] = useState(responseData?.count || 0);

  // Update unreadCount when responseData changes
  useEffect(() => {
    if (responseData?.count !== undefined) {
      setUnreadCount(responseData.count);
    }
  }, [responseData]);

  // Set up Socket.IO listener for admin-notification
  useEffect(() => {
    socket.on("admin-notification", (data) => {
      if (data?.data?.role === "admin" && data?.data?.viewStatus === false) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.off("admin-notification");
    };
  }, []);

  // Handler for marking all notifications as viewed and navigating
  const handleViewAllNotificationsAndNavigate = async () => {
    try {
      // Call the mutation with user._id
      await viewAllNotifications(user?._id).unwrap();
      setUnreadCount(0);
      // Navigate to /notification after mutation completes
      navigate("/notification");
    } catch (error) {
      console.error("Failed to mark all notifications as viewed:", error);
      // Navigate even if the mutation fails (optional: adjust based on requirements)
      navigate("/notification");
    }
  };

  return (
    <div className="w-full h-24 px-5 bg-white flex justify-between items-center text-white left-0 relative border-b border-[#E5E5E5]">
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
      <div className="flex items-center gap-3">
        {/* User Profile Section */}
        <div className="flex items-center gap-4 p-1 md:p-4">
          <img
            onClick={() => navigate("/personal-info")}
            src={`${imageBaseUrl}${user?.profileImage?.imageUrl}`}
            className="size-14 rounded-full cursor-pointer object-cover"
            alt="User Profile"
          />
          <div>
            <h1 className="text-primary">Welcome</h1>
            <p className="whitespace-nowrap truncate cursor-pointer text-gray-950 text-lg font-semibold">
              {user?.fullName}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Notification Icon */}
        <div
          onClick={handleViewAllNotificationsAndNavigate}
          className="cursor-pointer"
        >
          <div className="p-2 relative rounded-full border">
            <GrNotification className="text-[#9E9E9E]" size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
