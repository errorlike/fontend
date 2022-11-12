import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  }
});
export const { setMessage } = messageSlice.actions;
export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, time * 1000);
  };

};
export default messageSlice.reducer;