import React, { FormEvent, useRef } from 'react';
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
  const urlInputRef = useRef(null);

  async function handleOnUrlSubmit(e: FormEvent) {
    e.preventDefault();
    const urlInputValue = urlInputRef.current.value.trim();
    if(!urlInputValue || !urlInputValue.length) return;

    try {
      // const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
      const corsAnywhere = '';
      const { data } = await axios({ method: 'get', url: corsAnywhere + urlInputValue, responseType: 'arraybuffer', proxy: {host: 'localhost', port: 5000} });
      const imageBase64 = `data:;base64,${btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
      const imageData = { data: imageBase64, name: urlInputValue.split(/\//gi).pop(), size: new Buffer(imageBase64, 'base64').length }
      onFileSelect(imageData);
    } catch(e) {
      console.error('error', e)
    }
    if(urlInputRef.current) urlInputRef.current.value = '';
  }

  return (
    <Section>
      <S.Container>
        <Text textType={TextType.SectionTitle}>Add an Image</Text>
        <Text>Image Url</Text>
        <S.Wrapper>
          <S.PrimaryContent>
            <S.UrlWrapper onSubmit={handleOnUrlSubmit}>
              <S.UrlInput ref={urlInputRef} bordered placeholder="Paste image url here"/>
              <S.UrlButton submitButton>Load Image</S.UrlButton>
            </S.UrlWrapper>
            <S.ImageDrop onFileSelect={onFileSelect}/>
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
