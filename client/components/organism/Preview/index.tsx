import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import * as S from './style'

type Props = {
  targetImage: string;
  outputImage?: string;
  generatedAscii?: string;
}

function Preview(props: Props) {
  const { targetImage, outputImage, generatedAscii } = props;

  return (
    <Section>
      <S.Container>
        <S.CloseIcon/>
        <Text textType={TextType.SectionTitle}>Preview</Text>
        <S.Wrapper>
          <S.PrimaryContent>
            <S.PreviewImageWrapper><S.PreviewImage src={targetImage} visible={!!targetImage}/></S.PreviewImageWrapper>
            <S.PreviewImageWrapper><S.PreviewImage src={outputImage} visible={!!outputImage}/></S.PreviewImageWrapper>
          </S.PrimaryContent>
          <S.SecondardContent>
            <S.ActionButton>Pick another image</S.ActionButton>
            <S.ActionButton>Copy to clipboard</S.ActionButton>
            <S.Output readOnly visible={!!generatedAscii} value={generatedAscii}/>
          </S.SecondardContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default Preview;
