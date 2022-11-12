import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];
const anecdoteSlice = createSlice({
  name: 'anedotes',
  initialState,
  reducers: {
    createNewAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
    changeAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote => {
        return anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote;
      });
    }
  }
}
);
export const { createNewAnecdote, setAnecdote, changeAnecdote } = anecdoteSlice.actions;
export const initialAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};
export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(createNewAnecdote(newAnecdote));
  };
};
export const voteAnecodte = (id, anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote);
    dispatch(changeAnecdote(updatedAnecdote));
  };
};
export default anecdoteSlice.reducer;
