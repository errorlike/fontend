import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNotification } from '../reducers/messageReducer';
import { setUser } from '../reducers/userReducer';
import blogsService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch(setUser(user));
      blogsService.setToken(user.token);
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (exception) {
      dispatch(setNotification({ content: 'Wrong username or password', type: 'error' }, 5));
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
    </div>);
};

export default LoginForm;