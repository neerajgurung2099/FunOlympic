import React from "react";
import { useAuth } from "./Auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAdminAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user && auth.user.role == "admin") {
    return <Navigate to="/adminlogin" state={{ path: location.pathname }} />;
  }
  return <div> {children} </div>;
};
