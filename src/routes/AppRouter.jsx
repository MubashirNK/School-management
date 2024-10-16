import React from "react";
import { Route, BrowserRouter, Router, Routes } from "react-router-dom";
import { path } from "./path";

import Home from "@/pages/Home";
import Sidemenu from "@/Components/sidebar/sidebar";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

import Addlib from "@/pages/Librarian/Register";
import Librarian from "@/pages/Librarian/Librarian";

import Addstaff from "@/pages/OfficeStaff/Register";
import OfficeStaff from "@/pages/OfficeStaff/OfficeStaff";

import AddAdmin from "@/pages/Admin/Register";
import Admin from "@/pages/Admin/Admin";
import Loginadmin from "@/pages/Admin/AdminLogin";
import Loginlibrarian from "@/pages/Librarian/LoginLibrarian";
import Loginofficestaff from "@/pages/OfficeStaff/LoginOfficestaff";


function AppRouter() {
  return (
    <>
      <Routes>
        <Route path={path.login} element={<Login />} />
        <Route path={path.register} element={<Register />} />
        <Route path={path.addlib} element={<Addlib />} />
        <Route path={path.addadmin} element={<AddAdmin />} />
        <Route path={path.addstaff} element={<Addstaff />} />
        <Route path={path.loginadmin} element={<Loginadmin />} />
        <Route path={path.loginlibrarian} element={<Loginlibrarian />} />
        <Route path={path.loginofficestaff} element={<Loginofficestaff />} />
        

        <Route element={<Sidemenu />}>
          <Route path={path.home} element={<Home />} />
          <Route path={path.librarian} element={<Librarian />} />
          <Route path={path.Officestaff} element={<OfficeStaff />} />
          <Route path={path.admin} element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
