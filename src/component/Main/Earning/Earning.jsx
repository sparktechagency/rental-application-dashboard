import { useEffect, useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useGetAllEarningsQuery } from "../../../redux/features/earning/earningApi";

const Earning = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEarnings, setAllEarnings] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: responseData, isLoading } = useGetAllEarningsQuery({
    page: currentPage,
    limit: 10,
  });

  useEffect(() => {
    if (responseData) {
      const { data, pagination } = responseData;
      setAllEarnings(data?.payments);
      setTotalResult(pagination?.totalItem);
    }
  }, [responseData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewDetails = (transaction) => {
    setTransactionDetails(transaction);
    setIsModalOpen(true);
  };

  const dataSource = allEarnings?.map((earning, index) => ({
    key: index + 1,
    transactionId: earning?._id,
    userName: `${earning?.userName} ` || "N/A",
    email: earning?.email || "N/A",
    amount: earning?.amount || "N/A",
    date: earning?.date ? earning?.date : "N/A",
  }));

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => (
        <span className="text-gray-700 font-medium">#{text}</span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => (
        <span className="text-gray-700 font-medium">{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <span className="text-gray-700 font-semibold">${text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <button
          className="px-5 py-1 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={() => handleViewDetails(record)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <section className="w-full min-h-screen px-5 bg-[#F5F5F5]">
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-5 mb-5">
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-[#EEFEE6] flex justify-center items-center">
            <BadgeCent className="size-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Total Profit</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-primary notranslate">
              $ {demoStats.totalProfit.toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-[#EEFEE6] flex justify-center items-center">
            <BadgeCent className="size-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Total Expenses</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-primary notranslate">
              ${demoStats.totalExpenses.toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-[#EEFEE6] flex justify-center items-center">
            <BadgeCent className="size-8 text-[#F0C977]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Net Profit</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-primary notranslate">
              ${demoStats.netProfit.toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-36 flex items-center gap-5 p-5 rounded-xl bg-[#FEFEFE]">
          <div className="size-20 rounded-full p-5 bg-[#EEFEE6] flex justify-center items-center">
            <BadgeCent className="size-7 text-cyan-700" />
          </div>
          <div className="space-y-2">
            <h1 className="font-semibold text-[#9E9E9E]">Unpaid Payments</h1>
            <h1 className="text-2xl md:text-3xl font-bold text-primary notranslate">
              ${demoStats.unpaidPayments.toLocaleString()}
            </h1>
          </div>
        </div>
      </div> */}
      <div className="bg-white rounded-lg mb-5">
        <h1 className="text-xl md:text-2xl font-bold p-5 text-gray-600">
          Recent Transactions
        </h1>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#EEFEE6",
                headerBorderRadius: 5,
              },
            },
          }}
        >
          <Table
            loading={isLoading}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              total: totalResult,
              onChange: handlePageChange,
            }}
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            scroll={{ x: "max-content" }}
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        {transactionDetails && (
          <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Transaction Details</h1>
            {/* User Details */}
            <div className="space-y-7 mt-8 ">
              {/* Name */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">Name : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {transactionDetails?.userName}
                </p>
              </div>
              {/* Email */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">Email : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {transactionDetails.email}
                </p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">Amount : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  ${transactionDetails?.amount}
                </p>
              </div>
              {/*  Date */}
              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500"> Date : </p>
                </div>
                <p className="text-gray-800 text-sm">
                  {transactionDetails.date}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Earning;
