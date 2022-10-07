import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const GalleryToolbar = () => {
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
            "gallery/edit": "Edit",
            "gallery/new": "New",
            gallery: "Gallery",
          }}
        />
      </Typography>
    </Box>
  );
};

export default GalleryToolbar;
