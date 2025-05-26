import { useState, useEffect } from "react";
import { ConfigProvider, Input, Slider, Table, Tooltip } from "antd";
import { FiUsers } from "react-icons/fi";
import { FaBan, FaCrown, FaLock } from "react-icons/fa6";
import { IoClose, IoFilter } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "../../../redux/features/user/userApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

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

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  const currentDate = new Date("2025-05-15T12:11:00+06:00"); // Fixed date for consistency
  const currentYear = currentDate.getFullYear(); // 2025
  const currentMonth = currentDate.getMonth(); // 4 (May, 0-based)
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // 2020–2030
  const monthRange = monthNames.map((name, index) => ({ name, index }));
  const weekRange = Array.from({ length: 5 }, (_, i) => i + 1); // Weeks 1–5
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Prepare filters for the API
  const apiFilters = [
    appliedFilters.fullName && {
      name: "fullName",
      value: appliedFilters.fullName,
    },
    appliedFilters.userType && {
      name: "userType",
      value: appliedFilters.userType,
    },
    appliedFilters.location && {
      name: "location",
      value: appliedFilters.location,
    },
    appliedFilters.gender && {
      name: "gender",
      value: appliedFilters.gender,
    },
    appliedFilters.ageRange && {
      name: "age",
      value: `${appliedFilters.ageRange[0]}-${appliedFilters.ageRange[1]}`,
    },
    {
      name: "period",
      value: selectedPeriod,
    },
    {
      name: "year",
      value: selectedYear,
    },
    selectedPeriod !== "yearly" && {
      name: "month",
      value: selectedMonth + 1, // Convert to 1-based month (e.g., 5 for May)
    },
    selectedPeriod === "weekly" && {
      name: "week",
      value: selectedWeek,
    },
  ].filter(Boolean);

  const { data: responseData, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: 10,
    filters: apiFilters,
  });
  const [userStatusChange] = useUpdateUserStatusMutation();
  const viewUserInfo = responseData?.attributes?.viewUserInfo;

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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <span
          className={`${
            type === "Premium"
              ? "bg-[#FAEED5] text-[#DAB76C]"
              : "bg-[#F5F5F5] text-[#707070]"
          } px-3 py-1 rounded-full`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
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
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: (_, record) => (
        <span className="text-gray-500">{record.key}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <Tooltip
            title={record.status === "Block" ? "Unblock User" : "Block User"}
          >
            <button
              onClick={() =>
                record.status === "Block"
                  ? handleUserStatusChange(record.key, "unblocked")
                  : handleUserStatusChange(record.key, "blocked")
              }
            >
              <FaLock
                className={`size-5 ${
                  record.status === "Block"
                    ? "text-rose-500"
                    : "text-neutral-500"
                }`}
              />
            </button>
          </Tooltip>
          <Tooltip
            title={record.status === "Banned" ? "Unban User" : "Ban User"}
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
        <Link to={`/users/${record.key}`}>
          <button className="px-5 py-1 rounded-md bg-primary text-white">
            View
          </button>
        </Link>
      ),
    },
  ];

  const toggleAdvancedFilter = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  const handleFilterChange = (name, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setSelectedPeriod(value);
    if (value === "monthly" || value === "weekly") {
      setSelectedMonth(currentMonth);
    } else {
      setSelectedMonth(null);
      setSelectedWeek(1);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(Number(e.target.value));
  };

  const clearFilters = () => {
    setFilterValues({});
    setAppliedFilters({});
    setSelectedPeriod("yearly");
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setSelectedWeek(1);
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filterValues });
    setShowAdvancedFilter(false);
  };

  return (
    <section className="w-full min-h-screen px-5 bg-[#F5F5F5]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 py-5">
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
            <FiUsers className="size-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Total Active Users</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
              {viewUserInfo?.totalUsersCount || 0}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
            <AiOutlineUsergroupAdd className="size-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Total Free Users</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
              {viewUserInfo?.totalFreeUsersCount || 0}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
            <FaCrown className="size-8 text-[#F0C977]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Premium Users</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
              {viewUserInfo?.totalPremiumUsersCount || 0}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
            <FaLock className="size-7 text-cyan-700" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Blocked Users</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
              {viewUserInfo?.totalBlockedUsersCount || 0}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
            <FaBan className="size-7 text-rose-500" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Banned Users</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
              {viewUserInfo?.totalBannedUsersCount || 0}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-white px-5 py-5 rounded-md flex flex-col md:flex-row items-center justify-between gap-5 mb-5 relative">
        <Input
          placeholder="Search by name"
          size="large"
          onChange={(e) => handleFilterChange("fullName", e.target.value)}
          value={filterValues.fullName || ""}
          className="w-full"
          allowClear
          prefix={<CiSearch className="text-gray-500 size-6" />}
        />
        <div className="w-full">
          <select
            value={filterValues.userType || "All"}
            onChange={(e) => handleFilterChange("userType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            aria-label="Select User Type"
          >
            <option value="All">All</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
            <option value="Blocked">Blocked</option>
            <option value="Banned">Banned</option>
          </select>
        </div>
        <div className="w-full">
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            aria-label="Select Period"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="w-full">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            aria-label="Select Year"
          >
            {yearRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {(selectedPeriod === "monthly" || selectedPeriod === "weekly") && (
          <div className="w-full">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              aria-label="Select Month"
            >
              {monthRange.map(({ name, index }) => (
                <option key={index} value={index}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedPeriod === "weekly" && (
          <div className="w-full">
            <select
              value={selectedWeek}
              onChange={handleWeekChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              aria-label="Select Week"
            >
              {weekRange.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={toggleAdvancedFilter}
          className="bg-white border border-primary px-5 py-2 rounded-full flex items-center gap-2"
        >
          <IoFilter />
          Filter
        </button>
        {/* Submit button added here */}
        <button
          type="submit"
          onClick={applyFilters}
          className="bg-primary text-white px-5 py-2 rounded-full flex items-center gap-2"
        >
          Submit
        </button>
        {showAdvancedFilter && (
          <div className="absolute top-24 right-36 bg-white p-5 rounded-lg shadow-xl z-10 w-96 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filter</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAdvancedFilter}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <h4 className="font-medium mb-2">Gender</h4>
                <div className="flex">
                  <button
                    className={`px-5 py-2 rounded-l border-l border-t border-b ${
                      filterValues?.gender === "Female"
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleFilterChange("gender", "Female")}
                  >
                    Female
                  </button>
                  <button
                    className={`px-5 py-2 rounded-r border-r border-t border-b ${
                      filterValues?.gender === "Male"
                        ? "bg-primary text-white border-primary border-l"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleFilterChange("gender", "Male")}
                  >
                    Male
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <Input
                  placeholder="Chicago, USA"
                  value={filterValues.location || ""}
                  size="large"
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Age</h4>
                  <span className="text-primary">
                    {filterValues.ageRange
                      ? `${filterValues.ageRange[0]}-${filterValues.ageRange[1]}`
                      : "18-100"}
                  </span>
                </div>
                <Slider
                  range
                  min={18}
                  max={100}
                  value={filterValues.ageRange || [18, 100]}
                  onChange={(value) => handleFilterChange("ageRange", value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#EBF8FF",
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
    </section>
  );
};

export default AllUsers;
