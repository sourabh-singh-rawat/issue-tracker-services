/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { parseISO, formatDistance } from 'date-fns';

import MuiGrid from '@mui/material/Grid';
import MuiAvatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../../config/mui.config';

import DeleteCommentButton from '../../buttons/DeleteCommentButton';

function Comment({ id, issueId, name, description, photoUrl, createdAt }) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MuiGrid
      container
      sx={{
        padding: '8px 0',
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      }}
    >
      <MuiGrid item minWidth="45px">
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
      <MuiGrid item width="90%">
        <MuiGrid container>
          <MuiGrid item>
            <MuiGrid container spacing={1}>
              <MuiGrid item>
                <Link to="/profile" style={{ color: '#080F0F' }}>
                  <MuiTypography variant="body2" fontWeight={600}>
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
          <MuiGrid item xs={12}>
            <MuiGrid container>
              <MuiGrid item xs={12} sx={{ paddingTop: '4px' }}>
                <MuiTypography variant="body2">{description}</MuiTypography>
              </MuiGrid>
              <MuiGrid item xs={12}>
                <Breadcrumbs separator="•">
                  <MuiTypography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      ':hover': { cursor: 'pointer' },
                    }}
                  >
                    <a>Edit</a>
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
