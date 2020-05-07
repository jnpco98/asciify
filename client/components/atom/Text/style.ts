import styled from 'styled-components';
import {
  pageTitleFontSize,
  sectionFontSize,
  subsectionFontSize,
  regularFontSize,
  headingDecoration
} from '../../../utilities/mixins';
import { margin } from 'polished';

type HeadingStyleProps = {
  decorate?: boolean;
};

export const PageTitle = styled.h1<HeadingStyleProps>`
  ${pageTitleFontSize};
  font-family: ${({ theme }) => theme.font.secondary};
  font-weight: ${({ theme }) => theme.font.bold};

  ${margin('1.4rem', null, '1.4rem', null)};

  ${(props) => props.decorate && headingDecoration};
`;

export const SectionTitle = styled.h2<HeadingStyleProps>`
  ${sectionFontSize};

  font-family: ${({ theme }) => theme.font.secondary};
  font-weight: ${({ theme }) => theme.font.bold};
  ${margin('0.7rem', null, '0.7rem', null)};

  ${(props) => props.decorate && headingDecoration};
`;

export const SubsectionTitle = styled.h3`
  ${subsectionFontSize};
  font-family: ${({ theme }) => theme.font.secondary};
  font-weight: ${({ theme }) => theme.font.bold};
  ${margin('1rem', null, '1rem', null)};
`;

export const Paragraph = styled.p`
  ${regularFontSize};

  ${margin('0.2rem', null, '0.2rem', null)};
`;

export const Span = styled.span`
  ${regularFontSize};

  ${margin('0.2rem', null, '0.2rem', null)};
`;

export const Anchor = styled.a`
  ${regularFontSize};
  color: ${({ theme }) => theme.colors.primary};
  position: relative;

  &:after {
    width: 100%;
    height: 0.0625rem;
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    background: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryCompliment};
  }

  ${margin('0.2rem', null, '0.2rem', null)};
`;

export const Label = styled.label`
  ${regularFontSize};

  ${margin('0.2rem', null, '0.2rem', null)};
`;
