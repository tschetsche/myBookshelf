import React, { useState, useEffect } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import FilterCheckbox from '../../../Components/FilterCheckbox/FilterCheckbox';

const StyledFilterSection = styled.div`
  .filter_item {
    &::before {
      content: '';
      display: block;
      height: 0.0625em;
      position: relative;
      width: 100%;
      background-color: #e6e6e6;
    }
    margin-left: 40px;
    margin-bottom: 18px;
  }
  .filter_item__subtitle {
    font-size: 0.875em;
    line-height: 2.5;
    min-height: 2.5em;
    max-width: 26.25em;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 18px;
  }
  .filter_item__list {
    list-style-type: none;
    padding-left: 0;
    padding-right: 0;
    font-size: 1em;
    line-height: 1;
    max-width: none;
    margin: 0;
    vertical-align: bottom;
    li {
      list-style-type: none;
      padding-left: 0;
      padding-right: 0;
      font-size: 1em;
      line-height: 1;
      max-width: none;
    }
  }
`;

const FilterSection = ({ subtitle, data }) => {
  const [appliedParams, setAppliedParams] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const appendSearchParams = (obj) => {
    const sp = createSearchParams(searchParams);
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        sp.delete(key);
        value.forEach((v) => v && sp.append(key, v));
      } else if (value === undefined) {
        sp.delete(key);
      } else {
        sp.set(key, value);
      }
    });
    return sp;
  };

  useEffect(() => {
    setAppliedParams(searchParams.getAll(subtitle.toLowerCase()));
  }, []);

  const handleFilterCategorySelect = (name, value, checked) => {
    const newPars = checked ? [...appliedParams, value] : appliedParams.filter((e) => e !== value);
    setSearchParams(appendSearchParams({ [name]: newPars }));
    setAppliedParams(newPars);
  };

  return (
    <StyledFilterSection>
      <div className={'filter_item'}>
        <h6 className={'filter_item__subtitle'}>{subtitle}</h6>
        <ul className={'filter_item__list'}>
          {data.map((el) => (
            <li className={'filter_option'} key={el}>
              <FilterCheckbox
                label={el}
                name={String(subtitle).toLowerCase()}
                value={String(el).toLowerCase()}
                handleSectionFilter={handleFilterCategorySelect}
                defaultChecked={searchParams.getAll(subtitle.toLowerCase()).includes(String(el).toLowerCase())}
              />
            </li>
          ))}
        </ul>
      </div>
    </StyledFilterSection>
  );
};

export default FilterSection;
