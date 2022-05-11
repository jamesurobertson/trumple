export const initialState = {
  isFirstTimeUser: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "firstTimeUser":
      const firstTimeUser = action.payload;
      localStorage.setItem("first-time-user", firstTimeUser);
      return { ...state, isFirstTimeUser: firstTimeUser };
    default:
      return state;
  }
};
