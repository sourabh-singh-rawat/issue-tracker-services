import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import DatePicker from "../../../../../common/dates/DatePicker";
import TextField from "../../../../../common/textfields/TextField";

import SaveButton from "../../../../../common/buttons/SaveButton";
import CancelButton from "../../../../../common/buttons/CancelButton";

import { useCreateTaskMutation } from "../../../api/issue-tasks.api";

import { setTasksLoading } from "../../../slice/issue-tasks.slice";

const AddTask = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
      dispatch(setTasksLoading());
    }
    // Resetting the task state after saving
    setTask({ ...task, dueDate: defaultDueDate, description: "" });
    setOpen(false);
  };

  return (
    <MuiGrid item xs={12}>
      <MuiGrid container rowSpacing={1} columnSpacing={1}>
        <MuiGrid item xs={12}>
          <TextField
            size="small"
            name="description"
            placeholder="Add a Task"
            onChange={handleChange}
            autoFocus
            fullWidth
          />
        </MuiGrid>
        <MuiGrid item>
          <MuiTypography variant="body2">Due Date:</MuiTypography>
        </MuiGrid>
        <MuiGrid item>
          <DatePicker
            name="dueDate"
            value={task.dueDate}
            onChange={handleDateChange}
          />
        </MuiGrid>
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

export default AddTask;
