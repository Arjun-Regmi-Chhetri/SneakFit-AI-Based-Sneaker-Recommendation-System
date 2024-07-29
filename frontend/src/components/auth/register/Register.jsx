import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../../service/Service";
import WhiteShoes from "../../../assets/whiteshoes.png"
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const addUser = async (user) => {
    try {
      const post = await registerUser(user);
      console.log("Added Successfully ", post);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } catch (error) {
      console.log("Unable to add user ", error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const user = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      };
      addUser(user);
      console.log("Form submitted", formValues);
    }
  };

  return (
    <div className="min-h-full py-10 max-w-3xl mx-auto">
      <div className="flex justify-center rounded-md border border-slate-900 ">
      <div className="px-10 py-10  md:w-7/12">
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex space-x-3">
                <fieldset className="border-2 border-slate-900 rounded-md px-2">
                  <legend className="px-2 block text-slate-900 text-sm font-semibold">
                    FirstName
                  </legend>
                  <div className="flex items-center px-2 pb-3 py-1">
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formValues.firstName}
                      onChange={handleChange}
                      placeholder="Enter Your FirstName"
                      className="outline-none w-full"
                    />
                  </div>
                </fieldset>
                <fieldset className="border-2 border-slate-900 rounded-md px-2">
                  <legend className="px-2 block text-slate-900 text-sm font-semibold">
                    LastName
                  </legend>
                  <div className="flex items-center px-2 pb-3 py-1">
                    <input
                      name="lastName"
                      type="text"
                      value={formValues.lastName}
                      onChange={handleChange}
                      placeholder="Enter Your LastName"
                      className="outline-none w-full"
                    />
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset className="border-2 border-slate-900 rounded-md px-2">
                  <legend className="px-2 block text-slate-900 text-sm font-semibold">
                    Email Id
                  </legend>
                  <div className="flex items-center px-2 pb-3 py-1">
                    <input
                      name="email"
                      type="text"
                      required
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="outline-none w-full"
                    />
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset className="border-2 border-slate-900 rounded-md px-2">
                  <legend className="px-2 block text-slate-900 text-sm font-semibold">
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
                      className="outline-none w-full"
                    />
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset className="border-2 border-slate-900 rounded-md px-2">
                  <legend className="px-2 block text-slate-900 text-sm font-semibold">
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
                      className="outline-none w-full"
                    />
                  </div>
                </fieldset>
                {errors.cpassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cpassword}
                  </p>
                )}
              </div>
            </div>
            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-slate-900 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="h-auto md:w-5/12 px-3 pt-10 bg-slate-900 hidden md:block ">
          <div className="pt-4">
            <img src={WhiteShoes} alt="" className="drop-shadow-2xl"/>
          </div>
          <div className="text-white text-center my-3 ">
            <h2 className="font-bold text-2xl">Already Have Account ?</h2>
            <p className="my-3">Go to login page, acess the site and grab the unlimited oportunity </p>
            <div>
              <KeyboardReturnOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
