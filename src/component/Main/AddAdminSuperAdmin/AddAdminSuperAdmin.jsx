import { Form, Select, message } from "antd";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
const { Option } = Select;

const AddAdminSuperAdmin = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    message.success("Invitation sent successfully!");
  };

  return (
    <div className="w-full px-5">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <Link className="flex gap-2 items-center my-6" to="/admins">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Back</h1>
        </Link>
      </div>
      <h1 className="text-xl md:text-2xl font-semibold text-center py-5">Add Admin</h1>
      <Form
        form={form}
        name="add_admin_form"
        onFinish={onFinish}
        layout="vertical"
        className="w-full max-w-3xl mx-auto border p-8 rounded shadow-md"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <CustomInput type="email" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <CustomInput isPassword type="email" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Select Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select size="large" placeholder="Select a role">
            <Option value="Admin">Admin</Option>
            {/* Add other roles if needed */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Write a message for your new admin"
          name="message"
          rules={[{ required: true, message: "Please input a message!" }]}
        >
          <CustomInput isTextArea />
        </Form.Item>

        <Form.Item>
          <CustomButton className="w-full">Send Invitation</CustomButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAdminSuperAdmin;
