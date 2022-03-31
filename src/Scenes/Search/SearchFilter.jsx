import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import FilterSection from './FilterSection';

const StyledSearchFilter = styled.div`
  width: 15%;
`;

const SearchFilter = ({ searchData }) => {
  const filterDataByCategory = (data, category) => {
    const filtered = [];
    data.forEach((el) => (Array.isArray(el[category]) ? filtered.push(...el[category]) : filtered.push(el[category])));
    const setFilter = new Set(filtered);
    return Array.from(setFilter);
  };

  const filterRating = (data) => {
    const filtered = [];
    data.forEach((el) => el['rating'] && filtered.push(parseInt(el['rating'])));
    const setFilter = new Set(filtered);
    return Array.from(setFilter);
  };

  return (
    <StyledSearchFilter>
      <div className={'filter_content'}>
        <Formik
          initialValues={{ category: '', author: '', rating: '' }}
          handleChange={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <FilterSection subtitle={'Category'} data={filterDataByCategory(searchData, 'categories')} />
            <FilterSection subtitle={'Author'} data={filterDataByCategory(searchData, 'author')} />
            <FilterSection subtitle={'Rating'} data={filterRating(searchData)} />
          </Form>
        </Formik>
      </div>
    </StyledSearchFilter>
  );
};

export default SearchFilter;
