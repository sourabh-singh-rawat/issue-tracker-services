import { useState, Fragment } from "react";

import MuiBox from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import MuiButton from "@mui/material/Button";
import MuiAddIcon from "@mui/icons-material/Add";

import IssueForm from "../IssueForm";

const AddIssue = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <MuiButton
        variant="contained"
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
        startIcon={<MuiAddIcon />}
      >
        Add Issue
      </MuiButton>
      <MuiModal
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiBackdrop-root": { backgroundColor: "rgba(9, 30, 66, 0.54)" },
        }}
      >
        <MuiBox
          sx={{
            p: 4,
            position: "absolute",
            height: "80vh",
            overflowX: "scroll",
            top: "50%",
            left: "50%",
            bgcolor: "background.paper",
            transform: "translate(-50%, -50%)",
            borderRadius: "6px",
            boxShadow: 24,
          }}
        >
          <IssueForm />
        </MuiBox>
      </MuiModal>
    </Fragment>
  );
};

export default AddIssue;
