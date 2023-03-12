import { useMemo } from "react";
import styled from "styled-components";
import FilledRow from "./rows/FilledRow";
import EmptyRow from "./rows/EmptyRow";
import CurrentRow from "./rows/CurrentRow";
import WinningImageOverlay from "./WinningImageOverlay";
import { gridGap, maxGuesses, wordLength, tileSize } from "../config";
import { useGameState } from "../contexts/GameStateContext";
import { isGameOver } from "../utils";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const BoardGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: ${({ maxGuesses }) => `repeat(${maxGuesses}, 1fr)`};
  grid-gap: ${({ gridGap }) => `${gridGap}px`};
  height: ${({ gridHeight }) => `${gridHeight}px`};
  width: ${({ gridWidth }) => `${gridWidth}px`};
  max-width: calc(100% - 20px);
  max-height: calc(100% - 20px);
`;

const Board = () => {
  const { gameState } = useGameState();
  const { guesses, currentGuess, isRevealing, toastMessage, triggerWinAnimation } = gameState;

  const hasError = toastMessage.length > 0 && !isGameOver(gameState);

  const { filledRows, emptyRows } = useMemo(() => {
    const _filledRows = guesses.map((guess, idx) => (
      <FilledRow
        key={idx}
        triggerWinAnimation={triggerWinAnimation}
        guess={guess}
        isRevealing={isRevealing && guesses.length - 1 === idx}
      />
    ));

    const _emptyRows = (guesses.length < maxGuesses - 1 ? Array.from(Array(maxGuesses - 1 - guesses.length)) : []).map(
      (_, idx) => <EmptyRow key={idx} />
    );

    return { emptyRows: _emptyRows, filledRows: _filledRows };
  }, [guesses, isRevealing, triggerWinAnimation]);

  const totalGapHeight = (maxGuesses - 1) * gridGap;
  const gridHeight = totalGapHeight + maxGuesses * tileSize;

  const totalGapWidth = (wordLength - 1) * gridGap;
  const gridWidth = totalGapWidth + wordLength * tileSize;
  return (
    <Container>
      <BoardGrid maxGuesses={maxGuesses} gridHeight={gridHeight} gridWidth={gridWidth} gridGap={gridGap}>
        {triggerWinAnimation && <WinningImageOverlay />}
        {filledRows}
        {guesses.length < maxGuesses && <CurrentRow currentGuess={currentGuess} hasError={hasError} />}
        {emptyRows}
      </BoardGrid>
    </Container>
  );
};

export default Board;
