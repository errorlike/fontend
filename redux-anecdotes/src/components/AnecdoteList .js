import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import { cancleMessage, setMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes);
  const anecdotesSort = [...anecdotes];
  anecdotesSort.sort((first, second) => second.votes - first.votes);

  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteAction(id));
    const content = anecdotesSort
      .find(anecdote => id === anecdote.id)
      .content;
    dispatch(setMessage(`you voted ${content}`));
    setTimeout(() => {
      dispatch(cancleMessage())
    }, 5000);
  };
  return <div>
    {
      anecdotesSort.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
    }
  </div>;

};
export default AnecdoteList;