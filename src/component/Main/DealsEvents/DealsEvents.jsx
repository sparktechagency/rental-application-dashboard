import { useState } from "react";
import { Input, Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Deals from "../Deals/Deals";
import Events from "../Events/Events";
import { useGetDealCategoriesQuery } from "../../../redux/features/dealCategory/dealCategoryApi";
import { SearchOutlined } from "@ant-design/icons";

const DealsEvents = () => {
  const [activeTab, setActiveTab] = useState("deals");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [locationCountry, setLocationCountry] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});

  // Fetch deal categories
  const { data } = useGetDealCategoriesQuery({
    page: 1,
    limit: 5000,
    filters: [],
  });
  const categories = data?.data?.attributes?.results || [];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Reset filters when switching tabs
    setAppliedFilters({});
    setSearchText("");
    setCategory("all");
    setStatus("all");
    setLocationCountry("");
    setLocationCity("");
  };

  const handleApplyFilters = () => {
    if (activeTab === "deals") {
      setAppliedFilters({ searchText, category, status });
    } else {
      setAppliedFilters({
        searchText,
        status,
        locationCountry,
        locationCity,
      });
    }
  };

  return (
    <section className="w-full bg-[#F5F5F5] border-gray-200 p-5 rounded-lg">
      <div className="bg-white px-5 py-5 rounded-md flex flex-col md:flex-row items-center justify-between gap-5 mb-5 relative">
        <Input
          placeholder={`Search ${activeTab === "deals" ? "Deals" : "Events"}`}
          prefix={<SearchOutlined size={24} className="text-gray-500" />}
          size="large"
          style={{ width: "100%" }}
          value={searchText}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
        {activeTab === "deals" ? (
          <select
            value={category}
            style={{ width: "100%" }}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category?.name} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <Input
              placeholder="Location Country"
              size="large"
              style={{ width: "100%" }}
              value={locationCountry}
              onChange={(e) => setLocationCountry(e.target.value)}
              allowClear
            />
            <Input
              placeholder="Location City"
              size="large"
              style={{ width: "100%" }}
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
              allowClear
            />
          </>
        )}
        <select
          value={status}
          placeholder="Status"
          size="large"
          style={{ width: "100%" }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setStatus(e.target.value)}
        >
          {[
            { value: "all", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button
          type="primary"
          size="large"
          onClick={handleApplyFilters}
          className="px-5 py-5 rounded-full"
        >
          Submit
        </Button>
      </div>

      <div className="w-full bg-white rounded-lg p-5">
        <div className="flex  flex-col md:flex-row  justify-between items-center gap-5">
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleTabClick("deals")}
              className={`px-6 py-2 rounded-full ${
                activeTab === "deals"
                  ? "bg-primary text-white"
                  : "border border-primary text-primary"
              }`}
            >
              Deals
            </button>
            <button
              onClick={() => handleTabClick("events")}
              className={`px-6 py-2 rounded-full ${
                activeTab === "events"
                  ? "bg-primary text-white"
                  : "border border-primary text-primary"
              }`}
            >
              Upcoming Event
            </button>
          </div>
          <Link to={`${activeTab === "deals" ? "/add-deals" : "/add-event"}`}>
            <button className="px-6 py-3 rounded-full bg-primary text-white flex items-center gap-2">
              <FaPlus /> Add New
            </button>
          </Link>
        </div>
        <div className="mt-5">
          {activeTab === "deals" ? (
            <Deals appliedFilters={appliedFilters} />
          ) : (
            <Events appliedFilters={appliedFilters} />
          )}
        </div>
      </div>
    </section>
  );
};

export default DealsEvents;
