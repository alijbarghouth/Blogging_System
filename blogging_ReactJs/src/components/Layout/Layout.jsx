import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout({ loginData, logOut }) {
  return (
    <div className="">
      <Navbar loginData={loginData} logOut={logOut} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
