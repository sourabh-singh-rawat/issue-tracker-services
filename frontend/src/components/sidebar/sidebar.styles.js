import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.nav`
    background-color: var(--bg-primary);
    height: 100vh;
    min-width: 250px;
    padding: 0 2rem;
    border-right: 3px solid var(--bg-secondary);
    display: flex;
    flex-direction: column;
`;

export const AppLogo = styled.div`
    margin: auto;
    margin-top: 1em;
    margin-bottom: 0.75em;
    font-size: 2em;
    font-weight: bold;
`;

export const NavLink = styled(Link)`
    padding: 0.5em 2em;
    text-decoration: none;
    color: var(--text-primary);
`;
