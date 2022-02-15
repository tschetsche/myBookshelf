import React, { useEffect } from 'react';
import Card from 'Components/Card/Card';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { bookListSelector } from 'store/selectors/bookList';
import { useDispatch } from 'react-redux';
import { replaceBookList } from 'store/actions/bookList';
import { addBookshelfToList, addBookshelf } from '../../store/actions/bookShelf';
import axios from 'axios';

const StyledBookList = styled.div`
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  margin: 0px 20px;
`;

const StyledLoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.accentFontColor};
  font-size: 20px;
`;

const BookList = (props) => {
  const bookList = useSelector(bookListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3003/books').then((response) => {
      dispatch(replaceBookList(response.data));
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3003/bookshelves').then((response) => {
      dispatch(addBookshelfToList(response.data));
      dispatch(addBookshelf(response.data));
    });
  }, []);

  if (!bookList) {
    return <StyledLoadingWrapper>...Loading</StyledLoadingWrapper>;
  }

  return (
    <StyledBookList>
      {bookList.map((bookInfo) => (
        <Card key={bookInfo.id} cardID={bookInfo.id} title={bookInfo.title} cover={bookInfo.cover} />
      ))}
    </StyledBookList>
  );
};

export default BookList;
