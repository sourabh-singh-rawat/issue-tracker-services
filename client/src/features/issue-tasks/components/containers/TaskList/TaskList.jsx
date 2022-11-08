import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";
import AddTask from "../AddTask";

const TaskList = ({ rows, rowCount, loading }) => {
  return (
    <MuiGrid item xs={12}>
      {loading ? (
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
      <AddTask />
    </MuiGrid>
  );
};

export default TaskList;
