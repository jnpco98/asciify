import React, { ReactElement, forwardRef, ForwardRefRenderFunction } from 'react';
import { AnyStyledComponent } from 'styled-components';
import * as S from './style';

export enum InputType {
  Multi,
  Single
}

type Props = {
  className?: string;
  inputType?: InputType;
};

function Input(
  props: Props,
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
): ReactElement {
  const { className, inputType } = props;

  let StyledInput: AnyStyledComponent;

  switch (inputType) {
    case InputType.Multi:
      StyledInput = S.TextArea;
      break;
    default:
    case InputType.Single:
      StyledInput = S.Input;
      break;
  }

  return <StyledInput ref={ref} className={className} {...props} />;
}

export default forwardRef(Input as ForwardRefRenderFunction<HTMLDivElement, Props>);
