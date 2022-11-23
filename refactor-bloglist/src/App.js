import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { createNew, deleteBlog, initialBlog, updateBlog } from './reducers/blogReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [blogMessage, setBlogMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  const ref = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const blogsCopy = [...blogs];
  useEffect(() => {
    dispatch(initialBlog());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setLoginMessage('Wrong username or password');
      setNotificationType('error');
      setTimeout(() => {
        setLoginMessage(null);
        setNotificationType('');
      }, 5000);
    }
  };

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const addBlog = async (blogObject) => {
    try {
      ref.current.toggleVisibility();
      dispatch(createNew(blogObject));
    } catch (exception) {
      setBlogMessage('create blog failed');
      setNotificationType('error');
      setTimeout(() => {
        setBlogMessage(null);
        setNotificationType('');
      }, 5000);
    }
  };
  const incrLikeCount = async (willUpdateBlog) => {
    try {
      dispatch(updateBlog({ ...willUpdateBlog, likes: willUpdateBlog.likes + 1 }));
    } catch (error) {
      setBlogMessage('update liking count failed');
      setNotificationType('error');
      setTimeout(() => {
        setBlogMessage(null);
      }, 5000);
    }

  };

  const removeBlog = async (id) => {
    const result = window.confirm('Remove blog?');
    try {
      if (result) {
        dispatch(deleteBlog(id));
      }
    } catch (exception) {
      setBlogMessage('delete blog failed');
      setNotificationType('error');
      setTimeout(() => {
        setBlogMessage(null);
        setNotificationType('');
      }, 5000);
    }
  };
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  return (
    <div>
      {user === null
        ? <div>
          <h2>Log in to application</h2>
          <Notification message={loginMessage} type={notificationType} />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} />
        </div>
        : <div>
          <h2>blogs</h2>
          <Notification message={blogMessage} type={notificationType} />
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel={'new blog'} ref={ref}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogsCopy.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} incrLikeCount={incrLikeCount} removeBlog={removeBlog} username={user.username} />
          )}
        </div>
      }

    </div >
  );
};
export default App;
