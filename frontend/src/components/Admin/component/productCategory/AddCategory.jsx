import React, { useState } from 'react';
import { createProductcategory } from '../../../../service/Service';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const createCategory = async (categoryName, categoryDescription, categoryImage) => {
    try {
      const addCategory = await createProductcategory(categoryName, categoryDescription, categoryImage);
      console.log("Added Successfully ", addCategory);
      navigate("/admin/sneakerCategory", {
        state: { successMessage: "Category Added Successfully" },
      });
    } catch (error) {
      if (error.response && error.response.status === 413) { // HTTP 413 Payload Too Large
        setErrorMessage('File size exceeds the limit!');
      } else {
        setErrorMessage('File size exceeds the limit!. <<5mb');
      }
      console.error('Error updating category:', error);
    } 
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(categoryName, categoryDescription, categoryImage);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="profile w-9/12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Add New Category</h2>
          <p className="my-2">Enter details to add a new category</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col">
            <label htmlFor="categoryName">Category Name</label>
            <input
              id="categoryName"
              type="text"
              placeholder="e.g., Nike"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              required
            />
          </div>
          <div className="mb-3 py-3 flex flex-col border border-gray-900">
            <label htmlFor="categoryImage">Image Preview</label>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-60 object-contain border border-gray-900"
              />
            )}
            <label htmlFor="categoryImage">Add / Change Image</label>
            <input
              id="categoryImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="categoryDescription">Category Description</label>
            <textarea
              id="categoryDescription"
              placeholder="Enter category description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              rows="4"
            />
          </div>
          <button
            className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 w-1/2 my-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
