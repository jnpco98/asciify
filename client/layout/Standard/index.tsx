import React, { ReactNode } from 'react';
import Header from '@components/organism/Header';
import Footer from '@components/organism/Footer';

type Props = {
  children: ReactNode;
};

function Standard(props: Props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Standard;
