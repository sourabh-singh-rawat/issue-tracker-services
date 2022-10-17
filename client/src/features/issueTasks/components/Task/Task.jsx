import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiTypography from "@mui/material/Typography";
import MuiEditIcon from "@mui/icons-material/Edit";

import TextField from "../../../../common/TextField";

import {
  useUpdateIssueTaskMutation,
  useDeleteIssueTaskMutation,
} from "../../issueTask.api";

const Task = ({ taskId, due_date, description, completed }) => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [deleteTaskMutation] = useDeleteIssueTaskMutation();
  const [updateTaskMutation] = useUpdateIssueTaskMutation();
  const [task, setTask] = useState({
    taskId,
    due_date,
    description,
    completed,
  });

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTask({ ...task, description: value });
  };

  const handleSave = (e) => {
    if (description !== task.description) {
      updateTaskMutation({
        id,
        taskId,
        body: { description: task.description },
      });
    }
    setEditMode(false);
  };

  return (
    <MuiGrid
      container
      sx={{
        cursor: "pointer",
        alignItems: "center",
        border: "1px solid #E3E4E6",
        borderRadius: "4px",
        transitionDuration: "250ms",
        ":hover": {
          backgroundColor: "action.hover",
          boxShadow: 4,
        },
      }}
    >
      <MuiGrid item>
        <MuiCheckbox disableRipple checked={task.completed} />
      </MuiGrid>
      <MuiGrid item sx={{ flexGrow: 1 }}>
        {editMode ? (
          <MuiGrid container>
            <MuiGrid item flexGrow={1}>
              <TextField
                fullWidth
                autoFocus
                size="small"
                value={task.description}
                onChange={handleChange}
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
                sx={{ textDecoration: completed && "line-through" }}
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
                onClick={() => {
                  setEditMode(true);
                }}
                disableRipple
              >
                <MuiEditIcon />
              </MuiButton>
            </MuiGrid>
            {/* <MuiGrid item>
              <DatePicker value={format(parseISO(due_date), "P")} />
            </MuiGrid> */}
          </MuiGrid>
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

export default Task;
