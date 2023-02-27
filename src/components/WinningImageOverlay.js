import styled, { keyframes, css } from 'styled-components';
import { winAnimationDelay, winAnimationDurationMS, wordLength } from "../config";

const totalWinAnimationTimeMS = (wordLength - 1) * winAnimationDelay + winAnimationDurationMS;

const onAppear = () => keyframes`
  0% {
    visibility: hidden;
  }

  99% {
    visibility: hidden;
  }

  100% {
    visibility: visible;
  }
`;

const onAppearAnimation = () => css`
  animation: ${onAppear} ${`${totalWinAnimationTimeMS}ms`};
  animation-fill-mode: forwards;
`;

const ImageOverlay = styled.div`
  background-image: url(/images/trump.png);
  background-size: cover;
  position: absolute;
  inset: 0;
  z-index: 10;
  visibility: hidden;
  ${onAppearAnimation};
`;

const WinningImageOverlay = () => <ImageOverlay />;

export default WinningImageOverlay;
