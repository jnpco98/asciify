import React from 'react';
import purifyHTML from '../../../utilities/purify-html';
import * as S from './style';

type Props = {
  HTMLString: string;
  className?: string;
};

function DynamicHTML(props: Props) {
  const { HTMLString, className } = props;

  return (
    <S.DynamicHTMLContainer
      className={className}
      dangerouslySetInnerHTML={{ __html: purifyHTML(HTMLString) }}
    />
  );
}

export default DynamicHTML;
