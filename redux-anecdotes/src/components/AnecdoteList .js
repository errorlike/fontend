import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes);
  const anecdotesSort = [...anecdotes];
  anecdotesSort.sort((first, second) => second.votes - first.votes);

  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteAction(id));
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