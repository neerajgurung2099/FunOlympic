import React from "react";
import DashboardLayout from "../../components/dashboard-layout";
import ResultToolbar from "../../components/result/ResultToolbar";

import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const Results = () => {
  return (
    <Box>
      <ResultToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(Results);
