import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      return blogs;
    },
    createBlog(state, action) {
      const newBlog = action.payload;
      state.push(newBlog);
    },
    changeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    }
  },
});

export const initialBlog = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNew = (blog) => {
  return async dispatch => {
    const newBlog = await blogsService.create(blog);
    dispatch(createBlog(newBlog));
  };
};

export const updateBlog = (willUpdateBlog) => {
  return async dispatch => {
    const updatedBlog = await blogsService.update(willUpdateBlog.id, willUpdateBlog);
    console.log(updateBlog);
    dispatch(changeBlog(updatedBlog));
  };
};
export const deleteBlog = id => {
  return async dispatch => {
    await blogsService.deleteBlog(id);
    dispatch(removeBlog(id));
  };
};

export const { setBlogs, createBlog, changeBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;