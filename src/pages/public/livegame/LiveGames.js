import React from "react";
import LiveGameList from "./LiveGameList";
import LiveComming from "./LiveComming";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Grid, Divider } from "@mui/material";
const LiveGames = () => {
  return (
    <Box>
      <Box sx={{ mb: 5, mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Live
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          <LiveGameList />
        </Grid>
      </Box>

      <LiveComming />
    </Box>
  );
};

export default LiveGames;
