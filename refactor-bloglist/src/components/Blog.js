import { useState } from 'react';

const Blog = ({ blog, incrLikeCount, removeBlog, username }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const hideWhenVisible = { display: visible ? 'none' : null };
  const showWhenVisible = { display: visible ? null : 'none' };


  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const remove = () =>
    <button onClick={() => { removeBlog(blog.id); }}>
      remove
    </button>;
  return (
    <div style={blogStyle} data-testid='short'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button data-testid='viewButton' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} data-testid='verbose'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} <button onClick={() => { incrLikeCount(blog); }}>like</button>
        <br />
        {blog.author}
      </div>
      {username === blog.user.username ? remove() : null}
    </div>

  );
};

export default Blog;