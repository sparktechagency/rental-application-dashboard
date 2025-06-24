import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../../redux/features/employee/employeeApi";
import { useEffect } from "react";
import { toast } from "sonner";
const EditEmployee = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  //get single employee
  const { data: responseData } = useGetEmployeeQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  //update employee
  const [updateEmployee, { isLoading }] = useEditEmployeeMutation();
  useEffect(() => {
    if (responseData) {
      form.setFieldsValue({
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        email: responseData.email,
        phone: responseData.phone,
        password: responseData.password,
        role: responseData.role,
      });
    }
  }, [responseData, form]);

  const onFinish = async (values) => {
    try {
      const response = await updateEmployee({ id, data: values }).unwrap();
      toast.success(response?.message);
      navigate("/employees");
    } catch (error) {
      toast.error(error?.data?.errorMessage || "Something went wrong");
    }
  };

  return (
    <section className="w-full min-h-screen px-5 space-y-5 bg-[#F5F5F5]">
      {/* Header */}
      <div className="flex items-center gap-3 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-full  transition-colors"
        >
          <ChevronLeft size={24} className="text-primary" />
        </button>
        <h1 className="text-xl lg:text-2xl font-semibold text-primary">
          Edit Employee
        </h1>
      </div>
      <Form
        form={form}
        name="add_employee"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label="Employee First Name"
          rules={[
            { required: true, message: "Please input Employee First Name!" },
          ]}
        >
          <CustomInput type="text" placeholder="Employee Name" />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          name="lastName"
          label="Employee Last Name"
          rules={[
            { required: true, message: "Please input Employee Last Name!" },
          ]}
        >
          <CustomInput type="text" placeholder="Employee Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Employee Email"
          rules={[
            {
              required: true,
              message: "Please input Employee Email!",
              type: "email",
            },
          ]}
        >
          <CustomInput type="text" placeholder="Employee Name" />
        </Form.Item>
        <Form.Item>
          <CustomButton loading={isLoading} type="primary" htmlType="submit" className={"w-full"}>
            Update Employee
          </CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditEmployee;
