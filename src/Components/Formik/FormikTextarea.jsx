import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledFormikTextarea = styled.div`
  textarea {
    width: 100%;
    border: #dcd6cc 1px solid;
    border-radius: 3px;
    background-color: #fff;
    color: #333333;
  }
  textarea::placeholder {
    font-family: 'montserrat';
  }
`;

const FormikTextarea = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <StyledFormikTextarea>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea {...field} id={name} {...props}></textarea>
      {meta.error && meta.touched && <div className={'error'}>{meta.error}</div>}
    </StyledFormikTextarea>
  );
};

export default FormikTextarea;
