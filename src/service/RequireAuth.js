import React from "react";
import { useAuth } from "./Auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.user?.Role == "user") {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
};
