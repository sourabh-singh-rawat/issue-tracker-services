import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";

import { theme } from "../../../../../config/mui.config";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import DatePicker from "../../../../../common/dates/DatePicker";
import TextField from "../../../../../common/textfields/TextField";

import SaveButton from "../../../../../common/buttons/SaveButton";
import CancelButton from "../../../../../common/buttons/CancelButton";

import { useCreateTaskMutation } from "../../../api/issue-tasks.api";

import { resetTasks } from "../../../slice/issue-tasks.slice";

const TaskForm = ({ setOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const defaultDueDate = formatISO(new Date());
  const [task, setTask] = useState({
    description: "",
    dueDate: defaultDueDate,
  });

  const [createTask] = useCreateTaskMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (selectedDate) => {
    setTask({ ...task, dueDate: selectedDate });
  };

  const handleCancel = (e) => {
    setOpen(false);
  };

  const handleSave = () => {
    if (task.description.length > 0) {
      const { description, dueDate } = task;
      createTask({ issueId: id, description, dueDate, completed: false });
      dispatch(resetTasks());
    }
    // Resetting the task state after saving
    setTask({ ...task, dueDate: defaultDueDate, description: "" });
    setOpen(false);
  };

  return (
    <MuiGrid
      item
      xs={12}
      sx={{
        padding: "1rem",
        borderRadius: "6px",
        marginTop: "1rem",
        boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.3)",
      }}
    >
      <MuiGrid container rowSpacing={2} columnSpacing={1}>
        <MuiGrid item xs={12}>
          <MuiTypography
            variant="h6"
            sx={{ color: theme.palette.text.primary }}
          >
            Create Task
          </MuiTypography>
        </MuiGrid>
        <MuiGrid item xs={12} lg={6}>
          <TextField
            title="Title"
            size="small"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            autoFocus
            fullWidth
          />
        </MuiGrid>
        <MuiGrid item xs={0} lg={6} />
        <MuiGrid item xs={12} lg={6}>
          <TextField
            title="Description"
            size="small"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </MuiGrid>
        <MuiGrid item xs={0} lg={6} />
        <MuiGrid item xs={12} lg={2}>
          <DatePicker
            title="Due Date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleDateChange}
          />
        </MuiGrid>
        <MuiGrid item xs={12} lg={10} />
        <MuiGrid item>
          <SaveButton label="Create" onClick={handleSave} />
        </MuiGrid>
        <MuiGrid item>
          <CancelButton label="Cancel" onClick={handleCancel} />
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
};

export default TaskForm;
