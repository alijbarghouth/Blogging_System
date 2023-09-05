import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtected({ children, isAdmin }) {
  if (localStorage.getItem("token") && isAdmin == true) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export default AdminProtected;
