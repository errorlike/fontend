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
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:<input value={title} onChange={handleTitleChange} />
        <br />
        author:<input value={author} onChange={handleAuthorChange} />
        <br />
        url:<input value={url} onChange={handleUrlChange} />
        <br />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};
export default BlogForm;