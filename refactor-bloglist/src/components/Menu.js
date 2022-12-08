import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MenuStyle = {
    background: 'lightgrey',
    padding: '10px',
    marginBottom: '10px'
  };
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
    navigate('/login');
  };
  return (
    <div style={MenuStyle}>
      <Link to={'/users '}>users </Link>
      <Link to={'/blogs '}>blogs </Link>
      {user.name} logged in <button onClick={logout}>logout</button>
    </div>
  );
};

export default Menu;