import { useEffect } from "react";
import { Form, Button, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { TbTrash } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import {
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../../redux/features/subscriptions/subscriptionsApi";

const EditSubscription = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: subscriptionData, isLoading } = useGetSingleSubscriptionQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
      skip: !id,
    }
  );
  const [updateSubscription, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();

  useEffect(() => {
    if (subscriptionData) {
      // Ensure features and subscriptionFee are formatted correctly
      const formattedData = {
        ...subscriptionData,
        features:
          subscriptionData.features?.map((feature) => ({ feature })) || [],
        subscriptionFee: {
          western: subscriptionData.subscriptionFee.western,
          africa: subscriptionData.subscriptionFee.africa,
        },
      };
      form.setFieldsValue(formattedData);
    }
  }, [subscriptionData, form]);

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        features: values.features.map((feature) => feature?.feature),
        subscriptionFee: {
          western: parseFloat(values.subscriptionFee.western) || 0,
          africa: parseFloat(values.subscriptionFee.africa) || 0,
        },
      };
      await updateSubscription({ id, data: formattedValues }).unwrap();
      toast.success("Subscription Updated Successfully");
      navigate("/subscription");
      form.resetFields();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  }

  return (
    <section className="w-full px-5 pb-5">
      <div className="flex justify-between items-center py-6 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/subscription">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Subscription Plan</h1>
        </div>
      </div>
      <Form
        form={form}
        name="edit-subscription"
        onFinish={onFinish}
        layout="vertical"
      >
        {/* Subscription Name */}
        <Form.Item
          name="subscriptionName"
          label="Subscription Name"
          rules={[
            { required: true, message: "Please enter subscription name!" },
          ]}
        >
          <CustomInput placeholder="Enter subscription name" />
        </Form.Item>

        {/* Subscription Type */}
        <Form.Item
          name="subscriptionType"
          label="Subscription Type"
          rules={[
            { required: true, message: "Please select subscription type!" },
          ]}
        >
          <select
            placeholder="Select subscription type"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            style={{ width: "100%" }}
          >
            {[
              { value: "free", label: "Free" },
              { value: "paid", label: "Paid" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Form.Item>

        {/* Subscription Frequency */}
        <Form.Item
          name="subscriptionFrequency"
          label="Subscription Frequency"
          rules={[
            {
              required: true,
              message: "Please select subscription frequency!",
            },
          ]}
        >
          <select
            placeholder="Select subscription frequency"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            {[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Form.Item>

        {/* Subscription Duration */}
        <Form.Item
          name="subscriptionDuration"
          label="Subscription Duration"
          rules={[
            { required: true, message: "Please enter subscription duration!" },
            { pattern: /^[0-9]+$/, message: "Only numbers allowed" },
          ]}
        >
          <CustomInput placeholder="Enter subscription duration" />
        </Form.Item>

        {/* Subscription Fee (Western) */}
        <Form.Item
          name={["subscriptionFee", "western"]}
          label="Subscription Fee (Western - €)"
          rules={[
            {
              required: true,
              message: "Please enter fee for Western countries!",
            },
            { pattern: /^[0-9]+(\.[0-9]+)?$/, message: "Only numbers allowed" },
          ]}
        >
          <CustomInput placeholder="Enter fee for Western countries" />
        </Form.Item>

        {/* Subscription Fee (Africa) */}
        <Form.Item
          name={["subscriptionFee", "africa"]}
          label="Subscription Fee (Africa - €)"
          rules={[
            { required: true, message: "Please enter fee for Africa!" },
            { pattern: /^[0-9]+(\.[0-9]+)?$/, message: "Only numbers allowed" },
          ]}
        >
          <CustomInput placeholder="Enter fee for Africa" />
        </Form.Item>

        {/* Features (Dynamic List) */}
        <Form.List
          name="features"
          initialValue={subscriptionData?.features}
          rules={[
            {
              validator: async (_, features) => {
                if (!features || features.length < 1) {
                  return Promise.reject(
                    new Error("At least one feature is required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="w-full flex items-center justify-between gap-5"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "feature"]}
                    rules={[
                      { required: true, message: "Please enter a feature!" },
                    ]}
                    className="w-full"
                  >
                    <CustomInput
                      placeholder="Enter feature"
                      className="w-full"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <TbTrash
                    className="text-red-500 size-6 cursor-pointer -mt-7"
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Feature
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item>
          <CustomButton loading={isUpdating}>Update Subscription</CustomButton>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditSubscription;
