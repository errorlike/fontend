import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
    navigate('/login');
  };
  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <em>{user.name} logged in <Button color='inherit' onClick={logout}>logout</Button></em>
          </Toolbar>
        </AppBar>

      </div>
    </div >
  );
};
export default Menu;
