import { css, AnyStyledComponent } from 'styled-components';
import { math, margin, padding } from 'polished';
import * as M from './media';

export const CENTER_VERTICAL = 'CENTER_VERTICAL';
export const CENTER_HORIZONTAL = 'CENTER_HORIZONTAL';
export const CENTER_BOTH = 'CENTER_BOTH';

export const FLEX_ALIGN_MAIN = `FLEX_ALIGN_MAIN`;
export const FLEX_ALIGN_CROSS = `FLEX_ALIGN_CROSS`;
export const FLEX_ALIGN_BOTH = `FLEX_ALIGN_BOTH`;

export const GUTTER_TOP = 'top';
export const GUTTER_LEFT = 'left';
export const GUTTER_BOTTOM = 'bottom';
export const GUTTER_RIGHT = 'right';

const centerVertical = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const centerHorizontal = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const mainAxisAlignment = css`
  display: flex;
  align-items: center;
`;

const crossAxisAlignment = css`
  display: flex;
  justify-content: center;
`;

export function center(
  pos:
    | typeof FLEX_ALIGN_MAIN
    | typeof FLEX_ALIGN_CROSS
    | typeof FLEX_ALIGN_BOTH
    | typeof CENTER_VERTICAL
    | typeof CENTER_HORIZONTAL
    | typeof CENTER_BOTH
) {
  return css`
    ${pos === CENTER_VERTICAL && centerVertical};
    ${pos === CENTER_HORIZONTAL && centerHorizontal};
    ${pos === CENTER_BOTH &&
    css`
      ${centerVertical};
      ${centerHorizontal};
      transform: translate(-50%, -50%);
    `};

    ${pos === FLEX_ALIGN_MAIN && mainAxisAlignment};
    ${pos === FLEX_ALIGN_CROSS && crossAxisAlignment};
    ${pos === FLEX_ALIGN_BOTH &&
    css`
      ${mainAxisAlignment};
      ${crossAxisAlignment};
    `}
  `;
}

type TruncateResponsiveSettings = {
  default: { fontSize: string };
  responsive?: { screenSize: string; fontSize?: string }[];
};

export function truncate(
  fontSize: string | TruncateResponsiveSettings,
  lineHeight: number = 1,
  linesToShow: number = 1,
  maxWidth: string = '100%'
) {
  return css`
    display: block;
    display: -webkit-box;
    max-width: ${maxWidth};
    line-height: ${lineHeight};
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: ${linesToShow};
    -webkit-box-orient: vertical;

    ${typeof fontSize === 'string' &&
    css`
      height: ${math(`${fontSize} * ${lineHeight} * ${linesToShow}`)};
      font-size: ${fontSize};
    `};

    ${typeof fontSize === 'object' &&
    css`
      height: ${math(`${fontSize.default.fontSize} * ${lineHeight} * ${linesToShow}`)};
      font-size: ${fontSize.default.fontSize};

      ${fontSize.responsive &&
      fontSize.responsive.length &&
      fontSize.responsive.map(
        (fr) =>
          css`
            ${fr.screenSize} {
              height: ${math(`${fr.fontSize} * ${lineHeight} * ${linesToShow}`)};
              font-size: ${fr.fontSize};
            }
          `
      )}
    `};
  `;
}

export function gradient(degrees: string, colors: []) {
  return css`
    background: linear-gradient(${degrees}, ${colors.join(',')});
  `;
}

export function fadeInTextHover(container: AnyStyledComponent) {
  return css`
    transform: scale(0);
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease;

    ${container}:hover & {
      opacity: 1;
      transform: scale(1);
    }
  `;
}

export function pageTitleFontSize() {
  return css`
    ${({ theme }) =>
      css`
        font-size: ${math(`${theme.font.baseSize} * 1.4`)};
      `};
  `;
}

export function sectionFontSize() {
  return css`
    ${({ theme }) =>
      css`
        font-size: ${math(`${theme.font.baseSize} * 1`)};

        ${M.MEDIA_XSMALL} {
          font-size: ${math(`${theme.font.baseSize} * 1.1`)};
        }
      `};
  `;
}

