import React, { useContext } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import ThemeSwitchToggle from 'Components/ThemeSwitchToggle/ThemeSwitchToggle';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import { AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import LoginModal from '../../Components/Modal/LoginModal/LoginModal';

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

  .header_brand {
    font-weight: 900;
    color: ${(props) => props.theme.baseFontColor};
    white-space: nowrap;
    font-size: 17.5px;
  }

  .header_login {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    font-size: 18px;
  }
`;

const Header = (props) => {
  const openModal = useContext(ModalContext);

  const handleLoginModalOpen = () => {
    openModal(<LoginModal onClose={openModal} />);
  };

  return (
    <StyledHeader>
      <div className={'header_brand'}>My Bookshelf</div>
      <Navbar />
      <button className={'header_login'} onClick={handleLoginModalOpen}>
        <AiOutlineUser />
      </button>
      <ThemeSwitchToggle />
    </StyledHeader>
  );
};

export default Header;
