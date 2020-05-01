import React, { useState } from 'react';
import Standard from '@layout/Standard';
import FileHandler from '@components/organism/FileHandler';
import SettingsSelect from '@components/organism/SettingsSelect';
import * as S from './style';
import Preview from '@components/organism/Preview';
import { FileDropFormat } from '@components/organism/FileDrop';

function Index() {
  const [targetImage, setTargetImage] = useState('');
  const [outputImage, setOutputImage] = useState('');
  const [generatedAscii, setGeneratedAscii] = useState('');

  function onImageSelect(imageData: FileDropFormat) {
    // setTargetImage(imageData.data.toString());
    // setOutputImage(imageData.data.toString());
    setTargetImage('https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png');
  }

  function generateOutputImage(imageData: string) {
    setOutputImage(imageData);
  }

  console.log(generatedAscii)

  return (
    <Standard>
      <S.BlobIcon/>
      {
        targetImage ? <Preview targetImage={targetImage} generatedAscii={generatedAscii} outputImage={outputImage} /> : <FileHandler onFileSelect={onImageSelect}/>
      }
      <SettingsSelect handleOnGenerateAscii={setGeneratedAscii} handleOnGenerateAsciiImage={generateOutputImage}/>
    </Standard>
  );
}

export default Index;