export function subsectionFontSize() {
  return css`
    ${({ theme }) =>
      css`
        font-size: ${math(`${theme.font.baseSize} * 1`)};

        ${M.MEDIA_XSMALL} {
          font-size: ${math(`${theme.font.baseSize} * 1`)};
        }
      `};
  `;
}

export function regularFontSize() {
  return css`
    ${({ theme }) =>
      css`
        font-size: ${math(`${theme.font.baseSize} * 0.8`)};

        ${M.MEDIA_XSMALL} {
          font-size: ${math(`${theme.font.baseSize} * 0.8`)};
        }
      `};
  `;
}

export function smallFontSize() {
  return css`
    ${({ theme }) =>
      css`
        font-size: ${math(`${theme.font.baseSize} * 0.7`)};

        ${M.MEDIA_XSMALL} {
          font-size: ${math(`${theme.font.baseSize} * 0.7`)};
        }
      `};
  `;
}

export function xSmallFontSize() {
  return css`
    ${({ theme }) =>
      css`
        font-size: ${math(`${theme.font.baseSize} * 0.65`)};

        ${M.MEDIA_XSMALL} {
          font-size: ${math(`${theme.font.baseSize} * 0.65`)};
        }
      `};
  `;
}

export function gutter(
  pos: typeof GUTTER_TOP | typeof GUTTER_RIGHT | typeof GUTTER_BOTTOM | typeof GUTTER_LEFT,
  useMargin?: boolean
) {
  const gutterFn = useMargin ? margin : padding;

  //#region Gutters CSS
  return css`
    ${({ theme }) =>
      gutterFn(
        pos == GUTTER_TOP ? theme.gutterVertical.base : null,
        pos == GUTTER_RIGHT ? theme.gutterHorizontal.base : null,
        pos == GUTTER_BOTTOM ? theme.gutterVertical.base : null,
        pos == GUTTER_LEFT ? theme.gutterHorizontal.base : null
      )}

    ${M.MEDIA_XXSMALL} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.xxsmall : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.xxsmall : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.xxsmall : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.xxsmall : null
        )}
    }

    ${M.MEDIA_XSMALL} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.xsmall : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.xsmall : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.xsmall : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.xsmall : null
        )}
    }

    ${M.MEDIA_SMALL} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.small : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.small : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.small : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.small : null
        )}
    }

    ${M.MEDIA_MEDIUM} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.medium : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.medium : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.medium : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.medium : null
        )}
    }

    ${M.LARGE} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.large : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.large : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.large : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.large : null
        )}
    }

    ${M.MEDIA_XLARGE} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.xlarge : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.xlarge : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.xlarge : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.xlarge : null
        )}
    }

    ${M.MEDIA_XXLARGE} {
      ${({ theme }) =>
        gutterFn(
          pos == GUTTER_TOP ? theme.gutterVertical.xxlarge : null,
          pos == GUTTER_RIGHT ? theme.gutterHorizontal.xxlarge : null,
          pos == GUTTER_BOTTOM ? theme.gutterVertical.xxlarge : null,
          pos == GUTTER_LEFT ? theme.gutterHorizontal.xxlarge : null
        )}
    }
  `;
  //#endregion Gutters CSS
}

export function headingDecoration() {
  return css`
    overflow: hidden;
    text-align: center;
    position: relative;
    width: 100%;

    &:before,
    &:after {
      top: 50%;
      transform: translateY(-50%);
      width: 50%;
      height: 2px;
      position: absolute;
      background: ${({ theme }) => theme.colors.default};
      content: '';
    }

    &:before {
      margin-left: -51%;
    }

    &:after {
      margin-left: 1%;
    }
  `;
}

export function ratioImage(image: AnyStyledComponent, width: string, height?: string) {
  return css`
    position: relative;
    width: ${width};
    padding-bottom: ${height};

    ${image} {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      object-fit: cover;
    }
  `;
}
