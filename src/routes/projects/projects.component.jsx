import { Routes, Route, useParams } from "react-router-dom";

const Temp = () => {
    const { projectId } = useParams();

    return (
        <div>
            <h1>{projectId} issues</h1>
        </div>
    );
};

const Temp2 = () => {
    const { projectId } = useParams();

    return (
        <div>
            <h1>{projectId} members</h1>
        </div>
    );
};

const NoComponent = () => {
    return <h1>404</h1>;
};

const Projects = () => {
    return (
        <div>
            <h1>PROJECTS</h1>
            <Routes>
                <Route path=":projectId/issues" element={<Temp />}></Route>
                <Route path=":projectId/members" element={<Temp2 />}></Route>
                <Route path="*" element={<NoComponent />}></Route>
            </Routes>
        </div>
    );
};

export default Projects;
