import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";

export const store = createStore(rootReducer, applyMiddleware(logger));
