import { useState } from "react";
import { Table, Select, Tag } from "antd";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { Eye } from "lucide-react";
import moment from "moment";

const { Option } = Select;



const RecentBooking = () => {
  const [filterDate, setFilterDate] = useState("Today");
  //get all bookings
  const { data: responseData, isLoading } = useGetAllBookingsQuery();
  const allBookings = responseData?.data || [];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "booked":
        return "#CCCB85";
      case "ongoing":
        return "#DBFDCB";
      case "cancelRequest":
        return "#FBBC05";
      case "cancelled":
        return "#F9C5C0";
      case "completed":
        return "#69BB41";
      case "returned":
        return "green";
      case "active":
        return "blue";
      default:
        return "default";
    }
  };

  // Transform API data for table display
  const transformedBookings =
    allBookings?.map((booking) => ({
      key: booking?._id,
      id: booking?._id?.slice(-6), // Show last 6 characters of ID
      name: `${booking?.user?.firstName || ""} ${
        booking?.user?.lastName || ""
      }`.trim(),
      email: booking?.user?.email,
      bookingDate: `${moment(booking?.pickupDate).format("MMM DD, YYYY")}`,
      status: booking?.status,
      pickupDate: booking?.pickupDate,
      returnDate: booking?.returnDate,
      totalPrice: booking?.totalPrice,
      bookingType: booking?.bookingType,
      phone: booking?.phone,
      address: booking?.address,
    })) || [];

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
      render: (text) => <div className="flex items-center">{text}</div>,
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
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          className="w-32 rounded-full px-2 py-1 text-center capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => <Eye />,
    },
  ];
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
          loading={isLoading}
          dataSource={transformedBookings}
          className="custom-table"
          pagination={false}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default RecentBooking;
