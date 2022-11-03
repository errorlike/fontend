import Blog from './Blog';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
test('render Blog ', () => {
  const blog = {
    title: 'test',
    likes: 1,
    author: 'test-author',
    url: 'http://onugika.md/ac',
    user: {
      username: 'test_author'
    }
  };
  render(<Blog blog={blog} />);

  const hideElement = screen.getByTestId('short');
  const viewElement = screen.getByTestId('verbose');

  expect(hideElement).not.toHaveStyle('display: none');
  expect(viewElement).toHaveStyle('display: none');

});