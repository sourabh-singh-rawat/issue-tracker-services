import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import MuiAccordian from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import EditTaskButton from "../EditTaskButton";
import DateLabel from "../../../../common/components/DateLabel";
import Checkbox from "../../../../common/components/Checkbox";
import TextField from "../../../../common/components/styled/StyledTextField";

import { useTheme } from "@mui/material";
import { useUpdateIssueTaskMutation } from "../../../../api/generated/issue.api";
import { useMessageBar } from "../../../message-bar/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import CancelButton from "../../../../common/components/CancelButton";

interface TaskProps {
  taskId: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function Task({
  taskId,
  dueDate,
  description,
  completed,
}: TaskProps) {
  const theme = useTheme();
  const { id } = useParams();
  const { showSuccess } = useMessageBar();

  const [expanded, setExpanded] = useState(false);
  const [task, setTask] = useState({ taskId, dueDate, description, completed });

  // const [deleteTask] = useDeleteTaskMutation();
  const [updateTask, { isSuccess }] = useUpdateIssueTaskMutation();

  const handleCancel = () => {
    setExpanded(!expanded);
  };
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
  };

  useEffect(() => {
    if (isSuccess) showSuccess("Task updated successfully");
  }, [isSuccess]);

  return (
    <MuiAccordian
      expanded={expanded}
      sx={{
        boxShadow: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:hover": { backgroundColor: theme.palette.action.hover },
      }}
      disableGutters
    >
      <MuiAccordionSummary
        expandIcon={<EditTaskButton onClick={() => setExpanded(!expanded)} />}
        sx={{
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <MuiGrid columnSpacing={1} sx={{ alignItems: "center" }} container>
          <Checkbox
            checked={task.completed}
            handleCheckBoxClick={handleCheckBoxClick}
          />
          <MuiGrid item xs={10}>
            <MuiTypography
              variant="body2"
              sx={{ textDecoration: task.completed && "line-through" }}
              noWrap
            >
              {task.description}
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item>
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
          {/* <MuiGrid sx={{ display: show ? "block" : "none" }} item>
            <DeleteTaskButton onClick={() => deleteTask({ id, taskId })} />
          </MuiGrid> */}
        </MuiGrid>
      </MuiAccordionSummary>
      <MuiAccordionDetails>
        <MuiGrid spacing={1} container>
          <MuiGrid flexGrow={1} item>
            <TextField
              name="description"
              size="small"
              value={task.description}
              autoFocus
              fullWidth
              onChange={handleChange}
            />
          </MuiGrid>
          <MuiGrid item>
            <PrimaryButton label="Save" onClick={handleSave} />
          </MuiGrid>
          <MuiGrid item>
            <CancelButton label="Cancel" onClick={handleCancel} />
          </MuiGrid>
        </MuiGrid>
      </MuiAccordionDetails>
    </MuiAccordian>
  );
}
