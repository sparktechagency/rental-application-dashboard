import { useState, useEffect } from "react";
import { ConfigProvider, Table } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../../redux/features/employee/employeeApi";
import { toast } from "sonner";

const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  const { data: responseData, isLoading } = useGetAllEmployeesQuery({
    page: currentPage,
    limit: 10,
  });

  // delete employee
  const [deleteEmployee] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (responseData) {
      const { data, pagination } = responseData;
      setAllUsers(data);
      setTotalResult(pagination?.totalItem);
    }
  }, [responseData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id).unwrap();
      toast.success("Employee deleted successfully");
    } catch (error) {
      toast.error(error?.data?.errorMessage || "Something went wrong");
    }
  };

  const dataSource = allUsers.map((user, index) => ({
    key: index + 1,
    id: user?._id,
    name: `${user?.firstName} ${user?.lastName}` || "N/A",
    profileImage: user?.profileImage,
    registrationDate: user?.createdAt
      ? moment(user?.createdAt).format("YYYY-MM-DD")
      : "N/A",
    email: user?.email || "N/A",
    role: user?.role || "N/A",
  }));

  const columns = [
    {
      title: "#SI",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Employee Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, { id }) => (
        <div className="flex gap-3">
          {/* Edit */}
          <Link to={`/employees/edit-employee/${id}`}>
            <button>
              <FaEdit className="text-primary size-[22px]" />
            </button>
          </Link>
          {/* Delete */}
          <button onClick={() => handleDelete(id)}>
            <FaTrash className="text-red-600 size-5" />
          </button>
        </div>
      ),
    },
  ];

  console.log("Employees", responseData);
  return (
    <section className="w-full min-h-screen px-5 space-y-5 bg-[#F5F5F5]">
      <div className="flex justify-end">
        <Link to="/employees/add-employee">
          <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus size={16} />
            <span>Add Employee</span>
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg mb-5">
        <h1 className="text-xl md:text-2xl font-bold p-5 text-gray-600">
          All Employees
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
    </section>
  );
};

export default Employee;
