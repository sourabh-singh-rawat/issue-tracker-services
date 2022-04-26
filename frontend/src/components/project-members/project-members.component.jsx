import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const ProjectMembers = () => {
  const { id } = useParams();

  return (
    <div>
      <Typography variant="body2">All the members of the project</Typography>
    </div>
  );
};

export default ProjectMembers;
