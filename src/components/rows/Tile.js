import styled, { keyframes, css } from 'styled-components';
import { flipAnimationDurationMS, winAnimationDurationMS } from '../../config';

const onWin = () => keyframes`
  0% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }

  40%{
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
  }
  80% {
    transform: translateY(10%);
    -webkit-transform: translateY(10%);
  }

  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
`;

const winAnimation = ({ winAnimationDelay, winAnimationDuration }) =>
css`
    animation: ${onWin} ${`${winAnimationDuration}ms`} ease-in-out;
    animation-delay: ${winAnimationDelay};
  `

const flip = ({ theme, backgroundColor }) => keyframes`
  0% {
    transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
    background-color: ${theme.backgroundColor};
    border-color: ${theme.borderColor};
    color: ${theme.color};
  }

  50%{
    background-color: ${theme.backgroundColor};
    border-color: ${theme.borderColor};
    color: ${theme.colorSecondary};
  }
  50.1% {
    background-color: ${backgroundColor};
    border-color: ${backgroundColor};
    color: ${theme.colorSecondary};
  }

  100% {
    transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
  }
`;

const flipAnimation = ({ animationDelay, animationDuration }) =>
  css`
    animation: ${flip} ${`${animationDuration}ms`} linear backwards;
    animation-delay: ${animationDelay};
  `;

const offsetFlip = () => keyframes`
    0% {
        transform: rotateX(0deg);
        -webkit-transform: rotateX(0deg);
    }
    100% {
        transform: rotateX(180deg);
        -webkit-transform: rotateX(180deg);
    }
`;

const offSetFlipAnimation = ({ animationDelay, animationDuration }) =>
  css`
    animation: ${offsetFlip} ${`${animationDuration}ms`} linear backwards;
    animation-delay: ${animationDelay};
  `;

const onFill = () => keyframes`
  0% {
      transform: scale(1);
      -webkit-transform: scale(1);
  }

  50% {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
  }

  100% {
      transform: scale(1);
      -webkit-transform: scale(1);
  }
`;

const onFillAnimation = () => css`
  animation: ${onFill} 100ms linear;
`;

const LetterContainer = styled.div`
  ${({ isRevealing }) => isRevealing && offSetFlipAnimation}
`;

const TileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
  color: ${({ isCurrentRow, theme }) => (isCurrentRow ? theme.color : theme.colorSecondary)};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 2px solid
    ${({ hasLetter, backgroundColor, theme }) => {
      if (!hasLetter) return theme.borderColorSecondary;
      return !!backgroundColor ? backgroundColor : theme.borderColor;
    }};
  ${({ hasLetter, isCurrentRow, inBoard }) => inBoard && hasLetter && isCurrentRow && onFillAnimation}
  ${({ isRevealing, triggerWinAnimation }) => isRevealing && !triggerWinAnimation && flipAnimation};
  ${({ triggerWinAnimation }) => triggerWinAnimation && winAnimation};
`;

const Tile = ({ backgroundColor, letter, isRevealing, animationDelay, isCurrentRow = false, inBoard, triggerWinAnimation, winAnimationDelay }) => (
  <TileContainer
    backgroundColor={backgroundColor}
    isRevealing={isRevealing}
    animationDelay={animationDelay}
    animationDuration={flipAnimationDurationMS}
    winAnimationDelay={winAnimationDelay}
    winAnimationDuration={winAnimationDurationMS}
    hasLetter={!!letter}
    inBoard={inBoard}
    isCurrentRow={isCurrentRow}
    triggerWinAnimation={triggerWinAnimation}
  >
    <LetterContainer
      isRevealing={isRevealing}
      animationDelay={animationDelay}
      animationDuration={flipAnimationDurationMS}
    >
      {letter}
    </LetterContainer>
  </TileContainer>
);
export default Tile;
