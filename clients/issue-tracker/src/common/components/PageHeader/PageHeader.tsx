import React from "react";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import PrimaryButton from "../buttons/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  showButton?: React.ReactNode;
}

export default function PageHeader({ title, showButton = true }: Props) {
  const navigate = useNavigate();

  return (
    <MuiGrid container>
      <MuiGrid item flexGrow={1}>
        <MuiTypography variant="h4" fontWeight="bold">
          {title}
        </MuiTypography>
      </MuiGrid>

      {showButton && (
        <MuiGrid item>
          <PrimaryButton
            label="New List"
            type="button"
            startIcon={<AddIcon />}
            onClick={() => navigate("./new")}
          />
        </MuiGrid>
      )}
    </MuiGrid>
  );
}
