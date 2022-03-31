import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import fakeApi from '../../api/fakeApi';
import Card from '../../Components/Card/Card';
import { updateSearchResults } from '../../store/actions/search';
import { selectSearchResults } from '../../store/selectors/search';
import SearchFilter from './SearchFilter';

const StyledSearch = styled.div`
  .search_content {
    display: flex;
    flex-direction: row;
  }
`;

const Search = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const books = useSelector(selectSearchResults);
  const dispatch = useDispatch();

  const formatParams = (params) => {
    const pars = Object.fromEntries([...searchParams]);
    const parsFormatted = {};
    if ('book' in pars) {
      parsFormatted['title_like'] = params.book;
    }
    if ('category' in pars) {
      parsFormatted['categories_like'] = params.category;
    }
    return Object.keys(parsFormatted)
      .map((key) => key + '=' + parsFormatted[key])
      .join('&');
  };

  useEffect(() => {
    const pars = Object.fromEntries([...searchParams]);
    const test = formatParams(pars);
    fakeApi.get(`book?${test}`).then((response) => {
      dispatch(updateSearchResults(response.data));
    });
  }, [searchParams]);

  if (books.length === 0) {
    return <div>No books found</div>;
  }

  return (
    <StyledSearch>
      <div className={'block'}>
        <h3>Search</h3>
      </div>
      <div className={'search_content'}>
        <SearchFilter searchData={books} />
        <div className={'search_results'}>
          {books.map((book) => (
            <Card key={book.id} cardID={book.id} title={book.title} cover={book.cover} />
          ))}
        </div>
      </div>
    </StyledSearch>
  );
};

export default Search;
