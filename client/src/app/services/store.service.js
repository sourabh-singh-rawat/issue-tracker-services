import { configureStore } from "@reduxjs/toolkit";
import storeConfig from "../configs/redux.config";

export const store = configureStore(storeConfig);
