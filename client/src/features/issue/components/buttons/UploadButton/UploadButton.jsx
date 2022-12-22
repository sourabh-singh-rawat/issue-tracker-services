/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import MuiCircularProgress from '@mui/material/CircularProgress';
import MuiButton from '@mui/material/Button';

function UploadButton({ label, onClick, open }) {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      sx={{
        fontWeight: 600,
        borderRadius: '6px',
        textTransform: 'none',
      }}
      endIcon={
        open && <MuiCircularProgress size={20} sx={{ color: 'white' }} />
      }
      disableRipple
    >
      {label}
    </MuiButton>
  );
}

export default UploadButton;
