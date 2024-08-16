import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        font-family: 'Arial', sans-serif;
        transition: all 0.50s linear;
    }
    button {
        background: ${({ theme }) => theme.button};
        color: ${({ theme }) => theme.buttonText};
        border: none;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        transition: background 0.3s ease;
    }
    button:hover {
        opacity: 0.8;
    }
`;
