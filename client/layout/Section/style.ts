import styled, { css } from 'styled-components';
import { gutter, GUTTER_LEFT, GUTTER_RIGHT, pageTitleFontSize } from '@utilities/mixins';
import { SectionType } from '.';
import * as M from '@utilities/media';
import Text, { TextType } from '@components/atom/Text';

export const Container = styled.div<{ navOffset: boolean; footerOffset: boolean; }>`
  background: transparent;

  ${props =>
    props.navOffset && css`
      padding-top: 9rem;
    `};

  ${props =>
    props.footerOffset && css`
      padding-bottom: 9rem;
    `};

  ${M.MEDIA_LARGE} {

    ${props =>
    props.navOffset && css`
      padding-top: 12rem;
    `};

  ${props =>
    props.footerOffset && css`
      padding-bottom: 12rem;
    `};
  }
`;

export const SectionTitle = styled(Text).attrs({ textType: TextType.SectionTitle })`
  ${pageTitleFontSize};
  padding: 5rem 0 2rem;
  color: rgba(255, 255, 255, 0.6);
  width: 100%;
  text-align: center;
`;

export const Wrapper = styled.div<{ layout?: SectionType }>`
  ${gutter(GUTTER_LEFT)};
  ${gutter(GUTTER_RIGHT)};

  max-width: ${({ theme }) => theme.screen.innerMaxWidth};
  margin-left: auto;
  margin-right: auto;

  ${M.MEDIA_SMALL} {
    display: flex;
    align-items: flex-start;

    ${(props) => {
      const { layout } = props;
      if (layout === 'equal')
        return css`
          & > * {
            width: 50%;
          }

          & > :nth-child(1) {
            margin-right: 0.7rem;
          }

          & > :nth-child(2) {
            margin-left: 0.7rem;
          }
        `;
      if (layout === 'primarySecondary')
        return css`
          & > :nth-child(1) {
            width: 70%;
            margin-right: 0.7rem;
          }
          & > :nth-child(2) {
            width: 30%;
            margin-left: 0.7rem;
          }
        `;
      if (layout === 'secondaryPrimary')
        return css`
          & > :nth-child(1) {
            width: 30%;
            margin-right: 0.7rem;
          }
          & > :nth-child(2) {
            width: 70%;
            margin-left: 0.7rem;
          }
        `;
      return '';
    }}
  }
`;
