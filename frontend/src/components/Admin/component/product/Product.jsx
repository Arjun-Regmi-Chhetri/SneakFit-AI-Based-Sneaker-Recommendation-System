import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { fetchProduct, deleteProduct } from "../../../../service/Service";

const Product = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { state } = useLocation();

  const fetchData = async () => {
    try {
      const product = await fetchProduct();

      if (product) {
        setProduct(product);
      } else {
        console.log("No return from API");
      }
    } catch (error) {
      setError(error);
      console.error("Error loading product brand:", error);
    }
  };

  useEffect(() => {
    fetchData();

    if (state?.successMessage) {
      setSuccessMessage(state.successMessage);
    }
  }, [state]);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchData();
      setSuccessMessage("Deleted SuccessFully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <>
      <div className="product relative">
        {successMessage && (
          <p
            className={`fixed right-3 top-20 px-4 py-2  bg-green-600 text-white text-sm transition-opacity duration-1000 ${
              successMessage ? "success-message" : "opacity-0"
            } ${successMessage ? "success-message-border" : "w-0"}`}
          >
            {successMessage}
          </p>
        )}

        {error && (
          <p
            className={`fixed right-3 top-20 px-4 py-2  bg-red-600 text-white text-sm transition-opacity duration-1000 ${
              error ? "success-message" : "opacity-0"
            } ${error ? "success-message-border" : "w-0"}`}
          >
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="text-2xl font-bold">Product</p>
          </div>

          <div>
            <Link to="/admin/sneaker/addProduct">
              <button className="cursor bg-green-600 p-3">
                <AddIcon />
                <span>Create New </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="py-7">
          <table className="table-auto w-full text-left whitespace-no-wrap overflow-hidden rounded-md">
            <thead className=" dark:bg-white bg-gray-600  rounded-md">
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  SN
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{product.productName}</td>

                  <td className="px-4 py-5">
                    <Link
                      to={`/admin/sneaker/edit/product/${product.productId} `}
                      className="cursor bg-green-500 p-3 rounded-md mx-2"
                    >
                      <EditIcon />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.productId)}
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
    </>
  );
};

export default Product;
