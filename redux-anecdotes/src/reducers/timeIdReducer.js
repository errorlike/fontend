import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
const timeIdSlice = createSlice({
  name: 'timeId',
  initialState,
  reducers: {
    setTimeId(state, action) {
      return action.payload;
    }
  }
});

export const { setTimeId } = timeIdSlice.actions;
export default timeIdSlice.reducer;