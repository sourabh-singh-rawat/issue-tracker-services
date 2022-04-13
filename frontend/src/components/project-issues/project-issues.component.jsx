import { useParams } from "react-router-dom";

const ProjectIssues = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{id} issues</h1>
    </div>
  );
};

export default ProjectIssues;
