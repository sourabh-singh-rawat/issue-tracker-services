import React from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import Task from "../Task";
import TaskForm from "../TaskForm";

interface TaskListProps {
  rows: {
    id: string;
    description: string;
    completed: boolean;
    dueDate: string;
  }[];
  isLoading: boolean;
}

export default function TaskList({ rows = [], isLoading }: TaskListProps) {
  const theme = useTheme();
  const completed = rows.reduce(
    (prev, row) => (row.completed ? (prev += 1) : prev),
    0,
  );
  const total = rows.length;

  return (
    <>
      {isLoading ? (
        <MuiLinearProgress />
      ) : (
        <>
          <MuiGrid container>
            <MuiGrid item xs={12}>
              <TaskForm />
            </MuiGrid>
            {rows.length > 0 && (
              <>
                <MuiGrid item sx={{ mt: theme.spacing(1) }} xs={12}>
                  <MuiGrid
                    sx={{ alignItems: "center" }}
                    columnSpacing={1}
                    container
                  >
                    <MuiGrid item flexGrow={1}>
                      <MuiLinearProgress
                        variant="determinate"
                        color="success"
                        sx={{ borderRadius: theme.shape.borderRadiusMedium }}
                        value={(completed / total) * 100}
                      />
                    </MuiGrid>
                    <MuiGrid item>
                      {completed}/{total}
                    </MuiGrid>
                  </MuiGrid>
                </MuiGrid>
                <MuiGrid
                  item
                  sx={{
                    mt: theme.spacing(1),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadiusMedium,
                    backgroundColor: theme.palette.background.default,
                  }}
                  xs={12}
                >
                  {rows.map(({ id, completed, description, dueDate }) => (
                    <Task
                      key={id}
                      taskId={id}
                      completed={completed}
                      description={description}
                      dueDate={dueDate}
                    />
                  ))}
                </MuiGrid>
              </>
            )}
          </MuiGrid>
        </>
      )}
    </>
  );
}
