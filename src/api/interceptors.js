import fakeApi from './fakeApi';
import { userLoggedOut } from '../store/actions/user';
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
    (response) => {
      if (response.code === 401) {
        store.dispatch(userLoggedOut());
      } else {
        store.dispatch(storeApiError(response.response.data));
        throw response;
      }
    }
  );
};

export default attachStoreToFakeApi;
