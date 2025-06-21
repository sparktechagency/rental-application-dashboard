import { FaCarSide } from "react-icons/fa6";
import {  AiOutlineEuro } from "react-icons/ai";
import { useGetDashboardDataQuery } from "../../../redux/features/dashboard/dashboardApi";
import {Calendar1, Car} from 'lucide-react';
const Status = () => {
  // Uncomment this when API integration is ready
  const { data: responseData } = useGetDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-8 mb-10">
      {/* Total Earnings */}
      <div className="w-full md:max-w-96  min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-[#EEFEE6] flex justify-center items-center">
          <AiOutlineEuro className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Earnings</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-primary notranslate">
            € {responseData?.totalBalance || 0}
          </h1>
        </div>
      </div>
      {/* Total Users */}
      <div className="w-full md:max-w-96 min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-[#EEFEE6] flex justify-center items-center">
          <Car className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">
             Rentals Out
          </h1>
          <h1 className="text-2xl md:text-3xl font-bold text-primary notranslate">
            {responseData?.totalRentalOuts || 0}
          </h1>
        </div>
      </div>

      <div className="w-full md:max-w-96 min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-[#FEF5DA] flex justify-center items-center">
          <Calendar1 className="size-8 text-[#FBBC05]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Scheduled Pickups</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-[#FBBC05] notranslate">
            {responseData?.totalScheduledPickups || 0}
          </h1>
        </div>
      </div>
      {/* Daily Premium Users */}
      <div className="w-full md:max-w-96  min-h-36 flex items-center gap-5 p-5  rounded-xl  bg-[#FEFEFE]">
        <div className="size-20 rounded-full p-5 bg-[#FCE3E1] flex justify-center items-center">
          <FaCarSide className="size-8 text-[#EB4335]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-[#9E9E9E]">Overdue rentals</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-[#EB4335] notranslate">
            {responseData?.overdueRentals || 0}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
