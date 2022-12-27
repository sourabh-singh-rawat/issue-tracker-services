/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import MuiMenu from '@mui/material/Menu';
import MuiGrid from '@mui/material/Grid';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiIconButton from '@mui/material/IconButton';

import MuiAvatar from '@mui/material/Avatar';
import MuiLogoutIcon from '@mui/icons-material/Logout';
import MuiNotifications from '@mui/icons-material/Notifications';
import MuiAccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import MuiBugReportIcon from '@mui/icons-material/BugReport';

// eslint-disable-next-line import/named
import { logout } from '../../../utils/firebase/logout.util';
import theme from '../../../config/mui.config';

const AppBar = styled(MuiAppBar)(() => ({
  width: '100%',
  boxShadow: 1,
  zIndex: () => theme.zIndex.drawer + 1,
}));

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = useSelector((store) => store.auth);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
      <MuiToolbar
        sx={{
          backgroundColor: theme.palette.background.navbar,
          boxShadow:
            'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
        }}
        variant="dense"
      >
        <MuiGrid alignItems="center" columnSpacing={3} container>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: 'none',
              }}
              to="/"
            >
              <MuiTypography
                sx={{
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 600,
                  transitionDuration: '0.3s',
                  fontSize: '15px',
                }}
                variant="body2"
              >
                <MuiBugReportIcon sx={{ paddingRight: 1 }} />
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: 'none',
              }}
              to="/projects"
            >
              <MuiTypography
                sx={{
                  fontWeight: 600,
                  transitionDuration: '0.3s',
                  '&:hover': { color: theme.palette.primary.main },
                }}
                variant="body2"
              >
                Projects
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: 'none',
              }}
              to="/issues"
            >
              <MuiTypography
                sx={{
                  transitionDuration: '0.3s',
                  fontWeight: 600,
                  '&:hover': { color: theme.palette.primary.main },
                }}
                variant="body2"
              >
                Issues
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid item>
            <Link
              style={{
                color: theme.palette.common.white,
                textDecoration: 'none',
              }}
              to="/task"
            >
              <MuiTypography
                sx={{
                  fontWeight: 600,
                  transitionDuration: '0.3s',
                  '&:hover': { color: theme.palette.primary.main },
                }}
                variant="body2"
              >
                Tasks
              </MuiTypography>
            </Link>
          </MuiGrid>
          <MuiGrid flexGrow={1} item />
          <MuiGrid item>
            <MuiIconButton color="inherit">
              <MuiNotifications />
            </MuiIconButton>
          </MuiGrid>
          <MuiGrid item>
            <MuiIconButton color="inherit" onClick={handleMenu}>
              <MuiAvatar
                src={auth.user.photoURL}
                sx={{ width: '28px', height: '28px' }}
              >
                {auth.user.displayName.match(/\b(\w)/g)[0]}
              </MuiAvatar>
            </MuiIconButton>
            <MuiMenu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              onClose={handleClose}
            >
              <MuiMenuItem onClick={handleClose}>
                <MuiAccountBoxOutlinedIcon sx={{ fontSize: '18px' }} />
                <MuiTypography variant="body2">My Account</MuiTypography>
              </MuiMenuItem>
              <MuiMenuItem
                onClick={async () => {
                  handleClose();
                  await logout();
                  navigate('/login');
                }}
              >
                <MuiLogoutIcon sx={{ fontSize: '18px' }} />
                <MuiTypography variant="body2">Sign Out</MuiTypography>
              </MuiMenuItem>
            </MuiMenu>
          </MuiGrid>
        </MuiGrid>
      </MuiToolbar>
    </AppBar>
  );
}

export default Navbar;
