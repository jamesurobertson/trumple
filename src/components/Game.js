import { useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import { answerWord, maxGuesses, wordLength, letters, status } from "../config";
import Board from "./Board";
import Toast from "./Toast";
import Keyboard from "./Keyboard";
import WinningImageOverlay from "./WinningImageOverlay";
import StatsModal from "./StatsModal/StatsModal";
import * as GameState from "../reducers/GameState";
import * as Statistics from "../reducers/Statistics";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
`;

const Game = ({ statsModalIsOpen, toggleStatsModal }) => {
  const [statsState, statsDispatch] = useReducer(Statistics.reducer, Statistics.initialState, Statistics.initializer);
  const [gameState, dispatch] = useReducer(GameState.reducer, GameState.initialState, GameState.initializer);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, toastMessage } = gameState;

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("statistics", JSON.stringify(statsState));
  }, [statsState]);

  const onAddLetter = useCallback((letter) => dispatch({ type: "addLetter", payload: letter }), []);
  const onEnter = useCallback(() => dispatch({ type: "addWord" }), []);
  const onDelete = useCallback(() => dispatch({ type: "deleteLetter" }), []);
  const clearToast = useCallback(() => dispatch({ type: "clearToast" }), []);

  // update keyboard colors after tile letters are revealed / flipped
  useEffect(() => {
    if (guesses.length === 0) return;
    setTimeout(() => {
      dispatch({ type: "updateKeyboardColors" });
      if (guesses.length === maxGuesses) {
        dispatch({ type: "toastMessage", payload: answerWord });
      }
    }, wordLength * 350);

    if (guesses.length === maxGuesses || isWon) {
      setTimeout(() => {
        statsDispatch({ type: "updateStats", payload: { guesses, isWon } });
        toggleStatsModal();
      }, 3000);
    }
  }, [guesses]);

  return (
    <Container>
      {toastMessage.length > 0 && <Toast message={toastMessage} clearToast={clearToast} />}
      <Board
        completedRowValues={guesses}
        currentRowValue={currentGuess}
        isRevealing={isRevealing}
        hasError={toastMessage.length > 0}
      />
      <Keyboard {...{ onAddLetter, onEnter, onDelete, keyboardColors }} />
      {statsModalIsOpen && (
        <StatsModal reset={() => dispatch({ type: "reset" })} close={toggleStatsModal} statistics={statsState} />
      )}
    </Container>
  );
};

export default Game;
