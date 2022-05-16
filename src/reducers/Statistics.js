import { timeSinceMidnight } from '../utils';
import { maxGuesses } from '../config';

export const initialState = {
  stats: {
    Played: 0,
    'Win %': 0,
    'Current Streak': 0,
    'Max Streak': 0,
  },
  guesses: Array(maxGuesses)
    .fill(0)
    .reduce((map, _, i) => {
      map[i + 1] = 0;
      return map;
    }, {}),
  gamesWon: 0,
  lastDatePlayed: -Infinity,
  isFirstTimeUser: true,
};

export const initializer = (initialValue) => {
  const local = JSON.parse(localStorage.getItem('statistics'));
  return local || initialValue;
};
export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateStats':
      const now = new Date().getTime();
      if (now - state.lastDatePlayed < timeSinceMidnight()) return state;

      const { guesses, isWon } = action.payload;
      const { Played, 'Max Streak': maxStreak, 'Current Streak': currentStreak } = state.stats;

      const newPlayed = Played + 1;
      const newGamesWon = isWon ? state.gamesWon + 1 : state.gamesWon;
      const newWinPercentage = Math.floor((newGamesWon / newPlayed) * 100);
      const newStreak = isWon ? currentStreak + 1 : 0;
      const newMaxStreak = newStreak > maxStreak ? newStreak : maxStreak;

      const newGuessDistribution = isWon ? state.guesses[guesses.length] + 1 : state.guesses[guesses.length];

      return {
        ...state,
        stats: {
          Played: newPlayed,
          'Win %': newWinPercentage,
          'Current Streak': newStreak,
          'Max Streak': newMaxStreak,
        },
        guesses: {
          ...state.guesses,
          [guesses.length]: newGuessDistribution,
        },
        gamesWon: newGamesWon,
        lastDatePlayed: now,
      };
    case 'firstTimeUser':
      return { ...state, isFirstTimeUser: !state.isFirstTimeUser };
    default:
      return state;
  }
};
