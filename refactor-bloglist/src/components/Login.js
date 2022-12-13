import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import Notification from './Notification';

const Login = () => {
  const message = useSelector(state => state.message);
  return (
    <div>
      <Typography variant='h2' gutterBottom>Log in to application</Typography>
      <Notification message={message ? message.content : message} type={message ? message.type : message} />
      <LoginForm />
    </div>
  );
};

export default Login;