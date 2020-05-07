import styled, { css } from "styled-components";

const preStyling = css`
  overflow: auto;
  text-align: center;
  font-weight: bold;
  font-size: 0.5rem;
  line-height: 1.2;
  font-family: monospace;
`;

export const AsciiHtmlPreview = styled.div<{ background: string }>`
  margin-top: 2rem;

  .ascii {
    ${preStyling};
    background: ${props => props.background};

    span {
      display: inline-block;
    }
  }
`;

export const AsciiPreview = styled.pre<{ background: string }>`
  ${preStyling};
  white-space: pre;
  background: ${props => props.background};
  margin-top: 2rem;
`;