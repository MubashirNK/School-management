// import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { updateUserDetails } from "@/Redux/Reducers/Auth/reducer";
import useApi from "@/Services/apiWrapper";

// import 'react-toastify/dist/ReactToastify.css';
// import { login, logout } from '../redux/features/auth/authSlice'; // Import logout action
import { useDispatch } from "react-redux";

const Loginadmin = () => {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);



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
      const newUser = await api.post("/auth/login", formData);

      const decoded = jwtDecode(newUser.token);
      console.log(decoded);

      dispatch(updateUserDetails({ ...decoded, accessToken: newUser.token }));
      navigate('/admin');
      setLoading(false);
      toast.success(newUser.message, { duration: 1000 });
    } catch (error) {
      toast.success(error?.response?.data?.message, { duration: 1000 });
      console.error("Failed to create user:", error.message);
    }



  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="flex items-center justify-center min-h-screen lg:w-2/5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-600"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to={"/forgot-password"}
              className="text-sm text-black hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link className="text-sm text-black hover:underline" to="/addadmin">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginadmin;
