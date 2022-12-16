import { styled } from "@mui/material/styles";
import MuiCheckbox from "@mui/material/Checkbox";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Checkbox = ({ checked, handleCheckBoxClick }) => {
  return (
    <MuiCheckbox
      checked={checked}
      onClick={handleCheckBoxClick}
      disableRipple
    />
  );
};

export default Checkbox;
