import { FiUsers } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import { FaCrown } from "react-icons/fa6";
import { AiOutlineEuro } from "react-icons/ai";
import { useGetDashboardDataQuery } from "../../../redux/features/dashboard/dashboardApi";

const Status = () => {
  // Uncomment this when API integration is ready
  const { data: responseData } = useGetDashboardDataQuery(undefined,{
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
    
  });

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-8 mb-10">
      {/* Total Earnings */}
      <div className="w-full md:max-w-96  min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
          <AiOutlineEuro className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Total Earnings</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
          € {responseData?.totalEarnings || 0}
          </h1>
        </div>
      </div>
      {/* Total Users */}
      <div className="w-full md:max-w-96 min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
          <FiUsers className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Total Registered Users</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
            {responseData?.totalRegisterUsers || 0}
          </h1>
        </div>
      </div>
      {/* New Users today */}
      <div className="w-full md:max-w-96  min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
          <RiUserAddLine className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Total Active Users</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
            {responseData?.totalActiveUsers || 0}
          </h1>
        </div>
      </div>
            <div className="w-full md:max-w-96 min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
          <FiUsers className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Total Free Users</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
            {responseData?.totalFreeUsersCount || 0}
          </h1>
        </div>
      </div>
      {/* Daily Premium Users */}
      <div className="w-full md:max-w-96  min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-secondary flex justify-center items-center">
          <FaCrown className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Total Premium Users</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600 notranslate">
            {responseData?.totalPremiumUsers || 0}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
