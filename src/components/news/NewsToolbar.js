import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const NewsToolbar = () => {
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
            "news/edit": "Edit",
            "news/new": "New",
            news: "News",
          }}
        />
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          component={Link}
          to="/news/new"
          color="primary"
          variant="contained"
        >
          Add News
        </Button>
      </Box>
    </Box>
  );
};

export default NewsToolbar;
