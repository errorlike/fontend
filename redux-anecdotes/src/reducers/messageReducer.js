import { createSlice } from "@reduxjs/toolkit";

const initialState = 'hello world';
const messageSlice = createSlice({
  name: 'message',
  initialState,
});

export default messageSlice.reducer;