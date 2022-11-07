import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiTypography from "@mui/material/Typography";
import MuiEditIcon from "@mui/icons-material/Edit";

import TextField from "../../../../../common/TextField";

import { setSnackbarOpen } from "../../../../snackbar.reducer";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../../issue-tasks.api";
import Checkbox from "../../../../../common/Checkbox";

const Task = ({ taskId, due_date, description, completed }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask, { isSuccess, data }] = useUpdateTaskMutation();
  const [task, setTask] = useState({
    taskId,
    due_date,
    description,
    completed,
  });

  const handleCancel = () => setEditMode(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCheckBoxClick = () => {
    updateTask({
      id,
      taskId,
      body: { ...task, completed: !task.completed },
    });
    setTask({ ...task, completed: !task.completed });
  };

  const handleSave = (e) => {
    if (description !== task.description) {
      updateTask({
        id,
        taskId,
        body: { description: task.description },
      });
    }
    setEditMode(false);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSnackbarOpen(true));
    }
  }, [isSuccess, data]);

  return (
    <MuiGrid
      container
      sx={{
        cursor: "pointer",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        transitionDuration: "250ms",
        ":hover": { boxShadow: 4, backgroundColor: "action.hover" },
      }}
    >
      <MuiGrid item>
        <Checkbox task={task} handleCheckBoxClick={handleCheckBoxClick} />
      </MuiGrid>
      <MuiGrid item sx={{ flexGrow: 1 }}>
        {editMode ? (
          <MuiGrid container>
            <MuiGrid item flexGrow={1}>
              <TextField
                name="description"
                size="small"
                value={task.description}
                onChange={handleChange}
                autoFocus
                fullWidth
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
                onClick={handleCancel}
                sx={{
                  height: "100%",
                  boxShadow: "none",
                  marginLeft: "8px",
                  textTransform: "none",
                  ":hover": { boxShadow: "none" },
                }}
              >
                <MuiTypography variant="body2">Cancel</MuiTypography>
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        ) : (
          <MuiGrid container sx={{ alignItems: "center" }}>
            <MuiGrid item flexGrow={1}>
              <MuiTypography
                variant="body2"
                sx={{
                  color: task.completed && theme.palette.grey[500],
                  textDecoration: task.completed && "line-through",
                }}
              >
                {task.description}
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                sx={{
                  color: "text.primary",
                  ":hover": { color: "primary.main" },
                }}
                onClick={() => setEditMode(true)}
                disableRipple
              >
                <MuiEditIcon />
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

export default Task;
