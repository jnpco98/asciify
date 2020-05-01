import React from 'react';
import Standard from '@layout/Standard';
import FileHandler from '@components/organism/FileHandler';
import OptionSelect from '@components/organism/OptionSelect';
import * as S from './style';

function Index() {
  return (
    <Standard>
      <S.BlobIcon/>
      <FileHandler/>
      <OptionSelect/>
    </Standard>
  );
}

export default Index;
