import otpImage from "../../../assets/auth/otp.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import OTPInput from "react-otp-input";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";
import { useVerifyEmailMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };
  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({
        email,
        otp,
      }).unwrap();
      toast.success(res?.message || "Verification successful");
      navigate(`/auth/new-password/${email}`);
    } catch (error) {
      toast.error(error?.data?.message || "Verification failed");
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white ">
      <div>
        <img src={otpImage} className="w-full h-full mx-auto" alt="" />
      </div>
      <div className="mt-16">
        <div className="mb-5 space-y-5">
          <h1 className="font-semibold text-xl flex items-center gap-2">
            <Link to="/auth/forget-password">
              <IoIosArrowBack />
            </Link>
            Verify OTP
          </h1>
          <h1>{`We'll send a verification code to your email. Check your inbox and enter the code here.`}</h1>
        </div>
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="otp-container"
          inputStyle={{
            width: "100%",
            maxWidth: "6.5rem",
            height: "4rem",
            margin: "0 0.5rem",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #69BB41",
            borderRadius: "1rem",
            textAlign: "center",
            outline: "none",
          }}
        />
        <CustomButton
          onClick={handleMatchOtp}
          loading={isLoading}
          border
          className="w-full mt-5"
          type="submit"
        >
          Verify
        </CustomButton>
        <div className="mt-5 flex justify-between items-center">
          <p className="text-gray-500">Didn&apos;t receive the code? </p>
          <button className="text-gray-600 font-semibold">Resend Code</button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
