import { useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import { maxGuesses, wordLength } from "../config";
import Board from "./Board";
import Toast from "./Toast";
import Keyboard from "./Keyboard";
import Modal from "./Modals/Modal";
import StatsModal from "./Modals/StatsModal/StatsModal";
import * as GameState from "../reducers/GameState";
import { useStats } from "../contexts/StatsContext";
import FirstTimeUserModal from "./FirstTimeUserModal";

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
  isFirstTimeUser: false
};

const initializer = (initialValue) => JSON.parse(localStorage.getItem("gameState")) || initialValue;

const reducer = (state, action) => {
  switch (action.type) {
    case "addLetter":
      if (
        state.isRevealing ||
        state.isWon ||
        state.currentGuess.length >= wordLength ||
        state.guesses.length === maxGuesses
      ) {
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
      const lastWord = state.guesses[state.guesses.length - 1];
      [...lastWord].forEach((char, i) => {
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
    case "toastMessage":
      return { ...state, toastMessage: action.payload };
    case "firstTimeUser":
      const firstTimeUser = action.payload;
      localStorage.setItem("first-time-user", firstTimeUser);
      return { ...state, isFirstTimeUser: firstTimeUser };
    default:
      return state;
  }
};

const Game = () => {
  const [gameState, gameDispatch] = useReducer(GameState.reducer, GameState.initialState, GameState.initializer);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, toastMessage, isFirstTimeUser } = gameState;


  const { statsModalIsOpen, toggleStatsModal, openStatsModal, statsDispatch, statsState } = useStats();
  const gameIsOver = guesses.length === maxGuesses || isWon;

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const onAddLetter = useCallback((letter) => gameDispatch({ type: "addLetter", payload: letter }), []);
  const onEnter = useCallback(() => gameDispatch({ type: "addWord" }), []);
  const onDelete = useCallback(() => gameDispatch({ type: "deleteLetter" }), []);
  const clearToast = useCallback(() => gameDispatch({ type: "clearToast" }), []);
  const closeModalAndReset = useCallback(() => {
    gameDispatch({ type: "reset" });
    toggleStatsModal();
  }, [toggleStatsModal, gameDispatch]);

  const handleFirstTimeUser = useCallback((bool) => dispatch({ type: "firstTimeUser", payload: bool }), []);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("first-time-user"));
    if (storage || storage === null || firstTimeUser) { 
      return handleFirstTimeUser(true);
    }
    return handleFirstTimeUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeUser])
  
  // update keyboard colors after tile letters are revealed / flipped
  useEffect(() => {
    if (guesses.length === 0) return;
    const timeToFlipTiles = wordLength * 350;
    setTimeout(() => {
      gameDispatch({ type: "updateKeyboardColors" });
    }, timeToFlipTiles);
  }, [guesses]);

  useEffect(() => {
    if (!gameIsOver) return;
    statsDispatch({ type: "updateStats", payload: { guesses, isWon } });
    setTimeout(() => openStatsModal(), 2000);
  }, [gameIsOver, isWon, guesses, openStatsModal, statsDispatch]);

  return (
    <Container>
      <Board
        completedRowValues={guesses}
        currentRowValue={currentGuess}
        isRevealing={isRevealing}
        hasError={toastMessage.length > 0 && !gameIsOver}
      />
      <Keyboard {...{ onAddLetter, onEnter, onDelete, keyboardColors }} />
      {isFirstTimeUser && (
        <FirstTimeUserModal 
          theme={theme} 
          handleFirstTimeUser={handleFirstTimeUser}
          resetFirstTimeUser={resetFirstTimeUser}
        />
      {toastMessage.length > 0 && <Toast message={toastMessage} clearToast={clearToast} />}
      {statsModalIsOpen && (
        <Modal onClose={toggleStatsModal}>
          <StatsModal closeAndReset={closeModalAndReset} statistics={statsState} />
        </Modal>
      )}
    </Container>
  );
};

export default Game;
