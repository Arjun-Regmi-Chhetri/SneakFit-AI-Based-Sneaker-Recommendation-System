import React from 'react'


import ClearIcon from "@mui/icons-material/Clear";
import { Link } from 'react-router-dom'
import AddProduct from './AddProduct';

const AddProductService = () => {
  return (
 
        <>
         <div className="product-category-list z-[-1]">
            <div className="flex flex-wrap justify-between">
              <div>
                <p className="text-2xl font-bold">Add Product</p>
              </div>
              <div>
                <Link to="/admin/sneaker">
                  <button className="cursor bg-red-600 p-3 hover:text-white">
                    <ClearIcon />
                  </button>
                </Link>
              </div>
            </div>
    
    
            <div>
               <AddProduct />
            </div>
        </div>
        </>
  )
}

export default AddProductService

