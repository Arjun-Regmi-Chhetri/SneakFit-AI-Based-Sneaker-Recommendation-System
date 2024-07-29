import React from "react";
import { Link } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";



import AddCategory from "./AddCategory";


const AddProductCategory = () => {


  return (
    <div>
      <div className="product-category-list z-[-1]">
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="text-2xl font-bold">Product Category</p>
          </div>
          <div>
            <Link to="/admin/productCategory">
              <button className="cursor bg-red-600 p-3 hover:text-white">
                <ClearIcon />
              </button>
            </Link>
          </div>
        </div>


        <div>
            <AddCategory />
        </div>

      </div>
    </div>
  );
};

export default AddProductCategory;
