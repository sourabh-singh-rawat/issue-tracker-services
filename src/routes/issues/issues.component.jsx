import { Routes, Route } from "react-router-dom";

const Detailed = () => {
    return "detailed view for issues";
};

const Kanban = () => {
    return "Kanban view for issues";
};

const Issues = () => {
    return (
        <Routes>
            <Route index element={<Detailed />}></Route>
            <Route path="board" element={<Kanban />}></Route>
        </Routes>
    );
};

export default Issues;
