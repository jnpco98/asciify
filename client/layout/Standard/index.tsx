import React, { ReactNode } from 'react';
import Header from '@components/organism/Header';

type Props = {
  children: ReactNode;
};

function Standard(props: Props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default Standard;
