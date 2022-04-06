import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ThemeSwitchToggle from 'Components/ThemeSwitchToggle/ThemeSwitchToggle';
import { AiOutlineUser } from 'react-icons/ai';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import LoginModal from '../../Components/Modal/LoginModal/LoginModal';
import { Link } from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import { useSelector } from 'react-redux';
import { userIsLoggedInSelector } from '../../store/selectors/user';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../store/actions/user';
import SearchBar from './SearchBar';

const StyledUserNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .user_navbar_item {
    padding: 20px 8px;
    display: flex;
    position: relative;
  }

  .login {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    font-size: 24px;
  }

  .login_icon {
    display: block;
  }

  .user {
    vertical-align: middle;
  }

  .user_img {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .user_action_menu {
    list-style-type: none;
    padding: 24px 10px;
    z-index: 1000;
    position: absolute;
    border-radius: 8px;
    top: 90%;
    transform: translate(-40%, -10%);
    background-color: ${(props) => props.theme.toggleElementColor};
    margin: 8px;
    box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
    opacity: ${(props) => (props.displayProfileMenu ? 0 : 1)};
    visibility: ${(props) => (props.displayProfileMenu ? 'hidden' : 'visible')};
  }

  .user_action_item {
    display: flex;
    align-items: center;
    width: 270px;
    height: 36px;
    font-family: 'montserrat';
    padding-left: 10px;
    a {
      color: ${(props) => props.theme.baseFontColor};
      text-decoration: none;
      font-size: 14px;
    }
  }
`;

const UserNavbar = (props) => {
  const openModal = useContext(ModalContext);
  const [isProfileCollapsed, setIsProfileCollapsed] = useState(true);
  const isLoggedIn = useSelector(userIsLoggedInSelector);
  const dispatch = useDispatch();

  const handleLoginModalOpen = () => {
    openModal(<LoginModal onClose={openModal} />);
  };

  return (
    <StyledUserNavbar displayProfileMenu={isProfileCollapsed}>
      <div className={'user_navbar_item'}>
        <SearchBar />
      </div>
      {isLoggedIn ? (
        <div
          className={'user_navbar_item'}
          onMouseEnter={() => {
            setIsProfileCollapsed(false);
          }}
          onMouseLeave={() => {
            setIsProfileCollapsed(true);
          }}
        >
          <Link className={'user'} to={'/profile'}>
            <img className={'user_img'} src={avatar} alt='avatar' />
          </Link>
          <ul className='user_action_menu'>
            <li className='user_action_item'>
              <Link
                to={'/profile'}
                onClick={() => {
                  setIsProfileCollapsed(true);
                }}
              >
                Profile
              </Link>
            </li>
            <li className='user_action_item'>
              <Link
                to={'/'}
                className={'sing_out'}
                onClick={() => {
                  dispatch(userLogOut());
                  setIsProfileCollapsed(true);
                }}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className='user_navbar_item'>
          <button className={'login'} onClick={handleLoginModalOpen}>
            <AiOutlineUser className={'login_icon'} />
          </button>
        </div>
      )}
      <div className='user_navbar_item'>
        <ThemeSwitchToggle />
      </div>
    </StyledUserNavbar>
  );
};

export default UserNavbar;
