import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledFormikInput = styled.div`
  font-family: 'montserrat';
  display: flex;
  flex-direction: column;
  position: relative;

  .input_block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => (props.error && props.touched ? '#d93025' : '#ddd')};
    border-radius: 4px;
    transition: 0.3s;
    margin-bottom: 4px;
  }

  input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
    background-color: ${(props) => props.theme.toggleElementColor};

    &::placeholder {
      color: #ddd;
      opacity: 1;
    }
  }
  &:focus-within {
    border-color: ${(props) => props.theme.toggleElementColor};
  }
  .input_error {
    color: #d93025;
    font-size: 10px;
    padding-left: 8px;
    position: absolute;
    right: 0;
    width: 100%;
    bottom: -1em;
  }
`;

const FormikInput = (props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <StyledFormikInput error={meta.error} touched={meta.touched}>
      <div className={'input_block'}>
        <input {...field} {...props} />
      </div>
      {meta.error && meta.touched && <div className={'input_error'}>{meta.error}</div>}
    </StyledFormikInput>
  );
};

export default FormikInput;
