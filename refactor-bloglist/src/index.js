import { Container } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import blogReducer from './reducers/blogReducer';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    user: userReducer,
    users: usersReducer
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Container>
);
