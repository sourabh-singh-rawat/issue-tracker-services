import { styled } from "@mui/material/styles";
import MuiCheckbox from "@mui/material/Checkbox";

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => {
  return {
    "&.MuiCheckbox-root": {},
  };
});

const Checkbox = ({ task, handleCheckBoxClick }) => {
  return (
    <StyledCheckbox
      checked={task.completed}
      onClick={handleCheckBoxClick}
      disableRipple
    />
  );
};

export default Checkbox;
