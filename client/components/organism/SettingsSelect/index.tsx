import React, { useState } from 'react';
import Section from '@layout/Section';
import { OptionsType, ValueType } from 'react-select';
import Select from '@components/atom/Select';
import Button from '@components/atom/Button';
import * as S from './style';

export type SelectOption = { value: string; label: string };

const generateOptions: OptionsType<SelectOption> = [
  { value: 'text', label: 'Text' },
  { value: 'html', label: 'HTML' },
  { value: 'pixels', label: 'Pixels' }
];

const colorModeOptions: OptionsType<SelectOption> = [
  { value: 'default', label: 'Default' },
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'black', label: 'Black' }
];

export type AsciiTextSettings = {
  charRamp?: string;
  preserveAspectRatio?: boolean;
  pixelCountHorizontal?: number;
  pixelCountVertical?: number;
}

export type AsciiHtmlSettings = AsciiTextSettings & { 
  gap: number, colorMode: string 
};

export type AsciiPixelSettings = AsciiHtmlSettings;

type Props = {
  handleOnGenerateAscii?: (ascii: string) => void;
  handleOnGenerateAsciiImage?: (asciiImage: string) => void;
}

function SettingsSelect(props: Props) {
  const { handleOnGenerateAscii, handleOnGenerateAsciiImage } = props;
  const [option, selectOption] = useState<{ value: string }>();

  function handleSelect(selected: ValueType<SelectOption>) {
    selectOption((selected as any).value || '');
  }

  function handleOnClick() {
    handleOnGenerateAscii && handleOnGenerateAscii(`<div>Ascii</div>`);
    handleOnGenerateAsciiImage && handleOnGenerateAsciiImage(`https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png`);
  }
  
  return(
    <Section>
      <S.Container>
        <Select placeholder="Select ascii output type" options={generateOptions} onSelect={handleSelect} isSearchable={false} className="generate-select" classNamePrefix="generate-select" instanceId="generate-select"/>
        <S.SettingsDivider/>
        <S.SettingsContainer>
          <S.AspectRatioSwitch />
          <S.SettingsRow>
            <S.SettingsInput bordered placeholder="Pixel Width"></S.SettingsInput>
            <S.SettingsInput bordered placeholder="Pixel Height"></S.SettingsInput>
            <S.SettingsInput bordered placeholder="Gap"></S.SettingsInput>
          </S.SettingsRow>
          <S.SettingsRow>
            <Select placeholder="Select color mode" options={colorModeOptions} onSelect={handleSelect} isSearchable={false} className="color-mode" classNamePrefix="color-mode" instanceId="color-mode"/>
          </S.SettingsRow>
          <S.SettingsRow>
            <S.SettingsCharacterRamp bordered placeholder={`Enter the characters you want to get included in the ascii art. From the darkest to the lightest ex: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," ^\`'. "`}></S.SettingsCharacterRamp>
          </S.SettingsRow>
        </S.SettingsContainer>
        <Button onClick={handleOnClick}>Generate</Button>
      </S.Container>
    </Section>
  );
}

export default SettingsSelect;
