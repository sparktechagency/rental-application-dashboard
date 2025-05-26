import { Form, DatePicker, message } from "antd";
import { IoChevronBack } from "react-icons/io5";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  useGetSingleDealQuery,
  useUpdateDealMutation,
} from "../../../redux/features/deals/dealApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetDealCategoriesQuery } from "../../../redux/features/dealCategory/dealCategoryApi";
import { FaCloudUploadAlt } from "react-icons/fa";
import JoditEditor from "jodit-react"; // Import JoditEditor
import dayjs from "dayjs";
const EditDeals = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the deal ID from the URL
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(""); // State to hold the editor content

  // Fetch the deal data
  const { data: dealData, isLoading: isFetchingDeal } = useGetSingleDealQuery(
    id,
    {
      skip: !id,
    }
  );

  // Fetch deal categories
  const { data: categoriesData, isLoading: isFetchingCategories } =
    useGetDealCategoriesQuery({ page: 1, limit: 5000, filters: [] });

  const [updateDeal, { isLoading: isUpdating }] = useUpdateDealMutation();

  // JoditEditor configuration
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter deal description",
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

  // Pre-fill the form with the fetched deal data
  useEffect(() => {
    if (dealData?.data) {
      const deal = dealData?.data?.attributes;
      const parsedEventDate = deal?.expireDate ? dayjs(deal.expireDate) : null;
      setDescription(deal?.description || "");

      form.setFieldsValue({
        title: deal?.title,
        description: deal?.description, // Set description in the form as well
        locationCountry: deal?.locationCountry,
        locationCity: deal?.locationCity,
        category: deal?.category?._id || deal?.category,
        promoCode: deal?.promoCode,
        expireDate:
          parsedEventDate && parsedEventDate.isValid() ? parsedEventDate : null,
      });

      // Set the existing image preview if available
      if (deal?.image?.imageUrl) {
        setImagePreview(`${imageBaseUrl}${deal.image.imageUrl}`);
      }
    }
  }, [dealData, form]);

  const onFinish = async (values) => {
    try {
      // Prepare form data for multipart upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description); // Use the description from the form
      formData.append("locationCountry", values.locationCountry);
      formData.append("locationCity", values.locationCity);
      formData.append("category", values.category);
      formData.append("promoCode", values.promoCode);
      formData.append("expireDate", values.expireDate.toISOString());
      if (file) {
        formData.append("dealsImage", file);
      }

      // Send the update request to the backend
      await updateDeal({ id, data: formData }).unwrap();
      message.success("Deal updated successfully!");
      navigate("/deals-events");
    } catch (error) {
      message.error(
        `Failed to update deal: ${error.message || "Unknown error"}`
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

  if (isFetchingDeal || isFetchingCategories) {
    return <div>Loading...</div>;
  }

  // Prepare categories for the Select component
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
        name="edit_deal_form"
        onFinish={onFinish}
        layout="vertical"
        className="w-full p-5 bg-white rounded-lg"
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-5">Edit Deal</h1>
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
              setDescription(newContent); // Update state
              form.setFieldsValue({ description: newContent }); // Update form
            }}
          />
        </Form.Item>
        <div className="flex gap-5 justify-between items-center">
          <Form.Item
            label="Location Country"
            name="locationCountry"
            rules={[
              {
                required: true,
                message: "Please select the Location Country!",
              },
            ]}
            className="w-full"
          >
            <CustomInput placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            label="Location City"
            name="locationCity"
            rules={[
              { required: true, message: "Please select the Location City!" },
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
            className="w-full"
            rules={[{ required: true, message: "Please select the category!" }]}
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
            className="w-full"
            rules={[
              { required: true, message: "Please enter the Promo Code!" },
            ]}
          >
            <CustomInput placeholder="Enter Promo Code" />
          </Form.Item>

          <Form.Item
            label="Expiry Date"
            name="expireDate"
            className="w-full"
            rules={[
              { required: true, message: "Please select the Expiry Date!" },
            ]}
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
          <CustomButton type="primary" htmlType="submit" loading={isUpdating}>
            Update
          </CustomButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditDeals;
