import axios from 'axios';
const baseUrl = '/api/blogs';
let token;

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log('create',token);
};
const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};
const create = async (newObject) => {
  console.log('create',token)
  const response = await axios.post(baseUrl, newObject, { headers: { Authorization: token } });
  return response.data;
};
const blogsService = { getAll, create, setToken };
export default blogsService;