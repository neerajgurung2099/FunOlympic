import React from "react";
import DashboardLayout from "../../components/dashboard-layout";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import GalleryToolbar from "../../components/gallery/GalleryToolbar";
const Gallery = () => {
  return (
    <Box>
      <GalleryToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(Gallery);
