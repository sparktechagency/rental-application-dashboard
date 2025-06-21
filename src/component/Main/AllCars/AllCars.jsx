import { useState } from "react";
import { Plus } from "lucide-react";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";
import CarTracking from "../CarTracking/CarTracking";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { Spin } from "antd";

const AllCars = () => {
  const [activeTab, setActiveTab] = useState("Car");
  const { data: responseData, isLoading } = useGetAllCarsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  let content;
  if (isLoading) {
    content = <Spin />;
  } else if (responseData?.length === 0) {
    content = <h1>No Cars Found</h1>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {responseData?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    );
  }
  return (
    <section className="w-full px-5  space-y-5 bg-[#F5F5F5]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex items-center space-x-4 bg-white px-4 py-3 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab("Car")}
            className={`${
              activeTab === "Car" ? "bg-[#F4F4F4]" : ""
            } text-gray-950 px-10 py-3 rounded-lg`}
          >
            Car
          </button>
          <button
            onClick={() => setActiveTab("Car Tracking")}
            className={`${
              activeTab === "Car Tracking" ? "bg-[#F4F4F4]" : ""
            } text-gray-950 px-7 py-3 rounded-lg`}
          >
            Car Tracking
          </button>
        </div>
        <Link to="/add-vehicle">
          <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus size={16} />
            <span>Add Car</span>
          </button>
        </Link>
      </div>
      {/* Tab Content */}
      {activeTab === "Car" ? <>{content}</> : <CarTracking />}

      {/* Car Grid */}
    </section>
  );
};

export default AllCars;
