import { useState } from "react";
import { Plus } from "lucide-react";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";
import CarTracking from "../CarTracking/CarTracking";

const AllCars = () => {
  const [activeTab, setActiveTab] = useState("Car");

  const cars = [
    {
      id: 1,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "BMW 5 series 2025",
      vin: "WBA5A7C55F0A12345",
      licensePlate: "ABC-1234",
      color: "#000000",
      price: "500/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 2,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "Mercedes E-Class 2025",
      vin: "WDDZF4KBXFA123456",
      licensePlate: "XYZ-5678",
      color: "#C0C0C0",
      price: "550/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 3,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "Audi A6 2025",
      vin: "WAUZZZ4G5FN123457",
      licensePlate: "DEF-9012",
      color: "#FFFFFF",
      price: "520/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 4,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "Lexus ES 2025",
      vin: "JT8BF28G5F0123458",
      licensePlate: "GHI-3456",
      color: "#0000FF",
      price: "480/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 5,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "BMW 5 series 2025",
      vin: "WBA5A7C55F0A12349",
      licensePlate: "JKL-7890",
      color: "#808080",
      price: "500/Day",
      status: "Rental",
      statusColor: "bg-yellow-100 text-yellow-700",
      actions: ["Rental", "Maintenance"],
    },
    {
      id: 6,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "Mercedes E-Class 2025",
      vin: "WDDZF4KBXFA123460",
      licensePlate: "MNO-1234",
      color: "#FF0000",
      price: "550/Day",
      status: "Maintenance",
      statusColor: "bg-red-100 text-red-700",
      actions: ["Not Available", "Maintenance"],
    },
    {
      id: 7,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "Audi A6 2025",
      vin: "WAUZZZ4G5FN123461",
      licensePlate: "PQR-5678",
      color: "#000000",
      price: "520/Day",
      status: "Maintenance",
      statusColor: "bg-red-100 text-red-700",
      actions: ["Not Available", "Maintenance"],
    },
    {
      id: 8,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      make: "Luxury sedan",
      model: "Lexus ES 2025",
      vin: "JT8BF28G5F0123462",
      licensePlate: "STU-9012",
      color: "#C0C0C0",
      price: "480/Day",
      status: "Rental",
      statusColor: "bg-yellow-100 text-yellow-700",
      actions: ["Rental", "Maintenance"],
    },
  ];

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
      {activeTab === "Car" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
       <CarTracking />
      )}

      {/* Car Grid */}
    </section>
  );
};

export default AllCars;
