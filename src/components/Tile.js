import styled, { keyframes, css } from "styled-components";
import { status } from "../constants";

const flip = (props) => keyframes`
  0% {
    transform: rotateX(0deg);
    background-color: white;
    border-color: #86888a;
    color: black;
  }

  50%{
    background-color: ${props.cellColor};
    border-color: ${props.cellColor};
  }
  100% {
    transform: rotateX(180deg);
  }
`;

const flipAnimation = (props) =>
  css`
    animation: ${flip} 300ms linear backwards;
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
    animation: ${offsetFlip} 300ms linear backwards;
    animation-delay: ${props.animationDelay};
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
  color: ${({ isCurrentRow }) => (isCurrentRow ? "black" : "white")};
  ${({ isRevealing }) => isRevealing && flipAnimation}
  border: 2px solid
    ${({ cellColor, hasLetter }) => (hasLetter ? cellColor : "#d3d6da")};
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
