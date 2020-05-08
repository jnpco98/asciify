import React from 'react';
import * as S from './style';

type Props = {
  className?: string;
};

function AnimatedBackground(props: Props) {
  const { className } = props;

  return <S.Container className={className} />;
}

export default AnimatedBackground;
