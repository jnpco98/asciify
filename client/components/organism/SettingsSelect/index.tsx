import React, { useState } from 'react';
import { OptionsType, ValueType } from 'react-select';
import axios from 'axios';
import Section from '@layout/Section';
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
  onAsciiGenerated?: (ascii: string) => void;
  onAsciiImageGenerated?: (asciiImage: string) => void;
}

function SettingsSelect(props: Props) {
  const { onAsciiGenerated, onAsciiImageGenerated } = props;
  const [option, selectOption] = useState('');
  const [settings, setSettings] = useState<AsciiHtmlSettings>();

  function handleSelect(selected: ValueType<SelectOption>) {
    selectOption((selected as any).value || '');
  }

  async function handleOnClick() {
    const BASE_URI_GENERATE_ASCII = 'https://c6ol5rzz8d.execute-api.us-east-1.amazonaws.com/dev';
    console.log(settings);
    onAsciiGenerated && onAsciiGenerated(`<div>Ascii</div>`);
    onAsciiImageGenerated && onAsciiImageGenerated(`https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png`);
  }

  function handleSettingsInputUpdate(key: keyof AsciiHtmlSettings, target?: HTMLInputElement, isNumber?: boolean) {
    if(!target) return;

    let value: string | number = target.value;

    if(isNumber) {
      value = value.replace(/\D+/g, '');
      if(isNaN(parseInt(value))) value = '';
      target.value = value.toString();
    }
    
    setSettings(s => ({ ...s, [key]: value }));
  }
  
  return(
    <Section>
      <S.Container>
        <Select placeholder="Select ascii output type to get started..." options={generateOptions} onSelect={selected => selectOption((selected as any).value || '')} isSearchable={false} className="generate-select" classNamePrefix="generate-select" instanceId="generate-select"/>
        <S.SettingsDivider/>
        <S.SettingsContainer>
          <S.AspectRatioSwitch />
          <S.SettingsRow>
            <S.SettingsInput onChange={e => handleSettingsInputUpdate('pixelCountHorizontal', e.currentTarget, true)} bordered placeholder="Pixel Width"/>
            <S.SettingsInput onChange={e => handleSettingsInputUpdate('pixelCountVertical', e.currentTarget, true)} bordered placeholder="Pixel Height"/>
            <S.SettingsInput disabled={option === 'text'} onChange={e => handleSettingsInputUpdate('gap', e.currentTarget, true)} bordered placeholder="Gap"/>
          </S.SettingsRow>
          <S.SettingsRow disabled={option === 'text'}>
            <Select placeholder="Select color mode" options={colorModeOptions} onSelect={selected => setSettings(s => ({ ...s, colorMode: (selected as any).value || '' }))} isSearchable={false} className="color-mode" classNamePrefix="color-mode" instanceId="color-mode"/>
          </S.SettingsRow>
          <S.SettingsRow>
            <S.SettingsCharacterRamp onChange={e => handleSettingsInputUpdate('charRamp', e.currentTarget)} bordered placeholder={`Enter the characters you want to get included in the ascii art. From the darkest to the lightest ex: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," ^\`'. "`} />
          </S.SettingsRow>
        </S.SettingsContainer>
        <Button loading onClick={handleOnClick}>Generate</Button>
      </S.Container>
    </Section>
  );
}

export default SettingsSelect;
