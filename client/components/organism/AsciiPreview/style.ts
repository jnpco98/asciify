import styled, { css } from 'styled-components';
import * as M from '@utilities/media';

const preStyling = css`
  overflow: auto;
  text-align: center;
  font-weight: bold;
  font-size: 0.5rem;
  line-height: 1.2;
  font-family: monospace;

  ${M.MEDIA_XSMALL} {
    font-size: 0.7rem;
  }

  ${M.MEDIA_MEDIUM} {
    font-size: 0.8rem;
  }
`;

export const AsciiHtmlPreview = styled.div<{ background: string }>`
  margin-top: 2rem;
  position: relative;

  .ascii {
    ${preStyling};
    background: ${(props) => props.background};

    span {
      display: inline-block;
    }
  }
`;

export const AsciiPreview = styled.pre<{ background: string }>`
  ${preStyling};
  position: relative;
  white-space: pre;
  background: ${(props) => props.background};
  margin-top: 2rem;
`;
