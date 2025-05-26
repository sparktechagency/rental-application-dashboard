/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, Switch, Button, ConfigProvider } from "antd";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../../redux/features/events/eventsApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const Events = ({ appliedFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Prepare filters for API call
  const apiFilters = [];
  if (appliedFilters?.searchText) {
    apiFilters.push({ name: 'search', value: appliedFilters.searchText });
  }
  if (appliedFilters?.status && appliedFilters.status !== 'all') {
    apiFilters.push({ name: 'status', value: appliedFilters.status });
  }
  if (appliedFilters?.locationCountry) {
    apiFilters.push({ name: 'locationCountry', value: appliedFilters.locationCountry });
  }
  if (appliedFilters?.locationCity) {
    apiFilters.push({ name: 'locationCity', value: appliedFilters.locationCity });
  }

  // Fetch events with filters
  const { data, isLoading } = useGetEventsQuery({
    page: currentPage,
    limit: pageSize,
    filters: apiFilters
  });

  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  // Format the event date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Prepare the dataSource for the table
  const dataSource =
    data?.data?.attributes?.results?.map((event) => ({
      key: event._id,
      eventName: (
        <div className="flex items-center gap-2">
          <img
            src={`${imageBaseUrl}${event.image?.imageUrl}`}
            alt={event.title}
            className="w-24 h-16 object-cover rounded"
          />
          <span className="text-lg">{event?.title}</span>
        </div>
      ),
      locationCountry: event?.locationCountry,
      locationCity: event?.locationCity,
      startDate: formatDate(event?.eventDate),
      status: event.status,
    })) || [];

  // Toggle status
  const handleStatusChange = async (eventId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateEvent({
        id: eventId,
        data: { status: newStatus },
      }).unwrap();
      toast.success(`Event status updated to ${newStatus}`);
    } catch (error) {
      toast.error(
        `Failed to update status: ${error.message || "Unknown error"}`
      );
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId).unwrap();
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(
        `Failed to delete event: ${error.message || "Unknown error"}`
      );
    }
  };

  const columns = [
    {
      title: "Upcoming Event",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Location Country",
      dataIndex: "locationCountry",
      key: "locationCountry",
    },
    {
      title: "Location City",
      dataIndex: "locationCity",
      key: "locationCity",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status === "active"}
          onChange={() => handleStatusChange(record.key, status)}
          loading={isUpdating}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            onClick={() => navigate(`/edit-event/${record.key}`)}
            className="text-blue-500"
          >
            <TbEdit className="size-6" />
          </Button>
          <Button
            type="link"
            onClick={() => handleDelete(record.key)}
            className="text-red-500"
          >
            <MdDelete className="size-6" />
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

export default Events;