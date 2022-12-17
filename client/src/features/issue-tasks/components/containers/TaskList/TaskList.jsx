import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";
import AddTaskButton from "../../buttons/AddTaskButton";

import { resetTasks } from "../../../slice/issue-tasks.slice";

const TaskList = ({ rows, isLoading }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(resetTasks());
  }, []);

  return (
    <MuiGrid item xs={12}>
      {isLoading ? (
        <MuiLinearProgress />
      ) : (
        <Fragment>
          {/* <MuiLinearProgress /> */}
          {rows.map(({ id, ...otherProps }) => {
            return (
              <MuiGrid key={id} xs={12} item>
                <Task taskId={id} {...otherProps} />
              </MuiGrid>
            );
          })}
          <AddTaskButton />
        </Fragment>
      )}
    </MuiGrid>
  );
};

export default TaskList;
