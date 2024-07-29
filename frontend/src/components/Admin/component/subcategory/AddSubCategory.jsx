import React, { useState } from "react";
import { createSubProductcategory } from "../../../../service/Service";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createCategory = async (name, description) => {
    setLoading(true);

    try {
      await createSubProductcategory(name, description);
      navigate("/admin/sneakerSubCategory", { state: { successMessage: "Subcategory Added Successfully" } });
    } catch (error) {
      console.error('Error adding Sub category:', error);
      setErrorMessage('Error adding subcategory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(subCategoryName, subCategoryDescription);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="profile w-9/12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Add New Subcategory</h2>
          <p className="my-2">Enter details to add a new subcategory</p>
        </div>
        {errorMessage && (
          <p className={`fixed right-3 top-20 px-4 py-2 bg-red-600 text-white text-sm transition-opacity duration-1000 ${errorMessage ? 'success-message' : 'opacity-0'} ${errorMessage ? 'success-message-border' : 'w-0'}`}>
            {errorMessage}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 flex flex-col">
            <label
              className="dark:text-gray-100 text-gray-700 text-md mb-2"
              htmlFor="subCategoryName"
            >
              Subcategory Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 dark:text-gray-100 text-gray-700 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subCategoryName"
              name="subCategoryName"
              type="text"
              placeholder="eg; Running"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label
              className="dark:text-gray-100 text-gray-700 text-md mb-2"
              htmlFor="subCategoryDescription"
            >
              Subcategory Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 dark:text-gray-100 bg-gray-700 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subCategoryDescription"
              name="subCategoryDescription"
              placeholder="Enter subcategory description"
              value={subCategoryDescription}
              onChange={(e) => setSubCategoryDescription(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
