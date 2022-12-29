/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import MuiButton from '@mui/material/Button';
import MuiAddIcon from '@mui/icons-material/Add';

export default function PrimaryButton({ type, label, onClick }) {
  return (
    <MuiButton
      startIcon={type === 'submit' ? null : <MuiAddIcon />}
      sx={{
        fontWeight: 600,
        borderRadius: '6px',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      }}
      type={type}
      variant="contained"
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}
