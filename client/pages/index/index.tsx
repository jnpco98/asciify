import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Standard from '@layout/Standard';
import FileHandler from '@components/organism/FileHandler';
import SettingsSelect from '@components/organism/SettingsSelect';
import Preview from '@components/organism/Preview';
import { FileDropFormat } from '@components/organism/FileDrop';
import { blob } from '@icons';
import * as M from '@utilities/media';

const DynamicIcon = dynamic(() => import(`@components/molecule/DynamicIcon`), { ssr: false });

export const BlobIcon = styled(DynamicIcon).attrs({ SVGString: blob })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  ${M.MEDIA_SMALL} {
    width: 70%;
  }
`;

function Index() {
  const [targetImage, setTargetImage] = useState('');
  const [generatedAsciiImage, setGeneratedAsciiImage] = useState('');
  const [generatedAscii, setGeneratedAscii] = useState('');

  function handleOnFileSelect(imageData: FileDropFormat) {
    console.log(imageData.size)
    setTargetImage(imageData.data.toString());
  }

  function handleOnGenerateAscii(ascii: string) {
    setGeneratedAscii(ascii);
  }

  function handleOnGenerateAsciiImage(asciiImage: string) {
    setGeneratedAsciiImage(asciiImage);
  }

  return (
    <Standard>
      <BlobIcon/>
      {
        targetImage ? <Preview targetImage={targetImage} generatedAscii={generatedAscii} outputImage={generatedAsciiImage} /> : <FileHandler onFileSelect={handleOnFileSelect}/>
      }
      <SettingsSelect onAsciiGenerated={handleOnGenerateAscii} onAsciiImageGenerated={handleOnGenerateAsciiImage}/>
    </Standard>
  );
}

export default Index;
