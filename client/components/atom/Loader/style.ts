import styled, { keyframes, css } from 'styled-components';

const FulRotationKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: block;
    position: absolute;
    width: 1.8rem;
    height: 1.8rem;
    margin: auto;
    border-radius: 50%;
    animation: ${FulRotationKeyframes} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    
    ${({ theme }) => css`
      border: 0.187rem solid ${theme.colors.default};
      border-color: ${theme.colors.default} transparent transparent transparent;
    `}
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export const DualRing = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${FulRotationKeyframes} 1.2s linear infinite;
  }
`;

const EllipsisStartKeyFrames = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const EllipsisMiddleKeyFrames = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const EllipsisEndKeyFrames = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: ${EllipsisStartKeyFrames} 0.6s infinite;
  }

  div:nth-child(2) {
    left: 8px;
    animation: ${EllipsisMiddleKeyFrames} 0.6s infinite;
  }

  div:nth-child(3) {
    left: 32px;
    animation: ${EllipsisMiddleKeyFrames} 0.6s infinite;
  }

  div:nth-child(4) {
    left: 56px;
    animation: ${EllipsisEndKeyFrames} 0.6s infinite;
  }
`;
