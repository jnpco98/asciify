import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/atom/Button';
import { regularFontSize } from '@utilities/mixins';
import { BlockPicker } from 'react-color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.8rem;
  padding-bottom: 0rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 0.8rem 0.8rem 0 0;
  z-index: 2;
  position: relative;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PrimaryContent = styled.div`
  display: flex;
  margin: 1rem 0 1.5rem;

  & > * {
    width: 100%;
    margin-right: 0.7rem;
  }
`;

export const SecondardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColorPicker = styled(BlockPicker)`
  background: ${({ theme }) => theme.colors.background} !important;
`;

export const PreviewImageWrapper = styled.div`
  position: relative;
  padding-bottom: calc(50% - 0.7rem);
  border-radius: 0.2rem;
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
`;

type PreviewProps = {
  visible?: boolean;
};

export const PreviewImage = styled.img<PreviewProps>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  padding: 0.7rem;
  opacity: 0;

  ${({ theme, ...props }) =>
    props.visible &&
    css`
      opacity: 1;
    `};
`;

export const ActionButton = styled(Button)`
  width: 100%;
  margin-bottom: 0.5rem;
`;

type OutputProps = {
  visible?: boolean;
};

export const Output = styled.textarea<OutputProps>`
  ${regularFontSize};
  resize: none;
  height: 0;
  transition: all 0.3s ease;
  opacity: 0;

  ${({ theme }) =>
    css`
      border: none;
      color: ${theme.colors.defaultSubdued};
      border-radius: 0.2rem;

      &:hover,
      &:focus {
        border-color: ${theme.colors.borderHover};
        box-shadow: 0 0 0 0.065rem ${theme.colors.borderHover};
      }
    `};

  ${({ theme, ...props }) =>
    props.visible &&
    css`
      padding: 0.5rem;
      height: 10rem;
      margin: 1rem 0;
      border: 0.0625rem solid ${theme.colors.border};
      opacity: 1;
    `};
`;

export const CloseIcon = styled(FontAwesomeIcon).attrs({ icon: faTimes })`
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  color: ${({ theme }) => theme.colors.defaultSubdued};
  cursor: pointer;
`;
