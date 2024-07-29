import React, { useEffect, useState } from 'react';
import { fetchProductCategories, updateProductCategory } from '../../../../service/Service';
import { useNavigate, useParams } from 'react-router-dom';
import NoFile from "../../../../assets/user/nofile.png";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({
    categoryName: '',
    categoryDescription: '',
    categoryImage: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetchProductCategories();
      const categoryData = response.find(cat => cat.categoryId === categoryId);
      setCategory(categoryData || {});
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    // Clean up the object URL when the component unmounts or the image changes
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous errors

    try {
      const updatedCategory = {
        ...category,
        categoryImage: selectedFile || category.categoryImage,
      };

      await updateProductCategory(updatedCategory);
      navigate("/admin/sneakerCategory", { state: { successMessage: "Category Updated Successfully" } });
    } catch (error) {
      if (error.response && error.response.status === 413) { // HTTP 413 Payload Too Large
        setErrorMessage('File size exceeds the limit!');
      } else {
        setErrorMessage('File size exceeds the limit!. <<5mb');
      }
      console.error('Error updating category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="profile w-9/12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Category Detail</h2>
          <p className="my-2">Edit or Update Category information</p>
        </div>
        {errorMessage && (
          <p className={`fixed right-3 top-20 px-4 py-2 bg-red-600 text-white text-sm transition-opacity duration-1000 ${errorMessage ? 'success-message' : 'opacity-0'} ${errorMessage ? 'success-message-border' : 'w-0'}`}>
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col">
            <label htmlFor="categoryName">Category Name</label>
            <input
              id="categoryName"
              type="text"
              value={category.categoryName}
              onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              required
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="categoryDescription">Category Description</label>
            <textarea
              id="categoryDescription"
              value={category.categoryDescription}
              onChange={(e) => setCategory({ ...category, categoryDescription: e.target.value })}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              rows="4"
            />
          </div>
          <div className="mb-3 px-7 py-3 flex flex-col border border-gray-900">
            <label htmlFor="">Image Preview</label>
            <img
              src={selectedImage || (category.categoryImage ? `/src/assets/category/${category.categoryImage}` : NoFile)}
              alt="Preview"
              className="w-full h-60 object-contain border border-gray-900"
            />
            <label htmlFor="">Add / Change Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
            />
          </div>
          <button className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 w-1/2 my-3" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
