import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectionReducer from "../reducers/selectionReducer";
import conversationsReducer from "../reducers/conversationsReducer";

const mainReducer = combineReducers({ selectionReducer, conversationsReducer });

const store = configureStore({
  reducer: mainReducer,
});

export default store;
