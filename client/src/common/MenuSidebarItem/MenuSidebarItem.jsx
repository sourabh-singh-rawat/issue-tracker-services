/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React from 'react';

import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiTypography from '@mui/material/Typography';
import theme from '../../config/mui.config';

import TooltipWrapper from '../Tooltip';

function MenuSidebarItem({ open, text, icon, href }) {
  const listItemTypographyStyles = {
    opacity: open ? 1 : 0,
    fontWeight: 600,
  };

  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 1.5 : 'auto',
    color: theme.palette.grey[800],
  };

  const listItemButtonStyles = {
    px: (open && 2.5) || (!open && 2.5),
    height: '40px',
  };

  const listLinkStyles = {
    color: theme.palette.grey[900],
    textDecoration: 'none',
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MuiListItem
      sx={{
        display: 'block',
        // backgroundColor: active && "red",
      }}
      disablePadding
    >
      <Link style={listLinkStyles} to={href}>
        {open ? (
          <MuiListItemButton sx={listItemButtonStyles} disableRipple>
            <MuiListItemIcon sx={listItemIconStyles}>{icon}</MuiListItemIcon>
            <MuiTypography sx={listItemTypographyStyles} variant="body2">
              {text}
            </MuiTypography>
          </MuiListItemButton>
        ) : (
          <TooltipWrapper placement="left" title={text}>
            <MuiListItemButton sx={listItemButtonStyles} disableRipple>
              <MuiListItemIcon sx={listItemIconStyles}>{icon}</MuiListItemIcon>
              <MuiTypography sx={listItemTypographyStyles} variant="body2">
                {text}
              </MuiTypography>
            </MuiListItemButton>
          </TooltipWrapper>
        )}
      </Link>
    </MuiListItem>
  );
}

export default MenuSidebarItem;
