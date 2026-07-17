import React from "react";

import { styled } from "@mui/material/styles";
import MuiTooltip, {
  tooltipClasses,
  TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";

const StyledTooltip = styled(
  ({ className, ...props }: MuiTooltipProps) => (
    <MuiTooltip {...props} arrow classes={{ popper: className }} />
  ),
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface TooltipProps {
  title: string;
  placement?: MuiTooltipProps["placement"];
  children: React.JSX.Element;
}

export default function Tooltip({
  title,
  placement = "bottom",
  children,
}: TooltipProps) {
  return (
    <StyledTooltip placement={placement} title={title}>
      <div style={{ cursor: "pointer" }}>{children}</div>
    </StyledTooltip>
  );
}
