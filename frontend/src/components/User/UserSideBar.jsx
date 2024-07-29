import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import NoFile from "../../assets/user/nofile.png";
import { Link } from "react-router-dom";

const nav = [
  {
    label: "Profile",
    ref: "/dashboard",
  },
  {
    label: "Security",
    ref: "/dashboard/security",
  },
  {
    label: "My Order",
    ref: "/dashboard/order",
  },
];

const UserSideBar = ({ activetab }) => {
  const {user } = useUser();
  const [currentUser, setCurrentUser] = useState(user); // State to hold current user details

  useEffect(() => {
    setCurrentUser(user); // Update state when user context changes
  }, [user]);

  return (
    <div className="bg-gray-200 p-7">
      <div className="mb-5">
        { currentUser && ( // Use currentUser from state
          <div className="flex flex-col items-center mb-9">
            <img
              src={
                currentUser.userImage
                  ? `/src/assets/user/${currentUser.userImage}`
                  : NoFile
              }
              alt=""
              className="rounded-full aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden border border-gray-600 mb-3"
            />
            <div className="profileName font-bold capitalize text-md">
              {currentUser.firstName} {currentUser.lastName}
            </div>
          </div>
        )}
        <div>
          {nav.map((navItem, index) => (
            <Link
              to={navItem.ref}
              key={index}
              className={`flex flex-col my-2 py-1 px-2 text-center rounded-sm w-full ${
                activetab == index ? "bg-gray-800 text-white" : ""
              }`}
            >
              <span>{navItem.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
