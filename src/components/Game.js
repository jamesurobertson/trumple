import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import FilledRow from "./FilledRow";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";
import { letters, status } from "../constants";
import { isValidWord } from "../utils";

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
  const [keyboardColors, setKeyboardColors] = useState(() => {
    return letters.reduce((map, letter) => {
      map[letter] = status.unguessed;
      return map;
    }, {});
  });

  const onAddLetter = useCallback(
    (letter) => {
      if (isRevealing) return;
      if (`${currentGuess + letter}`.length > 5) return;
      setCurrentGuess(currentGuess + letter);
    },
    [currentGuess, isRevealing]
  );

  const onEnterPress = useCallback(() => {
    if (isRevealing || errorMsg) return;
    if (guesses.length === 6) return;
    const [valid, err] = isValidWord(currentGuess);
    if (!valid) {
      setErrorMsg(err);
      return;
    }

    setIsRevealing(true);
    setGuesses((curr) => [...curr, currentGuess]);
    setCurrentGuess("");

    setTimeout(() => {
      setIsRevealing(false);
    }, 5 * 300);
  }, [currentGuess, errorMsg, guesses, isRevealing]);

  const onDeletePress = useCallback(() => {
    setCurrentGuess((curr) => curr.slice(0, -1));
  }, []);

  useEffect(() => {
    if (errorMsg.length === 0) return;
    setTimeout(() => {
      setErrorMsg("");
    }, 1200);
  }, [errorMsg]);

  useEffect(() => {
    if (isRevealing) return;
    setKeyboardColors((curr) => {
      const copy = { ...curr };
      [...(guesses[guesses.length - 1] || "")].forEach((char, i) => {
        if (copy[char] === status.green) return;
        if ("TRUMP"[i] === char) {
          copy[char] = status.green;
        } else if ("TRUMP".includes(char)) {
          copy[char] = status.yellow;
        } else {
          copy[char] = status.gray;
        }
      });
      return copy;
    });
  }, [guesses, isRevealing]);

  const emptyRows =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <GameContainer>
      {errorMsg && <ErrorMsgContainer>{errorMsg}</ErrorMsgContainer>}
      <Container>
        <Board>
          {guesses.map((word, i) => (
            <FilledRow
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
        keyboardColors={keyboardColors}
      />
    </GameContainer>
  );
};

export default Game;
