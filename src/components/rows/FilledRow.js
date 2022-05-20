import styled, { keyframes, css } from 'styled-components';
import Tile from './Tile';
import { guessColor } from '../../utils';
import { answerWord, flipAnimationDelay, wordLength } from '../../config';

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

const FilledRow = ({ guess, isRevealing, answer = answerWord }) => {
  const backgroundColors = [...guess].map((_, idx) => guessColor(answer, guess, idx));
  return (
    <RowContainer length={wordLength}>
      {[...guess].map((char, idx) => (
        <Tile
          key={idx}
          animationDelay={`${idx * flipAnimationDelay}ms`}
          isRevealing={isRevealing}
          backgroundColor={backgroundColors[idx]}
          letter={char}
        ></Tile>
      ))}
    </RowContainer>
  );
};

export default FilledRow;
