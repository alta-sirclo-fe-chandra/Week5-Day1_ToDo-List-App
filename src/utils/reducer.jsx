export const reducer = (state, action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};
