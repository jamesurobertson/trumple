import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import { words } from "../words";
import Row from "./Row";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";

const GameContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const ErrorMsgContainer = styled.div`
  display: flex;
  position: absolute;
  top: 9.5%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #181a18;
  border-radius: 4px;
  padding: 10px;
  color: white;
  font-weight: bold;
  background-color: #181a18;
`;

const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  height: 420px;
  width: 350px;
`;

const Game = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);

  const onAddLetter = (letter) => {
    if (isRevealing) return;
    if (`${currentGuess}${letter}`.length > 5) return;
    setCurrentGuess(`${currentGuess}${letter}`);
  };

  const isValidWord = (word) => {
    if (word.length < 5) return [false, "Not enough letters."];
    if (!words.includes(word.toLowerCase())) {
      return [false, "Not in word list."];
    }
    return [true];
  };

  const onEnterPress = () => {
    if (isRevealing || errorMsg) return;
    if (guesses.length === 6) return;
    const [valid, err] = isValidWord(currentGuess);
    if (!valid) {
      setErrorMsg(err);
      return;
    }

    setGuesses((curr) => [...curr, currentGuess]);
    setCurrentGuess("");

    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, 5 * 350);
  };
  const onDeletePress = () => {
    setCurrentGuess((curr) => curr.slice(0, -1));
  };

  useEffect(() => {
    if (errorMsg.length === 0) return;
    setTimeout(() => {
      setErrorMsg("");
    }, 1200);
  }, [errorMsg]);

  const emptyRows =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <GameContainer>
      {errorMsg && <ErrorMsgContainer>{errorMsg}</ErrorMsgContainer>}
      <Container>
        <Board>
          {guesses.map((word, i) => (
            <Row
              key={i}
              word={word}
              isRevealing={isRevealing && guesses.length - 1 === i}
            />
          ))}
          {guesses.length < 6 && (
            <CurrentRow word={currentGuess} hasError={errorMsg} />
          )}
          {emptyRows.map((_, i) => (
            <EmptyRow key={i} />
          ))}
        </Board>
      </Container>
      <Keyboard
        onAddLetter={onAddLetter}
        onEnterPress={onEnterPress}
        onDeletePress={onDeletePress}
        guesses={guesses}
      />
    </GameContainer>
  );
};

export default Game;
