import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../BreadCrumb';
import { fetchProductByCategoryName, fetchSearchResults, fetchProductByBrandName } from '../../service/Service'; // Adjust path as per your project structure
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const ProductList = ({ category, brand, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedProducts = [];
        if (category) {
          fetchedProducts = await fetchProductByCategoryName(category);
        } else if (searchQuery) {
          fetchedProducts = await fetchSearchResults(searchQuery);
        }else if(brand){
          fetchedProducts = await fetchProductByBrandName(brand)
        }
        setProducts(fetchedProducts);
        setNotFound(fetchedProducts.length === 0); // Set notFound if no products found
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchQuery]);

  // const foundCategory = categories.filter(cat => category === cat.categoryName);
  // console.log(foundCategory);
  

  return (
    <>
      <div className="product-list mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Breadcrumb />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && notFound && (
          <div className="flex items-center justify-center h-100">
            <div className="text-center">
              <p className="text-2xl font-semibold mb-4">No products found</p>
              <p className="text-gray-600 mb-4">Try a different keyword or category.</p>
              {/* Example link or button for suggestion */}
              <Link to="/" className="text-indigo-600 hover:underline">Shop All Products</Link>
            </div>
          </div>
        )}
        {!loading && !notFound && (
           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
           {products.map((product) => (
             <div key={product.productId} className="group relative  fade-in hover:border hover:border-gray-700 pb-7">
               <Link to={`/product/${product.productId}`}>
                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden flex justify-center items-center rounded-md shadow-custom lg:aspect-none  h-80">
                   <img
                     src={
                       product.productImage
                         ? `/src/assets/product/${product.productImage}`
                         : "No image"
                     }
                     alt={product.imageAlt}
                     className="h-[200px]  object-cover object-center  "
                   />
                 </div>
                 <div className="mt-4">
                   <div className="border-b-[1px] w-full pb-4 ">
                     <h3 className="text-gray-900  font-semibold text-lg text-center">
                       <span aria-hidden="true" className="absolute inset-0" />
                       {product.productName
                         ? product.productName.length > 20
                           ? `${product.productName.slice(0, 20)} . . .`
                           : product.productName
                         : ""}
                     </h3>
                   </div>
                 </div>
               </Link>
               <div>
                 <div className="brand px-3 py-3">
                   <p className="text-blue-300 font-normal">
                     {product.brandName}
                   </p>
                 </div>
                 <div className="  px-3 flex justify-between">
                   <div className="price">
                     <h2 className="text-gray-900  font-bold text-xl">
                       {product.discountPrice ? (
                         <p>
                           $. {product.discountPrice? product.discountPrice: product.discountPrice.toFixed(2)} <br />
                           <span className="line-through text-sm text-gray-400">
                             $. {product.price? product.price: product.price.toFixed(2)}
                           </span>
                         </p>
                       ) : (
                         <p>$. {product.price? product.price: product.price.toFixed(2)}</p>
                       )}
                     </h2>
                   </div>
                   <div>
                     <FavoriteBorderOutlinedIcon />
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
