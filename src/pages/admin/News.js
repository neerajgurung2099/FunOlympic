import React from "react";
import DashboardLayout from "../../components/dashboard-layout";
import NewsToolbar from "../../components/news/NewsToolbar";
import { Box } from "@mui/system";

import { Outlet } from "react-router-dom";
const News = () => {
  return (
    <Box>
      <NewsToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(News);
