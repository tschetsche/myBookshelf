import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
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

  const formatParams = (params) => {
    const pars = Object.fromEntries([...searchParams]);
    const parsFormatted = {};
    if ('book' in pars) {
      parsFormatted['title_like'] = params.book;
    }
    if ('category' in pars) {
      parsFormatted['categories_like'] = params.category;
    }
    if ('rating' in pars) {
      parsFormatted['rating_gte'] = parseFloat(params.rating);
      parsFormatted['rating_lte'] = parseFloat(params.rating) + 0.9;
    }
    if ('author' in pars) {
      parsFormatted['author_like'] = pars.author;
    }
    return Object.keys(parsFormatted)
      .map((key) => key + '=' + parsFormatted[key])
      .join('&');
  };

  useEffect(() => {
    const pars = Object.fromEntries([...searchParams]);
    const parsFormatted = formatParams(pars);
    fakeApi.get(`book?${parsFormatted}`).then((response) => {
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
