import axios from 'axios';
const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  };
};
const baseUrl = 'http://localhost:3001/anecdotes';
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const create = async (content) => {
  const response = await axios.post(baseUrl, asObject(content));
  return response.data;
};
const update = async (id, willUpdateAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, willUpdateAnecdote);
  return response.data;
};

const anecdoteService = { getAll, create, update };
export default anecdoteService;