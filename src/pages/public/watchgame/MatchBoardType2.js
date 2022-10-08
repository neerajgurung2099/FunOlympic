import React from "react";

import { Grid, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const MatchBoardType2 = ({ participantList }) => {
  const participantColumn = [
    { field: "id", headerName: "Sno", width: 150 },
    { field: "participantname", headerName: "Participant Name", width: 800 },
    {
      field: "points",
      headerName: "Points",
      width: 150,
      type: "number",
    },
  ];

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          display: "flex !important",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ mb: 1 }}>Live Results</Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={participantList}
            columns={participantColumn}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Grid>
    </>
  );
};

export default MatchBoardType2;
