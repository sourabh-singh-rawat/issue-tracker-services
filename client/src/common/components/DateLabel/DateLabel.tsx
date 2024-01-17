import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import MuiChip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

interface DateLabelProps {
  dueDate: string;
}

export default function DateLabel({ dueDate }: DateLabelProps) {
  const theme = useTheme();

  return (
    <MuiChip
      component="span"
      label={dueDate ? dayjs(dueDate).fromNow() : "-"}
      size="small"
      sx={{ borderRadius: theme.shape.borderRadiusMedium }}
    />
  );
}
