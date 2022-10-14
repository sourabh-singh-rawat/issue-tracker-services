import { useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiInputAdornment from "@mui/material/InputAdornment";

import MuiAddIcon from "@mui/icons-material/Add";

import DatePicker from "../../../../common/DatePicker";

import { useCreateIssueTaskMutation } from "../../issue.api";
import { formatISO, parseISO } from "date-fns";

export default function AddTask() {
  const { id } = useParams();
  const [createTask, { isSuccess }] = useCreateIssueTaskMutation();

  const [task, setTask] = useState({
    description: "",
    dueDate: formatISO(new Date()),
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

  const handleSave = (e) => {
    if (task.description.length > 0) {
      const { description, dueDate } = task;
      createTask({ issueId: id, description, dueDate, completed: true });
    }
    setTask({ selected: false });
  };

  return (
    <MuiGrid container columnSpacing={1}>
      {task.selected ? (
        <Fragment>
          <MuiGrid item xs={9}>
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
        </Fragment>
      ) : (
        <Fragment>
          <MuiGrid item xs={9}>
            <MuiTextField
              name="description"
              size="small"
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
        </Fragment>
      )}
      <MuiGrid item xs={3}>
        <DatePicker
          name="dueDate"
          value={parseISO(task.dueDate)}
          handleChange={handleDateChange}
          onChange={(date) => {
            setTask({ dueDate: formatISO(date) });
          }}
        />
      </MuiGrid>
    </MuiGrid>
  );
}
