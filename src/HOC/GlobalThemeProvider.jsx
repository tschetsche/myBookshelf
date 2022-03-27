import React, { memo, useState } from 'react';
import { ThemeProvider, createGlobalStyle, StyleSheetManager } from 'styled-components';

import montserratFont from 'assets/fonts/Montserrat-Regular.ttf';
import sourceSansProFont from 'assets/fonts/SourceSansPro-Regular.ttf';

export const ThemeContext = React.createContext('');

export const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
}

  * {
    box-sizing: border-box;
  }

@font-face {
  font-family: 'montserrat';
  src: url(${montserratFont});
}

@font-face {
  font-family: 'sourceSansPro';
  src: url(${sourceSansProFont});
}`;

export const lightGlobalStyle = {
  baseFontColor: '#555',
  baseBackgroundColor: '#fff',
  navbarBackgroundColor: '#f5f6f7',
  cardBackgroundColor: '#fff',
  accentBackgroundColor: '#77815b',
  headerFontColor: '#d6ede1',
  accentFontColor: '#0c4c5c',
  toggleBackgroundColor: '#333333',
  toggleElementColor: '#f5f5f5',
};

export const darkGlobalStyle = {
  baseFontColor: '#c7c8c9',
  baseBackgroundColor: '#222',
  navbarBackgroundColor: '#1c1e21',
  cardBackgroundColor: '#a2a8d3',
  accentBackgroundColor: '#38598b',
  headerFontColor: '#dbe4f7',
  accentFontColor: '#142d4c',
  toggleBackgroundColor: '#f5f5f5',
  toggleElementColor: '#333333',
};

const GlobalThemeProvider = (props) => {
  const [isThemeLight, setIsThemeLight] = useState(true);

  const toggleTheme = () => {
    setIsThemeLight(!isThemeLight);
  };

  return (
    <StyleSheetManager disableVendorPrefixes={true}>
      <ThemeProvider theme={isThemeLight ? lightGlobalStyle : darkGlobalStyle}>
        <ThemeContext.Provider value={toggleTheme}>
          <GlobalStyles />
          {props.children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default memo(GlobalThemeProvider);
