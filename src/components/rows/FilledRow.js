import styled, { keyframes, css } from "styled-components";
import Tile from "./Tile";
import { guessColor } from "../../utils";
import { answerWord } from "../../config";

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

const animation = (props) =>
  css`
    animation: ${shake} 0.6s linear;
  `;

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  ${({ shakeErr }) => shakeErr && animation}
`;

const FilledRow = ({ winningRow, word, isRevealing }) => {
  const cellColors = [...word].map((_, i) => guessColor(answerWord, word, i));
  return (
    <RowContainer>
      {[...word].map((letter, tileIdx) => (
        <Tile
          key={tileIdx}
          animationDelay={`${tileIdx * 350}ms`}
          isRevealing={isRevealing}
          cellColor={cellColors[tileIdx]}
          letter={letter}
        ></Tile>
      ))}
    </RowContainer>
  );
};

export default FilledRow;
