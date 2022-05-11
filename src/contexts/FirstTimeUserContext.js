import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
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
  const [firstTimeUser, resetFirstTimeUser] = useState(state.isFirstTimeUser || null);

  const handleFirstTimeUser = useCallback((bool) => dispatch({ type: "firstTimeUser", payload: bool }), []);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("first-time-user"));
    if (storage || storage === null || firstTimeUser) { 
      return handleFirstTimeUser(true);
    }
    return handleFirstTimeUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeUser])

  const value = useMemo(
    () => ({ 
      firstTimeUser,
      resetFirstTimeUser,
    }),
    [firstTimeUser, resetFirstTimeUser]
  );

  return <FirstTimeUserContext.Provider value={value}>{children}</FirstTimeUserContext.Provider>;
};

export { FirstTimeUserModalContextProvider, useFirstTimeUser };
