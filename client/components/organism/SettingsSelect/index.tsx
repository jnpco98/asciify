import React, { useState } from 'react';
import { OptionsType } from 'react-select';
import axios from 'axios';
import Section from '@layout/Section';
import Select from '@components/atom/Select';
import Button from '@components/atom/Button';
import { KeysOfString } from '@utilities/types';
import { AsciiResult } from '../AsciiPreview';
import * as S from './style';

export type SelectOption = { value: string; label: string };

const generateOptions: OptionsType<SelectOption> = [
  { value: 'text', label: 'Classic' },
  { value: 'html', label: 'Colored' }
];

const colorModeOptions: OptionsType<SelectOption> = [
  { value: 'default', label: 'Colored' },
  { value: 'monochromatic', label: 'Monochromatic' }
];

export type AsciiSettings = {
  characterRamp?: string;
  preserveAspectRatio?: boolean;
  pixelCountHorizontal?: number;
  pixelCountVertical?: number;
  gap?: number;
  colorMode?: string;
}

type Props = {
  onAsciiGenerated?: (ascii: AsciiResult) => void;
  targetImage?: string;
}

function SettingsSelect(props: Props) {
  const { onAsciiGenerated, targetImage } = props;
  const [option, selectOption] = useState('');
  const [settings, setSettings] = useState<KeysOfString<string>>({});

  function getOutputHandler(option: string) {
    switch(option) {
      default:
      case 'text':
        return 'generate-ascii-text';
      case 'html':
        return 'generate-ascii-html';
    }
  }

  async function handleOnAsciiGenerate(e: React.FormEvent) {
    e.preventDefault();
    const BASE_URI_GENERATE_ASCII = 'https://fm4779kzsc.execute-api.us-east-1.amazonaws.com/production/';
    const uriGenerateAscii = BASE_URI_GENERATE_ASCII + getOutputHandler(option);

    try {
      const params: { [key: string]: string | number | boolean } = {};

      Object.keys(settings).forEach(key => {
        if(!settings[key]) return;
        if(['pixelCountHorizontal', 'pixelCountVertical', 'gap'].includes(key)) {
          const setting = parseInt(settings[key]);
          if(!isNaN(setting)) params[key] = setting;
        } else {
          params[key] = settings[key];
        }
      });

      const { data } = await axios({
        url: uriGenerateAscii,
        method: 'POST',
        data: {
          image: targetImage, options: params
        }
      });

      if(data.ascii && typeof onAsciiGenerated === 'function') {
        onAsciiGenerated(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleSettingsInputUpdate(key: keyof AsciiSettings, target?: HTMLInputElement, isNumber?: boolean) {
    if(!target) return;

    let value: string | number = target.value;

    if(isNumber) {
      value = value.replace(/\D+/g, '');
      if(isNaN(parseInt(value))) value = '';
    }
    
    setSettings(s => ({ ...s, [key]: value as string }));
  }
  
  return(
    <Section>
      <S.Container>
        <Select<SelectOption> placeholder="Select ascii type..." options={generateOptions} onSelect={selected => selectOption((selected as any).value || '')} isSearchable={false} className="generate-select" classNamePrefix="generate-select" instanceId="generate-select" value={generateOptions.find(o => o.value === option)} />

          <S.SettingsContainer onSubmit={handleOnAsciiGenerate} disabled={!option}>
            <S.SettingsRow>
              <S.SettingsInput onChange={e => handleSettingsInputUpdate('pixelCountHorizontal', e.currentTarget, true)} bordered placeholder="Pixel Width" value={(settings.pixelCountHorizontal || "").toString()}/>
              <S.SettingsInput onChange={e => handleSettingsInputUpdate('pixelCountVertical', e.currentTarget, true)} bordered placeholder="Pixel Height" value={(settings.pixelCountVertical || "").toString()}/>
            </S.SettingsRow>
            <S.SettingsRow disabled={option === 'text'}>
              <Select placeholder="Select color mode" options={colorModeOptions} onSelect={selected => setSettings(s => ({ ...s, colorMode: (selected as any).value || '' }))} isSearchable={false} className="color-mode" classNamePrefix="color-mode" instanceId="color-mode"/>
            </S.SettingsRow>
            <S.SettingsRow>
              <S.SettingsCharacterRamp onChange={e => handleSettingsInputUpdate('characterRamp', e.currentTarget)} bordered placeholder={`Optional custom ascii characters from the darkest to the lightest ex: "BS#&@$%*!:. "`} value={(settings.characterRamp || "").toString()} />
            </S.SettingsRow>
            <Button loading submitButton>Generate</Button>
          </S.SettingsContainer>

      </S.Container>
    </Section>
  );
}

export default SettingsSelect;
