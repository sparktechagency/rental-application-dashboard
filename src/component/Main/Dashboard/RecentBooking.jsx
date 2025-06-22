import { useState } from "react";
import { Table, Tag, Modal } from "antd";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { Eye } from "lucide-react";
import moment from "moment";
import { FaCalendarAlt, FaEnvelope, FaUserAlt } from "react-icons/fa";

const RecentBooking = () => {
  //get all bookings
  const { data: responseData, isLoading } = useGetAllBookingsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
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
  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text) => text.slice(-6), // Display last 6 characters
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
      render: (_, record) => (
        <button
          onClick={() => handleSelectBooking(record)}
          className="text-primary font-medium"
        >
          <Eye />
        </button>
      ),
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">All Bookings</h1>
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
      {/* Booking Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        {selectedBooking && (
          <div className="p-4">
            {/* Profile Image and Name */}
            <div className="flex flex-col text-center items-center gap-4">
              <div className="size-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary">
                <span className="text-gray-600 text-xl">
                  {selectedBooking.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedBooking.name}
                </h2>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-7 mt-8">
              {/* Booking ID */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaUserAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Booking ID : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {selectedBooking.id.slice(-6)}
                </p>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Email : </p>
                </div>
                <p className="text-gray-800 text-sm">{selectedBooking.email}</p>
              </div>

              {/* Booking Dates */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Booking Dates : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {selectedBooking.bookingDate}
                </p>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaUserAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Status : </p>
                </div>
                <p className="text-gray-800 text-sm capitalize">
                  {selectedBooking.status}
                </p>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Total Price : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  ${selectedBooking.totalPrice || "N/A"}
                </p>
              </div>

              {/* Phone */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaUserAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Phone : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {selectedBooking.phone || "N/A"}
                </p>
              </div>

              {/* Address */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-600 size-5" />
                  <p className="text-sm text-gray-500">Address : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {selectedBooking.address || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentBooking;
