import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import IssueForm from "../IssueForm/IssueForm";
import { Add } from "@mui/icons-material";

const style = {
  p: 4,
  position: "absolute",
  height: "80vh",
  overflowX: "scroll",
  top: "50%",
  left: "50%",
  bgcolor: "background.paper",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  boxShadow: 24,
};

const IssueFormModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
        startIcon={<Add />}
      >
        Add Issue
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiBackdrop-root": {
            backgroundColor: "rgba(9, 30, 66, 0.54)",
          },
        }}
      >
        <Box sx={{ ...style }}>
          <IssueForm />
        </Box>
      </Modal>
    </>
  );
};

export default IssueFormModal;
