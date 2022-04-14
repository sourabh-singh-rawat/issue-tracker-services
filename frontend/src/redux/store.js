import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import { persistedRootReducer } from "./root-reducer";

export const store = createStore(persistedRootReducer, applyMiddleware(logger));

export const persistor = persistStore(store);
