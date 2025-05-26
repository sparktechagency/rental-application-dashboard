import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import SubscriptionCard from "./SubscriptionCard";
import { Spin, Pagination } from "antd";
import { useState } from "react";
import { useGetSubscriptionsQuery } from "../../../redux/features/subscriptions/subscriptionsApi";

const Subscription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // Number of items per page

  const { data: responseData, isLoading } = useGetSubscriptionsQuery({
    page: currentPage,
    limit: limit,
  });

  const allSubscriptions = responseData?.results;
  const totalResults = responseData?.totalResults;

  let content = null;

  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (!allSubscriptions?.length) {
    content = <h1>No Subscriptions Found</h1>;
  } else {
    content = (
      <>
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
          {allSubscriptions?.map((subscription, i) => (
            <SubscriptionCard key={i} subscription={subscription} />
          ))}
        </div>
        {/* Pagination Component */}
        <div className="flex justify-center my-5">
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={totalResults}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </>
    );
  }


  return (
    <section className="w-full px-5 min-h-screen bg-[#F5F5F5]">
      <div className="flex flex-col md:flex-row  gap-6 justify-between items-center py-[19px] border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold ">All Subscriptions</h1>
        <Link to="/subscription/add-subscription">
          <button className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Subscription
          </button>
        </Link>
      </div>
      {content}
    </section>
  );
};

export default Subscription;
