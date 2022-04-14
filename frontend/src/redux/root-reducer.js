import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});

export const persistedRootReducer = persistReducer(persistConfig, rootReducer);
