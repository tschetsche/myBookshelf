import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import fakeApi from '../../api/fakeApi';
import img from '../../assets/images/books.jpg';
import { addBookshelvesToList } from '../../store/actions/bookshelf';

const StyledHome = styled.div`
  .block {
    background: url(${img}) no-repeat center 0;
    background-size: cover;
    height: 436px;
  }
`;

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fakeApi.get('/bookshelves').then((response) => {
      dispatch(addBookshelvesToList(response.data));
    });
  }, []);

  return (
    <StyledHome>
      <h3>Home</h3>
      <div className={'block'}></div>
    </StyledHome>
  );
};

export default Home;
