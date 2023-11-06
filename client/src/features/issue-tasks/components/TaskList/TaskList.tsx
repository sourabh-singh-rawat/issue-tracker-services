import React from "react";

import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";
import TaskForm from "../TaskForm";

export default function TaskList({ rows = [], isLoading }) {
  return (
    <>
      {isLoading ? (
        <MuiLinearProgress />
      ) : (
        <>
          <TaskForm />
          {rows.map(({ id, ...otherProps }) => (
            <Task taskId={id} {...otherProps} />
          ))}
        </>
      )}
    </>
  );
}
