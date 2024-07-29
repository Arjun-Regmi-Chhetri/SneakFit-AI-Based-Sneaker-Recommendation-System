import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
  fetchProductById,
  fetchProductSize,
  fetchRecommendedProduct,
} from "../../service/Service";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext"; // Import useCart hook

const ProductDetail = () => {
  const { productId } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const {makeOrder} = useOrder();

  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setItemQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async (quantity, productId, sizeId) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    try {
      await addToCart(productId, user.id, quantity, sizeId); 
      alert("Product added to cart!");

    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart");
    }
  };

  const handleBuyNow = async (productId, sizeId, quantity) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    try { 
      await makeOrder(user.id,productId, sizeId, quantity); 

      alert("You make successfull Order!");

    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("You can't make order");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetchProductById(productId);
      setProduct(response);

      const sizeData = await fetchProductSize(productId);
      setSizes(sizeData);


      const recommendProductResponse = await fetchRecommendedProduct(productId);
      console.log(recommendProductResponse)
      setRecommendProducts(recommendProductResponse);
    } catch (error) {
      console.error("Failed to fetch product details", error);
      setError("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId, isAuthenticated, user]);

  const isSizeAvailable = (sizeId) => {
    return (
      sizes.some((size) => size.sizeId === sizeId) &&
      product.productSizes.some((size) => size.sizeId === sizeId)
    );
  };

  const handleSizeSelect = (size) => {
    if (isSizeAvailable(size.sizeId)) {
      setSelectedSize(size);
    }
  };

  const handleIncrease = () => {
    setItemQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setItemQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="Product"
            className="lg:w-1/2 w-full h-full object-cover object-center rounded bg-gray-100 p-9 py-16"
            src={
              product.productImage
                ? `/src/assets/product/${product.productImage}`
                : ""
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.productName}
            </h1>
            <p className="leading-relaxed text-gray-500">{product.productDescription}</p>
            <div className="mt-6 pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <p className="mr-3 mb-6 font-semibold text-gray-900">Color :</p>
                <p className="flex gap-2">{product.productColor}</p>
              </div>
              <div className="mb-6">
                <span className="mr-3 font-semibold text-gray-900">Available Size</span>
                <div className="relative">
                  <ul className="flex space-x-3 mt-6 items-center">
                    {sizes.map((size) => {
                      const isAvailable = isSizeAvailable(size.sizeId);
                      const isSelected = selectedSize?.sizeId === size.sizeId;

                      return (
                        <li
                          key={size.sizeId}
                          className={`border cursor-pointer flex items-center justify-center  w-14 h-14 text-center rounded-md ${
                            isAvailable
                              ? isSelected
                                ? "cursor-pointer border-slate-900 bg-slate-900 text-white"
                                : "border-slate-900 text-slate-900"
                              : "border-gray-200 text-gray-200 cursor-default"
                          }`}
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size.sizeName}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="mb-6">
                <div className="mr-3 font-semibold text-gray-900">Quantity</div>
                <div className="flex items-center space-x-6 mt-6">
                  <button
                    onClick={handleDecrease}
                    className="bg-gray-200 h-14 w-14  text-xl px-2 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <p className="text-gray-900 mx-2 font-light text-3xl">{quantity}</p>
                  <button
                    onClick={handleIncrease}
                    className="bg-gray-200 text-black h-14 w-14 hover:bg-gray-300 text-lg px-1.5 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-sm title-font text-blue-500 tracking-widest">
              {product.productBrand.brandName}
            </h2>
            <div className="flex flex-wrap justify-between">
              <div className="title-font font-medium text-2xl text-gray-900">
                {product.discountPrice ? (
                  <p>
                    $. {product.discountPrice.toFixed(2)} <br />
                    <span className="line-through text-sm text-gray-400">
                      $. {product.price.toFixed(2)}
                    </span>
                  </p>
                ) : (
                  <p>$. {product.price.toFixed(2)}</p>
                )}
              </div>
              <div className="space-x-4">
                <button
                  disabled={!selectedSize}
                  onClick={() => handleAddToCart(quantity, product.productId, selectedSize?.sizeId)}
                  className="ml-auto text-white bg-slate-900 border-0 py-3 px-6 focus:outline-none hover:bg-slate-800 rounded"
                >
                  Add to Cart
                </button>
                <button
                  disabled={!selectedSize}
                  onClick={() => handleBuyNow(product.productId, selectedSize?.sizeId, quantity)}
                  className="ml-auto text-white bg-slate-900 border-0 py-3 px-6 focus:outline-none hover:bg-slate-800 rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {recommendProducts && recommendProducts.length > 0 && (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Recommend Product
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
           {recommendProducts.map((product) => (
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
                     {product.productBrand.brandName}
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
          </div>
      )}

      {error && <div className="text-red-500">{error}</div>}
    </section>
  );
};

export default ProductDetail;
