import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetAdminNotificationQuery } from "../../../redux/features/notification/notificationApi";
import { io } from "socket.io-client";
// Initialize Socket.IO client
const socket = io("http://10.0.80.220:8082", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch all notifications using the API
  const { data: notificationData, isLoading } = useGetAdminNotificationQuery({
    page: currentPage,
    limit: pageSize,
  });

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData.results);
    }
  }, [notificationData]);

  useEffect(() => {
    socket.on("admin-notification", (data) => {
      if (data?.data?.role === "admin" && data?.data?.viewStatus === false) {
        setNotifications((prevNotifications) => [
          data.data,
          ...prevNotifications,
        ]);
      }
    });

    return () => {
      socket.off("admin-notification");
    };
  }, []);

  const totalResults = notifications?.length || 0;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notification</h1>

      {isLoading ? (
        <div>Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div>No notifications available.</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item._id} // Use _id or appropriate unique identifier
              className="border border-primary rounded-md p-4 flex items-center space-x-4"
            >
              <div className="text-primary border-primary rounded-full p-2">
                <IoMdNotificationsOutline size={30} />
              </div>
              <div>
                <p className="font-semibold">{item.message}</p>
                <p className="text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}{" "}
                  {/* Display full date and time */}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalResults}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
