import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

const AnecdoteForm = (props) => {
  console.log(addAnecdote);
  console.log(props.addAnecdote);
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.addAnecdote(content);
    props.setNotification(`you created ${content}`, 10);
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
const mapDispatchToProps = {
  addAnecdote,
  setNotification
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);