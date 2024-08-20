import React from "react";
import { Navigate } from "react-router-dom";

const AuthenticateMe = ({ isAuthenticated, role, children }) => {
  if (!isAuthenticated && role === "admin") {
    return <Navigate to="/admin/login" />;
  }
  <Navigate to="/admin/dashboard" />;
};

export default AuthenticateMe;
