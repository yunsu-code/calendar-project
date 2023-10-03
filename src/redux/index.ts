import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import todo from "./todo";
import date from "./date";

export const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({ todo, date });
