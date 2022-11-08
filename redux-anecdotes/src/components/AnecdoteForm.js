import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createNewAnecdote(content));
  };
  return (
    <form onSubmit={addNote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  );
};
export default AnecdoteForm;