import styled from "styled-components";
import Input, { InputType } from "@components/atom/Input";
import Switch from "@components/atom/Switch";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.8rem;
  padding-bottom: 2.2rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 0.8rem;
  z-index: 2;
  position: relative;
  width: 100%;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;


type InputProps = {
  bordered?: boolean;
  placeholder?: string;
}

export const SettingsDivider = styled.div`
  width: 100%;
  height: 0.0625rem;
  margin-top: 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const SettingsInput = styled(Input)<InputProps>``;

export const SettingsCharacterRamp = styled(Input).attrs({ inputType: InputType.Multi })<InputProps>`
  height: 7rem;
`;

export const AspectRatioSwitch = styled(Switch).attrs({ name: 'ascii-options-aspect-ratio' })`
  margin-bottom: 1rem;
  margin-left: auto;
`;

export const SettingsRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;

  & > * {
    width: 100%;

    & + * {
      margin-left: 0.5rem;
    }
  }
`;