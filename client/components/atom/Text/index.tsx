import React from 'react';
import { AnyStyledComponent } from 'styled-components';
import Link from 'next/link';
import * as S from './style';

export enum TextType {
  PageTitle,
  SectionTitle,
  SubsectionTitle,
  Paragraph,
  Span,
  Anchor,
  Label
}

type Props = {
  link?: string;
  absolute?: boolean;
  className?: string;
  children?: React.ReactNode;
  textType?: TextType;
  htmlFor?: string;
};

function Text(props: Props) {
  const { children, className, textType, link, absolute, htmlFor } = props;

  let StyledText: AnyStyledComponent;

  switch (textType) {
    case TextType.PageTitle:
      StyledText = S.PageTitle;
      break;
    case TextType.SectionTitle:
      StyledText = S.SectionTitle;
      break;
    case TextType.SubsectionTitle:
      StyledText = S.SubsectionTitle;
      break;
    default:
    case TextType.Paragraph:
      StyledText = S.Paragraph;
      break;
    case TextType.Span:
      StyledText = S.Span;
      break;
    case TextType.Anchor:
      StyledText = S.Anchor;
      break;
    case TextType.Label:
      StyledText = S.Label;
      break;
  }

  const textProps: any = { className, textType, htmlFor };
  if (absolute) textProps.href = link;

  const Element = <StyledText {...textProps}>{children || ''}</StyledText>;
  if (link) return <Link href={link} passHref>{Element}</Link>;
  return Element;
}

export default Text;
