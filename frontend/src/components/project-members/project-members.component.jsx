import { useParams } from "react-router-dom";

const ProjectMembers = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{id} members</h1>
    </div>
  );
};

export default ProjectMembers;
