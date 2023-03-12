import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
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

const EmptyOverlay = styled.div`
  background-size: cover;
  position: absolute;
  inset: 0;
  z-index: 10;
`;

const ImageOverlay = styled(EmptyOverlay)`
  background-image: url(/images/trump.png);
  ${onAppearAnimation};
`;

const WinningImageOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => setIsVisible((v) => !v);

  return isVisible ? <ImageOverlay onClick={handleClick} /> : <EmptyOverlay onClick={handleClick} />;
};

export default WinningImageOverlay;
