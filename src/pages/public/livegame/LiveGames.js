import React from "react";
import LiveGameList from "./LiveGameList";
import LiveComming from "./LiveComming";
import { Box } from "@mui/system";
const LiveGames = () => {
  return (
    <Box>
      <LiveGameList />
      <LiveComming />
    </Box>
  );
};

export default LiveGames;
