import { useState } from "react";
import { Button, Modal, Form, Input, message, Card, Pagination } from "antd";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import {
  useAddDealCategoryMutation,
  useDeleteDealCategoryMutation,
  useGetDealCategoriesQuery,
  useUpdateDealCategoryMutation,
} from "../../../redux/features/dealCategory/dealCategoryApi";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa";

const DealCategory = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const pageSize = 20; // Set limit to 10 items per page

  // Fetch deal categories with pagination
  const { data, isLoading } = useGetDealCategoriesQuery({
    page: currentPage,
    limit: pageSize,
  });
  const [addDealCategory, { isLoading: isAdding }] =
    useAddDealCategoryMutation();
  const [updateDealCategory, { isLoading: isUpdating }] =
    useUpdateDealCategoryMutation();
  const [deleteDealCategory, { isLoading: isDeleting }] =
    useDeleteDealCategoryMutation();

  // Prepare the data for cards
  const categories =
    data?.data?.attributes?.results.map((category) => ({
      key: category._id,
      name: category.name,
    })) || [];

  // Total number of categories for pagination
  const totalCategories = data?.data?.attributes?.totalResults || 0;

  // Handle Add Category
  const handleAddCategory = async (values) => {
    try {
      await addDealCategory(values).unwrap();
      message.success("Deal category added successfully!");
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error(
        `Failed to add category: ${error.message || "Unknown error"}`
      );
    }
  };

  // Handle Edit Category
  const handleEditCategory = async (values) => {
    try {
      await updateDealCategory({
        id: currentCategory.key,
        data: values,
      }).unwrap();
      message.success("Deal category updated successfully!");
      setIsEditModalOpen(false);
      setCurrentCategory(null);
      editForm.resetFields();
    } catch (error) {
      message.error(
        `Failed to update category: ${error.message || "Unknown error"}`
      );
    }
  };

  // Handle Delete Category
  const handleDeleteCategory = async (id) => {
    try {
      await deleteDealCategory(id).unwrap();
      toast.success("Deal category deleted successfully!");
    } catch (error) {
      toast.error(
        `Failed to delete category: ${error.message || "Unknown error"}`
      );
    }
  };

  // Open Edit Modal and pre-fill form
  const openEditModal = (category) => {
    setCurrentCategory(category);
    editForm.setFieldsValue({ name: category.name });
    setIsEditModalOpen(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-5 min-h-screen bg-[#F5F5F5]">
      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Deal Categories</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-3 bg-primary text-white flex justify-center items-center gap-1 rounded text-sm"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* Cards Layout */}
      {isLoading ? (
        <div>Loading...</div>
      ) : categories.length === 0 ? (
        <div>No categories found.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <Card
                key={category.key}
                className="shadow-md"
                actions={[
                  <Button
                    key={category.key}
                    type="link"
                    size="large"
                    onClick={() => openEditModal(category)}
                    className="text-blue-500"
                  >
                    <TbEdit className="size-6" />
                  </Button>,
                  <Button
                    key={category.key}
                    type="link"
                    size="large"
                    onClick={() => handleDeleteCategory(category.key)}
                    className="text-red-500"
                    disabled={isDeleting}
                  >
                    <MdDelete className="size-6" />
                  </Button>,
                ]}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCategories}
              onChange={handlePageChange}
              showSizeChanger={false} // Disable page size changer if not needed
            />
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      <Modal
        title="Add Deal Category"
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false);
          addForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={addForm}
          name="add_category_form"
          onFinish={handleAddCategory}
          layout="vertical"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input size="large" placeholder="Enter category name" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isAdding}
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title="Edit Deal Category"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setCurrentCategory(null);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={editForm}
          name="edit_category_form"
          onFinish={handleEditCategory}
          layout="vertical"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DealCategory;
