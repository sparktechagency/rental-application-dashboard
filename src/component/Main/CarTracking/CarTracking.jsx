import { useState } from "react";
import { Table, Select, Tag } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

// Demo data
const demoBookings = [
  {
    key: "1",
    id: 34344,
    name: "mahmudul",
    email: "mahmudul@gmail.com",
    bookingDate: "10-14 May",
    status: "Paid",
  },
  {
    key: "2",
    id: 34343,
    name: "hasan",
    email: "etc@gmail.com",
    bookingDate: "10-14 May",
    status: "Pending",
  },
  {
    key: "3",
    id: 34343,
    name: "Billal",
    email: "etc@gmail.com",
    bookingDate: "10-14 May",
    status: "Cancelled",
  },
  {
    key: "4",
    id: 34545,
    name: "Naimor",
    email: "etc@gmail.com",
    bookingDate: "10-14 May",
    status: "Pending",
  },
  {
    key: "5",
    id: 37844,
    name: "sayed",
    email: "etc@gmail.com",
    bookingDate: "10-14 May",
    status: "Completed",
  },
  {
    key: "6",
    id: 45455,
    name: "Ripon mondal",
    email: "etc@gmail.com",
    bookingDate: "10-14 May",
    status: "Paid",
  },
  {
    key: "7",
    id: 43443,
    name: "Tamim iqbal",
    email: "etc@gmail.com",
    bookingDate: "10-14 May",
    status: "Cancel request",
  },
  {
    key: "8",
    id: 34344,
    name: "John Smith",
    email: "john@gmail.com",
    bookingDate: "10-14 May",
    status: "Paid",
  },
  {
    key: "9",
    id: 34345,
    name: "Sarah Wilson",
    email: "sarah@gmail.com",
    bookingDate: "15-18 May",
    status: "Pending",
  },
  {
    key: "10",
    id: 34346,
    name: "Mike Johnson",
    email: "mike@gmail.com",
    bookingDate: "20-22 May",
    status: "Completed",
  },
  {
    key: "11",
    id: 34347,
    name: "Lisa Brown",
    email: "lisa@gmail.com",
    bookingDate: "25-28 May",
    status: "Cancelled",
  },
  {
    key: "12",
    id: 34348,
    name: "David Lee",
    email: "david@gmail.com",
    bookingDate: "01-05 Jun",
    status: "Paid",
  },
  {
    key: "13",
    id: 34349,
    name: "Emma Davis",
    email: "emma@gmail.com",
    bookingDate: "08-12 Jun",
    status: "Pending",
  },
  {
    key: "14",
    id: 34350,
    name: "James Miller",
    email: "james@gmail.com",
    bookingDate: "15-18 Jun",
    status: "Cancel request",
  },
  {
    key: "15",
    id: 34351,
    name: "Anna Garcia",
    email: "anna@gmail.com",
    bookingDate: "22-25 Jun",
    status: "Completed",
  },
];

const CarTracking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState("Today");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "green";
      case "pending":
        return "gold";
      case "cancelled":
        return "red";
      case "completed":
        return "green";
      case "cancel request":
        return "orange";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          className="w-32 text-center rounded-full px-3 py-1"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => (
        <Link
          to="/car-tracking-details/1"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View
        </Link>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">All Booking</h1>
        <Select
          value={filterDate}
          onChange={setFilterDate}
          className="w-32"
          suffixIcon={<span className="text-gray-400">▼</span>}
        >
          <Option value="Today">Today</Option>
          <Option value="Yesterday">Yesterday</Option>
          <Option value="This Week">This Week</Option>
          <Option value="This Month">This Month</Option>
        </Select>
      </div>

      {/* Table */}
      <div className="p-6">
        <Table
          columns={columns}
          dataSource={demoBookings}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: demoBookings.length,
            onChange: handlePageChange,
          }}
          className="custom-table"
          scroll={{ x: 800 }}
          rowClassName="hover:bg-gray-50 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default CarTracking;
