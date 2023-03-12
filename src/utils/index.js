import { wordLength, colors, maxGuesses, answerWord, emojiMap, gameNumber } from "../config";
import { words } from "../words";

export const guessColor = (word, guess, index) => {
  // correct (matched) index letter
  if (guess[index] === word[index]) {
    return colors.correct;
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
        return colors.present;
      }
    }
  }

  // otherwise not any
  return colors.absent;
};

export const isGameOver = ({ guesses, isWon }) => {
  return guesses.length === maxGuesses || isWon;
};

export const timeTillMidnight = () => {
  const now = new Date();
  const tomorrow = new Date();

  tomorrow.setHours(24, 0, 0, 0);

  let diffMS = tomorrow.getTime() / 1000 - now.getTime() / 1000;
  let diffHr = Math.floor(diffMS / 3600);

  diffMS = diffMS - diffHr * 3600;
  let diffMi = Math.floor(diffMS / 60);
  diffMS = diffMS - diffMi * 60;
  let diffS = Math.floor(diffMS);
  let result = diffHr < 10 ? "0" + diffHr : diffHr;
  result += ":" + (diffMi < 10 ? "0" + diffMi : diffMi);
  result += ":" + (diffS < 10 ? "0" + diffS : diffS);

  return result;
};

export const timeSinceMidnight = (date = new Date()) => {
  const d = new Date();
  const msSinceMidnight = date - d.setHours(0, 0, 0, 0);
  return msSinceMidnight;
};

export const isYesterday = (date) => {
  if (date == null) return false;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  date = new Date(date);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const isValidWord = (word) => {
  if (word.length < wordLength) return [false, "Not enough letters."];
  if (!words.includes(word.toLowerCase())) {
    return [false, "Not in word list."];
  }
  return [true];
};

export const constructClipboardString = ({ guesses, isWon }) => {
  const tileColors = [...guesses].map((guess) => {
    return [...guess].map((_, idx) => guessColor(answerWord, guess, idx));
  });
  const emojiString = tileColors.map((colors) => colors.map((color) => emojiMap[color]).join("")).join("\n");
  return `Trumple ${gameNumber} ${isWon ? guesses.length : "x"}/${maxGuesses}\n\n${emojiString}`;
};
