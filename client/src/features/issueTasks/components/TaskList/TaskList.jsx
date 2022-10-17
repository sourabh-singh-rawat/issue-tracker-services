import MuiGrid from "@mui/material/Grid";
import Task from "../Task";

const TaskList = ({ rows, rowCount }) => {
  return (
    <MuiGrid container rowSpacing={0.5}>
      {rows.map(({ id, ...otherProps }) => {
        return (
          <MuiGrid item key={id} xs={12}>
            <Task taskId={id} {...otherProps} />
          </MuiGrid>
        );
      })}
    </MuiGrid>
  );
};

export default TaskList;
