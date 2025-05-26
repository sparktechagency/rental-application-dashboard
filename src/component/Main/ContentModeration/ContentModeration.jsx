/* eslint-disable no-unused-vars */
"use client";
import { Table, Button, ConfigProvider, Tag, Select, message } from "antd";
import { useState } from "react";
import {
  useGetAllReportsQuery,
  useUpdateReportMutation,
} from "../../../redux/features/reports/reportApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import moment from "moment";
import { Link } from "react-router-dom";

const ContentModeration = () => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetching data with pagination parameters
  const { data: responseData, isLoading } = useGetAllReportsQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation();

  const allReports = responseData?.results || [];
  const totalResult = responseData?.totalResult || 0;

  const imageReportsData = allReports.map((report) => ({
    key: report?._id,
    reportedBy: report?.reporter?.fullName,
    reportedByUserImage: report?.reporter?.profileImage?.imageUrl,
    reportedUser: report?.reportedUser?.fullName,
    reportedUserImage: report?.reportedUser?.profileImage?.imageUrl,
    reportMessage: report?.reportMessage,
    status: report?.reportStatus,
    date: moment(report?.createdAt).fromNow(),
    reason: report?.reportReason,
  }));

  // Handle Pagination Change
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Handle Status Update
  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await updateReport({
        id: reportId,
        data: { reportStatus: newStatus },
      }).unwrap();
      message.success(`Report status updated to ${newStatus}`);
    } catch (error) {
      message.error("Failed to update report status");
    }
  };

  // Define status options
  const allStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
    { value: "rejected", label: "Rejected" },
  ];

  // Image Reports Table Columns
  const imageReportsColumns = [
    {
      title: "Reported By",
      dataIndex: "reportedBy",
      key: "reportedBy",
      render: (text, record) => (
        <div className="flex items-center gap-1">
          <img
            src={`${imageBaseUrl}${record?.reportedByUserImage}`}
            alt={record?.reportedBy}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-2">{record?.reportedBy}</span>
        </div>
      ),
    },
    {
      title: "Report Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Reported User",
      dataIndex: "reportedUser",
      key: "reportedUser",
      render: (text, record) => (
        <div className="flex items-center gap-1">
          <img
            src={`${imageBaseUrl}${record?.reportedUserImage}`}
            alt={record?.reportedBy}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-2">{record?.reportedUser}</span>
        </div>
      ),
    },
    {
      title: "Report Message",
      dataIndex: "reportMessage",
      key: "reportMessage",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag
          color={
            record?.status === "resolved"
              ? "green"
              : record.status === "pending"
              ? "blue"
              : "red"
          }
          className="capitalize rounded-full px-3 py-1"
        >
          {record?.status}
        </Tag>
      ),
    },
    {
      title: "Update Status",
      key: "updateStatus",
      render: (_, record) => {
        // Filter options: Exclude "pending" if status is "resolved" or "rejected"
        const statusOptions =
          record.status === "resolved" || record.status === "rejected"
            ? allStatusOptions.filter((option) => option.value !== "pending")
            : allStatusOptions;

        return (
          <select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(e) => handleStatusUpdate(record.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            loading={isUpdating}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "View",
      key: "action",
      render: (_, record) => (
        <Link to={`/content-moderation/${record?.key}`}>
          <Button type="primary">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <section className="w-full min-h-screen px-5">
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <h1 className="text-2xl font-semibold">All Reports</h1>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#E6ECF7",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          columns={imageReportsColumns}
          dataSource={imageReportsData}
          loading={isLoading}
          scroll={{ x: "max-content" }}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: totalResult,
            onChange: handlePaginationChange,
          }}
        />
      </ConfigProvider>
    </section>
  );
};

export default ContentModeration;
