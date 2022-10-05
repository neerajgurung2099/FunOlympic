import DashboardLayout from "../../components/dashboard-layout";
import UserToolBar from "../../components/user/UserToolBar";
import { Box } from "@mui/material";
const User = () => {
  return (
    <Box>
      <UserToolBar />
    </Box>
  );
};

export default DashboardLayout(User);
