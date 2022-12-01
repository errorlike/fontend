import axios from 'axios';
const baseUrl = 'api/users';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const users = request.data;
  return users;
};
const usersService = {
  getAll
};
export default usersService;