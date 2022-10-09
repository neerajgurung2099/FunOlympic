import React from "react";
import { useAuth } from "./Auth";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const RequireAdminAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.user?.Role == "admin") {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/adminlogin" state={{ path: location.pathname }} />;
  }
};
