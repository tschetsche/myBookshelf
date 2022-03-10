import axios from 'axios';

const fakeApi = axios.create({
  baseURL: 'http://localhost:3003',
});

export default fakeApi;
