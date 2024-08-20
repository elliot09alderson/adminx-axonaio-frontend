import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtector = ({ isAuthenticated, role, children }) => {
  if (!isAuthenticated && role === "admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtector;
