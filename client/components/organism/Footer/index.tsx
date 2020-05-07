import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import * as S from './style'

function Footer() {
  return (
    <Section footerOffset>
      <S.Container>
        <S.Divider/>
        <S.TextGroup>
          <Text>Copyright &copy; 2020 by Ukiyo</Text>
          <S.TermsGroup>
            <Text textType={TextType.Anchor} link="/">Terms and conditions</Text>
            <Text textType={TextType.Anchor} link="/">Contact</Text>
          </S.TermsGroup>
        </S.TextGroup>
      </S.Container>
    </Section>
  );
}

export default Footer;
