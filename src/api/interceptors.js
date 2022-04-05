import fakeApi from './fakeApi';
import { userLogOut } from '../store/actions/user';
import { storeApiError } from '../store/actions/globalAppActions';

const attachStoreToFakeApi = (store) => {
  fakeApi.interceptors.request.use((request) => {
    request.headers.access = store.getState().user.isLoggedIn;
    return request;
  });

  fakeApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response) {
        store.dispatch(storeApiError({ message: 'Network error', date: new Date() }));
        throw error;
      }
      if (error.response.status === 401) {
        store.dispatch(userLogOut());
      }
      store.dispatch(storeApiError({ message: error.response, date: new Date() }));
      throw error;
    }
  );
};

export default attachStoreToFakeApi;
