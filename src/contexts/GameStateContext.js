import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { wordLength } from '../config';
import * as GameState from '../reducers/GameState';

const GameStateContext = createContext();

const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateContextProvider');
  }
  return context;
};

const GameStateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameState.reducer, GameState.initialState, GameState.initializer);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.guesses.length === 0) return;
    const timeToFlipTiles = wordLength * 350;
    const timeout = setTimeout(() => dispatch({ type: 'updateKeyboardColors' }), timeToFlipTiles);
    return () => clearTimeout(timeout);
  }, [state.guesses]);

  const addLetter = useCallback((letter) => dispatch({ type: 'addLetter', payload: letter }), []);
  const addWord = useCallback(() => dispatch({ type: 'addWord' }), []);
  const deleteLetter = useCallback(() => dispatch({ type: 'deleteLetter' }), []);
  const clearToast = useCallback(() => dispatch({ type: 'clearToast' }), []);

  const value = useMemo(
    () => ({
      gameState: state,
      gameDispatch: dispatch,
      addLetter,
      addWord,
      deleteLetter,
      clearToast,
    }),
    [state, dispatch, addLetter, addWord, deleteLetter, clearToast]
  );

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export { GameStateContextProvider, useGameState };
