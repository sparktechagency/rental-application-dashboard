import { useState } from "react";
import { Table, Select, Tag } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const { Option } = Select;

// Demo data for bookings
const demoBookings = [
  {
    key: "1",
    id: 34344,
    name: "mahmudul",
    email: "mahmudul@gmail.com",
    bookingDate: "10-14 May",
    status: "Paid",
    avatar: "M",
  },
  {
    key: "2",
    id: 34343,
    name: "hasan",
    email: "hasan@gmail.com",
    bookingDate: "10-14 May",
    status: "Pending",
    avatar: "H",
  },
  {
    key: "3",
    id: 34342,
    name: "Billal",
    email: "billal@gmail.com",
    bookingDate: "10-14 May",
    status: "Cancelled",
    avatar: "B",
  },
  {
    key: "4",
    id: 34545,
    name: "Naimor",
    email: "naimor@gmail.com",
    bookingDate: "10-14 May",
    status: "Pending",
    avatar: "N",
  },
  {
    key: "5",
    id: 37844,
    name: "sayed",
    email: "sayed@gmail.com",
    bookingDate: "10-14 May",
    status: "Completed",
    avatar: "S",
  },
  {
    key: "6",
    id: 45455,
    name: "Ripon mondal",
    email: "ripon@gmail.com",
    bookingDate: "10-14 May",
    status: "Paid",
    avatar: "R",
  },
  {
    key: "7",
    id: 43443,
    name: "Tamim iqbal",
    email: "tamim@gmail.com",
    bookingDate: "10-14 May",
    status: "Cancel request",
    avatar: "T",
  },
];

// Calendar events data with image URLs
const calendarEvents = {
  9: [
    {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "confirmed",
    },
  ],
  10: [
    {
      name: "mahmudul",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      status: "confirmed",
    },
    {
      name: "Sarah Wilson",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      status: "pending",
    },
  ],
  17: [
    {
      name: "Mike Johnson",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      status: "confirmed",
    },
  ],
  24: [
    {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "confirmed",
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      status: "pending",
    },
    {
      name: "Bob Wilson",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      status: "confirmed",
    },
  ],
  25: [
    {
      name: "Alice Brown",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      status: "confirmed",
    },
    {
      name: "David Lee",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      status: "pending",
    },
    {
      name: "Emma Davis",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      status: "confirmed",
    },
  ],
};

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [filterDate, setFilterDate] = useState("Today"); // For table
  const [calendarFilter, setCalendarFilter] = useState("overdue"); // For calendar
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 1)); // Start of May 2025

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "green";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      case "completed":
        return "green";
      case "cancel request":
        return "yellow";
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
      render: (text) => (
        <div className="flex items-center">
          {text}
        </div>
      ),
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
        <Tag color={getStatusColor(status)} className="w-32  rounded-full px-2 py-1 text-center">
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => (
        <Link to="#" className="text-blue-600 hover:text-blue-800 font-medium">
          Edit/View
        </Link>
      ),
    },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const navigateMonth = (direction) => {
    setSelectedDate(
      new Date(selectedDate.setMonth(selectedDate.getMonth() + direction))
    );
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(selectedDate);

    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6  border-b border-gray-200 pb-5 ">
          <div className="flex items-center gap-4 ">
            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
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
            <span className="text-sm text-gray-600 mr-4">Booked</span>
            <Select
              value={calendarFilter}
              onChange={setCalendarFilter}
              className="w-40"
            >
              <Option value="overdue">Overdue</Option>
              <Option value="schedule_pickup">Schedule pickup</Option>
              <Option value="rental_out">Rental out</Option>
            </Select>
          </div>
        </div>
        <div className="w-full p-6 ">
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
          <div className="grid grid-cols-7  ">
            {days.map((day, index) => (
              <div
                key={index}
                className={`h-28 border border-gray-100 p-1 relative ${
                  calendarEvents[day] ? "bg-[#F4FEEE]" : ""
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`text-lg ${
                        day === new Date().getDate() &&
                        selectedDate.getMonth() === new Date().getMonth()
                          ? "font-bold"
                          : "text-gray-700"
                      } mb-1`}
                    >
                      {day}
                    </div>
                    {calendarEvents[day] && (
                      <div className="flex flex-wrap items-center justify-center">
                        {calendarEvents[day].slice(0, 2).map((event, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <img
                              src={event.image}
                              alt={event.name}
                              className="size-10 mx-auto rounded-full object-cover"
                            />
                          </div>
                        ))}
                        {calendarEvents[day].length > 2 && (
                          <div className="text-sm text-gray-500 ml-2 ">
                            +{calendarEvents[day].length - 2} more
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

  return (
    <section className="w-full px-5 space-y-5">
      {renderCalendar()}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">All Booking</h1>
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
            dataSource={demoBookings}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              total: demoBookings.length,
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
