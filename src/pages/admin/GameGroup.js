import React from "react";
import DashboardLayout from "../../components/dashboard-layout";
import GameGroupToolbar from "../../components/gamegroup/GameGroupToolbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const GameGroup = () => {
  return (
    <Box>
      <GameGroupToolbar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(GameGroup);
