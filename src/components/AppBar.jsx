import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Dashboard } from "@mui/icons-material";
import { Group } from "@mui/icons-material";
import { DomainSharp } from "@mui/icons-material";
import { AdminPanelSettings } from "@mui/icons-material";
import { Forum } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import img from "../assets/img/logo-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ExitToApp } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { format } from "date-fns";
import { formatDate } from "../functions/formatDate";
import { useFirebaseAuthContext } from "../context/AuthContext";
import { auth } from "../Firebase";
import { Button } from "@mui/material";

const drawerWidth = 240;

function AppBarResponsive({ children, connect }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useFirebaseAuthContext();

  const logout = () => {
    auth.signOut();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const locate = useLocation();

  const menuItems = [
    {
      text: "Liste des université",
      icon: <Dashboard color="secondary" />,
      path: "/admin",
    },
    {
      text: "Creer un université",
      icon: <Dashboard color="secondary" />,
      path: "/admin/createuniversity",
    },
    /* {
      text: "Ajouter une faculté",
      icon: <Dashboard color="secondary" />,
      path: "/admin/createfaculty",
    },
    {
      text: "Ajouter un filière",
      icon: <Dashboard color="secondary" />,
      path: "/admin/createfiliary",
    }, */
    {
      text: "Ajouter un critere",
      icon: <Dashboard color="secondary" />,
      path: "/admin/createcritere",
    },
  ];
  const drawer = (
    <div>
      <Box sx={{ m: 2 }}>
        <Typography variant="h4" position={"center"}>
          <center>
            <img src={img} style={{ height: 60 }} />
          </center>
        </Typography>
      </Box>
      <List>
        <Divider textAlign="left" sx={{ m: 2 }}>
          Universités
        </Divider>
        {menuItems.map((element, index) => (
          <>
            <ListItem
              key={index}
              disablePadding
              onClick={() => navigate(element.path)}
              sx={
                locate.pathname === element.path
                  ? { background: "#f4f4f4" }
                  : { fontFamily: "Poppins" }
              }
            >
              <ListItemButton>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText secondary={element.text} />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );

  var date = new Date();
  console.log(date);
  return (
    <Box
      sx={{
        display: connect != null ? "flex" : "none",
        backgroundColor: "rgba(0,0,0,0.01)",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth + 2}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="primary"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>
            {" "}
            {format(new Date(), "EEEE do MMMM yyyy", "french")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mr: 5 }}>
            <Avatar sx={{ mr: 2, height: 25, width: 25 }} />
            <Typography component={Box} fontWeight="fontWeightBold">
              {user ? user.email : "address Gmail"}
            </Typography>
          </Box>
          <Button onClick={() => logout()}>
            <Avatar
              sx={{
                cursor: "pointer",
                background: "#FFF",
              }}
            >
              <ExitToApp color="secondary" />
            </Avatar>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
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
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default AppBarResponsive;
