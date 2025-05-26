import { useState } from "react";
import { Plus, Edit } from "lucide-react";
import { FaTrash } from "react-icons/fa6";

const AllCars = () => {
  const [activeTab, setActiveTab] = useState("Car");
  const [currentPage, setCurrentPage] = useState(12);

  const cars = [
    {
      id: 1,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 2,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 3,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 4,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Available",
      statusColor: "bg-[#EEFEE6] text-gray-600",
    },
    {
      id: 5,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Rental",
      statusColor: "bg-yellow-100 text-yellow-700",
      actions: ["Rental", "Maintenance"],
    },
    {
      id: 6,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Maintenance",
      statusColor: "bg-red-100 text-red-700",
      actions: ["Not Available", "Maintenance"],
    },
    {
      id: 7,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Maintenance",
      statusColor: "bg-red-100 text-red-700",
      actions: ["Not Available", "Maintenance"],
    },
    {
      id: 8,
      image:
        "https://iter-bene.s3.eu-north-1.amazonaws.com/3e8fabf0591db2ad3fb1b71394e2e18336fe3b5e.png",
      title: "Luxury sedan",
      subtitle: "BMW 5 series 2025",
      seats: 5,
      price: "500/Day",
      status: "Rental",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex items-center space-x-4 bg-white px-4 py-3 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab("Car")}
            className={`${
              activeTab === "Car" ? "bg-[#F4F4F4]" : ""
            } text-gray-950 px-7 py-3 rounded-lg`}
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
        <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={16} />
          <span>Add Car</span>
        </button>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Car Image */}
            <div className="w-full h-[170px] bg-[#DDDDDD] flex items-center justify-center p-5 relative mb-4">
              <img
                src={car.image}
                alt={car.title}
                className="w-[200px] h-[100px]"
              />
              <div className="p-4 pb-2 absolute top-0 right-0">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${car.statusColor}`}
                >
                  {car.status}
                </span>
              </div>
            </div>

            {/* Car Details */}
            <div className="px-4 pb-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-xl">
                {car.title}
              </h3>
              <p className="text-lg text-gray-600 my-2">{car.subtitle}</p>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                <div className="flex text-lg items-center space-x-1">
                  <span>🪑</span>
                  <span>Seats: {car.seats}</span>
                </div>
                <span className="font-semibold text-lg">Price: {car.price}</span>
              </div>
              <div className="flex items-center justify-between mt-7">
                <div className="flex items-center gap-2 ">
                  <button className="size-10 flex justify-center items-center border border-gray-200  rounded">
                    <Edit size={22} className="text-primary mx-auto" />
                  </button>
                  <button className="size-10 flex justify-center items-center border border-gray-200  rounded">
                    <FaTrash size={18} className="text-rose-500 mx-auto" />
                  </button>
                </div>
                <button className="bg-[#F4F4F4] text-gray-700 px-7 py-3 rounded-xl text-sm font-semibold">Unpublish</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCars;
