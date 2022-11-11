import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

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
export default anecdoteSlice.reducer;
