import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledFormikSearchInput = styled.div`
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
    border-color: #ddd;
    border-radius: 4px;
    background-color: #fff;
  }

  input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
    background-color: #fff;

    &::placeholder {
      color: #ddd;
      opacity: 1;
    }
  }
  &:focus-within {
    border-color: ${(props) => props.theme.toggleElementColor};
  }
`;

const FormikSearchInput = (props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <StyledFormikSearchInput>
      <div className={'input_block'}>
        <input {...field} {...props} />
      </div>
    </StyledFormikSearchInput>
  );
};

export default FormikSearchInput;
