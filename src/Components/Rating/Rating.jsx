import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const StyledRating = styled.div`
  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .on {
    color: #f7d723;
  }
  .off {
    color: #ccc;
  }
`;

const Rating = ({ name }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <StyledRating name={name} id={name}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <FaStar className='star' />
          </button>
        );
      })}
    </StyledRating>
  );
};

export default Rating;
