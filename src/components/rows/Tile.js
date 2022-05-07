import styled, { keyframes, css } from "styled-components";
import { status } from "../../config";

const flip = (props) => keyframes`
  0% {
    transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
    background-color: ${props.theme.backgroundColor};
    border-color: ${props.theme.borderColor};
    color: ${props.theme.color};
  }

  50%{
    background-color: ${props.backgroundColor};
    color: ${props.theme.colorSecondary};
  }
  
  100% {
    transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
  }
`;

const flipAnimation = (props) =>
  css`
    animation: ${flip} 350ms linear backwards;
    animation-delay: ${props.animationDelay};
  `;

const offsetFlip = (props) => keyframes`
    0% {
        transform: rotateX(0deg);
        -webkit-transform: rotateX(0deg);
    }
    100% {
        transform: rotateX(180deg);
        -webkit-transform: rotateX(180deg);
    }
`;

const offSetFlipAnimation = (props) =>
  css`
    animation: ${offsetFlip} 350ms linear backwards;
    animation-delay: ${props.animationDelay};
  `;

const onFill = (props) => keyframes`
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

const onFillAnimation = (props) => css`
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
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  transition: transform 0.25s ease-in-out;
  user-select: none;
  ${({ hasLetter, isCurrentRow }) => hasLetter && isCurrentRow && onFillAnimation}
  color: ${({ isCurrentRow, theme }) => (isCurrentRow ? theme.color : theme.colorSecondary)};
  ${({ isRevealing }) => isRevealing && flipAnimation};
  border: 2px solid
    ${({ hasLetter, backgroundColor, theme }) =>
      hasLetter ? (backgroundColor ? backgroundColor : theme.borderColor) : theme.borderColorSecondary};
  background-color: ${({ backgroundColor }) => (backgroundColor === status.unguessed ? "white" : backgroundColor)};
`;

const Tile = ({ backgroundColor, letter, isRevealing, animationDelay, isCurrentRow = false }) => (
  <TileContainer
    backgroundColor={backgroundColor}
    isRevealing={isRevealing}
    animationDelay={animationDelay}
    hasLetter={!!letter}
    isCurrentRow={isCurrentRow}
  >
    <LetterContainer isRevealing={isRevealing} animationDelay={animationDelay}>
      {letter}
    </LetterContainer>
  </TileContainer>
);

export default Tile;
