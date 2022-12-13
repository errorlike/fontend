import { Button, TextField } from '@mui/material';
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
          <TextField
            type='text'
            value={username}
            name='Username'
            label='Username'
            margin='normal'
            onChange={handleUsernameChange}

          />
        </div>
        <div>
          <TextField
            type='password'
            value={password}
            name='Password'
            margin='normal'
            label='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <Button size='small' color='primary' variant='contained' type='submit'>
          login
        </Button >
      </form>
    </div>);
};

export default LoginForm;