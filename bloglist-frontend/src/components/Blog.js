import { useState } from "react";

const Blog = ({ blog, incrLikeCount }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} <button onClick={() => { incrLikeCount(blog); }}>like</button>
        <br />
        {blog.author}
      </div>
    </div>
  );
};

export default Blog;