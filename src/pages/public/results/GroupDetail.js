import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const GroupDetail = ({ GameTitle, GameDescription }) => {
  return (
    <Stack justifyContent="center">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {GameTitle}
      </Typography>
      <Typography>{GameDescription}</Typography>
    </Stack>
  );
};

export default GroupDetail;
