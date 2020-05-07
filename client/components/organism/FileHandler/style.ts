import styled, { css } from 'styled-components';
import Button from '@components/atom/Button';
import Text, { TextType } from '@components/atom/Text';
import Input from '@components/atom/Input';
import FileDrop from '@components/organism/FileDrop';
import * as M from '@utilities/media';

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

  ${M.MEDIA_XSMALL} {
    padding: 3rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PrimaryContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SecondardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UrlWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0.7rem 0 1.5rem;
`;

type InputProps = {
  bordered?: boolean;
  placeholder?: string;
};

export const UrlInput = styled(Input)<InputProps>`
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const UrlButton = styled(Button)`
  width: 100%;
`;

export const ImageDrop = styled(FileDrop)`
  margin-bottom: 0.4rem;
`;

type BoxActive = {
  active?: boolean;
};

export const InstructionBox = styled.div<BoxActive>`
  width: 100%;
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.2rem;

  height: 0;
  opacity: 0;
  margin: 0;

  transition: all 0.3s ease;

  ${(props) =>
    props.active &&
    css`
      height: 10rem;
      opacity: 1;
      margin: 1rem 0;
    `};
`;

export const DemoLink = styled(Text).attrs({ textType: TextType.Anchor })`
  align-self: flex-start;
`;
