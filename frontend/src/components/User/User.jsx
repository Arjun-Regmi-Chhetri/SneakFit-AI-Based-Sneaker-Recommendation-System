import React from "react";
import UserSideBar from "./UserSideBar";
import "./user.css"

const User = ({ children, activetab }) => {
  return (
    <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-full">
      <div className="flex items-start space-x-10 relative overflow-hidden">
        <div className="w-3/12">
          <UserSideBar activetab={activetab} />
        </div>
        <div className="w-9/12 h-[80vh] overflow-y-scroll no-scrollbar ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default User;
