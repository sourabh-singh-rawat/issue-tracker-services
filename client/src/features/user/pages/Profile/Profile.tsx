import React from "react";
import Avatar from "../../../../common/components/Avatar";
import { useTheme } from "@mui/material";

export default function Profile() {
  const theme = useTheme();

  return (
    <div>
      <Avatar
        label="s"
        width={theme.spacing(8)}
        height={theme.spacing(8)}
        // fontSize={theme}
      />
    </div>
  );
}
