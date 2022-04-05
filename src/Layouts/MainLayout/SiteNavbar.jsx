import React from 'react';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userIsLoggedInSelector } from '../../store/selectors/user';
import { useContext } from 'react';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import LoginModal from '../../Components/Modal/LoginModal/LoginModal';

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
    cursor: pointer;
    text-decoration: none;
  }
`;

const SiteNavbar = (props) => {
  const isLoggedIn = useSelector(userIsLoggedInSelector);
  const openModal = useContext(ModalContext);
  const navigate = useNavigate();

  const handleClickBasedOnUserState = () => {
    if (isLoggedIn) {
      console.log('Im here');
      navigate('/lib');
    } else {
      openModal(<LoginModal onClose={openModal} />);
    }
  };
  return (
    <StyledSiteNavbar>
      <Link to={'/books'} className={'site_navbar_item'}>
        Books
      </Link>
      <div className={'site_navbar_item'}>Authors</div>
      <div className={'site_navbar_item'} onClick={handleClickBasedOnUserState}>
        My books
      </div>
    </StyledSiteNavbar>
  );
};

export default SiteNavbar;
