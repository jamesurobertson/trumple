import { letters, colors, wordLength, maxGuesses, answerWord, version } from "../config";
import { isValidWord, timeSinceMidnight } from "../utils";

export const initialState = {
  isWon: false,
  isRevealing: false,
  guesses: [],
  currentGuess: "",
  toastMessage: "",
  keyboardColors: letters.reduce((map, letter) => {
    map[letter] = colors.unguessed;
    return map;
  }, {}),
  triggerWinAnimation: false,
};

export const initializer = (initialValue) => {
  const currentSavedVersion = JSON.parse(localStorage.getItem("trumple-version"));

  if (currentSavedVersion !== version) {
    return initialValue;
  }

  const stats = JSON.parse(localStorage.getItem("statistics"));
  const now = new Date().getTime();
  if (stats && now - stats.timestamps?.lastPlayed > timeSinceMidnight()) return initialValue;
  const local = JSON.parse(localStorage.getItem("gameState"));
  return local ? { ...local, triggerWinAnimation: false } : initialValue;
};

const getColorForCharacter = ({ char, i, answerWord, colors }) => {
  if (answerWord[i] === char) return colors.correct;
  if (answerWord.includes(char)) return colors.present;
  return colors.absent;
};

export const reducer = (state, action) => {
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
        if (newColors[char] === colors.correct) return;
        const color = getColorForCharacter({ char, i, answerWord, colors });
        newColors[char] = color;
      });
      return {
        ...state,
        isRevealing: false,
        keyboardColors: newColors,
        triggerWinAnimation: state.isWon,
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
