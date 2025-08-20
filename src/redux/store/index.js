import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectionReducer from "../reducers/selectionReducer";

const mainReducer = combineReducers({ selectionReducer });

const store = configureStore({
  reducer: mainReducer,
});

export default store;
