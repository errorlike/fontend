import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UserDetails from './components/UserDetails';
import Users from './components/Users';
import { createNew, deleteBlog, initialBlog, updateBlog } from './reducers/blogReducer';
import { setMessage, setNotification } from './reducers/messageReducer';
import { setUser } from './reducers/userReducer';
import { initialUsers } from './reducers/usersReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const ref = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const message = useSelector(state => state.message);
  const user = useSelector(state => state.user);
  const blogsCopy = [...blogs];
  useEffect(() => {
    dispatch(initialBlog());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);
  useEffect(() => {
    dispatch(initialUsers());
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification({ content: 'Wrong username or password', type: 'error' }, 5));
    }
  };

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const addBlog = async (blogObject) => {
    try {
      ref.current.toggleVisibility();
      dispatch(createNew(blogObject));
    } catch (exception) {
      dispatch(setNotification({ content: 'create blog failed', type: 'error' }, 5));
    }
  };
  const incrLikeCount = async (willUpdateBlog) => {
    try {
      dispatch(updateBlog({ ...willUpdateBlog, likes: willUpdateBlog.likes + 1 }));
    } catch (error) {
      dispatch(setNotification({ content: 'update liking count failed', type: 'error' }, 5));
    }

  };

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
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
  };

  return (
    <div>
      {user === null
        ? <div>
          <h2>Log in to application</h2>
          <Notification message={message ? message.content : message} type={message ? message.type : message} />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} />
        </div>
        : <div>
          <h2>blogs</h2>
          <Notification message={message ? message.content : message} type={message ? message.type : message} />
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
          <Togglable buttonLabel={'new blog'} ref={ref}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogsCopy.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} incrLikeCount={incrLikeCount} removeBlog={removeBlog} username={user.username} />
          )}
          <div>
            <h2>Users</h2>
            <Users />
          </div>
        </div>
      }
      <Routes>
        <Route path='users/:id' element={<UserDetails />}></Route>
      </Routes>
    </div >
  );
};
export default App;
