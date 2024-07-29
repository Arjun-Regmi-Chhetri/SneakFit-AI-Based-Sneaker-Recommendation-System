import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


import LogoDark from "../../../assets/logo/logo-dar.png"
import LogoLight from "../../../assets/logo/logo-light.png"
import { Link } from 'react-router-dom';


const Navbar = ({toggleSidebar, dark}) => {
  return (
    <div>
      <header className="antialiased ">
        <nav className="bg-white border-b-2 border-b-gray-200  px-4 lg:px-6 py-2.5 dark:bg-gray-800 dark:border-b-gray-600 ">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                id="togglenavBar"
                onClick={toggleSidebar}
                aria-expanded="true"
                aria-controls="navBar"
                className="inline p-2 mr-3 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
               <MenuIcon />
              </button>
              
              <Link to="/admin/dashboard" className="flex mr-4">
                <img
                 src={dark ? LogoLight : LogoDark}
                  className="mr-3 h-9 "
                  alt=""
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  SneakFit
                </span>
              </Link>
           
             
            </div>
           
            
                <div className="relative flex">
                <form action="#" method="GET" className="hidden sm:block lg:pl-2">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-96">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                   <SearchIcon />
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
                  <button
                    className="text-gray-600 mx-10 mt-1 border h-10 w-10 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    aria-label="Account"
                  >
                    A
                  </button>
                </div>
              </div>
           
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
