import React from 'react';
import { OptionsType, ValueType } from 'react-select';
import * as S from './style';
import { SelectOption } from '@components/organism/SettingsSelect';

type Props<T> = {
  className?: string;
  classNamePrefix?: string;
  options: OptionsType<T>;
  onSelect?: (selected: ValueType<T>) => void;
  defaultValue?: SelectOption;
  placeholder?: string;
  instanceId: string;
  isSearchable?: boolean;
}

function Select<T>(props: Props<T>) {
  const { className, options, onSelect: handleSelect, defaultValue, classNamePrefix, instanceId, placeholder, isSearchable } = props;
  return(
    <S.Container className={className} classNamePrefix={classNamePrefix} options={options} defaultValue={defaultValue} onChange={handleSelect} instanceId={instanceId} placeholder={placeholder} isSearchable={isSearchable}/>
  );
}

export default Select;