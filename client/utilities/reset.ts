import { css, createGlobalStyle } from 'styled-components';

// prettier-ignore
const reset = css`
  * {
    box-sizing: border-box;
  }

  body.no-scroll {
    overflow: hidden;
  }

  body,
  html {
    height: 100%;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: ${({ theme }) => theme.colors.background};
  }

  html, body, div, span, applet, object, iframe, 
  h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, 
  abbr, acronym, address, big, cite, code, del, dfn, 
  em, img, ins, kbd, q, s, samp, small, strike, strong, 
  sub, sup, tt, var, b, u, i, center, dl, dt, dd, 
  ol, ul, li, fieldset, form, label, legend, table, 
  caption, tbody, tfoot, thead, tr, th, td, article, 
  aside, canvas, details, embed, figure, figcaption, footer, 
  header, hgroup, main, menu, nav, output, ruby, section, 
  summary, time, mark, audio, video, textarea, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: ${({ theme }) => theme.font.primary}, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline: none;

    &::selection {
      color: ${({ theme }) => theme.colors.default};
      background: ${({ theme }) => theme.colors.selection};
    }
  }

  article, aside, details, figcaption, figure, footer, 
  header, hgroup, main, menu, nav, section {
    display: block;
  }

  *[hidden] {
    display: none;
  }

  img {
    display: block;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ol,
  ul {
    list-style: none;
    font-family: ${({ theme }) => theme.font.primary}, Sans-Serif;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: currentColor;
    text-decoration: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  button {
    font-family: ${({ theme }) => theme.font.primary}, Sans-Serif;
    outline: none;
    cursor: pointer;
  }

  input,
  textarea {
    background: transparent;
    outline: none;
  }
`;

export default createGlobalStyle`${reset}`;
