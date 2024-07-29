import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { fetchProductSize, deleteSize } from "../../../../service/Service";

const ProductSize = () => {
    const [sizes, setSize] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    fetchData();
    if (state?.successMessage) {
      setSuccessMessage(state.successMessage);
    }
  }, [state]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 2000); // Clear the message after 3 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [successMessage]);
  const fetchData = async () => {
    try {
      const sizeData = await fetchProductSize();
      if (sizeData) {
        setSize(sizeData);
      } else {
        console.log("No data returned from API");
      }
    } catch (error) {
      setError(error);
      console.error("Error loading product sizes:", error);
    }
  };

  const handleDelete = async (sizeId) => {
    try {
      await deleteSize(sizeId);
      fetchData();
      setSuccessMessage("Size Deleted Successfully");
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <>
      <div className="product-category-list">
        <div className="flex flex-wrap justify-between py-4">
          {successMessage && (
            <>
            <p
           
              className={`absolute right-3 top-3  z-50 bg-green-600 text-white text-sm transition-opacity duration-1000 ${
      successMessage ? "success-message " : "opacity-0"} ${successMessage ? "success-message-border" : "w-0"}`}
            >
              {successMessage}
            </p>
            </>
          )}
          <div>
            <p className="text-2xl font-bold">Product Sizes</p>
          </div>
          <div>
            <Link to="/admin/sneakerSize/addSneakerSize">
              <button className="cursor bg-green-600 p-3 text-white rounded flex items-center">
                <AddIcon />
                <span className="ml-2">Create New</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="py-7">
          <table className="table-auto w-full text-left whitespace-no-wrap overflow-hidden rounded-md">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-3">SN</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, index) => (
                <tr key={size.sizeId}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{size.sizeId}</td>
                  <td className="px-4 py-3">{size.sizeName}</td>
                  <td className="px-4 py-5 flex items-center">
                    <button
                      onClick={() => handleDelete(size.sizeId)}
                      className="cursor bg-red-500 p-3 rounded-md mx-2 text-white"
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
    </>
  );
};

export default ProductSize;
