import axios from 'axios';

export const fetchForums = (forum_id) => {
  return axios.get('/forum/api/forum');
};

export const fetchUser = () => {
  return axios.get('/forum/api/user/getUser');
};
