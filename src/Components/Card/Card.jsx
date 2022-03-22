import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 200px;
  background-color: ${(props) => props.theme.baseBackgroundColor};
  margin: 40px;
  color: ${(props) => props.theme.baseFontColor};
  border-radius: 2px;
  font-family: 'montserrat';
  padding: 15px 0;
  display: inline-block;
  vertical-align: top;

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
    img {
      width: 140px;
      height: 213px;
    }
  }
  .title {
    text-align: center;
    padding: 0px 4px;
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
