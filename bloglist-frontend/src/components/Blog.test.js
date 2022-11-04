import Blog from './Blog';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
describe('<Blog/>', () => {
  let container;
  beforeEach(() => {
    const blog = {
      title: 'test',
      likes: 1,
      author: 'test-author',
      url: 'http://onugika.md/ac',
      user: {
        username: 'test_author'
      }
    };
    container = render(<Blog blog={blog} />).container;
  });

  test('render Blog ', () => {

    const hideElement = screen.getByTestId('short');
    const viewElement = screen.getByTestId('verbose');

    expect(hideElement).not.toHaveStyle('display: none');
    expect(viewElement).toHaveStyle('display: none');

  });

  test('after clicking the button, children are displayed', async () => {


    const user = userEvent.setup();
    const button = screen.getByTestId('viewButton');

    await user.click(button);

    const viewElement = screen.getByTestId('verbose');
    expect(viewElement).not.toHaveStyle('display: none');

  });
});