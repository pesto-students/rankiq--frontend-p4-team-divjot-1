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
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled } from '@mui/material/styles';
// services
import { isEmpty } from 'lodash';
import { accessTokenSelector } from '../../selectors';
import { logout } from '../../ducks/auth';
import { ROUTES } from '../../constants';

const drawerWidth = 240;

const { LOGIN, SIGNUP, DASHBOARD, FAQS, USER_HISTORY, CONTACT_US } = ROUTES;

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const StyledListItemButton = styled(ListItemButton)`
  text-align: center;
`;

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
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
        <StyledListItemButton
          onClick={() => {
            navigate(DASHBOARD);
          }}
        >
          <ListItemText>{t('generic.dashboard')}</ListItemText>
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            navigate(FAQS);
          }}
        >
          <ListItemText>{t('generic.faqs')}</ListItemText>
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            navigate(CONTACT_US);
          }}
        >
          <ListItemText>{t('generic.contact')}</ListItemText>
        </StyledListItemButton>
        {!isEmpty(accessToken) && (
          <>
            <StyledListItemButton
              onClick={() => {
                navigate(USER_HISTORY);
              }}
            >
              <ListItemText>{t('generic.history')}</ListItemText>
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                navigate(USER_HISTORY);
              }}
            >
              <ListItemText>{t('generic.account')}</ListItemText>
            </StyledListItemButton>
          </>
        )}
        <ListItem disablePadding>
          {!isEmpty(accessToken) ? (
            <StyledListItemButton onClick={handleLogout}>
              <ListItemText>{t('generic.logout')}</ListItemText>
            </StyledListItemButton>
          ) : (
            <StyledListItemButton
              onClick={() => {
                navigate(LOGIN);
              }}
            >
              <ListItemText>{t('generic.login')}</ListItemText>
            </StyledListItemButton>
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
            onClick={() => {
              navigate('/');
            }}
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
              <Typography>{t('languages.hi')}</Typography>
              <Switch
                color="default"
                value={isEnglish}
                defaultChecked
                onChange={handleLanguageChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography>{t('languages.en')}</Typography>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Stack direction="row" alignItems="center" sx={{ mr: '10px' }}>
              <Typography>{t('languages.hi')}</Typography>
              <Switch
                color="default"
                value={isEnglish}
                defaultChecked
                onChange={handleLanguageChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography>{t('languages.en')}</Typography>
            </Stack>
            <NavButton
              onClick={() => {
                navigate(DASHBOARD);
              }}
            >
              {t('generic.dashboard')}
            </NavButton>
            <NavButton
              onClick={() => {
                navigate(FAQS);
              }}
            >
              {t('generic.faqs')}
            </NavButton>
            <NavButton
              onClick={() => {
                navigate(CONTACT_US);
              }}
            >
              {t('generic.contact')}
            </NavButton>
            {isEmpty(accessToken) && (
              <>
                <NavButton
                  onClick={() => {
                    navigate(LOGIN);
                  }}
                >
                  {t('generic.login')}
                </NavButton>
                <NavButton
                  onClick={() => {
                    navigate(SIGNUP);
                  }}
                >
                  {t('generic.signup')}
                </NavButton>
              </>
            )}

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
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate(USER_HISTORY);
                    }}
                  >
                    <Avatar /> {t('generic.history')}
                  </MenuItem>
                  <MenuItem>
                    <Avatar /> {t('generic.account')}
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('generic.logout')}
                  </MenuItem>
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
