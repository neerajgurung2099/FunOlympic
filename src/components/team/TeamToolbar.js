import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const TeamToolbar = () => {
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
            "teams/edit": "Edit",
            "teams/new": "New",
            teams: "Teams",
          }}
        />
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          component={Link}
          to="/teams/new"
          color="primary"
          variant="contained"
        >
          Add Team
        </Button>
      </Box>
    </Box>
  );
};

export default TeamToolbar;
