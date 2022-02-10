import React from 'react';
import MainLayout from 'Layouts/MainLayout/MainLayout';
import GlobalThemeProvider from 'HOC/GlobalThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/initStore';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <GlobalThemeProvider>
            <MainLayout />
          </GlobalThemeProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
