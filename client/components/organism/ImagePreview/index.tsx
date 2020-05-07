import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import { AsciiResult } from '../AsciiPreview';
import * as S from './style'

type Props = {
  background: string;
  targetImage: string;
  generatedAscii?: AsciiResult;
  setTargetImage?: Function;
  setGeneratedAscii?: Function;
  setBackground?: Function;
}

export const DEFAULT_PREVIEW_COLOR = '#343a40'

export const previewColors = [
  '#fff',
  DEFAULT_PREVIEW_COLOR,
  '#f2ae49',
  '#95e6cb',
  '#f07178',
  '#99bf4d',
  '#709ecc'
]

function Preview(props: Props) {
  const { background, targetImage, setTargetImage, setBackground } = props;

  return (
    <Section>
      <S.Container>
        <S.CloseIcon onClick={() => setTargetImage('')}/>
        <Text textType={TextType.SectionTitle}>Image Preview</Text>
        <S.Wrapper>
            <Text>Preview what the ascii will look like in your terminal / website. You can change the preview background color below.</Text>
          <S.PrimaryContent>
            <S.PreviewImageWrapper><S.PreviewImage src={targetImage} visible={!!targetImage}/></S.PreviewImageWrapper>
            <S.SecondardContent>
              <S.ColorPicker color={background} onChangeComplete={color => setBackground(color.hex)} triangle='hide' colors={previewColors} />
            </S.SecondardContent>
          </S.PrimaryContent>
          <S.SecondardContent>
            <Text>Select between classic ascii which can also be used in terminals or colored ascii that uses HTML</Text>
          </S.SecondardContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default Preview;
