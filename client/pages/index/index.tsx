import React, { useState } from 'react';
import Standard from '@layout/Standard';
import FileHandler from '@components/organism/FileHandler';
import SettingsSelect from '@components/organism/SettingsSelect';
import Preview, { DEFAULT_PREVIEW_COLOR } from '@components/organism/ImagePreview';
import { FileDropFormat } from '@components/organism/FileDrop';
import AsciiPreview, { AsciiResult } from '@components/organism/AsciiPreview';
import AnimatedBackground from '@components/molecule/AnimatedBackground';

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
      <AnimatedBackground/>
      {
        targetImage ?
          <>
            <Preview background={background} setBackground={setBackground} targetImage={targetImage} setTargetImage={setTargetImage} generatedAscii={generatedAscii} setGeneratedAscii={setGeneratedAscii} />
            <SettingsSelect onAsciiGenerated={handleOnGenerateAscii} targetImage={targetImage} />
          </>
          :
          <FileHandler onFileSelect={handleOnFileSelect}/>
      }
      {generatedAscii && <AsciiPreview ascii={generatedAscii} background={background} />}
    </Standard>
  );
}

export default Index;
