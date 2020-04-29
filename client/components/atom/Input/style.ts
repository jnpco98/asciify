import styled from 'styled-components';
import { regularFontSize } from '../../../utilities/mixins';
import TextAreaAutoResize from 'react-autosize-textarea';

export const TextArea = styled(TextAreaAutoResize)`
  ${regularFontSize};
`;

export const Input = styled.input`
  ${regularFontSize};
`;
