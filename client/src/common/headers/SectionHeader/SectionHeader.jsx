/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

function SectionHeader({ title, subtitle, actionButton, noButton }) {
  return (
    <MuiGrid container>
      <MuiGrid sx={{ display: 'flex' }} xs={12} item>
        <MuiTypography
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
          variant="h4"
        >
          {title}
        </MuiTypography>
        {actionButton}
      </MuiGrid>
      <MuiGrid sx={{ paddingTop: noButton && '7px' }} item>
        <MuiTypography sx={{ color: 'text.primary' }} variant="body2">
          {subtitle}
        </MuiTypography>
      </MuiGrid>
    </MuiGrid>
  );
}

export default SectionHeader;
