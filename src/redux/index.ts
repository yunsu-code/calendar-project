import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import todo from "./todo";
import date from "./date";
import modalUi from "./modalUi";

export const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modalUi"], //modalUi는 값 저장 안함.
};

export const rootReducer = combineReducers({ todo, date, modalUi });
