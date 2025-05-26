/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetEarningGraphChartsQuery } from "../../../redux/features/dashboard/dashboardApi";
import { FaCalendar, FaClock, FaChartBar } from "react-icons/fa";

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

const CustomTooltip = ({ active, payload, label, period }) => {
  if (active && payload && payload.length) {
    const periodLabel =
      period === 'weekly' ? 'Week' :
      period === 'monthly' ? 'Month' : 'Year';
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
        <p className="font-semibold text-gray-800">{`${periodLabel}: ${label}`}</p>
        <p className="text-gray-600">{`Total Income: €${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const IncomeGraphChart = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // 5 years before and after
  const monthRange = monthNames.map((name, index) => ({ name, index }));
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data: responseData } = useGetEarningGraphChartsQuery({
    period: selectedPeriod,
    year: selectedYear,
    month: selectedPeriod === "monthly" || selectedPeriod === "weekly" ? selectedMonth + 1 : undefined
  });

  const graphChartData = responseData?.earnings || [];

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

  const chartTitle =
    selectedPeriod === "weekly"
      ? `Weekly Income for ${monthNames[selectedMonth]} ${selectedYear}`
      : selectedPeriod === "monthly"
      ? `Monthly Income for ${selectedYear}`
      : `Yearly Income (${selectedYear - 5} - ${selectedYear + 5})`;

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] font-bold text-gray-800">{chartTitle}</h1>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                <FaChartBar className="mr-1" />{" "}
                {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <FaCalendar className="mr-1" /> {selectedYear}
              </span>
              {(selectedPeriod === "monthly" || selectedPeriod === "weekly") && (
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
              <label className="text-sm font-medium text-gray-700">Select Year</label>
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
                <label className="text-sm font-medium text-gray-700">Select Month</label>
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
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={graphChartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip period={selectedPeriod} />} />
            <Bar dataKey="totalEarnings" barSize={20} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeGraphChart;