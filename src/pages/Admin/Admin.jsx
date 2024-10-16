import React from "react";
import {Link} from "react-router-dom"

function Admin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90rem]  h-[70vh]">
        <h2 className="text-2xl font-bold mb-6 text-center"> Admin Panel</h2>
       <Link to="/officestaff"><button className="w-[50vh] h-[10vh] py-2 bg-neutral-400 text-white rounded-lg hover:bg-gray-600 text-2xl font-bold mb-6 text-center">Front Office</button></Link> 
        <br /><br />
        <Link to="/librarian"> <button className="w-[50vh] h-[10vh] py-2 bg-neutral-400 text-white rounded-lg hover:bg-gray-600 text-2xl font-bold mb-6 text-center">Library</button></Link> 
        <br /><br />
        <Link> <button className="w-[50vh] h-[10vh] py-2 bg-neutral-400 text-white rounded-lg hover:bg-gray-600 text-2xl font-bold mb-6 text-center">Staffs</button></Link> 
      </div>
    </div>
  );
}

export default Admin;
