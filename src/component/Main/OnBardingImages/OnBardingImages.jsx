import {
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
    useAddOnbardingImageMutation,
    useDeleteOnbardingImageMutation,
    useGetOnbardingImageQuery,
} from "../../../redux/features/onbardingImage/onbardingImage";

const OnboardingImage = () => {
  const [onboardingImages, setOnboardingImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch existing onboarding images from the backend
  const { data: fetchedImages, isLoading: isFetching } =
    useGetOnbardingImageQuery();
  const [addOnbardingImage, { isLoading: isUploading }] =
    useAddOnbardingImageMutation();
  const [deleteOnbardingImage, { isLoading: isDeleting }] =
    useDeleteOnbardingImageMutation();

  // Sync fetched images with local state
  useEffect(() => {
    if (fetchedImages?.data) {
      // Assuming fetchedImages.data is an array of objects like { id, imageUrl }
      setOnboardingImages(
        fetchedImages?.data?.attributes?.map((img) => ({
          id: img?._id,
          imageUrl: img?.imageUrl, // Assuming the backend returns the URL of the image
        }))
      );
    }
  }, [fetchedImages]);

  // Handle file validation
  const validateFiles = useCallback((files) => {
    const validFileExtensions = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    return Array.from(files).filter((file) => {
      if (!validFileExtensions.includes(file.type)) {
        toast.error(`${file.name} is not a valid image (JPG/PNG only)`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 2MB size limit`);
        return false;
      }
      return true;
    });
  }, []);

  // Process valid files and upload to the backend
  const processFiles = useCallback(
    async (files) => {
      const validFiles = validateFiles(files);
      if (validFiles.length === 0) return;

      // Upload each valid file to the backend
      for (const file of validFiles) {
        try {
          const formData = new FormData();
          formData.append("photo_album", file); // Assuming the backend expects the file under the key "image"

          await addOnbardingImage(formData).unwrap();
          toast.success(`Image uploaded successfully`);
        } catch (error) {
          toast.error(
            `Failed to upload ${file.name}: ${error.message || "Unknown error"}`
          );
        }
      }
    },
    [validateFiles, addOnbardingImage]
  );

  // Handle file input change
  const handleImageUpload = (e) => {
    processFiles(e.target.files);
    e.target.value = ""; // Reset input to allow same file re-upload
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  // Remove Image
  const handleRemoveImage = async (id) => {
    console.log(id);
    try {
      await deleteOnbardingImage(id).unwrap();
      toast.success("Image removed successfully");
    } catch (error) {
      toast.error(
        `Failed to remove image: ${error.message || "Unknown error"}`
      );
    }
  };

  // Trigger file input
  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="w-full bg-white border-gray-200">
      {/* Image Upload Section */}
      <div className="mb-8 p-5">
        {/* Image Previews */}
        <div className="flex flex-wrap gap-4 mb-6">
          {isFetching ? (
            <p>Loading images...</p>
          ) : (
            onboardingImages.map((image, index) => (
              <div
                key={image.id}
                className="w-72 relative group border rounded-lg"
              >
                <img
                  src={`${imageBaseUrl}${image?.imageUrl}`}
                  alt={`Onboarding preview ${index + 1}`}
                  className="h-56 w-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(image?.id)}
                  className="absolute top-3 right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  disabled={isDeleting}
                >
                  <DeleteOutlined className="text-sm" />
                </button>
              </div>
            ))
          )}
        </div>
        {/* Drag and Drop Area */}
        <div
          className={`border border-dashed rounded-lg p-8 cursor-pointer transition ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-400"
          }`}
          onClick={handleClickUpload}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            {isDragging ? (
              <>
                <UploadOutlined className="text-4xl text-blue-500 mb-2" />
                <p className="text-lg font-medium text-primary">
                  Drop your images here
                </p>
              </>
            ) : (
              <>
                <PlusOutlined className="text-4xl text-gray-400 mb-2" />
                <p className="text-lg font-medium">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
              </>
            )}
            <p className="text-sm text-gray-500 mt-1">
              JPG or PNG (Max 2MB each)
            </p>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            multiple
            disabled={isUploading}
          />
        </div>
      </div>
    </section>
  );
};

export default OnboardingImage;
