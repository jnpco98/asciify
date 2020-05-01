import styled, { css } from 'styled-components';
import { regularFontSize } from '../../../utilities/mixins';
import TextAreaAutoResize from 'react-autosize-textarea';

export const TextArea = styled(TextAreaAutoResize)`
  ${regularFontSize};
`;

type InputProps = {
  bordered?: boolean;
}

export const Input = styled.input<InputProps>`
  ${regularFontSize};

  ${({ theme, ...props }) =>
    props.bordered && css`
      border: 0.0625rem solid ${theme.colors.border};
      border-radius: 0.2rem;
    `
  };
  padding: 0.5rem;
`;
