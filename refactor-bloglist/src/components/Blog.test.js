import Blog from './Blog';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
const blog = {
  title: 'test',
  likes: 1,
  author: 'test-author',
  url: 'http://onugika.md/ac',
  user: {
    username: 'test_author'
  }
};
describe('<Blog/>', () => {
  let container;
  beforeEach(() => {
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
test('clicking the button calls event handler twice', async () => {

  const mockHandler = jest.fn();
  render(<Blog blog={blog} incrLikeCount={mockHandler} />);

  const user = userEvent.setup();
  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);

});