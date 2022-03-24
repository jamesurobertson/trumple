import styled, { keyframes, css } from "styled-components";
import { status } from "../constants";

const flip = (props) => keyframes`
  0% {
    transform: rotateX(0deg);
    background-color: ${props.theme.backgroundColor};
    border-color: ${props.theme.tileBorderFilled};
    color: ${props.theme.tileColorCurrent};
  }

  50%{
    background-color: ${props.cellColor};
    border-color: ${props.cellColor};
    color: ${props.theme.tileColorFilled};

  }
  100% {
    transform: rotateX(180deg);
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
    }
    100% {
        transform: rotateX(180deg);
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
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
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
  ${({ hasLetter, isCurrentRow }) =>
    hasLetter && isCurrentRow && onFillAnimation}
  color: ${({ isCurrentRow, theme }) =>
    isCurrentRow ? theme.tileColorCurrent : theme.tileColorFilled};
  ${({ isRevealing }) => isRevealing && flipAnimation}
  border: 2px solid
    ${({ hasLetter, cellColor, theme }) =>
    hasLetter
      ? cellColor
        ? cellColor
        : theme.tileBorderFilled
      : theme.tileBorderUnfilled};
  background-color: ${({ cellColor }) =>
    cellColor === status.unguessed ? "white" : cellColor};
`;
const Tile = ({
  cellColor,
  letter,
  isRevealing,
  animationDelay,
  isCurrentRow = false,
}) => {
  return (
    <TileContainer
      cellColor={cellColor}
      isRevealing={isRevealing}
      animationDelay={animationDelay}
      hasLetter={!!letter}
      isCurrentRow={isCurrentRow}
    >
      <LetterContainer
        isRevealing={isRevealing}
        animationDelay={animationDelay}
      >
        {letter}
      </LetterContainer>
    </TileContainer>
  );
};

export default Tile;
