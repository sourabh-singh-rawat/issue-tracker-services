import React from "react";

import { styled } from "@mui/material/styles";
import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";

const StyledTooltip = styled(({ ...props }) => <MuiTooltip {...props} arrow />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }),
);

interface TooltipProps {
  title: string;
  placement: string;
  children: JSX.Element;
}

export default function Tooltip({ title, placement, children }: TooltipProps) {
  return (
    <StyledTooltip placement={placement} title={title}>
      <div style={{ cursor: "pointer" }}>{children}</div>
    </StyledTooltip>
  );
}
