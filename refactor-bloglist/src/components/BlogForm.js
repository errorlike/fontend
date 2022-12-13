import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = ({ target }) => { setTitle(target.value); };
  const handleAuthorChange = ({ target }) => { setAuthor(target.value); };
  const handleUrlChange = ({ target }) => { setUrl(target.value); };

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div>
      <Typography variant='h3' margin={'5px'}>create new</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField size='small' label='title' value={title} margin='normal' onChange={handleTitleChange} />
        </div>
        <div>
          <TextField size='small' label='author' value={author} margin='normal' onChange={handleAuthorChange} />
        </div>
        <div>
          <TextField size='small' label='url' value={url} margin='normal' onChange={handleUrlChange} />
        </div>
        <Button type='submit' variant='contained' color='secondary' size='small' >create</Button>
      </form>
    </div>
  );
};
export default BlogForm;