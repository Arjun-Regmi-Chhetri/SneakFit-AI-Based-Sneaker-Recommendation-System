import React from 'react'


import ClearIcon from "@mui/icons-material/Clear";
import { Link } from 'react-router-dom';
import AddSize from './AddSize';


const AddProductSize = () => {
  return (
    <>
    <div className="product-category-list z-[-1]">
        <div className="flex flex-wrap justify-between">
          <div>
            <p className="text-2xl font-bold">Sneaker Size</p>
          </div>
          <div>
            <Link to="/admin/sneakerSize">
              <button className="cursor bg-red-600 p-3 hover:text-white">
                <ClearIcon />
              </button>
            </Link>
          </div>
        </div>


        <div>
            <AddSize />
        </div>
    </div>
    </>
  )
}

export default AddProductSize
