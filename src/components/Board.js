import styled from "styled-components";
import FilledRow from "./FilledRow";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";
import { maxGuesses } from "../config";
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
  grid-gap: 5px;
  height: 350px;
  width: 280px;
`;

const Board = ({ guesses, currentGuess, errorMsg, isRevealing }) => {
  const { emptyRows, filledRows } = useMemo(() => {
    const rows = guesses.length < maxGuesses - 1 ? Array.from(Array(maxGuesses - 1 - guesses.length)) : [];
    const _emptyRows = rows.map((_, i) => <EmptyRow key={i} />);

    const _filledRows = guesses.map((word, i) => (
      <FilledRow key={i} word={word} isRevealing={isRevealing && guesses.length - 1 === i} />
    ));
    return { emptyRows: _emptyRows, filledRows: _filledRows };
  }, [guesses, isRevealing]);

  return (
    <Container>
      <BoardGrid maxGuesses={maxGuesses}>
        {filledRows}
        {guesses.length < maxGuesses && <CurrentRow word={currentGuess} hasError={errorMsg} />}
        {emptyRows}
      </BoardGrid>
    </Container>
  );
};

export default Board;
