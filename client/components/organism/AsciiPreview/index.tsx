import React from 'react';
import dynamic from "next/dynamic";
import * as S from './style';

const DynamicHtml = dynamic(() => import(`@components/molecule/DynamicHtml`), { ssr: false });

export interface AsciiResult {
  style: string | null;
  ascii: string;
}

type Props = {
  ascii: AsciiResult;
  background: string;
}

function AsciiPreview(props: Props) {
  const { ascii, background } = props;

  return ascii.style ?
    (
      <S.AsciiHtmlPreview background={background} >
        <DynamicHtml HTMLString={ascii.ascii} />
      </S.AsciiHtmlPreview>
    ) :
    (
      <S.AsciiPreview background={background} >
        {ascii.ascii}
      </S.AsciiPreview>
    )
}

export default AsciiPreview;