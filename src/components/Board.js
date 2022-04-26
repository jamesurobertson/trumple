import styled from "styled-components";
import FilledRow from "./FilledRow";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";
import { maxGuesses } from "../config";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  height: 350px;
  width: 280px;
`;

const Board = ({ guesses, currentGuess, errorMsg, isRevealing }) => {
  const emptyRows =
    guesses.length < maxGuesses - 1
      ? Array.from(Array(maxGuesses - 1 - guesses.length))
      : [];

  return (
    <Container>
      <BoardGrid>
        {guesses.map((word, i) => (
          <FilledRow
            key={i}
            word={word}
            isRevealing={isRevealing && guesses.length - 1 === i}
          />
        ))}
        {guesses.length < maxGuesses && (
          <CurrentRow word={currentGuess} hasError={errorMsg} />
        )}
        {emptyRows.map((_, i) => (
          <EmptyRow key={i} />
        ))}
      </BoardGrid>
    </Container>
  );
};

export default Board;
