import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/dashboard-layout";
import MatchToolbar from "../../components/matches/MatchToolbar";

const Matches = () => {
  return (
    <Box>
      <MatchToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(Matches);
