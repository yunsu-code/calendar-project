import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import todo from "./todo";
import selectedData from "./SelectedData";
import modalUi from "./modalUi";

export const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modalUi", "selectedData"], //modalUi, selectedData는 localstorage에 값 저장 안함.
};

export const rootReducer = combineReducers({ todo, selectedData, modalUi });
