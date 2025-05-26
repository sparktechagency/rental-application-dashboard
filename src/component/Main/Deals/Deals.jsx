/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Switch, Table } from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteDealMutation, useGetDealsQuery, useUpdateDealMutation } from "../../../redux/features/deals/dealApi";

const Deals = ({ appliedFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  
  // Prepare filters for API call
  const apiFilters = [];
  if (appliedFilters?.searchText) {
    apiFilters.push({ name: 'search', value: appliedFilters.searchText });
  }
  if (appliedFilters?.category && appliedFilters.category !== 'all') {
    apiFilters.push({ name: 'category', value: appliedFilters.category });
  }
  if (appliedFilters?.status && appliedFilters.status !== 'all') {
    apiFilters.push({ name: 'status', value: appliedFilters.status });
  }

  // Fetch deals with filters
  const { data, isLoading } = useGetDealsQuery({
    page: currentPage,
    limit: pageSize,
    filters: apiFilters
  });

  const [updateDeal, { isLoading: isUpdating }] = useUpdateDealMutation();
  const [deleteDeal, { isLoading: isDeleting }] = useDeleteDealMutation();

  // Prepare the dataSource for the table
  const dataSource = data?.data.attributes?.results?.map((deal) => ({
    key: deal._id,
    dealName: (
      <div className="flex items-center gap-2">
        <img
          src={`${imageBaseUrl}${deal.image?.imageUrl}`}
          alt={deal?.title}
          className="w-24 h-16 object-cover rounded"
        />
        <h1 className="text-lg">{deal?.title}</h1>
      </div>
    ),
    category: deal?.category?.name,
    promoCode: deal?.promoCode,
    status: deal?.status,
  })) || [];

  // Toggle status
  const handleStatusChange = async (dealId, currentStatus) => {
    try {
      await updateDeal({
        id: dealId,
        data: { status: currentStatus === "active" ? "inactive" : "active" },
      }).unwrap();
      toast.success(`Deal status updated to ${currentStatus === "active" ? "inactive" : "active"}`);
    } catch (error) {
      toast.error(`Failed to update status: ${error.message || "Unknown error"}`);
    }
  };

  // Delete deal
  const handleDelete = async (dealId) => {
    try {
      await deleteDeal(dealId).unwrap();
      toast.success("Deal deleted successfully");
    } catch (error) {
      toast.error(`Failed to delete deal: ${error.message || "Unknown error"}`);
    }
  };

  const columns = [
    {
      title: "Deals",
      dataIndex: "dealName",
      key: "dealName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Promo Code",
      dataIndex: "promoCode",
      key: "promoCode",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        return (
          <Switch
            checked={status === "active"}
            onChange={() => handleStatusChange(record.key, status)}
            loading={isUpdating}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            onClick={() => navigate(`/edit-deals/${record.key}`)}
            className="text-blue-500"
          >
            <TbEdit className="size-6"/>
          </Button>
          <Button
            type="link"
            onClick={() => handleDelete(record.key)}
            className="text-red-500"
            disabled={isDeleting}
          >
           <MdDelete className="size-6"/>
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <section className="w-full">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#EBF8FF",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          scroll={{ x: "max-content" }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.data?.attributes?.totalResults || 0,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />
      </ConfigProvider>
    </section>
  );
};

export default Deals;