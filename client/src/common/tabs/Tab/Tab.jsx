/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import MuiTab from '@mui/material/Tab';

function Tab(props) {
  return (
    <MuiTab
      {...props}
      sx={{
        color: 'text.main',
        textTransform: 'none',
      }}
      disableRipple
    />
  );
}

export default Tab;
