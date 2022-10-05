import React from "react";
import DashboardLayout from "../components/dashboard-layout";
import GameToolbar from "../components/game/GameToolbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const Game = () => {
  return (
    <div>
      <Box>
        <GameToolbar />
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout(Game);
