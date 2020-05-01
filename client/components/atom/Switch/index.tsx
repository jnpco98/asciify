import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import * as S from './style';

type Props<T> = {
  className?: string;
  name: string;
}

function Switch<T>(props: Props<T>, ref: React.RefObject<HTMLInputElement>) {
  const { className, name } = props;
  return(
    <S.Container className={className}>
      <S.Label htmlFor={name}>Preserve Aspect Ratio </S.Label>
      <S.Checkbox ref={ref} id={name} name={name}/>
    </S.Container>
  );
}

export default forwardRef(Switch as ForwardRefRenderFunction<HTMLInputElement, Props<any>>);