import Status from "../../component/Main/Dashboard/Status";
import Charts from "../../component/Main/Dashboard/Charts";
import RecentUsers from "../../component/Main/Dashboard/RecentTransactions";
const DashboardHome = () => {
  return (
    <section>
      <div className="w-full px-5 min-h-screen py-5 space-y-5 bg-[#F5F5F5]">
        <Status />
        <Charts />
        <RecentUsers/>
      </div>
    </section>
  );
};

export default DashboardHome;
