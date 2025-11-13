import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserId } from "../utils/authUtils";

const PrivateRoutes: React.FC = () => {
  const userId = getUserId(); // Check if the user is logged in

  // Not authenticated → redirect to login or home page
  if (!userId) {
    return <Navigate to="/auth/login" replace />;
  }

  // Authenticated → render the nested routes
  return <Outlet />;
};

export default PrivateRoutes;