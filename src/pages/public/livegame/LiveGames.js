import React from "react";
import LiveGameList from "./LiveGameList";
import LiveComming from "./LiveComming";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
const LiveGames = () => {
  return (
    <Box>
      <Box sx={{ mb: 5, mt: 5 }}>
        <Typography>Live Games</Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <LiveGameList />
        </Grid>
      </Box>

      <LiveComming />
    </Box>
  );
};

export default LiveGames;
