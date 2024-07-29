import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const CartItem = ({ item, onRemove }) => {
  const { product, quantity , totalPrice} = item;

  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleIncrease = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };


  return (
    <div className="last:border-b-0 border-b-[1px]">
      <div className="flow-root">
        <ul role="list" className=" divide-y divide-gray-200 px-5">
          <li className="flex flex-wrap py-6" >
            
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 ">
            <img
            alt="Product"
            src={
              product.productImage
                ? `/src/assets/product/${product.productImage}`
                : ""
            }
            />
            </div>

            <div className="sm:ml-4 sm:flex flex-1 flex-col ">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3 className="w-2/3">{product.productName}</h3>
                  <p className="ml-4">$. {totalPrice}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {" "}
                  {product.productBrand.brandName}{" "}
                  {product.productSubCategory.subCategoryName} Shoes
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center space-x-4">

           
                   <button
                      onClick={handleIncrease}
                      className="text-green-600 hover:text-green-900 border border-green-600 text-lg px-1.5 rounded-sm"
                    >
                      +
                    </button>
                  <p className="text-gray-900 mx-2 font-semibold">{itemQuantity}</p>
                   
                
                    <button
                      onClick={handleDecrease}
                      className="text-red-600 hover:text-red-900 border border-red-600 text-xl px-2 rounded-sm"
                    >
                      -
                    </button>
                
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium  text-red-600 hover:text-red-500"
                    onClick={onRemove}
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartItem;
