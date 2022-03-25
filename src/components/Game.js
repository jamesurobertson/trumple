import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import FilledRow from "./FilledRow";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";
import { letters, status } from "../constants";
import { isValidWord } from "../utils";
import img from "../trump.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
`;

const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  height: 420px;
  width: 350px;
`;

const TrumpImg = styled.div`
  background-image: url(${img});
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
  color: ${({ theme }) => theme.errorColor};
  font-weight: bold;
  background-color: ${({ theme }) => theme.errorBackgroundColor};
  z-index: 100;
`;

const Game = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [isWon, setIsWon] = useState(false);
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
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
      return;
    }

    console.log(currentGuess);
    if (currentGuess === "TRUMP") {
      setIsWon(true);
    }
    setIsRevealing(true);
    setGuesses((curr) => [...curr, currentGuess]);
    setCurrentGuess("");
    setTimeout(() => {
      setIsRevealing(false);
    }, 5 * 350);
  }, [currentGuess, errorMsg, guesses, isRevealing]);

  const onDeletePress = useCallback(() => {
    setCurrentGuess((curr) => curr.slice(0, -1));
  }, []);

  useEffect(() => {
    if (isRevealing) return;
    setKeyboardColors((curr) => {
      const copy = { ...curr };
      if (guesses.length === 0) return copy;
      [...guesses[guesses.length - 1]].forEach((char, i) => {
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
    <Container>
      {isWon && !isRevealing && <TrumpImg />}
      {errorMsg && <ErrorMsgContainer>{errorMsg}</ErrorMsgContainer>}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      </div>
      <Keyboard
        onAddLetter={onAddLetter}
        onEnterPress={onEnterPress}
        onDeletePress={onDeletePress}
        guesses={guesses}
        keyboardColors={keyboardColors}
      />
    </Container>
  );
};

export default Game;
