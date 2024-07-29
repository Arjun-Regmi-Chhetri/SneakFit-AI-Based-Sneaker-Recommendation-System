import React, { useEffect, useState } from "react";
import { fetchProductSubCategories, deleteSubCategory } from "../../../../service/Service";
import { Link, useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



// const URL =import.meta.env.VITE_PUBLIC_URL

const ProductSubCategory = () => {


  const [categories, setCategories] = useState([]);
  const{state} = useLocation()
  const[successMessage, setSuccessMessage] = useState('')

  const fetchData = async () => {
    try {
      const categoryData = await fetchProductSubCategories();
      if (categoryData) {
        setCategories(categoryData);
      } else {
        console.error("No data returned from API");
      }
    } catch (error) {
      setError(error);
      console.error("Error loading product categories:", error);
    }
  };

  useEffect(() => {
   
    fetchData();

    if(state?.successMessage){
      setSuccessMessage(state.successMessage)
    }

  }, [state]);

  useEffect(()=>{

    const timer = setTimeout(()=>{
      setSuccessMessage('')
    }, 2000)
    
    return() => clearTimeout(timer)
  },[successMessage])


  const handleDelete = async(categoryId)=>{
    try{

      await deleteSubCategory(categoryId)
      fetchData()
      setSuccessMessage("Deleted SuccessFully")

    }catch(eror){
      throw eror
    }
  }


  return (
    <div className="product-category-list">
      {successMessage && (
          <p className={`fixed right-3 top-20 px-4 py-2  bg-green-600 text-white text-sm transition-opacity duration-1000 ${successMessage ? 'success-message' : 'opacity-0'} ${successMessage ? 'success-message-border' : 'w-0'}`}>
            {successMessage}
          </p>

      )}
      <div className="flex flex-wrap justify-between">
        <div>
          <p className="text-2xl font-bold">Product Category</p>
        </div>

        <div>
            <Link to="/admin/sneakerSubCategory/addSubCategory">
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
            
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm">
                Descrption
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
                categories.map((category, index) =>(
                    <tr key={category.subCategoryId}>
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{category.subCategoryId}</td>
                        <td className="px-4 py-3">{category.subCategoryName}</td>
                        <td className="px-4 py-3">{
                        `${category.subCategoryDescription ? (category.subCategoryDescription.length > 10 ? `${category.subCategoryDescription.slice(0, 10)}...` : category.subCategoryDescription) : 'No description available'}`
                        }
                        
                        </td>

                        <td className="px-4 py-5">
                            <Link to={`/admin/sneakerSubCategory/edit/${category.subCategoryId}`} className="cursor bg-green-500 p-3 rounded-md mx-2">
                               <EditIcon />
                            </Link>
                            <button onClick={()=>handleDelete(category.subCategoryId)} className="cursor bg-red-500 p-3 rounded-md mx-2">
                                 <DeleteForeverIcon />
                            </button>
                        </td>
                    </tr>
                ))
            }
            
            
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default ProductSubCategory;
