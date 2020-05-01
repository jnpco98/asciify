import styled, { css } from 'styled-components';
import { ButtonType } from '.';
import { center, FLEX_ALIGN_MAIN } from '@utilities/mixins';
import * as M from '@utilities/media';

type ButtonProps = {
  buttonType?: ButtonType;
};

const Success = css`
  color: ${({ theme }) => theme.colors.success};
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.success};
  }
`;

const Warning = css`
  color: ${({ theme }) => theme.colors.warning};
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.warning};
  }
`;

const Danger = css`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.error};
  }
`;

export const Container = styled.a<ButtonProps>`
  ${center(FLEX_ALIGN_MAIN)};
  color: ${({ theme }) => theme.colors.info};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.6rem 1.4rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  transition: all 0.1s ease-in;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.secondary};
  border-radius: 0.3rem;
  text-align: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.primaryCompliment};
  }

  ${props => props.buttonType === ButtonType.Success && Success};
  ${props => props.buttonType === ButtonType.Warning && Warning};
  ${props => props.buttonType === ButtonType.Error && Danger};

  border: none;

  ${M.MEDIA_SMALL} {
    padding: 0.7rem 1.5rem;
    font-size: 0.75rem;
  }

  ${M.MEDIA_LARGE} {
    padding: 0.75rem 2rem;
    font-size: 0.8rem;
  }
`;