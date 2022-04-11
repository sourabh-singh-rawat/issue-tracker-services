import { useParams } from "react-router-dom";

const ProjectIssues = () => {
    const { projectId } = useParams();

    return (
        <div>
            <h1>{projectId} issues</h1>
        </div>
    );
};

export default ProjectIssues;
