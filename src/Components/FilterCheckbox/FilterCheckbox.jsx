import React from 'react';
import styled from 'styled-components';

const StyledFilterCheckbox = styled.div`
  .checkbox_block {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .filter_option__wrapper {
    cursor: pointer;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .filter_option__label {
    display: block;
    width: 100%;
    font-size: 1em;
    line-height: 1;
    max-width: none;
    transition: color 0.2s;
  }
  .option_label__text {
    font-size: 0.75em;
    line-height: 2.5;
    min-height: 2.5em;
    max-width: 22.5em;
    color: inherit;
    max-width: none;
    max-width: none;
    vertical-align: middle;
  }
  .filter_option__label {
    margin-left: 8px;
  }
`;

const FilterCheckbox = ({ label, handleSectionFilter, checked, ...props }) => {
  return (
    <StyledFilterCheckbox>
      <div className={'checkbox_block'}>
        <input
          {...props}
          className='filter_option__input'
          type='checkbox'
          onChange={(e) => {
            handleSectionFilter(props.name, props.value, e.target.checked);
          }}
          defaultChecked={checked}
        ></input>
        <label className={'filter_option__label'}>
          <span className={'option_label__text'}>{label}</span>
        </label>
      </div>
    </StyledFilterCheckbox>
  );
};

export default FilterCheckbox;
