import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const PlayerToolbar = () => {
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
            "players/edit": "Edit",
            "players/new": "New",
            players: "Players",
          }}
        />
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          component={Link}
          to="/players/new"
          color="primary"
          variant="contained"
        >
          Add Player
        </Button>
      </Box>
    </Box>
  );
};

export default PlayerToolbar;
