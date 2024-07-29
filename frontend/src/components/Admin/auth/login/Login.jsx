import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginAdmin } from "../../../../service/Service"; // Import your loginUser function
import { useAuth } from "../../../../context/AdminAuthContext";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensure useHistory is inside the functional component
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const{login} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(formData);
      const { token } = response;

      console.log("Login Successful:", response);
      // Redirect to currentpage
      navigate("/admin/dashboard");
      login(token); // Example redirect to dashboard
    } catch (error) {
      console.error("Unable to login", error);
      setError("Invalid email or password");
    }
  };

  return (
    <section className="bg-gray-900 fixed w-full h-full flex justify-center items-center">
    <div className="container py-10 md:w-4/12 sm:w-8/12 w-full mx-auto  rounded-bubble">
        
        <div className="h-auto w-full text-gray-300 bg-[rgba(17,20,34,0.7)] backdrop-blur-[150px] px-4 py-4  rounded-lg border">
        <div className="mb-6">
            <h2 className=" text-4xl">
              <span className="font-light">Hello, </span>
              <br /> <span className="font-bold">Welcome!</span>
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <fieldset className="border-2 border-gray-300 rounded-md px-2">
                <legend className="px-2 block  text-sm font-semibold">
                  Email Id
                </legend>
                <div className="flex items-center px-2 pb-3 py-1">
                  <EmailOutlinedIcon className=" mr-3" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="outline-none w-full bg-transparent placeholder-slate-300"
                  />
                </div>
              </fieldset>
            </div>

            <div>
              <fieldset className="border-2 border-gray-300  rounded-md px-2">
                <legend className="px-2 block text-sm font-semibold">
                  Password
                </legend>
                <div className="flex items-center px-2 pb-3 py-1">
                  <HttpsOutlinedIcon className=" mr-3" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="outline-none w-full bg-transparent placeholder-slate-300"
                  />
                </div>
              </fieldset>

              <div className="text-sm mt-3 text-right">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-slate-300 hover:text-slate-100"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && <div className="text-red-900 text-sm mt-2">{error}</div>}

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-slate-100 bg-slate-700 hover:bg-slate-600 focus:outline-none"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className=" text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/admin/register"
              className="font-semibold hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
    </div>
  </section>
  );
};

export default Login;
