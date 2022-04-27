import { useState } from "react";
import { Grid, Box, Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "400px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  height: "100%",
};

const ModalWindow = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Create
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Grid container sx={style}>
          <Grid item>{children}</Grid>
          <Grid item xs={12} paddingTop={"0.5em"}>
            <Button variant="outlined" onClick={handleClose} fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
};

export default ModalWindow;
