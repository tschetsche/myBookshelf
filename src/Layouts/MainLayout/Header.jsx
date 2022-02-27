import React from 'react';
import styled from 'styled-components';
import SiteNavbar from './SiteNavbar';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 20px rgb(38 38 38 / 10%);
  font-family: 'montserrat';
  color: ${(props) => props.theme.baseFontColor};
  background-color: ${(props) => props.theme.navbarBackgroundColor};

  .logo {
    font-weight: 900;
    color: ${(props) => props.theme.baseFontColor};
    white-space: nowrap;
    font-size: 17.5px;
    text-decoration: none;
  }
`;

const Header = (props) => {
  return (
    <StyledHeader>
      <Link className={'logo'} to={'/'}>
        My Bookshelf
      </Link>
      <SiteNavbar />
      <UserNavbar />
    </StyledHeader>
  );
};

export default Header;
