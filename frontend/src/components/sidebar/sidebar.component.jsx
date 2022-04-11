import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { SidebarContainer, AppLogo, NavLink } from "./sidebar.styles";

const Sidebar = () => {
    return (
        <Fragment>
            <SidebarContainer>
                <AppLogo>Issue Tracker</AppLogo>
                <NavLink to="/">Dashboard </NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/teams">Teams</NavLink>
                <NavLink to="/issues">Issues</NavLink>
            </SidebarContainer>
            <Outlet />
        </Fragment>
    );
};

export default Sidebar;
