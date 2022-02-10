import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  margin: 20px;
  color: ${(props) => props.theme.baseFontColor};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'montserrat';
`;

const Card = (props) => {
  return (
    <StyledCard>
      <Link to={`/book/${props.cardID}`}>
        <div className={'cover'}>
          <img src={props.bookCover} alt={props.bookTitle} />
        </div>
        <div className={'title'}>{props.bookTitle}</div>
      </Link>
    </StyledCard>
  );
};

export default Card;
