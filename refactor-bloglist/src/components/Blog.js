import { Button, Link as MuiLink } from '@mui/material';
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
    <Button variant='outlined' size='small' onClick={() => { removeBlog(blog.id); }}>
      remove
    </Button >;
  return (
    <div style={blogStyle} >
      <div>
        <MuiLink variant= 'body1' component={Link} to={`/blogs/${blog.id}`} >
          {blog.title} {blog.author}
        </MuiLink>
        {/* <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> */}
      </div>

      {username === blog.user.username ? remove() : null}
    </div>

  );
};

export default Blog;