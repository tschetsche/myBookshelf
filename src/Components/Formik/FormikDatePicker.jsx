import React from 'react';
import { useField, useFormikContext } from 'formik';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledFormikDatePicker = styled.div`
  font-family: 'montserrat';
`;

const FormikDatePicker = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <StyledFormikDatePicker>
      {label && <label htmlFor={name}>{label}</label>}
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    </StyledFormikDatePicker>
  );
};

export default FormikDatePicker;
