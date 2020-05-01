import styled, { css } from "styled-components";
import ReactSelect from 'react-select';
import { regularFontSize } from "@utilities/mixins";

type SelectProps = {
  className: string;
  classNamePrefix: string;
  placeholder?: string;
}

export const Container = styled(ReactSelect)<SelectProps>`
  ${regularFontSize};

  ${({ theme, ...props }) => css`
      .${props.classNamePrefix}__control {
        border-color: ${theme.colors.border};
        
        &--menu-is-open, &--is-focused {
          border-color: ${theme.colors.primary};
          box-shadow: 0 0 0 0.065rem ${theme.colors.primary};
        }

        &:hover {
          border-color: ${theme.colors.borderHover};
          box-shadow: 0 0 0 0.065rem ${theme.colors.borderHover};
          cursor: pointer;
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