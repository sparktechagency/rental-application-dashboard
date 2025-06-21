import { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { useAddCarMutation } from "../../../redux/features/car/carApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddCarForm = () => {
  const [color, setColor] = useState("Black");
  const [images, setImages] = useState([]);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const navigate = useNavigate();

  // add car mutation
  const [addCar, { isLoading }] = useAddCarMutation();

  // Color options
  const colorOptions = [
    "Black",
    "White",
    "Silver",
    "Gray",
    "Red",
    "Blue",
    "Green",
    "Brown",
    "Gold",
    "Orange",
    "Yellow",
    "Purple",
    "Other",
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              url: event.target.result,
              file: file,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handlePublish = async (values) => {
    if (!values.make || !values.model || !values.vin) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const newFormData = new FormData();
      const data = JSON.stringify({...values, color });
      newFormData.append("data", data);
      images.forEach((image) => {
        newFormData.append("image", image.file);
      })
      await addCar(newFormData).unwrap();
      toast.success("Car added successfully");
      navigate("/vehicles");
    } catch (error) {
      console.log("Error adding car:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full px-5 space-y-5 bg-[#F5F5F5]">
      <Form onFinish={handlePublish} layout="vertical" className="w-full space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Basic Information
          </h2>
          {/* Make */}
          <Form.Item
            name="make"
            rules={[{ required: true, message: "Please enter the make" }]}
          >
            <CustomInput type="text" placeholder="Make" />
          </Form.Item>
          <Form.Item
            name="model"
            rules={[{ required: true, message: "Please enter the model" }]}
          >
            <CustomInput type="text" placeholder="Model" />
          </Form.Item>
          {/* Vin */}
          <Form.Item
            name="vin"
            rules={[{ required: true, message: "Please enter the VIN" }]}
          >
            <CustomInput type="text" placeholder="Vin" />
          </Form.Item>
          {/* Color */}
          <div className="relative">
            <div
              className="w-full px-4 py-3 flex justify-between items-center text-[16px] border bg-[#F4F4F4]  text-gray-700 rounded-lg cursor-pointer"
              onClick={() => setShowColorDropdown(!showColorDropdown)}
            >
              <span>{color || "Select color"}</span>
              <ChevronDown size={16} />
            </div>
            {showColorDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {colorOptions.map((color) => (
                  <div
                    key={color}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                    onClick={() => {
                      setColor(color);
                      setShowColorDropdown(false);
                    }}
                  >
                    {color}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* License Plate */}
          <Form.Item
            name="licensePlate"
            rules={[
              { required: true, message: "Please enter the license plate" },
            ]}
          >
            <CustomInput type="text" placeholder="License Plate" />
          </Form.Item>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Additional Information
          </h2>
          {/* Doors */}
          <Form.Item
            name="doors"
            rules={[{ required: true, message: "Please enter the doors" }]}
          >
            <CustomInput type="text" placeholder="Doors" />
          </Form.Item>
          {/* Camera */}
          <Form.Item
            name="camera"
            rules={[{ required: true, message: "Please enter the the car camera" }]}
          >
            <CustomInput type="text" placeholder="Camera" />
          </Form.Item>
          {/* Bluetooth */}
          <Form.Item
            name="bluetooth"
            rules={[{ required: true, message: "Please enter the the car bluetooth" }]}
          >
            <CustomInput type="text" placeholder="Bluetooth" />
          </Form.Item>
          {/* seats */}
          <Form.Item
            name="seats"
            rules={[{ required: true, message: "Please enter the the car seats" }]}
          >
            <CustomInput type="text" placeholder="Seats" />
          </Form.Item>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm  mb-3">
              <span className="text-red-500">*</span> Car Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-[#F4F4F4]">
              {images.length === 0 ? (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      <Plus size={24} className="text-gray-400" />
                    </div>
                    <span className="text-gray-500">Add images</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                  {images.map((img) => (
                    <div key={img.id} className="relative">
                      <img
                        src={img.url}
                        alt="Car"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="cursor-pointer">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                      <Plus size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Car Description */}
          <Form.Item
            name="description"
            label="Car Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <CustomInput isTextArea type="text" placeholder="Description" />
          </Form.Item>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Price Information
          </h2>
          {/* Car Price */}
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <CustomInput type="number" placeholder="Car Price" />
          </Form.Item>
          {/* Taxes */}
          <Form.Item name="taxes">
            <CustomInput type="number" placeholder="Taxes" />
          </Form.Item>
        </div>
        <CustomButton
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          {isLoading ? "Publishing..." : "Publish Car"}
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddCarForm;
