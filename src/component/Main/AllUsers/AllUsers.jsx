import { useState, useEffect } from "react";
import { ConfigProvider, Modal, Table, Tooltip } from "antd";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "../../../redux/features/user/userApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  FaBan,
  FaTrash,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserTag,
} from "react-icons/fa";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: responseData, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: 10,
  });
  const [userStatusChange] = useUpdateUserStatusMutation();

  useEffect(() => {
    if (responseData?.attributes?.results) {
      const { results, totalResults } = responseData.attributes;
      setAllUsers(results);
      setTotalResult(totalResults);
    }
  }, [responseData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const dataSource = allUsers.map((user) => ({
    key: user._id,
    name: user?.fullName || "N/A",
    profileImage: user?.profileImage?.imageUrl,
    type: user?.isPremiumUser ? "Premium" : "Free",
    registrationDate: user?.createdAt
      ? new Date(user?.createdAt).toLocaleDateString()
      : "N/A",
    email: user?.email || "N/A",
    role: user?.role || "N/A",
    isBlocked: user?.isBlocked,
    isBanned: user?.isBanned,
    status: user?.status,
  }));

  const handleUserDetails = (user) => {
    setUserDetails(user);
    setIsModalOpen(true);
  };

  const handleUserStatusChange = async (userId, statusType) => {
    try {
      await userStatusChange({
        id: userId,
        data: { status: statusType },
      }).unwrap();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={`${imageBaseUrl}${record?.profileImage}`}
            className="w-12 h-12 rounded-full object-cover"
            alt="User Avatar"
          />
          <div>
            <span>{record.name}</span>
            <p className="text-gray-500">{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          } px-3 py-1 rounded-full`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <Tooltip
            title={record.status === "Block" ? "Recover User" : "Delete User"}
          >
            <button
              onClick={() =>
                record.status === "Block"
                  ? handleUserStatusChange(record.key, "unblocked")
                  : handleUserStatusChange(record.key, "blocked")
              }
            >
              <FaTrash
                className={`size-5 ${
                  record.status === "Block"
                    ? "text-rose-500"
                    : "text-neutral-500"
                }`}
              />
            </button>
          </Tooltip>
          <Tooltip
            title={record.status === "Banned" ? "Unblock User" : "Block User"}
          >
            <button
              onClick={() =>
                record.status === "Banned"
                  ? handleUserStatusChange(record.key, "unbanned")
                  : handleUserStatusChange(record.key, "banned")
              }
            >
              <FaBan
                className={`size-5 ${
                  record.status === "Banned"
                    ? "text-rose-500"
                    : "text-neutral-500"
                }`}
              />
            </button>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <button
          onClick={() => handleUserDetails(record)}
          className="px-5 py-1 rounded-md bg-primary text-white"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <section className="w-full min-h-screen px-5 bg-[#F5F5F5]">
      <div className="bg-white rounded-lg mb-5">
        <h1 className="text-xl md:text-2xl font-bold p-5 text-gray-600">
          Users List
        </h1>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#EEFEE6",
                headerBorderRadius: 5,
              },
            },
          }}
        >
          <Table
            loading={isLoading}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              total: totalResult,
              onChange: handlePageChange,
            }}
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            scroll={{ x: "max-content" }}
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        {userDetails && (
          <div className="p-4 space-y-4">
            {/* Profile Image and Name */}
            <div className="flex flex-col text-center items-center gap-4">
              <img
                src={`${imageBaseUrl}${userDetails.profileImage}`}
                alt={userDetails.name}
                className="size-24 mx-auto rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {userDetails.name}
                </h2>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-7">
              {/* Email */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Email : </p>
                </div>
                <p className="text-gray-800 text-sm">{userDetails.email}</p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Registration Date : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {userDetails.registrationDate}
                </p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Status : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  <span
                    className={`${
                      userDetails.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    } px-3 py-1 rounded-full text-sm`}
                  >
                    {userDetails.status.charAt(0).toUpperCase() +
                      userDetails.status.slice(1)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaUserTag className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Role : </p>
                </div>
                <p className="text-gray-800">{userDetails?.role?.charAt(0).toUpperCase() + userDetails.role.slice(1)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default AllUsers;
