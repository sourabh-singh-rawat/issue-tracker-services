import styled from "styled-components";

export const ButtonContainer = styled.button`
    background-color: var(--main-primary);
    color: white;
    font-size: 1em;
    padding: 1em 1.25em;
    border-radius: 0.5em;
    border: none;

    &:hover {
        cursor: pointer;
        box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%),
            0 1.2px 3.6px 0 rgb(0 0 0 / 11%);
    }
`;
