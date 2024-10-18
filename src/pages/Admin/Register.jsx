import React from "react";
import { useState } from "react";
import useApi from "@/Services/apiWrapper";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const api = useApi();
  const navigate = useNavigate()

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role:""
  });
  const handleInputchange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    
    setFormdata((prevdata) => ({ ...prevdata, [name]: value }));
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await api.post("/admin/create", formData); 
      console.log(formData);
      if (formData.role==="staff") { navigate("/officestaff")}
      else if (formData.role==="admin") {navigate("/admin")}
      else if (formData.role==="librarian") {navigate("/librarian")}
     
    } catch (error) {
      console.error("Failed to create user:", error.message);
    }
 
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
        <div className="bg-white mt-14 mb-10  p-8 rounded-lg shadow-2xl w-full md:w- max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4block text-gray-700">
              <label htmlFor="name">Name :</label>

              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={(event) => {
                  handleInputchange(event);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
            </div>
            <br />
            <br />
            <div className="mb-4">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                placeholder="E-mail"
                name="email"
                value={formData.email}
                onChange={(event) => {
                  handleInputchange(event);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
            </div>
            <br />
            <br />
            <div className="mb-4">
              <label htmlFor="mobile">mobile:</label>
              <input
                type="text"
                placeholder="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={(event) => {
                  handleInputchange(event);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
            </div>
            <br />
            <br />
            <div className="mb-4">
              <div className="mb-4">
                <label htmlFor="password">password:</label>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={(event) => {
                    handleInputchange(event);
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                />
                <select name="role" onChange={(event) => {
                  handleInputchange(event);
                }}
                value={formData.role}>
                    <option selected hidden>select the role</option>
                    <option value="admin">admin</option>
                    <option value="staff">staff</option>
                    <option value="librarian">librarian</option>
                </select>
              </div>
              <br />
              <br />
              <br />
              <br />
              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-600"
              >
                register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
