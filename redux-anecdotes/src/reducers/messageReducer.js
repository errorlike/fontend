import { createSlice } from "@reduxjs/toolkit";
import { setTimeId } from "./timeIdReducer";
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
  return (dispatch, getsate) => {
    dispatch(setMessage(message));
    clearTimeout(getsate().timeId);
    const timeId = setTimeout(() => {
      dispatch(setMessage(null));
    }, time * 1000);
    dispatch(setTimeId(timeId));
  };

};
export default messageSlice.reducer;