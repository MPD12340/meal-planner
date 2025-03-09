import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
