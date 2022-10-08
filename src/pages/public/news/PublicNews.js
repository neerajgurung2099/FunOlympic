import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import NewsList from "./NewsList";
import NewsDetail from "./NewsDetail";
const PublicNews = () => {
  return (
    <Box>
      <Box sx={{ mb: 5, mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          News
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <NewsList />
        </Grid>
      </Box>
    </Box>
  );
};

export default PublicNews;
