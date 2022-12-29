/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import MuiCircularProgress from '@mui/material/CircularProgress';
import MuiButton from '@mui/material/Button';

function UploadButton({ label, onClick, open }) {
  return (
    <MuiButton
      endIcon={
        open && <MuiCircularProgress size={20} sx={{ color: 'white' }} />
      }
      sx={{
        fontWeight: 600,
        borderRadius: '6px',
        textTransform: 'none',
      }}
      variant="contained"
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}

export default UploadButton;
