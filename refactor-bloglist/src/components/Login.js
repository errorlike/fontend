import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import Notification from './Notification';

const Login = () => {
  const message = useSelector(state => state.message);
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message ? message.content : message} type={message ? message.type : message} />
      <LoginForm />
    </div>
  );
};

export default Login;