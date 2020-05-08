import React from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import { footerMenu } from '@constants/menu';
import { FOOTER } from '@settings';
import * as S from './style';

function Footer() {
  return (
    <Section footerOffset>
      <S.Container>
        <S.Divider />
        <S.TextGroup>
          <Text>{FOOTER.copyright}</Text>
          <S.TermsGroup>
            {footerMenu.map(({ label, link, key }) => (
              <Text textType={TextType.Anchor} link={link} key={key}>
                {label}
              </Text>
            ))}
          </S.TermsGroup>
        </S.TextGroup>
      </S.Container>
    </Section>
  );
}

export default Footer;
