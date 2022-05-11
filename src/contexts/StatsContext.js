import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import * as Statistics from "../reducers/Statistics";

const StatsContext = createContext();

const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsModalContextProvider");
  }
  return context;
};

const StatsModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Statistics.reducer, Statistics.initialState, Statistics.initializer);
  const [statsModalIsOpen, setStatsModalIsOpen] = useState(false);

  const toggleStatsModal = () => setStatsModalIsOpen((curr) => !curr);
  const openStatsModal = () => setStatsModalIsOpen(true);

  useEffect(() => {
    localStorage.setItem("statistics", JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({ statsState: state, statsDispatch: dispatch, statsModalIsOpen, toggleStatsModal, openStatsModal }),
    [state, dispatch, statsModalIsOpen, toggleStatsModal]
  );

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export { StatsModalContextProvider, useStats };
