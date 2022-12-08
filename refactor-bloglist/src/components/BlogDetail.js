import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/messageReducer';

const BlogDetail = () => {
  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
  const dispatch = useDispatch();
  const incrLikeCount = async (willUpdateBlog) => {
    try {
      dispatch(updateBlog({ ...willUpdateBlog, likes: willUpdateBlog.likes + 1 }));
    } catch (error) {
      dispatch(setNotification({ content: 'update liking count failed', type: 'error' }, 5));
    }
  };

  if (!blog) {
    return null;
  }
  return (
    <div >
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} <button onClick={() => { incrLikeCount(blog); }}>like</button>
      <br />
      {blog.author}
    </div>
  );
};

export default BlogDetail;