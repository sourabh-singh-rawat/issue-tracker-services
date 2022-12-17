import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";
import AddTaskButton from "../../buttons/AddTaskButton";

const TaskList = ({ rows, isLoading }) => {
  return (
    <MuiGrid item xs={12}>
      {isLoading ? (
        <MuiLinearProgress />
      ) : (
        <Fragment>
          {rows.map(({ id, ...otherProps }) => {
            return (
              <MuiGrid key={id} xs={12} item>
                <Task taskId={id} {...otherProps} />
              </MuiGrid>
            );
          })}
        </Fragment>
      )}
      <AddTaskButton />
    </MuiGrid>
  );
};

export default TaskList;
