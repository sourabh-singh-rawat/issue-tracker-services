/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React from 'react';
import { formatDistance, parseISO } from 'date-fns';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiAvatar from '@mui/material/Avatar';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../config/mui.config';

import DeleteCommentButton from '../DeleteCommentButton';

function Comment({ id, issueId, name, description, photoUrl, createdAt }) {
  return (
    <MuiGrid
      sx={{
        padding: '8px 0',
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      }}
      container
    >
      <MuiGrid minWidth="45px" item>
        <MuiAvatar
          src={photoUrl}
          sx={{
            width: '30px',
            height: '30px',
            marginLeft: '5px',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <MuiTypography variant="body2">
            {name.match(/\b(\w)/g)[0]}
          </MuiTypography>
        </MuiAvatar>
      </MuiGrid>
      <MuiGrid width="90%" item>
        <MuiGrid container>
          <MuiGrid item>
            <MuiGrid spacing={1} container>
              <MuiGrid item>
                <Link style={{ color: '#080F0F' }} to="/profile">
                  <MuiTypography fontWeight={600} variant="body2">
                    {name}
                  </MuiTypography>
                </Link>
              </MuiGrid>
              <MuiGrid item>
                <MuiTypography
                  sx={{ color: 'text.secondary', fontSize: '13px' }}
                >
                  {formatDistance(parseISO(createdAt), new Date(), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}
                </MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid xs={12} item>
            <MuiGrid container>
              <MuiGrid sx={{ paddingTop: '4px' }} xs={12} item>
                <MuiTypography variant="body2">{description}</MuiTypography>
              </MuiGrid>
              <MuiGrid xs={12} item>
                <Breadcrumbs separator="•">
                  <MuiTypography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      ':hover': { cursor: 'pointer' },
                    }}
                  >
                    Edit
                  </MuiTypography>
                  <DeleteCommentButton id={id} issue_id={issueId} />
                </Breadcrumbs>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
}

export default Comment;
