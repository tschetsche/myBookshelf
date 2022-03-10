import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import RootRouter from '../../Route/RootRouter';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../../Components/Toast/Toast';

const StyledMainLayout = styled.div`
  background-color: ${(props) => props.theme.baseBackgroundColor};

  .footer {
    background-color: ${(props) => props.theme.navbarBackgroundColor};
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-family: 'montserrat';
    color: ${(props) => props.theme.baseFontColor};
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .footerText {
    padding-top: 10px;
    padding-left: 20px;
    font-weight: 900;
    font-size: 17.5px;
  }

  .themeSwitch {
    margin-right: 20px;
  }

  .content {
    width: 100%;
    min-height: calc(100vh - 100px);
  }

  .content::after {
    content: '';
    display: block;
    height: 50px;
  }
`;

const MainLayout = (props) => {
  return (
    <StyledMainLayout>
      <div className={'layout'}>
        <Header />
        <div className={'content'}>
          <RootRouter />
          <Toast />
        </div>
        <div className={'footer'}>
          <div className={'footerText'}>Footer</div>
        </div>
      </div>
    </StyledMainLayout>
  );
};

export default MainLayout;
