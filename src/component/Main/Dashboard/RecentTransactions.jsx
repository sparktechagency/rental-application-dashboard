import { ConfigProvider, Modal, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaChartBar,
  FaEye,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetAllEarningsQuery } from "../../../redux/features/earning/earningApi";

const RecentTransactions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data: responseData } = useGetAllEarningsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const earningData = responseData?.results || [];
  const totalPages = responseData?.totalPages || 1;
  console.log(totalPages);

  const dataSource = earningData.map((record, index) => ({
    key: index + 1,
    trxId: record?._id,
    userName: record?.userId?.fullName,
    userEmail: record?.userId?.email,
    profileImage: record?.userId?.profileImage?.imageUrl,
    subscriptionName: record?.subscriptionId?.subscriptionName,
    subscriptionType: record?.subscriptionId?.subscriptionType,
    date: moment(record?.createdAt).format("DD MMM, YYYY"),
    amount: `€${record?.totalPrice.toFixed(2)}`,
    user: {
      name: record?.userId?.fullName,
      email: record?.userId?.email,
    },
    subscription: {
      name: record?.subscriptionId?.subscriptionName,
      type: record?.subscriptionId?.subscriptionType,
      frequency: record?.subscriptionId?.subscriptionFrequency,
      duration: record?.subscriptionId?.calculatedDuration,
    },
  }));

  const columns = [
    {
      title: "User",
      dataIndex: "userName",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={`${imageBaseUrl}${record?.profileImage}`}
            className="size-10 rounded-full object-cover"
            alt="User Avatar"
          />
          <div>
            <span className="text-gray-700 text-lg font-semibold">
              {record?.userName}
            </span>
            <p className="text-gray-500">{record?.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Subscription",
      dataIndex: "subscriptionName",
      key: "subscriptionName",
      render: (text) => (
        <div className="px-3 py-2 rounded-md  w-fit font-semibold bg-green-100 text-green-800 flex items-center">
          {text}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span className="flex items-center">
          <FaCalendarAlt className="mr-2 text-purple-600" />
          {text}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <span className="font-semibold text-green-600">{text}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <FaEye
          className="cursor-pointer text-xl text-blue-500 hover:text-primary"
          onClick={() => {
            setSelectedRecord(record);
            setIsModalVisible(true);
          }}
        />
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Recent Transactions
          </h1>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#f1f5f9",
                headerColor: "#1f2937",
                borderColor: "#e5e7eb",
                rowHoverBg: "#f8fafc",
              },
            },
          }}
        >
          <Table
            className="shadow-sm rounded-lg"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            rowClassName="hover:bg-gray-50"
          />
        </ConfigProvider>
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          className="rounded-lg"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Transaction Details
            </h1>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="flex items-center text-gray-600">
                  <FaUser className="mr-2 text-primary" />
                  User Name
                </span>
                <span className="font-medium">
                  {selectedRecord?.user?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="flex items-center text-gray-600">
                  <FaUser className="mr-2 text-primary" />
                  Email
                </span>
                <span className="font-medium">
                  {selectedRecord?.user?.email || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="flex items-center text-gray-600">
                  <FaMoneyBillWave className="mr-2 text-green-600" />
                  Trx ID
                </span>
                <span className="font-medium">
                  {selectedRecord?.trxId || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="flex items-center text-gray-600">
                  <FaChartBar className="mr-2 text-primary" />
                  Subscription
                </span>
                <span className="font-medium">
                  {selectedRecord?.subscription?.name || "N/A"} (
                  {selectedRecord?.subscription?.frequency || "N/A"})
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="flex items-center text-gray-600">
                  <FaMoneyBillWave className="mr-2 text-green-600" />
                  Amount
                </span>
                <span className="font-medium text-green-600">
                  {selectedRecord?.amount || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-purple-600" />
                  Date
                </span>
                <span className="font-medium">
                  {selectedRecord?.date || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RecentTransactions;
