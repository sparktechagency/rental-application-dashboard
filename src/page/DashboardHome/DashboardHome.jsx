import Status from "../../component/Main/Dashboard/Status";
import Charts from "../../component/Main/Dashboard/Charts"
import RecentBooking from "../../component/Main/Dashboard/RecentBooking";
const DashboardHome = () => {
  return (
    <div className="w-full px-5  space-y-5 bg-[#F5F5F5]">
      <Status />
      <Charts />
      <RecentBooking/>
    </div>
  );
};

export default DashboardHome;
