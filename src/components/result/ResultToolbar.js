import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const ResultToolbar = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
        mb: 1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        <BreadCrumb
          breadcrumbNameMap={{
            "results/edit": "Edit",
            "results/new": "New",
            results: "Results",
          }}
        />
      </Typography>
    </Box>
  );
};

export default ResultToolbar;
