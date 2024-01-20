import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import the cart icon
import CartModal from './components/CartModal';
import {Button} from '@mui/material';
const drawerWidth = 240;



const NavigationList = [
  { path: "/dashboard", text: "Dashboard", accountTypes: [0, 1, 2] },
  { path: "/products", text: "Add Products", accountTypes: [1] },
  { path: "/allproducts", text: "Product List", accountTypes: [1] },
  { path: "/shop", text: "Shop", accountTypes: [2] },
  { path: "/category", text: "Category", accountTypes: [0] },
  { path: "/categorytype", text: "Category Type", accountTypes: [0] },
  { path: "/profile", text: "Profile", accountTypes: [1, 2] },
];

// Assuming window.AccountType is set before rendering the component







const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

let currentAccountType = 0;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Sidenav() {
  const showCartIcon = true;

   currentAccountType = window.AccountType;

  // Reset window.AccountType to null after 30 minutes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.AccountType = null;
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  if (currentAccountType == null) {
    currentAccountType = 0;
  }

   // Filter the items based on the current account type
   const visibleItems = NavigationList.filter(
    (item) => item.accountTypes.includes(currentAccountType)
  );
  //const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [subListOpen, setSubListOpen] = useState(false);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const [isCartModalOpen, setCartModalOpen] = useState(false);

const handleOpenCartMenu = () => {
  setCartModalOpen(true);
};

const handleCloseCartMenu = () => {
  setCartModalOpen(false);
};
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleToggleSubList = () => {
    setSubListOpen(!subListOpen);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor: "#1890ff"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(!open)}
            edge="start"
            sx={{
              marginRight: 2
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="img" alt="Mandi" src='/full-logo.png' sx={{ height: 50 }} />
          <Box sx={{flexGrow: 1}} />
          <Box>
            {/* Cart Icon */}
          {showCartIcon && (
            <Tooltip title="Open cart">
              <Button 
              onClick={handleOpenCartMenu} 
              sx={{ ml: 2, color: 'white' }}
              >
              Cart
            </Button>
            </Tooltip>
          )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <CartModal isOpen={isCartModalOpen} handleClose={() => setCartModalOpen(false)} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          {/* <IconButton onClick={()=>setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        
        <List>
            {visibleItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => navigate(item.path)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
      </Drawer>
    </Box>
  );
}