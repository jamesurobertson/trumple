import { useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import { answerWord, maxGuesses, wordLength } from "../config";
import Board from "./Board";
import Toast from "./Toast";
import Keyboard from "./Keyboard";
import Modal from "./Modals/Modal";
import StatsModal from "./Modals/StatsModal/StatsModal";
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
  const [gameState, gameDispatch] = useReducer(GameState.reducer, GameState.initialState, GameState.initializer);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, toastMessage } = gameState;

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("statistics", JSON.stringify(statsState));
  }, [statsState]);

  const onAddLetter = useCallback((letter) => gameDispatch({ type: "addLetter", payload: letter }), []);
  const onEnter = useCallback(() => gameDispatch({ type: "addWord" }), []);
  const onDelete = useCallback(() => gameDispatch({ type: "deleteLetter" }), []);
  const clearToast = useCallback(() => gameDispatch({ type: "clearToast" }), []);
  const closeModalAndReset = useCallback(() => {
    gameDispatch({ type: "reset" });
    toggleStatsModal();
  }, [toggleStatsModal, gameDispatch]);

  // update keyboard colors after tile letters are revealed / flipped
  useEffect(() => {
    if (guesses.length === 0) return;
    setTimeout(() => {
      gameDispatch({ type: "updateKeyboardColors" });
      if (guesses.length === maxGuesses) {
        gameDispatch({ type: "toastMessage", payload: answerWord });
      }
    }, wordLength * 350);

    if (guesses.length === maxGuesses || isWon) {
      setTimeout(() => {
        statsDispatch({ type: "updateStats", payload: { guesses, isWon } });
        toggleStatsModal();
      }, 2000);
    }
  }, [guesses, isWon, toggleStatsModal]);

  return (
    <Container>
      <Board
        completedRowValues={guesses}
        currentRowValue={currentGuess}
        isRevealing={isRevealing}
        hasError={toastMessage.length > 0}
      />
      <Keyboard {...{ onAddLetter, onEnter, onDelete, keyboardColors }} />
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
