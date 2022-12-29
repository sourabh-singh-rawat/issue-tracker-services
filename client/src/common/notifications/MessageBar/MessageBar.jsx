/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux';

import MuiSlide from '@mui/material/Slide';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiIconButton from '@mui/material/IconButton';
import MuiCloseIcon from '@mui/icons-material/Close';
import { setMessageBarOpen } from '../../../features/message-bar/slice/message-bar.slice';

function SlideTransition(props) {
  return <MuiSlide {...props} direction="up" />;
}

function MessageBar() {
  const dispatch = useDispatch();
  const messageBar = useSelector((store) => store.messageBar);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;
    dispatch(setMessageBarOpen(false));
  };

  const action = (
    <MuiIconButton
      color="inherit"
      size="small"
      onClick={() => dispatch(setMessageBarOpen(false))}
    >
      <MuiCloseIcon fontSize="small" />
    </MuiIconButton>
  );

  return (
    <MuiSnackbar
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={6000}
      message={messageBar.message}
      open={messageBar.open}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
    />
  );
}

export default MessageBar;
