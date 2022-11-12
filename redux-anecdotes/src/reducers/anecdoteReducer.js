import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];
const anecdoteSlice = createSlice({
  name: 'anedotes',
  initialState,
  reducers: {
    voteAction(state, action) {
      const id = action.payload;
      return state.map(anecdote => {
        return anecdote.id !== id ? anecdote : {
          ...anecdote,
          votes: anecdote.votes + 1
        };
      });
    },
    createNewAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    }
  }
}
);
export const { createNewAnecdote, voteAction, setAnecdote } = anecdoteSlice.actions;
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
export default anecdoteSlice.reducer;
