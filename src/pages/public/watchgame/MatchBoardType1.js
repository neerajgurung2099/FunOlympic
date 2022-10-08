import React from "react";

import { Grid, Typography } from "@mui/material";
const MatchBoardType1 = ({ participant1, participant2, point1, point2 }) => {
  return (
    <>
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        sx={{
          display: "flex !important",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">{participant1}</Typography>
        <Typography variant="h4">{point1}</Typography>
      </Grid>

      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        sx={{
          display: "flex !important",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">{participant2}</Typography>
        <Typography variant="h4">{point2}</Typography>
      </Grid>
    </>
  );
};

export default MatchBoardType1;
