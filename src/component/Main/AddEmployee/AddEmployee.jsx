import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Add Employee:", values);
    // Handle form submission logic here
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
        <h1 className="text-xl lg:text-2xl font-semibold text-primary">Add Employee</h1>
      </div>
      <Form
        form={form}
        name="add_employee"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="employeeName"
          label="Employee Name"
          rules={[{ required: true, message: "Please input Employee Name!" }]}
        >
          <CustomInput type="text" placeholder="Employee Name" />
        </Form.Item>

        <Form.Item
          name="employeeEmail"
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
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input Password!" }]}
        >
          <CustomInput
            type="password"
            placeholder={"Enter password"}
            isPassword
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            { required: true, message: "Please confirm Password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <CustomInput
            type="password"
            placeholder={"Enter password"}
            isPassword
          />
        </Form.Item>

        <Form.Item>
          <CustomButton type="primary" htmlType="submit" className={"w-full"}>
            Add Employee
          </CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddEmployee;
