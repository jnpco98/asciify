import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Standard from '@layout/Standard';
import FileHandler from '@components/organism/FileHandler';
import SettingsSelect from '@components/organism/SettingsSelect';
import Preview, { DEFAULT_PREVIEW_COLOR } from '@components/organism/ImagePreview';
import { FileDropFormat } from '@components/organism/FileDrop';
import { blob } from '@icons';
import * as M from '@utilities/media';
import AsciiPreview, { AsciiResult } from '@components/organism/AsciiPreview';

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
  const [generatedAscii, setGeneratedAscii] = useState<AsciiResult | null>();
  const [background, setBackground] = useState(DEFAULT_PREVIEW_COLOR);

  function handleOnFileSelect(imageData: FileDropFormat) {
    setTargetImage(imageData.data.toString());
  }

  function handleOnGenerateAscii(ascii: AsciiResult) {
    setGeneratedAscii(ascii);
  }

  return (
    <Standard>
      <BlobIcon/>
      <FileHandler onFileSelect={handleOnFileSelect}/>
      {
        targetImage &&
          <>
            <Preview background={background} setBackground={setBackground} targetImage={targetImage} setTargetImage={setTargetImage} generatedAscii={generatedAscii} setGeneratedAscii={setGeneratedAscii} />
            <SettingsSelect onAsciiGenerated={handleOnGenerateAscii} targetImage={targetImage} />
          </>
      }
      {generatedAscii && <AsciiPreview ascii={generatedAscii} background={background} />}
    </Standard>
  );
}

export default Index;
