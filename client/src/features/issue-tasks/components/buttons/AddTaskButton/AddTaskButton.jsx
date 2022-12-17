import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import TaskForm from "../../forms/TaskForm";

import MuiAddIcon from "@mui/icons-material/Add";

const AddTaskButton = styled(MuiButton)(({ theme }) => {
  return {
    color: theme.palette.text.secondary,
    textTransform: "none",
    textAlign: "left",
    justifyContent: "left",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  };
});

const AddTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <MuiGrid container>
      {open ? (
        <TaskForm setOpen={setOpen} />
      ) : (
        <MuiGrid item xs={12}>
          <AddTaskButton
            onClick={() => setOpen(true)}
            startIcon={<MuiAddIcon />}
            fullWidth
            disableRipple
          >
            <MuiTypography variant="body2">Add a Task</MuiTypography>
          </AddTaskButton>
        </MuiGrid>
      )}
    </MuiGrid>
  );
};

export default AddTask;
