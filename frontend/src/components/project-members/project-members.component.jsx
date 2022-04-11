import { useParams } from "react-router-dom";

const ProjectMembers = () => {
    const { projectId } = useParams();

    return (
        <div>
            <h1>{projectId} members</h1>
        </div>
    );
};

export default ProjectMembers;
