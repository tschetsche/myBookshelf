import React from 'react';
import MainLayout from 'Layouts/MainLayout/MainLayout';
import GlobalThemeProvider from 'HOC/GlobalThemeProvider';
import GlobalModalProvider from 'HOC/GlobalModalProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/initStore';
import { PersistGate } from 'redux-persist/integration/react';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <GlobalThemeProvider>
              <GlobalModalProvider>
                <MainLayout />
              </GlobalModalProvider>
            </GlobalThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
