import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectUserId, selectUserName } from '../../store/selectors/user';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

const StyledProfile = styled.div`
  width: 980px;
  margin: 40px auto;
  background-color: #f5f5f5;
  padding: 16px 16px 34px;

  .page_title {
    font-family: 'montserrat';
  }

  .profile_settings {
    width: calc(980px / 1.6);
    font-family: 'sourceSansPro';
  }

  .profile_label {
    align-self: start;
    width: 200px;
  }

  .profile_control {
    color: ${(props) => props.theme.accentFontColor};
  }

  .profile_info_block {
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .profile_row {
    display: flex;
    flex-direction: row;
  }

  .profile_labeled {
    width: 300px;
    align-items: end;
  }

  .profile_settings {
    margin: 8px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 15px 10px 15px 0;
    position: relative;
  }
`;

const Profile = (props) => {
  const [changePasswordExpanded, setChangePasswordExpanded] = useState(false);
  const [changeEmailExpanded, setChangeEmailExpanded] = useState(false);

  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectUserName);

  return (
    <StyledProfile>
      <h3 className={'page_title'}>Profile</h3>
      <div className={'profile_settings'}>
        {!changeEmailExpanded && (
          <div className={'profile_info_block'}>
            <div className={'profile_label'}>Email</div>
            <div className={'profile_setting_value'}>{userEmail.replace(/^(.{2})[^@]+/, '$1***')}</div>
            <Link to={'/profile'} className={'profile_control'} onClick={() => setChangeEmailExpanded(!changeEmailExpanded)}>
              Change
            </Link>
          </div>
        )}
        {changeEmailExpanded && <ChangeEmailForm handleClose={() => setChangeEmailExpanded(!changeEmailExpanded)} userId={userId} />}
      </div>
      <div className={'profile_settings'}>
        {!changePasswordExpanded && (
          <div className={'profile_info_block'}>
            <div className={'profile_label'}>Password</div>
            <Link
              to={'/profile'}
              className={'profile_control'}
              onClick={() => {
                setChangePasswordExpanded(true);
              }}
            >
              Change
            </Link>
          </div>
        )}
        {changePasswordExpanded && (
          <ChangePasswordForm handleClose={() => setChangePasswordExpanded(!changePasswordExpanded)} userId={userId} />
        )}
      </div>
    </StyledProfile>
  );
};

export default Profile;
