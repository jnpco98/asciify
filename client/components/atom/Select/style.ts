import styled, { css } from "styled-components";
import ReactSelect from 'react-select';
import { regularFontSize } from "@utilities/mixins";

type SelectProps = {
  className: string;
  classNamePrefix: string;
}

export const Select = styled(ReactSelect)<SelectProps>`
  ${regularFontSize};

  ${({ theme, ...props }) => css`
      .${props.classNamePrefix}__control {
        &:hover, &--menu-is-open, &--is-focused {
          border-color: ${theme.colors.primary};
          box-shadow: 0 0 0 0.065rem ${theme.colors.primary};
        }
      }
      
      .${props.classNamePrefix}__option {
          &:active, &--is-focused, &--is-selected {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.default};
          }
        }
    `
  };
`;