import { useState } from "react";
import { Grid, Box, Button, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalWindow = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
        Create
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {children}
          <Grid container paddingTop={"0.5em"}>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleClose} fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalWindow;
