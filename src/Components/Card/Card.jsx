import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  margin: 40px;
  color: ${(props) => props.theme.baseFontColor};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'montserrat';

  .title {
    margin: 10px 0px;
  }

  .bookCard {
    text-decoration: none;
    color: ${(props) => props.theme.baseFontColor};
  }
  .cover {
    display: block;
    text-align: center;
  }
`;

const Card = (props) => {
  return (
    <StyledCard>
      <Link to={`/book/${props.cardID}`} className={'bookCard'}>
        <div className={'cover'}>
          <img src={props.cover} alt={props.title} />
        </div>
        <div className={'title'}>{props.title}</div>
      </Link>
    </StyledCard>
  );
};

export default Card;
