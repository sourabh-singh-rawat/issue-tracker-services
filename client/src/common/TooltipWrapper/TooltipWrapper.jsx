import { styled } from "@mui/material/styles";
import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";

const StyledTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "13px",
    fontWeight: 600,
  },
}));

const TooltipWrapper = ({ title, placement, children }) => {
  return (
    <StyledTooltip title={title} placement={placement}>
      <div>{children}</div>
    </StyledTooltip>
  );
};

export default TooltipWrapper;
