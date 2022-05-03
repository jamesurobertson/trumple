import styled, { keyframes, css } from "styled-components";
import Tile from "./Tile";
import { guessColor } from "../../utils";
import { answerWord, wordLength } from "../../config";

const shake = keyframes`
    10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const animation = () =>
  css`
    animation: ${shake} 0.6s linear;
  `;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ length }) => `repeat(${length}, 1fr)`};
  grid-gap: 5px;
  ${({ shakeErr }) => shakeErr && animation}
`;

const FilledRow = ({ rowValue, isRevealing }) => {
  const backgroundColors = [...rowValue].map((_, idx) => guessColor(answerWord, rowValue, idx));
  return (
    <RowContainer length={wordLength}>
      {[...rowValue].map((char, idx) => (
        <Tile
          key={idx}
          animationDelay={`${idx * 350}ms`}
          isRevealing={isRevealing}
          backgroundColor={backgroundColors[idx]}
          letter={char}
        ></Tile>
      ))}
    </RowContainer>
  );
};

export default FilledRow;
