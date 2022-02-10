import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .navbar-item {
    padding: 0px 16px;
    margin: 7px 0px;
    color: #3c484f;
    font-weight: 500;
  }
`;

const Navbar = (props) => {
  return (
    <StyledHeader>
      <Link to={'/books'} className={'navbar-item'}>
        Books
      </Link>
      <div className={'navbar-item'}>Authors</div>
    </StyledHeader>
  );
};

export default Navbar;
