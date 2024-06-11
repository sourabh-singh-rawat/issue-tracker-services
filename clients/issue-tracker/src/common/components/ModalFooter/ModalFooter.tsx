import React from "react";

import MuiGrid from "@mui/material/Grid";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../SecondaryButton";

interface ModalFooterProps {
  handleClose: () => void;
}

export default function ModalFooter({ handleClose }: ModalFooterProps) {
  return (
    <MuiGrid
      container
      sx={{ mt: 2, flexDirection: "row-reverse" }}
      columnSpacing={1}
    >
      <MuiGrid item>
        <PrimaryButton type="submit" label="Create" />
      </MuiGrid>
      <MuiGrid item>
        <SecondaryButton label="Cancel" onClick={handleClose} />
      </MuiGrid>
    </MuiGrid>
  );
}
