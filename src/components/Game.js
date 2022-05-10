import { useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import { isValidWord } from "../utils";
import { answerWord, maxGuesses, wordLength, letters, status } from "../config";
import Board from "./Board";
import Toast from "./Toast";
import Keyboard from "./Keyboard";
import WinningImageOverlay from "./WinningImageOverlay";
import StatsModal from "./StatsModal/StatsModal";

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
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const statsInitialState = {
  stats: {
    Played: 0,
    "Win %": 0,
    "Current Streak": 0,
    "Max Streak": 0,
  },
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  gamesWon: 0,
  averageGuesses: null,
};

const statsInitializer = (initialValue) => JSON.parse(localStorage.getItem("gameStats") || initialValue);
const statsReducer = (state, action) => {
  switch (action.type) {
    case "updateStats":
      const { guesses, isWon } = action.payload;
      const { Played, "Max Streak": maxStreak, "Current Streak": currentStreak } = state.stats;

      const newPlayed = Played + 1;
      const newGamesWon = isWon ? state.gamesWon + 1 : state.gamesWon;
      const newWinPercentage = Math.floor((newGamesWon / newPlayed) * 100);
      const newStreak = isWon ? currentStreak + 1 : 0;
      const newMaxStreak = newStreak > maxStreak ? newStreak : maxStreak;

      return {
        ...state,
        stats: {
          Played: newPlayed,
          "Win %": newWinPercentage,
          "Current Streak": newStreak,
          "Max Streak": newMaxStreak,
        },
        guesses: {
          ...state.guesses,
          [guesses.length]: isWon ? state.guesses[guesses.length] + 1 : state.guesses[guesses.length],
        },
        gamesWon: newGamesWon,
      };
    default:
      return state;
  }
};

const Game = ({ statsModalIsOpen, toggleStatsModal }) => {
  const [stats, statsDispatch] = useReducer(statsReducer, statsInitialState);
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, toastMessage } = state;

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state));
  }, [state]);

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
        <StatsModal reset={() => dispatch({ type: "reset" })} close={toggleStatsModal} analytics={stats} />
      )}
    </Container>
  );
};

export default Game;
