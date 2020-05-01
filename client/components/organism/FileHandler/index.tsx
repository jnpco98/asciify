import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import * as S from './style'

function FileHandler() {
  return (
    <Section>
      <S.Container>
        <Text textType={TextType.SectionTitle}>Add an Image</Text>
        <Text>Image Url</Text>
        <S.Wrapper>
          <S.PrimaryContent>
            <S.UrlWrapper>
              <S.UrlInput bordered placeholder="Paste image url here"/>
              <S.UrlButton>Load Image</S.UrlButton>
            </S.UrlWrapper>
            <S.ImageDrop />
          </S.PrimaryContent>
          <S.SecondardContent>
            <S.InstructionBox/>
            <S.DemoLink>View Demo</S.DemoLink>
          </S.SecondardContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default FileHandler;
