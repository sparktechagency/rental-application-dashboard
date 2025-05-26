/* eslint-disable react/prop-types */
import { IoCheckmarkOutline, IoGlobeOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useDeleteSubscriptionMutation } from "../../../redux/features/subscriptions/subscriptionsApi";

const SubscriptionCard = ({ subscription }) => {
  const {
    _id,
    subscriptionName,
    subscriptionFee,
    calculatedDuration,
    features,
  } = subscription;
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  // Show confirmation dialog for deletion
  const showDeleteConfirm = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Subscription? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id).unwrap();
      toast.success("Subscription deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full bg-white border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">{subscriptionName}</h2>
        <div className="mt-2">
          <p className="text-sm text-gray-500 italic">{calculatedDuration} Plan</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        {/* Western Pricing */}
        <div className="flex items-center justify-between border-b-2 border-blue-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <IoGlobeOutline className="text-blue-500" size={20} />
            <span className="text-sm font-semibold text-primary">Western Countries</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">€{subscriptionFee.western}</span>
            <span className="text-sm text-gray-600">/ {calculatedDuration}</span>
          </div>
        </div>

        {/* Africa Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IoGlobeOutline className="text-green-500" size={20} />
            <span className="text-sm font-semibold text-green-700">Africa</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-green-600">€{subscriptionFee.africa}</span>
            <span className="text-sm text-gray-600">/ {calculatedDuration}</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Features</h3>
        <ul className="space-y-2">
          {features?.map((benefit, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-800">
              <span className="flex-none w-6 h-6 rounded-full flex justify-center items-center bg-green-100 text-green-600">
                <IoCheckmarkOutline size={16} />
              </span>
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => showDeleteConfirm(_id)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          <IoTrashOutline size={18} />
          Delete
        </button>
        <Link to={`/subscription/edit-subscription/${_id}`} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-primary text-white border border-primary rounded-lg hover:bg-primary transition-colors duration-200">
            <IoPencilOutline size={18} />
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionCard;