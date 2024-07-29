import React, { useEffect, useState } from "react";

import { fetchProduct } from "../../service/Service";
import "./Product.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Product = () => {
  const [products, setProduct] = useState([]);

  const [visibleProducts, setVisibleProducts] = useState(6);

  const fetchData = async () => {
    try {
      const response = await fetchProduct();

      setProduct(response);
    } catch (error) {
      throw new error();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 md:max-w-5xl py-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8 pt-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Just For You
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
            {products.slice(0, visibleProducts).map((product) => (
              <div key={product.productId} className="group relative  fade-in hover:border hover:border-gray-700 pb-7 product_cart">
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
                            $. {product.discountPrice.toFixed(2)} <br />
                            <span className="line-through text-sm text-gray-400">
                              $. {product.price.toFixed(2)}
                            </span>
                          </p>
                        ) : (
                          <p>$. {product.price.toFixed(2)}</p>
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

          {visibleProducts < products.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={showMoreProducts}
                className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
