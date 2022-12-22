/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import MuiButton from '@mui/material/Button';

function SaveButton({ label, onClick }) {
  return (
    <MuiButton
      onClick={onClick}
      variant="contained"
      sx={{
        height: '100%',
        textTransform: 'none',
        borderRadius: '6px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      }}
      disableRipple
    >
      {label}
    </MuiButton>
  );
}

export default SaveButton;
