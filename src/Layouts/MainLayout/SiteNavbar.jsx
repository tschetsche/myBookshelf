import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledSiteNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .site_navbar_item {
    padding: 0px 16px;
    margin: 7px 0px;
    color: #3c484f;
    font-weight: 500;
  }
`;

const SiteNavbar = (props) => {
  return (
    <StyledSiteNavbar>
      <Link to={'/books'} className={'site_navbar_item'}>
        Books
      </Link>
      <div className={'site_navbar_item'}>Authors</div>
    </StyledSiteNavbar>
  );
};

export default SiteNavbar;
