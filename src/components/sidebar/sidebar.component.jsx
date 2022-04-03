import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
    return (
        <Fragment>
            <h1>Sidebar</h1>
            <Outlet />
        </Fragment>
    );
};

export default Sidebar;
