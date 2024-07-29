import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerAdmin } from "../../../../service/Service";
import WhiteShoes from "../../../../assets/whiteshoes.png";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const addAdmin = async (admin) => {
    try {
      const post = await registerAdmin(admin);
      console.log("Added Successfully ", post);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: "",
      });
      setSuccessMessage('Successfully Registered');
    } catch (error) {
      console.log("Unable to add admin ", error);
    }
  };

  useEffect(() => {
    if (formValues.password !== formValues.cpassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => {
        const { cpassword, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [formValues.password, formValues.cpassword]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const admin = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      };
      addAdmin(admin);
      console.log("Form submitted", formValues);
    }
  };

  return (

    <section className="bg-slate-800 fixed w-full h-full rounded-bubble flex justify-center items-center">
    <div className="container mx-auto">
      {successMessage && (
        <p
          className={`fixed right-0 top-3 px-4 py-2 bg-green-600 text-white text-sm transition-opacity duration-1000 ${
            successMessage ? "success-message" : "opacity-0"
          } ${successMessage ? "success-message-border" : "w-0"}`}
        >
          {successMessage}
        </p>
      )}
      <div className="min-h-full py-10 max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="flex-1 text-gray-300 bg-[rgba(17,20,34,0.7)] backdrop-blur-[90px] py-10 px-5 md:px-10 md:w-1/2 border md:border-none">
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex space-x-3">
                  <fieldset className="border-2 border-gray-300 rounded-md px-2 flex-1">
                    <legend className="px-2 block text-gray-300 text-sm font-semibold">
                      First Name
                    </legend>
                    <div className="flex items-center px-2 pb-3 py-1">
                      <input
                        name="firstName"
                        type="text"
                        required
                        value={formValues.firstName}
                        onChange={handleChange}
                        placeholder="Enter Your First Name"
                        className="outline-none w-full bg-transparent placeholder-slate-300"
                      />
                    </div>
                  </fieldset>
                  <fieldset className="border-2 border-gray-300 rounded-md px-2 flex-1">
                    <legend className="px-2 block text-gray-300 text-sm font-semibold">
                      Last Name
                    </legend>
                    <div className="flex items-center px-2 pb-3 py-1">
                      <input
                        name="lastName"
                        type="text"
                        value={formValues.lastName}
                        onChange={handleChange}
                        placeholder="Enter Your Last Name"
                        className="outline-none w-full bg-transparent placeholder-slate-300"
                      />
                    </div>
                  </fieldset>
                </div>
                <fieldset className="border-2 border-gray-300 rounded-md px-2">
                  <legend className="px-2 block text-gray-300 text-sm font-semibold">
                    Email Id
                  </legend>
                  <div className="flex items-center px-2 pb-3 py-1">
                    <input
                      name="email"
                      type="email"
                      required
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="outline-none w-full bg-transparent placeholder-slate-300"
                    />
                  </div>
                </fieldset>
                <fieldset className="border-2 border-gray-300 rounded-md px-2">
                  <legend className="px-2 block text-gray-300 text-sm font-semibold">
                    Password
                  </legend>
                  <div className="flex items-center px-2 pb-3 py-1">
                    <input
                      name="password"
                      type="password"
                      required
                      value={formValues.password}
                      onChange={handleChange}
                      placeholder="***********"
                      className="outline-none w-full bg-transparent placeholder-slate-300"
                    />
                  </div>
                </fieldset>
                <fieldset className="border-2 border-gray-300 rounded-md px-2">
                  <legend className="px-2 block text-gray-300 text-sm font-semibold">
                    Confirm Password
                  </legend>
                  <div className="flex items-center px-2 pb-3 py-1">
                    <input
                      name="cpassword"
                      type="password"
                      required
                      value={formValues.cpassword}
                      onChange={handleChange}
                      placeholder="***********"
                      className="outline-none w-full bg-transparent placeholder-slate-300"
                    />
                  </div>
                  {errors.cpassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cpassword}
                    </p>
                  )}
                </fieldset>
              </div>
              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none"
                >
                  Create Admin Account
                </button>
              </div>
              <p className="text-sm mt-6 text-center">
                Already have an admin account?{" "}
                <Link
                  to="/admin/login"
                  className=" text-gray-300 font-semibold hover:text-gray-100 ml-1"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Image and Text Section */}
        <div className="hidden md:flex md:w-1/2 bg-[rgba(0,0,0,0.56)] z-50 backdrop-blur-3xl text-white flex-col items-center justify-center p-10">
          <img src={WhiteShoes} alt="White Shoes" className="drop-shadow-2xl mb-4" />
          <div className="text-center">
            <h2 className="font-bold text-2xl mb-3">Already Have an Admin Account?</h2>
            <p className="mb-6">Go to the admin login page and access the site to manage your system.</p>
            <KeyboardReturnOutlinedIcon className="text-white text-3xl" />
          </div>
        </div>
      </div>
    </div>

    </section>
  );
};

export default Register;
