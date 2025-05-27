import { Edit } from "lucide-react";
import { FaTrash } from "react-icons/fa6";

const CarCard = ({ car }) => {
  return (
    <div
      key={car.id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Car Image */}
      <div className="w-full h-[220px] bg-[#DDDDDD] flex items-center justify-center p-5 relative mb-4">
        <img src={car.image} alt={`${car.make} ${car.model}`} className="w-[200px] h-[100px]" />
        <div className="p-4 pb-2 absolute top-0 right-0">
          <span
            className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${car.statusColor}`}
          >
            {car.status}
          </span>
        </div>
      </div>

      {/* Car Details */}
      <div className="px-4 pb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-xl">
              {car.make}
            </h3>
            <p className="text-gray-600 my-1">{car.model}</p>
            <p className="text-gray-600 my-1">VIN: {car.vin}</p>
            <p className="text-gray-600 my-1">License Plate: {car.licensePlate}</p>
          </div>
          <div style={{ backgroundColor: car.color }} className={`size-4 rounded-full mt-2`}></div>
        </div>

        <span className="font-semibold text-lg block mt-2">Price: {car.price}</span>

        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center gap-2">
            <button className="size-10 flex justify-center items-center border border-gray-200 rounded">
              <Edit size={22} className="text-primary mx-auto" />
            </button>
            <button className="size-10 flex justify-center items-center border border-gray-200 rounded">
              <FaTrash size={18} className="text-rose-500 mx-auto" />
            </button>
          </div>
          <button className="bg-[#F4F4F4] text-gray-700 px-7 py-3 rounded-xl text-sm font-semibold">
            {car.actions ? car.actions[0] : "Unpublish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;