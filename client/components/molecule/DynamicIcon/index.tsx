import React from 'react';
import purifyHTML from '../../../utilities/purify-html';
import * as S from './style';

type Props = {
  SVGString: string;
  className?: string;
};

function DynamicIcon(props: Props) {
  const { SVGString, className } = props;

  return (
    <S.DynamicSvgContainer
      className={className}
      dangerouslySetInnerHTML={{ __html: purifyHTML(SVGString) }}
    />
  );
}

export default DynamicIcon;
