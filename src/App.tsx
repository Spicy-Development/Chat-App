import * as React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ChatIcon from '@mui/icons-material/ChatOutlined';
import FriendIcon from '@mui/icons-material/PersonOutlined';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

let drawerWidth: number = 240;

export function Header(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <TextField variant="outlined" label="Search..." placeholder="Search for a command..." sx={{
            color: "#FFFFFF",
          }} />
          <Button
            sx={{
              color: "#FFFFFF",
            }}
          >
            <AccountIcon />
          </Button>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export function Sidebar(): JSX.Element {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key="Dashboard" disablePadding>
            <ListItemButton onClick={() => {pageName = "Dashboard"}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Chats" disablePadding>
            <ListItemButton onClick={() => {pageName = "Chats"}}>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Friends" disablePadding>
            <ListItemButton onClick={() => {pageName = "Friends"}}>
              <ListItemIcon>
                <FriendIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export function Breadcrumb(): JSX.Element {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Spicy Chat
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Dashboard</Typography>
      </Breadcrumbs>
    </div>
  );
}

export function AccountMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: "#FFFFFF",
        }}
      >
        Account
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Log In</MenuItem>
        <MenuItem onClick={handleClose}>Sign Up</MenuItem>
      </Menu>
    </div>
  );
}

const pageStyle = { flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px - 48px)`}, ml: { sm: `${drawerWidth}px`}, mt: { sm: `64px`}, overflowX: "hidden" };

export function Dashboard(): JSX.Element {
  return (
    <Box component="main" sx={pageStyle} className="page">
      <Typography variant="h4">Welcome to the Spicy Chat dashboard! Let's get you started!</Typography>
      First, you'll need an account. Use the button in the toolbar at the top of your screen to sign up.
    </Box>
  );
}

export function Chats(): JSX.Element {
  return (
    <Box component="main" sx={pageStyle} className="page">
      <Typography variant="h4">Nice Try...</Typography>
      First, you'll need an account. Use the button in the toolbar at the top of your screen to sign up.
    </Box>
  );
}

export function Friends(): JSX.Element {
  return (
    <Box component="main" sx={pageStyle} className="page">
      <Typography variant="h4">You have no friends... (Just Kidding!)</Typography>
      First, you'll need an account. Use the button in the toolbar at the top of your screen to sign up.
    </Box>
  );
}

let pageName: string = "Dashboard";

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Sidebar />
      {pageName === "Dashboard" ? <Dashboard /> : null}
      {pageName === "Chats" ? <Chats /> : null}
      {pageName === "Friends" ? <Friends /> : null}
    </>
  );
}