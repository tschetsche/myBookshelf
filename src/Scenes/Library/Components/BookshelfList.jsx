import React from 'react';
import styled from 'styled-components';
import Card from 'Components/Card/Card';

const StyledBookshelfList = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-flow: row wrap;
  justify-content: flex-start;
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
