import React, { useEffect, useState } from "react";
import { fetchProductCategories, deleteCategory } from "../../../../service/Service";
import { Link, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import nofile from "../../../../assets/category/nofile.png";


const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const{state} = useLocation()

  const getCategories = async () => {
    try {
      const categoryData = await fetchProductCategories();
      if (categoryData) {
        setCategories(categoryData);
      } else {
        console.error("No data returned from API");
      }
    } catch (error) {
      setError("Failed to load categories");
      console.error("Error loading product categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();

    if(state?.successMessage){
      setSuccessMessage(state.successMessage)
    }
  }, [state]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setSuccessMessage("Deleted Successfully");
      getCategories();
    } catch (error) {
      setError("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-category-list">
      <div className="flex flex-wrap justify-between">
        <div>
          <p className="text-2xl font-bold">Product Category</p>
        </div>
        <div>
          <Link to="/admin/sneakerCategory/addCategory">
            <button className="cursor bg-green-600 p-3">
              <AddIcon />
              <span>Create New</span>
            </button>
          </Link>
        </div>
      </div>

      {successMessage && (
        <p
          className={`absolute right-3 top-3 z-50 bg-green-600 text-white text-sm transition-opacity duration-1000 ${
            successMessage ? "success-message" : "opacity-0"
          } ${successMessage ? "success-message-border" : "w-0"}`}
        >
          {successMessage}
        </p>
      )}

      <div className="py-7">
        <table className="table-auto w-full text-left whitespace-no-wrap overflow-hidden rounded-md">
          <thead className="dark:bg-white bg-gray-600 rounded-md">
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">SN</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">ID</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Name</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Image</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Description</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.categoryId}>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{category.categoryId}</td>
                <td className="px-4 py-3">{category.categoryName}</td>
                <td className="px-4 py-3">
                  <img
                    src={category.categoryImage ? `/src/assets/category/${category.categoryImage}` : nofile}
                    alt=""
                    className="h-10"
                  />
                </td>
                <td className="px-4 py-3">
                  {category.categoryDescription
                    ? category.categoryDescription.length > 30
                      ? `${category.categoryDescription.slice(0, 30)}...`
                      : category.categoryDescription
                    : 'No description available'}
                </td>
                <td className="px-4 py-5">
                  <Link
                    to={`/admin/sneakerCategory/edit/${category.categoryId}`}
                    className="cursor bg-green-500 p-3 rounded-md mx-2"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.categoryId)}
                    className="cursor bg-red-500 p-3 rounded-md mx-2"
                  >
                    <DeleteForeverIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCategory;
