import { Form, DatePicker, message } from "antd";
import { IoChevronBack } from "react-icons/io5";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { useState, useMemo } from "react";
import { useAddDealMutation } from "../../../redux/features/deals/dealApi";
import { useGetDealCategoriesQuery } from "../../../redux/features/dealCategory/dealCategoryApi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react"; // Import JoditEditor

const AddDeals = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(""); // State for JoditEditor
  const [addDeal, { isLoading: isAdding }] = useAddDealMutation();

  // Fetch deal categories
  const { data: categoriesData, isLoading: isFetchingCategories } =
    useGetDealCategoriesQuery({ page: 1, limit: 5000, filters: [] });

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter deal description...",
      height: 400,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "link",
        "image",
        "video",
        "|",
        "undo",
        "redo",
      ],
      toolbarAdaptive: false,
    }),
    []
  );

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", description); // Take from JoditEditor state
      formData.append("locationCountry", values.locationCountry);
      formData.append("locationCity", values.locationCity);
      formData.append("category", values.category);
      formData.append("promoCode", values.promoCode);
      formData.append("expireDate", values.expiryDate.toISOString());
      if (file) {
        formData.append("dealsImage", file);
      }

      const res = await addDeal(formData).unwrap();
      console.log(res);
      message.success("Deal created successfully!");
      navigate("/deals-events");
    } catch (error) {
      message.error(
        `Failed to create deal: ${error.message || "Unknown error"}`
      );
    }
  };

  const handleCoverPhotoUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
    return false;
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFile(null);
    document.getElementById("fileUpload").value = null;
  };

  if (isFetchingCategories) {
    return <div>Loading...</div>;
  }

  const categories = categoriesData?.data?.attributes?.results || [];

  return (
    <div className="w-full px-5 pb-10 bg-[#F5F5F5]">
      <div className="py-5">
        <button
          className="flex gap-2 items-center px-5 py-3 bg-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          <IoChevronBack className="text-2xl" />
          Back
        </button>
      </div>

      <Form
        form={form}
        name="add_deal_form"
        onFinish={onFinish}
        layout="vertical"
        className="w-full p-5 bg-white rounded-lg"
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-5">
          Create New Deal
        </h1>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the Title!" }]}
        >
          <CustomInput placeholder="Type here..." />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <JoditEditor
            value={description}
            config={editorConfig}
            onBlur={(newContent) => {
              setDescription(newContent);
              form.setFieldsValue({ description: newContent });
            }}
          />
        </Form.Item>

        <div className="flex gap-5 justify-between items-center">
          <Form.Item
            label="Location Country"
            name="locationCountry"
            rules={[
              { required: true, message: "Please input the Location Country!" },
            ]}
            className="w-full"
          >
            <CustomInput placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            label="Location City"
            name="locationCity"
            rules={[
              { required: true, message: "Please input the Location City!" },
            ]}
            className="w-full"
          >
            <CustomInput placeholder="Enter location" />
          </Form.Item>
        </div>

        <div className="flex gap-5 justify-between items-center">
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select the category!" }]}
            className="w-full"
          >
            <select
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isFetchingCategories}
              value={form.getFieldValue("category") || ""}
              aria-label="Select category"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Form.Item>
        </div>

        <div className="flex gap-5 justify-between items-center">
          <Form.Item
            label="Promo Code"
            name="promoCode"
            rules={[
              { required: true, message: "Please input the Promo Code!" },
            ]}
            className="w-full"
          >
            <CustomInput placeholder="Enter Promo Code" />
          </Form.Item>

          <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[
              { required: true, message: "Please select the Expiry Date!" },
            ]}
            className="w-full"
          >
            <DatePicker
              className="w-full"
              size="large"
              placeholder="Select Expiry Date"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </div>

        <Form.Item label="Cover Image">
          <div className="w-full border border-gray-300 border-dashed rounded p-12">
            <label
              htmlFor="fileUpload"
              className="flex flex-col gap-2 justify-center items-center text-lg cursor-pointer text-blue-500"
            >
              <FaCloudUploadAlt size={24} />
              {imagePreview ? "Change File" : "Upload a file or drag and drop"}
              {!imagePreview && (
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
              )}
            </label>
            <input
              id="fileUpload"
              onChange={handleCoverPhotoUpload}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <p className="text-gray-700 mb-2">Image Preview:</p>
              <div className="relative w-fit">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-[200px] h-[200px] object-cover rounded"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </Form.Item>

        <Form.Item className="flex justify-end">
          <CustomButton type="primary" htmlType="submit" loading={isAdding}>
            Publish
          </CustomButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDeals;
