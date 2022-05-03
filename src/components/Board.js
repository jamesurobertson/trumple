import styled from "styled-components";
import FilledRow from "./rows/FilledRow";
import EmptyRow from "./rows/EmptyRow";
import CurrentRow from "./rows/CurrentRow";
import { gridGap, maxGuesses, maxWordLength, tileSize } from "../config";
import { useMemo } from "react";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: ${({ maxGuesses }) => `repeat(${maxGuesses}, 1fr)`};
  grid-gap: ${({ gridGap }) => `${gridGap}px`};
  height: ${({ gridHeight }) => `${gridHeight}px`};
  width: ${({ gridWidth }) => `${gridWidth}px`};
  max-width: calc(100% - 20px);
  max-height: calc(100% - 20px);
`;

const Board = ({ guesses, currentGuess, hasError, isRevealing }) => {
  const { filledRows, emptyRows } = useMemo(() => {
    const _filledRows = guesses.map((word, i) => (
      <FilledRow key={i} word={word} isRevealing={isRevealing && guesses.length - 1 === i} />
    ));

    const rows = guesses.length < maxGuesses - 1 ? Array.from(Array(maxGuesses - 1 - guesses.length)) : [];
    const _emptyRows = rows.map((_, i) => <EmptyRow key={i} />);

    return { emptyRows: _emptyRows, filledRows: _filledRows };
  }, [guesses, isRevealing]);

  const gridHeight = (maxGuesses - 1) * gridGap + maxGuesses * tileSize;
  const gridWidth = (maxWordLength - 1) * gridGap + maxWordLength * tileSize;
  return (
    <Container>
      <BoardGrid maxGuesses={maxGuesses} gridHeight={gridHeight} gridWidth={gridWidth} gridGap={gridGap}>
        {filledRows}
        {guesses.length < maxGuesses && <CurrentRow word={currentGuess} hasError={hasError} />}
        {emptyRows}
      </BoardGrid>
    </Container>
  );
};

export default Board;
