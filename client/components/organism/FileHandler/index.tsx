import React, { FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import ReactGa from 'react-ga';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import { FileDropFormat } from '@components/organism/FileDrop';
import { CORS_ANYWHERE } from '@constants/environment';
import { FILE_HANDLER } from '@settings';
import * as S from './style'

type Props = {
  onFileSelect?: (file: FileDropFormat) => void;
}

function FileHandler(props: Props) {
  const { onFileSelect } = props;
  const [loading, setLoading] = useState(false);
  
  const urlInputRef = useRef(null);

  async function handleOnUrlSubmit(e: FormEvent) {
    e.preventDefault();
    ReactGa.event({ category: 'Form', action: 'Loading image' });

    const urlInputValue = urlInputRef.current.value.trim();
    if(!urlInputValue || !urlInputValue.length) return;

    setLoading(true);
    try {
      const { data } = await axios({ method: 'get', url: CORS_ANYWHERE + urlInputValue, responseType: 'arraybuffer' });
      // prettier-ignore
      const imageBase64 = `data:;base64,${btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
      const imageData = { data: imageBase64, name: urlInputValue.split(/\//gi).pop(), size: new Buffer(imageBase64, 'base64').length };
      onFileSelect(imageData);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
    if(urlInputRef.current) urlInputRef.current.value = '';
  }

  return (
    <Section navOffset>
      <S.Container>
        <Text textType={TextType.SectionTitle}>{FILE_HANDLER.heading}</Text>
        <Text>{FILE_HANDLER.subheading}</Text>
        <S.Wrapper>
          <S.PrimaryContent>
            <S.UrlWrapper onSubmit={handleOnUrlSubmit}>
              <S.UrlInput ref={urlInputRef} bordered placeholder={FILE_HANDLER.urlInputPlaceholder} aria-label="Url Input"/>
              <S.UrlButton submitButton loading={loading} disabled={loading}>{FILE_HANDLER.loading}</S.UrlButton>
            </S.UrlWrapper>
            <S.ImageDrop onFileSelect={onFileSelect}/>
          </S.PrimaryContent>
          <S.SecondardContent>
            <S.DemoLink link={FILE_HANDLER.demoLink}>{FILE_HANDLER.demoLabel}</S.DemoLink>
          </S.SecondardContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default FileHandler;
