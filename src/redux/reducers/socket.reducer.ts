import { createReducer } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { updateSocket, updateUid } from "../actions/socket.actions";

// Interface declair
interface SocketState {
  socket: Socket | undefined;
  uid: string | undefined;
}

// InitialState value
const initialState: SocketState = {
  socket: undefined,
  uid: "",
};

const socketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSocket, (state, action) => {
      state.socket = action.payload;
    })
    .addCase(updateUid, (state, action) => {
      state.uid = action.payload;
    });
});

export default socketReducer;
