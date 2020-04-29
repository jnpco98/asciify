import styled from 'styled-components';
import { regularFontSize } from '../../../utilities/mixins';

export const DynamicHTMLContainer = styled.div`
  width: 100%;
  ${regularFontSize};
  text-align: left;

  ul {
    list-style: circle;
    padding-left: 2rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;
