import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNew, deleteBlog } from '../reducers/blogReducer';
import { setMessage, setNotification } from '../reducers/messageReducer';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Togglable from './Togglable';


const Blogs = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const message = useSelector(state => state.message);
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const blogsCopy = [...blogs];

  const removeBlog = async (id) => {
    const result = window.confirm('Remove blog?');
    try {
      if (result) {
        dispatch(deleteBlog(id));
      }
    } catch (exception) {
      dispatch(setMessage('delete blog failed', 5));
    }
  };
  const addBlog = async (blogObject) => {
    try {
      ref.current.toggleVisibility();
      dispatch(createNew(blogObject));
    } catch (exception) {
      dispatch(setNotification({ content: 'create blog failed', type: 'error' }, 5));
    }
  };

  return (
    <div>
      <Notification message={message ? message.content : message} type={message ? message.type : message} />
      <Togglable buttonLabel={'new blog'} ref={ref}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogsCopy.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} username={user.username} />
      )}

    </div>
  );
};
export default Blogs;