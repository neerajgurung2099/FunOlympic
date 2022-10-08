import React from "react";

import { Grid, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const MatchBoardType2 = ({ participantList, columnSize }) => {
  const participantColumn = [
    { field: "id", headerName: "Sno", width: columnSize.id },
    {
      field: "participantname",
      headerName: "Participant Name",
      width: columnSize.name,
    },
    {
      field: "points",
      headerName: "Points",
      width: columnSize.point,
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
