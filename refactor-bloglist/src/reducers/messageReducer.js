import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    }
  }
});
export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, time * 1000);
  };
};
export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;