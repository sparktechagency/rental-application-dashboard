import { useState, useEffect } from "react";
import { ConfigProvider, Form, Modal, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import Search from "antd/es/input/Search";
import { RxEyeOpen } from "react-icons/rx";
// Uncomment these imports when integrating with the API
// import {
//   useGetAllUsersQuery,
//   useUserDeleteMutation,
// } from "../../../redux/features/user/userApi";

import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
const AllAdminSuperAdmin = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [user, setUser] = useState(null);

  // Demo data for development
  const demoData = Array(10)
    .fill(null)
    .map((_, index) => ({
      _id: `user_${index}`,
      fullName: `Demo User ${index + 1}`,
      email: `demo${index + 1}@email.com`,
      role: index % 2 === 0 ? "Admin" : "Super Admin", // Example roles
      createdAt: new Date(),
      status: index % 2 === 0 ? "Active" : "Inactive", // Example status
    }));

  useEffect(() => {
    // Replace `demoData` with API response data when integrated
    setAllUsers(demoData);
    setTotalResult(demoData.length);
  }, [demoData]);

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const handleFinish = (values) => {
    const { name, email } = values;
    const newParams = [];
    if (name) newParams.push({ name: "fullName", value: name });
    if (email) newParams.push({ name: "email", value: email });
    setParams(newParams);
    form.resetFields();
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const dataSource = allUsers.map((user, index) => ({
    key: user._id,
    si: index + 1,
    name: user?.fullName || "N/A",
    email: user?.email || "N/A",
    role: user?.role || "N/A",
    createdAt: user?.createdAt,
    connectCount: user?.connectCount || "N/A",
    status: user?.status,
  }));

  const columns = [
    {
      title: "SI NO",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "USER NAME",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center">
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Select defaultValue={status} style={{ width: 120 }}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-5">
          <button onClick={() => handleView(record)}>
          <RxEyeOpen className="size-6 text-secondary" />
        </button>
          <Link to="/edit-admin/1"><BiEdit className="size-6 text-primary" /></Link>
        </div>
      ),
    },
  ];

  console.log(params);
  return (
    <section className="w-full min-h-screen px-5">
      <div className="flex justify-between items-center py-6 border-b mb-4">
        <h1 className="text-2xl font-semibold">Admins</h1>
        <div className="flex gap-4 items-center">
          <Form
            form={form}
            onFinish={handleFinish}
            layout="inline"
            name="basic"
          >
            <Form.Item name="name">
              <Select size="large" placeholder="Sort by">
                <Option>All</Option>
                <Option>Super Admin</Option>
                <Option>Admin</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Search size="large" placeholder="Search" allowClear />
            </Form.Item>
          </Form>
          <Link to="/add-admin">
            <button className="px-8 py-3 bg-primary text-white rounded-lg  font-normal flex items-center gap-2">
              <FaPlus /> Add Admin
            </button>
          </Link>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#D4F9F9",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          loading={false} // Change to `isFetching` when using API
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
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black">
          <h1 className="text-center text-2xl font-semibold my-2">
            Admin Details
          </h1>
          <div className="p-5">
            <div className="flex justify-between py-3 border-b">
              <p>User Name :</p>
              <p>{user?.name || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email :</p>
              <p>{user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Role :</p>
              <p>{user?.role || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Status :</p>
              <p>{user?.status || "N/A"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default AllAdminSuperAdmin;
