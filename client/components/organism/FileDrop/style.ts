import styled, { css } from 'styled-components';
import Text from '@components/atom/Text';

type FileProps = {
  isDragAccept?: boolean;
  isDragReject?: boolean;
};

export const Container = styled.div<FileProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.9rem 1rem;
  border-width: 0.125rem;
  border-radius: 0.125rem;
  border-style: dashed;
  background-color: ${({ theme }) => theme.colors.background};
  transition: border 0.1s ease;
  text-align: center;
  cursor: pointer;

  ${({ theme, ...props }) =>
    (props.isDragAccept &&
      css`
        color: ${theme.colors.default};
        border-color: ${theme.colors.default};
      `) ||
    (props.isDragReject &&
      css`
        color: ${theme.colors.error};
        border-color: ${theme.colors.error};
      `) ||
    css`
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};

      &:hover {
        color: ${theme.colors.primaryCompliment};
        border-color: ${theme.colors.primaryCompliment};
      }
    `};
`;

export const FileNotif = styled(Text)``;
