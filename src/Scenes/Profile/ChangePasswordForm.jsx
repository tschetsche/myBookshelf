import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import ColoredButton from '../../Components/ColoredButton/ColoredButton';
import FormikInput from '../../Components/Formik/FormikInput';
import CloseButton from '../../Components/CloseButton/CloseButton';
import { useDispatch } from 'react-redux';
import { changeUserPassword } from '../../store/actions/user';

const StyledChangePasswordForm = styled.div`
  margin: 36px 8px 18px 8px;
`;

const ChangePasswordForm = ({ handleClose, userId }) => {
  const dispatch = useDispatch();
  return (
    <StyledChangePasswordForm>
      <Formik
        initialValues={{
          profile_old_pwd: '',
          profile_new_pwd: '',
          profile_new_pwd_confirm: '',
        }}
        validate={(values) => {
          const errorObj = {};
          let isValid = true;
          if (values.profile_old_pwd === values.profile_new_pwd) {
            isValid = false;
            errorObj.profile_new_pwd = 'Password is not new';
          }
          if (values.profile_new_pwd.length < 6) {
            isValid = false;
            errorObj.profile_new_pwd = 'Password should be at least 6 characters';
          }
          if (values.profile_new_pwd !== values.profile_new_pwd_confirm) {
            isValid = false;
            errorObj.profile_new_pwd_confirm = 'Passwords must be the same';
          }
          if (!isValid) return errorObj;
        }}
        onSubmit={({ profile_new_pwd }) => {
          dispatch(changeUserPassword({ password: profile_new_pwd, id: userId, onSuccess: handleClose }));
        }}
      >
        <Form>
          <div className={'profile_row'}>
            <div className={'profile_label'}>Current Password</div>
            <div className={'profile_labeled'}>
              <FormikInput name='profile_old_pwd' type='password' id='profile_old_pwd'></FormikInput>
            </div>
          </div>
          <div className={'profile_row'}>
            <div className={'profile_label'}>New Password</div>
            <div className={'profile_labeled'}>
              <FormikInput name='profile_new_pwd' type='password' id='profile_new_pwd'></FormikInput>
            </div>
            <div class='settings_tt_place fl_l' id='profile_pwd_tt_place'></div>
          </div>
          <div className={'profile_row'}>
            <div className={'profile_label'}>Confirm New Password</div>
            <div className={'profile_labeled'}>
              <FormikInput name='profile_new_pwd_confirm' type='password' id='profile_new_pwd_confirm'></FormikInput>
            </div>
          </div>
          <div className='settings_row_button_wrap'>
            <ColoredButton type={'submit'} className={'settings_pwd_btn'} title={'Change password'}></ColoredButton>
          </div>
          <CloseButton onClose={handleClose} />
        </Form>
      </Formik>
    </StyledChangePasswordForm>
  );
};

export default ChangePasswordForm;
