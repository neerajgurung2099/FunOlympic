import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const DashboardLayout = (PageComponent) => {
  class NewComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        mobileOpen: false,
      };
    }

    handleDrawerToggle = () => {
      this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
      const { mobileOpen } = this.state;
      return (
        <Box sx={{ display: "flex" }}>
          <Navbar
            drawerWidth={drawerWidth}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <Sidebar
            mobileOpen={mobileOpen}
            drawerWidth={drawerWidth}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <PageComponent />
          </Box>
        </Box>
      );
    }
  }
  return NewComponent;
};

export default DashboardLayout;
