import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import EditTaskButton from "../EditTaskButton";
import DeleteTaskButton from "../DeleteTaskButton";
import DateLabel from "../../../../common/components/DateLabel";
import Checkbox from "../../../../common/components/Checkbox";
import TextField from "../../../../common/components/styled/StyledTextField";

import { useTheme } from "@mui/material";

function Task({ taskId, dueDate, description, completed }) {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    taskId,
    dueDate,
    description,
    completed,
  });

  // const [deleteTask] = useDeleteTaskMutation();
  // const [updateTask, { isSuccess }] = useUpdateTaskMutation();

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

  const handleSave = () => {
    if (description !== task.description) {
      updateTask({
        id,
        taskId,
        body: { description: task.description },
      });
    }
    setEditMode(false);
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     // dispatch(setMessageBarOpen(true));
  //   }
  // }, [isSuccess]);

  return (
    <MuiGrid
      sx={{
        cursor: "pointer",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadiusNone,
        ":hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
      container
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <MuiGrid item>
        <Checkbox
          checked={task.completed}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      </MuiGrid>
      <MuiGrid sx={{ flexGrow: 1 }} item>
        {editMode ? (
          <MuiGrid container>
            <MuiGrid flexGrow={1} item>
              <TextField
                name="description"
                size="small"
                value={task.description}
                variant="standard"
                autoFocus
                fullWidth
                onChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid item>
              <MuiButton
                sx={{
                  color: "white",
                  height: "100%",
                  boxShadow: "none",
                  marginLeft: "8px",
                  textTransform: "none",
                  backgroundColor: theme.palette.primary.main,
                  ":hover": {
                    boxShadow: "none",
                    backgroundColor: theme.palette.primary[700],
                  },
                }}
                onClick={handleSave}
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
        ) : (
          <MuiGrid columnSpacing={1} sx={{ alignItems: "center" }} container>
            <MuiGrid item>
              <MuiTypography
                sx={{
                  color: task.completed && theme.palette.grey[500],
                  textDecoration: task.completed && "line-through",
                }}
                variant="body2"
              >
                {task.description}
              </MuiTypography>
            </MuiGrid>
            <MuiGrid flexGrow={1} item>
              <MuiTypography
                sx={{
                  color: task.completed && theme.palette.grey[500],
                  textDecoration: task.completed && "line-through",
                }}
                variant="body2"
              >
                <DateLabel dueDate={dueDate} />
              </MuiTypography>
            </MuiGrid>
            <MuiGrid sx={{ display: show ? "block" : "none" }} item>
              <EditTaskButton onClick={() => setEditMode(true)} />
            </MuiGrid>
            <MuiGrid sx={{ display: show ? "block" : "none" }} item>
              <DeleteTaskButton onClick={() => deleteTask({ id, taskId })} />
            </MuiGrid>
          </MuiGrid>
        )}
      </MuiGrid>
    </MuiGrid>
  );
}

export default Task;
