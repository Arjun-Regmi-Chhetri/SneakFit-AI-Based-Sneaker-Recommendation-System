import React from "react";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { Link } from "react-router-dom";

const sideNavMenu = [
  {
    icon: <SpaceDashboardIcon />,
    label: "Dashboard",
    ref: "/admin/dashboard",
  },

  {
    icon: <ProductionQuantityLimitsIcon />,
    label: "Product",
    ref: "/admin/sneaker",
  },

  {
    icon: <CategoryIcon />,
    label: "Category",
    ref: "/admin/sneakerCategory",
  }, {
    icon: <ColorLensIcon />,
    label: "Sub Cateogry",
    ref: "/admin/sneakerSubCategory",
  },
  {
    icon: <AcUnitIcon />,
    label: "Brand",
    ref: "/admin/sneakerBrand",
  },
  {
    icon: <AllInclusiveIcon />,
    label: "Sneaker Size",
    ref: "/admin/sneakerSize",
  },
  {
    icon: <PeopleOutlineIcon />,
    label: "User",
    ref: "/admin/user",
  },
  {
    icon: <PeopleOutlineIcon />,
    label: "Admin",
    ref: "/admin/admin_list",
  },
];

const Sidebar = ({ activeTab }) => {
  return (
    <>
      <aside
        id="default-sidebar"
        className=" z-40 h-screen "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sideNavMenu.map((menu, index) => {
              const { icon, label, ref } = menu;

              return (
                <Link
                  to={ref}
                  key={index}
                  className={` ${
                    activeTab === index
                      ? " hover:bg-gray-100 dark:bg-gray-100 bg-gray-700 dark:text-blue-700  "
                      : "dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
                  }   relative flex items-center p-2 text-gray-900 rounded-lg    group `}
                  style={{ marginTop: (index === 1 || index === 6) ? '25px' : '', marginBottom: ( index === 5) ? '25px' : '' } }> 
                  <span>{icon} </span>
                  <span className="px-2"> {label}</span>
                  {(index === 6 || index == 1)  && (
                    <hr className="absolute top-[-10px] left-0 w-full border-t-1 border-gray-700 dark:border-gray-400"  />
                  )}
                </Link>
              );
            })}
            {/* <li>
              <a
                href="#"
                className=""
              >
                {sideNavMenu}
              </a>
            </li> */}

            {/* More list items here */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
