import styled, { css } from 'styled-components';

interface ITextProps {
  strong?: boolean;
  navigation?: boolean;
  small?: boolean;
  color?: string;
  fontWeight?: number;
  fontSize?: string;
  lineHeight?: string;
  truncate?: boolean;
  ellipsis?: boolean;
  rows?: number;
  breakByWord?: boolean;
  padding?: string;
  ta?: string;
}

export const Text = styled.div<ITextProps>`
  font-style: normal;
  font-weight: ${(p) => p.fontWeight || 500};
  font-size: ${(p) => p.fontSize || '1rem'};
  line-height: ${(p) => p.lineHeight || '1'};
  color: ${(p) => p.theme.black};
  word-wrap: break-word;
  transition: color 0.1s ease-in-out;
  padding: ${(p) => p.padding || '0'};
  font-family: 'LT Superior';

  ${(props) =>
    props.breakByWord &&
    css`
      word-break: normal;
      overflow-wrap: break-word;
      max-width: 100%;
    `}

  ${(props) =>
    props.navigation &&
    css`
      font-weight: 600;
    `}

  ${(props) =>
    props.strong &&
    css`
      font-weight: 700;
    `}

  ${(props) =>
    props.small &&
    css`
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.1875rem;
    `}

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    `}

  ${({ rows }) =>
    css`
      -webkit-line-clamp: ${rows};
    `}

  ${({ ellipsis }) =>
    ellipsis &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 2px;
    `}

    ${({ ta }) => ta && css`
      text-align: ${ta};
    `}
`;