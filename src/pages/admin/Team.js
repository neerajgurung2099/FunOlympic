import React from "react";

import DashboardLayout from "../../components/dashboard-layout";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import TeamToolbar from "../../components/team/TeamToolbar";
const Team = () => {
  return (
    <Box>
      <TeamToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(Team);
