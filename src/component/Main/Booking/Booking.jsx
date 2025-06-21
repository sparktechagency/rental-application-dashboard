import { useState } from "react";
import { Table, Select, Tag } from "antd";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";

const { Option } = Select;

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [filterDate, setFilterDate] = useState("Today"); // For table
  // const [calendarFilter, setCalendarFilter] = useState("overdue"); // For calendar
  const [selectedDate, setSelectedDate] = useState(new Date()); // Current month

  //get all bookings
  const { data: responseData, isLoading, error } = useGetAllBookingsQuery();
  const allBookings = responseData?.data || [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
      name: `${booking?.user?.firstName || ""} ${
        booking?.user?.lastName || ""
      }`.trim(),
      email: booking?.user?.email,
      bookingDate: `${moment(booking?.pickupDate).format(
        "MMM DD, YYYY"
      )} - ${moment(booking?.returnDate).format("MMM DD, YYYY")}`,
      status: booking?.status,
      pickupDate: booking?.pickupDate,
      returnDate: booking?.returnDate,
      totalPrice: booking?.totalPrice,
      bookingType: booking?.bookingType,
      phone: booking?.phone,
      address: booking?.address,
    })) || [];

  // Group bookings by date for calendar (only pickup dates)
  const getBookingsByDate = () => {
    const bookingsByDate = {};

    allBookings?.forEach((booking) => {
      const pickupDate = moment(booking?.pickupDate);
      const currentMonth = moment(selectedDate);

      // Add booking to pickup date only
      const pickupDay = pickupDate.date();
      if (
        pickupDate.month() === currentMonth.month() &&
        pickupDate.year() === currentMonth.year()
      ) {
        if (!bookingsByDate[pickupDay]) {
          bookingsByDate[pickupDay] = [];
        }
        bookingsByDate[pickupDay].push({
          name: `${booking?.user?.firstName || ""} ${
            booking?.user?.lastName || ""
          }`.trim(),
          status: booking?.status,
          type: "pickup",
          booking: booking,
        });
      }
    });

    return bookingsByDate;
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
        <Link
          to={`/booking/${record.key}`}
          className="text-primary font-medium"
        >
          <Eye />
        </Link>
      ),
    },
  ];

  const getDaysInMonth = (date) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    const daysInMonth = endOfMonth.date();
    const startingDayOfWeek = startOfMonth.day();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const navigateMonth = (direction) => {
    setSelectedDate(moment(selectedDate).add(direction, "month").toDate());
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(selectedDate);
    const bookingsByDate = getBookingsByDate();

    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 pb-5">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {moment(selectedDate).format("MMMM YYYY")}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600 mr-4">Pickup Dates</span>
            {/* <Select
              value={calendarFilter}
              onChange={setCalendarFilter}
              className="w-40"
            >
              <Option value="overdue">Overdue</Option>
              <Option value="schedule_pickup">Schedule pickup</Option>
              <Option value="rental_out">Rental out</Option>
            </Select> */}
          </div>
        </div>
        <div className="w-full p-6">
          <div className="w-full grid grid-cols-7 bg-[#F6F7F9]">
            {dayNames.map((day) => (
              <div
                key={day}
                className="border border-gray-100 text-center text-sm font-medium text-gray-500 py-3"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className={`h-28 border border-gray-100 p-1 relative ${
                  bookingsByDate[day] ? "bg-[#F4FEEE]" : ""
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`text-lg ${
                        day === moment().date() &&
                        moment(selectedDate).month() === moment().month() &&
                        moment(selectedDate).year() === moment().year()
                          ? "font-bold text-blue-600"
                          : "text-gray-700"
                      } mb-1`}
                    >
                      {day}
                    </div>
                    {bookingsByDate[day] && (
                      <div className="flex items-center gap-1">
                        {bookingsByDate[day]?.slice(0, 2)?.map((booking, i) => (
                          <img
                            key={i}
                            src="https://i.ibb.co/JKnw4mP/JBL-Live-660-NC-2.webp"
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ))}
                        {(bookingsByDate[day]?.length || 0) > 2 && (
                          <div className="text-xs text-gray-500">
                            +{(bookingsByDate[day]?.length || 0) - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="w-full px-5 space-y-5">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">Loading bookings...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-5 space-y-5">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center text-red-600">Error loading bookings</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-5 space-y-5">
      {renderCalendar()}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            All Bookings ({transformedBookings?.length || 0})
          </h1>
          <Select value={filterDate} onChange={setFilterDate} className="w-32">
            <Option value="Today">Today</Option>
            <Option value="Yesterday">Yesterday</Option>
            <Option value="This Week">This Week</Option>
            <Option value="This Month">This Month</Option>
          </Select>
        </div>
        <div className="p-6">
          <Table
            columns={columns}
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

export default Booking;
