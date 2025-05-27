import { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    vin: "",
    color: "",
    licensePlate: "",
    description: "",
    price: "",
    taxes: "Taxes",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const handlePublish = async () => {
    if (!formData.make || !formData.model || !formData.vin) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Car published successfully!");

      // Reset form
      setFormData({
        make: "",
        model: "",
        vin: "",
        color: "",
        licensePlate: "",
        description: "",
        price: "",
        taxes: "Taxes",
      });
      setImages([]);
    } catch (error) {
      alert("Failed to publish car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-5 space-y-5 bg-[#F5F5F5]">
      <Form layout="vertical" className="w-full space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Basic Information
          </h2>
          {/* Make */}
          <Form.Item name="make" rules={[{ required: true, message: "Please enter the make" }]}>
            <CustomInput type="text" placeholder="Make" />
          </Form.Item>
          <Form.Item name="model" rules={[{ required: true, message: "Please enter the model" }]}>
            <CustomInput type="text" placeholder="Model" />
          </Form.Item>
          {/* Vin */}
          <Form.Item name="vin" rules={[{ required: true, message: "Please enter the VIN" }]}>
            <CustomInput type="text" placeholder="Vin" />
          </Form.Item>
          {/* Color */}
          <div className="relative">
            <div
              className="w-full px-4 py-3 flex justify-between items-center text-[16px] border bg-[#F4F4F4]  text-gray-700 rounded-lg cursor-pointer"
              onClick={() => setShowColorDropdown(!showColorDropdown)}
            >
              <span>{formData.color || "Select color"}</span>
              <ChevronDown size={16} />
            </div>
            {showColorDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {colorOptions.map((color) => (
                  <div
                    key={color}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                    onClick={() => {
                      handleInputChange("color", color);
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
          <Form.Item name="licensePlate" rules={[{ required: true, message: "Please enter the license plate" }]}>
            <CustomInput type="text" placeholder="License Plate" />
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
          type="primary"
          className="w-full"
          onClick={handlePublish}
          loading={loading}
        >
          {loading ? "Publishing..." : "Publish Car"}
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddCarForm;
