import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const ProjectIssues = () => {
  const { id, type } = useParams();

  return (
    <div>
      <Typography variant="body2">
        There are currently no issues in the project
      </Typography>
    </div>
  );
};

export default ProjectIssues;
