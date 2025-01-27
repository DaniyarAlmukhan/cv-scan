import styled from "styled-components";

export const Bubble = styled.div<{ type?: 'green' | 'yellow' | 'red' | 'none', small?: boolean }>`
    height: 34px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background: #eaecf0;
    color: var(--color-dark-gray);
    padding: 0px 18px;
    width: min-content;
    min-width: 50px;
    background: #eaecf0;
    color: var(--color-dark-gray);

    ${({ small }) => small && `
        height: 24px;
        font-size: 12px;
        padding: 0 8px;
        gap: 4px;
        box-shadow: 2px 4px 12.4px 0px #0000001a;
        border: 0.5px solid #89898999;
        background: #eaecf0;
        border-radius: 12px;
        font-weight: 700;
    `}

    ${({ small, type }) => small && type === 'green' && `
        border: 0.5px solid #50B748;
    `}

    ${({ small, type }) => small && type === 'red' && `
        border: 0.5px solid #FF461899;
    `}

     ${({ type }) => type === 'green' && `
        background: #50b7484d;  
        color: var(--color-green);
    `}

    ${({ type }) => type === 'yellow' && `
        background:  #ffefd6;  
        color: #846739;
    `}

    ${({ type }) => type === 'red' && `
        background: #ff46184d; 
        color: #ff4618;
    `}

    svg {
        min-width: 9px;
        margin-bottom: 2px;
    }
`;