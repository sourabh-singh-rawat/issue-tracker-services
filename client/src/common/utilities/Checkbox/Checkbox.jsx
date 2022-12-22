/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import MuiCheckbox from '@mui/material/Checkbox';

function Checkbox({ checked, handleCheckBoxClick }) {
  return (
    <MuiCheckbox
      checked={checked}
      onClick={handleCheckBoxClick}
      disableRipple
    />
  );
}

export default Checkbox;
