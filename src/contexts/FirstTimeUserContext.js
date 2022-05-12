import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from "react";
import * as FirstTimeUserReducer from "../reducers/FirstTimeUserState";

const FirstTimeUserContext = createContext();

const useFirstTimeUser = () => {
  const context = useContext(FirstTimeUserContext);
  if (context === undefined) {
    throw new Error("useFirstTimeUser must be used within a FirstTimeUserProvider");
  }
  return context;
};

const FirstTimeUserModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FirstTimeUserReducer.reducer, FirstTimeUserReducer.initialState);
  const handleFirstTimeUser = useCallback((bool) => dispatch({ type: "firstTimeUser", payload: bool }), []);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("first-time-user"));
    if (storage || storage === null || state.isFirstTimeUser) { 
      return handleFirstTimeUser(true);
    }
    return handleFirstTimeUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isFirstTimeUser])

  const value = useMemo(
    () => ({ 
      firstTimeUser: state.isFirstTimeUser,
      resetFirstTimeUser: handleFirstTimeUser,
    }),
    [state.isFirstTimeUser, handleFirstTimeUser]
  );

  return <FirstTimeUserContext.Provider value={value}>{children}</FirstTimeUserContext.Provider>;
};

export { FirstTimeUserModalContextProvider, useFirstTimeUser };
