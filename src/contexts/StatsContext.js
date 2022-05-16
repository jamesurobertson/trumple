import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { maxGuesses } from '../config';
import * as Statistics from '../reducers/Statistics';
import { useGameState } from './GameStateContext';

const StatsContext = createContext();

const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsContextProvider');
  }
  return context;
};

const StatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Statistics.reducer, Statistics.initialState, Statistics.initializer);
  const [statsModalIsOpen, setStatsModalIsOpen] = useState(false);

  const { gameState, gameDispatch } = useGameState();
  const { guesses, isWon } = gameState;
  const gameIsOver = guesses.length === maxGuesses || isWon;

  const toggleHelpModal = useCallback(() => dispatch({ type: 'firstTimeUser' }), []);
  const toggleStatsModal = useCallback(() => setStatsModalIsOpen((curr) => !curr), []);
  const openStatsModal = useCallback(() => setStatsModalIsOpen(true), []);

  const closeAndResetStatsModal = useCallback(() => {
    gameDispatch({ type: 'reset' });
    toggleStatsModal();
  }, [toggleStatsModal, gameDispatch]);

  useEffect(() => {
    localStorage.setItem('statistics', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!gameIsOver) return;
    dispatch({ type: 'updateStats', payload: { guesses, isWon } });
    const timeout = setTimeout(() => openStatsModal(), 3500);
    return () => clearTimeout(timeout);
  }, [gameIsOver, isWon, guesses, openStatsModal]);

  const value = useMemo(
    () => ({
      statsState: state,
      statsDispatch: dispatch,
      toggleHelpModal,
      statsModalIsOpen,
      toggleStatsModal,
      openStatsModal,
      closeAndResetStatsModal,
    }),
    [state, dispatch, toggleHelpModal, statsModalIsOpen, toggleStatsModal, openStatsModal, closeAndResetStatsModal]
  );

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export { StatsContextProvider, useStats };
