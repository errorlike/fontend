import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList ';
import Notification from './components/Notification';
import { initialAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialAnecdote());
  }, [dispatch]);
  const message = useSelector(state => state.message);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={message} />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};


export default App;