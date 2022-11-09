import { useSelector } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList ';
import Notification from './components/Notification';

const App = () => {
  const message = useSelector(state => state.message);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={message}/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};


export default App;