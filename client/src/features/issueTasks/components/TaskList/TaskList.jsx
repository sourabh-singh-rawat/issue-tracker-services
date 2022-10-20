import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";

const TaskList = ({ rows, rowCount, loading }) => {
  return (
    <MuiGrid container rowSpacing={1}>
      {loading ? (
        <MuiGrid item xs={12}>
          <MuiLinearProgress />
        </MuiGrid>
      ) : (
        <Fragment>
          {rows.map(({ id, ...otherProps }) => {
            return (
              <MuiGrid item xs={12}>
                <Task key={id} taskId={id} {...otherProps} />
              </MuiGrid>
            );
          })}
        </Fragment>
      )}
    </MuiGrid>
  );
};

export default TaskList;
