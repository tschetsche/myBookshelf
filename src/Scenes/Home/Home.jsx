import React from 'react';
import styled from 'styled-components';
import img from '../../assets/images/books.jpg';

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
