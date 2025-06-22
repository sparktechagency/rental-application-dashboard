import { useState } from "react";
import { Table, Tag } from "antd";
import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetManualBookingsQuery } from "../../../redux/features/booking/bookingApi";

const ManualBooking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  //get all bookings
  const { data: responseData, isLoading } = useGetManualBookingsQuery();
  const allBookings = responseData?.data || [];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      case "completed":
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
      name: `${booking?.userName || ""}`.trim(),
      email: booking?.email,
      phone: booking?.phone,
      carName: booking?.carName,
      bookingDate: `${moment(booking?.pickupDate).format(
        "MMM DD, YYYY"
      )} - ${moment(booking?.returnDate).format("MMM DD, YYYY")}`,
      status: booking?.status,
      pickupDate: booking?.pickupDate,
      returnDate: booking?.returnDate,
      totalPrice: booking?.totalPrice,
      bookingType: booking?.bookingType,
      address: booking?.address,
    })) || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="flex items-center">{text}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
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
      render: (_, record) => (
        <Link
          to={`/booking/${record.key}`}
          className="text-primary font-medium"
        >
          <Eye />
        </Link>
      ),
    },
  ];

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  console.log("Bookings:", responseData);
  return (
    <section className="w-full px-5 space-y-5">
      <div className="flex justify-end">
        <Link to="/add-manual-booking">
          <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus size={16} />
            <span>Add Manual Booking</span>
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            Manual Booking List
          </h1>
          {/* <Select value={filterDate} onChange={setFilterDate} className="w-32">
            <Option value="Today">Today</Option>
            <Option value="Yesterday">Yesterday</Option>
            <Option value="This Week">This Week</Option>
            <Option value="This Month">This Month</Option>
          </Select> */}
        </div>
        <div className="p-6">
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={transformedBookings}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              total: transformedBookings?.length || 0,
              onChange: handlePageChange,
              pageSize,
            }}
            className="custom-table"
            scroll={{ x: 800 }}
            rowClassName="hover:bg-gray-50"
          />
        </div>
      </div>
    </section>
  );
};

export default ManualBooking;
