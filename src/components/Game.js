import { useEffect, useCallback, useReducer } from "react";
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

const initialState = {
  isWon: false,
  isRevealing: false,
  guesses: [],
  currentGuess: "",
  errorMsg: "",
  keyboardColors: letters.reduce((map, letter) => {
    map[letter] = status.unguessed;
    return map;
  }, {}),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addLetter":
      if (state.isRevealing || state.isWon || state.currentGuess.length > 4 || state.guesses.length === maxGuesses) {
        return state;
      }
      return { ...state, currentGuess: state.currentGuess + action.payload };
    case "deleteLetter":
      if (state.currentGuess.length === 0 || state.guesses.length === maxGuesses) return state;
      return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
    case "addWord":
      if (state.isRevealing || state.isWon || state.guesses.length === maxGuesses) return state;
      const [valid, err] = isValidWord(state.currentGuess);
      if (!valid) {
        return { ...state, errorMsg: err };
      }
      return {
        ...state,
        guesses: [...state.guesses, state.currentGuess],
        currentGuess: "",
        isWon: state.currentGuess === answerWord,
        isRevealing: true,
      };
    case "setKeyboardColors":
      const newColors = { ...state.keyboardColors };
      [...action.payload].forEach((char, i) => {
        if (newColors[char] === status.green) return;
        if (answerWord[i] === char) {
          newColors[char] = status.green;
        } else if (answerWord.includes(char)) {
          newColors[char] = status.yellow;
        } else {
          newColors[char] = status.gray;
        }
      }, {});
      return {
        ...state,
        isRevealing: false,
        keyboardColors: newColors,
      };
    case "clearError":
      return { ...state, errorMsg: "" };
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, errorMsg } = state;

  const onAddLetter = useCallback((letter) => dispatch({ type: "addLetter", payload: letter }), []);
  const onEnter = useCallback(() => dispatch({ type: "addWord" }), []);
  const onDelete = useCallback(() => dispatch({ type: "deleteLetter" }), []);

  useEffect(() => {
    //preloading TRUMP image
    const image = new Image();
    image.src = img;
  }, []);

  // Clears Error Message after 1 second
  useEffect(() => {
    if (errorMsg.length === 0) return;
    setTimeout(() => {
      dispatch({ type: "clearError" });
    }, 1000);
  }, [errorMsg]);

  // Sets Keyboard colors after tile letters are revealed / flipped
  useEffect(() => {
    if (guesses.length === 0) return;
    setTimeout(() => {
      dispatch({ type: "setKeyboardColors", payload: guesses[guesses.length - 1] });
    }, 5 * 350);
  }, [guesses]);

  if (isWon && !isRevealing) return <TrumpImg />;
  return (
    <Container>
      {errorMsg && <ErrorMsgContainer>{errorMsg}</ErrorMsgContainer>}
      <Board guesses={guesses} currentGuess={currentGuess} errorMsg={errorMsg} isRevealing={isRevealing} />
      <Keyboard onAddLetter={onAddLetter} onEnter={onEnter} onDelete={onDelete} keyboardColors={keyboardColors} />
    </Container>
  );
};

export default Game;
