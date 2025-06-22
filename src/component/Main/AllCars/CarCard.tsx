import { Edit } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { useDeleteCarMutation } from "../../../redux/features/car/carApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const { _id, image, make, model, vin, licensePlate, color, price, status, doors, camera, bluetooth, seats, description, tax } = car;
  const [deleteCar, { isLoading }] = useDeleteCarMutation();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this ${make} ${model}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await deleteCar(_id).unwrap();
        toast.success("Car deleted successfully!");
      } catch (error) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div
      key={_id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Car Image */}
      <div className="w-full h-[220px] bg-[#DDDDDD] flex items-center justify-center p-5 relative mb-4">
        <img src={image} alt={`${make} ${model}`} className="w-[200px] h-[100px]" />
        <div className="p-4 pb-2 absolute top-0 right-0">
          <span
            className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium border ${status === "available" ? "bg-[#EEFEE6] text-green-800 border-[#EEFEE6]" : "bg-red-100 text-red-800 border-red-600"} text-gray-600`}
          >
            {status?.slice(0, 1).toUpperCase() + status?.slice(1)}
          </span>
        </div>
      </div>

      {/* Car Details */}
      <div className="px-4 pb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-xl">
              {make}
            </h3>
            <p className="text-gray-600 my-1">{model}</p>
            <p className="text-gray-600 my-1">VIN: {vin}</p>
            <p className="text-gray-600 my-1">License Plate: {licensePlate}</p>
          </div>
          <div style={{ backgroundColor: color }} className={`size-4 rounded-full mt-2`}></div>
        </div>

        <span className="font-semibold text-lg block mt-2">Price: ${price}</span>

        {/* Additional Car Info */}
        <div className="mt-3 text-sm text-gray-600">
          <p>Doors: {doors} | Seats: {seats}</p>
          <p>Camera: {camera ? 'Yes' : 'No'} | Bluetooth: {bluetooth ? 'Yes' : 'No'}</p>
          {description && <p className="mt-1">Description: {description}</p>}
          {tax && <p>Tax: ${tax}</p>}
        </div>

        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center gap-2">
           <Link to={`/edit-vehicle/${_id}`}>
            <button className="size-10 flex justify-center items-center border border-gray-200 rounded">
              <Edit size={22} className="text-primary mx-auto" />
            </button>
            </Link>
            <button
              className="size-10 flex justify-center items-center border border-gray-200 rounded"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <FaTrash size={18} className="text-rose-500 mx-auto" />
            </button>
          </div>
          <button className="bg-[#F4F4F4] text-gray-700 px-7 py-3 rounded-xl text-sm font-semibold">
            {status ? status?.slice(0, 1).toUpperCase() + status?.slice(1) : "Unpublish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;