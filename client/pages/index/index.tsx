import React from 'react';
import Link from 'next/link';
import Standard from '@layout/Standard';
import FileHandler from '@components/organism/FileHandler';
import * as S from './style';

function Index() {
  return (
    <Standard>
      <FileHandler/>
      <S.BlobIcon/>
    </Standard>
  );
}

export default Index;
