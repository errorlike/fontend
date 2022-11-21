import BlogForm from './BlogForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn();
  render(<BlogForm createBlog={createNote} />);

  const inputArray = screen.getAllByRole('textbox');
  const sendButton = screen.getByText('create');

  const titleInput = inputArray[0];
  const authorInput = inputArray[1];
  const urlInput = inputArray[2];

  const user = userEvent.setup();
  await user.type(titleInput, 'testTitle');
  await user.type(authorInput, 'testAuthror');
  await user.type(urlInput, 'testUrl');
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].title).toBe('testTitle');
  expect(createNote.mock.calls[0][0].author).toBe('testAuthror');
  expect(createNote.mock.calls[0][0].url).toBe('testUrl');


});

