import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box
    }

    html,
    body,
    #root,
    .App {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-y: hidden;
    }

    
    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        color: ${({ theme }) => theme.color};
        background-color: ${({ theme }) => theme.backgroundColor};
        font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
    }
`;
