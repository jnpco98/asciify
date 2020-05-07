import styled from 'styled-components';
import Text, { TextType } from '../Text';

type SwitchProps = {
  className?: string;
};

export const Container = styled.div<SwitchProps>`
  display: flex;
  align-items: center;
`;

type CheckboxProps = {
  name: string;
};

export const Checkbox = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
  position: relative;
  width: 3rem;
  height: 1.5rem;
  appearance: none;
  background: ${({ theme }) => theme.colors.disabled};
  border-radius: 1rem;
  box-shadow: inset 0 0 0.1rem rgba(0, 0, 0, 0.2);
  transition: 0.5s ease;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 0;
    left: -0.0625rem;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    transform: scale(1.1);
    transition: 0.5s ease;
  }

  &:checked {
    background: ${({ theme }) => theme.colors.primary};

    &:before {
      left: 1.5625rem;
    }
  }
`;

type LabelProps = {
  htmlFor: string;
};

export const Label = styled(Text).attrs({ textType: TextType.Label })<LabelProps>`
  margin-right: 1rem;
`;
