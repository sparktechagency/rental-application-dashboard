import { Form, DatePicker, message } from "antd";
import { IoChevronBack } from "react-icons/io5";
import CustomInput from "../../../utils/CustomInput";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import CustomButton from "../../../utils/CustomButton";
import { useAddEventMutation } from "../../../redux/features/events/eventsApi";
import JoditEditor from "jodit-react"; // Import JoditEditor

const AddEvent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(""); // Manage JoditEditor state
  const [addEvent, { isLoading }] = useAddEventMutation();

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: "Enter event description...",
    height: 400,
    buttons: [
      "bold", "italic", "underline", "|", "ul", "ol", "|", "link", "image", "video", "|", "undo", "redo",
    ],
    toolbarAdaptive: false,
  }), []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", description); // Take from JoditEditor
      formData.append("locationCountry", values.locationCountry);
      formData.append("locationCity", values.locationCity);
      formData.append("eventAddress", values.eventAddress);
      formData.append("eventDate", values.eventDate.toISOString());
      if (file) {
        formData.append("eventImage", file);
      }

      await addEvent(formData).unwrap();
      message.success("Event created successfully!");
      navigate("/deals-events");
    } catch (error) {
      message.error(`Failed to create event: ${error.message || "Unknown error"}`);
    }
  };

  const handleImageUpload = (event) => {
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
    document.getElementById("imageUpload").value = null;
  };

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
        name="add_event_form"
        onFinish={onFinish}
        layout="vertical"
        className="w-full p-5 bg-white rounded-lg"
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-5">
          Create Upcoming Event
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
            rules={[{ required: true, message: "Please input the Location Country!" }]}
            className="w-full"
          >
            <CustomInput placeholder="Type Location" />
          </Form.Item>

          <Form.Item
            label="Location City"
            name="locationCity"
            rules={[{ required: true, message: "Please input the Location City!" }]}
            className="w-full"
          >
            <CustomInput placeholder="Type Location" />
          </Form.Item>
        </div>

        <div className="flex gap-5 justify-between items-center">
          <Form.Item
            label="Event Address"
            name="eventAddress"
            rules={[{ required: true, message: "Please input the Event Address!" }]}
            className="w-full"
          >
            <CustomInput placeholder="Type Address" />
          </Form.Item>

          <Form.Item
            label="Event Date"
            name="eventDate"
            rules={[{ required: true, message: "Please select the Event Date!" }]}
            className="w-full"
          >
            <DatePicker
              className="w-full"
              size="large"
              placeholder="--/--/--"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </div>

        <Form.Item label="Image">
          <div className="w-full border border-gray-300 border-dashed rounded p-12">
            <label
              htmlFor="imageUpload"
              className="flex flex-col gap-2 justify-center items-center text-lg cursor-pointer text-blue-500"
            >
              <FaCloudUploadAlt size={24} />
              {imagePreview ? "Change File" : "Upload a file or drag and drop"}
              {!imagePreview && (
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
              )}
            </label>
            <input
              id="imageUpload"
              onChange={handleImageUpload}
              type="file"
              accept="image/png,image/jpeg"
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
                  className="max-w-full h-auto rounded"
                  style={{ maxHeight: "200px" }}
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
          <CustomButton type="primary" htmlType="submit" loading={isLoading}>
            Publish
          </CustomButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEvent;
