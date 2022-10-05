import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SportsIcon from "@mui/icons-material/Sports";
const SideBarNavList = [
  { id: "dashboard", title: "Dashboard", route: "/", icon: <DashboardIcon /> },
  { id: "user", title: "User", route: "/user", icon: <GroupIcon /> },
  {
    id: "gameGroup",
    title: "Game Group",
    route: "/gamegroup",
    icon: <GroupIcon />,
  },
  { id: "game", title: "Game", route: "/game", icon: <SportsBasketballIcon /> },

  {
    id: "matches",
    title: "Matches",
    route: "/matches",
    icon: <SportsIcon />,
  },
  {
    id: "result",
    title: "Results",
    route: "/results",
    icon: <LeaderboardIcon />,
  },
  {
    id: "gallery",
    title: "Gallery",
    route: "/gallery",
    icon: <CollectionsIcon />,
  },
  { id: "news", title: "News", route: "/news", icon: <NewspaperIcon /> },
];

function Sidebar(props) {
  const { handleDrawerToggle, drawerWidth, mobileOpen, window } = props;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {SideBarNavList.map((list) => (
          <ListItem
            component={NavLink}
            to={list.route}
            key={list.id}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
