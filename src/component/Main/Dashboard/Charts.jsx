/* eslint-disable react/prop-types */
import { useState } from "react";
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

// Demo data matching the chart pattern from the image
const monthlyData = [
  { month: "Jan", revenue: 32000, spent: 28000 },
  { month: "Feb", revenue: 35000, spent: 30000 },
  { month: "Mar", revenue: 38000, spent: 32000 },
  { month: "Apr", revenue: 36000, spent: 31000 },
  { month: "May", revenue: 42000, spent: 35000 },
  { month: "Jun", revenue: 39000, spent: 33000 },
  { month: "Jul", revenue: 35000, spent: 30000 },
  { month: "Aug", revenue: 41000, spent: 34000 },
  { month: "Sep", revenue: 40000, spent: 33500 },
  { month: "Oct", revenue: 43000, spent: 36000 },
  { month: "Nov", revenue: 42500, spent: 35500 },
  { month: "Dec", revenue: 44000, spent: 37000 },
];

const weeklyData = [
  { month: "Week 1", revenue: 8500, spent: 7200 },
  { month: "Week 2", revenue: 9200, spent: 7800 },
  { month: "Week 3", revenue: 10800, spent: 9100 },
  { month: "Week 4", revenue: 8900, spent: 7500 },
];

const yearlyData = [
  { month: "2020", revenue: 380000, spent: 320000 },
  { month: "2021", revenue: 420000, spent: 350000 },
  { month: "2022", revenue: 450000, spent: 380000 },
  { month: "2023", revenue: 480000, spent: 400000 },
  { month: "2024", revenue: 500000, spent: 420000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-green-600">{`Revenue: $${(
          payload[0]?.value || 0
        ).toLocaleString()}`}</p>
        <p className="text-orange-600">{`Spent: $${(
          payload[1]?.value || 0
        ).toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const TotalRevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  const getDataByPeriod = () => {
    switch (selectedPeriod) {
      case "Weekly":
        return weeklyData;
      case "Yearly":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const currentData = getDataByPeriod();
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSpent = currentData.reduce((sum, item) => sum + item.spent, 0);
  const growthPercentage = 24.44; // Demo percentage

  // Find the peak point for the reference dot
  const peakData = currentData.reduce(
    (max, item) => (item.revenue > max.revenue ? item : max),
    currentData[0]
  );

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-gray-600 text-sm font-medium mb-2">
            Total revenue
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-500">
              {formatCurrency(totalRevenue)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-32 px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Total Spent</span>
          <span className="text-sm font-medium text-gray-800">
            {formatCurrency(totalSpent)}
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

            {/* Spent Line */}
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "#f59e0b" }}
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
