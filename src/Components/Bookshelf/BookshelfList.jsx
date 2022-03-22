import React from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';

const StyledBookshelfList = styled.div`
  display: flex;
  flex-wrap: row;
`;
const BookshelfList = ({ books }) => {
  return (
    <StyledBookshelfList>
      {books.map((book) => (
        <Card key={book.bookId} cardID={book.bookId} title={book.title} cover={book.cover} />
      ))}
    </StyledBookshelfList>
  );
};
export default BookshelfList;
