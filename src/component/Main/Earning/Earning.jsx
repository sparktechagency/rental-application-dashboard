import { useState } from "react";
import { ConfigProvider, Table } from "antd";

const Earning = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Demo data matching the image
  const demoTransactions = [
    {
      key: "34567890",
      transactionId: "34567890",
      userName: "Sofia",
      email: "Emily White",
      amount: "$400",
      date: "19 Apr 2024",
      status: "Active",
    },
    {
      key: "12345678",
      transactionId: "12345678",
      userName: "Enrique",
      email: "John Doe",
      amount: "$250",
      date: "18 Apr 2024",
      status: "Active",
    },
    {
      key: "45678901",
      transactionId: "45678901",
      userName: "Liam",
      email: "Alice Johnson",
      amount: "$500",
      date: "20 Apr 2024",
      status: "Active",
    },
    {
      key: "23456789",
      transactionId: "23456789",
      userName: "Carlos",
      email: "Robert Brown",
      amount: "$150",
      date: "18 Apr 2024",
      status: "Block",
    },
    {
      key: "56789012",
      transactionId: "56789012",
      userName: "Olivia",
      email: "Chris Lee",
      amount: "$350",
      date: "21 Apr 2024",
      status: "Active",
    },
    {
      key: "87654321",
      transactionId: "87654321",
      userName: "Maria",
      email: "Jane Smith",
      amount: "$300",
      date: "17 Apr 2024",
      status: "Active",
    },
    {
      key: "67890123",
      transactionId: "67890123",
      userName: "Noah",
      email: "Emma Davis",
      amount: "$450",
      date: "22 Apr 2024",
      status: "Banned",
    },
    {
      key: "78901234",
      transactionId: "78901234",
      userName: "Ava",
      email: "David Wilson",
      amount: "$600",
      date: "23 Apr 2024",
      status: "Active",
    },
  ];

  const handlePageChange = (page) => setCurrentPage(page);

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
      render: (text) => (
        <span className="text-gray-600">{text}</span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <span className="text-gray-700 font-semibold">{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span className="text-gray-600">{text}</span>
      ),
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <button 
          className="px-5 py-1 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={() => console.log(`View user ${record.key}`)}
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
            loading={false}
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              total: demoTransactions.length,
              pageSize: 10,
              onChange: handlePageChange,
            }}
            columns={columns}
            dataSource={demoTransactions}
            rowKey="key"
            scroll={{ x: "max-content" }}
          />
        </ConfigProvider>
      </div>
    </section>
  );
};

export default Earning;