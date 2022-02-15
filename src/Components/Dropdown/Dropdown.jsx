import React from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.div`
  box-sizing: border-box;
  select {
    background-color: ${(props) => props.theme.baseBackgroundColor};
    border: thin solid ${(props) => props.theme.baseFontColor};
    border-radius: 4px;
    display: inline-block;
    font-family: 'montserrat';
    line-height: 1.5em;
    padding: 0.5em 3.5em 0.5em 1em;

    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .select {
    background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
  }

  .select:focus {
    background-image: linear-gradient(45deg, #0c4c5c 50%, transparent 50%), linear-gradient(135deg, transparent 50%, #0c4c5c 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border-color: ${(props) => props.theme.accentFontColor};
    outline: 0;
  }
`;

const Dropdown = ({ id, label, options, onChange }) => {
  return (
    <StyledDropdown>
      <label htmlFor={id}>
        {label}
        <select className={'select'} id={id} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </StyledDropdown>
  );
};

export default Dropdown;
