import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
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
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    };
  };
  const addBlog = async () => {
    try {

      const newBlog = {
        title,
        author,
        url,
      };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');

    } catch (exception) {
      setMessage('create blog failed');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
  };
  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
    </div>);

  const blogsItems = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
  return (
    <div>
      {user === null
        ? loginForm()
        : <div>
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
          {blogsItems()}
        </div>
      }
      <form onSubmit={addBlog}>
        title:<input onChange={({ target }) => { setTitle(target.value); }} />
        <br />
        author:<input onChange={({ target }) => { setAuthor(target.value); }} />
        <br />
        url:<input onChange={({ target }) => { setUrl(target.value); }} />
        <br />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};
export default App;
