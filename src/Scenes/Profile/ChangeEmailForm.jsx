import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import ColoredButton from '../../Components/ColoredButton/ColoredButton';
import FormikInput from '../../Components/Formik/FormikInput';
import { validateEmail } from '../../util/emailUtil';
import CloseButton from '../../Components/CloseButton/CloseButton';
import { useDispatch } from 'react-redux';
import { selectUserName } from '../../store/selectors/user';
import { useSelector } from 'react-redux';
import { changeUserEmail } from '../../store/actions/user';

const StyledChangeEmailForm = styled.div`
  margin: 36px 8px 18px 8px;
`;

const ChangeEmailForm = ({ handleClose, userId }) => {
  const dispatch = useDispatch();

  const userEmail = useSelector(selectUserName);

  return (
    <StyledChangeEmailForm>
      <Formik
        initialValues={{
          email: '',
        }}
        validate={(values) => {
          const errorObj = {};
          let isValid = true;
          if (values.email === userEmail) {
            isValid = false;
            errorObj.email = 'New email equals current email';
          }
          if (!validateEmail(values.email)) {
            isValid = false;
            errorObj.profile_new_pwd = 'Email is not valid';
          }
          if (!isValid) return errorObj;
        }}
        onSubmit={({ email }) => {
          dispatch(changeUserEmail({ email, id: userId, onSuccess: handleClose }));
        }}
      >
        <Form>
          <div className={'profile_row'}>
            <div className={'profile_label'}>New Email</div>
            <div className={'profile_labeled'}>
              <FormikInput name='email' type='email' id='email'></FormikInput>
            </div>
          </div>
          <div className='settings_row_button_wrap'>
            <ColoredButton type={'submit'} className={'settings_email_btn'} title={'Change email'}></ColoredButton>
          </div>
          <CloseButton onClose={handleClose} />
        </Form>
      </Formik>
    </StyledChangeEmailForm>
  );
};

export default ChangeEmailForm;
