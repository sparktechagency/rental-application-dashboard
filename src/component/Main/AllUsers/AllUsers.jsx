import { useState, useEffect } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import {
  useGetAllUsersQuery
} from "../../../redux/features/user/userApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaUserAlt
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

  useEffect(() => {
    if (responseData) {
      const { data, pagination} = responseData;
      setAllUsers(data);
      setTotalResult(pagination?.totalItem);
    }
  }, [responseData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const dataSource = allUsers.map((user, index) => ({
    key: index + 1,
    id: user?._id,
    name: `${user?.firstName} ${user?.lastName}` || "N/A",
    profileImage: user?.profileImage,
    registrationDate: user?.createdAt
      ? new Date(user?.createdAt).toLocaleDateString()
      : "N/A",
    email: user?.email || "N/A",
    role: user?.role || "N/A"
  }));

  const handleUserDetails = (user) => {
    setUserDetails(user);
    setIsModalOpen(true);
  };
  const columns = [
    {
      title:"#SI",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Image",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (image) => <img src={`${imageBaseUrl}/${image}`} alt="User" className="w-10 h-10 rounded-full" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
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
          <div className="p-4">
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
            <div className="space-y-7 mt-8 ">
            {/* User ID */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <FaUserAlt className="text-gray-600 size-5" />
                <p className="text-sm text-gray-500">User ID : </p>
              </div>
              <p className="text-gray-800 text-sm">{userDetails.id}</p>
            </div>
              {/* Email */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Email : </p>
                </div>
                <p className="text-gray-800 text-sm">{userDetails.email}</p>
              </div>
              {/* Role */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaUserAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Role : </p>
                </div>
                <p className="text-gray-800 text-sm">{userDetails?.role?.slice(0, 1).toUpperCase() + userDetails?.role?.slice(1)}</p>
              </div>
              {/* Registration Date */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Registration Date : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {userDetails.registrationDate}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default AllUsers;
