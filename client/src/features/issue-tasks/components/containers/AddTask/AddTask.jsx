import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";

import MuiAddIcon from "@mui/icons-material/Add";

import { useCreateTaskMutation } from "../../../issue-tasks.api";

const AddTaskButton = styled(MuiButton)(({ theme }) => {
  return {
    color: theme.palette.text.secondary,
    textTransform: "none",
    textAlign: "left",
    justifyContent: "left",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  };
});

const FocusedAddTaskTextField = styled(MuiTextField)(({ theme }) => {
  return {
    "& input": { fontSize: "14px" },
  };
});

const AddTask = () => {
  const { id } = useParams();
  const [createTask] = useCreateTaskMutation();

  const [task, setTask] = useState({
    dueDate: formatISO(new Date()),
    description: "",
    selected: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCancel = (e) => {
    setTask({ ...task, selected: false });
  };

  const handleSave = () => {
    if (task.description.length > 0) {
      const { description, dueDate } = task;
      createTask({ issueId: id, description, dueDate, completed: false });
    }
    setTask({ ...task, selected: false });
  };

  return (
    <MuiGrid container sx={{ marginTop: 1 }}>
      {task.selected ? (
        <MuiGrid item xs={12}>
          <MuiGrid container>
            <MuiGrid item xs={12}>
              <FocusedAddTaskTextField
                size="small"
                name="description"
                placeholder="Add a Task"
                onChange={handleChange}
                autoFocus
                fullWidth
              />
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                onClick={handleSave}
                sx={{ backgroundColor: "primary.main" }}
              >
                <MuiTypography variant="body2">Save</MuiTypography>
              </MuiButton>
            </MuiGrid>
            <MuiGrid item>
              <MuiButton onClick={handleCancel}>
                <MuiTypography variant="body2">Cancel</MuiTypography>
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiGrid item xs={12}>
          <AddTaskButton
            onChange={handleChange}
            onClick={() => setTask({ ...task, selected: true })}
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
