import React from 'react';
import { OptionsType, ValueType } from 'react-select';
import * as S from './style';
import { SelectOption } from '@components/organism/OptionSelect';

type Props<T> = {
  className?: string;
  classNamePrefix?: string;
  options: OptionsType<T>;
  onSelect?: (selected: ValueType<T>) => void;
  defaultValue: SelectOption;
  instanceId: string;
}

function Select<T>(props: Props<T>) {
  const { className, options, onSelect: handleSelect, defaultValue, classNamePrefix, instanceId } = props;
  return(
    <S.Select className={className} classNamePrefix={classNamePrefix} options={options} defaultValue={defaultValue} onChange={handleSelect} instanceId={instanceId} />
  );
}

export default Select;