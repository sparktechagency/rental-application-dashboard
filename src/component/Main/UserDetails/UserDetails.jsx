import { Switch } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  useGetUserByIdQuery,
  usePremiumUserMutation,
} from "../../../redux/features/user/userApi";

const UserDetails = () => {
  const { id } = useParams();
  const { data: responseData } = useGetUserByIdQuery(id, { skip: !id });
  const [makeUnMakePremiumUser] = usePremiumUserMutation();
  const navigate = useNavigate();
  const userDetails = responseData?.attributes;
  const handleMakeUnMakePremiumUser = async (userId) => {
    const isCurrentlyPremium = userDetails?.isPremiumUser;
    const action = isCurrentlyPremium ? "removed from" : "added to";

    try {
      await makeUnMakePremiumUser(userId).unwrap();
      toast.success(`User ${action} premium successfully!`);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(
        `Failed to ${isCurrentlyPremium ? "remove from" : "add to"} premium`
      );
    }
  };
  return (
    <div className="p-5">
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              className="border rounded-full p-2 cursor-pointer bg-primary text-white"
              onClick={() => navigate("/users")}
            >
              <IoIosArrowRoundBack className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {userDetails?.fullName}
            </h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
          <div>
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <img
                src={`${imageBaseUrl}${userDetails?.profileImage.imageUrl}`}
                alt="Profile"
                className="w-full aspect-[12/12]  rounded object-cover"
              />
            </div>
            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              {userDetails?.aboutMe ? userDetails?.aboutMe : "No description"}
            </p>
          </div>
          <div>
            {/* Personal Information */}
            <div className="mb-8 grid grid-cols-1 gap-y-3">
              <InfoRow
                label="Name"
                value={
                  userDetails?.fullName ? userDetails?.fullName : "No name"
                }
              />
              <InfoRow
                label="Email"
                value={userDetails?.email ? userDetails?.email : "N/A"}
              />
              <InfoRow
                label="Phone Number"
                value={
                  userDetails?.phoneNumber ? userDetails?.phoneNumber : "N/A"
                }
              />
              <InfoRow
                label="Gender"
                value={userDetails?.gender ? userDetails?.gender : "N/A"}
              />
              <InfoRow
                label="Religion"
                value={userDetails?.religion ? userDetails?.religion : "N/A"}
              />
              <InfoRow
                label="Marital Status"
                value={
                  userDetails?.maritalStatus
                    ? userDetails?.maritalStatus
                    : "N/A"
                }
              />
              <InfoRow
                label="Kids"
                value={userDetails?.kids ? userDetails?.kids : "N/A"}
              />
              <InfoRow
                label="Location"
                value={
                  userDetails?.locationName ? userDetails?.locationName : "N/A"
                }
              />
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-3">
                Interest
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {userDetails?.interests?.length > 0 ? (
                  userDetails?.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No interests</span>
                )}
              </div>
              <div className="flex items-center justify-between my-8">
                <h1 className="text-xl font-semibold ">Premium Status</h1>
                <Switch
                  onChange={() => handleMakeUnMakePremiumUser(userDetails?.id)}
                  checked={userDetails?.isPremiumUser}
                  className="text-purple-600 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for info rows
// eslint-disable-next-line react/prop-types
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="w-32 text-gray-500">{label}</span>
    <span className="font-semibold text-gray-700">{value}</span>
  </div>
);

export default UserDetails;
