import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    cancleMessage() {
      return initialState;
    }
  }
});
export const { setMessage, cancleMessage } = messageSlice.actions;
export default messageSlice.reducer;