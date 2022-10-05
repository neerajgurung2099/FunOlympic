import BreadCrumb from "../common/BreadCrumb";
import { Box, Button, Typography } from "@mui/material";
const UserToolBar = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        <BreadCrumb
          initial={{
            title: "User",
            link: "/user",
          }}
          breadcrumbNameMap={{
            "/edit": "Edit",
          }}
        />
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button color="primary" variant="contained">
          Add Customers
        </Button>
      </Box>
    </Box>
  );
};

export default UserToolBar;
