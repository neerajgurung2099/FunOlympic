import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const GameGroupToolbar = () => {
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
            "gamegroup/edit": "Edit",
            "gamegroup/new": "New",
            gamegroup: "Game Group",
          }}
        />
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          component={Link}
          to="/gamegroup/new"
          color="primary"
          variant="contained"
        >
          Add Group
        </Button>
      </Box>
    </Box>
  );
};

export default GameGroupToolbar;
