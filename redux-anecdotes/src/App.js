import { useSelector, useDispatch } from 'react-redux';
import { createNewAnecdote, voteAction } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  anecdotes.sort((first, second) => {
    return second.votes - first.votes ;
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAction(id));
  };
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createNewAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;