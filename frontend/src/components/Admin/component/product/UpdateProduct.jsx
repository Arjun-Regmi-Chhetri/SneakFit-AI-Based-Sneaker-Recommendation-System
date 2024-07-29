import React, { useEffect, useState } from "react";
import {
  fetchProduct,
  updateProductService,
  fetchProductCategories,
  fetchProductSubCategories,
  fetchProductSize,
  fetchProductBrand,
} from "../../../../service/Service";
import { useNavigate, useParams } from "react-router-dom";
import NoFile from "../../../../assets/user/nofile.png";

const UpdateProduct = () => {
  const { productId } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    price: "",
    discountPrice: "",
    productCategory: "",
    productSubCategory: "",
    productBrand: "",
    productSizes: [],
    productColor: "",
    productImage: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchProduct();
      const productData = response.find(
        (product) => product.productId === productId
      );
      setProduct(productData || {});

      const fetchCategories = await fetchProductCategories();
      const fetchSubCategories = await fetchProductSubCategories();
      const fetchSizes = await fetchProductSize();
      const fetchBrand = await fetchProductBrand();
      setCategories(fetchCategories);
      setSubCategories(fetchSubCategories);
      setSizes(fetchSizes);
      setBrands(fetchBrand);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        productImage: selectedFile || product.productImage,
      };
      await updateProductService(updatedProduct);
      navigate("/admin/sneaker", {
        state: { successMessage: "Product Updated Successfully" },
      });
    } catch (error) {
      setError("Failed to update product");
      console.error("Error updating product:", error);
    }
  };


  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="profile w-9/12">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Product Detail</h2>
            <p className="my-2">Edit or Update Product information</p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-3 flex flex-col">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="productDescription">Product Description</label>
              <textarea
                id="productDescription"
                value={product.productDescription}
                onChange={(e) =>
                  setProduct({ ...product, productDescription: e.target.value })
                }
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="discountPrice">Discount Price</label>
              <input
                id="discountPrice"
                type="number"
                value={product.discountPrice}
                onChange={(e) =>
                  setProduct({ ...product, discountPrice: e.target.value })
                }
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>

            <div className="md:flex">
              <div className="mb-3 flex flex-col md:w-6/12">
                <label htmlFor="productCategory">Category</label>
                <select
                  id="productCategory"
                  name="productCategory"
                  value={product.productCategory.categoryId} // Set the value to productCategory's categoryId
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productCategory:  e.target.value
                      
                    })
                  }
                  className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 category-dropdown"
                >
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 flex flex-col md:w-6/12">
                <label htmlFor="productSubCategory">SubCategory</label>
                <select
                  id="productSubCategory"
                  name="productSubCategory"
                  value={product.productSubCategory.subCategoryId} // Set the value to productCategory's categoryId
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productSubCategory:  e.target.value
                      
                    })
                  }
                  className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 category-dropdown"
                >
                  {subCategories.map((subCategory) => (
                    <option
                      key={subCategory.subCategoryId}
                      value={subCategory.subCategoryId}
                    >
                      {subCategory.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

              <div className="mb-3 flex flex-col md:w-6/12">
                <label htmlFor="productBrand">Brand</label>
                <select
                  name="productBrand"
                  id="productBrand"
                  value={product.productBrand.brandId}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productBrand:  e.target.value
                     
                    })
                  }
                  className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4"
                >
                  {brands.map((brand) => (
                    <option value={brand.brandId} key={brand.brandId}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="">Product Size</label>

                {sizes.map((size) => (
                  <div key={size.sizeId} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`size-${size.sizeId}`}
                      name="productSize"
                      value={size.sizeId}
                      onChange={(e) => {
                        const newSizeId = e.target.value;
                        if (
                          product.productSizes.some(
                            (s) => s.sizeId === newSizeId
                          )
                        ) {
                          setProduct({
                            ...product,
                            productSizes: product.productSizes.filter(
                              (s) => s.sizeId !== newSizeId
                            ),
                          });
                        } else {
                          setProduct({
                            ...product,
                            productSizes: [
                              ...product.productSizes,
                              { sizeId: newSizeId, sizeName: size.sizeName },
                            ],
                          });
                        }
                      }}
                      checked={product.productSizes.some(
                        (s) => s.sizeId === size.sizeId
                      )}
                     
                    />
                    <label htmlFor={`size-${size.sizeId}`}>
                      {size.sizeName}
                    </label>
                  </div>
                ))}
              </div>

            <div className="mb-3 flex flex-col">
              <label htmlFor="productColor">Color</label>
              <input
                id="productColor"
                type="text"
                value={product.productColor}
                onChange={(e) =>
                  setProduct({ ...product, productColor: e.target.value })
                }
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>
            <div className="mb-3 px-7 py-3 flex flex-col border border-gray-900">
              <label htmlFor="">Image Preview</label>
              <img
                src={
                  selectedImage ||
                  (product.productImage
                    ? `/src/assets/product/${product.productImage}`
                    : NoFile)
                }
                alt="Preview"
                className="w-full h-60 object-contain border border-gray-900"
              />
              <label htmlFor="">Add / Change Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className=""
              />
            </div>
            <button
              className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 w-1/2 my-3"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
