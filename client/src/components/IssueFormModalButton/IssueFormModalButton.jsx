import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import IssueForm from "../IssueForm/IssueForm";

const style = {
  p: 4,
  position: "absolute",
  height: "80vh",
  overflowX: "scroll",
  top: "50%",
  left: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  transform: "translate(-50%, -50%)",
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
      >
        Add Issue
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <IssueForm />
        </Box>
      </Modal>
    </>
  );
};

export default IssueFormModal;
