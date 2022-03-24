import { Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import ColoredButton from '../../Components/ColoredButton/ColoredButton';
import FormikSearchInput from '../../Components/Formik/FormikSearchInput';

const StyledSearchForm = styled.div`
  .search_form_wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    .search_input {
      width: 760px;
      #search {
        background-color: #fff;
      }
    }
    .search_field {
      margin: 0px 16px;
    }
  }
`;

const SearchForm = (props) => {
  const [toSearch, setToSearch] = useState(false);
  return (
    <StyledSearchForm>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={() => {
          setToSearch(true);
        }}
      >
        {({ values }) => (
          <Form>
            {toSearch && <Navigate to={`/search?book=${values.search}`} />}
            <div className={'search_form_wrapper'}>
              <div className={'search_input search_field'}>
                <FormikSearchInput name='search' type='text' placeholder='Enter book name' id='search'></FormikSearchInput>
              </div>
              <div className={'search_btn search_field'}>
                <ColoredButton className={'submit_search'} type={'submit'} title={'Search'} fullWidth={false}></ColoredButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </StyledSearchForm>
  );
};

export default SearchForm;
