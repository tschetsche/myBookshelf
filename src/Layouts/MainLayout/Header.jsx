import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import ThemeSwitchToggle from 'Components/ThemeSwitchToggle/ThemeSwitchToggle';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 20px rgb(38 38 38 / 10%);
  font-family: 'montserrat';
  padding: 16px 0px;
  color: ${(props) => props.theme.baseFontColor};
  background-color: ${(props) => props.theme.navbarBackgroundColor};

  .header-brand {
    font-weight: 900;
    color: ${(props) => props.theme.baseFontColor};
    white-space: nowrap;
    font-size: 17.5px;
  }
`;

const Header = (props) => {
  return (
    <StyledHeader>
      <div className={'header-brand'}>My Bookshelf</div>
      <Navbar />
      <div className={'header-profile'}>Profile</div>
      <ThemeSwitchToggle />
    </StyledHeader>
  );
};

export default Header;
