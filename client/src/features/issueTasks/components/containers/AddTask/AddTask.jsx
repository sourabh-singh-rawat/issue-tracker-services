import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiInputAdornment from "@mui/material/InputAdornment";

import MuiAddIcon from "@mui/icons-material/Add";

import { setLoadingTasks } from "../../../issueTasks.slice";
import { useCreateTaskMutation } from "../../../issueTask.api";

const AddTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
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
      dispatch(setLoadingTasks());
    }
    setTask({ ...task, selected: false });
  };

  return (
    <MuiGrid container columnSpacing={1}>
      {task.selected ? (
        <MuiGrid item xs={12}>
          <MuiGrid container>
            <MuiGrid item flexGrow={1}>
              <MuiTextField
                autoFocus
                fullWidth
                size="small"
                name="description"
                placeholder="Add a Task"
                onChange={handleChange}
                sx={{ input: { fontSize: "14px" } }}
                InputProps={{
                  startAdornment: (
                    <MuiInputAdornment position="start">
                      <MuiAddIcon />
                    </MuiInputAdornment>
                  ),
                }}
              />
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                onClick={handleSave}
                sx={{
                  color: "white",
                  height: "100%",
                  boxShadow: "none",
                  marginLeft: "8px",
                  textTransform: "none",
                  backgroundColor: "primary.main",
                  ":hover": {
                    boxShadow: "none",
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <MuiTypography variant="body2">Save</MuiTypography>
              </MuiButton>
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                sx={{
                  height: "100%",
                  boxShadow: "none",
                  marginLeft: "8px",
                  textTransform: "none",
                  ":hover": { boxShadow: "none" },
                }}
                onClick={handleCancel}
              >
                <MuiTypography variant="body2">Cancel</MuiTypography>
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiGrid item xs={12}>
          <MuiTextField
            size="small"
            name="description"
            placeholder="Add a Task"
            sx={{ input: { fontSize: "14px" } }}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <MuiInputAdornment position="start">
                  <MuiAddIcon />
                </MuiInputAdornment>
              ),
            }}
            onClick={() => setTask({ ...task, selected: true })}
            fullWidth
          />
        </MuiGrid>
      )}
    </MuiGrid>
  );
};

export default AddTask;
