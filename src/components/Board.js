import { useMemo } from 'react';
import styled from 'styled-components';
import FilledRow from './rows/FilledRow';
import EmptyRow from './rows/EmptyRow';
import CurrentRow from './rows/CurrentRow';
import WinningImageOverlay from './WinningImageOverlay';
import { gridGap, maxGuesses, wordLength, tileSize } from '../config';

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

const Board = ({ completedRowValues, currentRowValue, isRevealing, hasError, gap = gridGap, showOverlayImg }) => {
  const { filledRows, emptyRows } = useMemo(() => {
    const _filledRows = completedRowValues.map((rowValue, idx) => (
      <FilledRow key={idx} rowValue={rowValue} isRevealing={isRevealing && completedRowValues.length - 1 === idx} />
    ));

    const rows =
      completedRowValues.length < maxGuesses - 1 ? Array.from(Array(maxGuesses - 1 - completedRowValues.length)) : [];
    const _emptyRows = rows.map((_, idx) => <EmptyRow key={idx} />);

    return { emptyRows: _emptyRows, filledRows: _filledRows };
  }, [completedRowValues, isRevealing]);

  const gridHeight = (maxGuesses - 1) * gridGap + maxGuesses * tileSize;
  const gridWidth = (wordLength - 1) * gridGap + wordLength * tileSize;
  return (
    <Container>
      <BoardGrid maxGuesses={maxGuesses} gridHeight={gridHeight} gridWidth={gridWidth} gridGap={gap}>
        {showOverlayImg && <WinningImageOverlay />}
        {filledRows}
        {completedRowValues.length < maxGuesses && <CurrentRow rowValue={currentRowValue} hasError={hasError} />}
        {emptyRows}
      </BoardGrid>
    </Container>
  );
};

export default Board;
