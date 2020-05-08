import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import { AsciiResult } from '../AsciiPreview';
import { IMAGE_PREVIEW } from '@settings';
import * as S from './style'

type Props = {
  background: string;
  targetImage: string;
  generatedAscii?: AsciiResult;
  setTargetImage?: Function;
  setGeneratedAscii?: Function;
  setBackground?: Function;
}

export const previewColors = [
  'transparent',
  '#fff',
  '#fdf6e3',
  '#eee8d5',
  '#f2ae49',
  '#95e6cb',
  '#2aa198',
  '#f07178',
  '#99bf4d',
  '#859900',
  '#709ecc',
  '#268bd2',
  '#002b36',
  '#073642',
  '#657b83',
  '#839496',
  '#93a1a1',
  '#343a40'
]

function Preview(props: Props) {
  const { background, targetImage, setTargetImage, setBackground } = props;

  return (
    <Section navOffset>
      <S.Container>
        <S.CloseIcon onClick={() => setTargetImage('')}/>
        <Text textType={TextType.SectionTitle}>{IMAGE_PREVIEW.heading}</Text>
        <S.Wrapper>
          <Text>{IMAGE_PREVIEW.subheading}</Text>
          <S.PrimaryContent>
            <S.PreviewImageWrapper><S.PreviewImage src={targetImage} visible={!!targetImage}/></S.PreviewImageWrapper>
            <S.SecondardContent>
              <S.ColorPicker color={background} onChangeComplete={color => setBackground(color.hex)} triangle='hide' colors={previewColors} />
            </S.SecondardContent>
          </S.PrimaryContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default Preview;
