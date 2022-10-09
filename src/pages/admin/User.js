import DashboardLayout from "../../components/dashboard-layout";
import UserToolBar from "../../components/user/UserToolBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const User = () => {
  return (
    <Box>
      <UserToolBar />
      <Outlet />
    </Box>
  );
};

export default DashboardLayout(User);
