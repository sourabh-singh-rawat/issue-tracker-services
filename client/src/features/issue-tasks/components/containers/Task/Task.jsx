import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import EditTaskButton from "../../buttons/EditTaskButton";
import DeleteTaskButton from "../../buttons/DeleteTaskButton";
import DateLabel from "../../../../../common/tags/DateLabel";
import Checkbox from "../../../../../common/utilities/Checkbox";
import TextField from "../../../../../common/textfields/TextField";

import { setMessageBarOpen } from "../../../../message-bar/slice/message-bar.slice";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../../api/issue-tasks.api";

const Task = ({ taskId, dueDate, description, completed }) => {
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

  const [deleteTask, deleteTaskQuery] = useDeleteTaskMutation();
  const [updateTask, { isSuccess, data }] = useUpdateTaskMutation();

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
      dispatch(setMessageBarOpen(true));
    }
  }, [isSuccess]);

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
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <MuiGrid item>
        <Checkbox
          checked={task.completed}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      </MuiGrid>
      <MuiGrid item sx={{ flexGrow: 1 }}>
        {editMode ? (
          <MuiGrid container>
            <MuiGrid item flexGrow={1}>
              <TextField
                name="description"
                size="small"
                variant="standard"
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
          <MuiGrid container sx={{ alignItems: "center" }} columnSpacing={1}>
            <MuiGrid item>
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
            <MuiGrid item flexGrow={1}>
              <MuiTypography
                variant="body2"
                sx={{
                  color: task.completed && theme.palette.grey[500],
                  textDecoration: task.completed && "line-through",
                }}
              >
                <DateLabel dueDate={dueDate} />
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item sx={{ display: show ? "block" : "none" }}>
              <EditTaskButton onClick={() => setEditMode(true)} />
            </MuiGrid>
            <MuiGrid item sx={{ display: show ? "block" : "none" }}>
              <DeleteTaskButton onClick={() => deleteTask({ id, taskId })} />
            </MuiGrid>
          </MuiGrid>
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

export default Task;
