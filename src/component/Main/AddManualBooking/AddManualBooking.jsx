import { useState } from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { Form, DatePicker, Select } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { useAddManualBookingMutation } from "../../../redux/features/booking/bookingApi";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddManualBooking = () => {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const navigate = useNavigate();

  // Fetch all cars
  const { data: cars = [], isLoading: isCarLoading } = useGetAllCarsQuery();

  // Add booking mutation
  const [addBooking, { isLoading }] = useAddManualBookingMutation();

  const handleSubmit = async (values) => {
    if (
      !values.userName ||
      !values.email ||
      !values.carName ||
      !pickupDate ||
      !returnDate ||
      !dateOfBirth ||
      !values.address ||
      !values.phone ||
      !values.licenseNo
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const bookingData = {
        userName: values.userName,
        email: values.email,
        carName: values.carName,
        pickupDate: pickupDate?.format("YYYY-MM-DD"),
        returnDate: returnDate?.format("YYYY-MM-DD"),
        address: values.address,
        phone: values.phone,
        dob: dateOfBirth?.format("YYYY-MM-DD"),
        licenseNo: values.licenseNo,
      };
      await addBooking(bookingData).unwrap();
      toast.success("Manual booking added successfully");
      navigate("/manual-booking");
    } catch (error) {
      console.log("Error adding booking:", error);
      toast.error(error?.data?.errorMessage || "Something went wrong");
    }
  };

  return (
    <div className="w-full px-5 space-y-5 bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-medium text-green-600">
          Add Manual Booking
        </h1>
      </div>

      <Form
        onFinish={handleSubmit}
        layout="vertical"
        className="w-full space-y-6"
      >
        {/* User Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            User Information
          </h2>

          {/* User Name */}
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please enter the user name" }]}
          >
            <CustomInput type="text" placeholder="User Name*" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <CustomInput type="email" placeholder="Email" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter the phone number" }]}
          >
            <CustomInput type="tel" placeholder="Phone Number" />
          </Form.Item>

          {/* Date of Birth */}
          <Form.Item
            name="dob"
            rules={[{ required: true, message: "Please enter the date of birth" }]}
          >
            <DatePicker
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              className="w-full px-4 py-3 text-[16px] border bg-[#F4F4F4] text-gray-700 rounded-lg"
              suffixIcon={<Calendar size={16} className="text-gray-400" />}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          {/* Address */}
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <CustomInput type="text" placeholder="Address" />
          </Form.Item>

          {/* License Number */}
          <Form.Item
            name="licenseNo"
            rules={[{ required: true, message: "Please enter the license number" }]}
          >
            <CustomInput type="text" placeholder="License Number" />
          </Form.Item>
        </div>

        {/* Booking Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Booking Information
          </h2>

          {/* Car Name Dropdown */}
          <Form.Item
            name="carName"
            rules={[{ required: true, message: "Please select a car name" }]}
          >
            <Select
              placeholder="Select Car Name"
              size="large"
              loading={isCarLoading}
            >
              {cars.map((car) => (
                <Select.Option key={car._id} value={car.make}>
                  {`${car.make} ${car.model} - ${car.licensePlate}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Pickup Date */}
          <Form.Item
            name="pickupDate"
            rules={[{ required: true, message: "Please select a pickup date" }]}
          >
            <DatePicker
              placeholder="Pickup Date"
              value={pickupDate}
              onChange={setPickupDate}
              className="w-full px-4 py-3 text-[16px] border bg-[#F4F4F4] text-gray-700 rounded-lg"
              suffixIcon={<Calendar size={16} className="text-gray-400" />}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          {/* Return Date */}
          <Form.Item
            name="returnDate"
            rules={[{ required: true, message: "Please select a return date" }]}
          >
            <DatePicker
              placeholder="Return Date"
              value={returnDate}
              onChange={setReturnDate}
              className="w-full px-4 py-3 text-[16px] border bg-[#F4F4F4] text-gray-700 rounded-lg"
              suffixIcon={<Calendar size={16} className="text-gray-400" />}
              format="YYYY-MM-DD"
              disabledDate={(current) =>
                pickupDate && current && current.isBefore(pickupDate)
              }
            />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <CustomButton
          type="submit"
          className="w-full"
          loading={isLoading || isCarLoading}
        >
          {isLoading || isCarLoading ? "Submitting..." : "Submit Booking"}
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddManualBooking;