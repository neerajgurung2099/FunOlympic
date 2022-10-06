import React from "react";
import PlayerToolbar from "../../components/player/PlayerToolbar";

import DashboardLayout from "../../components/dashboard-layout";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const Player = () => {
  return (
    <Box>
      <PlayerToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(Player);
