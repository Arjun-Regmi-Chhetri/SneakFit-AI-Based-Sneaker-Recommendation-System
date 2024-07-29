import { Fragment, useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/logo/logo-dar.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useCart } from "../../context/CartContext";

import NoFile from "../../assets/user/nofile.png";

const navigation = [
  { label: "Men", ref: "/category/men" },
  { label: "Women", ref: "/category/women" },
  { label: "Sports", ref: "/category/sports" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ activetab }) => {
  const [open, setOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();
  const { cart } = useCart();

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    logout();
    setShowLogout(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userInitial = user ? user.firstName.charAt(0) : "";
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition show={open}>
        <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {isAuthenticated ? (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/profile"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Profile
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/orders"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Orders
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <header className="relative bg-white">
        <div
          className={`bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8 ${
            isAuthenticated
              ? "text-center py-2"
              : "h-10 items-center justify-center flex"
          }`}
        >
          <p>SneakFit</p>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end sm:space-x-6">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-gray-100"
                >
                  Sign in
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-300 hover:text-gray-100"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 border-b border-gray-200"
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src={Logo} alt="" />
                </Link>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.map((nav, index) => (
                    <div key={index} className="relative flex">
                      <NavLink
                        to={nav.ref}
                        className={({ isActive }) =>
                          `relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                            isActive
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-900 hover:text-indigo-600"
                          }`
                        }
                      >
                        {nav.label}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                {/* Search */}
                <div className="flex lg:ml-6">
                  {searchVisible && (
                    <form onSubmit={handleSearchSubmit}>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                      />
                    </form>
                  )}
                  <button
                    onClick={toggleSearch}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-8 w-8"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root mx-3 relative">
                  <Link
                    to={`/cart`}
                    className="group -m-2 flex items-center p-2 relative"
                  >
                    <ShoppingBagIcon
                      className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span
                      className={`ml-2 text-sm font-medium group-hover:text-gray-800 absolute ${
                        isAuthenticated && cart.length >0 ? "bg-red-500" : "hidden"
                      } rounded-full h-7 w-7 text-center text-white top-1 right-[-4px] pt-[3.5px]`}
                    >
                      {isAuthenticated && cart.length > 0 && (
                        <p>{cart.length}</p>
                      )}
                      {!isAuthenticated && <p>Your cart is empty</p>}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>

                {isAuthenticated && (
                  <div className="ml-5 relative" ref={dropdownRef}>
                    <div
                      className="h-9 w-9 bg-purple-800 text-white rounded-full text-center flex items-center justify-center cursor-pointer"
                      onClick={handleIconClick}
                    >
                      {userInitial}
                    </div>
                    {showLogout && (
                      <div className="absolute mt-2 right-0 bg-white rounded shadow-lg z-40 px-5 py-3 w-80">
                        <div className="border-b-2 my-3 mb-5">
                          <Link
                            to="/dashboard"
                            className="flex items-center my-3 p-3 space-x-5  rounded-md hover:bg-gray-100"
                          >
                            <img
                              src={
                                user.userImage
                                  ? `/src/assets/user/${user.userImage}`
                                  : NoFile
                              }
                              alt=""
                              className="rounded-full w-10 h-10 border border-gray-600"
                            />
                            <div className="profieName capitalize text-xl">
                              {user.firstName} {user.lastName}
                            </div>
                          </Link>
                        </div>

                        <div
                          onClick={handleLogout}
                          className="block w-full text-left my-2 px-4 p-3 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          <LogoutButton />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
