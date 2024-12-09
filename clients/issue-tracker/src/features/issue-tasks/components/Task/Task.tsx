import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiInputAdornment from "@mui/material/InputAdornment";

import Checkbox from "../../../../common/components/Checkbox";
import TextField from "../../../../common/components/styled/StyledTextField";

import { useTheme } from "@mui/material";
import { useUpdateIssueTaskMutation } from "../../../../api/generated/issue.api";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

import StyledIconButton from "../../../../common/components/styled/StyledIconButton";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DateLabel from "../../../../common/components/DateLabel";

interface TaskProps {
  taskId: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function Task(
  { taskId, dueDate, description, completed }: TaskProps,
) {
  const theme = useTheme();
  const { id } = useParams();
  const { showSuccess } = useSnackbar();

  const [isEditMode, setIsEditMode] = useState(false);
  const [task, setTask] = useState({ taskId, dueDate, description, completed });
  const [previousDescription, setPreviousDescription] = useState("");

  // const [deleteTask] = useDeleteTaskMutation();
  const [updateTask, { isSuccess }] = useUpdateIssueTaskMutation();

  const handleCancel = () => {
    setTask({ ...task, description: previousDescription });
    setIsEditMode(!isEditMode);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      setIsEditMode(!isEditMode);
    }
  };

  useEffect(() => {
    if (isSuccess) showSuccess("Task updated successfully");
  }, [isSuccess]);

  return (
    <MuiGrid
      sx={{
        alignItems: "center",
        px: theme.spacing(0.5),
        pr: theme.spacing(2),
      }}
      container
    >
      <MuiGrid item>
        <Checkbox
          checked={task.completed}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      </MuiGrid>
      <MuiGrid item flexGrow={1}>
        <TextField
          name="description"
          value={task.description}
          InputProps={{
            endAdornment: (
              <MuiInputAdornment position="end" sx={{ mr: theme.spacing(1) }}>
                <DateLabel dueDate={dueDate} />
                {isEditMode && task.description !== previousDescription && (
                  <>
                    <StyledIconButton
                      onClick={handleSave}
                      sx={{
                        color: theme.palette.grey[600],
                        padding: theme.spacing(0.25),
                        "&:hover": { color: theme.palette.success.main },
                      }}
                      disableRipple
                    >
                      <CheckCircleIcon />
                    </StyledIconButton>
                    <StyledIconButton
                      onClick={handleCancel}
                      sx={{
                        color: theme.palette.grey[600],
                        padding: theme.spacing(0.25),
                        "&:hover": { color: theme.palette.success.main },
                      }}
                      disableRipple
                    >
                      <CancelIcon />
                    </StyledIconButton>
                  </>
                )}
              </MuiInputAdornment>
            ),
          }}
          sx={{
            borderRadius: theme.shape.borderRadiusMedium,
            textDecoration: task.completed ? "line-through" : "none",
            "& .MuiInputBase-root": {
              padding: 0,
              border: "none",
              backgroundColor: "transparent",
              fieldset: { border: 0 },
            },
            "&:hover": {
              backgroundColor: !completed
                ? theme.palette.action.hover
                : "transparent",
              "& fieldset": {
                border: !completed
                  ? `2px solid ${theme.palette.grey[200]}`
                  : "none",
              },
            },
          }}
          onChange={handleChange}
          onFocus={() => {
            setPreviousDescription(description);
            setIsEditMode(true);
          }}
          size="small"
          disabled={completed}
          fullWidth
        />
      </MuiGrid>
    </MuiGrid>
  );
}
