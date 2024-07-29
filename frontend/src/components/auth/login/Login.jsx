import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../../service/Service"; // Import your loginUser function
import { useAuth } from "../../../context/AuthContext";
import WhiteShoes from "../../../assets/whiteshoes.png"

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensure useHistory is inside the functional component
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login } = useAuth();

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
      const response = await loginUser(formData);
      const { token } = response;

      console.log("Login Successful:", response);
      // Redirect to currentpage
      navigate(location.state?.from?.pathname || "/");
      login(token); // Example redirect to dashboard
    } catch (error) {
      console.error("Unable to login", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-full py-10 max-w-3xl mx-auto">
      <div className="flex justify-center rounded-md border border-slate-900">
        <div className="h-auto md:w-5/12 px-4 py-4 pt-10 bg-slate-900 hidden md:block">
          <div>
            <img src={WhiteShoes} alt="" className="drop-shadow-2xl"/>
          </div>
          <div className="text-white text-center my-3">
            <h2 className="font-bold text-2xl">New Here ?</h2>
            <p className="my-3">Create account and grab the opportunity</p>
            <div>
              <ArrowRightAltOutlinedIcon />
            </div>
          </div>
        </div>
        <div className="px-10 py-10  md:w-7/12">
          <div className="mb-6">
            <h2 className="text-slate-900 text-4xl">
              <span className="font-light">Hello, </span>
              <br /> <span className="font-bold">Welcome!</span>
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <fieldset className="border-2 border-slate-900 rounded-md px-2">
                <legend className="px-2 block text-slate-900 text-sm font-semibold">
                  Email Id
                </legend>
                <div className="flex items-center px-2 pb-3 py-1">
                  <EmailOutlinedIcon className="text-slate-900 mr-3" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
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
                  <HttpsOutlinedIcon className="text-slate-900 mr-3" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="outline-none w-full"
                  />
                </div>
              </fieldset>

              <div className="text-sm mt-3 text-right">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-slate-900 hover:text-indigo-900"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && <div className="text-red-900 text-sm mt-2">{error}</div>}

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-700 focus:outline-none"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="text-slate-800 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-slate-900 font-semibold hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
