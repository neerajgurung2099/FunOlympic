import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const CountryToolbar = () => {
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
            "country/edit": "Edit",
            "country/new": "New",
            country: "Country",
          }}
        />
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          component={Link}
          to="/country/new"
          color="primary"
          variant="contained"
        >
          Add Country
        </Button>
      </Box>
    </Box>
  );
};

export default CountryToolbar;
