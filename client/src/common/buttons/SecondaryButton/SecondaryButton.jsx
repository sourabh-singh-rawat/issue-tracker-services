/* eslint-disable react/prop-types */
import MuiButton from '@mui/material/Button';
import theme from '../../../config/mui.config';

export default function SecondaryButton({ label, onClick }) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <MuiButton
      onClick={onClick}
      sx={{
        textTransform: 'none',
        backgroundColor: theme.palette.warning.main,
        borderRadius: '6px',
        color: 'white',
        ':hover': {
          backgroundColor: theme.palette.warning.dark,
          boxShadow: 4,
        },
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
}
