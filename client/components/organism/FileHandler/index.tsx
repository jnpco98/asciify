import React, { FormEvent, useRef, useState } from 'react';
import Section from '@layout/Section';
import Text, { TextType } from '@components/atom/Text';
import { FileDropFormat } from '../FileDrop';
import axios from 'axios';
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
    const urlInputValue = urlInputRef.current.value.trim();
    if(!urlInputValue || !urlInputValue.length) return;

    setLoading(true);
    try {
      const corsAnywhere = 'https://ukiyo-cors-anywhere.herokuapp.com/';
      const { data } = await axios({ method: 'get', url: corsAnywhere + urlInputValue, responseType: 'arraybuffer' });
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
        <Text textType={TextType.SectionTitle}>Add an Image</Text>
        <Text>Image Url</Text>
        <S.Wrapper>
          <S.PrimaryContent>
            <S.UrlWrapper onSubmit={handleOnUrlSubmit}>
              <S.UrlInput ref={urlInputRef} bordered placeholder="Paste image url here"/>
              <S.UrlButton submitButton loading={loading} disabled={loading}>Load Image</S.UrlButton>
            </S.UrlWrapper>
            <S.ImageDrop onFileSelect={onFileSelect}/>
          </S.PrimaryContent>
          <S.SecondardContent>
            <S.InstructionBox/>
            <S.DemoLink link="/">View Demo</S.DemoLink>
          </S.SecondardContent>
        </S.Wrapper>
      </S.Container>
    </Section>
  );
}

export default FileHandler;
