import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// services
import { isEmpty } from 'lodash';
import { accessTokenSelector } from '../../selectors';
import { logout } from '../../ducks/auth';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const accessToken = useSelector(accessTokenSelector);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const language = isEnglish ? 'en' : 'hi';
    i18n.changeLanguage(language);
  }, [i18n, isEnglish]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLanguageChange = (event) => {
    setIsEnglish(event.target.checked);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <FontAwesomeIcon icon="fa-solid fa-ranking-star" />
        RankIQ
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {!isEmpty(accessToken) ? (
            <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              <ListItemText>Login</ListItemText>
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <AppBar component="nav">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            display="flex"
            sx={{ display: 'flex', alignItems: 'center', columnGap: '0.25rem' }}
          >
            <FontAwesomeIcon icon="fa-solid fa-ranking-star" size="lg" />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: 'block' }}
            >
              RankIQ
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Stack direction="row" alignItems="center">
              <Typography>Hindi</Typography>
              <Switch
                color="default"
                value={isEnglish}
                onChange={handleLanguageChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography>English</Typography>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Stack direction="row" alignItems="center" sx={{ mr: '10px' }}>
              <Typography>Hindi</Typography>
              <Switch
                color="default"
                value={isEnglish}
                onChange={handleLanguageChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography>English</Typography>
            </Stack>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
            {!isEmpty(accessToken) && (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      console.log('open user profile');
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default NavBar;
