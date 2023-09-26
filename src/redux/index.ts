import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import todo from "./todo";

export const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({ todo });
