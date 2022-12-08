import { Link } from 'react-router-dom';

const Blog = ({ blog, removeBlog, username }) => {
  // const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  // const hideWhenVisible = { display: visible ? 'none' : null };
  // const showWhenVisible = { display: visible ? null : 'none' };


  // const toggleVisibility = () => {
  //   setVisible(!visible);
  // };
  const remove = () =>
    <button onClick={() => { removeBlog(blog.id); }}>
      remove
    </button>;
  return (
    <div style={blogStyle} >
      <div>
        <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Link> {/* <button data-testid='viewButton' onClick={toggleVisibility}>view</button> */}
      </div>

      {username === blog.user.username ? remove() : null}
    </div>

  );
};

export default Blog;