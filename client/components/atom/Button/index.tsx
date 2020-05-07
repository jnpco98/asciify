import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';
import * as S from './style';
import Loader from '../Loader';

export enum ButtonType {
  Info,
  Success,
  Warning,
  Error
}

type Props = {
  link?: string;
  absolute?: boolean;
  className?: string;
  submitButton?: boolean;
  buttonType?: ButtonType;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
};

function Button(props: Props) {
  const { children, className, onClick, buttonType, submitButton, link, absolute, disabled, loading } = props;

  const buttonProps: any = { className, buttonType, onClick, disabled, loading };
  
  if (!link) {
    buttonProps.as = 'button';
    if (submitButton) buttonProps.type = 'submit';
  }
  if (absolute) buttonProps.href = link;

  const Element = <S.Container {...buttonProps}>{loading ? <Loader/>: children}</S.Container>;

  if (link) return <Link href={link}>{Element}</Link>;

  return Element;
}

export default Button;
