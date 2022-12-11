import { Link } from 'react-router-dom';

const Blog = ({ blog, removeBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const remove = () =>
    <button onClick={() => { removeBlog(blog.id); }}>
      remove
    </button>;
  return (
    <div style={blogStyle} >
      <div>
        <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>

      {username === blog.user.username ? remove() : null}
    </div>

  );
};

export default Blog;