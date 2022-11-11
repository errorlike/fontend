import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { cancleMessage, setMessage } from "../reducers/messageReducer";
import anecdoteService from "../services/anecdotes";


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.create(content);
    dispatch(createNewAnecdote(newAnecdote));
    dispatch(setMessage(`you created ${content}`));
    setTimeout(() => {
      dispatch(cancleMessage());
    }, 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;