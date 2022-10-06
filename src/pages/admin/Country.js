import React from "react";

import DashboardLayout from "../../components/dashboard-layout";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import CountryToolbar from "../../components/country/CountryToolbar";
const Country = () => {
  return (
    <Box>
      <CountryToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(Country);
