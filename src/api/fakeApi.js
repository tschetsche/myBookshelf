import axios from 'axios';
import { store } from '../store/initStore';
import { userLoggedOut } from '../store/actions/user';

const fakeApi = axios.create({
  baseURL: 'http://localhost:3003',
});

fakeApi.interceptors.request.use((request) => {
  request.headers.access = store.getState().user.isLoggedIn;
  return request;
});

fakeApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (response) => {
    if (response.code === 401) {
      store.dispatch(userLoggedOut());
    }
    return response;
  }
);

export default fakeApi;
