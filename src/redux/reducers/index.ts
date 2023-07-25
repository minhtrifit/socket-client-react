import { combineReducers } from "@reduxjs/toolkit";
import socketReducer from "./socket.reducer";

export const rootReducer = combineReducers({
  socket: socketReducer,
});
