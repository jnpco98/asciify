import React, { useState } from 'react';
import Section from '@layout/Section';
// import Select, { OptionsType, ValueType, ActionMeta, Theme } from 'react-select';
import { OptionsType, ValueType, Theme } from 'react-select';
import Select from '@components/atom/Select';
import * as S from './style';

export type SelectOption = { value: string; label: string };

const generateOptions: OptionsType<SelectOption> = [
  { value: 'Text', label: 'Text' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Pixels', label: 'Pixels' }
];

function OptionSelect() {
  const [option, selectOption] = useState<ValueType<SelectOption>>();

  function handleSelect(selected: ValueType<SelectOption>) {
    selectOption(selected);
  }

  return(
    <Section>
      <S.Container>
        <Select options={generateOptions} defaultValue={generateOptions[0]} onSelect={handleSelect} className="generate-select" classNamePrefix="generate-select" instanceId="generate-select"/>
      </S.Container>
    </Section>
  );
}

export default OptionSelect;
