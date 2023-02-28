import { isYesterday, timeSinceMidnight } from "../utils";
import { maxGuesses, version } from "../config";

export const initialState = {
  stats: {
    Played: 0,
    "Win %": 0,
    "Current Streak": 0,
    "Max Streak": 0,
  },
  guesses: Array(maxGuesses)
    .fill(0)
    .reduce((map, _, i) => {
      map[i + 1] = 0;
      return map;
    }, {}),
  gamesWon: 0,
  timestamps: {
    lastPlayed: null,
    lastCompleted: null,
  },
  isFirstTimeUser: true,
};

export const initializer = (initialValue) => {
  let local;
  try {
    local = JSON.parse(localStorage.getItem("statistics"));
  } catch (e) {
    local = initialState;
  }
  const currentSavedVersion = JSON.parse(localStorage.getItem("trumple-version"));

  if (currentSavedVersion !== version) {
    localStorage.setItem("trumple-version", version);
    localStorage.setItem("statistics", JSON.stringify(initialValue));
    return initialValue;
  }
  return local || initialValue;
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "updateStats":
      const {
        timestamps: { lastPlayed, lastCompleted },
        stats: { Played, "Max Streak": maxStreak, "Current Streak": currentStreak },
      } = state;

      const now = new Date().getTime();
      const alreadyPlayedToday = now - lastPlayed < timeSinceMidnight();
      if (alreadyPlayedToday) return state;

      const { guesses, isWon } = action.payload;

      const played = Played + 1;
      const gamesWon = isWon ? state.gamesWon + 1 : state.gamesWon;
      const winPercentage = Math.floor((gamesWon / played) * 100);

      const wonYesterday = isYesterday(lastCompleted);

      let streak;
      if (wonYesterday) {
        streak = isWon ? currentStreak + 1 : 0;
      } else {
        streak = isWon ? 1 : 0;
      }

      const guessDistribution = {
        ...state.guesses,
        [guesses.length]: isWon ? state.guesses[guesses.length] + 1 : state.guesses[guesses.length],
      };

      return {
        ...state,
        stats: {
          Played: played,
          "Win %": winPercentage,
          "Current Streak": streak,
          "Max Streak": Math.max(maxStreak, streak),
        },
        guesses: guessDistribution,
        gamesWon: gamesWon,
        timestamps: {
          lastCompleted: isWon ? now : state.timestamps.lastCompleted,
          lastPlayed: now,
        },
      };
    case "firstTimeUser":
      return { ...state, isFirstTimeUser: !state.isFirstTimeUser };
    default:
      return state;
  }
};
