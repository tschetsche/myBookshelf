import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import fakeApi from '../../api/fakeApi';
import Card from '../../Components/Card/Card';
import { updateSearchResults } from '../../store/actions/search';
import { selectSearchResults } from '../../store/selectors/search';
import SearchFilter from './Components/SearchFilter';

const StyledSearch = styled.div`
  .search_content {
    display: flex;
    flex-direction: row;
  }
  .search_heading {
    margin: 40px;
    font-family: 'sourceSansPro';
    font-size: 20px;
    .query {
      font-weight: 900;
      font-family: sans-serif;
    }
  }
`;

const Search = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const books = useSelector(selectSearchResults);
  const dispatch = useDispatch();

  const searchString = searchParams.get('book');

  const formatParams = () => {
    const pars = new Map();
    if (searchParams.has('book')) {
      pars.set('title_like', searchParams.get('book'));
    }
    if (searchParams.has('category')) {
      pars.set('categories_like', searchParams.getAll('category'));
    }
    if (searchParams.has('rating')) {
      const selectedRating = searchParams.getAll('rating');
      pars.set(
        'rating_gte',
        selectedRating.map((el) => parseFloat(el))
      );
      pars.set(
        'rating_lte',
        selectedRating.map((el) => parseFloat(el) + 0.9)
      );
    }
    if (searchParams.has('author')) {
      pars.set('author_like', searchParams.getAll('author'));
    }
    return Object.fromEntries(pars);
  };

  useEffect(() => {
    const parsFormatted = createSearchParams(formatParams());
    fakeApi.get(`book?${parsFormatted.toString()}`).then((response) => {
      dispatch(updateSearchResults(response.data));
    });
  }, [searchParams]);

  if (books.length === 0) {
    return <div>No books found</div>;
  }

  return (
    <StyledSearch>
      <div className={'search_content'}>
        <SearchFilter searchData={books} />
        <div className={'search_results'}>
          {searchString && (
            <div className={'search_heading'}>
              Search results for <span className={'query'}>{searchString}</span>
            </div>
          )}
          {books.map((book) => (
            <Card key={book.id} cardID={book.id} title={book.title} cover={book.cover} />
          ))}
        </div>
      </div>
    </StyledSearch>
  );
};

export default Search;
