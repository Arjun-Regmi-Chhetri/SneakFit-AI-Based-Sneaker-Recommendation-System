import React, { useEffect, useState } from 'react';
import { fetchProductSubCategories, updateProductSubCategory } from '../../../../service/Service';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSubCategory = () => {
  const { subCategoryId } = useParams();
  const [subCategory, setSubCategory] = useState({
    subCategoryName: '',
    subCategoryDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchProductSubCategories();
      const categoryData = response.find(cat => cat.subCategoryId === subCategoryId);
      setSubCategory(categoryData || {
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
      setErrorMessage("Error fetching category data.");
    } 
  };

  useEffect(() => {
    fetchData();
  }, [subCategoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await updateProductSubCategory({
        ...subCategory,
        subCategoryId: subCategoryId,
        subCategoryName: subCategory.subCategoryName,
        subCategoryDescription: subCategory.subCategoryDescription,
      });
      navigate("/admin/sneakerSubCategory", { state: { successMessage: "Sub Category Updated Successfully" } });
    } catch (error) {
      console.error('Error updating category:', error);
      setErrorMessage('Error updating sub category.');
    }
    finally{
        setLoading(false)
    } 
  };



  return (
    <div className="w-full flex justify-center">
      <div className="profile w-9/12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Sub Category Detail</h2>
          <p className="my-2">Edit or Update Sub Category information</p>
        </div>
        {errorMessage && (
          <p className={`fixed right-3 top-20 px-4 py-2 bg-red-600 text-white text-sm transition-opacity duration-1000 ${errorMessage ? 'success-message' : 'opacity-0'} ${errorMessage ? 'success-message-border' : 'w-0'}`}>
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col">
            <label htmlFor="subCategoryName">Sub Category Name</label>
            <input
              id="subCategoryName"
              type="text"
              value={subCategory.subCategoryName}
              onChange={(e) => setSubCategory({ ...subCategory, subCategoryName: e.target.value })}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              required
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="subCategoryDescription">Sub Category Description</label>
            <textarea
              id="subCategoryDescription"
              value={subCategory.subCategoryDescription}
              onChange={(e) => setSubCategory({ ...subCategory, subCategoryDescription: e.target.value })}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              rows="4"
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

export default UpdateSubCategory;
