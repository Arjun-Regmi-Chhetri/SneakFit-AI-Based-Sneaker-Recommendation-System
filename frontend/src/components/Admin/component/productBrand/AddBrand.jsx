import React, { useState } from "react";
import { createProductBrand } from "../../../../service/Service";
import { useNavigate } from "react-router-dom";
import NoFile from "../../../../assets/user/nofile.png";

const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const createBrand = async (brandName, brandDescription, brandImage) => {
    try {
      await createProductBrand(brandName, brandDescription, brandImage);
      navigate("/admin/sneakerBrand", {
        state: { successMessage: "Brand Added Successfully" },
      });
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBrand(brandName, brandDescription, brandImage);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="profile w-9/12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Add New Brand</h2>
          <p className="my-2">Enter details to add a new brand</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col">
            <label htmlFor="brandName">Brand Name</label>
            <input
              id="brandName"
              type="text"
              placeholder="e.g., Nike"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              required
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="brandDescription">Brand Description</label>
            <textarea
              id="brandDescription"
              placeholder="Enter brand description"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
              rows="4"
            />
          </div>
          <div className="mb-3 py-3 flex flex-col border border-gray-900">
            <label htmlFor="">Image Preview</label>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                className={`w-full h-60 object-contain border border-gray-900`}
              />
            )}
            <label htmlFor="brandImage">Add / Change Image</label>
            <input
              id="brandImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border bg-gray-600 outline-none rounded-md border-gray-900 px-7 py-4"
            />
          </div>
          <button
            className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 w-1/2 my-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
