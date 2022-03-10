import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import fakeApi from '../../api/fakeApi';
import img from '../../assets/images/books.jpg';
import { initBookshelfList } from '../../store/actions/bookshelf';

const StyledHome = styled.div`
  .block {
    background: url(${img}) no-repeat center 0;
    background-size: cover;
    height: 436px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fakeApi.get('/bookshelves').then((response) => {
      dispatch(initBookshelfList(response.data));
    });
  }, []);

  return (
    <StyledHome>
      <h3>Home</h3>
      <div className={'block'}>
        <div className={'wrapper'}>
          <h3>A home for your books</h3>
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;
