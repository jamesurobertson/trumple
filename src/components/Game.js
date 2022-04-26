import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import { letters, status } from "../constants";
import { isValidWord } from "../utils";
import img from "../trump.png";
import { answerWord, maxGuesses } from "../config";
import Board from "./Board";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
`;

const TrumpImg = styled.div`
  background-image: url(${img});
  position: absolute;
  inset: 0;
  display: ${({ show }) => (show ? "block" : "none")};
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
  const [keyboardColors, setKeyboardColors] = useState(
    letters.reduce((map, letter) => {
      map[letter] = status.unguessed;
      return map;
    }, {})
  );

  const onAddLetter = useCallback(
    (letter) => {
      if (isRevealing || isWon) return;
      if (`${currentGuess + letter}`.length > 5) return;
      setCurrentGuess((curr) => curr + letter);
    },
    [currentGuess, isRevealing, isWon]
  );

  const onEnterPress = useCallback(() => {
    if (isRevealing || errorMsg || isWon) return;
    if (guesses.length === maxGuesses) return;

    const [valid, err] = isValidWord(currentGuess);
    if (!valid) {
      setErrorMsg(err);
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
      return;
    }

    if (currentGuess === answerWord) {
      setIsWon(true);
    }

    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, 5 * 350);

    setGuesses((curr) => [...curr, currentGuess]);
    setCurrentGuess("");
  }, [currentGuess, errorMsg, guesses, isRevealing, isWon]);

  const onDeletePress = useCallback(() => {
    setCurrentGuess((curr) => curr.slice(0, -1));
  }, []);

  useEffect(() => {
    if (isRevealing) return;
    if (guesses.length === 0) return;

    setKeyboardColors((curr) => {
      const copy = { ...curr };
      const lastGuess = guesses[guesses.length - 1];

      for (let i = 0; i < lastGuess.length; i++) {
        const char = lastGuess[i];
        if (copy[char] === status.green) continue;
        if (answerWord[i] === char) {
          copy[char] = status.green;
        } else if (answerWord.includes(char)) {
          copy[char] = status.yellow;
        } else {
          copy[char] = status.gray;
        }
      }

      return copy;
    });
  }, [guesses, isRevealing]);

  useEffect(() => {
    //preloading image
    const image = new Image();
    image.src = img;
  }, []);

  return (
    <Container>
      <TrumpImg show={isWon && !isRevealing} />
      {errorMsg && <ErrorMsgContainer>{errorMsg}</ErrorMsgContainer>}
      <Board
        guesses={guesses}
        currentGuess={currentGuess}
        errorMsg={errorMsg}
        isRevealing={isRevealing}
      />
      <Keyboard
        onAddLetter={onAddLetter}
        onEnterPress={onEnterPress}
        onDeletePress={onDeletePress}
        keyboardColors={keyboardColors}
      />
    </Container>
  );
};

export default Game;
