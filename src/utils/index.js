import { status } from "../constants";
import { words } from "../words";

export function guessColor(word, guess, index) {
  // correct (matched) index letter
  if (guess[index] === word[index]) {
    return status.green;
  }

  let wrongWord = 0;
  let wrongGuess = 0;
  for (let i = 0; i < word.length; i++) {
    // count the wrong (unmatched) letters
    if (word[i] === guess[index] && guess[i] !== guess[index]) {
      wrongWord++;
    }
    if (i <= index) {
      if (guess[i] === guess[index] && word[i] !== guess[index]) {
        wrongGuess++;
      }
    }

    // an unmatched guess letter is wrong if it pairs with
    // an unmatched word letter
    if (i >= index) {
      if (wrongGuess === 0) {
        break;
      }
      if (wrongGuess <= wrongWord) {
        return status.yellow;
      }
    }
  }

  // otherwise not any
  return status.gray;
}

export const isValidWord = (word) => {
  if (word.length < 5) return [false, "Not enough letters."];
  if (!words.includes(word.toLowerCase())) {
    return [false, "Not in word list."];
  }
  return [true];
};
