
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import BlogDetail from './components/BlogDetail';
import Blogs from './components/Blogs';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import UserDetails from './components/UserDetails';
import Users from './components/Users';
import { initialBlog } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { initialUsers } from './reducers/usersReducer';
import blogService from './services/blogs';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialBlog());
  }, []);

  const user = useSelector(state => {
    return state.user;
  });
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


  return (
    <div>
      {user ?
        <>
          <Menu user={user}/>
          <h2>blogs</h2>
        </>
        : null}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace to={'/login'} />} />
        <Route path="/login" element={user ? <Navigate replace to={'/'} /> : <Login />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/blogs/:id' element={<BlogDetail />} />
        <Route path='/users/:id' element={<UserDetails />} />
      </Routes>
    </div >
  );
};
export default App;
