import { Form, Modal } from "antd";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();

  // Language options
  // const languageOptions = [
  //   { value: "en", label: "English" },
  //   { value: "es", label: "Spanish" },
  //   { value: "fr", label: "French" },
  // ];

  // Settings navigation items
  const settingsItem = [
    { title: "Change password", path: "change-password" },
    { title: "Privacy Policy", path: "privacy-policy" },
    { title: "Terms & Conditions", path: "terms-conditions" },
  ];

  // RTK Query mutations
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] =
    useVerifyEmailMutation();
  const [resetPassword, { isLoading: isResetPasswordLoading }] =
    useResetPasswordMutation();

  // Language switching function
  // const switchLanguage = (lang) => {
  //   try {
  //     // Store selected language
  //     Cookies.set("currentLanguage", lang, { expires: 30, path: "/" });

  //     // Set Google Translate cookie
  //     const googleTransValue = `/en/${lang}`;
  //     Cookies.set("googtrans", googleTransValue, {
  //       expires: 30,
  //       path: "/",
  //       domain: window.location.hostname, // Dynamic domain for localhost or production
  //     });

  //     console.log("Switching language to:", lang);
  //     console.log("googtrans cookie set to:", Cookies.get("googtrans"));
  //     // Delay reload to ensure cookie is set
  //     setTimeout(() => {
  //       window.location.reload();
  //       toast.success(`Language switched to ${lang}`);
  //     }, 500);
  //   } catch (error) {
  //     console.error("Language switch error:", error);
  //     toast.error("Failed to switch language. Please try again.");
  //   }
  // };

  // Handle navigation and modal opening
  const handleNavigate = (value) => {
    if (!user && value === "change-password") {
      toast.error("Please log in to change your password");
      navigate("/auth");
      return;
    }
    if (value === "notification") {
      return;
    } else if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else if (value === "additional-charges") {
      setModelTitle("Additional Charges");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  // Handle password change
  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword } = values;
    try {
      const res = await changePassword({
        currentPassword: oldPassword,
        newPassword,
      }).unwrap();
      setIsModalOpen(false);
      toast.success(res?.message || "Password changed successfully");
      navigate("/auth");
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to change password. Please try again."
      );
    }
  };

  // Handle forgot password
  const handleForgetPassword = async (values) => {
    try {
      const res = await forgotPassword(values).unwrap();
      toast.success(res?.data?.message || "OTP sent to your email");
      setModelTitle("Verify OTP");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("User email not found. Please log in.");
      navigate("/auth");
      return;
    }
    try {
      await verifyOtp({
        email: user.email,
        oneTimeCode: otp,
      }).unwrap();
      toast.success("OTP verified successfully");
      setModelTitle("Reset Password");
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  // Handle password reset
  const handleResetPassword = async (values) => {
    const { newPassword } = values;
    if (!user?.email) {
      toast.error("User email not found. Please log in.");
      navigate("/auth");
      return;
    }
    try {
      await resetPassword({
        email: user.email,
        newPassword,
      }).unwrap();
      toast.success("Password reset successfully");
      navigate("/auth");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (!user?.email) {
      toast.error("User email not found. Please log in.");
      navigate("/auth");
      return;
    }
    try {
      const res = await forgotPassword({ email: user.email }).unwrap();
      toast.success(res?.data?.message || "OTP resent to your email");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <section className="w-full bg-[#F4F4F4] min-h-screen px-5 h-full">
      <div className="flex justify-between items-center py-6 border-b mb-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      {/* Language Change Dropdown */}
      {/* <div className="w-full p-4 mb-2 text-sm rounded-lg border flex items-center justify-between">
        <h2 className="notranslate">Change Language</h2>
        <Select
          defaultValue={Cookies.get("currentLanguage") || "en"}
          style={{ width: 120 }}
          onChange={switchLanguage}
          className="notranslate"
        >
          {languageOptions.map((option) => (
            <Select.Option
              key={option.value}
              value={option.value}
              className="notranslate"
            >
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div> */}

      {/* Other Settings */}
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="w-full p-4 mb-2 text-sm rounded-lg border flex items-center justify-between cursor-pointer bg-white"
          onClick={() => handleNavigate(setting.path)}
        >
          <h2>{setting.title}</h2>
        </div>
      ))}

      {/* Modal for Change Password, Forget Password, etc. */}
      <Modal
        title={
          <div className="flex items-center text-black">
            <h1 className="text-xl font-medium mb-5">{modelTitle}</h1>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        {modelTitle === "Change password" && (
          <div className="w-full px-5">
            <p className="text-[14px] mb-[14px]">
              Your password must be 8-10 characters long.
            </p>
            <Form
              form={form}
              name="change-password"
              autoComplete="off"
              layout="vertical"
              className="space-y-4"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <CustomInput
                  isPassword
                  type="password"
                  placeholder="Enter Your Old Password"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 8,
                    max: 10,
                    message: "Password must be 8-10 characters long!",
                  },
                ]}
              >
                <CustomInput
                  isPassword
                  type="password"
                  placeholder="Set Your New Password"
                />
              </Form.Item>

              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please re-enter your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <CustomInput
                  isPassword
                  type="password"
                  placeholder="Re-enter Password"
                />
              </Form.Item>

              <p className="text-secondary font-medium">
                <button
                  type="button"
                  onClick={() => setModelTitle("Forget password")}
                >
                  <span className="underline text-blue-500">
                    Forget Password
                  </span>
                </button>
              </p>

              <Form.Item>
                <CustomButton loading={isChangePasswordLoading}>
                  Update Password
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}

        {modelTitle === "Forget password" && (
          <div className="w-full px-5">
            <Form
              initialValues={{ remember: true }}
              onFinish={handleForgetPassword}
              className="space-y-7"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <CustomInput type="email" placeholder="Enter your email" />
              </Form.Item>

              <Form.Item>
                <CustomButton loading={isForgotPasswordLoading}>
                  Send OTP
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}

        {modelTitle === "Verify OTP" && (
          <div className="w-full px-5">
            <form onSubmit={handleVerifyOtp}>
              <h1 className="text-lg">
                We sent a verification code to your email. Check your inbox and
                enter the code here.
              </h1>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{
                  width: "60px",
                  height: "60px",
                  borderBottom: "1px solid #4E4E4E",
                  marginRight: "10px",
                  outline: "none",
                  color: "black",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
              <div className="mt-5">
                <CustomButton
                  loading={isVerifyOtpLoading}
                  disabled={otp.length !== 6}
                >
                  Verify
                </CustomButton>
              </div>
              <div className="flex justify-between items-center my-4">
                <h1>Didn’t receive code?</h1>
                <button
                  type="button"
                  className="text-[#4c7e95]"
                  onClick={handleResendOtp}
                >
                  Resend
                </button>
              </div>
            </form>
          </div>
        )}

        {modelTitle === "Reset Password" && (
          <div className="w-full px-5">
            <Form
              form={form}
              name="reset-password"
              autoComplete="off"
              layout="vertical"
              className="space-y-6"
              onFinish={handleResetPassword}
            >
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 8,
                    max: 10,
                    message: "Password must be 8-10 characters long!",
                  },
                ]}
              >
                <CustomInput
                  icon={HiOutlineLockClosed}
                  isPassword
                  type="password"
                  placeholder="Set Your New Password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <CustomInput
                  icon={HiOutlineLockClosed}
                  isPassword
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item>
                <CustomButton
                  loading={isResetPasswordLoading}
                  border
                  className="w-full"
                >
                  Reset Password
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Settings;
