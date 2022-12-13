import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../reducers/blogReducer';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const handleCommentChange = ({ target }) => { setComment(target.value); };

  const addComment = async (event) => {
    event.preventDefault();
    dispatch(createComment(id, { content: comment }));
    setComment('');
  };
  return (
    <div>
      <form onSubmit={addComment}>
        <TextField size ='small' type="text" onChange={handleCommentChange} />
        <Button variant='contained' size='small' type="submit">add comment </Button>
      </form>
    </div>
  );
};

export default CommentForm;