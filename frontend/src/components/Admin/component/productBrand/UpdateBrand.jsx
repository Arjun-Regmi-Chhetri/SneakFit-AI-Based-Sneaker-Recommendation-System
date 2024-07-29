import React, { useEffect, useState } from 'react';
import { fetchProductBrand, updateProductBrand } from '../../../../service/Service';
import { useNavigate, useParams } from 'react-router-dom';
import NoFile from "../../../../assets/user/nofile.png";

const UpdateBrand = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState({
    brandName: '',
    brandDescription: '',
    brandImage: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchProductBrand();
      const brandData = response.find(brand => brand.brandId === brandId);
      setBrand(brandData || {});
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [brandId]);

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
      const updatedBrand = {
        ...brand,
        brandName: brand.brandName,
        brandDescription: brand.brandDescription,
        brandImage: selectedFile ? selectedFile : brand.brandImage,
      };
      await updateProductBrand(updatedBrand);
      navigate("/admin/sneakerBrand", { state: { successMessage: "Brand Updated Successfully" } });
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };


  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="profile w-9/12">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Brand Detail</h2>
            <p className="my-2">Edit or Update Brand information</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col">
              <label htmlFor="brandName">Brand Name</label>
              <input
                id="brandName"
                type="text"
                value={brand.brandName}
                onChange={(e) => setBrand({ ...brand, brandName: e.target.value })}
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="brandDescription">Brand Description</label>
              <textarea
                id="brandDescription"
                value={brand.brandDescription}
                onChange={(e) => setBrand({ ...brand, brandDescription: e.target.value })}
                className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              />
            </div>
            <div className="mb-3 px-7 py-3 flex flex-col border border-gray-900">
              <label htmlFor="">Image Preview</label>
              <img
                src={selectedImage || (brand.brandImage ? `/src/assets/brand/${brand.brandImage}` : NoFile)}
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
            <button className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 w-1/2 my-3" type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrand;
