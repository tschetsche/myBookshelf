import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledBook = styled.div``;

const Book = (props) => {
  const params = useParams();
  return (
    <StyledBook>
      <div>Book id {params.bookID}</div>
    </StyledBook>
  );
};

export default Book;
