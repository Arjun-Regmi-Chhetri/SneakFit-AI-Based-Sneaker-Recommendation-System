import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import nofile from "../../../../assets/category/nofile.png";

import { fetchProductBrand, deleteBrand } from "../../../../service/Service";

const ProductBrand = () => {
  const [brands, setBrand] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { state } = useLocation();

  const fetchData = async () => {
    try {
      const brandData = await fetchProductBrand();

      if (brandData) {
        setBrand(brandData);
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

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return() => clearTimeout(timer)
    }
  }, [successMessage]);

  const handleDelete = async (brandId) => {
    try {
      await deleteBrand(brandId);
      setSuccessMessage("Deleted Sucessfully");
      fetchData();
    } catch (eror) {
      throw eror;
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="product-category-list">
        <div className="flex flex-wrap justify-between">
          {successMessage && (
            <>
              <p
                className={`absolute right-3 top-3  z-50 bg-green-600 text-white text-sm transition-opacity duration-1000 ${
                  successMessage ? "success-message " : "opacity-0"
                } ${successMessage ? "success-message-border" : "w-0"}`}
              >
                {successMessage}
              </p>
            </>
          )}
          <div>
            <p className="text-2xl font-bold">Product Brand</p>
          </div>

          <div>
            <Link to="/admin/sneakerBrand/addBrand">
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
                  ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Image
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                  Descrption
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{brand.brandId}</td>
                  <td className="px-4 py-3">{brand.brandName}</td>
                  <td className="px-4 py-3">
                    <img
                      src={
                        brand.brandImage
                          ? `/src/assets/brand/${brand.brandImage}`
                          : nofile
                      }
                      alt=""
                      className="h-10"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {`${
                      brand.brandDescription
                        ? brand.brandDescription.length > 10
                          ? `${brand.brandDescription.slice(0, 10)}...`
                          : brand.brandDescription
                        : "No description available"
                    }`}
                  </td>

                  <td className="px-4 py-5">
                    <Link
                      to={`/admin/sneakerBrand/edit/${brand.brandId}`}
                      className="cursor bg-green-500 p-3 rounded-md mx-2"
                    >
                      <EditIcon />
                    </Link>
                    <button
                      onClick={() => handleDelete(brand.brandId)}
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

export default ProductBrand;
