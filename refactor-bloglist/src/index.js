import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import blogReducer from './reducers/blogReducer';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    user: userReducer
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
