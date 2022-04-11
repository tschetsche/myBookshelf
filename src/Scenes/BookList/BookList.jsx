import React, { useEffect, useState } from 'react';
import Card from 'Components/Card/Card';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { bookListSelector } from 'store/selectors/bookList';
import { replaceBookList } from 'store/actions/bookList';
import fakeApi from '../../api/fakeApi';
import Pagination from '../../Components/Pagination/Pagination';

const StyledBookList = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  padding: 20px;
  margin: 0px 120px;

  .pagination_wrapper {
    align-self: center;
    position: absolute;
    bottom: 1em;
  }
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
  const [currentPage, setCurrentPage] = useState(1);
  const [booksTotal, setBooksTotal] = useState(0);
  const bookList = useSelector(bookListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    fakeApi.get(`/book?_page=${currentPage}&_limit=10`).then((response) => {
      setBooksTotal(response.headers['x-total-count']);
      dispatch(replaceBookList(response.data));
    });
  }, [currentPage, booksTotal]);

  if (!bookList) {
    return <StyledLoadingWrapper>...Loading</StyledLoadingWrapper>;
  }

  return (
    <StyledBookList>
      <div className={'book_list_wrapper'}>
        {bookList.map((bookInfo) => (
          <Card key={bookInfo.id} cardID={bookInfo.id} title={bookInfo.title} cover={bookInfo.cover} />
        ))}
      </div>
      <div className={'pagination_wrapper'}>
        <Pagination
          className='pagination-bar'
          currentPage={currentPage}
          totalCount={booksTotal}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        ></Pagination>
      </div>
    </StyledBookList>
  );
};

export default BookList;
