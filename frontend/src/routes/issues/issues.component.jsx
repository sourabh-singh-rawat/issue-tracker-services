import { Routes, Route } from "react-router-dom";
import { AppContainer, PageTitle } from "../../App.styles";

const Detailed = () => {
    return "detailed view for issues";
};

const Kanban = () => {
    return "Kanban view for issues";
};

const Issues = () => {
    return (
        <AppContainer>
            <PageTitle>ISSUES</PageTitle>
            <Routes>
                <Route index element={<Detailed />}></Route>
                <Route path="board" element={<Kanban />}></Route>
            </Routes>
        </AppContainer>
    );
};

export default Issues;
