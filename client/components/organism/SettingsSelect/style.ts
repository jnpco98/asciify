import styled, { css } from 'styled-components';
import Input, { InputType } from '@components/atom/Input';
import Switch from '@components/atom/Switch';
import Text from '@components/atom/Text';

type SwitchableProps = {
  disabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.8rem 2.8rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 0 0 0.8rem 0.8rem;
  z-index: 2;
  position: relative;
  width: 100%;
`;

export const SettingsContainer = styled.form<SwitchableProps>`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: visible;
  max-height: 40rem;
  opacity: 1;
  margin-top: 0.5rem;

  ${props =>
    props.disabled && css`
      max-height: 0;
      opacity: 0;
    `};
`;

type InputProps = {
  bordered?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & { [P in keyof HTMLInputElement]?: HTMLInputElement[P] };

export const SettingsDivider = styled.div`
  width: 100%;
  height: 0.0625rem;
  margin-top: 1.8rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const SettingsInput = styled(Input)<InputProps & SwitchableProps>`
  transition: all 0.3s ease;
  ${props =>
    props.disabled && css`
      max-height: 0;
      max-width: 0;
      padding: 0;
      margin: 0;
      border: 0;
      opacity: 0;
      overflow: hidden;

      && {
        margin-left: 0;
      }
    `};
`;

export const Subtitle = styled(Text)`
  margin-bottom: 1rem;
`;

export const SettingsCharacterRamp = styled(Input).attrs({ inputType: InputType.Multi })<
  InputProps
>`
  height: 7rem;
`;

export const AspectRatioSwitch = styled(Switch).attrs({
  name: 'ascii-options-aspect-ratio'
})`
  margin-bottom: 1rem;
  margin-left: auto;
`;

export const SettingsRow = styled.div<SwitchableProps>`
  display: flex;
  width: 100%;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  & > * {
    width: 100%;

    & + * {
      margin-left: 0.5rem;
    }
  }

  ${props =>
    props.disabled && css`
      margin-bottom: 0;
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    `};
`;
