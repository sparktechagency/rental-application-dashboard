import { useState } from "react";
import { Select, Button, Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBannedUserMutation,
  useGetSingleReportQuery,
  useWarningMessageMutation,
} from "../../../redux/features/reports/reportApi";
import moment from "moment";
import { toast } from "sonner";
import { IoIosArrowRoundBack } from "react-icons/io";
const { TextArea } = Input;

const ContentModerationDetails = () => {
  const { id } = useParams();
  const { data: responseData, isLoading } = useGetSingleReportQuery(id, {
    skip: !id,
  });
  const [banDuration, setBanDuration] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [bannedUser, { isLoading: bannedUserLoading }] =
    useBannedUserMutation();
  const [warningMessageSent, { isLoading: warningMessageLoading }] =
    useWarningMessageMutation();

  const navigate = useNavigate();

  const handleBanUser = async (bannedUserId) => {
    if (!banDuration) {
      alert("Please select a ban duration.");
      return;
    }
    try {
      const data = {
        bannedUserId,
        duration: banDuration,
      };
      await bannedUser(data).unwrap();
      toast.success(
        `User banned successfully for ${banDuration} ${
          banDuration !== "Permanent" && "days"
        }`
      );
      navigate("/content-moderation");
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleSendWarning = async (reportedUserId) => {
    if (!warningMessage.trim()) {
      alert("Please enter a warning message.");
      return;
    }
    try {
      const data = {
        reportedUserId,
        warningMessage,
      };
      await warningMessageSent(data).unwrap();
      toast.success("Warning message sent successfully");
      setWarningMessage("");
      navigate("/content-moderation");
    } catch (error) {
      console.error("Error sending warning message:", error);
    }
  };

  console.log(responseData?.reportReason);
  return (
    <div className="w-full min-h-screen px-6 py-4">
      {isLoading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <div className="flex items-center gap-4">
              <button
                className="border rounded-full p-2 cursor-pointer bg-primary text-white"
                onClick={() => navigate("/content-moderation")}
              >
                <IoIosArrowRoundBack className="text-2xl" />
              </button>
              <h1 className="text-xl font-semibold">
                Report #{responseData?._id}
              </h1>
            </div>
            <span className="text-gray-500 text-sm">
              Submitted at :{" "}
              {moment(responseData?.createdAt).format("DD-MM-YYYY")}
            </span>
          </div>

          {/* Reporter & Reported User Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-md space-y-1">
              <h3 className="text-xl text-gray-700 font-semibold">
                Reporter Information
              </h3>
              <p>
                <strong>Name:</strong> {responseData?.reporter?.fullName}
              </p>
              <p>
                <strong>User ID:</strong> {responseData?.reporter?.id}
              </p>
              <p>
                <strong>Email:</strong> {responseData?.reporter?.email}
              </p>
            </div>

            <div className="bg-blue-100 p-4 rounded-md space-y-1">
              <h3 className="text-xl text-gray-700 font-semibold">
                Reported User
              </h3>
              <p>
                <strong>Name:</strong> {responseData?.reportedUser?.fullName}
              </p>
              <p>
                <strong>User ID:</strong> {responseData?.reportedUser?.id}
              </p>
              <p>
                <strong>Email:</strong> {responseData?.reportedUser?.email}
              </p>
            </div>
          </div>

          {/* Report Reason */}
          <div className="bg-red-100 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Report Reason</h3>
            {responseData?.reportReason?.map((reason,i) => (
              <div key={i} className="bg-red-200 px-4 py-2 mb-2 rounded-md flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-3">
                  {i + 1}
                </span>
                {reason}
              </div>
            ))}
          </div>

          {/* Report Message */}
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Report Message</h3>
            <p>{responseData?.reportMessage}</p>
          </div>

          {/* Ban User & Warning Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Ban User */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">
                Banned Duration
              </h3>
              <Select
                className="w-full mb-3"
                placeholder="Select Duration"
                onChange={(value) => setBanDuration(value)}
              >
                <Select.Option value="1 Day">1 Day</Select.Option>
                <Select.Option value="1 Week">1 Week</Select.Option>
                <Select.Option value="1 Month">1 Month</Select.Option>
                <Select.Option value="Permanent">Permanent</Select.Option>
              </Select>
              <Button
                danger
                loading={bannedUserLoading}
                block
                onClick={() => handleBanUser(responseData?.reportedUser?.id)}
                className="border-red-500 text-red-500"
              >
                Banned Now
              </Button>
            </div>

            {/* Send Warning */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">
                Warning Message
              </h3>
              <TextArea
                rows={4}
                placeholder="Write here..."
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
              />
              <Button
                type="primary"
                block
                className="mt-3"
                loading={warningMessageLoading}
                onClick={() =>
                  handleSendWarning(responseData?.reportedUser?.id)
                }
              >
                Send Warning
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModerationDetails;
