import React from 'react';
import { useField, useFormikContext } from 'formik';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StyledFormikDatePicker = styled.div`
  font-family: 'montserrat';
  .date_picker_wrapper {
    position: relative;
  }
  .date_error {
    color: #d93025;
    font-size: 10px;
    position: absolute;
    right: 0;
    width: 100%;
    bottom: -1.5em;
  }
`;

const FormikDatePicker = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <StyledFormikDatePicker>
      <div className={'date_picker_wrapper'}>
        {label && <label htmlFor={name}>{label}</label>}
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          dateFormat='dd/MM/yyyy'
        />
        {meta.error && <div className={'date_error'}>{meta.error}</div>}
      </div>
    </StyledFormikDatePicker>
  );
};

export default FormikDatePicker;
