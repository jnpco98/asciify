import styled from "styled-components";

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
`;