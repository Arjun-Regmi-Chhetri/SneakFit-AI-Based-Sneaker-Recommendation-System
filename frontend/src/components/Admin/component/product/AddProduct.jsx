import React, { useEffect, useState } from "react";
import {
  addProductService,
  fetchProductBrand,
  fetchProductCategories,
  fetchProductSubCategories,
  fetchProductSize,
} from "../../../../service/Service";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);


  const [productData, setProductData] = useState({
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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === "productSize") {
      const sizeId = value;
      let updatedSizes = [...productData.productSizes];
  
      if (checked) {
        updatedSizes.push(sizeId);
      } else {
        updatedSizes = updatedSizes.filter((size) => size !== sizeId);
      }
  
      setProductData({ ...productData, productSizes: updatedSizes });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, productImage: e.target.files[0] });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProductService(productData);
      navigate("/admin/sneaker", {
        state: { successMessage: "Product Added Successfully" },
      });
    } catch (error) {
      console.error("Failed to add product", error);
      // Handle error state or show error message to the user
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetchProductCategories();
        const subCategoryResponse = await fetchProductSubCategories();
        const brandResponse = await fetchProductBrand();
        const sizeResponse = await fetchProductSize();

        setCategories(categoryResponse);
        setSubCategories(subCategoryResponse);
        setBrands(brandResponse);
        setSizes(sizeResponse);
      } catch (error) {
        console.error("Unable to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-[675px] p-3">
        <div className="mb-4 flex flex-col">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            placeholder="E.g. Running Shoes"
            required
            className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
          />
        </div>

        <div className="mb-4 flex">
          <div className="mr-3 flex flex-col w-60">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="00.00"
              required
               className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
            />
          </div>

          <div className="flex flex-col w-60">
            <label htmlFor="discountPrice">Discount Price</label>
            <input
              type="text"
              id="discountPrice"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleChange}
              placeholder="00.00"
             className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
            />
          </div>
        </div>

        <div className="mb-4 md:flex">
          <div className="flex flex-col">
            <label htmlFor="productCategory">Category</label>
            <select
              id="productCategory"
              name="productCategory"
              value={productData.productCategory}
              onChange={handleChange}
               className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content "
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="productSubCategory">Sub Category</label>
            <select
              id="productSubCategory"
              name="productSubCategory"
              value={productData.productSubCategory}
              onChange={handleChange}
              className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content md:mx-3"
            >
              <option value="">Select Sub Category</option>
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

          <div className="flex flex-col">
            <label htmlFor="productBrand">Brand</label>
            <select
              id="productBrand"
              name="productBrand"
              value={productData.productBrand}
              onChange={handleChange}
               className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.brandId} value={brand.brandId}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="productSize">Product Size</label>
          {sizes.map((size) => (
            <div key={size.sizeId} className="flex items-center">
              <input
                type="checkbox"
                id={`size-${size.sizeId}`}
                name="productSize"
                value={size.sizeId}
                onChange={handleChange}
                checked={productData.productSizes.includes(size.sizeId)}
              />
              <label htmlFor={`size-${size.sizeId}`}>{size.sizeName}</label>
            </div>
          ))}

          <div className="my-4 flex flex-col">
            <label htmlFor="productColor">Color</label>
            <input
              type="text"
              id="productColor"
              name="productColor"
              value={productData.productColor}
              onChange={handleChange}
              placeholder="E.g. Neon Green with Black accents"
              required
               className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={productData.productDescription}
            onChange={handleChange}
            className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
          ></textarea>
        </div>

        <div className="mb-4 flex justify-between">
          <label htmlFor="productImage">Image</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleFileChange}
            accept="/*"
             className="border bg-gray-600 outline-none rounded-md border-gray-900  py-4 px-3 w-fit-content"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-3 text-center"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
