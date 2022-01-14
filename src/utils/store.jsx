import { createStore } from "redux";
import { reducer } from "./reducer";

const initialState = {
  search: "",
};

const store = (state = initialState) => {
  return createStore(reducer, state);
};

export default store;
