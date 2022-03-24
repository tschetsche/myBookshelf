import React from 'react';
import styled from 'styled-components';
import img from '../../assets/images/books.jpg';
import SearchForm from './SearchForm';

const StyledHome = styled.div`
  .block {
    background: url(${img}) no-repeat center 0;
    background-size: cover;
    height: 436px;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    margin: 0 auto;
  }
  .title {
    font-family: montserrat, arial, sans-serif;
    color: #fff;
    font-size: 60px;
    font-weight: 700;
    margin: 137px 0 30px;
    text-align: center;
    display: block;
  }
  .search_form {
    position: relative;
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <div className={'block'}>
        <div className={'wrapper'}>
          <h3 className='title'>A home for your books</h3>
          <SearchForm />
        </div>
      </div>
    </StyledHome>
  );
};

export default Home;
