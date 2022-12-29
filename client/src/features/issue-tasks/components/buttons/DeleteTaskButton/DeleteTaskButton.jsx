/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../../../config/mui.config';

function DeleteTaskButton({ onClick }) {
  return (
    <MuiIconButton
      size="small"
      sx={{
        color: theme.palette.grey[400],
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        ':hover': {
          color: theme.palette.grey[600],
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      }}
      variant="text"
      onClick={onClick}
    >
      <MuiDeleteIcon />
    </MuiIconButton>
  );
}

export default DeleteTaskButton;
