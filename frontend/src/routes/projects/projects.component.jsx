import { AppContainer, PageTitle, CurrentLocation } from "../../App.styles";

const Projects = (props) => {
    const { pathname } = window.location;

    return (
        <AppContainer>
            <PageTitle>PROJECTS</PageTitle>
            <CurrentLocation>{pathname}</CurrentLocation>
        </AppContainer>
    );
};

export default Projects;
