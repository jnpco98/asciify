import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import { AsciiResult } from '../AsciiPreview';
import { IMAGE_PREVIEW } from '@settings';
import * as S from './style';

type Props = {
  background: string;
  targetImage: string;
  generatedAscii?: AsciiResult;
  setTargetImage?: Function;
  setGeneratedAscii?: Function;
  setBackground?: Function;
};

export const previewColors = [
  'transparent',
  '#FFFFFF',
  '#EEE8D5',
  '#F2AE49',
  '#EE7752',
  '#23DBAB',
  '#95E6CB',
  '#2AA198',
  '#F07178',
  '#E73C7E',
  '#99BF4D',
  '#859900',
  '#709ECC',
  '#23A6D5',
  '#002B36',
  '#073642',
  '#657B83',
  '#839496',
  '#93A1A1',
  '#343A40'
];

function Preview(props: Props) {
  const { background, targetImage, setTargetImage, setBackground } = props;

  return (
    <Section navOffset>
      <S.Container>
        <S.CloseIcon onClick={() => setTargetImage('')} />
        <Text textType={TextType.SectionTitle}>{IMAGE_PREVIEW.heading}</Text>
        <S.Wrapper>
          <Text>{IMAGE_PREVIEW.subheading}</Text>
          <S.PrimaryContent>
            <S.PreviewImageWrapper>
              <S.PreviewImage src={targetImage} visible={!!targetImage} />
            </S.PreviewImageWrapper>
            <S.SecondardContent>
              <S.ColorPicker
                color={background}
                onChangeComplete={(color) => setBackground(color.hex)}
                triangle="hide"
                colors={previewColors}
              />
            </S.SecondardContent>
          </S.PrimaryContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default Preview;
