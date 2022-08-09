import React from "react";
import {
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { sidebarItems } from "./layout/sidebar/Sidebar";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const drawerWidth = 240;

const Sidebar = (props) => {
  const { window } = props;
  const [selected, setSelected] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const setTitle = React.useState(sidebarItems[0].title);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelect = (index, title) => {
    setSelected(index);
  };

  const drawer = (
    <Paper
      sx={{ height: "100vh", bottom: 0 }}
      style={{ maxHeight: "100vh", overflow: "auto" }}
    >
      <Divider />
      <List style={{ maxHeight: "100%", overflow: "auto" }}>
        {sidebarItems.map((sidebarItem, i) => (
          <Link
            to={sidebarItem.link}
            style={{
              textDecoration: "none",
              color: "#000000",
            }}
            key={`${sidebarItem.title}___`}
          >
            <ListItem
              selected={selected === i}
              onClick={() => handleSelect(i, sidebarItem.title)}
              key={sidebarItem.title}
              disablePadding
            >
              <ListItemButton
                sx={{ textDecoration: "none" }}
                style={{ borderRadius: "16px" }}
                color="action"
              >
                <ListItemIcon color="action">{sidebarItem.icon}</ListItemIcon>
                <ListItemText primary={sidebarItem.title} color="action" />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default Sidebar;
