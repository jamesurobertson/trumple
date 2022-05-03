import { useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import { letters, status } from "../constants";
import { isValidWord } from "../utils";
import { answerWord, maxGuesses } from "../config";
import Board from "./Board";
import Toast from "./Toast";
import Keyboard from "./Keyboard";
import WinningImageOverlay from "./WinningImageOverlay";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
`;

const initialState = {
  isWon: false,
  isRevealing: false,
  guesses: [],
  currentGuess: "",
  toastMessage: "",
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
        return { ...state, toastMessage: err };
      }
      return {
        ...state,
        guesses: [...state.guesses, state.currentGuess],
        currentGuess: "",
        isWon: state.currentGuess === answerWord,
        isRevealing: true,
      };
    case "updateKeyboardColors":
      const newColors = { ...state.keyboardColors };
      [...state.guesses[state.guesses.length - 1]].forEach((char, i) => {
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
    case "clearToast":
      return { ...state, toastMessage: "" };
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, toastMessage } = state;

  const onAddLetter = useCallback((letter) => dispatch({ type: "addLetter", payload: letter }), []);
  const onEnter = useCallback(() => dispatch({ type: "addWord" }), []);
  const onDelete = useCallback(() => dispatch({ type: "deleteLetter" }), []);
  const onToastClear = useCallback(() => dispatch({ type: "clearToast" }), []);
  const updateKeyboardColors = () => dispatch({ type: "updateKeyboardColors" });

  // updater keyboard colors after tile letters are revealed / flipped
  useEffect(() => {
    if (guesses.length === 0) return;
    setTimeout(updateKeyboardColors, 5 * 350);
  }, [guesses]);

  if (isWon && !isRevealing) return <WinningImageOverlay />;
  return (
    <Container>
      {toastMessage.length > 0 && <Toast message={toastMessage} timeout={1000} onClear={onToastClear} />}
      <Board {...{ guesses, currentGuess, isRevealing }} hasError={toastMessage.length > 0} />
      <Keyboard {...{ onAddLetter, onEnter, onDelete, keyboardColors }} />
    </Container>
  );
};

export default Game;
