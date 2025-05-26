import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetUserAnalyticsQuery } from "../../../redux/features/user/userApi";
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

const Charts2 = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // 5 years before and after
  const monthRange = monthNames.map((name, index) => ({ name, index }));
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  // Gender distribution data
  
  const { data: responseData } = useGetUserAnalyticsQuery({
    period: selectedPeriod,
    year: selectedYear,
    month:
    selectedPeriod === "monthly" || selectedPeriod === "weekly"
    ? selectedMonth + 1
    : undefined,
  });
  const genderDistribution = responseData?.genderDistribution || [];

  console.log(genderDistribution)

  const premiumUserGrowthData = responseData?.premiumUserGrowth?.data || [];

  const COLORS = ["#0088FE", "#FF69B4"];
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setSelectedPeriod(value);
    if (value === "monthly" || value === "weekly") {
      setSelectedMonth(currentMonth);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  console.log(responseData);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12  gap-5">
      {/* Gender Distribution Card */}
      <div className="w-full col-span-full md:col-span-5 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
  
                >
                  {genderDistribution?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Male: {genderDistribution[0]?.value}%</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
              <span>Female: {genderDistribution[1]?.value}% </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium User Growth Card */}
      <div className="w-full col-span-full md:col-span-7 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Premium User Growth</h2>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Select Period
              </label>
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                aria-label="Select Period"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
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
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Select Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
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
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={premiumUserGrowthData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value}%`, "Premium Users"]}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <Bar
                dataKey="value"
                fill="#F0C977"
                name="Premium Users"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts2;
