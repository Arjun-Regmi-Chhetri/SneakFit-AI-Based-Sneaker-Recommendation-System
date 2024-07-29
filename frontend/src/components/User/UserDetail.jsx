import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import NoFile from "../../assets/user/nofile.png";

import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const [error, setError] = useState(null);
  const { user, updateUser } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentUser(user); // Update state when user context changes
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedUser = await updateUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        userImage: selectedFile || currentUser.userImage,
      });

      setCurrentUser(updatedUser); // Local state update for immediate UI feedback
      if (selectedFile) {
        setSelectedImage(URL.createObjectURL(selectedFile));
      }
      window.scrollTo(0,0)
      navigate("/dashboard")
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="profile w-9/12">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Public Profile</h2>
          <p className="my-2">Add Information About Yourself</p>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Basics:</h2>
          <div className="mb-3 flex flex-col">
            <input
              type="text"
              value={currentUser.firstName }
              onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
              className="border border-gray-900 px-7 py-4"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <input
              type="text"
              value={currentUser.lastName }
              onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
              className="border border-gray-900 px-7 py-4"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <input
              type="text"
              value={currentUser.email }
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              className="border border-gray-900 px-7 py-4"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <input
              type="text"
              placeholder="+977 - 980000000"
              value={currentUser.phone }
              onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
              className="border border-gray-900 px-7 py-4"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <input
              type="text"
              placeholder="Enter Your Address Here"
              value={currentUser.address}
              onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
              className="border border-gray-900 px-7 py-4"
            />
          </div>
          <div className="mb-3 px-7 py-3 flex flex-col border border-gray-900">
            <label htmlFor="">Image Preview</label>
            <img
              src={selectedImage || (currentUser.userImage ? `/src/assets/user/${currentUser.userImage}` : NoFile)}
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
  );
};

export default UserDetail;
