import React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DomainsIcon from "@mui/icons-material/Email";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import GroupIcon from "@mui/icons-material/Group";
import AdminIcon from "@mui/icons-material/VerifiedUserTwoTone";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#f9f9f9",
    width: "100%",
    padding: theme.spacing(3),
  },
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: "#f4f4f4",
  },
  title: {
    padding: theme.spacing(2),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  date: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  avatar: {
    cursor: "pointer",
    background: "#FFF",
    marginLeft: theme.spacing(2),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard color="secondary" />,
      path: "/admin/app",
    },
    {
      text: "Utilisateurs",
      icon: <Group color="secondary" />,
      path: "/admin/users",
    },
    {
      text: "Pré-inscrits",
      icon: <Group color="secondary" />,
      path: "/admin/pre-users",
    },
    {
      text: "Domaines valides (email)",
      icon: <DomainSharp color="secondary" />,
      path: "/admin/available-domains",
    },
    {
      text: "Administrateurs",
      icon: <AdminPanelSettings color="secondary" />,
      path: "/admin/admin-list",
    },
    {
      text: "Annonces",
      icon: <Forum color="secondary" />,
      path: "/admin/message",
    },
    {
      text: "Mon profil",
      icon: <Settings color="secondary" />,
      path: "/admin/my-profile",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Le {format(new Date(), "do MMMM Y", { locale: fr })}
          </Typography>
          <Typography component={Box} fontWeight="fontWeightBold">
            {user.email}
          </Typography>
          <Avatar
            className={classes.avatar}
            onClick={() => firebase.auth().signOut()}
          >
            <ExitToAppIcon color="primary" />
          </Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Kongossa Admin
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
}
