import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledFormikDropdown = styled.div`
  box-sizing: border-box;
  font-family: 'montserrat';
  display: flex;
  flex-direction: row;

  label {
    font-size: 14px;
  }

  select {
    background-color: ${(props) => props.theme.baseBackgroundColor};
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => (props.error && props.touched ? '#d93025' : props.theme.baseFontColor)};
    border-radius: 4px;
    display: inline-block;
    line-height: 1.5em;
    padding: 0.5em 3.5em 0.5em 1em;

    margin: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  select {
    background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
  }

  select:focus {
    background-image: linear-gradient(45deg, #0c4c5c 50%, transparent 50%), linear-gradient(135deg, transparent 50%, #0c4c5c 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border-color: ${(props) => props.theme.accentFontColor};
    outline: 0;
  }
  .select_error {
    color: #d93025;
    font-size: 10px;
    padding-left: 8px;
    position: absolute;
    right: 0;
    width: 100%;
    bottom: -0.5em;
  }
  .select {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 8px;
  }
  .select_label {
    align-self: center;
  }
`;

const FormikDropdown = ({ name, options, label, placeholder }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <StyledFormikDropdown error={meta.error} touched={meta.touched}>
      {label && (
        <label htmlFor={name} className={'select_label'}>
          {label}
        </label>
      )}
      <div className='select'>
        <select id={name} {...field}>
          <option disabled value={''}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option value={option.value} key={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {meta.error && meta.touched && <div className={'select_error'}>{meta.error}</div>}
      </div>
    </StyledFormikDropdown>
  );
};

export default FormikDropdown;
