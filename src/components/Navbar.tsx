import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import { useAppDispatch } from "../app/store";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;
  const navItems = [
    { display: "Homepage", onClick: () => navigate("/") },
    { display: "Add Meter", onClick: () => navigate("/add-meter") },
    { display: "Logout", onClick: () => dispatch(logout()) },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: drawerWidth }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Energy Stats
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.display} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={item.onClick}>
              <ListItemText primary={item.display} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open-drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Energy Stats
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.display}
                sx={{ color: "#fff" }}
                onClick={item.onClick}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "&.MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
