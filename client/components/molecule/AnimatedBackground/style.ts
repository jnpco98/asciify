import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export const Container = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  color: #fff;
  background: ${({ theme }) => theme.colors.background};
  background-size: 400% 400%;
  animation: ${animate} 10s ease-in-out infinite;
`;