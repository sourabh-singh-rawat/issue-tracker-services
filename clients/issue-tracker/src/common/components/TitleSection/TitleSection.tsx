import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";

import Title from "../ItemName";

interface TitleSectionProps {
  isLoading: boolean;
}

export default function TitleSection({
  page,
  updateTitle,
  updateTitleQuery,
}: TitleSectionProps) {
  const theme = useTheme();
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item>
        <Title
          page={page}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
        />
      </MuiGrid>
    </MuiGrid>
  );
}
