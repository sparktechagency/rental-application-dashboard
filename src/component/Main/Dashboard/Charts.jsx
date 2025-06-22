/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { useGetEarningGraphChartsQuery } from "../../../redux/features/earning/earningApi";
import { FaCalendar, FaClock, FaChartLine } from "react-icons/fa";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-green-600">{`Revenue: $${(
          payload[0]?.value || 0
        ).toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const TotalRevenueChart = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // 5 years before and after
  const monthRange = monthNames.map((name, index) => ({ name, index }));
  const [selectedPeriod, setSelectedPeriod] = useState("Yearly");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data: apiData, isLoading } = useGetEarningGraphChartsQuery({
    period: selectedPeriod.toLowerCase(),
    year: selectedYear,
    month:
      selectedPeriod.toLowerCase() === "monthly" || selectedPeriod.toLowerCase() === "weekly"
        ? selectedMonth + 1
        : undefined,
  });

  useEffect(() => {
    if (apiData) {
      const earnings = apiData.earnings || [];
      let transformedData = earnings.map((item) => ({
        month: item?.name,
        revenue: item.totalEarnings || 0,
      }));

      setCurrentData(transformedData);

      // Calculate totals
      const revenueSum = transformedData.reduce(
        (sum, item) => sum + (item.revenue || 0),
        0
      );
      setTotalRevenue(revenueSum);

      // Simple growth percentage calculation (demo logic)
      const lastYearRevenue =
        transformedData.length > 1
          ? transformedData[transformedData.length - 2]?.revenue || 0
          : 0;
      const currentYearRevenue = transformedData[transformedData.length - 1]?.revenue || 0;
      const growth =
        lastYearRevenue > 0
          ? ((currentYearRevenue - lastYearRevenue) / lastYearRevenue) * 100
          : 0;
      setGrowthPercentage(isNaN(growth) ? 0 : growth.toFixed(2));
    }
  }, [apiData, selectedPeriod, selectedYear, selectedMonth]);

  const [currentData, setCurrentData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);

  // Find the peak point for the reference dot
  const peakData = currentData.reduce(
    (max, item) => (item.revenue > max.revenue ? item : max),
    currentData[0] || { revenue: 0 }
  );

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  if (isLoading) {
    return <div className="bg-white rounded-2xl shadow-sm p-6 mx-auto">Loading...</div>;
  }

  const chartTitle =
    selectedPeriod === "Weekly"
      ? `Weekly Revenue for ${monthNames[selectedMonth]} ${selectedYear}`
      : selectedPeriod === "Monthly"
      ? `Monthly Revenue for ${selectedYear}`
      : `Yearly Revenue (${selectedYear - 5} - ${selectedYear + 5})`;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] font-bold text-gray-800">{chartTitle}</h1>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              <FaChartLine className="mr-1" />{" "}
              {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              <FaCalendar className="mr-1" /> {selectedYear}
            </span>
            {(selectedPeriod === "Monthly" || selectedPeriod === "Weekly") && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                <FaClock className="mr-1" /> {monthNames[selectedMonth]}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Select Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(e.target.value);
                if (e.target.value === "Monthly" || e.target.value === "Weekly") {
                  setSelectedMonth(currentMonth);
                }
              }}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              aria-label="Select Period"
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Select Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
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
          {(selectedPeriod === "Monthly" || selectedPeriod === "Weekly") && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Select Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
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

      {/* Metrics */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Total Revenue</span>
          <span className="text-sm font-medium text-gray-800">
            {formatCurrency(totalRevenue)}
          </span>
          <span className="text-green-500 text-sm font-medium">
            +{growthPercentage}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm text-green-600 font-medium">On track</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={currentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />

            {/* Revenue Line */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#22c55e" }}
            />

            {/* Peak point marker */}
            <ReferenceDot
              x={peakData.month}
              y={peakData.revenue}
              r={4}
              fill="#22c55e"
              stroke="#fff"
              strokeWidth={2}
              label={{
                value: formatCurrency(peakData.revenue),
                position: "top",
                offset: 10,
                style: {
                  fontSize: "12px",
                  fill: "#374151",
                  fontWeight: "500",
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  padding: "2px 6px",
                },
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalRevenueChart;