import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";

const TaskList = ({ rows, rowCount, title, loading }) => {
  return (
    <MuiGrid item xs={12}>
      {loading ? (
        <MuiLinearProgress />
      ) : (
        <Fragment>
          {rows.length > 0 && (
            <MuiTypography variant="body1" sx={{ fontWeight: 600 }}>
              {title}
            </MuiTypography>
          )}
          {rows.map(({ id, ...otherProps }) => {
            return (
              <MuiGrid key={id} xs={12} item>
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
