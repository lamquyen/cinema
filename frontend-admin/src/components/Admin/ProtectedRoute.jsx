import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken"); // Kiểm tra token admin

  return adminToken ? children : <Navigate to="/" replace />; // Chuyển hướng nếu không có token
};

export default ProtectedRoute;
